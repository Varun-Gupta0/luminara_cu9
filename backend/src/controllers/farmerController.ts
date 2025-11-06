import { Request, Response } from 'express';
import Farmer from '../models/farmer.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

export const registerFarmer = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, farmName, location } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing required fields' });

    const existing = await Farmer.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Email already registered' });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const farmer = new Farmer({ name, email, password: hashed, phone, farmName, location });
    await farmer.save();

    return res.status(201).json({ id: farmer._id, name: farmer.name, email: farmer.email });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

export const loginFarmer = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing credentials' });

    const farmer = await Farmer.findOne({ email });
    if (!farmer) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, farmer.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: farmer._id }, JWT_SECRET, { expiresIn: '7d' });
    return res.json({ token, farmer: { id: farmer._id, name: farmer.name, email: farmer.email } });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};