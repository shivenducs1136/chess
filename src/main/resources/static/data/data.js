import { roomId,playerColor } from "../app.js";
import { stompClient } from "../helper/constants.js";
function Square(color,id,piece){
    return {color,id,piece}; 
}

function init(data){
    const boardData = [];
    if(playerColor == 'black'){
        const abcd = ['h','g','f','e','d','c','b','a']; 
    data.forEach((row,rindex) => {
        const boardRow =[]; 
        row.forEach((square,index) => {
            let color;
            
            const id = abcd[index]+(rindex+1); 
            if(isUpperCase(square)){
                color = "white";
            }
            else{
                color = "black"; 
            }
            let piece = null; 
            if(square){
                piece = {
                    type : square,
                    color:color,
                    img :""
                }
            }
            if(rindex%2==0){
                if(index%2==0){
                    boardRow.push(Square("white",id,piece)); 
                }
                else{
                    boardRow.push(Square("black",id,piece)); 
                }
            }
            else{
                if(index%2==0){
                    boardRow.push(Square("black",id,piece)); 
                }
                else{
                    boardRow.push(Square("white",id,piece)); 
                }
            }
            
        });
        boardData.push(boardRow);
    });
    }
    else if(playerColor == 'white'){
        const abcd = ['a','b','c','d','e','f','g','h']; 
        data.reverse();
        
        data.forEach((row,rindex) => {
            const boardRow =[]; 
            row.reverse();
            row.forEach((square,index) => {
                let color;
                
                const id = abcd[index]+(8-rindex); 
                if(isUpperCase(square)){
                    color = "white";
                }
                else{
                    color = "black"; 
                }
                let piece = null; 
                if(square){
                    piece = {
                        type : square,
                        color:color,
                        img :""
                    }
                }
                if(rindex%2==0){
                    if(index%2==0){
                        boardRow.push(Square("white",id,piece)); 
                    }
                    else{
                        boardRow.push(Square("black",id,piece)); 
                    }
                }
                else{
                    if(index%2==0){
                        boardRow.push(Square("black",id,piece)); 
                    }
                    else{
                        boardRow.push(Square("white",id,piece)); 
                    }
                }
                
            });
            boardData.push(boardRow);
        });
    }
    return boardData;
}
function isUpperCase(str) {
    return str === str.toUpperCase();
}

export {init}; 