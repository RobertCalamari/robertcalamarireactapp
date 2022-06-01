import React from "react";
import RightContent from "./components/RightContent";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import splashImage from "./img/splash.png";

function Home(props) {

    React.useEffect(() => {
          document.title = props.title; // eslint-disable-next-line
      }, []); 
      
    return (
        <div className="container">
            <Navbar />
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