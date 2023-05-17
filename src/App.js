import './css/App.css';
import React from 'react';
import Home from './Home';
import Contact from './Contact';
import About from './About';
import Projects from './Projects';
import Games from './Games';
import Art from './Art';
import Wordle from './Wordle';
import Clone2048 from './Clone2048';
import {Route, Routes} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
        <>    
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Home  title="Robert Calamari" />} />
            <Route path="/about" element={<About title="Robert Calamari | About" />} />
            <Route path="/projects" element={<Projects title="Robert Calamari | Projects" clock="false" />} />
            <Route path="/projects/clocks" element={<Projects title="Robert Calamari | Projects - Clocks" clock="true" />} />
            <Route path="/games/wordleclone" element={<Wordle title="Robert Calamari | Games - Wordle Clone" />} />
            <Route path="/games/2048clone" element={<Clone2048 title="Robert Calamari | Games - 2048 Clone" />} />
            <Route path="/art" element={<Art title="Robert Calamari | Art" />} />
            <Route path="/contact" element={<Contact title="Robert Calamari | Contact" />} />
            <Route path="/games" element={<Games title="Robert Calamari | Games" />} />
          </Routes>
        </ScrollToTop>
        
        </>
        
    
  );
}


export default App;
