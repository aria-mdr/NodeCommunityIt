const {getConnection, Schema, mongoose} = require('../db/db')
getConnection();

// define schema for our collection
const userSchema = new Schema({
  name:    String,
  email: {
    type: String, 
    required: true,
    unique: true,
  }, 
  password: String, 
  course: String, 
  agrredToTerms: Boolean,
  address: {
    type: String, 
    default: '101 not real place'
  },
  bio: String, 
  dob: String, 
  createdAt: {
    type: Date, 
    default: Date.now
  },
  userType: Number,
})

// create a model, or collection
const userModel = mongoose.model('Users', userSchema)

// a method to confirm password

// when ever a user is saved, you want to send an email

module.exports = userModel