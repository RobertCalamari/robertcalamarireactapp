import '../css/Paintings.css';


function PaintingBlock({painting, setPaintingsPageVisible, setPaintingToSend}) {

    var imgsizewidth = 150;
    var imgsizeheight = 150;
    var y = document.getElementsByClassName("img-holder")[0].offsetHeight; 
    var noOpacity = "no-opacity";



    //the width and height are set to be 5 images equally set from the top to bottom, unless of mobile
    if(window.innerWidth < 960){
        imgsizewidth = 90+'%';
        imgsizeheight = 'auto';
    }else{
        imgsizewidth = (y/5)+'px';
        imgsizeheight = (y/5)+'px';
    }
    return(
        <div className={'img-background ' + noOpacity + ' ' + painting.id} id={'img-background--' + painting.id} style={{width:imgsizewidth, height:imgsizeheight}} onClick={() => {setPaintingsPageVisible('block'); setPaintingToSend(painting); window.history.pushState({}, null, '/art?id='+painting.id);}}>
            {painting.issold === "1" ? <div id={'paintingsold-'+ painting.id}  className="paintingsold" style={{color:'white'}} >{'$'+painting.price}</div> : <div id={'paintingsold-'+ painting.id} className="paintingsold" style={{color:'red'}} >SOLD</div>}
            <img className="painting-img" id={'painting-img-' + painting.id} alt="" style={{width:imgsizewidth, height:imgsizeheight}} src={painting.img} /> 
            </div>
    );
}


export default PaintingBlock;