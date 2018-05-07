var express = require('express'),
    oauth = require('oauth'),
    http = require('http');
var path = require('path');


var app = express();
app.use(express.static(__dirname));
app.set('port', process.env.PORT || 3000);

app.get('/', function(req,res){
  const result = {
    message: 'ok'
  }
  res.json(result);
});

app.listen(3000, function(){
  console.log('working');
});