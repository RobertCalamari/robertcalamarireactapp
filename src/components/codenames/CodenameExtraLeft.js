import React, { useEffect, useState } from "react";

function CodenameExtraLeft({selectedWords, grayWord, redWords, blueWords, setCardClicked, clickedCards, gameIsOver, spymasterRedList, spymasterBlueList, activePlayerClient, playersList, currTeam, showWhileGivingClue}) {
    return (
        <>
            <a className='rules-button' style={{height:'17px'}} href="https://www.ultraboardgames.com/codenames/game-rules.php" target='_blank'>Rules</a>
                                        {/* <a className='rules-button' style={{height:'17px'}} href="#" target='_blank'>Start Timer</a>  */}
        </>
    );
    
}

export default CodenameExtraLeft;


