package io.github.shivenducs1136.chessbackend.utils;

import io.github.shivenducs1136.abstracts.ChessCallback;
import io.github.shivenducs1136.chessbackend.controller.WebSocketChessController;
import io.github.shivenducs1136.chessbackend.service.ChessService;
import io.github.shivenducs1136.enums.PieceEnum;
import org.springframework.beans.factory.annotation.Autowired;

public class ChessGameCallback implements ChessCallback {
    @Override
    public PieceEnum getSelectedPieceForPawnUpgrade() {
        return PieceEnum.Queen;
    }
}
