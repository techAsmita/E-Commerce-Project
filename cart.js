const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middleware/auth');

// Add to cart
router.post('/', auth, (req, res) => {
  const { product_id, quantity } = req.body;
  db.query('INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)', 
    [req.user.id, product_id, quantity],
    (err) => {
      if (err) throw err;
      res.json({ message: 'Added to cart' });
    });
});

// View cart
router.get('/', auth, (req, res) => {
  db.query('SELECT c.id, p.name, p.price, c.quantity FROM cart c JOIN products p ON c.product_id = p.id WHERE c.user_id = ?', 
    [req.user.id], 
    (err, results) => {
      if (err) throw err;
      res.json(results);
    });
});

// Delete from cart
router.delete('/:id', auth, (req, res) => {
  db.query('DELETE FROM cart WHERE id=? AND user_id=?', [req.params.id, req.user.id], (err) => {
    if (err) throw err;
    res.json({ message: 'Item removed from cart' });
  });
});

module.exports = router;