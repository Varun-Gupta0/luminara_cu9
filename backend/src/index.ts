import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import connectDB from './db';

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/luminara');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
})();