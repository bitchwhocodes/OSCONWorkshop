var express = require('express');
var router = express.Router();
var Spark = require("spark");
var oxfordEmotion = require("node-oxford-emotion")(process.env.EMOTION_API);
var fs = require('fs');

var path = require('path'); 


function parseDataURL(body) {
  var match = /data:([^;]+);base64,(.*)/.exec(body);
  if(!match)
    return null;

  return {
    contentType: match[1],
    data: new Buffer(match[2], 'base64')
  };
}

/* GET image data here */
router.put('/', function(req, res, next) {
  var myimage = req.body.data;

  myimage = req.body.data.replace(/^data:image\/jpeg+;base64,/, "");
  myimage = parseDataURL(req.body.data).data;

  fs.writeFile('images/image.jpeg', req.body.data, 'base64', function(err) {
    
      console.log("File System"+err)
      oxfordEmotion.recognize("image", myimage, function(response) {
          console.log(response);
          //doSpark(response);
          res.json(response);
          

      });
   });
  });


  function doSpark(response)
  {
      var value = parseFloat(response[0].scores.happiness);
      var isHappy = (value> 0.5)? "1":"0";
      Spark.login({ username: process.env.PARTICLE_USER, password:process.env.PARICLE_PASS }, function(err, body) {
        Spark.callFunction(process.env.PARTICLE_ID,'setMode',isHappy,function(err,data){
               // console.log
          }); 
    });
  }

module.exports = router;