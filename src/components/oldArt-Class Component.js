import { Component } from 'react';
import React from "react";
import Navbar from "./Navbar";
import splashImage from "./img/splash.png";
import PaintingBlock from './PaintingBlock';
import './css/Paintings.css';

class Art extends Component {

    constructor(props) {
        super(props);
        this.state = {
            paintings: []
        }
    }

    //calling after component is rendered
    componentDidMount() {
        fetch('https://robertcalamari-reactapp.herokuapp.com/api/paintings')
        .then( res => res.json())
        .then(paintings => {
            this.setState({paintings: paintings});
        });
        
    }

    

    render() {
       
        return (
            <div className="container">
                <Navbar />
                <div className="content" style={{backgroundImage: 'url('+splashImage+')', flexDirection: 'column'}}>
                    <div className="paintings-holder noselect">
                        <div className="painting-scroll scroll-right" onMouseOver={()=>console.log('downright')} onMouseOut={()=>console.log('hovering up')}>
                            <svg style={{margin:'auto'}} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chevron-compact-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z"/>
                            </svg>
                        </div>
                        <div className="painting-scroll scroll-left" onMouseOver={()=>console.log('downleft')} onMouseOut={()=>console.log('hoveringup')}>
                            <svg style={{margin:'auto'}} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chevron-compact-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223z"/>
                            </svg>
                        </div>
                        <div className="img-holder">
                        {
                            this.state.paintings.map(painting => (
                                <PaintingBlock key={painting.id} painting={painting} />
                            ))
                        }
                        </div>
                    </div>
                    <div className="grey-out-area" onClick={()=>console.log('greyout')}></div>
                </div>
            </div>
          );
    }
}

export default Art;