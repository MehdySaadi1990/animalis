const express = require('express')
const app = express()
const mongoose = require('mongoose');
const productRoutes = require('./routes/product')
const userRoutes = require('./routes/users')
const orderRoutes = require('./routes/order')
const path = require('path');
const jwt = require('jsonwebtoken');

require('dotenv').config();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

mongoose.connect(process.env.DATABASE,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  
app.use('/api/product', productRoutes)
app.use(express.json())
app.use('/api/users', userRoutes)
app.use('/api/order', orderRoutes)
app.use('/images', express.static(path.join(__dirname, 'images')))



module.exports = app
