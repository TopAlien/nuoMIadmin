var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var db = require('../library/db.js');
/* GET community listing. */
router.get('/', function(req, res, next) {
  res.send('respoasdce');
});

router.get('/data',(req, res, next)=>{
  res.send('community data');
})

module.exports = router;
