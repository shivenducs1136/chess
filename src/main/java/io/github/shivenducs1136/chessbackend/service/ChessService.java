package io.github.shivenducs1136.chessbackend.service;

import io.github.shivenducs1136.chess.ChessEngine;
import io.github.shivenducs1136.chessbackend.model.chessModel.ChessGameModel;
import io.github.shivenducs1136.chessbackend.model.chessModel.ChessMoveModel;
import io.github.shivenducs1136.chessbackend.utils.ChessGameCallback;
import io.github.shivenducs1136.enums.PieceEnum;
import io.github.shivenducs1136.exceptions.InvalidMoveException;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ChessService {

    @Getter
    private Map<String,ChessEngine> games = new HashMap<>();

    public ChessGameModel createNewChessEngine(String roomId){
        if(games.containsKey(roomId)){
            return getGameState(roomId);
        }
        else{
            games.put(roomId,new ChessEngine(new ChessGameCallback()));
            return getGameState(roomId);
        }
    }

    public String getCurrentChance(String roomId){
        if(games.containsKey(roomId)){
           return games.get(roomId).getCurrentPlayer();
        }
        return null;
    }
    public ChessGameModel getGameState(String roomId){
        if(games.containsKey(roomId)){
            ChessGameModel c = new ChessGameModel();
            c.setGameState(games.get(roomId).getCurrentGameState());
            c.setBoard(games.get(roomId).getCurrentBoard());
            c.setCurrentChance(games.get(roomId).getCurrentPlayer());
            return c;
        }
        return null;
    }
    public List<String> getKilledPieces(String roomId){
        if(games.containsKey(roomId)){
            return games.get(roomId).getKilledPieces();
        }
        return null;
    }
    public List<String> getExpectedMoves(String roomId,String currentPosition){
        if(games.containsKey(roomId)){
            List<String> moves ;
            try{
                moves= games.get(roomId).getExpectedMoves(currentPosition);
            }
            catch (InvalidMoveException e){
                return new ArrayList<>();
            }
            return moves;
        }
        return null;
    }
    public ChessGameModel movePiece(String roomId,ChessMoveModel cm) {
        if(games.containsKey(roomId)){
            try {
                games.get(roomId).movePiece(cm.getCurrentPiecePosition(),cm.getNewPosition());
            }
            catch (Exception e){

            }
            return getGameState(roomId);
        }
        return null;
    }
    public void removeChessEngine(String roomId){
        if(roomId != null){
            if(games.containsKey(roomId)){
                games.remove(roomId);
            }
        }
    }

    public List<String> getPawnUpgradablePieces(String roomId) {
        List<String> ls = new ArrayList<>();
        if(games.containsKey(roomId)){
            var pe = PieceEnum.values();
            for (int i = 0; i < pe.length; i++) {
                if(pe[i].canUpgradeByPawn){
                    if(games.get(roomId).getCurrentPlayer() == "White"){
                        ls.add((pe[i].getPieceChar+"").toUpperCase());
                    }
                    else{
                        ls.add(pe[i].getPieceChar+"");
                    }
                }
            }
        }
        return ls;
    }

}
