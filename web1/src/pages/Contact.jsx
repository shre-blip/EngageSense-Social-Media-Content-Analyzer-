import React, { useState } from 'react';
export default function Contact(){
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState(false);
  function submit(e){
    e.preventDefault();
    setSent(true);
  }
  return (
    <div className="card">
      <h2 style={{marginTop:0}}>Contact Us</h2>
      {sent ? <div className="muted">Thanks! Your suggestion has been received.</div> : (
        <form onSubmit={submit}>
          <label>Your suggestion</label>
          <textarea rows={5} value={msg} onChange={e=>setMsg(e.target.value)} required />
          <div style={{height:12}} />
          <button className="btn" type="submit">Send suggestion</button>
        </form>
      )}
    </div>
  );
}
