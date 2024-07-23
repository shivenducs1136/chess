package io.github.shivenducs1136.chessbackend.model.chessModel;

public class ChessMoveModel {
    private String currentPiecePosition;
    private String newPosition;

    public String getCurrentPiecePosition() {
        return currentPiecePosition;
    }

    public void setCurrentPiecePosition(String currentPiecePosition) {
        this.currentPiecePosition = currentPiecePosition;
    }

    public String getNewPosition() {
        return newPosition;
    }

    public void setNewPosition(String newPosition) {
        this.newPosition = newPosition;
    }
}
