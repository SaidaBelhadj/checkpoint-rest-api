const dotenv = require('dotenv');
const express = require('express');
let mongoose = require('mongoose');
bodyParser= require('body-parser');

const User= require('./model/user')

// Set path to .env file
dotenv.config({ path: './config/.env' });

// Initialize app
const app = express();
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
//
app.get('/api/user',(req,res)=>{
    User.find()
    .exec()
    .then(doc => {
   console.log(doc);
   res.status(200).json(doc);
    })
    .catch(err => {console.log(err);
    res.status(500).json({
            error:err}
    );});
});
// get by id 
app.get('/api/user/:userId',(req,res)=>{
    const id= req.params.userId;
    console.log('param',id);
    User.findById(id)
    .exec()
    .then(doc => {
        console.log(doc);
        res.status(200).json(doc);
         })
         .catch(err => {console.log(err);
         res.status(500).json({
                 error:err}
         );});
});

app.put('/api/user/:userId',(req,res)=>{
    User.findByIdAndUpdate(req.params.userId,req.body,(err)=> {
          err?res.json({msg: "err"}):res.json({msg: "success"})
      })
      
  });
// delete by id 
app.delete('/api/user/:userId',(req,res)=>{
    const id= req.params.userId;
    User.remove({_id: id})
    .exec()
    .then(result => {
   console.log(result);
   res.status(200).json(result);
    })
    .catch(err => {console.log(err);
    res.status(500).json({
        error:err
    });
});
});
//Post
app.post('/api/user',(req,res)=>{
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });
      user.save().then(result =>{console.log(result);
    })
    .catch(err=> console.log(err));
      res.status(201).json({ message: 'Handling POST requests to /user',
    createdUser : user});
 
    console.log( "post user")
});

// Start server
const port = process.env.PORT;
app.listen(port, () => {
console.log(`App listening on port ${port}`);
});
//connect to database
//mongoose.connect(process.env.MONGO_URI)
const server = process.env.SERVER;
const database = process.env.DATABASE;
const url= process.env.MONGOURL;
//mongoose.connect(`mongodb://${server}/${database}`)
mongoose.connect(url)
   .then(() => {
     console.log('Database connection successful!!')
   })
   .catch(err => {
     console.error('Database connection error',err)
   })
