const express = require('express');
const app = express();
const port = 3000;
const bodyparser = require('body-parser');
const config = require('./config/key');
const {User} = require('./models/User');

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false
}).then(()=> console.log('MongoDB connected...'))
  .catch(err => console.log(err));


app.post('/register', (req,res) => {
  
  const user = new User(req.body);

  user.save((err,userInfo) => {
    if (err) return res.json({success:false, err})
    return res.status(200).json({
      success:true
    })
  })
})



app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세요 예스')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})