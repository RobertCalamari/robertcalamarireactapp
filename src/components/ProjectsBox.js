import React from "react";
import "../css/Projects.css";
import projectImgGame from '../img/projects/game.png';
import projectImgApp from '../img/projects/app.png';
import projectImgWebsite from '../img/projects/website.png';
import projectImgClock from '../img/projects/clock.png';
import {NavLink} from "react-router-dom";

function ProjectsBox({name, plink, icon, setClockContentActive, setMainContentActive}){
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
            <NavLink strict="true" to={name === "Clocks" || icon === "clock" ? "/projects/clocks" : "/projects"} style={{textDecoration: 'none'}}>
                <div className="projects-box noselect" onClick={oclick}>
                    <div className="projects-box-icon">
                        <img className="projects-box-img" alt="project-box-img" src={seticon} />
                    </div>
                    <div className="projects-box-name">
                        {name}
                    </div>
                </div>

            </NavLink>
            
        </>
        
    );

}


export default ProjectsBox;