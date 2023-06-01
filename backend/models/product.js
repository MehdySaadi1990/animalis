const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  userId: { type: String, required: true },
  reference: { type: String, required: true },
  designation: { type: String, required: true },
  categorie: { type: String, required: true },
  price: { type: String, required: true },
  image:{ type: String, required: true }
});

module.exports = mongoose.model('Product', productSchema);