import React, { useEffect, useState } from "react";

function WordRectangle({selectedWords, grayWord, redWords, blueWords, spymaster, setCardClicked, currTeam, clickedCards}) {
    if(clickedCards==undefined){
        clickedCards=[[],[]];
    }
    if(spymaster){
        return (
            <div className="codename-word-container">
            {selectedWords.map((word, index) => (
              <div className={clickedCards.includes(word) ? "word-rect" : "word-rect"} style={ clickedCards.includes(word) ? redWords.includes(word) ? {backgroundColor:'rgb(177, 98, 98)', border:'solid 6px rgb(177, 98, 98)', color:'rgb(177, 98, 98)'} : blueWords.includes(word) ? {backgroundColor:'rgb(76, 78, 215)', border:'solid 6px rgb(76, 78, 215)', color:'rgb(76, 78, 215)'} : grayWord.includes(word) ? {backgroundColor:'rgb(98, 98, 98)', border:'solid 6px rgb(98, 98, 98)', color:'rgb(98, 98, 98)'} : {backgroundColor:'rgb(236, 193, 144)', border:'solid 6px rgb(236, 193, 144)', color:'rgb(236, 193, 144)'} : 
                                                                                        redWords.includes(word) ? {backgroundColor:'rgb(138, 70, 70)', border:'solid 6px rgb(177, 98, 98)'} : blueWords.includes(word) ? {backgroundColor:'rgb(74, 74, 155)', border:'solid 6px rgb(76, 78, 215)'} : grayWord.includes(word) ? {backgroundColor:'#3e3e3e', border:'solid 6px rgb(98, 98, 98)'} : {}} key={index}>
                {/* {clickedCards.includes(word) ? '' : word} */}
                {word}
              </div>
            ))}
          </div>
          );
    }else{
        if(currTeam){
            return (
                <div className="codename-word-container">
                {selectedWords.map((word, index) => (
                <div className={clickedCards.includes(word) ? "word-rect" : "word-rect set-clickable"} key={index} onClick={ clickedCards.includes(word) ? () => console.log('') : () => setCardClicked(word)} style={clickedCards.includes(word) ? redWords.includes(word) ? {backgroundColor:'rgb(177, 98, 98)', border:'solid 6px rgb(177, 98, 98)', color:'rgb(177, 98, 98)'} : blueWords.includes(word) ? {backgroundColor:'rgb(76, 78, 215)', border:'solid 6px rgb(76, 78, 215)', color:'rgb(76, 78, 215)'} : grayWord.includes(word) ? {backgroundColor:'rgb(98, 98, 98)', border:'solid 6px rgb(98, 98, 98)', color:'rgb(98, 98, 98)'} : {backgroundColor:'rgb(236, 193, 144)', border:'solid 6px rgb(236, 193, 144)', color:'rgb(236, 193, 144)'} : {}}>
                    {/* {clickedCards.includes(word) ? '' : word} */}
                    {word}
                </div>
                ))}
                </div>
            );
        }else{
            return (
                <div className="codename-word-container">
                {selectedWords.map((word, index) => (
                <div className={clickedCards.includes(word) ? "word-rect" : "word-rect"} key={index} style={clickedCards.includes(word) ? redWords.includes(word) ? {backgroundColor:'rgb(177, 98, 98)', border:'solid 6px rgb(177, 98, 98)', color:'rgb(177, 98, 98)'} : blueWords.includes(word) ? {backgroundColor:'rgb(76, 78, 215)', border:'solid 6px rgb(76, 78, 215)', color:'rgb(76, 78, 215)'} : grayWord.includes(word) ? {backgroundColor:'rgb(98, 98, 98)', border:'solid 6px rgb(98, 98, 98)', color:'rgb(98, 98, 98)'} : {backgroundColor:'rgb(236, 193, 144)', border:'solid 6px rgb(236, 193, 144)', color:'rgb(236, 193, 144)'} : {}} >
                    {/* {clickedCards.includes(word) ? '' : word} */}
                    {word}
                </div>
                ))}
                </div>
            );

        }

        
    }
    
}

export default WordRectangle;


