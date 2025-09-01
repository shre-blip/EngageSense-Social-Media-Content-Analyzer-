import React from 'react';
import { useDropzone } from 'react-dropzone';

export default function Dropzone({ onFile }) {
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    accept: { 'application/pdf': ['.pdf'], 'image/*': [] },
    multiple: false,
    onDrop: files => { if (files?.[0]) onFile(files[0]); }
  });
  return (
    <div {...getRootProps()} style={{
      border: '2px dashed rgba(255,255,255,0.04)',
      borderRadius: 12, padding: 26, textAlign:'center',
      background: isDragActive ? 'rgba(255,255,255,0.02)' : 'transparent', cursor:'pointer'
    }}>
      <input {...getInputProps()} />
      <h3 style={{margin:0}}>Drop a PDF or Image here</h3>
      <p className="muted">or click to choose a file</p>
    </div>
  );
}
