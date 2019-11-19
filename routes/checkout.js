/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {

    res.render("checkout");
  });

router.post('/', (req, res) => {
  console.log("name",req.body.name)
  console.log("email",req.body.email)
  console.log('phone numer', req.body.phone_number)
  console.log('credit card', req.body.credit_card)

  let values = [`${req.body.name}`, `${req.body.email}`, `${req.body.phone_number}`, `${req.body.credit_card}`]

db.query(`INSERT INTO customers (name, email, phone_number, credit_card) VALUES ($1, $2, $3, $4) RETURNING id`, values)
.then(res => {
  console.log(res.rows[0].id)
  db.querry(`INSERT INTO orders_items (item_id, quantity) VALUES ()`)

  return db.query(`SELECT * FROM customers`);
})
})

// db.query(`SELECT `)

  return router;
};
