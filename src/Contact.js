import React from "react";
import RightContent from "./components/RightContent";
import GitPic from  "./img/github.png";
import GmailPic from  "./img/gmail.png";
import Navbar from "./components/Navbar";
import splashImage from "./img/splash.png";

function Contact(props) {

    React.useEffect(() => {
          document.title = props.title; // eslint-disable-next-line
      }, []); 
      
    return (
        <div className="container">
            <Navbar />
            <div className="content" style={{backgroundImage: 'url('+splashImage+')'}}>
                <div className="left-content">
                    <div className="left-box">
                        <div className="main-header" style={{padding:'0 0 55px 0px'}}>Contact Me</div>
                        <div className="main-body main-space-even" style={{display: 'flex', flexWrap: 'wrap', maxWidth: '682px', justifyContent: 'space-evenly', paddingBottom: '20px'}}>
                            <img className="contact-box-img shrink" alt="gitpic" src={GitPic} onClick={() => goTo('https://github.com/robertcalamari')} />
                            <img className="contact-box-img shrink" alt="gmailpic" src={GmailPic} onClick={() => goTo('mailto:rjcalamari@gmail.com')} />
                        </div>
                    </div>
                </div>
                <RightContent />
            </div>
        </div>
      );
}

function goTo(where){
    window.location.href = where;
}

export default Contact;