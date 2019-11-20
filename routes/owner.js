/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {

    res.render("owners");
  });

  router.get('/orders/:id', (req, res) => {

    //To display the person's order onto the page
    let values = [req.params.id]
    console.log(req.params.id)
    db.query('SELECT * FROM orders WHERE id = $1', values)
      .then(data => {
        const order = data.rows[0]
        // res.json(order)

       db.query(`SELECT * FROM orders_items INNER JOIN items ON items.id = item_id WHERE order_id = $1`, values)
       .then(data => {
         order.items = data.rows
         console.log("order", order);
         res.render('owners', {order})
       })
      })
// //to get the time to make from the text area
// let values1 = [`${req.body.waitingTime}`]
// db.query(`INSERT INTO orders (time_to_make) VALUES ($1)`,values1)

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

