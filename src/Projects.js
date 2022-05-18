import React from "react";
import RightContent from "./RightContent";
import Navbar from "./Navbar";
import splashImage from "./img/splash.png";

function Projects() {
    return (
        <div className="container">
            <Navbar pageColor={3} />
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