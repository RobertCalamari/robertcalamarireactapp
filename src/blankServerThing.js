import React, { useEffect, useState } from "react";
import RightContent from "./components/RightContent";
import Navbar from "./components/Navbar";
import splashImage from "./img/splash.png";
import io from "socket.io-client";
import JoinRoom from "./components/JoinRoom";
import PlayersList from "./components/PlayersList";
const socket = io.connect("http://localhost:3001");
// const socket = io.connect("https://robertcalamari-server.onrender.com");

const API_URL = '../../js/codenamewordlist.json';

function CodenamesClone(props) {

    const [openGame, setOpenGame] = useState(false);
    const [hideSignIn, setHideSignIn] = useState("block");
    const [showGame, setShowGame] = useState("none");
    const [playersList, setPlayersList] = useState('');
    const [roomName, setRoomName] = useState('');

    React.useEffect(() => {
          document.title = props.title; // eslint-disable-next-line
          
    }, []); 

    useEffect(() => {
        socket.on('updateplayersclient',function(data){   
            setPlayersList(data.playerslist);
        });
        
    }, [socket]);

    useEffect(() => {
        if(openGame === true){
            setHideSignIn("none");
            setShowGame("block");
        }
        
    }, [openGame]);
    
      
    return (
        <div className="container">
            <Navbar />
            <div className="content" style={{backgroundImage: 'url('+splashImage+')', justifyContent: 'center'}}>
                <div style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <div className="main-header" style={{padding:'10px 0 10px 0px'}}>Codenames Clone</div>
                    <div className="main-body main-space-even" style={{padding: '10px', textAlign: 'center', maxWidth:'1000px'}}>     
                        <div style={{display:hideSignIn}}>
                            <JoinRoom socket={socket} setRoomName={setRoomName} setOpenGame={setOpenGame} roomtype={'codename'} />
                        </div>   
                        <div style={{display:showGame}}>
                            <div className="room-name">Room: {roomName}</div>
                            <br />
                            <PlayersList playersList={playersList} direction={'horizontal'} />
                        </div>                    
                        
                    </div>
                </div>  
            </div>
            {/* <RightContent /> */}
        </div>
      );
}

export default CodenamesClone;


