import React from "react";
import CalamariWhite from '../img/CalamariWhite.png';
import CalamariPurpBlueWhite from '../img/CalamariPurpBlueWhite.png';
import MyPic from '../img/mypic.png';

function RightContent(props) {

    let newsrc = props.picture === "me" ? 
    <img className="right-img" alt="RightImage" style={{opacity:"1"}} src={MyPic} /> : 
    <img className="right-img" alt="RightImage" src={CalamariWhite} />;

    return (
        <div className="right-content">
            {newsrc}
        </div>
      );
}

export default RightContent;