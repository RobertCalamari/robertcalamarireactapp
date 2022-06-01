import React from "react";
import Navbar from "./components/Navbar";
import splashImage from "./img/splash.png";
import PaintingBlock from './components/PaintingBlock';
import { useState, useEffect } from 'react';
import './css/Paintings.css';

function Art(props) {

    const [paintings, setPaintings] = React.useState([]);
    const [imgHolderLeft, setImgHolderLeft] = React.useState({});
    const [scrollLeftStyle, setscrollLeftStyle] = React.useState({});
    const [scrollRightStyle, setscrollRightStyle] = React.useState({});
    const [imgHolderSize, setImgHolderSize] = React.useState({});
    const [contentWidth, setContentWidth] = React.useState('');
    const [contentWidthChange, setContentWidthChange] = React.useState(false);
    const [arrowsClicked, setArrowsClicked] = React.useState(0);

    let width = useCurrentWidth();
    let height = useCurrentHeight();

    React.useEffect(() => {
        fetch('https://robertcalamari-reactapp.herokuapp.com/api/paintings')
          .then(results => results.json())
          .then(data => {
            setPaintings(data.reverse());
          });
          document.title = props.title; 
          setImgHolderSize(document.getElementsByClassName("content")[0].getBoundingClientRect().height/5);

          window.innerWidth < 960 ? setContentWidth('width: 100%') : setContentWidth('width: ' + document.getElementsByClassName("content")[0].getBoundingClientRect().width + 'px');
          // eslint-disable-next-line
      }, []); 

      React.useEffect(() => {
        const totalwidth = (Math.ceil(paintings.length/5)) * imgHolderSize;
        const contentSize = document.getElementsByClassName("content")[0].getBoundingClientRect();
        
        if(window.innerWidth < 960){
            setscrollLeftStyle({display:"none"});
            setscrollRightStyle({display:"none"});
            setArrowsClicked(0);
        }else{
            setContentWidth('width: ' + (width-68) + 'px');
            setImgHolderSize(document.getElementsByClassName("content")[0].getBoundingClientRect().height/5);
            if(arrowsClicked ===0){
                setscrollRightStyle({display:"flex"});
                setImgHolderLeft({transform: 'translate(' + 0 + 'px, 0px)', width: totalwidth + 'px'});
            }else if(arrowsClicked ===1){
                setscrollRightStyle({display:"flex"});
                setscrollLeftStyle({display:"flex"});
            }else if(arrowsClicked ===2){
                setscrollRightStyle({display:"flex"});
                setscrollLeftStyle({display:"flex"});
            }else if(arrowsClicked ===3){
                setscrollRightStyle({display:"flex"});
                setscrollLeftStyle({display:"flex"});
            }else if(arrowsClicked ===4){
                setscrollLeftStyle({display:"flex"});
                setImgHolderLeft({right: 0, position:'absolute', left: 'unset', width: totalwidth + 'px'});
            }
        }

          // eslint-disable-next-line
      }, [width]); 

      function moveImgHolder(dir){
        const contentSize = document.getElementsByClassName("content")[0].getBoundingClientRect();
        const totalwidth = (Math.ceil(paintings.length/5)) * imgHolderSize;

        if(contentWidthChange === false){
            setContentWidth(contentWidth);
            setContentWidthChange(true);
        }

        if(dir === "left"){
            if(arrowsClicked === 0){
                setImgHolderLeft({transform: 'translate(-' + ((totalwidth/4) - (contentSize.right/4) + 68) + 'px, 0px)', width: totalwidth + 'px'});
                setArrowsClicked(1);
                setscrollLeftStyle({display:"flex"});
            }else if(arrowsClicked === 1){
                setImgHolderLeft({transform: 'translate(-' + ((totalwidth/2) - (contentSize.right/2) + 68) + 'px, 0px)', width: totalwidth + 'px'});
                setArrowsClicked(2);
            }else if(arrowsClicked === 2){
                setImgHolderLeft({transform: 'translate(-' + (((totalwidth/2) - (contentSize.right/2)) + ((totalwidth/4) - (contentSize.right/4)) + 68) + 'px, 0px)', width: totalwidth + 'px'});
                setArrowsClicked(3);
            }else if(arrowsClicked === 3){
                setImgHolderLeft({transform: 'translate(-' + (totalwidth - contentSize.right + 68) + 'px, 0px)', width: totalwidth + 'px'});
                setArrowsClicked(4);
                setscrollRightStyle({display:"none"});
            }else if(arrowsClicked === 4){

            }
        }else{
            if(arrowsClicked === 0){

            }else if(arrowsClicked === 1){
                setImgHolderLeft({transform: 'translate(' + 0 + 'px, 0px)', width: totalwidth + 'px'});
                setArrowsClicked(0);
                setscrollLeftStyle({display:"none"});
            }else if(arrowsClicked === 2){
                setImgHolderLeft({transform: 'translate(-' + ((totalwidth/4) - (contentSize.right/4) + 68) + 'px, 0px)', width: totalwidth + 'px'});
                setArrowsClicked(1);
            }else if(arrowsClicked === 3){
                setImgHolderLeft({transform: 'translate(-' + ((totalwidth/2) - (contentSize.right/2) + 68) + 'px, 0px)', width: totalwidth + 'px'});
                setArrowsClicked(2);
            }else if(arrowsClicked === 4){
                setImgHolderLeft({transform: 'translate(-' + (((totalwidth/2) - (contentSize.right/2)) + ((totalwidth/4) - (contentSize.right/4)) + 68) + 'px, 0px)', width: totalwidth + 'px'});
                setscrollRightStyle({display:"flex"});
                setArrowsClicked(3);
            }
        }
      }

      function animateAllImages(counter){
    
        if(counter > 0){
            document.getElementById("img-background-" + (paintings.length-counter)).animate([
                // keyframes
                { opacity: 0 }, 
                { opacity: 1 }
              ], { 
                // timing options
                duration: 500,
                iterations: 1,
                fill: "forwards",
                easing: "ease-in-out"
              });
              setTimeout(function(){ 
                animateAllImages(counter-1);
                setTimeout(function(){ 
                    document.getElementById("img-background-" + (paintings.length-counter)).classList.remove('no-opacity');
                   }, 1000);
               }, 40);
        }    
    }

    return (
        <div className="container">
            <Navbar />
            <div className="content" style={{backgroundImage: 'url('+splashImage+')', flexDirection: 'column', contentWidth}}>
                <div className="paintings-holder noselect">
                    <div className="painting-scroll scroll-right" style={scrollRightStyle} onClick={()=>moveImgHolder("left")}>
                        <svg style={{margin:'auto'}} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chevron-compact-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z"/>
                        </svg>
                    </div>
                    <div className="painting-scroll scroll-left" style={scrollLeftStyle} onClick={()=>moveImgHolder("right")}>
                        <svg style={{margin:'auto'}} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chevron-compact-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223z"/>
                        </svg>
                    </div>
                    <div className="img-holder" style={imgHolderLeft}>
                        {
                            paintings.map(painting => (
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

export default Art;


const getWidth = () => window.innerWidth 
  || document.documentElement.clientWidth 
  || document.body.clientWidth;

function useCurrentWidth() {
  // save current window width in the state object
  let [width, setWidth] = useState(getWidth());

  // in this case useEffect will execute only once because
  // it does not have any dependencies.
  useEffect(() => {
    // timeoutId for debounce mechanism
    let timeoutId = null;
    const resizeListener = () => {
      // prevent execution of previous setTimeout
      clearTimeout(timeoutId);
      // change width from the state object after 150 milliseconds
      timeoutId = setTimeout(() => setWidth(getWidth()), 150);
    };
    // set resize listener
    window.addEventListener('resize', resizeListener);

    // clean up function
    return () => {
      // remove resize listener
      window.removeEventListener('resize', resizeListener);
    }
  }, [])

  return width;
}

const getHeight = () => window.innerHeight
  || document.documentElement.clientHeight
  || document.body.clientHeight;

function useCurrentHeight() {
  // save current window width in the state object
  let [height, setHeight] = useState(getHeight());

  // in this case useEffect will execute only once because
  // it does not have any dependencies.
  useEffect(() => {
    // timeoutId for debounce mechanism
    let timeoutId = null;
    const resizeListener = () => {
      // prevent execution of previous setTimeout
      clearTimeout(timeoutId);
      // change width from the state object after 150 milliseconds
      timeoutId = setTimeout(() => setHeight(getHeight()), 150);
    };
    // set resize listener
    window.addEventListener('resize', resizeListener);

    // clean up function
    return () => {
      // remove resize listener
      window.removeEventListener('resize', resizeListener);
    }
  }, [])

  return height;
}