import React from "react";
import RightContent from "./RightContent";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import splashImage from "./img/splash.png";

function Home() {
    return (
        <div className="container">
            <Navbar pageColor={1} />
            <div className="content" style={{backgroundImage: 'url('+splashImage+')'}}>
                <div className="left-content">
                    <div className="left-box-frontpage">
                        <div className="main-title first">
                            Robert 
                        </div>
                        <br />
                        <div className="main-title second">
                            Calamari
                        </div>
                        <br /><br />
                        <div className="main-subtitle">
                            Front End Developer / Artist
                        </div>
                        <br /><br /><br />
                        <Link to="/about"><button className='main-button'>Learn More!</button></Link>
                    </div>
                </div>
                <RightContent />
            </div>
        </div>
        
      );
}

export default Home;