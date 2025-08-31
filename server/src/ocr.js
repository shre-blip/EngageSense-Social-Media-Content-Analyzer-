import Tesseract from 'tesseract.js';
export async function extractFromImage(buffer) {
  const { data } = await Tesseract.recognize(buffer, 'eng', {
    tessedit_char_whitelist: undefined
  });
  return data.text || '';
}
