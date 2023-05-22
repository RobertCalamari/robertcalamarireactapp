import React, { useEffect, useState } from "react";

function CodenameExtraRight({selectedWords, disableSkip, grayWord, redWords, blueWords, setCardClicked, clickedCards, gameIsOver, spymasterRedList, spymasterBlueList, activePlayerClient, playersList, currTeam, showWhileGivingClue, disableWhileGuessing, skipTurn, sendClue, setGuesses, setCode, exitGame, newGame  }) {
    
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
    console.log(disableSkip, disableWhileGuessing);

    return (
       <>
            <div className='flex-center-column' style={isCurrTeam() == true ? !isSpymaster() ? {display:'flex'} : {display:'none'} : {display:'none'}}>
                <button className='input-button spymaster-field-button' style={gameIsOver == 'flex' ? {display:'none'} : disableWhileGuessing == 'block' ? {display:'none'} : disableSkip == true ? {display:'none'} : {display:'block'} } onClick={skipTurn}>Skip Turn</button>
            </div>
            <div className='flex-center-column' style={{display:gameIsOver}}>
                <button className='input-button start-game'style={playersList[0].name === activePlayerClient ? {display:'block'} : {display:'none'}} onClick={newGame}>New Game</button>
                <button className='input-button start-game' onClick={exitGame}>Exit</button>
            </div>
            <div className='spymaster-field-container' style={isCurrTeam() == true ? isSpymaster() ? {display:'flex'} : {display:'none'} : {display:'none'}}>
                <input className='stand-input spymaster-field' style={{display:disableWhileGuessing}} maxLength="20" placeholder='Clue...' onChange={(event) => { setCode(event.target.value); }} />
                <input className='stand-input spymaster-field' style={{display:disableWhileGuessing}} maxLength="2" placeholder='Guesses...' onChange={(event) => { setGuesses(event.target.value); }} />
                <button className='input-button spymaster-field-button' style={{display:disableWhileGuessing}} onClick={sendClue}>Submit</button>
            </div>
       </>
    );
    
}

export default CodenameExtraRight;


