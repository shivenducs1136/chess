import {init} from "./data/data.js"; 
import { initGameRender,renderExpecetedMoves, chanceRender,renderKilledPieces,showAlert,closeAlert } from "./render/main.js";
import { globalEvent } from "./events/global.js";
import { stompClient } from "./helper/constants.js";

let roomId;
let boardState;
let playerColor;
let gameStatus; 
let currentChance;
stompClient.connect({}, (frame) => {
    console.log('Connected: ' + frame);

    stompClient.subscribe('/user/topic/join', (response) => {
        console.log(JSON.parse(response.body).content);
        const id = JSON.parse(response.body).roomId;
        roomId = id;
        playerColor = JSON.parse(response.body).playerColor; 
        gameStatus = JSON.parse(response.body).gameState;
        chanceRender();

        stompClient.subscribe('/topic/room/'+id,(res)=>{
            if(res.body === 'true'){
              
                stompClient.send("/app/game/create/"+roomId,{});
            }
            else{
                showAlert("Waiting for other player","to join...","Leave"); 
            }
        });
        stompClient.send('/app/room/'+id,{});

        stompClient.subscribe('/topic/leave/'+roomId, (response) => {
            showAlert("Other player left the room.","Game Ended.","Leave"); 
            stompClient.send('/app/end/'+roomId,{});
        });
        
        stompClient.subscribe('/topic/game/create/'+roomId,(res)=>{
            closeAlert();
            const boardString = JSON.parse(res.body).board;
            const boardRows = boardString.split(',');
            const data = boardRows.map(row => row.split('').map(cell => cell === '.' ? "" : cell));
            const boardData = init(data);
            gameStatus = JSON.parse(res.body).gameState;
            initGameRender(boardData); 
            boardState = boardData;
        });
        stompClient.subscribe('/user/topic/game/expectedMove/'+roomId,(res)=>{
            const expectedMoves =JSON.parse(res.body); 
            renderExpecetedMoves(boardState,expectedMoves);
        });
        stompClient.subscribe('/topic/game/move/'+roomId,(res)=>{
            const boardString = JSON.parse(res.body).board;
            gameStatus = JSON.parse(res.body).gameState;
            const boardRows = boardString.split(',');
            const data = boardRows.map(row => row.split('').map(cell => cell === '.' ? "" : cell));
            const boardData = init(data);
            initGameRender(boardData); 
            boardState = boardData;
            if(gameStatus == "WonByWhite" || gameStatus == "WonByBlack" || gameStatus == "StaleMate"){
                showAlert("Game is ended!", "Game status: " + gameStatus, "Exit"); 
                stompClient.send('/app/end/'+roomId,{});
            }
            stompClient.send('/app/game/killedPieces/'+roomId,{});
            stompClient.send('/app/game/currentChance/'+roomId,{}); 
        });
        stompClient.subscribe('/topic/game/killedPieces/'+roomId,(res)=>{
            renderKilledPieces(JSON.parse(res.body));
        });
        stompClient.subscribe('/topic/game/currentChance/'+roomId,(res)=>{
            currentChance = res.body;
            chanceRender();
        });
    });

 
    stompClient.send('/app/join',{});

});

globalEvent();

export {roomId,playerColor,gameStatus,currentChance};