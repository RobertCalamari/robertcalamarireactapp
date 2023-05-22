import React, { useEffect, useState } from "react";

function JoinRoom({roomtype, setOpenGame, socket, setRoomName}) {

    const [room, setRoom] = useState("");
    const [playerName, setPlayerName] = useState("");
    const [messageReceived, setMessageReceived] = useState("");

    const makeRoom = () => {
        socket.emit("make_room", { playername:playerName, room, roomtype, maxplayers: 12 });
    };

    const joinRoom = () => {
        socket.emit("makeplayer", { playername:playerName, room, roomtype });
    };

    useEffect(() => {

        socket.on('signInResponse',function(data){
            if(data.success){
                // waitingRoom();
                // codeForRoomL.innerHTML=data.room;
                setOpenGame(true);
                setRoomName(data.room);
                console.log('you are connected to room: ' + data.room);
            } 
            else{
                // errorMessageL.innerHTML=data.msg;
                setMessageReceived(data.msg);
                document.getElementsByClassName("join-game-error")[0].classList.add("show-opacity");
                setTimeout(() => {
                document.getElementsByClassName("join-game-error")[0].classList.remove("show-opacity");  
              }, "4000");
            }
        });
    }, [socket]);
      
    return (
        <div className="join-room-container">
            <div className="join-prompt">Please enter a room name and the name you would like to be associated with. You can either create a room to start a new game, or join a room if someone you know already created a game.</div>
            <input className='stand-input' maxLength="15" placeholder='Room Name...' onChange={(event) => { setRoom(event.target.value); }} />
            <input className='stand-input' maxLength="15" placeholder='Player Name...' onChange={(event) => { setPlayerName(event.target.value); }} />
            <div>
                <button className='input-button' onClick={makeRoom}> Make Room</button>
                <button className='input-button' onClick={joinRoom}> Join Room</button>
            </div>
            <div className='join-game-error'> {messageReceived}</div>
        </div>
      );
}

export default JoinRoom;


