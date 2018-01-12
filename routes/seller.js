var express = require('express');
var router = express.Router();
var validator = require('validator');
var moment = require('moment');
var Project = require("../model/Project");
var schedule = require('node-schedule');
var logger = require('../log');


//Cron job for changing status of the expire project. Currently it checks status every minute. 
//TODO : Log projects which get expires
var j = schedule.scheduleJob('*/1 * * * *', function () {
  var now = moment().format("MM/DD,YYYY");

  Project.find({}).then(function (doc) {
    var now = moment().format("MM/DD,YYYY");
    var updateObj = { status: false };   

    doc.forEach(function (object) {
      if (!validator.isBefore(now, object.lastTime))
        {
          Project.update({ _id: object._id }, updateObj)
          .catch(function (err) {
            logger.error(err.message);
            res.json(err.message);
          });
        }
    });      
    }).catch(function (err) {
    logger.error(err);
    res.json(err);
  }); 
});


//Call to create a project. 
router.post('/create', function (req, res, next) {

  var obj = {
    description: req.body.description,
    maxBudget: req.body.maxBudget,
    lastTime: req.body.lastTime,
    lowestBid: req.body.maxBudget,
    lowestBuyer: 'No Buyer Yet',
    status: true,
  };

  Project.create(obj).then(function (doc) {
    logger.info(`New Project created :Project #${doc._id}`);
    res.json(doc);
  }).catch(function (err) {
    logger.error(err.message);
    res.json(err.message);
  });
});

//Get project by ID
router.get('/project/:id', function (req, res, next) {

  var now = moment().format("MM/DD,YYYY");
  Project.findById(req.params.id).then(function (doc) {
    logger.info(`Get project ID ${req.params.id}`);
    res.json(doc);
  }).catch(function (err) {
    logger.error(err);
    res.json(err);
  });

});

//Get all open projects
router.get('/project', function (req, res, next) {
  Project.find({}).then(function (doc) {
    var obj = []
    doc.forEach(function (object) {
      if (object.status)
        obj.push(object);
    });
    logger.info('Getting all open projects');
    res.json(obj);
  }).catch(function (err) {
    logger.error(err.message);
    res.json(err.message);
  });
});

//Get all close projects
router.get('/cproject', function (req, res, next) {
  Project.find({}).then(function (doc) {
    var obj = []
    doc.forEach(function (object) {
      if (!object.status)
        obj.push(object);
    });
    logger.info('Getting all close projects');
    res.json(obj);
  }).catch(function (err) {
    logger.error(err.message);
    res.json(err.message);
  });
});



module.exports = router;
