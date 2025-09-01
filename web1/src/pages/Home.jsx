import React from 'react';
import { Link } from 'react-router-dom';
export default function Home(){
  return (
    
    <div>
      <div className="hero card">
        <div className="left">
          <h2>Smart media analytics✨</h2>
          <p className="muted"> Unlock powerful insights into your content performance.</p>
          <div style={{marginTop:12}} className="row">
            <Link to="/analyzer" className="btn">Try Analyzer</Link>
             <Link to="/about" className="btn secondary">Learn more</Link>
          </div>
        </div>
        <div style={{width:320}}>
          <div className="card">
            <div style={{fontSize:12,color:'var(--muted)'}}>Quick tips</div>
            <div style={{marginTop:10}}>
              <div className="badge">Use a strong hook in first 2 lines</div>
              <div style={{height:8}} />
              <div className="badge">Add 2–3 targeted hashtags</div>
              <div style={{height:8}} />
              <div className="badge">End with a CTA/question</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{marginTop:18}} className="grid">
        <div className="card">
          <h3 style={{marginTop:0}}>Why this helps:</h3>
          <p className="muted">Good social content needs clarity, a hook, and a strong call-to-action. Our analyzer gives fast heuristics and lets you copy extracted text for editing.</p>
        </div>
        <div className="card">
          <h3 style={{marginTop:0}}>Recent uploads:</h3>
          <div id="recent-list" className="muted">Open Analyzer to upload and view recent files.</div>
        </div>
      </div>
    </div>
  );
}
