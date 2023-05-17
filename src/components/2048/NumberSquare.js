import React from "react";

function NumberSquare({number, plain, fadein, movedirection, movespeed}){
    let numberclass = 'square-2048 number-square-2048 noselect visible-2048';
    let plainclass = 'square-2048 plain-square-2048 invisible-2048';
    if(number === 0){
        plain = true;
    }
    if(plain===true){
        numberclass = 'square-2048 number-square-2048 noselect invisible-2048';
        plainclass = 'square-2048 plain-square-2048 visible-2048';
    }

    if(fadein===true){
        numberclass = 'square-2048 number-square-2048 noselect visible-2048 fade-in-2048';
    }

    number === 2 ? numberclass += ' color-one-2048' : number === 4 ? numberclass += ' color-two-2048' : number === 8 ? numberclass += ' color-three-2048' : number === 16 ? numberclass += ' color-four-2048' : number === 32 ? numberclass += ' color-five-2048' : number === 64 ? numberclass += ' color-six-2048' : number === 128 ? numberclass += ' color-seven-2048' : number === 256 ? numberclass += ' color-eight-2048' : number === 512 ? numberclass += ' color-nine-2048' : number === 1024 ? numberclass += ' color-ten-2048' : number === 2048 ? numberclass += ' color-eleven-2048' : numberclass += '';

    
    if(movedirection === 'null' || movedirection === undefined){
    }else{
        console.log('we making this move ', movedirection, movespeed);
        numberclass += ' move-' + movedirection + '-' +  movespeed + '-2048';
    }

    return(
        <>
            <div className={numberclass}>
                
                {number}
            </div>
            <div className={plainclass}>
            </div>
        </>
        
    );
}



export default NumberSquare;