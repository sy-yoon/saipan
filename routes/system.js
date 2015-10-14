var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({id:'all', name: "The Name", description: "description"});
});



router.get('/:id', function(req, res, next) {
  res.send({id:req.params.id, name: "The Name", description: "description"});
});


module.exports = router;

