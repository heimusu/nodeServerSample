const express = require('express')
const oauth = require('oauth')
const http = require('http')
const path = require('path')


const app = express();
app.use(express.static(__dirname));
app.set('port', process.env.PORT || 3000);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/'));
app.engine('htm', require('ejs').renderFile);
app.engine('html', require('ejs').renderFile);


app.get('/', function(req, res){
  res.render('index.html');
});


app.get('/login', function(req,res){
  const result = {
    message: 'ok'
  }
  res.json(result);
});

app.listen(3000, function(){
  console.log('working');
});