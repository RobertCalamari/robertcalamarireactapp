import React from "react";
import RightContent from "./RightContent";
import MyPic from './img/mypic.png';
import Navbar from "./Navbar";
import splashImage from "./img/splash.png";

function About() {
    return (
        <div className="container">
            <Navbar pageColor={2} />
            <div className="content" style={{backgroundImage: 'url('+splashImage+')'}}>
                <div className="left-content">
                    <div className="left-box">
                        <div className="main-header">About Me</div>
                        <div className="main-body">
                            <div className="about-body">
                                I received a Bachelor of Science degree in Information Technology and a minor in Computer Science in 2018, and have been working in the web development industry ever since. 
                                <br /><br />
                                I am an organized person, problem solver, and like to take on ambitious projects. I prefer to focus more on frontend applications, but know a fair amount of the backend as well. I am well versed in <b>JavaScript, HTML5, CSS3, Node.JS, MongoDB, Git, and Adobe Products (Photoshop, After Effects, Premiere)</b>. I have also worked with <b>WordPress, React, XML, PHP, Express, and Socket.io</b>.
                                <br /><br />
                                Along with coding, I have always been interested in painting, strategy/online games, and woodworking. 

                                <img className="right-img nonweb" alt="Me" src={MyPic} style={{opacity: 1, paddingTop: '25px', width: '100%'}} />
                                
                            </div>
                        </div>
                    </div>
                </div>
                <RightContent picture="me"/>
            </div>
        </div>
      );
}

// document.getElementsByClassName("nav-icon")[2].classList.add("activePage");

export default About;