import React, { useEffect, useState } from "react";

function CodenameRedSide({selectedWords, grayWord, redWords, blueWords, setCardClicked, clickedCards, gameIsOver, spymasterRedList, spymasterBlueList, activePlayerClient, playersList, currTeam, showWhileGivingClue, scoreBlue, scoreRed}) {
    return (
        <div className="red-container" style={currTeam == 'red' ? {border:'6px solid rgba(255, 255, 255, 0.85)'} : {}}>
            <div>
                <div className="main-header codename-header" style={{padding:'10px 0 10px 0px', fontSize:'20px', color:'white'}}>{scoreRed}</div>
                <div className="main-header codename-header" style={{padding:'10px 0 10px 0px', fontSize:'20px', color:'#f58d8d'}}>Red Operatives</div>
                {spymasterRedList.map((item, index) => <div key={index} className="team-color" style={item.name == spymasterRedList[0].name ? {display:'none'} : (item.name == activePlayerClient ? {backgroundColor: 'green', margin: 'auto', width: '65%', borderRadius: '8px'} : {})}> {item.name} </div>)}
            </div>
            <div>
                <div className="main-header" style={{padding:'30px 0 10px 0px', fontSize:'15px', color:'#f58d8d'}}>Spymaster</div>
                {spymasterRedList.map((item, index) => <div key={index} className="team-color" style={item.name == spymasterRedList[0].name ? (item.name == activePlayerClient ? {backgroundColor: 'green', margin: 'auto', width: '65%', borderRadius: '8px'} : {}) : {display:'none'}}> {item.name} </div>)}
            </div>
        </div>
    );
    
}

export default CodenameRedSide;


