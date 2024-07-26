package io.github.shivenducs1136.chessbackend.controller;

import io.github.shivenducs1136.chessbackend.model.chessModel.ChessGameModel;
import io.github.shivenducs1136.chessbackend.model.chessModel.ChessMoveModel;
import io.github.shivenducs1136.chessbackend.service.ChessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class WebSocketChessController {

    @Autowired
    private ChessService chessService;

    @MessageMapping("/game/create/{roomId}")
    @SendTo("/topic/game/create/{roomId}")
    public ChessGameModel createNewGame(@DestinationVariable String roomId){
        return chessService.createNewChessEngine(roomId);
    }

    @MessageMapping("/game/expectedMove/{roomId}")
    @SendToUser(destinations = "/topic/game/expectedMove/{roomId}",broadcast = false)
    public List<String> getExpectedMove(@DestinationVariable String roomId, String currentPosition){
        return chessService.getExpectedMoves(roomId,currentPosition);
    }

    @MessageMapping("/game/move/{roomId}")
    @SendTo("/topic/game/move/{roomId}")
    public ChessGameModel move(@DestinationVariable String roomId, ChessMoveModel cm){
        return chessService.movePiece(roomId,cm);
    }

    @MessageMapping("/game/killedPieces/{roomId}")
    @SendTo("/topic/game/killedPieces/{roomId}")
    public List<String> getKilledPieces(@DestinationVariable String roomId){
        return chessService.getKilledPieces(roomId);
    }

    @MessageMapping("/game/currentChance/{roomId}")
    @SendTo("/topic/game/currentChance/{roomId}")
    public String getCurrentPlayerChance(@DestinationVariable String roomId){
        return chessService.getCurrentChance(roomId);
    }

}
