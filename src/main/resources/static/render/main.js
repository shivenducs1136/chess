import { playerColor } from "../app.js";
import * as piece from "../data/pieces.js";
import { ROOT_DIV } from "../helper/constants.js";



function initGameRender(data){
    const elementToRemove = document.querySelector(".waitingText");
    if (elementToRemove) {
        elementToRemove.remove();
    }
    const squares = document.querySelectorAll('.squareRow');
    squares.forEach(square => {
        square.remove();
    });
    data.forEach(row => {
        const rowEl = document.createElement("div"); 
        row.forEach(square => {
            const squareDiv = document.createElement("div");
            squareDiv.id = square.id; 
            squareDiv.classList.add(square.color,"square"); 
            rowEl.appendChild(squareDiv);
        });
        rowEl.classList.add("squareRow");
        ROOT_DIV.appendChild(rowEl);
    });
    pieceRender(data); 
}
// use when you want to render piece on board
function pieceRender(data){
    data.forEach(row => {
        row.forEach(square => {
            if(square.piece){
                const sq = document.getElementById(square.id); 
                const img = document.createElement("img"); 
                square.piece.img = getPieceImageBasedOnPieceType(square.piece.type); 
                img.src = square.piece.img;
                img.classList.add("piece");
                sq.appendChild(img);
            }
        });
    });
}
function getPieceImageBasedOnPieceType(type){
    switch (type) {
        case 'r':
            return piece.blackRook().img;
            break;
        case 'R':
            return piece.whiteRook().img;
            break;
        case 'b':
            return piece.blackBishop().img;
            break;
        case 'B':
            return piece.whiteBishop().img;
            break;
        case 'p':
            return piece.blackPawn().img;
            break;
        case 'P':
            return piece.whitePawn().img;
            break;
        case 'k':
            return piece.blackKing().img;
            break;
        case 'K':
            return piece.whiteKing().img;
            break;
        case 'n':
            return piece.blackKnight().img;
            break;    
        case 'N':
            return piece.whiteKnight().img;
            break;
        case 'Q':
            return piece.whiteQueen().img;
            break;
        case 'q':
            return piece.blackQueen().img;
            break;
        default:
            break;
    }
}
function renderKilledPieces(killedPieceList){
    const opponentKilledPieces = document.createElement("div");
    opponentKilledPieces.id = "opponentKilledPieces";
    killedPieceList.forEach(str => {
        const img = document.createElement("img");
        img.id = str; 
        img.src = getPieceImageBasedOnPieceType(str);
        img.classList.add("piece");
        opponentKilledPieces.appendChild(img); 
    });
    ROOT_DIV.insertAdjacentElement(0,opponentKilledPieces);
}
function chanceRender(){
    const txt = document.createElement("h2"); 
    txt.classList.add("chanceText");
    txt.innerHTML = "Your color :"+playerColor;
    ROOT_DIV.appendChild(txt); 
}
function waitScreenRender(text){
    const txt = document.createElement("h2"); 
    txt.classList.add("waitingText");
    txt.innerHTML = text;
    ROOT_DIV.appendChild(txt); 
}

function renderExpecetedMoves(boardState,exMoves){
    deRenderExpectedMoves();
    boardState.forEach(row => {
        row.forEach(sq => {
            if(exMoves.includes(sq.id)){
                const element = document.getElementById(sq.id); 
                const expectedElement = document.createElement("div"); 
                expectedElement.classList.add("circle"); 
                element.appendChild(expectedElement);
            }
        });
    });
}
function deRenderExpectedMoves(){
    const exPrevMoves = document.querySelectorAll('.circle');
    exPrevMoves.forEach(exPrevMove => {
        exPrevMove.remove();
    });
}
export {initGameRender,waitScreenRender,renderExpecetedMoves,chanceRender,deRenderExpectedMoves,renderKilledPieces}; 