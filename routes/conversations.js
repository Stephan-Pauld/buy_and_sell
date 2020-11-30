/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const helpers = require('../db/helper/conversations.js');

const assembleMessageGroups = (rows) => {
  const results = [];
  let messages;
  let itemId;
  for (const row of rows) {
    console.log(row);
    if (itemId !== row.id) {
      itemId = row.id;
      if (messages) {
        results.push(messages);
      }
      messages = [];
    }
    messages.push(row);
  }
  results.push(messages);
  return results;
};

module.exports = function(db) {
  router.get("/", (req, res) => {
    const userId = req.session[`uesrid`];
    helpers.getAllConversationsByUser(db, userId)
      .then(data => {
        const messages = data.rows;
        const messageGroups = assembleMessageGroups(messages);
        // res.json({ messages });
        // res.json({ messageGroups });
        const templateVars = {groups: messageGroups};
        res.render('conversations', templateVars);

      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};