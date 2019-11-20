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

  router.get('/orders.id', (re, res) => {

    //To display the person's order onto the page
    db.query('SELECT * FROM orders RETURNING id', values)
      .then(res => {
        let order_id = res.rows[0].id;

      })
//to get the time to make from the text area
let values = [`${req.body.waitingTime}`]
db.query(`INSERT INTO orders (time_to_make) VALUES ($1)`,values)

  })
  return router;
};


// generates a random alphanumerical string of 6 characters
function generateRandomString() {
  var text = "";
  var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 6 ; i++)
  text += charset.charAt(Math.floor(Math.random() * charset.length));

  return text;
}

