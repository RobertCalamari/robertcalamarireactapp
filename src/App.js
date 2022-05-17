import './css/App.css';
import React from 'react';
import Home from './Home';
import Contact from './Contact';
import About from './About';
import Projects from './Projects';
import Art from './Art';
import {Route, Routes} from "react-router-dom";
import Users from './User';

function App() {
  return (
        <>
        <Users />
    
        <Routes>
          <Route path="/" element={<Home  />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/art" element={<Art />} />
        </Routes>
        </>
        
    
  );
}


export default App;
