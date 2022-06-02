import React from "react";
import RightContent from "./components/RightContent";
import Navbar from "./components/Navbar";
import splashImage from "./img/splash.png";
import ProjectsBox from "./components/ProjectsBox";
import { useState } from "react";

function Projects(props) {

    const [clockContentActive, setClockContentActive] = useState('none');
    const [mainContentActive, setMainContentActive] = useState('block');

    React.useEffect(() => {
          document.title = props.title;
          if(props.clock === "true"){
            setClockContentActive('block');
            setMainContentActive('none');
          }

          // eslint-disable-next-line
      }, []); 

      React.useEffect(() => {
        if(props.clock === "false"){
            setClockContentActive('none');
            setMainContentActive('block');
          }

        // eslint-disable-next-line
    }, [window.location.pathname]); 

    return (
        <div className="container">
            <Navbar />
            <div className="content" style={{backgroundImage: 'url('+splashImage+')'}}>
            <div className="left-content">
                    <div className="left-box">
                        <div className="main-header" style={{padding:'0 0 55px 0px'}}>Projects</div>
                        <div className="main-body">
                            <div className="main-content projects-content" style={{display:mainContentActive }}>
                                <ProjectsBox name="Booze Cruise" icon="game" plink="https://www.robertcalamari.com/games/boozecruise" />
                                <ProjectsBox name="Clocks" setMainContentActive={setMainContentActive} setClockContentActive={setClockContentActive} icon="app" plink="https://www.robertcalamari.com/apps/clockapp" />
                                <ProjectsBox name="RobertCalamari Node.js" icon="website" plink="https://www.robertcalamari.com" />
                            </div>
                            <div className="clocks-content projects-content" style={{display:clockContentActive }}>
                                <ProjectsBox name="Analog Clock" icon="clock" plink="https://www.robertcalamari.com/apps/clockapp/analog" />
                                <ProjectsBox name="Digital Clock" icon="clock" plink="https://www.robertcalamari.com/apps/clockapp/digital" />
                                <ProjectsBox name="Calendar Clock" icon="clock" plink="https://www.robertcalamari.com/apps/clockapp/calendar" />
                                <ProjectsBox name="Squares Clock" icon="clock" plink="https://www.robertcalamari.com/apps/clockapp/squares" />
                                <ProjectsBox name="Lines Clock" icon="clock" plink="https://www.robertcalamari.com/apps/clockapp/lines" />
                            </div>
                            


                        </div>
                    </div>
                </div>
                <RightContent />
            </div>
        </div>

      );
}

export default Projects;