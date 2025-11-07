import express from 'express';
import cors from 'cors';
import weatherRoutes from './routes/weather';
import authRoutes from './routes/auth';

const app = express();

app.use(express.json());

// Enable CORS
app.use(cors());

// Register routes
app.use('/api/weather', weatherRoutes);
app.use('/api/auth', authRoutes);

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

export default app;
