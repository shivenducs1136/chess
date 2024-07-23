package io.github.shivenducs1136.chessbackend.model.chessModel;

public class ChessGameModel {
    private String board;
    private String gameState;
    private String currentChance;

    public String getBoard() {
        return board;
    }

    public void setBoard(String board) {
        this.board = board;
    }

    public String getGameState() {
        return gameState;
    }

    public void setGameState(String gameState) {
        this.gameState = gameState;
    }

    public String getCurrentChance() {
        return currentChance;
    }

    public void setCurrentChance(String currentChance) {
        this.currentChance = currentChance;
    }
}
