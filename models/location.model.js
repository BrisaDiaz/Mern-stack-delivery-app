

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const locationSchema= new Schema ( {
 
  company:{Type:String , default:'food delivery app' },
 address: {Type:String ,requre:true},
 number: {Type : Number ,require:true},
email: {Type: String ,requred : false}

 
},
{
  timestamps:true,
  versionKey: false,
}
);


const Location = mongoose.model('Location',locationSchema)

module.exports = Location 