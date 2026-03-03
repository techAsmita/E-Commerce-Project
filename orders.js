const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middleware/auth');

// Place order
router.post('/', auth, (req, res) => {
  const { address } = req.body;

  db.query('SELECT c.id, p.price, c.quantity, p.id as product_id FROM cart c JOIN products p ON c.product_id = p.id WHERE c.user_id=?', 
    [req.user.id], 
    (err, items) => {
      if (err) throw err;
      if (items.length === 0) return res.status(400).json({ message: 'Cart is empty' });

      const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

      db.query('INSERT INTO orders (user_id, total, address) VALUES (?, ?, ?)', 
        [req.user.id, total, address], 
        (err, orderResult) => {
          if (err) throw err;

          const orderId = orderResult.insertId;
          items.forEach(item => {
            db.query('INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
              [orderId, item.product_id, item.quantity, item.price]);
          });

          db.query('DELETE FROM cart WHERE user_id=?', [req.user.id]);
          res.json({ message: 'Order placed successfully', order_id: orderId });
        });
    });
});

// View user orders
router.get('/', auth, (req, res) => {
  const sql = req.user.is_admin 
    ? 'SELECT * FROM orders' 
    : 'SELECT * FROM orders WHERE user_id=?';
  const params = req.user.is_admin ? [] : [req.user.id];

  db.query(sql, params, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

module.exports = router;