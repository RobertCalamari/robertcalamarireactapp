import './css/2048.css';
import './css/App.css';
import { useEffect, useState } from 'react';
import NumberSquare from './components/2048/NumberSquare';
import { useIsMount } from './components/useIsMount';
import RightContent from "./components/RightContent";
import Navbar from "./components/Navbar";
import splashImage from "./img/splash.png";

function Clone2048() {

  const [squares, setSquares] = useState([]);
  const [clickedKey, setClickedKey] = useState(false);
  const [waitClick, setWaitClick] = useState(false);
  const [gameOverScreen, setGameOverScreen] = useState(false);
  const [newNumber, setNewNumber] = useState(20);
  const [squaresNotUsed, setSquaresNotUsed] = useState([]);
  const [squaresMovement, setSquaresMovement] = useState([]);
  const isMount = useIsMount(); 

  useEffect(() => {


    newGame();

    document.addEventListener('keydown', detectKeyDown2, true);
    swipedetect(document, function(swipedir){
      if (swipedir ==='left'){
        detectSwipe('ArrowLeft');
      }else if (swipedir ==='right'){
        detectSwipe('ArrowRight');
      }else if (swipedir ==='up'){
        detectSwipe('ArrowUp');
      }else if (swipedir ==='down'){
        detectSwipe('ArrowDown');
      }
    });
    
  }, []);

  const detectKeyDown2 = (e) => {
    setClickedKey(e.key);
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
      e.preventDefault();
    }
  }

  function detectSwipe(dir){
    setClickedKey(dir);
  }

  function swipedetect(el, callback){
  
    var touchsurface = el,
    swipedir,
    startX,
    startY,
    distX,
    distY,
    dist,
    threshold = 50, //required min distance traveled to be considered swipe
    restraint = 100, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 800, // maximum time allowed to travel that distance
    elapsedTime,
    startTime,
    handleswipe = callback || function(swipedir){}
  
    touchsurface.addEventListener('touchstart', function(e){
        var touchobj = e.changedTouches[0]
        swipedir = 'none'
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        // e.preventDefault()
    }, false)
  
    touchsurface.addEventListener('touchmove', function(e){
        // e.preventDefault() // prevent scrolling when inside DIV
    }, false)
  
    touchsurface.addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        if (elapsedTime <= allowedTime){ // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
                swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
                swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
            }
        }
        handleswipe(swipedir)
        // e.preventDefault()
    }, false)
}

  useEffect(() => {
    if (isMount) {
    } else {
      console.log("Clicked Key: ", clickedKey);  
      
      // console.log(squares);    
      console.log('hello you are down', clickedKey, squares);

      if(clickedKey === "ArrowUp"){
        moveUp();
      }else if(clickedKey === "ArrowDown"){
        moveDown();
      }else if(clickedKey === "ArrowLeft"){
        moveLeft();
      }else if(clickedKey === "ArrowRight"){
        moveRight();
      }
      setClickedKey(false);
    }
      
  }, [clickedKey]);

  function newGame(){
    setNewNumber(20);
    let locationAndNumber = getNumbers(true);
    let locationAndNumber2 = getNumbers(true);
    while(locationAndNumber[0] === locationAndNumber2[0]){
      locationAndNumber2 = getNumbers(true);
    }
    let begArr = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    let usedArr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    setSquaresMovement([['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],]);
    // let begArr = [2,0,0,2,2,0,0,2,2,0,0,0,2,0,0,4];
    // let usedArr = [1,2,5,6,9,10,11,13,14];
    begArr[locationAndNumber[0]] = locationAndNumber[1];
    begArr[locationAndNumber2[0]] = locationAndNumber2[1];
    usedArr = removeFromArray(usedArr, locationAndNumber[0]);
    usedArr = removeFromArray(usedArr, locationAndNumber2[0]);
    

    setSquares(begArr);
    setSquaresNotUsed(usedArr);
    setGameOverScreen(false);

  }

  function moveUp(){
    if(waitClick === false){
      console.log('moved up-------------------------------------------------------------------------------------------------------');
      
      let temparr = [];
      let tempUsedArr = [];
      setSquaresMovement([['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],]);
      let tempSquareMovArr = [];

      for(let i in squaresMovement){
        tempSquareMovArr[i] = squaresMovement[i];
      }
      for(let i in squares){
        temparr[i] = [squares[i],0];
      }
      for(let i in squaresNotUsed){
        tempUsedArr[i] = squaresNotUsed[i];
      }
      let cont =  false;
      for(let i in temparr){
        if(temparr[i][0] === 0){
        }else{
          if((i-4)<0){
          }else{
            if(temparr[i-4][0] === 0){
              if((i-8)<0){
                temparr[i-4][0] = temparr[i][0];
                temparr[i][0] = 0;
                temparr[i][1] = 0;
                cont = true;
                tempSquareMovArr = setMoveArray(tempSquareMovArr, i, 'up', 'one');
                let usedArr = removeFromArray(squaresNotUsed, i-4);
                usedArr.push(parseInt(i));
                setSquaresNotUsed(usedArr);
              }else{
                if(temparr[i-8][0] === 0){
                  if((i-12)<0){
                    temparr[i-8][0] = temparr[i][0];
                    temparr[i][0] = 0;
                    temparr[i][1] = 0;
                    tempSquareMovArr = setMoveArray(tempSquareMovArr, i, 'up', 'two');
                    cont = true;
                    let usedArr = removeFromArray(squaresNotUsed, i-8);
                    usedArr.push(parseInt(i));
                    setSquaresNotUsed(usedArr);
                  }else{
                    if(temparr[i-12][0] === 0){
                      temparr[i-12][0] = temparr[i][0];
                      temparr[i][0] = 0;
                      temparr[i][1] = 0;
                      cont = true;
                      tempSquareMovArr = setMoveArray(tempSquareMovArr, i, 'up', 'three');
                      let usedArr = removeFromArray(squaresNotUsed, i-12);
                      usedArr.push(parseInt(i));
                      setSquaresNotUsed(usedArr);
                    }else if(temparr[i-12][0] === temparr[i][0]){
                      if(temparr[i-12][1] === 1){
                        temparr[i-8][0] = temparr[i][0];
                        temparr[i][0] = 0;
                        temparr[i][1] = 0;
                        tempSquareMovArr = setMoveArray(tempSquareMovArr, i, 'up', 'two');
                        cont = true;
                        let usedArr = removeFromArray(squaresNotUsed, i-8);
                        usedArr.push(parseInt(i));
                        setSquaresNotUsed(usedArr);
                      }else{
                        temparr[i-12][0] = temparr[i][0]+temparr[i][0];
                        temparr[i][0] = 0;
                        temparr[i][1] = 0;
                        temparr[i-12][1] = 1;
                        tempSquareMovArr = setMoveArray(tempSquareMovArr, i, 'up', 'three');
                        cont = true;
                        let usedArr = squaresNotUsed;
                        usedArr.push(parseInt(i));
                        setSquaresNotUsed(usedArr);
                      }
                    }else{
                      temparr[i-8][0] = temparr[i][0];
                      temparr[i][0] = 0;
                      temparr[i][1] = 0;
                      cont = true;
                      tempSquareMovArr = setMoveArray(tempSquareMovArr, i, 'up', 'two');
                      let usedArr = removeFromArray(squaresNotUsed, i-8);
                      usedArr.push(parseInt(i));
                      setSquaresNotUsed(usedArr);
                    }
                  }
                }else if(temparr[i-8][0] === temparr[i][0]){
                  if(temparr[i-8][1] === 1){
                    temparr[i-4][0] = temparr[i][0];
                    temparr[i][0] = 0;
                    temparr[i][1] = 0;
                    tempSquareMovArr = setMoveArray(tempSquareMovArr, i, 'up', 'two');
                    cont = true;
                    let usedArr = removeFromArray(squaresNotUsed, i-4);
                    usedArr.push(parseInt(i));
                    setSquaresNotUsed(usedArr);
                  }else{
                    temparr[i-8][0] = temparr[i][0]+temparr[i][0];
                    temparr[i][0] = 0;
                    temparr[i][1] = 0;
                    temparr[i-8][1] = 1;
                    cont = true;
                    tempSquareMovArr = setMoveArray(tempSquareMovArr, i, 'up', 'two');
                    let usedArr = squaresNotUsed;
                    usedArr.push(parseInt(i));
                    setSquaresNotUsed(usedArr);
                  }
                }else{
                  temparr[i-4][0] = temparr[i][0];
                  temparr[i][0] = 0;
                  temparr[i][1] = 0;
                  cont = true;
                  tempSquareMovArr = setMoveArray(tempSquareMovArr, i, 'up', 'one');
                  let usedArr = removeFromArray(squaresNotUsed, i-4);
                  usedArr.push(parseInt(i));
                  setSquaresNotUsed(usedArr);
                }
              }
            }else if(temparr[i-4][0] === temparr[i][0]){
              if(temparr[i-4][1] === 1){
              }else{
                temparr[i-4][0] = temparr[i][0]+temparr[i][0];
                temparr[i][0] = 0;
                temparr[i][1] = 0;
                temparr[i-4][1] = 1;
                tempSquareMovArr = setMoveArray(tempSquareMovArr, i, 'up', 'one');
                cont = true;
                let usedArr = removeFromArray(squaresNotUsed, i-4);
                usedArr.push(parseInt(i));
                setSquaresNotUsed(usedArr);
              }
            }else{
            }
          }
        }
      }

      if(cont === false){
        setSquaresNotUsed(tempUsedArr);
        if(squaresNotUsed.length === 0){
          gameOver();
        }
      }else{
        moveSquares(tempSquareMovArr, temparr);
      }

    } else{

    }
  }

  function moveRight(){
    if(waitClick === false){

    
      console.log('moved right-------------------------------------------------------------------------------------------------------');
      
      let temparr = [];
      let tempUsedArr = [];    
      setSquaresMovement([['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],]);
      let tempSquareMovArr = [];

      for(let i in squaresMovement){
        tempSquareMovArr[i] = squaresMovement[i];
      }
      for(let i in squares){
        temparr[i] = [squares[i],0];
      }
      for(let i in squaresNotUsed){
        tempUsedArr[i] = squaresNotUsed[i];
      }
      let cont =  false;
      for(let i in temparr){
        i = temparr.length-i-1;
        if(temparr[i][0] === 0){
        }else{
          if( ((i>=0 && i<=3) && (i+1)>3) || ((i>=4 && i<=7) && (i+1)>7) || ((i>=8 && i<=11) && (i+1)>11)  || ((i>=12 && i<=15) && (i+1)>15)){
          }else{
            if(temparr[i+1][0] === 0){
              if( ((i>=0 && i<=3) && (i+2)>3) || ((i>=4 && i<=7) && (i+2)>7) || ((i>=8 && i<=11) && (i+2)>11)  || ((i>=12 && i<=15) && (i+2)>15)){
                temparr[i+1][0] = temparr[i][0];
                temparr[i][0] = 0;
                temparr[i][1] = 0;
                cont = true;
                tempSquareMovArr = setMoveArray(tempSquareMovArr, i, 'right', 'one');
                let usedArr = removeFromArray(squaresNotUsed, i+1);
                usedArr.push(parseInt(i));
                setSquaresNotUsed(usedArr);
              }else{
                if(temparr[i+2][0] === 0){
                  if( ((i>=0 && i<=3) && (i+3)>3) || ((i>=4 && i<=7) && (i+3)>7) || ((i>=8 && i<=11) && (i+3)>11)  || ((i>=12 && i<=15) && (i+3)>15)){
                    temparr[i+2][0] = temparr[i][0];
                    temparr[i][0] = 0;
                    temparr[i][1] = 0;
                    cont = true;
                    tempSquareMovArr = setMoveArray(tempSquareMovArr, i, 'right', 'two');
                    let usedArr = removeFromArray(squaresNotUsed, i+2);
                    usedArr.push(parseInt(i));
                    setSquaresNotUsed(usedArr);
                  }else{
                    if(temparr[i+3][0] === 0){
                      temparr[i+3][0] = temparr[i][0];
                      temparr[i][0] = 0;
                      temparr[i][1] = 0;
                      cont = true;
                      tempSquareMovArr = setMoveArray(tempSquareMovArr, i, 'right', 'three');
                      let usedArr = removeFromArray(squaresNotUsed, i+3);
                      usedArr.push(parseInt(i));
                      setSquaresNotUsed(usedArr);
                    }else if(temparr[i+3][0] === temparr[i][0]){
                      if(temparr[i+3][1] === 1){
                        temparr[i+2][0] = temparr[i][0];
                        temparr[i][0] = 0;
                        temparr[i][1] = 0;
                        cont = true;
                        tempSquareMovArr = setMoveArray(tempSquareMovArr, i, 'right', 'two');
                        let usedArr = removeFromArray(squaresNotUsed, i+2);
                        usedArr.push(parseInt(i));
                        setSquaresNotUsed(usedArr);
                      }else{
                        temparr[i+3][0] = temparr[i][0]+temparr[i][0];
                        temparr[i][0] = 0;
                        temparr[i][1] = 0;
                        temparr[i+3][1] = 1;
                        cont = true;
                        tempSquareMovArr = setMoveArray(tempSquareMovArr, i, 'right', 'three');
                        let usedArr = squaresNotUsed;
                        usedArr.push(parseInt(i));
                        setSquaresNotUsed(usedArr);
                      }
                    }else{
                      temparr[i+2][0] = temparr[i][0];
                      temparr[i][0] = 0;
                      temparr[i][1] = 0;
                      cont = true;
                      tempSquareMovArr = setMoveArray(tempSquareMovArr, i, 'right', 'two');
                      let usedArr = removeFromArray(squaresNotUsed, i+2);
                      usedArr.push(parseInt(i));
                      setSquaresNotUsed(usedArr);
                    }
                  }
                }else if(temparr[i+2][0] === temparr[i][0]){
                  if(temparr[i+2][1] === 1){
                    temparr[i+1][0] = temparr[i][0];
                    temparr[i][0] = 0;
                    temparr[i][1] = 0;
                    cont = true;
                    tempSquareMovArr = setMoveArray(tempSquareMovArr, i, 'right', 'one');
                    let usedArr = removeFromArray(squaresNotUsed, i+1);
                    usedArr.push(parseInt(i));
                    setSquaresNotUsed(usedArr);
                  }else{
                    temparr[i+2][0] = temparr[i][0]+temparr[i][0];
                    temparr[i][0] = 0;
                    temparr[i][1] = 0;
                    temparr[i+2][1] = 1;
                    tempSquareMovArr = setMoveArray(tempSquareMovArr, i, 'right', 'two');
                    cont = true;
                    let usedArr = squaresNotUsed;
                    usedArr.push(parseInt(i));
                    setSquaresNotUsed(usedArr);
                  }
                }else{
                  temparr[i+1][0] = temparr[i][0];
                  temparr[i][0] = 0;
                  temparr[i][1] = 0;
                  cont = true;
                  tempSquareMovArr = setMoveArray(tempSquareMovArr, i, 'right', 'one');
                  let usedArr = removeFromArray(squaresNotUsed, i+1);
                  usedArr.push(parseInt(i));
                  setSquaresNotUsed(usedArr);
                }
              }
            }else if(temparr[i+1][0] === temparr[i][0]){
              if(temparr[i+1][1] === 1){
              }else{
                temparr[i+1][0] = temparr[i][0]+temparr[i][0];
                temparr[i][0] = 0;
                temparr[i][1] = 0;
                temparr[i+1][1] = 1;
                cont = true;
                tempSquareMovArr = setMoveArray(tempSquareMovArr, i, 'right', 'one');
                let usedArr = removeFromArray(squaresNotUsed, i+1);
                usedArr.push(parseInt(i));
                setSquaresNotUsed(usedArr);
              }
            }else{
            }
          }
        }
      }

      if(cont === false){
        setSquaresNotUsed(tempUsedArr);
        if(squaresNotUsed.length === 0){
          gameOver();
        }
      }else{
        moveSquares(tempSquareMovArr, temparr);
      } 

    } else{

    }
  }

  function moveDown(){
    if(waitClick === false){
      console.log('moved down-------------------------------------------------------------------------------------------------------');
      
      let temparr = [];
      let tempUsedArr = [];
      let cont =  false;    
      setSquaresMovement([['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],]);
      let tempSquareMovArr = [];

      for(let i in squaresMovement){
        tempSquareMovArr[i] = squaresMovement[i];
      }
      for(let i in squares){
        temparr[i] = [squares[i],0];
      }
      for(let i in squaresNotUsed){
        tempUsedArr[i] = squaresNotUsed[i];
      }
      for(let i in temparr){
        i = temparr.length-i-1;
        if(temparr[i][0] === 0){
        }else{
          if((i+4)>15){
          }else{
            if(temparr[i+4][0] === 0){
              if((i+8)>15){
                temparr[i+4][0] = temparr[i][0];
                temparr[i][0] = 0;
                temparr[i][1] = 0;
                cont = true;
                tempSquareMovArr = setMoveArray(tempSquareMovArr, i, 'down', 'one');
                let usedArr = removeFromArray(squaresNotUsed, i+4);
                usedArr.push(parseInt(i));
                setSquaresNotUsed(usedArr);
              }else{
                if(temparr[i+8][0] === 0){
                  if((i+12)>15){
                    temparr[i+8][0] = temparr[i][0];
                    temparr[i][0] = 0;
                    temparr[i][1] = 0;
                    cont = true;
                    tempSquareMovArr = setMoveArray(tempSquareMovArr, i, 'down', 'two');
                    let usedArr = removeFromArray(squaresNotUsed, i+8);
                    usedArr.push(parseInt(i));
                    setSquaresNotUsed(usedArr);
                  }else{
                    if(temparr[i+12][0] === 0){
                      temparr[i+12][0] = temparr[i][0];
                      temparr[i][0] = 0;
                      temparr[i][1] = 0;
                      cont = true;
                      tempSquareMovArr = setMoveArray(tempSquareMovArr, i, 'down', 'three');
                      let usedArr = removeFromArray(squaresNotUsed, i+12);
                      usedArr.push(parseInt(i));
                      setSquaresNotUsed(usedArr);
                    }else if(temparr[i+12][0] === temparr[i][0]){
                      if(temparr[i+12][1] === 1){
                        temparr[i+8][0] = temparr[i][0];
                        temparr[i][0] = 0;
                        temparr[i][1] = 0;
                        cont = true;
                        tempSquareMovArr = setMoveArray(tempSquareMovArr, i, 'down', 'two');
                        let usedArr = removeFromArray(squaresNotUsed, i+8);
                        usedArr.push(parseInt(i));
                        setSquaresNotUsed(usedArr);
                      }else{
                        temparr[i+12][0] = temparr[i][0]+temparr[i][0];
                        temparr[i][0] = 0;
                        temparr[i][1] = 0;
                        temparr[i+12][1] = 1;
                        cont = true;
                        tempSquareMovArr = setMoveArray(tempSquareMovArr, i, 'down', 'three');
                        let usedArr = squaresNotUsed;
                        usedArr.push(parseInt(i));
                        setSquaresNotUsed(usedArr);
                      }
                    }else{
                      temparr[i+8][0] = temparr[i][0];
                      temparr[i][0] = 0;
                      temparr[i][1] = 0;
                      cont = true;
                      tempSquareMovArr = setMoveArray(tempSquareMovArr, i, 'down', 'two');
                      let usedArr = removeFromArray(squaresNotUsed, i+8);
                      usedArr.push(parseInt(i));
                      setSquaresNotUsed(usedArr);
                    }
                  }
                }else if(temparr[i+8][0] === temparr[i][0]){
                  if(temparr[i+8][1] === 1){
                    temparr[i+4][0] = temparr[i][0];
                    temparr[i][0] = 0;
                    temparr[i][1] = 0;
                    cont = true;
                    tempSquareMovArr = setMoveArray(tempSquareMovArr, i, 'down', 'one');
                    let usedArr = removeFromArray(squaresNotUsed, i+4);
                    usedArr.push(parseInt(i));
                    setSquaresNotUsed(usedArr);
                  }else{
                    temparr[i+8][0] = temparr[i][0]+temparr[i][0];
                    temparr[i][0] = 0;
                    temparr[i][1] = 0;
                    temparr[i+8][1] = 1;
                    cont = true;
                    tempSquareMovArr = setMoveArray(tempSquareMovArr, i, 'down', 'two');
                    let usedArr = squaresNotUsed;
                    usedArr.push(parseInt(i));
                    setSquaresNotUsed(usedArr);
                  }
                }else{
                  temparr[i+4][0] = temparr[i][0];
                  temparr[i][0] = 0;
                  temparr[i][1] = 0;
                  cont = true;
                  tempSquareMovArr = setMoveArray(tempSquareMovArr, i, 'down', 'one');
                  let usedArr = removeFromArray(squaresNotUsed, i+4);
                  usedArr.push(parseInt(i));
                  setSquaresNotUsed(usedArr);
                }
              }
            }else if(temparr[i+4][0] === temparr[i][0]){
              if(temparr[i+4][1] === 1){
              }else{
                temparr[i+4][0] = temparr[i][0]+temparr[i][0];
                temparr[i][0] = 0;
                temparr[i][1] = 0;
                temparr[i+4][1] = 1;
                cont = true;
                tempSquareMovArr = setMoveArray(tempSquareMovArr, i, 'down', 'one');
                let usedArr = removeFromArray(squaresNotUsed, i+4);
                usedArr.push(parseInt(i));
                setSquaresNotUsed(usedArr);
              }
            }else{
            }
          }
        }
      }

      if(cont === false){
        setSquaresNotUsed(tempUsedArr);
        if(squaresNotUsed.length === 0){
          gameOver();
        }
      }else{
        moveSquares(tempSquareMovArr, temparr);
      } 

    } else{

    }
  }

  function moveLeft(){
    if(waitClick === false){
      console.log('moved left-------------------------------------------------------------------------------------------------------');
      
      let temparr = [];
      let tempUsedArr = [];    
      setSquaresMovement([['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],]);
      let tempSquareMovArr = [];
 
      for(let i in squaresMovement){
        tempSquareMovArr[i] = squaresMovement[i];
      }
      for(let i in squares){
        temparr[i] = [squares[i],0];
      }
      for(let i in squaresNotUsed){
        tempUsedArr[i] = squaresNotUsed[i];
      }
      let cont =  false;
      for(let i in temparr){
        if(temparr[i][0] === 0){
        }else{
          if( ((i>=0 && i<=3) && (i-1)<0) || ((i>=4 && i<=7) && (i-1)<4) || ((i>=8 && i<=11) && (i-1)<8)  || ((i>=12 && i<=15) && (i-1)<12)){
          }else{
            if(temparr[i-1][0] === 0){
              if( ((i>=0 && i<=3) && (i-2)<0) || ((i>=4 && i<=7) && (i-2)<4) || ((i>=8 && i<=11) && (i-2)<8)  || ((i>=12 && i<=15) && (i-2)<12)){
                temparr[i-1][0] = temparr[i][0];
                temparr[i][0] = 0;
                temparr[i][1] = 0;
                cont = true;
                tempSquareMovArr = setMoveArray(tempSquareMovArr, i, 'left', 'one');
                let usedArr = removeFromArray(squaresNotUsed, i-1);
                usedArr.push(parseInt(i));
                setSquaresNotUsed(usedArr);
              }else{
                if(temparr[i-2][0] === 0){
                  if( ((i>=0 && i<=3) && (i-3)<0) || ((i>=4 && i<=7) && (i-3)<4) || ((i>=8 && i<=11) && (i-3)<8)  || ((i>=12 && i<=15) && (i-3)<12)){
                    temparr[i-2][0] = temparr[i][0];
                    temparr[i][0] = 0;
                    temparr[i][1] = 0;
                    cont = true;
                    tempSquareMovArr = setMoveArray(tempSquareMovArr, i, 'left', 'two');
                    let usedArr = removeFromArray(squaresNotUsed, i-2);
                    usedArr.push(parseInt(i));
                    setSquaresNotUsed(usedArr);
                  }else{
                    if(temparr[i-3][0] === 0){
                      temparr[i-3][0] = temparr[i][0];
                      temparr[i][0] = 0;
                      temparr[i][1] = 0;
                      cont = true;
                      tempSquareMovArr = setMoveArray(tempSquareMovArr, i, 'left', 'three');
                      let usedArr = removeFromArray(squaresNotUsed, i-3);
                      usedArr.push(parseInt(i));
                      setSquaresNotUsed(usedArr);
                    }else if(temparr[i-3][0] === temparr[i][0]){
                      if(temparr[i-3][1] === 1){
                        temparr[i-2][0] = temparr[i][0];
                        temparr[i][0] = 0;
                        temparr[i][1] = 0;
                        cont = true;
                        tempSquareMovArr = setMoveArray(tempSquareMovArr, i, 'left', 'two');
                        let usedArr = removeFromArray(squaresNotUsed, i-2);
                        usedArr.push(parseInt(i));
                        setSquaresNotUsed(usedArr);
                      }else{
                        temparr[i-3][0] = temparr[i][0]+temparr[i][0];
                        temparr[i][0] = 0;
                        temparr[i][1] = 0;
                        temparr[i-3][1] = 1;
                        cont = true;
                        tempSquareMovArr = setMoveArray(tempSquareMovArr, i, 'left', 'three');
                        let usedArr = squaresNotUsed;
                        usedArr.push(parseInt(i));
                        setSquaresNotUsed(usedArr);
                      }
                    }else{
                      temparr[i-2][0] = temparr[i][0];
                      temparr[i][0] = 0;
                      temparr[i][1] = 0;
                      cont = true;
                      tempSquareMovArr = setMoveArray(tempSquareMovArr, i, 'left', 'two');
                      let usedArr = removeFromArray(squaresNotUsed, i-2);
                      usedArr.push(parseInt(i));
                      setSquaresNotUsed(usedArr);
                    }
                  }
                }else if(temparr[i-2][0] === temparr[i][0]){
                  if(temparr[i-2][1] === 1){
                    temparr[i-1][0] = temparr[i][0];
                    temparr[i][0] = 0;
                    temparr[i][1] = 0;
                    cont = true;
                    tempSquareMovArr = setMoveArray(tempSquareMovArr, i, 'left', 'one');
                    let usedArr = removeFromArray(squaresNotUsed, i-1);
                    usedArr.push(parseInt(i));
                    setSquaresNotUsed(usedArr);
                  }else{
                    temparr[i-2][0] = temparr[i][0]+temparr[i][0];
                    temparr[i][0] = 0;
                    temparr[i][1] = 0;
                    temparr[i-2][1] = 1;
                    cont = true;
                    tempSquareMovArr = setMoveArray(tempSquareMovArr, i, 'left', 'two');
                    let usedArr = squaresNotUsed;
                    usedArr.push(parseInt(i));
                    setSquaresNotUsed(usedArr);
                  }
                }else{
                  temparr[i-1][0] = temparr[i][0];
                  temparr[i][0] = 0;
                  temparr[i][1] = 0;
                  cont = true;
                  tempSquareMovArr = setMoveArray(tempSquareMovArr, i, 'left', 'one');
                  let usedArr = removeFromArray(squaresNotUsed, i-1);
                  usedArr.push(parseInt(i));
                  setSquaresNotUsed(usedArr);
                }
              }
            }else if(temparr[i-1][0] === temparr[i][0]){
              if(temparr[i-1][1] === 1){
              }else{
                temparr[i-1][0] = temparr[i][0]+temparr[i][0];
                temparr[i][0] = 0;
                temparr[i][1] = 0;
                temparr[i-1][1] = 1;
                cont = true;
                tempSquareMovArr = setMoveArray(tempSquareMovArr, i, 'left', 'one');
                let usedArr = removeFromArray(squaresNotUsed, i-1);
                usedArr.push(parseInt(i));
                setSquaresNotUsed(usedArr);
              }
            }else{
            }
          }
        }
      }

      if(cont === false){
        setSquaresNotUsed(tempUsedArr);
        if(squaresNotUsed.length === 0){
          gameOver();
        }
      }else{

        moveSquares(tempSquareMovArr, temparr);
      } 

    } else{

    }
  }

  function gameOver(){
    let notOverYet = false;
    for(let i in squares){
      console.log(i, squares[i]);
      i = parseInt(i);
      if(i === 0 || i === 1 || i === 2 || i === 3){

      }else{
        if(squares[i] === squares[i-4]){
          notOverYet = true;
        }
      }
      if(i === 12 || i === 13 || i === 14 || i === 15){

      }else{
        if(squares[i] === squares[i+4]){
          notOverYet = true;
        }
      }
      if(i === 0 || i === 4 || i === 8 || i === 12){

      }else{
        if(squares[i] === squares[i-1]){
          notOverYet = true;
        }
      }
      if(i === 3 || i === 7 || i === 11 || i === 15){

      }else{
        if(squares[i] === squares[i+1]){
          notOverYet = true;
        }
      }
    }
    if(notOverYet){

    }else{
      setGameOverScreen(true);
    }
  }


  function moveSquares(tempSquareMovArr, temparr){
    
    setWaitClick(true);
    setGameOverScreen(false);
    setTimeout(function() {
      setWaitClick(false);
    }
      , 300);  
    setSquaresMovement(tempSquareMovArr);  
    setTimeout(function() {
      let newnumb =  newNumbers();
      let usedArr = removeFromArray(squaresNotUsed, newnumb[0]);
      setSquaresNotUsed(usedArr);
      temparr[newnumb[0]] = [newnumb[1],0];
      setNewNumber(newnumb[0]);
  
      for(let i in squares){
        temparr[i] = temparr[i][0];
      }    
      setSquaresMovement([['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],['null', 'null'],]);
      setSquares(temparr);
    }
      , 300);    
  }

  function setMoveArray(arr, location, movement, speed){
    
    arr[location] = [movement, speed];
    //setSquaresMovement(arr);
    return arr;
  }

  function removeFromArray(arr, number){
    const index = arr.indexOf(number);
    if (index > -1) { 
      arr.splice(index, 1); 
    }
    return arr;
  }

  

  function getNumbers(isStart){
    let num1 = Math.floor(Math.random() * 10)+1;
    let location1 = 0;
    isStart ? location1 = Math.floor(Math.random() * 16) : location1 = squaresNotUsed[Math.floor(Math.random() * squaresNotUsed.length)];
    num1 > 8 ? num1 = 4 : num1 = 2;
    return([location1, num1]);
  }

  function newNumbers(){
    let locationAndNumber = getNumbers(false);
    return locationAndNumber;

  }

  return (
    <div className="container">
        <Navbar />
        <div className="content">
        <div className="left-content">
                <div className="left-box" style={{height: '84%', maxHeight: '84%'}}>
                    <div className="main-header" style={{padding:'0 0 31px 0px'}}>2048 Clone</div>
                    <div className="main-body" style={{display: 'flex', justifyContent: 'center', textAlign: 'center', paddingLeft: '0px'}}>
                    <div className="App-2048">
                      <div className='boards-container-2048'>
                        <div className='board-2048'>
                          { 
                            squares.map((row, i) => { 
                                return <NumberSquare key={i} number={row} plain={true} />; 
                            })      
                          }
                        </div>
                        <div className='board-2048 blank-2048'>
                          {  
                            squares.map((row, i) => { 
                                return <NumberSquare key={i} number={row} movedirection={squaresMovement[i][0]} movespeed={squaresMovement[i][1]} fadein={i===newNumber ? true : false}  />; 
                            }) 
                          }
                        </div>
                        <div className='gameover-2048' style={gameOverScreen === true ? {display:'flex'} : {display:'none'}}>
                          <div className='main-button-2048 gameover-button-2048' onClick={() => newGame()} > Play Again? </div>
                        </div>

                      </div>

                      <div className='button-wrapper-2048' >
                        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                          <div className='main-button-2048' onClick={() => moveUp()}>  	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V6M5 12l7-7 7 7"/></svg> </div>
                        </div>
                        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                          <div className='main-button-2048' onClick={() => moveLeft()}>  	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H6M12 5l-7 7 7 7"/></svg> </div>
                          <div className='main-button-2048' onClick={() => moveDown()} > 	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v13M5 12l7 7 7-7"/></svg> </div>
                          <div className='main-button-2048' onClick={() => moveRight()} >  	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h13M12 5l7 7-7 7"/></svg> </div>
                        </div>
                      </div>
                      </div>


                    </div>
                </div>
            </div>
            <RightContent />
        </div>
    </div>





    // <div className="App-2048">

    //   <h1>2048 Clone</h1>

    //   <div className='boards-container-2048'>
    //     <div className='board-2048'>
    //       { 
    //         squares.map((row, i) => { 
    //             return <NumberSquare key={i} number={row} plain={true} />; 
    //         })      
    //       }
    //     </div>
    //     <div className='board-2048 blank-2048'>
    //       {  
    //         squares.map((row, i) => { 
    //             return <NumberSquare key={i} number={row} movedirection={squaresMovement[i][0]} movespeed={squaresMovement[i][1]} fadein={i===newNumber ? true : false}  />; 
    //         }) 
    //       }
    //     </div>
    //     <div className='gameover-2048' style={gameOverScreen === true ? {display:'flex'} : {display:'none'}}>
    //       <div className='main-button-2048 gameover-button-2048' onClick={() => newGame()} > Play Again? </div>
    //     </div>

    //   </div>
      
    //   <div className='button-wrapper-2048' >
    //     <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
    //       <div className='main-button-2048' onClick={() => moveUp()}>  	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V6M5 12l7-7 7 7"/></svg> </div>
    //     </div>
    //     <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
    //       <div className='main-button-2048' onClick={() => moveLeft()}>  	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H6M12 5l-7 7 7 7"/></svg> </div>
    //       <div className='main-button-2048' onClick={() => moveDown()} > 	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v13M5 12l7 7 7-7"/></svg> </div>
    //       <div className='main-button-2048' onClick={() => moveRight()} >  	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h13M12 5l7 7-7 7"/></svg> </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default Clone2048;
