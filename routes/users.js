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
    db.query(`SELECT * FROM users;`)
      .then(data => {

        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/favourites", (req, res) => {
    db.query(`SELECT * FROM user_favourites;`)
      .then(data => {
        const users = data.rows;
        res.json(users);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/login/:id", (req, res) => {
    req.session[`uesrid`] = req.params.id;
    res.redirect('/');
  });

  router.get("/logout", (req, res) => {
    req.session[`uesrid`] = null;
    res.redirect('/');
  });
  router.get("/login", (req, res) => {
    db.query(`SELECT name
    FROM users
    Where id = ${req.session[`uesrid`]};`)
      .then(data => {
        const usersname = data.rows[0];
        res.send(usersname);
      });
  });

  return router;
};
