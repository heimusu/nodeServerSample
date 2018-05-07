const express = require('express')
const oauth = require('oauth')
const http = require('http')
const path = require('path')
const crypto = require('crypto')
const bodyParser = require('body-parser')


const app = express();
app.use(express.static(__dirname));
app.set('port', process.env.PORT || 3000);


// Cross Originを有効化
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  next();
});

// Optionsも
app.options('*', (req, res) => {
  res.sendStatus(200);
});


// urlencodeとjsonの初期化
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


// 暗号化
const hashed = password => {
  let hash = crypto.createHmac('sha512', password)
  hash.update(password)
  let value = hash.digest('hex')
  return value;
}

app.post('/login', (req, res, next) => {
  const password = 'hogehoge'
  const text = req.body.password
  try {
    if(hashed(password) === hashed(text)) {
      res.send(200)
    }
    else {
      res.status(401).json({message: 'パスワードが一致しません'})
 
    }
  }
  catch (error){
    res.status(500).json({message: 'error'})
  }

});

app.listen(3000, function(){
  console.log('working');
});