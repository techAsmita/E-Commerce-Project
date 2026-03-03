const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', 
    [name, email, hashed], 
    (err) => {
      if (err) return res.status(400).json({ message: 'User already exists!' });
      res.json({ message: 'Registered successfully' });
    });
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email=?', [email], async (err, results) => {
    if (err || results.length === 0) return res.status(400).json({ message: 'Invalid credentials' });
    
    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    
    const token = jwt.sign({ id: user.id, is_admin: user.is_admin }, process.env.JWT_SECRET);
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, is_admin: user.is_admin } });
  });
});

module.exports = router;