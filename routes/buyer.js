var express = require('express');
var router = express.Router();
var Project = require("../model/Project");
var logger = require('../log');

var opts = { runValidators: true };

/* GET users listing. */
router.post('/bid', function (req, res, next) {

  var obj = {
    lowestBuyer: req.body.buyerID,
    lowestBid: req.body.bid,
    projectID: req.body.projectID
  }

  Project.findById(obj.projectID, (err, todo) => {
    // Handle any possible database errors
    if (err || todo==null) {
      logger.error(err);
      res.json(err);
    } else {
      // Update each attribute with any possible attribute that may have been submitted in the body of the request
      // If that attribute isn't in the request body, default back to whatever it was before.
      if (todo.status) {
        if (obj.lowestBid < todo.lowestBid) {
          Project.update({ _id: obj.projectID }, obj, opts)
            .then(function (doc) {
              logger.info(`New bid of ${obj.lowestlowest} placed by ${obj.lowestBuyer} on ${obj.projectID}`);
              res.json({ 'message': `{Bid of $${obj.lowestBid} successfully placed to ${obj.lowestBuyer}}` });
            }).catch(function (err) {
              logger.error(err.message);
              res.json(err.message);
            });
        }
        else {
          logger.error( `Bid (${obj.lowestBid}) greater than current (${todo.lowestBid}) bid` );
          res.json({ 'error': `Bid (${obj.lowestBid}) greater than current (${todo.lowestBid}) bid` });
        }
      }
      else {
        logger.error(`Bid for this project is closed and  ${todo.lowestBuyer} gets the project`);
        res.json({ 'error': `Bid for this project is closed and  ${todo.lowestBuyer} gets the project` });
      }
    }
  });
});

module.exports = router;
