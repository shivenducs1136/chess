package io.github.shivenducs1136.chessbackend.model.roomModel;

public class LeaveResponse {
    private String content;

    public LeaveResponse(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
