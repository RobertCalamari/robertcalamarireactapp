import './css/App.css';
import React from 'react';
import Home from './Home';
import Contact from './Contact';
import About from './About';
import Projects from './Projects';
import Art from './Art';
import {Route, Routes} from "react-router-dom";

function App() {
  return (
        <>    
        <Routes>
          <Route path="/" element={<Home  title="Robert Calamari" />} />
          <Route path="/about" element={<About title="Robert Calamari | About" />} />
          <Route path="/projects" element={<Projects title="Robert Calamari | Projects" />} />
          <Route path="/art" element={<Art title="Robert Calamari | Art" />} />
          <Route path="/contact" element={<Contact title="Robert Calamari | Contact" />} />
        </Routes>
        </>
        
    
  );
}


export default App;
