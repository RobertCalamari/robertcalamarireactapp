import React from "react";
import RightContent from "./components/RightContent";
import Navbar from "./components/Navbar";
import splashImage from "./img/splash.png";
import ContactForm from "./components/ContactForm";

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
                        <div className="main-body main-space-even" style={{paddingBottom: '20px'}}>                            
                            <ContactForm header={"Send me a message!"} />
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