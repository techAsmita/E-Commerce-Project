require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/orders', require('./routes/orders'));

const PORT = process.env.PORT || 5000;

db.connect(err => {
  if (err) throw err;
  console.log(' MySQL connected.');
  app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
});