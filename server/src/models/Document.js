import mongoose from 'mongoose';
const DocumentSchema = new mongoose.Schema({
  filename: String,
  mimetype: String,
  size: Number,
  text: { type: String, default: '' },
}, { timestamps: true });
export default mongoose.model('Document', DocumentSchema);
