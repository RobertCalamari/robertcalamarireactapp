import React from "react";
import { useState} from 'react';

function PaintingPage({painting, setPaintingsPageVisible, setURLPainting, paintingsPageVisible}) {

    paintingsPageVisible === 'block' ? document.title = "Art - " +  painting.name + " | Robert Calamari" : document.title = "Art | Robert Calamari";
    
    var purchaseText = "Puchase";
    var canClickClick = ()=>buyPainting(painting.name);
    if(painting.issold === '2'){
        purchaseText = "SOLD";
        var canClickStyle = {color:'red', border: '1px solid red', pointerEvents: 'none'};
    }
    const [widthSize, setWidthSize] = useState("");
    const [heightSize, setHeightSize] = useState("");

    getMeta(
        painting.img,
        function(width, height) { 
            
            if(width > height){
                setWidthSize("100%");
                setHeightSize("auto");
            }else if(width === height){
                setWidthSize("100%");
                setHeightSize("auto");
            }else{
                setWidthSize("auto");
                setHeightSize("100%");
            }
        }
    );


function buyPainting(name){
    alert("Thanks for trying to buy a painting! Currently this site is going through maintence, but if you are still interested in buying '" + name + "', please email rjcalamari@gmail.com with your name and which painting you are interested in. Thanks!");
}

function getMeta(url, callback) {
    var img = new Image();
    img.src = url;
    img.onload = function() { callback(this.width, this.height); }
}

function previousPainting(paintingid){
    window.history.pushState({}, null, '/art?id='+(painting.id+1));
    setURLPainting(painting.id+1);
}

function nextPainting(paintingid){
    window.history.pushState({}, null, '/art?id='+(painting.id-1));
    setURLPainting(painting.id-1);
}

function goTo(where){
    window.location.href = where;
}



    return(
        <>
           
                <div className="paintings-page-container">
                    <div className="paintings-page-close" onClick={() => setPaintingsPageVisible('none')}>
                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </div>
                    <div className="paintings-page-header">{painting.name}</div>
                    <div className="paintings-page-left">
                        <div className="paintings-page-description">
                            <div>
                                <div className="paintings-page-artist">By {painting.artist} - {painting.date}</div>
                                <div className="paintings-page-material">{painting.material}</div>
                                <div className="paintings-page-size">{painting.size}in</div>

                            </div>
                            <div className="paintings-page-left-bottom">
                                <div className="paintings-page-price">${painting.price}</div>
                                <button className='main-button paintings-page-continue' style={canClickStyle} onClick={canClickClick} >{purchaseText}</button>
                            </div>
                        </div>
                        
                    </div>
                    <div className="paintings-page-right noselect" onClick={() => goTo('' + painting.img + '.jpg')}>
                        <div className="paintings-page-img-container" style={{width: '100%', height: '100%', display: 'flex', border: '1px #3e3e3ea1 solid'}} >
                            <img className="paintings-page-image" alt="" style={{width: widthSize, height: heightSize}} src={painting.img} />
                        </div>
                    </div>
                    
                </div>
                <div className="back-next-buttons">
                <button className='main-button paintings-page-back' onClick={() => previousPainting(painting.id)}>
                    <svg style={{margin:'auto'}} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chevron-compact-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223z"/>
                    </svg>
                </button>
                <button className='main-button paintings-page-next' onClick={() => nextPainting(painting.id)}>
                    <svg style={{margin:'auto'}} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chevron-compact-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z"/>
                    </svg>
                </button>
                </div>
        </>
    );
}

export default PaintingPage;

