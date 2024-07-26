import { playerColor,gameStatus,currentChance } from "../app.js";
import * as piece from "../data/pieces.js";
import { ROOT_DIV } from "../helper/constants.js";


const isUpperCase = (string) => /^[A-Z]*$/.test(string)

function initGameRender(data) {
    const elementToRemove = document.querySelector(".waitingText");
    if (elementToRemove) {
        elementToRemove.remove();
    }
    const squares = document.querySelectorAll('.squareRow');
    squares.forEach(square => {
        square.remove();
    });
    const killedPieceLIst = document.querySelectorAll('.killedPieceList');
    killedPieceLIst.forEach(list => {
        list.remove();
    });
    const spaces = document.querySelectorAll('.space');
    spaces.forEach(space => {
        space.remove();
    });
    const currentPlayerKilledPieces = document.createElement("div");
    currentPlayerKilledPieces.id = "currentPlayerKilledPieces";
    currentPlayerKilledPieces.classList.add("killedPieceList");
    ROOT_DIV.appendChild(currentPlayerKilledPieces);
    const space1 = document.createElement("div");
    space1.classList.add("space");
    ROOT_DIV.appendChild(space1);
    data.forEach((row, idx) => {
        const rowEl = document.createElement("div");
        rowEl.id = "row" + idx;
        row.forEach(square => {
            const squareDiv = document.createElement("div");
            squareDiv.id = square.id;
            squareDiv.classList.add(square.color, "square");
            rowEl.appendChild(squareDiv);
        });
        rowEl.classList.add("squareRow");
        ROOT_DIV.appendChild(rowEl);
    });
    const space2 = document.createElement("div");
    space2.classList.add("space");
    ROOT_DIV.appendChild(space2);
    const oppositePlayerKilledPieces = document.createElement("div");
    oppositePlayerKilledPieces.id = "oppositePlayerKilledPieces";
    oppositePlayerKilledPieces.classList.add("killedPieceList");
    ROOT_DIV.appendChild(oppositePlayerKilledPieces);
    pieceRender(data);
}
// use when you want to render piece on board
function pieceRender(data) {
    data.forEach(row => {
        row.forEach(square => {
            if (square.piece) {
                const sq = document.getElementById(square.id);
                const img = document.createElement("img");
                square.piece.img = getPieceImageBasedOnPieceType(square.piece.type);
                if(gameStatus == "Check" || gameStatus == "WonByWhite" || gameStatus == "WonByBlack"){
                    if(currentChance == "Black"){
                        if(square.piece.type == "K"){
                            sq.classList.add("check"); 
                        }
                    }
                    else{
                        if(square.piece.type == "k"){
                            sq.classList.add("check"); 
                        }
                    }   
                }
                else{
                    sq.classList.remove("check");
                }
                img.src = square.piece.img;
                img.classList.add("piece");
                sq.appendChild(img);
            }
        });
    });
}
function getPieceImageBasedOnPieceType(type) {
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
function renderKilledPieces(killedPieceList) {

    const currentPlayerKilledPieces = document.getElementById("currentPlayerKilledPieces");
    const oppositePlayerKilledPieces = document.getElementById("oppositePlayerKilledPieces");
    if (currentPlayerKilledPieces && oppositePlayerKilledPieces) {
        killedPieceList.forEach((str,idx) => {
            let img = document.getElementById(str+playerColor+idx);
            if (!img) {
                img = document.createElement("img");
                img.id = str+playerColor+idx;
                img.classList.add("killedPiece");
                img.src = getPieceImageBasedOnPieceType(str);
                // opponentKilledPieces.appendChild(img);
                if (playerColor == "white") {
                    if (isUpperCase(str)) {
                        currentPlayerKilledPieces.appendChild(img);
                    }
                    else {
                        oppositePlayerKilledPieces.appendChild(img);
                    }
                }
                else {
                    if (isUpperCase(str)) {
                        oppositePlayerKilledPieces.appendChild(img);
                    }
                    else {
                        currentPlayerKilledPieces.appendChild(img);
                    }
                }
            }
        });
    }
}
function chanceRender() {
    if(!document.getElementById("chance")){
        const txt = document.createElement("h2");
    txt.id = "chance"; 
    txt.classList.add("chanceText");
    
    ROOT_DIV.appendChild(txt);
    }
    else{
        const txt = document.getElementById("chance");
        if(currentChance){
            txt.innerHTML = "Current Chance: " + currentChance;
        }
        else{
            txt.innerHTML = "Current Chance: white";
        }
    }
}
function renderExpecetedMoves(boardState, exMoves) {
    deRenderExpectedMoves();
    boardState.forEach(row => {
        row.forEach(sq => {
            if (exMoves.includes(sq.id)) {
                const element = document.getElementById(sq.id);
                const expectedElement = document.createElement("div");
                expectedElement.classList.add("circle");
                element.appendChild(expectedElement);
            }
        });
    });
}
function deRenderExpectedMoves() {
    const exPrevMoves = document.querySelectorAll('.circle');
    exPrevMoves.forEach(exPrevMove => {
        exPrevMove.remove();
    });
}

function showAlert(primaryText,secondaryTxt,btnText) {
    document.getElementById('customAlert').style.display = 'block';
    document.getElementById('primaryTxt').innerHTML = primaryText;
    document.getElementById('secondaryTxt').innerHTML = secondaryTxt;
    if(!btnText){
        document.getElementById("alertBtn").style.display = 'none';
    }
    else{
        document.getElementById("alertBtn").style.display = 'flex';
        document.getElementById("alertBtn").innerHTML = btnText;
    }
    document.getElementById('overlay').style.display = 'block';
}

function closeAlert() {
    document.getElementById('customAlert').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}
export { initGameRender, renderExpecetedMoves, chanceRender, deRenderExpectedMoves, renderKilledPieces ,showAlert,closeAlert};