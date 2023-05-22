import React, { useEffect, useState } from "react";
import WordRectangle from "./WordRectangle";

function CodenameGameBoard({selectedWords, grayWord, redWords, blueWords, setCardClicked, clickedCards, gameIsOver, spymasterRedList, spymasterBlueList, activePlayerClient, playersList, currTeam, showWhileGivingClue, scoreBlue, scoreRed}) {

    function isSpymaster(){
        if(spymasterRedList[0].name === activePlayerClient || spymasterBlueList[0].name === activePlayerClient){
            return true;
        }else{
            return false;
        }
    }

    function isCurrTeam(){
        for(let i in playersList){ 
            if(playersList[i].name == activePlayerClient){
                if(playersList[i].gameinfo.color == currTeam){
                    return true; 
                }else{
                    return false;
                }
            }
        }
    }

    return (
        <>
        {gameIsOver == 'flex' ? <WordRectangle spymaster={true} selectedWords={selectedWords} blueWords={blueWords} redWords={redWords} grayWord={grayWord} clickedCards={clickedCards} /> : //if spymaster get colored board
                                        isSpymaster() == true ? <WordRectangle spymaster={true} selectedWords={selectedWords} blueWords={blueWords} redWords={redWords} grayWord={grayWord} clickedCards={clickedCards} /> : //if spymaster get colored board
                                                showWhileGivingClue == true ? <WordRectangle currTeam={false} blueWords={blueWords} redWords={redWords} grayWord={grayWord} selectedWords={selectedWords} clickedCards={clickedCards} /> : //make sure you cant click when giving clue
                                                    isCurrTeam() == true ? <WordRectangle currTeam={true} blueWords={blueWords} redWords={redWords} grayWord={grayWord} selectedWords={selectedWords} setCardClicked={setCardClicked} clickedCards={clickedCards} /> : //you can click if on current team
                                                        <WordRectangle selectedWords={selectedWords} blueWords={blueWords} redWords={redWords} grayWord={grayWord} clickedCards={clickedCards} />}
        </>
    );
    
}

export default CodenameGameBoard;


