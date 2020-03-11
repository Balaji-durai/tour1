var express=require('express');
var app= express();
const mongoose=require('mongoose');
var cors=require('cors');
var state=require('./model/modelstate').state;
var corsoption={
    "origin": "http://localhost:4200",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }
app.use(cors(corsoption));
app.use(express.json());
const state = mongoose.model('state',{id:number,name:String});

//db connection
mongoose.connect('mongodb://localhost:27017/mydb', {useNewUrlParser: true})

var list= new state();

app.listen(3000, () => {
  console.log('Server started!');
});

app.get('/api/IndiaState/get_states').then(function(req,res){
  //save the document
   const states=[
    { id: 11, name: 'tamilnadu' },
    { id: 12, name: 'rajastan' },
    { id: 13, name: 'uttar pradesh' },
    { id: 14, name: 'chattisgarh' },
    { id: 15, name: 'Madhya prdesh' },
    { id: 16, name: 'kerala' },
    { id: 17, name: 'jharkhand' },
    { id: 18, name: 'orissa' },
    { id: 19, name: 'mizoram' },
    { id: 20, name: 'sikkim' }
  ]
 list.insertmany(states, function(err,data){
   if (err) throw err;
   res.json(data);
 })
})

 
//get state
app.get('/api/IndiaState/:id',function(req,res){
const one=req.body.id;
list.findOne(one,function (err,data){
  if (err) 
  res.status(500).json(err);
  res.json(data);
})
})

//add state
app.post('/api/IndiaState/add_state',function(req,res){
  const one=req.body.name;
  list.insert(one,function(err,data){
    if(err) throw err;
    res.json(data);
  })
})

//UPDATE STATE
app.put('/api/IndiaState/update_state',function(req,res){
  const one=req.body.id;
  const two=req.body.name;
  list.update(
    {one},
    {$set: {name:two}}
  ).then(function(err,data){
    if(err){
     res.status(500).json(err)
    }
    res.json(data)
  })
})

//delete state
app.delete('api/IndiaState/delete_state',function(req,res){
  const one=req.body.id;
  list.delete(one,function(err,data){
    if(err){
      res.status(500).json(err)
    }
    res.json(data)
  
  })
})

//search state
app.get('api/IndiaState/search_state',function(req,res){
  const one=req.body.name;
  list.find(/one/i,function(err,data){
    if (err) throw err;
    res.json(data);
  })
})

