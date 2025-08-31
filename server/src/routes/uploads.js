import express from 'express';
import multer from 'multer';
import Document from '../models/Document.js';
import { extractFromPdf } from '../pdf.js';
import { extractFromImage } from '../ocr.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 15 * 1024 * 1024 } });

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const { originalname, mimetype, size, buffer } = req.file;

    let text = '';
    if (mimetype === 'application/pdf') {
      text = await extractFromPdf(buffer);
    } else if (mimetype.startsWith('image/')) {
      text = await extractFromImage(buffer);
    } else {
      return res.status(415).json({ error: 'Unsupported file type. Upload PDF or image.' });
    }

    const doc = await Document.create({ filename: originalname, mimetype, size, text });
    res.json({ id: doc._id, filename: originalname, text });
  } catch (err) {
    console.error('Upload error', err);
    res.status(500).json({ error: 'Failed to process file' });
  }
});

router.get('/documents', async (_req, res) => {
  const docs = await Document.find().sort({ createdAt: -1 }).limit(25).lean();
  res.json(docs.map(d => ({ id: d._id, filename: d.filename, createdAt: d.createdAt, size: d.size, mimetype: d.mimetype })));
});

router.get('/documents/:id', async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id).lean();
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json({ id: doc._id, filename: doc.filename, text: doc.text, createdAt: doc.createdAt });
  } catch {
    res.status(400).json({ error: 'Invalid ID' });
  }
});

export default router;
