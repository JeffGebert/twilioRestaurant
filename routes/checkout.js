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
  console.log("req", req.body);


  let values = [`${req.body.name}`, `${req.body.email}`, `${req.body.phone_number}`, `${req.body.credit_card}`]

db.query(`INSERT INTO customers (name, email, phone_number, credit_card) VALUES ($1, $2, $3, $4) RETURNING id`, values)
.then(res => {

  let customer_id = res.rows[0].id;
  let values2 = [`${customer_id}`, `1`];
  db.query(`INSERT INTO orders (customer_id, restaurant_owner_id) VALUES ($1, $2) RETURNING id`, values2)
  .then (res => {
    let order_id = res.rows[0].id;
    for (item in req.body.items) {
      db.query(`SELECT FROM items where name === item RETURNING id`)
      .then (res=> {
        let item_id = res.rows[0].id;
        let values3 = [`${item_id}`, `${order_id}`, `${item.quantity}`];
        db.query(`INSERT INTO orders_items (item_id, order_id, quantity) VALUES ($1, $2, $3)`, values3)
        .then (res => {
          console.log ("order " + id + "successfully submitted");
        })
      })
    }



  })

  //db.query(`INSERT INTO orders_items (item_id, quantity) VALUES ()`)

  return db.query(`SELECT * FROM customers`);
})
})

// db.query(`SELEnCT `)

  return router;
};
