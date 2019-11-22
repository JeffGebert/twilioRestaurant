/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const accountSid = 'AC7cd28a441cd4e68143d458358e486538';
const authToken = 'a6226bf0c4d56aa07b9c5ab63d72c374';
const client = require('twilio')(accountSid, authToken);

module.exports = (db) => {
  router.get("/", (req, res) => {

    res.render("owners");
  });

  router.get('/orders/:id', (req, res) => {

    //To display the person's order onto the page
    let values = [req.params.id]

    db.query('SELECT * FROM orders WHERE id = $1', values)
      .then(data => {
        const order = data.rows[0]
        // res.json(order)

       db.query(`SELECT * FROM orders_items INNER JOIN items ON items.id = item_id WHERE order_id = $1`, values)
       .then(data => {
         order.items = data.rows
         order["order_id"] = data.rows[0].order_id
           let values2 = [order.customer_id]

           db.query(`SELECT orders.id, orders.customer_id, customers.name, customers.phone_number FROM orders JOIN customers ON orders.customer_id = customers.id WHERE customer_id = $1`,values2)
           .then(data => {
             console.log("data", data);
             order["customer_name"] = data.rows[0].name
             order["phone_number"] = data.rows[0].phone_number

             console.log("order", order);
             res.render('owners', {order})
            })
           })
       })
      })


  router.post('/orders/:id', (req, res) => {
    client.messages
    .create({
      body: 'Slav\'s Kitchen has recieved your order.  The chef would like you to know that your order will be ready in ' + req.body.waitTime + ' minutes.',
      from: '+17738400978',
      to: '+1' + req.body.phoneNumber
    })

    .then(message => console.log(message.sid));
    let values = [`${req.body.waitTime}`, `${req.body.orderID}`]
    db.query(`UPDATE orders SET time_to_make = $1 WHERE orders.id = $2`, values)

    res.send({name:"hello"});


  })

  return router;
};



