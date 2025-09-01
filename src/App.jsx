import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Analyzer from './pages/Analyzer.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';

function Nav(){ 
  const loc = useLocation();
  return (
    <div className="nav">
      <div className="brand">
        <div className="logo">🌐</div>
        <div>
          <h1>EngageSense</h1>
          <div className="muted" style={{fontSize:12}}>PDF parsing + OCR + engagement tips</div>
        </div>
      </div>
      <div className="menu">
        <Link className={"link "+(loc.pathname==='/'? 'active':'')} to="/">Home</Link>
        <Link className={"link "+(loc.pathname==='/analyzer'? 'active':'')} to="/analyzer">Analyzer</Link>
        <Link className={"link "+(loc.pathname==='/about'? 'active':'')} to="/about">About</Link>
        <Link className={"link "+(loc.pathname==='/contact'? 'active':'')} to="/contact">Contact Us</Link>
      </div>
    </div>
  );
}

export default function App(){
  return (
    <div className="app">
      <Nav />
      <div className="content">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/analyzer' element={<Analyzer />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
</div>
     
      <footer>Built with ❤️ —EngageSense</footer>
    </div>
  );
}
