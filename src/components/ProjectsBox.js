import React from "react";
import "../css/Projects.css";
import projectImgGame from '../img/projects/game.png';
import projectImgApp from '../img/projects/app.png';
import projectImgWebsite from '../img/projects/website.png';
import projectImgClock from '../img/projects/clock.png';
import {NavLink} from "react-router-dom";

function ProjectsBox({name, plink, icon, setClockContentActive, setMainContentActive, setInfoContentActive, info}){
    let seticon = '';
    let oclick = '';

    icon === "game" ? seticon = projectImgGame : icon === "website" ? seticon = projectImgWebsite : icon === "clock" ? seticon = projectImgClock : seticon = projectImgApp;
    name === "Clocks" ? oclick = ()=> changeToClocks() : oclick = ()=> window.location.href = plink;
    

    function changeToClocks(){
        setClockContentActive("block");
        setMainContentActive("none");
        
    }

    return(
        <>
            
                <div className="projects-box noselect">
                    <NavLink strict="true" to={name === "Clocks" || icon === "clock" ? "/projects/clocks" : "#"} onClick={oclick} style={{textDecoration: 'none', width:'100%', color:'white'}}>
                    <div className="projects-box-left">
                        <div className="projects-box-icon">
                            <img className="projects-box-img" alt="project-box-img" src={seticon} />
                        </div>
                        <div className="projects-box-name">
                            {name}
                        </div>
                    </div>
                    </NavLink>
                    <div className="projects-box-right">
                        <div className="projects-box-info" onClick={() => setInfoContentActive(['flex', name, info, oclick, seticon, icon ])}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                        </div>
                    </div>
                    
                </div>

            
            
        </>
        
    );

}


export default ProjectsBox;