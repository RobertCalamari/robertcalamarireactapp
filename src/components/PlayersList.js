import React, { useEffect, useState } from "react";

function PlayersList({playersList, direction, activePlayerClient}) {
      
     let playerListLobbyD = [];
     let playerDirection = 'inline-block';
     let playerAlign = 'left';
    for(var i in playersList){
        if(activePlayerClient === playersList[i].name){
            playerListLobbyD.push([playersList[i].name, 'green']);
        }else{
            playerListLobbyD.push([playersList[i].name, '#fff']);
        }
    }  
    if(direction === 'horizontal'){
        playerAlign = 'center';
    }else{
        playerDirection = 'block';
        playerAlign = 'left';
    }

    return (
        <div className="playerlist-vert" style={{textAlign:playerAlign}}>
            {playerListLobbyD.map(item => <div className="playerlist-player" key={item[0]} style={{display:playerDirection, color:item[1]}}> {item[0]} </div>)}
        </div>
      );
}

export default PlayersList;


