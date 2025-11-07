import { Router } from 'express';
import { registerFarmer, loginFarmer } from '../controllers/farmerController'; // no .ts
import { authMiddleware } from '../services/auth';
import Farmer from '../models/farmer.model';

const router = Router();

if (typeof registerFarmer !== 'function' || typeof loginFarmer !== 'function') {
  // Helpful during development — will throw early if imports are wrong
  throw new Error('farmController exports missing or wrong (registerFarmer / loginFarmer)');
}

router.post('/register', registerFarmer);
router.post('/login', loginFarmer);

// protected example: get own profile
router.get('/me', authMiddleware, async (req: any, res) => {
  const id = req.farmerId;
  const farmer = await Farmer.findById(id).select('-password');
  if (!farmer) return res.status(404).json({ message: 'Not found' });
  return res.json(farmer);
});

export default router;