import { Router } from 'express';
import { registerFarmer, loginFarmer } from '../controllers/farmerController';
import { authMiddleware } from '../services/auth';
import Farmer from '../models/farmer.model';

const router = Router();

router.post('/register', registerFarmer);
router.post('/login', loginFarmer);

router.get('/me', authMiddleware, async (req: any, res) => {
  const id = req.farmerId;
  const farmer = await Farmer.findById(id).select('-password');
  if (!farmer) return res.status(404).json({ message: 'Not found' });
  return res.json(farmer);
});

export default router;