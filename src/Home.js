import React from "react";
import { useRef, useEffect, useState} from 'react';
import { Link, NavLink } from "react-router-dom";
import MyPic from './img/mypicsquare.png';
import MyPic2 from './img/mypic2.png';
import Navbar from "./components/Navbar";
import splashImage from "./img/splash.png";
import ContactForm from "./components/ContactForm";
import AboutMeForm from "./components/AboutMeForm";
import Typical from 'react-typical';
import { useScrollPosition } from '@n8tb1t/use-scroll-position'



function Home(props) {

    const [changeLearnMe, setChangeLearnMe] = useState('move-me-main-button');
    const [showButtonSwap, setShowButtonSwap] = useState(true);
    const [moveButtonPos, setMoveButtonPos] = useState(['10%','15%']);

    useEffect(() => {
          document.title = props.title; // eslint-disable-next-line
      }, []); 

      useScrollPosition(({ prevPos, currPos }) => {
        // console.log(currPos.x, currPos.y, document.getElementById('static-learn-button').getBoundingClientRect().bottom);
        if(currPos.y <=-275){
                setChangeLearnMe('move-me-main-button moveToCornerRight');
                setShowButtonSwap(false);
        }else{
                setChangeLearnMe('move-me-main-button');
                setShowButtonSwap(true);
                setMoveButtonPos([document.getElementById('static-learn-button').getBoundingClientRect().left, document.getElementById('static-learn-button').getBoundingClientRect().top]);
        }
      })
      
      
    return (
        <div className="container">
            <Navbar />
            <div className="content" style={{backgroundImage: 'url('+splashImage+')', display:'block', overflowY: 'hidden', overflowX: 'hidden', paddingBottom:'119px'}}>
                <div className="home-box hbox-one" style={{backgroundImage: 'url('+splashImage+')', backgroundRepeat: 'no-repeat'}}>
                    <div className="home-box-sub center" style={{flexDirection:'column', textAlign:'left', position:'relative'}}>
                        <div className="" style={{margin: '0 10% 0 10%'}}>
                            <div className="home-title intro-fade-in">
                                Robert<br />Calamari
                            </div>
                            <div className="home-subtitle intro-fade-in">
                                <Typical 
                                    loop={Infinity}
                                    wrapper='b'
                                    
                                    steps={useRef([
                                        'Front-End Developer', 2000, 
                                        '', 1000, 
                                        'Designer', 2000, 
                                        '', 1000, 
                                        'React Developer', 2000, 
                                        '', 1000, 
                                        'Artist', 2000, 
                                        '', 1000, 
                                        'Programmer', 2000, 
                                    ]).current}
                                />
                            </div>
                            <div className="home-description intro-fade-in">
                                Hello! I am a Front-End Developer that produces modern front-end products and designs clean user interfaces. 
                            </div>
                            <NavLink to="/contact"><button className='main-button intro-fade-in' id='static-learn-button' style={showButtonSwap ? {visibility:'visible', transitionDelay: '500ms', transitionProperty: 'visibility'} : {visibility:'hidden'}}>Contact Me!</button></NavLink>
                            <NavLink to="/contact"><button className={changeLearnMe} style={showButtonSwap ? {visibility:'hidden', left:moveButtonPos[0], top:moveButtonPos[1]} : {visibility:'visible', left:moveButtonPos[0], top:moveButtonPos[1]}}><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-envelope" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383l-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"/>
                            </svg></button></NavLink> 
                        </div>
                       
                    </div>
                    <div className="home-box-sub center">
                        <div className="home-main-img-container home-main-img intro-fade-in-right">
                            <div className="home-img-square"></div>
                            <img className="right-img home-main-img intro-fade-in-right" alt="RightImage" style={{opacity:"1", maxWidth:"400px", maxHeight:"400px", width:"100%"}} src={MyPic} />
                        </div>
                    </div>

                    
                </div>
                <div className="home-box hbox-two" id="more" style={{background: '#121c3c'}}>
                    <div style={{width:'100%', maxWidth:'800px'}}>
                        <AboutMeForm />
                    </div>
                  
                  </div>
                {/* <div className="home-box">
                ▹Some content...  Some content...  Some content...  Some content...  Some content...  Some content...  Some content...  Some content...  Some content...  Some content...  Some content...  Some content...  Some content...  Some content...  Some content...  Some content...  Some content...  Some content...  Some content...  Some content...  Some content... 
                </div>
                <div className="home-box" style={{background: '#122844'}}>
                ▹Some content...  Some content...  Some content...  Some content...  Some content...  Some content...  Some content...  Some content...  Some content...  Some content...  Some content...  Some content...  Some content...  Some content...  Some content...  Some content...  Some content...  Some content...  Some content...  Some content...  Some content... 
                </div> */}

                <div className="home-box" >
                    <div style={{width:'100%', maxWidth:'800px', marginTop:'100px'}}>
                        <ContactForm header={"Let's Connect!"} />
                    </div>
                </div>
            </div>
        </div>
         
      );
}

export default Home;