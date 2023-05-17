import React from "react";
import RightContent from "./components/RightContent";
import MyPic from './img/mypic.png';
import Navbar from "./components/Navbar";
import splashImage from "./img/splash.png";

function About(props) {
 
    React.useEffect(() => {
          document.title = props.title; // eslint-disable-next-line
      }, []); 
      
    return (
        <div className="container">
            <Navbar />
            <div className="content" style={{backgroundImage: 'url('+splashImage+')'}}>
                <div className="left-content">
                    <div className="left-box">
                        <div className="main-header">About Me</div>
                        <div className="main-body">
                            <div className="about-body">
                                I received a Bachelor of Science degree in Information Technology and a minor in Computer Science in 2018, and have been working in the web development industry for 4 years. 
                                <br /><br />
                                I am an organized person, problem solver, and like to take on ambitious projects. I prefer to focus more on frontend applications, but know a fair amount of backend applications as well. I am well versed in <div style={{display: 'inline', color: '#00c3ff'}}>JavaScript, ReactJS, Node.JS, HTML5, CSS, MySQL, Git, and Adobe Products (Photoshop, After Effects, Premiere)</div>, but have also had experience with <div style={{display: 'inline', color: '#00c3ff'}}>WordPress snd Storyline</div>.
                                <br /><br />
                                Along with coding, I have always been interested in painting, strategy/online games, and making films. 
                                
                                
                                            
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

export default About;