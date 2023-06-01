const mongoose= require('mongoose');
const Joi = require("joi");
const Schema = mongoose.Schema

const userSchema =  new Schema({
    email: { 
        type: String,
        required: true,
        unique: true },
    password: { 
        type: String,
        required: true },
    verified: {
        type: Boolean,
        default: false,
      },
})

const User = mongoose.model('User', userSchema);

const validate = (user) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password:Joi.string().required(),
    });
    return schema.validate(user);
  };
  
  module.exports = {
    User,
    validate,
  };