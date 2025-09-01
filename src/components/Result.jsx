import React from 'react';

function suggestImprovements(text) {
  const tips = [];
  const len = text.trim().length;
  const hashtags = (text.match(/#/g) || []).length;
  const urls = (text.match(/https?:\/\//g) || []).length;
  if (len < 80) tips.push('Add a stronger hook in the first 1–2 lines.');
  if (len > 280) tips.push('Consider shortening to a concise summary for social.');
  if (hashtags < 2) tips.push('Include 2–3 relevant hashtags.');
  if (urls === 0) tips.push('Add a link or CTA for conversions.');
  if (!/[?!]$/.test(text.trim())) tips.push('End with a question or CTA to encourage replies.');
  return tips.slice(0,5);
}

export default function Result({ filename, text }) {
  const tips = suggestImprovements(text || '');
  return (
    <div style={{display:'grid',gridTemplateColumns:'1fr 300px',gap:14,alignItems:'start'}}>
      <div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <h3 style={{margin:0}}>{filename || 'Extracted Text'}</h3>
          <div className="badge">Auto analysis</div>
        </div>
        <pre>{text || '—'}</pre>
      </div>
      <div className="card" style={{padding:12}}>
        <h4 style={{marginTop:0}}>Suggestions</h4>
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          {tips.map((t,i)=>(<div key={i} className="badge">{t}</div>))}
          {tips.length===0 && <div className="muted">No suggestions available.</div>}
        </div>
      </div>
    </div>
  );
}
