import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import './css/Codename.css';
import splashImage from "./img/splash.png";
import io from "socket.io-client";
import JoinRoom from "./components/JoinRoom";
import WordRectangle from "./components/codenames/WordRectangle";
import PlayersList from "./components/PlayersList";
import { useIsMount } from './components/useIsMount';
import CodenameBlueSide from "./components/codenames/CodenameBlueSide";
import CodenameRedSide from "./components/codenames/CodenameRedSide";
import CodenameExtraLeft from "./components/codenames/CodenameExtraLeft";
import CodenameExtraRight from "./components/codenames/CodenameExtraRight";
import CodenameGameBoard from "./components/codenames/CodenameGameBoard";
// const socket = io.connect("http://localhost:3001");
const socket = io.connect("https://robertcalamari-server.onrender.com");

const API_URL = '../../js/codenamewordlist.json';

function CodenamesClone(props) {

    const [openGame, setOpenGame] = useState(false);
    const [hideSignIn, setHideSignIn] = useState("block");
    const [showGameRoom, setShowGameRoom] = useState("none");
    const [allWords, setAllWords] = useState([]);
    const [selectedWords, setSelectedWords] = useState([]);
    const [redWords, setRedWords] = useState([]);
    const [blueWords, setBlueWords] = useState([]);
    const [scoreRed, setScoreRed] = useState(0);
    const [scoreBlue, setScoreBlue] = useState(0);
    const [currPlayAction, setCurrPlayAction] = useState(' ');
    const [currGuesses, setCurrGuesses] = useState('');
    const [spymasterFieldValue, setSpymasterFieldValue] = useState('');
    const [currTeam, setCurrTeam] = useState('');
    const [cardClicked, setCardClicked] = useState('');
    const [grayWord, setGrayWord] = useState([]);
    const [spymasterRedList, setSpymasterRedList] = useState([[],[]]);
    const [spymasterBlueList, setSpymasterBlueList] = useState([[],[]]);
    const [showWaitingRoom, setShowWaitingRoom] = useState("none");
    const [playersList, setPlayersList] = useState([{id:0, name:'nameid', loggedin:true, roomname:'rname', host:false, gameinfo: {}}]);
    const [roomName, setRoomName] = useState('');
    const [startGameErrorMessage, setStartGameErrorMessage] = useState(':)');
    const [redTeam, setRedTeam] = useState([]);
    const [blueTeam, setBlueTeam] = useState([]);
    const [clickedCards, setClickedCards] = useState([[],[]]);
    const [roomType, setRoomType] = useState('codename');
    const [showWhileGivingClue, setShowWhileGivingClue] = useState(false);
    const [disableWhileGuessing, setDisableWhileGuessing] = useState('block');
    const [disableSkip, setDisableSkip] = useState(true);    
    const [gameIsOver, setGameIsOver] = useState('none');
    const [activePlayerClient, setActivePlayerClient] = useState('');
    const [code, setCode] = useState("");
    const [guesses, setGuesses] = useState(0);
    const [checkDouble, setCheckDouble] = useState(false);
    const isMount = useIsMount(); 
    
    useEffect(() => {
          document.title = props.title; // eslint-disable-next-line
          fetchWord();
          window.addEventListener("touchstart", touchHandler, false);
    }, []); 
    
      const fetchWord = async () => {
        const response = await fetch(API_URL);
        const words = await response.json();
        setAllWords(words);
      };

      function touchHandler(event){
        if(event.touches.length > 1){
            //the event is multi-touch
            //you can then prevent the behavior
            event.preventDefault()
        }
    }

    function joinTeam(color){
        if(color === 'random'){
            let randnum = Math.floor(Math.random() * 2);
            if(randnum === 1){
                color = 'red';
            }else{
                color = 'blue';
            }
        }
        socket.emit("join_codename_team", { playername:activePlayerClient, room:roomName, roomtype:roomType, color});
    }

    function isSpymaster(){
        if(spymasterRedList[0].name === activePlayerClient || spymasterBlueList[0].name === activePlayerClient){
            return true;
        }else{
            return false;
        }
    }

    function isCurrTeam(){
        for(let i in playersList){ 
            if(playersList[i].name == activePlayerClient){
                if(playersList[i].gameinfo.color == currTeam){
                    return true; 
                }else{
                    return false;
                }
            }
        }
    }

    function checkWhatCardItIs(card, dataredWords, datablueWords, datagrayWord){
        if(datablueWords.includes(card)){
            return 'blue';
        }else if(dataredWords.includes(card)){
            return 'red';
        }else if(datagrayWord.includes(card)){
            return 'gray';
        }else{
            return 'blank';
        }
    }

    //card clicked
    useEffect(() => {
        if (isMount) {
        } else {
                socket.emit("send_clicked_card", { where:'clickedcard', playername:activePlayerClient, room:roomName, roomtype:roomType, code, guesses:guesses-1, currTeam, cardClicked, clickedCards, scoreRed, scoreBlue, redWords, blueWords, grayWord});
        }
        
    }, [cardClicked]); 

    function sendClue(){
            // setSpymasterFieldValue('');
            setTimeout(() => {
                document.getElementsByClassName("spymaster-field")[0].value = '';
                document.getElementsByClassName("spymaster-field")[1].value = '';
                document.getElementsByClassName("spymaster-field")[2].value = '';
                document.getElementsByClassName("spymaster-field")[3].value = '';
              }, "1000");
              
              console.log('sendingcode: ' + code)
            socket.emit("send_codename_clue", { where:'sendclue', playername:activePlayerClient, room:roomName, roomtype:roomType, code, guesses:guesses, currTeam});
    }

    function reduceScoreDown(datacurrTeam, datascoreRed, datascoreBlue, room){

        if(datacurrTeam =='red'){
            setScoreRed(datascoreRed-1);
            if(datascoreRed-1 <= 0){
                gameOver('red', room);
                return false;
            }
        }else{
            setScoreBlue(datascoreBlue-1);
            if(datascoreBlue-1 <= 0){
                gameOver('blue', room);
                return false;
            }
        }
        return true;
    }

    function nextTurn(datacurrTeam, enemyteamcolor){
        setCurrTeam(enemyteamcolor);
        setDisableSkip(true);
        setDisableWhileGuessing('block');
        setShowWhileGivingClue(true);
    }

    function skipTurn(){
        socket.emit("skipped_turn", { where:'skipturn', playername:activePlayerClient, room:roomName, roomtype:roomType, code, guesses:guesses-1, currTeam, cardClicked, clickedCards, scoreRed, scoreBlue, redWords, blueWords, grayWord});
    }

    function startGame(){
        socket.emit("start_codename_game", { where:'startedgame', playername:activePlayerClient, room:roomName, roomtype:roomType, allWords, redTeam, blueTeam});
    }

    function exitGame(){
        socket.emit("exit_codename_game", { where:'exitedgame', playername:activePlayerClient, room:roomName, roomtype:roomType, code, guesses:guesses, currTeam, cardClicked, clickedCards, scoreRed, scoreBlue, redWords, blueWords, grayWord, selectedWords});
    }

    function newGame(){
        socket.emit("new_codename_game", { where:'newgame', playername:activePlayerClient, room:roomName, roomtype:roomType, allWords, code, guesses:guesses, redTeam, blueTeam, currTeam, cardClicked, clickedCards, scoreRed, scoreBlue, redWords, blueWords, grayWord, selectedWords});
    }

    function gameOver(winners, room, reason){
        socket.emit("game_over_codename", { where:'gameover', playername:activePlayerClient, room:room, roomtype:roomType, code, guesses:guesses, currTeam, cardClicked, clickedCards, scoreRed, scoreBlue, redWords, blueWords, grayWord, winners, selectedWords, reason});
    }

    function randomizePlayers(){
        socket.emit("randomize_codename_team", { where:'randomizeplayers', room:roomName, playerslist:playersList});
    }

    function getTeamColors(playerslist){
        let blueTeamTemp = [];
        let redTeamTemp = [];
        for(var i in playerslist){
            if(playerslist[i].gameinfo.color === 'red'){
                redTeamTemp.push(playerslist[i]);
            }else if(playerslist[i].gameinfo.color === 'blue'){
                blueTeamTemp.push(playerslist[i]);
            }
        } 
        setBlueTeam(blueTeamTemp);
        setRedTeam(redTeamTemp);
    }

    useEffect(() => {
        
        socket.on('updateplayersclient',function(data){   
            if(data.calltype === 'teampick'){
                getTeamColors(data.playerslist);
                setPlayersList(data.playerslist);
            }else if(data.calltype === 'startgame'){
                setHideSignIn("none");
                setShowWaitingRoom("none");
                setShowGameRoom("flex");
                setGameIsOver('none');
                setDisableSkip(true);
                setSpymasterFieldValue('');
                setClickedCards([],[]); 
                setSelectedWords(data.list.selectedWords);
                setRedWords(data.list.redWords);
                setBlueWords(data.list.blueWords);
                setGrayWord(data.list.grayWord);
                setSpymasterRedList(data.list.spymasterredlist);
                setSpymasterBlueList(data.list.spymasterbluelist);
                setCurrTeam(data.list.startingTeam);
                setCurrPlayAction('Waiting on the ' + data.list.startingTeam + ' team to give their clue!');
                setScoreRed(data.list.redWords.length);
                setScoreBlue(data.list.blueWords.length);
                setDisableWhileGuessing('block');
                setShowWhileGivingClue(true);
            }else if(data.calltype === 'cluesent'){
                setHideSignIn("none");
                setShowWaitingRoom("none");
                setCurrPlayAction('Team ' + data.list.currTeam + ' it is your turn to guess! The clue is ' + data.list.code + ' and your guesses: ' + (data.list.guesses-1) + ' + 1 extra!');
                setGuesses(data.list.guesses);
                setCode(data.list.code);
                setDisableSkip(true);
                setDisableWhileGuessing('none');
                setShowWhileGivingClue(false);
            }else if(data.calltype === 'clicksent'){
                setRedWords(data.list.redWords);
                setBlueWords(data.list.blueWords);
                setGrayWord(data.list.grayWord);
                setGuesses(data.list.guesses);
                setScoreRed(data.list.scoreRed);
                setScoreBlue(data.list.scoreBlue);
                setCode(data.list.code);
                let enemyteamcolor = data.list.currTeam == 'red' ? 'blue' : 'red';

                let cardcolor = checkWhatCardItIs(data.list.cardClicked, data.list.redWords, data.list.blueWords, data.list.grayWord);
                let newclicked = [];
                if(data.list.clickedCards == undefined || data.list.clickedCards == null){
                    newclicked.push(data.list.cardClicked);
                }else{
                    newclicked = [...data.list.clickedCards];
                    newclicked.push(data.list.cardClicked);
                }
                setClickedCards(newclicked); 
                
                
                socket.emit("update_board", { where:'updateboard', playername:activePlayerClient, room:data.room, roomtype:roomType, code:data.list.code, guesses, currTeam, cardClicked, newclicked, scoreRed, scoreBlue, redWords, blueWords, grayWord });
                if(cardcolor == data.list.currTeam){
                    setCurrPlayAction('Great job ' + data.list.currTeam + ' team! You found one! Keep going! The clue is ' + data.list.code + ' and your guesses left: ' + (data.list.guesses-1) + ' + 1 extra!');
                    reduceScoreDown(data.list.currTeam, data.list.scoreRed, data.list.scoreBlue, data.room);
                    setDisableSkip(false);
                    if(data.list.guesses-1 < 0){
                        setCurrPlayAction('That is all of you guesses! Now it is time for ' + enemyteamcolor + ' team to come up with a clue!');
                        nextTurn(data.list.currTeam, enemyteamcolor);
                    }
                }else if(cardcolor == 'gray'){
                    gameOver(enemyteamcolor, data.room, 'gray');
                }else if(cardcolor == 'blank'){
                    setCurrPlayAction('A blank card has been clicked! Now it is time for ' + enemyteamcolor + ' team to come up with a clue!');
                    nextTurn(data.list.currTeam, enemyteamcolor);
                }
                else{
                    setCurrPlayAction('Oh no ' + data.list.currTeam + ' team! You found the enemies card! Now it is your turn ' + enemyteamcolor + ' team to come up with a clue!');
                    if(reduceScoreDown(enemyteamcolor, data.list.scoreRed, data.list.scoreBlue, data.room)){
                        nextTurn(data.list.currTeam, enemyteamcolor);
                    }
                    
                }
            }else if(data.calltype === 'updateboard'){
                setClickedCards(data.list.clickedCards); 
            }else if(data.calltype === 'update'){
                setPlayersList(data.playerslist);
                setActivePlayerClient(data.activeplayerclient);
                getTeamColors(data.playerslist);
            }else if(data.calltype === 'reconnect'){

                console.log(data.roominfo);
                

                //lobby - update whose names are where
                if(data.roominfo.where=='lobby' || data.roominfo.where==undefined){
                    getTeamColors(data.playerslist);
                    setPlayersList(data.playerslist);
                    setActivePlayerClient(data.activeplayerclient);
                }
                //start game button
                else if(data.roominfo.where=='startedgame'){
                    setTimeout(() => {
                        setShowWaitingRoom("none");
                      }, "300");
                    setShowWaitingRoom("none");
                    setHideSignIn("none");
                    setShowGameRoom("flex");
                    setGameIsOver('none');
                    getTeamColors(data.playerslist);
                    setDisableSkip(true);
                    setSpymasterFieldValue('');
                    setClickedCards([],[]); 
                    setPlayersList(data.playerslist);
                    setActivePlayerClient(data.activeplayerclient);
                    setBlueWords(data.roominfo.blueWords);
                    setRedWords(data.roominfo.redWords);
                    setGrayWord(data.roominfo.grayWord);
                    setSelectedWords(data.roominfo.selectedWords);
                    setSpymasterBlueList(data.roominfo.spymasterbluelist);
                    setSpymasterRedList(data.roominfo.spymasterredlist);
                    setCurrTeam(data.roominfo.startingTeam);
                    setCurrPlayAction('Waiting on the ' + data.roominfo.startingTeam + ' team to give their clue!');
                    setScoreRed(data.roominfo.redWords.length);
                    setScoreBlue(data.roominfo.blueWords.length);
                    setDisableWhileGuessing('block');
                    setShowWhileGivingClue(true);
                }else if(data.roominfo.where=='sendclue'){
                    setTimeout(() => {
                        setShowWaitingRoom("none");
                      }, "300");
                    setHideSignIn("none");
                    setShowWaitingRoom("none");
                    setShowGameRoom("flex");
                    setGameIsOver('none');
                    getTeamColors(data.playerslist);
                    setCode(data.roominfo.code);
                    setGuesses(data.roominfo.guesses);
                    setDisableSkip(true);
                    setSpymasterFieldValue('');
                    setClickedCards([],[]); 
                    setPlayersList(data.playerslist);
                    setActivePlayerClient(data.activeplayerclient);
                    setBlueWords(data.roominfo.blueWords);
                    setRedWords(data.roominfo.redWords);
                    setGrayWord(data.roominfo.grayWord);
                    setSelectedWords(data.roominfo.selectedWords);
                    setSpymasterBlueList(data.roominfo.spymasterbluelist);
                    setSpymasterRedList(data.roominfo.spymasterredlist);
                    setCurrTeam(data.roominfo.startingTeam);
                    setCurrPlayAction('Team ' + data.roominfo.currTeam + ' it is your turn to guess! The clue is ' + data.roominfo.code + ' and your guesses: ' + (data.roominfo.guesses-1) + ' + 1 extra!');
                    setScoreRed(data.roominfo.redWords.length);
                    setScoreBlue(data.roominfo.blueWords.length);
                    setDisableWhileGuessing('none');
                    setShowWhileGivingClue(false);
                }else if(data.roominfo.where=='clickedcard'){
                    setTimeout(() => {
                        setShowWaitingRoom("none");
                      }, "300");
                    setHideSignIn("none");
                    setShowWaitingRoom("none");
                    setShowGameRoom("flex");
                    setGameIsOver('none');
                    getTeamColors(data.playerslist);
                    setCode(data.roominfo.code);
                    setGuesses(data.roominfo.guesses);
                    setDisableSkip(true);
                    setSpymasterFieldValue('');
                    setClickedCards([],[]); 
                    setPlayersList(data.playerslist);
                    setActivePlayerClient(data.activeplayerclient);
                    setBlueWords(data.roominfo.blueWords);
                    setRedWords(data.roominfo.redWords);
                    setGrayWord(data.roominfo.grayWord);
                    setSelectedWords(data.roominfo.selectedWords);
                    setSpymasterBlueList(data.roominfo.spymasterbluelist);
                    setSpymasterRedList(data.roominfo.spymasterredlist);
                    setCurrTeam(data.roominfo.startingTeam);
                    setCurrPlayAction('Team ' + data.roominfo.currTeam + ' it is your turn to guess! The clue is ' + data.roominfo.code + ' and your guesses: ' + (data.roominfo.guesses-1) + ' + 1 extra!');
                    setScoreRed(data.roominfo.scoreRed);
                    setScoreBlue(data.roominfo.scoreBlue);
                    setDisableWhileGuessing('none');
                    setShowWhileGivingClue(false);


                    let enemyteamcolor = data.roominfo.currTeam == 'red' ? 'blue' : 'red';

                    let cardcolor = checkWhatCardItIs(data.roominfo.cardClicked, data.roominfo.redWords, data.roominfo.blueWords, data.roominfo.grayWord);
                    let newclicked = [];
                    if(data.roominfo.clickedCards == undefined || data.roominfo.clickedCards == null){
                        newclicked.push(data.roominfo.cardClicked);
                    }else{
                        newclicked = [...data.roominfo.clickedCards];
                        newclicked.push(data.roominfo.cardClicked);
                    }
                    setClickedCards(newclicked); 
                    
                    
                    socket.emit("update_board", { where:'updateboard', playername:activePlayerClient, room:data.room, roomtype:roomType, code:data.roominfo.code, guesses, currTeam, cardClicked, newclicked, scoreRed, scoreBlue, redWords, blueWords, grayWord });
                    if(cardcolor == data.roominfo.currTeam){
                        setCurrPlayAction('Great job ' + data.roominfo.currTeam + ' team! You found one! Keep going! The clue is ' + data.roominfo.code + ' and your guesses left: ' + (data.roominfo.guesses-1) + ' + 1 extra!');
                        reduceScoreDown(data.roominfo.currTeam, data.roominfo.scoreRed, data.roominfo.scoreBlue, data.room);
                        setDisableSkip(false);
                        if(data.roominfo.guesses-1 < 0){
                            setCurrPlayAction('That is all of you guesses! Now it is time for ' + enemyteamcolor + ' team to come up with a clue!');
                            nextTurn(data.roominfo.currTeam, enemyteamcolor);
                        }
                    }else if(cardcolor == 'gray'){
                    }else if(cardcolor == 'blank'){
                        setCurrPlayAction('A blank card has been clicked! Now it is time for ' + enemyteamcolor + ' team to come up with a clue!');
                        nextTurn(data.roominfo.currTeam, enemyteamcolor);
                    }
                    else{
                        setCurrPlayAction('Oh no ' + data.roominfo.currTeam + ' team! You found the enemies card! Now it is your turn ' + enemyteamcolor + ' team to come up with a clue!');
                        if(reduceScoreDown(enemyteamcolor, data.roominfo.scoreRed, data.roominfo.scoreBlue, data.room)){
                            nextTurn(data.roominfo.currTeam, enemyteamcolor);
                        }
                    }
                }else if(data.roominfo.where=='gameover'){
                    setTimeout(() => {
                        setShowWaitingRoom("none");
                      }, "300");
                    setHideSignIn("none");
                    setShowWaitingRoom("none");
                    setShowGameRoom("flex");
                    getTeamColors(data.playerslist);
                    setCode(data.roominfo.code);
                    setGuesses(data.roominfo.guesses);
                    setDisableSkip(true);
                    setSpymasterFieldValue('');
                    setPlayersList(data.playerslist);
                    setActivePlayerClient(data.activeplayerclient);
                    setBlueWords(data.roominfo.blueWords);
                    setRedWords(data.roominfo.redWords);
                    setGrayWord(data.roominfo.redWords);
                    setSelectedWords(data.roominfo.selectedWords);
                    setSpymasterBlueList(data.roominfo.spymasterbluelist);
                    setSpymasterRedList(data.roominfo.spymasterredlist);
                    setCurrTeam(data.roominfo.startingTeam);
                    setScoreRed(data.roominfo.scoreRed);
                    setScoreBlue(data.roominfo.scoreBlue);

                    let newclicked = [];
                    newclicked = [...data.roominfo.selectedWords];
                    // setClickedCards(newclicked); 
                    setGameIsOver('flex');
                    if(data.roominfo.reason == 'gray'){
                        setCurrPlayAction('OOPS! That was the gray card! The ' + data.roominfo.winners + ' team has won!');
                    }else{
                        setCurrPlayAction('The ' + data.roominfo.winners + ' team has won by getting all of their cards first!');
                    }
                }else if(data.roominfo.where=='skipturn'){
                    setTimeout(() => {
                        setShowWaitingRoom("none");
                      }, "300");
                    setHideSignIn("none");
                    setShowWaitingRoom("none");
                    setShowGameRoom("flex");
                    getTeamColors(data.playerslist);
                    setCode(data.roominfo.code);
                    setGuesses(data.roominfo.guesses);
                    setDisableSkip(true);
                    setSpymasterFieldValue('');
                    setPlayersList(data.playerslist);
                    setActivePlayerClient(data.activeplayerclient);
                    setBlueWords(data.roominfo.blueWords);
                    setRedWords(data.roominfo.redWords);
                    setGrayWord(data.roominfo.redWords);
                    setSelectedWords(data.roominfo.selectedWords);
                    setSpymasterBlueList(data.roominfo.spymasterbluelist);
                    setSpymasterRedList(data.roominfo.spymasterredlist);
                    setCurrTeam(data.roominfo.startingTeam);
                    setScoreRed(data.roominfo.scoreRed);
                    setScoreBlue(data.roominfo.scoreBlue);

                    let enemyteamcolor = data.roominfo.currTeam == 'red' ? 'blue' : 'red';
                    setCurrPlayAction('The ' + data.roominfo.currTeam + ' team has skipped the rest of their turn! Now it is your turn ' + enemyteamcolor + ' team to come up with a clue!');
                    nextTurn(data.roominfo.currTeam, enemyteamcolor);
                }

            }else if(data.calltype === 'skippedturn'){
                let enemyteamcolor = data.list.currTeam == 'red' ? 'blue' : 'red';
                setCurrPlayAction('The ' + data.list.currTeam + ' team has skipped the rest of their turn! Now it is your turn ' + enemyteamcolor + ' team to come up with a clue!');
                nextTurn(data.list.currTeam, enemyteamcolor);
            }else if(data.calltype === 'updateafterdisconnect'){
                getTeamColors(data.playerslist);
                setPlayersList(data.playerslist);
                
            }else if(data.calltype === 'gameovercodename'){
                let newclicked = [];
                newclicked = [...data.list.selectedWords];
                setClickedCards(newclicked); 
                setGameIsOver('flex');
                if(data.list.reason == 'gray'){
                    setCurrPlayAction('OOPS! That was the gray card! The ' + data.list.winners + ' team has won!');
                }else{
                    setCurrPlayAction('The ' + data.list.winners + ' team has won by getting all of their cards first!');
                }
            }else{
                setPlayersList(data.playerslist);
                setActivePlayerClient(data.activeplayerclient);
                getTeamColors(data.playerslist);
            }
        });  
        
        socket.on('startgameerrormessage',function(data){
            setStartGameErrorMessage(data.msg);
            document.getElementsByClassName("start-game-error")[0].classList.add("show-opacity");
            setTimeout(() => {
                document.getElementsByClassName("start-game-error")[0].classList.remove("show-opacity");  
            }, "4000");
        });  

        socket.on('backtocodenamehome',function(data){
            setHideSignIn("block");
            setShowWaitingRoom("none");
            setShowGameRoom("none");
        });  
        
    }, [socket]);

    useEffect(() => {
        if (isMount) {
        } else {
            if(openGame === true){
                setHideSignIn("none");
                setShowWaitingRoom("flex");
            }
        }
        
    }, [openGame]);
    
      
    return (
        <>
            <div className="extra-background-color" style={{backgroundColor: '#080620', width: '100%', height: '100vh', position: 'fixed'}}>
            </div>
            <div className="container ">
                <Navbar />
                <div className="content add-extra-on-mobile" style={{backgroundColor: '#fff', justifyContent: 'center'}}>
                    <div style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center'}}>
                        <div className="main-header" style={{padding:'10px 0 0px 0px'}}>Codenames Clone</div>
                        <div className="main-body main-space-even" style={{padding: '0px 10px 10px 10px', textAlign: 'center', maxWidth:'1625px', width:'100%'}}>     
                            <div style={{display:hideSignIn}}>
                                <JoinRoom socket={socket} setRoomName={setRoomName} setOpenGame={setOpenGame} roomtype={roomType} />
                            </div>   
                            <div style={{display:showWaitingRoom, flexDirection:"column",alignItems:'center'}} >
                                <div className="room-name">Room: {roomName}</div>
                                <PlayersList playersList={playersList} direction={'horizontal'} activePlayerClient={activePlayerClient} />
                                <div className="flex-center">
                                    <div className="codename-waiting-color code-name-red-team">
                                        <div className="main-header" style={{padding:'10px 0 10px 0px', fontSize:'20px', color:'#932020'}}>Red Team</div>
                                        <button className='input-button hover-red' onClick={() => joinTeam('red')}>Join Team</button>
                                            {redTeam.map((item, index) => <div key={index} className="team-color" style={{color:'red'}}> {item.name} </div>)}
                                    </div>
                                    <div className="codename-waiting-color code-name-red-team">
                                        <div className="main-header" style={{padding:'10px 0 10px 0px', fontSize:'20px', color:'#44c'}}>Blue Team</div>
                                        <button className='input-button hover-blue' onClick={() => joinTeam('blue')}>Join Team</button>
                                            {blueTeam.map((item, index) => <div key={index} className="team-color" style={{color:'#7474ff'}}> {item.name} </div>)}
                                    </div>
                                </div>
                                
                                <div className='start-game-error'>{startGameErrorMessage}</div>
                                <a className='rules-button' href="https://www.ultraboardgames.com/codenames/game-rules.php" target='_blank'>Rules</a>
                                <button className='input-button'style={playersList[0].name === activePlayerClient ? {display:'block'} : {display:'none'}} onClick={randomizePlayers}>Randomize</button>
                                <button className='input-button start-game'style={playersList[0].name === activePlayerClient ? {display:'block'} : {display:'none'}} onClick={startGame}>Start Game</button>
                                <div className="gameboard">

                                </div>
                            </div>
                            <div style={{display:showGameRoom, flexDirection:"column",alignItems:'center'}}>
                                <div className="room-name">Room: {roomName}</div>
                                <div className="message-prompt">
                                    {currPlayAction} {currGuesses}
                                </div>
                                <div className="score-prompt">
                                    <div className="score-prompt-red">{scoreRed}</div>
                                    <div className="score-prompt-turn" style={currTeam == 'red' ? {backgroundColor:'#932020'} : {backgroundColor:'#20207e'}}>{currTeam}'s Turn</div>
                                    <div className="score-prompt-blue">{scoreBlue}</div>
                                </div>
                                <div className="just-for-web" style={{display:showGameRoom, flexDirection:"column",alignItems:'center'}}>
                                    <div className="codename-gameboard flex-center">
                                        <div className="codename-red-side flex-center">
                                            <CodenameRedSide selectedWords={selectedWords} grayWord={grayWord}  redWords={redWords} blueWords={blueWords} setCardClicked={setCardClicked} clickedCards={clickedCards} gameIsOver={gameIsOver} spymasterRedList={spymasterRedList} spymasterBlueList={spymasterBlueList} activePlayerClient={activePlayerClient} playersList={playersList} currTeam={currTeam} showWhileGivingClue={showWhileGivingClue} scoreBlue={scoreBlue} scoreRed={scoreRed} />
                                            <CodenameExtraLeft selectedWords={selectedWords} grayWord={grayWord}  redWords={redWords} blueWords={blueWords} setCardClicked={setCardClicked} clickedCards={clickedCards} gameIsOver={gameIsOver} spymasterRedList={spymasterRedList} spymasterBlueList={spymasterBlueList} activePlayerClient={activePlayerClient} playersList={playersList} currTeam={currTeam} showWhileGivingClue={showWhileGivingClue} scoreBlue={scoreBlue} scoreRed={scoreRed} />
                                        </div>
                                        <CodenameGameBoard selectedWords={selectedWords} grayWord={grayWord}  redWords={redWords} blueWords={blueWords} setCardClicked={setCardClicked} clickedCards={clickedCards} gameIsOver={gameIsOver} spymasterRedList={spymasterRedList} spymasterBlueList={spymasterBlueList} activePlayerClient={activePlayerClient} playersList={playersList} currTeam={currTeam} showWhileGivingClue={showWhileGivingClue} scoreBlue={scoreBlue} scoreRed={scoreRed} />
                                        <div className="codename-blue-side">
                                            <CodenameBlueSide selectedWords={selectedWords} grayWord={grayWord}  redWords={redWords} blueWords={blueWords} setCardClicked={setCardClicked} clickedCards={clickedCards} gameIsOver={gameIsOver} spymasterRedList={spymasterRedList} spymasterBlueList={spymasterBlueList} activePlayerClient={activePlayerClient} playersList={playersList} currTeam={currTeam} showWhileGivingClue={showWhileGivingClue} scoreBlue={scoreBlue} scoreRed={scoreRed} />
                                            <CodenameExtraRight selectedWords={selectedWords} grayWord={grayWord}  redWords={redWords} blueWords={blueWords} setCardClicked={setCardClicked} clickedCards={clickedCards} gameIsOver={gameIsOver} spymasterRedList={spymasterRedList} spymasterBlueList={spymasterBlueList} activePlayerClient={activePlayerClient} playersList={playersList} currTeam={currTeam} showWhileGivingClue={showWhileGivingClue} scoreBlue={scoreBlue} scoreRed={scoreRed} disableWhileGuessing={disableWhileGuessing} skipTurn={skipTurn} sendClue={sendClue} setGuesses={setGuesses} setCode={setCode} exitGame={exitGame} newGame={newGame} disableSkip={disableSkip} />
                                        </div>
                                    </div>
                                </div>
                                <div className="just-for-mobile" style={{display:showGameRoom, flexDirection:"column",alignItems:'center', display:'none'}}>
                                    <div className="codename-gameboard flex-center-column" style={{width:'100%'}}>
                                        <CodenameGameBoard selectedWords={selectedWords} grayWord={grayWord}  redWords={redWords} blueWords={blueWords} setCardClicked={setCardClicked} clickedCards={clickedCards} gameIsOver={gameIsOver} spymasterRedList={spymasterRedList} spymasterBlueList={spymasterBlueList} activePlayerClient={activePlayerClient} playersList={playersList} currTeam={currTeam} showWhileGivingClue={showWhileGivingClue} scoreBlue={scoreBlue} scoreRed={scoreRed} />
                                        <div style={{width:'100%'}}>
                                            <CodenameExtraRight selectedWords={selectedWords} grayWord={grayWord}  redWords={redWords} blueWords={blueWords} setCardClicked={setCardClicked} clickedCards={clickedCards} gameIsOver={gameIsOver} spymasterRedList={spymasterRedList} spymasterBlueList={spymasterBlueList} activePlayerClient={activePlayerClient} playersList={playersList} currTeam={currTeam} showWhileGivingClue={showWhileGivingClue} scoreBlue={scoreBlue} scoreRed={scoreRed} disableWhileGuessing={disableWhileGuessing} skipTurn={skipTurn} sendClue={sendClue} setGuesses={setGuesses} setCode={setCode} exitGame={exitGame} newGame={newGame} disableSkip={disableSkip} />
                                        </div>
                                        <div className="flex-center center-evenly" style={{width:'100%', marginTop:'15px'}}>
                                            <div className="codename-red-side flex-center">
                                                <CodenameRedSide selectedWords={selectedWords} grayWord={grayWord}  redWords={redWords} blueWords={blueWords} setCardClicked={setCardClicked} clickedCards={clickedCards} gameIsOver={gameIsOver} spymasterRedList={spymasterRedList} spymasterBlueList={spymasterBlueList} activePlayerClient={activePlayerClient} playersList={playersList} currTeam={currTeam} showWhileGivingClue={showWhileGivingClue} scoreBlue={scoreBlue} scoreRed={scoreRed} />
                                            </div>
                                            <div className="codename-blue-side flex-center">
                                                <CodenameBlueSide selectedWords={selectedWords} grayWord={grayWord}  redWords={redWords} blueWords={blueWords} setCardClicked={setCardClicked} clickedCards={clickedCards} gameIsOver={gameIsOver} spymasterRedList={spymasterRedList} spymasterBlueList={spymasterBlueList} activePlayerClient={activePlayerClient} playersList={playersList} currTeam={currTeam} showWhileGivingClue={showWhileGivingClue} scoreBlue={scoreBlue} scoreRed={scoreRed} />
                                            </div>
                                        </div>
                                        <div className="flex-center-column" style={{width:'100%'}}>  
                                            <CodenameExtraLeft selectedWords={selectedWords} grayWord={grayWord}  redWords={redWords} blueWords={blueWords} setCardClicked={setCardClicked} clickedCards={clickedCards} gameIsOver={gameIsOver} spymasterRedList={spymasterRedList} spymasterBlueList={spymasterBlueList} activePlayerClient={activePlayerClient} playersList={playersList} currTeam={currTeam} showWhileGivingClue={showWhileGivingClue} scoreBlue={scoreBlue} scoreRed={scoreRed} />
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>                    
                            
                        </div>
                    </div>  
                </div>
                {/* <RightContent /> */} 
            </div>
        </>
        
      );
}

export default CodenamesClone;


