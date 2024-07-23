package io.github.shivenducs1136.chessbackend.utils;

import io.github.shivenducs1136.abstracts.ChessCallback;
import io.github.shivenducs1136.enums.PieceEnum;

public class ChessGameCallback implements ChessCallback {
    @Override
    public PieceEnum getSelectedPieceForPawnUpgrade() {
        return PieceEnum.Queen;
    }
}
