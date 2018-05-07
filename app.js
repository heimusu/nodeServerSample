const express = require('express')
const oauth = require('oauth')
const http = require('http')
const path = require('path')
const crypto = require('crypto')


const app = express();
app.use(express.static(__dirname));
app.set('port', process.env.PORT || 3000);


// 暗号化
const hashed = password => {
  let hash = crypto.createHmac('sha512', password)
  hash.update(password)
  let value = hash.digest('hex')
  return value;
}


app.get('/', function(req, res){
  res.render('index.html');
});


app.get('/login', function(req,res){
  const text = 'hogehoge'
  const hashedPassword = hashed(text)
  const result = {
    message: 'ok',
    password: text,
    hashedPassword: hashedPassword
  }
  res.json(result);
});

app.listen(3000, function(){
  console.log('working');
});