import React from "react";
import {NavLink} from "react-router-dom";
import '../css/Navbar.css';
import CalamariWhite from '../img/CalamariWhite.png';
import HamMenu from '../img/hammenu.png';

function Navbar() {
  
    return (
        <div className="header">
            <NavLink to="/" onClick={closeMenuBar}>
                <div className="icon">
                    <img className="logo-img" alt="Calamari" src={CalamariWhite} />
                </div>
            </NavLink>
            <div className="navbar">
                <div className="navbox">
                    <NavLink to="/" style={isActive => ({color: isActive.isActive ? "#00c3ff" : "#8d8d8d"})} onClick={closeMenuBar}>
                        <div className="nav-text">
                            HOME
                        </div>
                        <div className="nav-icon">
                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-house" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
                                <path fillRule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
                            </svg>
                        </div>
                    </NavLink>
                </div>
                <div className="navbox">
                    <NavLink to="/about" style={isActive => ({color: isActive.isActive ? "#00c3ff" : "#8d8d8d"})} onClick={closeMenuBar}>
                        <div className="nav-text">
                            ABOUT
                        </div>
                        <div className="nav-icon">
                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-person" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                            </svg>
                        </div>
                    </NavLink>
                </div>
                <div className="navbox">
                    <NavLink to="/projects" style={isActive => ({color: isActive.isActive ? "#00c3ff" : "#8d8d8d"})} onClick={closeMenuBar}>
                        <div className="nav-text">
                            PROJECTS
                        </div>
                        <div className="nav-icon">
                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-gear" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M8.837 1.626c-.246-.835-1.428-.835-1.674 0l-.094.319A1.873 1.873 0 0 1 4.377 3.06l-.292-.16c-.764-.415-1.6.42-1.184 1.185l.159.292a1.873 1.873 0 0 1-1.115 2.692l-.319.094c-.835.246-.835 1.428 0 1.674l.319.094a1.873 1.873 0 0 1 1.115 2.693l-.16.291c-.415.764.42 1.6 1.185 1.184l.292-.159a1.873 1.873 0 0 1 2.692 1.116l.094.318c.246.835 1.428.835 1.674 0l.094-.319a1.873 1.873 0 0 1 2.693-1.115l.291.16c.764.415 1.6-.42 1.184-1.185l-.159-.291a1.873 1.873 0 0 1 1.116-2.693l.318-.094c.835-.246.835-1.428 0-1.674l-.319-.094a1.873 1.873 0 0 1-1.115-2.692l.16-.292c.415-.764-.42-1.6-1.185-1.184l-.291.159A1.873 1.873 0 0 1 8.93 1.945l-.094-.319zm-2.633-.283c.527-1.79 3.065-1.79 3.592 0l.094.319a.873.873 0 0 0 1.255.52l.292-.16c1.64-.892 3.434.901 2.54 2.541l-.159.292a.873.873 0 0 0 .52 1.255l.319.094c1.79.527 1.79 3.065 0 3.592l-.319.094a.873.873 0 0 0-.52 1.255l.16.292c.893 1.64-.902 3.434-2.541 2.54l-.292-.159a.873.873 0 0 0-1.255.52l-.094.319c-.527 1.79-3.065 1.79-3.592 0l-.094-.319a.873.873 0 0 0-1.255-.52l-.292.16c-1.64.893-3.433-.902-2.54-2.541l.159-.292a.873.873 0 0 0-.52-1.255l-.319-.094c-1.79-.527-1.79-3.065 0-3.592l.319-.094a.873.873 0 0 0 .52-1.255l-.16-.292c-.892-1.64.902-3.433 2.541-2.54l.292.159a.873.873 0 0 0 1.255-.52l.094-.319z"/>
                                <path fillRule="evenodd" d="M8 5.754a2.246 2.246 0 1 0 0 4.492 2.246 2.246 0 0 0 0-4.492zM4.754 8a3.246 3.246 0 1 1 6.492 0 3.246 3.246 0 0 1-6.492 0z"/>
                            </svg>
                        </div>
                    </NavLink>
                </div>
                <div className="navbox">
                    <NavLink to="/art" style={isActive => ({color: isActive.isActive ? "#00c3ff" : "#8d8d8d"})} onClick={closeMenuBar}>
                        <div className="nav-text">
                            ART
                        </div>
                        <div className="nav-icon">
                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-brush" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.067 6.067 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.117 8.117 0 0 1-3.078.132 3.658 3.658 0 0 1-.563-.135 1.382 1.382 0 0 1-.465-.247.714.714 0 0 1-.204-.288.622.622 0 0 1 .004-.443c.095-.245.316-.38.461-.452.393-.197.625-.453.867-.826.094-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.2-.925 1.746-.896.126.007.243.025.348.048.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.175-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04zM4.705 11.912a1.23 1.23 0 0 0-.419-.1c-.247-.013-.574.05-.88.479a11.01 11.01 0 0 0-.5.777l-.104.177c-.107.181-.213.362-.32.528-.206.317-.438.61-.76.861a7.127 7.127 0 0 0 2.657-.12c.559-.139.843-.569.993-1.06a3.121 3.121 0 0 0 .126-.75l-.793-.792zm1.44.026c.12-.04.277-.1.458-.183a5.068 5.068 0 0 0 1.535-1.1c1.9-1.996 4.412-5.57 6.052-8.631-2.591 1.927-5.566 4.66-7.302 6.792-.442.543-.796 1.243-1.042 1.826a11.507 11.507 0 0 0-.276.721l.575.575zm-4.973 3.04l.007-.005a.031.031 0 0 1-.007.004zm3.582-3.043l.002.001h-.002z"/>
                            </svg>
                        </div>
                    </NavLink>
                </div>
                <div className="navbox">
                    <NavLink to="/contact" style={isActive => ({color: isActive.isActive ? "#00c3ff" : "#8d8d8d"})} onClick={closeMenuBar}>
                        <div className="nav-text">
                            CONTACT
                        </div>
                        <div className="nav-icon">
                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-envelope" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383l-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"/>
                            </svg>
                        </div>
                    </NavLink>
                </div>



            </div>

            <div className="icon menubutton">
                <img className="logo-img mobileonly" alt="" src={HamMenu} onClick={openMenuBar} />
            </div>
            
        </div>

        
      );
}

var menuBarIsOpen = false;

function openMenuBar(){
    if(menuBarIsOpen === false){
        document.getElementsByClassName("mobileonly")[0].classList.add("rotate180");
        setTimeout(() => {
            document.getElementsByClassName("mobileonly")[0].classList.remove("rotate180");            
        }, 300);
        document.getElementsByClassName("navbar")[0].classList.add("widthonehundred");
        document.getElementsByClassName("navbar")[0].classList.add("opacitynone");      
        menuBarIsOpen = true;
        
    }else{
        closeMenuBar();
    }
}

function closeMenuBar(){
    document.getElementsByClassName("navbar")[0].classList.remove("widthonehundred");  
    setTimeout(() => {
        document.getElementsByClassName("navbar")[0].classList.remove("opacitynone");            
    }, 300);          
    
    document.getElementsByClassName("mobileonly")[0].classList.add("rotate180");
    setTimeout(() => {
        document.getElementsByClassName("mobileonly")[0].classList.remove("rotate180");            
    }, 300);

    document.getElementsByClassName("navbar")[0].classList.add("widthzero");
    setTimeout(() => {
        document.getElementsByClassName("navbar")[0].classList.remove("widthzero");            
    }, 500);
    menuBarIsOpen = false;
}




export default Navbar;