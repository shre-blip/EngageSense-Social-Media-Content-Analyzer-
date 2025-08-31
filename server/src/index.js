import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { PORT, MONGODB_URI, CLIENT_ORIGIN } from './config.js';
import uploadsRouter from './routes/uploads.js';

const app = express();
app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json({ limit: '10mb' }));

app.get('/api/health', (_, res) => res.json({ ok: true }));
app.use('/api', uploadsRouter);

mongoose.connect(MONGODB_URI).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
}).catch(err => {
  console.error('MongoDB connection error', err);
  process.exit(1);
});
