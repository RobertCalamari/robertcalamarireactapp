import React, { useEffect, useState } from "react";

function CodenameBlueSide({selectedWords, grayWord, redWords, blueWords, setCardClicked, clickedCards, gameIsOver, spymasterRedList, spymasterBlueList, activePlayerClient, playersList, currTeam, showWhileGivingClue, scoreBlue, scoreRed}) {
    return (
        <div className="blue-container" style={currTeam == 'blue' ? {border:'6px solid rgba(255, 255, 255, 0.85)'} : {}}>
            <div> 
                <div className="main-header codename-header" style={{padding:'10px 0 10px 0px', fontSize:'20px', color:'white'}}>{scoreBlue}</div>
                <div className="main-header codename-header" style={{padding:'10px 0 10px 0px', fontSize:'20px', color:'#757df0'}}>Blue Operatives</div>
                {spymasterBlueList.map((item, index) => <div key={index} className="team-color" style={item.name == spymasterBlueList[0].name ? {display:'none'} : (item.name == activePlayerClient ? {backgroundColor: 'green', margin: 'auto', width: '65%', borderRadius: '8px'} : {})}> {item.name} </div>)}
            </div>
            <div>
                <div className="main-header" style={{padding:'30px 0 10px 0px', fontSize:'15px', color:'#757df0'}}>Spymaster</div>
                {spymasterBlueList.map((item, index) => <div key={index} className="team-color" style={item.name == spymasterBlueList[0].name ? (item.name == activePlayerClient ? {backgroundColor: 'green', margin: 'auto', width: '65%', borderRadius: '8px'} : {}) : {display:'none'}}> {item.name} </div>)}
            </div>
        </div>
    );
    
}

export default CodenameBlueSide;


