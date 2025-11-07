import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Farmer } from '../models/Farmer';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const farmer = new Farmer({
      email,
      password: hashedPassword,
      name
    });

    await farmer.save();
    
    const token = jwt.sign({ id: farmer._id }, JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const farmer = await Farmer.findOne({ email });
    
    if (!farmer) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, farmer.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: farmer._id }, JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: 'Login failed' });
  }
});

export default router;