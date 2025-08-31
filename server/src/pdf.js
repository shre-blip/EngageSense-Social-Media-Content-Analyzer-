// server/src/pdf.js
// Use the internal lib implementation to avoid pdf-parse index.js test harness bug
import createPdfParse from 'pdf-parse/lib/pdf-parse.js';

const pdf = createPdfParse;

export async function extractFromPdf(buffer) {
  try {
    const data = await pdf(buffer);
    return data.text || '';
  } catch (err) {
    console.error('PDF parse failed', err);
    return '';
  }
}
