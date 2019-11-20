/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const accountSid = 'AC35e90fe0ec998a9ae4a0f7aa24ae6035';
const authToken = '74ebe215eef61b067a3b4d748720975e';
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
           let values2 = [order.customer_id]

           db.query(`SELECT orders.id, orders.customer_id, customers.name FROM orders JOIN customers ON orders.customer_id = customers.id WHERE customer_id = $1`,values2)
           .then(data => {
             order["customer_name"] = data.rows[0].name
             console.log("order", order.customer_name);
             res.render('owners', {order})
            })
           })
       })
      })
// //to get the time to make from the text area
// let values1 = [`${req.body.waitingTime}`]
// db.query(`INSERT INTO orders (time_to_make) VALUES ($1)`,values1)



  router.post('/orders/:id', (req, res) => {

    client.messages
    .create({
      body: 'test',
      from: '+12055488770',
      to: '+13065307801'
    })

    .then(message => console.log(message.sid));


    res.send({name:"hello"});


  })





  return router;
};


// // generates a random alphanumerical string of 6 characters
// function generateRandomString() {
//   var text = "";
//   var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
//   for (var i = 0; i < 6 ; i++)
//   text += charset.charAt(Math.floor(Math.random() * charset.length));

//   return text;
// }

