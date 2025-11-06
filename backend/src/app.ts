import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import farmerRoutes from './routes/farmerRoutes';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/farmers', farmerRoutes);

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

export default app;