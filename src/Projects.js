import React from "react";
import RightContent from "./components/RightContent";
import Navbar from "./components/Navbar";
import splashImage from "./img/splash.png";

function Projects(props) {

    React.useEffect(() => {
          document.title = props.title;// eslint-disable-next-line
      }, []); 

    return (
        <div className="container">
            <Navbar />
            <div className="content" style={{backgroundImage: 'url('+splashImage+')'}}>
                <div className="left-content">
                    Projects Page
                </div>
                <RightContent />
            </div>
        </div>

      );
}

export default Projects;