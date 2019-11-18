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

    db.query(`SELECT * FROM items;`)
      .then(data => {
        let menuItems = data.rows;
        menuItems.map(item => {
          item.quantity=0;
        })
        res.render("menu", {menuItems:menuItems});
      })
      .catch(error => {
        console.log(error)
      });

  });

  return router;
};


