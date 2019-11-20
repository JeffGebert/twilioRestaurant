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
.then(res => {

  let customer_id = res.rows[0].id;
  let values2 = [`${customer_id}`, `1`];


  db.query(`INSERT INTO orders (customer_id, restaurant_owner_id) VALUES ($1, $2) RETURNING id`, values2)
  .then (res => {

    let order_id = res.rows[0].id;

    for (item in req.body.items) {

      let valuesLoop = [item]

      db.query(`SELECT id FROM items where name = $1`, valuesLoop)
      .then (res=> {

        let item_id = res.rows[0].id;
        let values3 = [`${item_id}`, `${order_id}`, `${req.body.items[item].quantity}`];
        console.log("hell0000")

        db.query(`INSERT INTO orders_items (item_id, order_id, quantity) VALUES ($1, $2, $3)`, values3)
        .then (res => {
          console.log("Order " + order_id + " Submitted");
          client.messages
          .create({
            body: req.body.name + ' your order has been placed.  Please standbye for updates on when you can pick up your order',
            from: '+12055488770',
            to: '+13065307801'
   })
  .then(message => console.log(message.sid));

        })
      })
    }
  })

})
res.send({name:"cats"})
});


  return router;

};
