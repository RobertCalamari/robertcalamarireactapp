import React from "react";
import RightContent from "./components/RightContent";
import Navbar from "./components/Navbar";
import splashImage from "./img/splash.png";
import ProjectsBox from "./components/ProjectsBox";
import { useState } from "react";
import {NavLink} from "react-router-dom";

function Projects(props) {

    const [clockContentActive, setClockContentActive] = useState('none');
    const [mainContentActive, setMainContentActive] = useState('block');
    const [infoContentActive, setInfoContentActive] = useState(['none','Robert Calamari',"Oh hey you should not see me!"]);

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
                        <div className="main-header" style={{padding:'0 0 55px 0px'}}>{mainContentActive === "block" ? 'Projects' : 'Projects/Clocks'}</div>
                        <div className="main-body">
                            <div className="main-content projects-content" style={{display:mainContentActive }}>
                                <ProjectsBox name="Rob and Claudia Wedding" icon="website" setInfoContentActive={setInfoContentActive} plink="https://robandclaudiawedding.fun" info="An informational site for guests that cover everything they would need to know for an upcoming wedding." />
                                <ProjectsBox name="Booze Cruise" icon="game" setInfoContentActive={setInfoContentActive} plink="https://old-robertcalamari-node.herokuapp.com/games/boozecruise" info="Booze Cruise is a party drinking game, based off of the phone game 'Picolo'. Players input their names and select categories to get started, then take turns passing and reading the prompts that appear on the screen! Players either have to do whatever it says or take however many sips to not do it!" />
                                <ProjectsBox name="Wordle Clone" icon="game" setInfoContentActive={setInfoContentActive} plink='wordleclone' info="This is a game inspired by the popular New York Times game 'Wordle'! You have 6 chances to correctly guess the 5 letter word, using clues you get from the previous guess. Green means the letter is in the correct space, while yellow means that you have the correct letter, but in the wrong space." />
                                <ProjectsBox name="2048 Clone" icon="game" setInfoContentActive={setInfoContentActive} plink='2048clone' info="This is a game inspired by the popular game '2048', where you try to combine the numbers on the board to create the number 2048 or even higher." />
                                <ProjectsBox name="Codenames Clone" icon="game" setInfoContentActive={setInfoContentActive} plink='codenames' info="This is a game inspired by the popular game 'Codenames', where you try to figure out secret clues as a team, from the code master!" />
                                <ProjectsBox name="Clocks" setMainContentActive={setMainContentActive} setClockContentActive={setClockContentActive} icon="app" setInfoContentActive={setInfoContentActive} plink="https://www.robertcalamari.com/apps/clockapp" info="This is the first application I made with the Javascript library 'p5'. It showcases a bunch of different clocks I made using that library." />
                            </div>
                            <div className="clocks-content projects-content" style={{display:clockContentActive }}>
                                <ProjectsBox name="Analog Clock" icon="clock" setInfoContentActive={setInfoContentActive} plink="https://old-robertcalamari-node.herokuapp.com/apps/clockapp/analog" info="A 'p5' application of a clock that resembles an analog clock." />
                                <ProjectsBox name="Digital Clock" icon="clock" setInfoContentActive={setInfoContentActive} plink="https://old-robertcalamari-node.herokuapp.com/apps/clockapp/digital" info="A 'p5' application of a clock that resembles an digital clock." />
                                <ProjectsBox name="Calendar Clock" icon="clock" setInfoContentActive={setInfoContentActive} plink="https://old-robertcalamari-node.herokuapp.com/apps/clockapp/calendar" info="A 'p5' application of a clock that resembles a clock made to look like a calendar." />
                                <ProjectsBox name="Squares Clock" icon="clock" setInfoContentActive={setInfoContentActive} plink="https://old-robertcalamari-node.herokuapp.com/apps/clockapp/squares" info="A 'p5' application of a clock that resembles a clock that is made out of squares." />
                                <ProjectsBox name="Lines Clock" icon="clock" setInfoContentActive={setInfoContentActive} plink="https://old-robertcalamari-node.herokuapp.com/apps/clockapp/lines"   info="A 'p5' application of a clock that resembles... honestly i do not know why I made this one." />
                            </div>
                            


                        </div>
                    </div>
                </div>
                <div className="project-info-background" style={{display:infoContentActive[0]}} onClick={() => setInfoContentActive(['none','Robert Calamari',"Oh hey you should not see me!"])}></div>
                <div className="project-info-container" style={{display:infoContentActive[0]}}>
                    <div className="project-info-container-close" onClick={() => setInfoContentActive(['none','Robert Calamari',"Oh hey you should not see me!"])}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </div>
                    <div className="project-info-container-header">
                        <img className="projects-box-img" alt="project-box-img" style={{paddingRight:'10px'}} src={infoContentActive[4]} /> {infoContentActive[1]}
                    </div>
                    <div className="project-info-container-content">
                        {infoContentActive[2]}
                    </div>
                    <div className="project-info-container-open">
                    <NavLink strict="true" to={infoContentActive[1] === "Clocks" || infoContentActive[5] === "clock" ? "/projects/clocks" : "/projects"} onClick={infoContentActive[3]} style={{textDecoration: 'none', width:'100%', color:'white'}}>
                        Open
                    </NavLink>
                    </div>
                </div>
                <RightContent />
            </div>
        </div>

      );
}

export default Projects;