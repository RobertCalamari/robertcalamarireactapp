import React from 'react';
import { useEffect, useState} from 'react';
import $ from 'jquery';

function AboutMeForm() {

    const [selectedChoice, setSelectedChoice] = useState([0,'1111','2222']);
    const [scrollerYPos, setScrollerYPos] = useState(0);
    const [scrollerXPos, setScrollerXPos] = useState(0);

    useEffect(() => {
        setSelectedChoice([0,listoptions[0][1], listoptions[0][0]]);
    }, []); 

    useEffect(() => {
        setScrollerYPos(selectedChoice[0]*56);
        setScrollerXPos(selectedChoice[0]*131);
    }, [selectedChoice]); 

    const listoptions = [['About', 'This is the about page.etc etc etc.'],
                        ['Education', 'This is the Education page. etc etc etc.'],
                        ['Coding Skills', ['HTML', 'CSS', 'React']],
                        ['Tech Skills', 'This is the other skills. etc etc etc.'],
                        ['Painting', 'This is the painting skills. etc etc etc.'] ];

   
          
  return (
    <div className='aboutme-form-container'>
        <div className='aboutme-form-header'>
            <div className='aboutme-form-header-text'>
                About Me
            </div>
            <div className='aboutme-form-header-line'>
            </div>
        </div>
        <div className='aboutme-form-content'>
            <div className='aboutme-form-scroller' style={{top:scrollerYPos}}></div>
            <div className='aboutme-form-options'>
                <div className='aboutme-form-scroller-horizontal' style={{left:scrollerXPos}}></div>
                {listoptions.map((choice,i) => (
                    <div key={i} tabIndex={i} className={'aboutme-form-selections '+ (selectedChoice[0] === i ? 'selectedabouttab' : '')} onClick={() => setSelectedChoice([i,choice[1], choice[0]])}>{choice[0]}</div>
                ))}
            </div>
            <div className='aboutme-form-main'>
                <div className='aboutme-form-main-header'>
                    {selectedChoice[2]}
                </div>
                <div className='aboutme-form-main-content'>
                    
                        <ul className='aboutme-form-main-choice' style={selectedChoice[0] === 0 ? {display:'block'} : {display:'none'}}>
                            Hi, I'm Robert! I have been coding during my free time since 2014, and have been working as a developer since 2018. I used to love creating things, from drawings to making random stuff out of cardboard, and once I found out that you can create stuff on the computer, I was hooked.
                            <br/><br/>
                            I turned that passion of creating things into being able to do it everyday for a living. So feel free to see what I made below!  
                            <br/><br/>
                            <div><span style={{color:'var(--main-color)', fontFamily: 'SF-Mono-Bold'}}>E-mail: </span>rjcalamari@gmail.com</div><div><span style={{color:'var(--main-color)', fontFamily: 'SF-Mono-Bold'}}>Freelance: </span> Available</div>

                        </ul>
                        <ul className='aboutme-form-main-choice' style={selectedChoice[0] === 1? {display:'block'} : {display:'none'}}>
                            <div style={{fontSize:'22px'}}>New Jersey Institute of Technology</div>
                            <div style={{fontSize:'12px', paddingTop: '5px'}}>2014-2018</div>
                            <li>Bachelor of Science degree in Information Technology</li>
                            <li>Minor in Computer Science</li>
                        </ul>
                        <ul className='aboutme-form-main-choice two-rows' style={selectedChoice[0] === 2 ? {display:'block'} : {display:'none'}}>
                            <li>HTML5</li>
                            <li>CSS3</li>
                            <li>Javascript</li>
                            <li className='second-row-bullet'>Node.js</li>
                            <li>React</li>
                            <li>MySQL</li>
                        </ul>
                        <ul className='aboutme-form-main-choice' style={selectedChoice[0] === 3 ? {display:'block'} : {display:'none'}}>
                            <li>Adobe Products (Photoshop, After Effects, Premiere)</li>
                            <li>Git</li>
                            <li>Storyline</li>
                            <li>Wordpress</li>
                        </ul>
                        <ul className='aboutme-form-main-choice' style={selectedChoice[0] === 4 ? {display:'block'} : {display:'none'}}>
                             In addition to coding, I also paint as a hobby. I specialise in acrylic but also use oil from time to time. You can check out some of my recent pieces below! My artwork is for sale, and I also take requests.
                             <br /><br />
                             <div><span style={{color:'var(--main-color)', fontFamily: 'SF-Mono-Bold'}}>Commissions: </span>Open</div>
                        </ul>

                    
                </div>
            </div>
        </div>
    </div>
    
  );
}
export default AboutMeForm;