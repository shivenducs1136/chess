import {init} from "./data/data.js"; 
import { initGameRender,waitScreenRender,renderExpecetedMoves, chanceRender,renderKilledPieces } from "./render/main.js";
import { globalEvent } from "./events/global.js";
import { stompClient } from "./helper/constants.js";

let roomId;
let boardState;
let playerColor;
stompClient.connect({}, (frame) => {
    console.log('Connected: ' + frame);

    stompClient.subscribe('/user/topic/join', (response) => {
        console.log(JSON.parse(response.body).content);
        const id = JSON.parse(response.body).roomId;
        roomId = id;
        playerColor = JSON.parse(response.body).playerColor; 
        chanceRender();

        stompClient.subscribe('/topic/room/'+id,(res)=>{
            if(res.body === 'true'){
              
                stompClient.send("/app/game/create/"+roomId,{});
            }
            else{
                waitScreenRender("Waiting for other player to join...");
            }
        });
        stompClient.send('/app/room/'+id,{});
        stompClient.subscribe('/topic/leave/'+roomId, (response) => {
            waitScreenRender("Other player left the game");
        });
        
        stompClient.subscribe('/topic/game/create/'+roomId,(res)=>{
            const boardString = JSON.parse(res.body).board;
            const boardRows = boardString.split(',');
            const data = boardRows.map(row => row.split('').map(cell => cell === '.' ? "" : cell));
            const boardData = init(data);
            initGameRender(boardData); 
            boardState = boardData;
        });
        stompClient.subscribe('/user/topic/game/expectedMove/'+roomId,(res)=>{
            const expectedMoves =JSON.parse(res.body); 
            renderExpecetedMoves(boardState,expectedMoves);
        });
        stompClient.subscribe('/topic/game/move/'+roomId,(res)=>{
            const boardString = JSON.parse(res.body).board;
            const boardRows = boardString.split(',');
            const data = boardRows.map(row => row.split('').map(cell => cell === '.' ? "" : cell));
            const boardData = init(data);
            initGameRender(boardData); 
            boardState = boardData;
            stompClient.send('/app/game/killedPieces/'+roomId,{});
        });
        stompClient.subscribe('/topic/game/killedPieces/'+roomId,(res)=>{
            console.log(res.body);
            renderKilledPieces(res.body);
        });
    });

 
    stompClient.send('/app/join',{});

});

globalEvent();
export {roomId,playerColor};