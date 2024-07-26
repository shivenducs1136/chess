import { ROOT_DIV, stompClient } from "../helper/constants.js";
import { roomId,playerColor } from "../app.js";
import { deRenderExpectedMoves } from "../render/main.js";

let prevPos;
function globalEvent(){
    ROOT_DIV.addEventListener("click",function(event){
        console.log(event);
        if(event.target.localName === "img"){
            if(event.target.currentSrc.includes(playerColor)){
                stompClient.send("/app/game/expectedMove/"+roomId,{},event.target.parentNode.id); 
            prevPos = event.target.parentNode.id;
            }
        }
        else{
            // nothing is clicked deRender all expected moves;
            if(document.getElementById(event.target.parentNode.id).querySelector('.circle')){
                stompClient.send("/app/game/move/"+roomId,{},JSON.stringify({currentPiecePosition:prevPos,newPosition:event.target.parentNode.id}))
            }
            else{
                deRenderExpectedMoves();
            }
        }

    });
    window.addEventListener('beforeunload',function(e){
        stompClient.send('/app/leave',{},JSON.stringify({roomId}));
    });
    const btn = document.getElementById("alertBtn"); 
    btn.addEventListener("click",function(){
        window.location.reload(true);
    });
}

export {globalEvent};