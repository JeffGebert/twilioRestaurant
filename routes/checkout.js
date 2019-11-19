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

  router.post("/", (res, req) => {
  console.log("req", req.body)
  db.query(`INSERT INTO customers (name, email, phone_number, credit_card) VALUES (${req.body.name}, ${req.body.email}, ${req.body.phone_number}, ${req.body.credit_card}`)
  });

  return router;
};
