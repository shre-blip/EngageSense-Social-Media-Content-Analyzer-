import React from 'react';
export default function About(){
  return (
    <div className="card">
      <h2 style={{marginTop:0}}>About</h2>
      <p className="muted">This tool was built to quickly extract and analyze social media copy from PDFs and images. It uses PDF parsing and Tesseract OCR on the server to extract text, then provides heuristic suggestions to improve engagement.</p>
      <h3>Features</h3>
      <ul className="muted">
        <li>PDF parsing to retain text flow</li>
        <li>Image OCR using Tesseract.js</li>
        <li>Quick engagement suggestions (hashtags, CTA, conciseness)</li>
      </ul>
    </div>
  );
}
