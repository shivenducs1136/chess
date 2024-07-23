package io.github.shivenducs1136.chessbackend.model.roomModel;

public class JoinResponse {
    private String content;
    private String roomId;
    private String playerColor;

    public String getPlayerColor() {
        return playerColor;
    }

    public void setPlayerColor(String playerColor) {
        this.playerColor = playerColor;
    }

    public JoinResponse(String roomId,String playerColor) {
        this.roomId = roomId;
        this.playerColor = playerColor;
    }

    public String getRoomId() {
        return roomId;
    }

    public void setRoomId(String roomId) {
        this.roomId = roomId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
