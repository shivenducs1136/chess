function blackPawn(currentPosition){
    return{
        currentPosition,
        img:"assets/images/pieces/black/pawn.png"
    }; 
}
function whitePawn(currentPosition){
    return{
        currentPosition,
        img:"assets/images/pieces/white/pawn.png"
    }; 
}

function blackKing(currentPosition){
    return{
        currentPosition,
        img:"assets/images/pieces/black/king.png"
    }
}
function blackQueen(currentPosition){
    return{
        currentPosition,
        img:"assets/images/pieces/black/queen.png"
    }
}
function blackBishop(currentPosition){
    return{
        currentPosition,
        img:"assets/images/pieces/black/bishop.png"
    }
}
function blackKnight(currentPosition){
    return{
        currentPosition,
        img:"assets/images/pieces/black/knight.png"
    }
}
function blackRook(currentPosition){
    return{
        currentPosition,
        img:"assets/images/pieces/black/rook.png"
    }
}

function whiteKing(currentPosition){
    return{
        currentPosition,
        img:"assets/images/pieces/white/king.png"
    }
}
function whiteQueen(currentPosition){
    return{
        currentPosition,
        img:"assets/images/pieces/white/queen.png"
    }
}
function whiteBishop(currentPosition){
    return{
        currentPosition,
        img:"assets/images/pieces/white/bishop.png"
    }
}
function whiteKnight(currentPosition){
    return{
        currentPosition,
        img:"assets/images/pieces/white/knight.png"
    }
}
function whiteRook(currentPosition){
    return{
        currentPosition,
        img:"assets/images/pieces/white/rook.png"
    }
}
export {
    blackPawn,
    blackKing,
    blackBishop,
    blackKnight,
    blackQueen,
    blackRook,
    whitePawn,
    whiteBishop,
    whiteKing,
    whiteKnight,
    whiteQueen,
    whiteRook
};