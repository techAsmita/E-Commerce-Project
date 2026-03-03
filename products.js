const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middleware/auth');

// Add product (Admin only)
router.post('/', auth, (req, res) => {
  if (!req.user.is_admin) return res.status(403).json({ message: 'Access denied' });
  const { name, description, price, stock, image } = req.body;
  db.query('INSERT INTO products (name, description, price, stock, image) VALUES (?, ?, ?, ?, ?)', 
    [name, description, price, stock, image], 
    (err) => {
      if (err) throw err;
      res.json({ message: 'Product added' });
    });
});

// View all products
router.get('/', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Delete product (Admin only)
router.delete('/:id', auth, (req, res) => {
  if (!req.user.is_admin) return res.status(403).json({ message: 'Access denied' });
  db.query('DELETE FROM products WHERE id=?', [req.params.id], (err) => {
    if (err) throw err;
    res.json({ message: 'Product deleted' });
  });
});

module.exports = router;