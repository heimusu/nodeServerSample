const express = require('express')
const oauth = require('oauth')
const http = require('http')
const path = require('path')
const crypto = require('crypto')
const bodyParser = require('body-parser')
const session = require('express-session')

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


// セッションの生存時間（分で指定）
const maxage = 1;

// セッション管理設定
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: maxage * 60000 }}))



// セッション管理関数
const sessionCheck = (req, res, next) => {
  if (req.session.email) {
    next();
  } else {
    res.status(440).json({message: 'セッション切れです'})
  }
}


const email = 'email@email.com'
const password = 'hogehoge'

// sha-512で暗号化
const hashed = password => {
  let hash = crypto.createHmac('sha512', password)
  hash.update(password)
  const value = hash.digest('hex')
  return value;
}

// ログイン処理
app.post('/login', (req, res, next) => {
  const reqEmail = req.body.email
  const reqPass = req.body.password
  try {
    if(email === reqEmail && hashed(password) === hashed(reqPass)) {
      req.session.email = {name: req.body.email};
      res.send(200)
    }
    else {
      res.status(401).json({message: 'メールアドレス/パスワードが一致しません'})
    }
  }
  catch (error){
    res.status(500).json({message: 'error'})
  }
});

app.get('/', (req, res, next) => {
  sessionCheck(req, res, next)
  res.sendStatus(200)
})

app.listen(3000, function(){
  console.log('working');
});