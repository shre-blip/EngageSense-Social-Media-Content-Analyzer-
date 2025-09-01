// import React, { useState, useEffect } from 'react';
// import Dropzone from '../components/Dropzone.jsx';
// import Result from '../components/Result.jsx';
// import { uploadFile, listDocuments, getDocument } from '../api.js';

// export default function Analyzer(){
//   const [busy, setBusy] = useState(false);
//   const [error, setError] = useState('');
//   const [result, setResult] = useState(null);
//   const [recent, setRecent] = useState([]);

//   async function refresh() {
//     try { setRecent(await listDocuments()); } catch (e) { console.error(e); }
//   }
//   useEffect(() => { refresh(); }, []);

//   async function handleFile(file) {
//     setError(''); setBusy(true); setResult(null);
//     try {
//       const data = await uploadFile(file);
//       setResult({ filename: data.filename, text: data.text });
//       refresh();
//     } catch (e) {
//       setError(e?.response?.data?.error || 'Upload failed');
//     } finally {
//       setBusy(false);
//     }
//   }

//   async function openDoc(id) {
//     setBusy(true); setError('');
//     try { const d = await getDocument(id); setResult({ filename: d.filename, text: d.text }); }
//     catch (e) { setError('Could not open document'); }
//     finally { setBusy(false); }
//   }

//   return (
//     <div className="grid">
//       <div>
//         <div className="card">
//           <h2 style={{marginTop:0}}>Analyzer</h2>
//           <p className="muted">Drop a PDF or image below and we will extract text and suggest improvements.</p>
//           <div style={{height:12}} />
//           <Dropzone onFile={handleFile} />
//           {busy && (
//             <div style={{marginTop:12}} className="card"><div className="row"><div className="badge">Processing</div><div className="muted">Extracting text… this may take a few seconds.</div></div></div>
//           )}
//           {error && (
//             <div style={{marginTop:12}} className="card" ><div className="row"><div className="badge">Error</div><div className="muted">{error}</div></div></div>
//           )}
//           {result && (
//             <div style={{marginTop:12}} className="card"><Result filename={result.filename} text={result.text} /></div>
//           )}
//         </div>
//       </div>
//       <div>
//         <div className="card">
//           <h3 style={{marginTop:0}}>Recent uploads</h3>
//           <div style={{display:'flex',flexDirection:'column',gap:8}}>
//             {recent.map(r => (
//               <button key={r.id} className="badge" style={{textAlign:'left'}} onClick={() => openDoc(r.id)} title={`${r.mimetype} • ${Math.round((r.size||0)/1024)} KB`}>{r.filename}</button>
//             ))}
//             {recent.length === 0 && <div className="muted">No documents yet.</div>}
//           </div>
//         </div>
//         <div style={{height:12}} />
//         <div className="card">
//           <h3 style={{marginTop:0}}>Suggestions</h3>
//           <div className="muted">Try uploading content with a clear headline. For images, ensure text is legible for better OCR results.</div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import Dropzone from '../components/Dropzone.jsx';
import Result from '../components/Result.jsx';
import { uploadFile, listDocuments, getDocument } from '../api.js';

export default function Analyzer(){
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [recent, setRecent] = useState([]);

  async function refresh() {
    try { setRecent(await listDocuments()); } catch (e) { console.error(e); }
  }
  useEffect(() => { refresh(); }, []);

  async function handleFile(file) {
    setError(''); setBusy(true); setResult(null);
    try {
      const data = await uploadFile(file);
      const text = data.text || "";
      setResult({ 
        filename: data.filename, 
        text, 
        suggestions: generateSuggestions(text)  
      });
      refresh();
    } catch (e) {
      setError(e?.response?.data?.error || 'Upload failed');
    } finally {
      setBusy(false);
    }
  }

  async function openDoc(id) {
    setBusy(true); setError('');
    try { 
      const d = await getDocument(id); 
      const text = d.text || "";
      setResult({ 
        filename: d.filename, 
        text, 
        suggestions: generateSuggestions(text)  
      });
    }
    catch (e) { setError('Could not open document'); }
    finally { setBusy(false); }
  }

  // ✅ Dynamic suggestions only
  function generateSuggestions(text) {
    if (!text) return ["No text extracted. Try another file."];

    const suggestions = [];
    const lower = text.toLowerCase();

    if (text.length < 50) {
      suggestions.push("Your content is too short — add more details.");
    } else if (text.length > 500) {
      suggestions.push("Your content is long — break into shorter posts.");
    }

    if (!/[!?]$/.test(text.trim())) {
      suggestions.push("End with a call-to-action or question.");
    }

    if (!text.includes("#")) {
      suggestions.push("Add 2–3 relevant hashtags.");
    }

    if (!/[A-Z]/.test(text.slice(0, 40))) {
      suggestions.push("Start with a strong hook or headline.");
    }

    if (!lower.includes("free") && !lower.includes("new") && !lower.includes("today")) {
      suggestions.push("Try persuasive words like 'free', 'new', or 'today'.");
    }

    if (!text.match(/https?:\/\//)) {
      suggestions.push("Include a link if you want to drive traffic.");
    }

    return suggestions.length ? suggestions : ["Looks great!"];
  }

  return (
    <div className="grid">
      <div>
        <div className="card">
          <h2 style={{marginTop:0}}>Analyzer</h2>
          <p className="muted">Drop a PDF or image below and we will extract text and suggest improvements.</p>
          <div style={{height:12}} />
          <Dropzone onFile={handleFile} />
          {busy && (
            <div style={{marginTop:12}} className="card">
              <div className="row">
                <div className="badge">Processing</div>
                <div className="muted">Extracting text… this may take a few seconds.</div>
              </div>
            </div>
          )}
          {error && (
            <div style={{marginTop:12}} className="card" >
              <div className="row">
                <div className="badge">Error</div>
                <div className="muted">{error}</div>
              </div>
            </div>
          )}
          {result && (
            <>
              <div style={{marginTop:12}} className="card">
                <Result filename={result.filename} text={result.text} />
              </div>
              <div style={{marginTop:12}} className="card">
                <h3 style={{marginTop:0}}>Suggestions for the analysis:</h3>
                <ul>
                  {result.suggestions.map((s, i) => (
                    <li key={i} className="muted">{s}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
      <div>
        <div className="card">
          <h3 style={{marginTop:0}}>Recent uploads</h3>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {recent.map(r => (
              <button 
                key={r.id} 
                className="badge" 
                style={{textAlign:'left'}} 
                onClick={() => openDoc(r.id)} 
                title={`${r.mimetype} • ${Math.round((r.size||0)/1024)} KB`}
              >
                {r.filename}
              </button>
            ))}
            {recent.length === 0 && <div className="muted">No documents yet.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
