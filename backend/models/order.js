const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    userId: { type: String, required: true },
    order: { type:Array, required: true},
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    delivery:{ type: String, required: true },
    notice:{ type: String}
  });
  
  module.exports = mongoose.model('Order', orderSchema);