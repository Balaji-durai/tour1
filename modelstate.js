var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var SchemaOne = new Schema({
  id: {type: number, min: 1, max: 28, required: true },
  name: {type: String, lowercase: true, required: true, array:[],
         enum: ["andhra Pradesh","arunachal pradesh","assam","bihar","gujarat","punjab","haryana","uttarakand","himachal pradesh","rajasthan","uttar pradesh","jharkhand","chattisgarh","west bengal","maharastra","madhya pradesh","orissa","karnataka","kerala","telungana","tamilnadu","sikkim","mizoram","manipur","tripura","meghalaya","goa","nagaland"]
  }
});
 
module.exports = {state: mongoose.model('state',SchemaOne)}