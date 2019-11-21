/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const accountSid = 'AC35e90fe0ec998a9ae4a0f7aa24ae6035';
const authToken = '74ebe215eef61b067a3b4d748720975e';
const client = require('twilio')(accountSid, authToken);



module.exports = (db) => {
  router.get("/", (req, res) => {

    res.render("checkout");
  });

router.post('/', (req, res) => {


let values = [`${req.body.name}`, `${req.body.email}`, `${req.body.phone_number}`, `${req.body.credit_card}`]

db.query(`INSERT INTO customers (name, email, phone_number, credit_card) VALUES ($1, $2, $3, $4) RETURNING id`, values)
.then(data1 => {

  let customer_id = data1.rows[0].id;
  let values2 = [`${customer_id}`, `1`];


  db.query(`INSERT INTO orders (customer_id, restaurant_owner_id) VALUES ($1, $2) RETURNING id`, values2)
  .then (data2 => {

    let order_id = data2.rows[0].id;

    for (item in req.body.items) {

      let valuesLoop = [item]

      db.query(`SELECT id FROM items where name = $1`, valuesLoop)
      .then (data3=> {

        let item_id = data3.rows[0].id;
        let values3 = [`${item_id}`, `${order_id}`, `${req.body.items[item].quantity}`];

        db.query(`INSERT INTO orders_items (item_id, order_id, quantity) VALUES ($1, $2, $3)`, values3)
        .then (data4 => {

          let restaurantmessage = 'Order #' + order_id + ' has been placed.  The order is '
          for (item in req.body.items) {
            console.log(req.body)
            restaurantmessage += req.body.items[item].quantity + ' ' + item + ','
          }

          restaurantmessage.slice(0, restaurantmessage.length-1);
          restaurantmessage += ' please login to website to let the customer know how long it will take to prepare order'

          console.log(restaurantmessage);
          client.messages
          .create({
            body: restaurantmessage,
            from: '+12055488770',
            to: '+1' + req.body.phone_number
          })

          .then(message => console.log(message.sid));
            res.send({
              name:req.body.name,
              orderID:order_id
            })

        })
      })
    }
  })

})
});


  return router;

};
