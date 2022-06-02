import React from "react";
import Navbar from "./components/Navbar";
import splashImage from "./img/splash.png";
import PaintingBlock from './components/PaintingBlock';
import PaintingPage from "./components/PaintingPage";
import { getJsonFromUrl } from "./components/checkURL";
import { useIsMount } from './components/useIsMount';
import { useState, useEffect } from 'react';
import './css/Paintings.css';

function Art(props) {

    const [paintings, setPaintings] = useState([]);
    const [imgHolderLeft, setImgHolderLeft] = useState({});
    const [scrollLeftStyle, setscrollLeftStyle] = useState({});
    const [scrollRightStyle, setscrollRightStyle] = useState({});
    const [imgHolderSize, setImgHolderSize] = useState({});
    const [contentWidth, setContentWidth] = useState('');
    const [arrowsClicked, setArrowsClicked] = useState(0);
    const [animateImages, setAnimateImages] = useState(false);
    const [paintingsPageVisible, setPaintingsPageVisible] = useState('none');
    const [urlPainting, setURLPainting] = useState(0);
    const [paintingToSend, setPaintingToSend] = useState({
        "id": 345,
        "name": "Tentacles - Cornhole",
        "img": "https://i.imgur.com/yWhL9y7.jpg",
        "price": "300",
        "artist": "Robert Calamari",
        "material": "Acrylic/Sharpie on Wood",
        "size": "48x24",
        "issold": "2",
        "date": "2020",
        "other": ""
      });
    const isMount = useIsMount(); //this checks if it is the first render
    let width = useCurrentWidth(); //checks whenever there is a change in the width

    //initial run  one time only
    useEffect(() => {
        fetch('https://robertcalamari-reactapp.herokuapp.com/api/paintings') //get api
          .then(results => results.json())
          .then(data => {
            setPaintings(data.reverse());
          });
          document.title = props.title; //change title
          setImgHolderSize(document.getElementsByClassName("content")[0].getBoundingClientRect().height/5); //declare what size each image is
          window.innerWidth < 960 ? setContentWidth('100%') : setContentWidth(document.getElementsByClassName("content")[0].getBoundingClientRect().width + 'px'); //declare what content width is

          //wait a moment then animate images. Need to wait for render of everything
          setTimeout(function(){ 
            setAnimateImages(true);
            getJsonFromUrl(window.location.pathname) !== undefined ? setURLPainting(getJsonFromUrl(window.location.pathname).id) : console.log('no url');
           }, 400);

            
           
            
          // eslint-disable-next-line
      }, []); 

      //not sure why but after a button click the content changes adding 68px to the content, so this makes the content the initial size it was
      useEffect(() => { 
        if(window.innerWidth < 960){
        }else{
            setContentWidth((width-68) + 'px');
            setImgHolderSize(document.getElementsByClassName("content")[0].getBoundingClientRect().height/5);
        }
          // eslint-disable-next-line
      }, [width]); 

      //this checks if you are closing the paintings page
      useEffect(() => { 
        
        if (isMount) {
        } else {
            
            paintingsPageVisible === 'block' ? console.log(paintingsPageVisible) : closePaintingsPageBox();
        }
        // eslint-disable-next-line
    }, [paintingsPageVisible]); 

    //this checks to see if the url has changed and if so what is the id of the painting
    useEffect(() => { 
        
        if (isMount) {
        } else {
            for(var i in paintings){
                if(paintings[i].id === urlPainting){
                    setPaintingToSend(paintings[i]);
                    setPaintingsPageVisible('block');
                }
            }
            
        }
        // eslint-disable-next-line
    }, [urlPainting]); 



      //this checks for an initial render, then waits for animateImages to change to animate the paintings in
      useEffect(() => {
        if (isMount) {
        } else {
            animateAllImages(0);
        }
        // eslint-disable-next-line
      }, [animateImages]); 

      //this is the function for the two buttons on the sides
      function moveImgHolder(dir){
        const contentSize = document.getElementsByClassName("content")[0].getBoundingClientRect();
        const totalwidth = (Math.ceil(paintings.length/5)) * imgHolderSize;

        //this makes sure not to change the content on the first render,used for the weird 68px added to content
        if (isMount) {
        } else {
            setContentWidth(contentWidth);
        }

        //each button controls up to 5 views, they are set to 0 - 1/4 - 1/2 - 3/4 - page end, of the page
        const stepone = {transform: 'translate(-' + ((totalwidth/4) - (contentSize.right/4) + 68) + 'px, 0px)', width: totalwidth + 'px'};
        const steptwo = {transform: 'translate(-' + ((totalwidth/2) - (contentSize.right/2) + 68) + 'px, 0px)', width: totalwidth + 'px'};
        const stepthree = {transform: 'translate(-' + (((totalwidth/2) - (contentSize.right/2)) + ((totalwidth/4) - (contentSize.right/4)) + 68) + 'px, 0px)', width: totalwidth + 'px'};
        const stepBeg = {transform: 'translate(' + 0 + 'px, 0px)', width: totalwidth + 'px'};
        const stepEnd = {transform: 'translate(-' + (totalwidth - contentSize.right + 68) + 'px, 0px)', width: totalwidth + 'px'};

        //if the right arrow is clicked, imgholder will shift to the left, if the left arrow is clicked, imgholder will shift to the right, 
        if(dir === "left"){
            setArrowsClicked(arrowsClicked+1);
            if(arrowsClicked === 0){
                setImgHolderLeft(stepone);
                setscrollLeftStyle({display:"flex"});
            }else if(arrowsClicked === 1){
                setImgHolderLeft(steptwo);
            }else if(arrowsClicked === 2){
                setImgHolderLeft(stepthree);
            }else if(arrowsClicked === 3){
                setImgHolderLeft(stepEnd);
                setscrollRightStyle({display:"none"});
            }else if(arrowsClicked === 4){

            }
        }else{
            setArrowsClicked(arrowsClicked-1);
            if(arrowsClicked === 0){

            }else if(arrowsClicked === 1){
                setImgHolderLeft(stepBeg);
                setscrollLeftStyle({display:"none"});
            }else if(arrowsClicked === 2){
                setImgHolderLeft(stepone);
            }else if(arrowsClicked === 3){
                setImgHolderLeft(steptwo);
            }else if(arrowsClicked === 4){
                setImgHolderLeft(stepthree);
                setscrollRightStyle({display:"flex"});
            }
        }
      }

    //the nested function for animating the paintings   
    function animateAllImages(counter){
        try{
        //this gets the starting number, as each images' id is set not starting at 0
        const startingNum = parseInt(document.getElementsByClassName("img-background")[0].id.substring(document.getElementsByClassName("img-background")[0].id.indexOf('--') + 2)); 
         
        //since I am showing the paintings from newest to oldest, this needs to run in reverse
        
            if(counter < paintings.length){
                document.getElementById("img-background--" + (startingNum-counter)).animate([
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
                    animateAllImages(counter+1);
                    setTimeout(function(){ 
                        document.getElementById("img-background--" + (startingNum-counter)).classList.remove('no-opacity');
                        }, 1000);
                }, 40);
            }
        }catch(e){

        }
        
    }  

    function closePaintingsPageBox(){
        document.title = "Art | Robert Calamari";
        window.history.pushState({}, null, '/art');
    }



    return (
        <div className="container">
            <Navbar />
            <div className="content" style={{backgroundImage: 'url('+splashImage+')', flexDirection: 'column', width: contentWidth}}>
                <div className="paintings-page" style={{display: paintingsPageVisible}}>
                    <PaintingPage setURLPainting={setURLPainting} paintingsPageVisible={paintingsPageVisible} setPaintingsPageVisible={setPaintingsPageVisible} painting={paintingToSend} />
                </div>
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
                                <PaintingBlock key={painting.id} setPaintingToSend={setPaintingToSend} setPaintingsPageVisible={setPaintingsPageVisible} painting={painting}  />
                            ))
                        }
                    </div>
                </div>
                <div className="grey-out-area" style={{display: paintingsPageVisible}} onClick={()=>setPaintingsPageVisible('none')}></div>
            </div>
        </div>
        );
}

export default Art;


//this checks for any update on if the window width changes
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