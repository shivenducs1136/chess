package io.github.shivenducs1136.chessbackend.controller;

import io.github.shivenducs1136.chessbackend.model.roomModel.JoinResponse;
import io.github.shivenducs1136.chessbackend.model.roomModel.LeaveMessage;
import io.github.shivenducs1136.chessbackend.model.roomModel.LeaveResponse;
import io.github.shivenducs1136.chessbackend.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class WebSocketRoomController {

    @Autowired
    private RoomService roomService;

    @Autowired
    private SimpMessageSendingOperations messagingTemplate;

    @MessageMapping("/join")
    @SendToUser(destinations = "/topic/join",broadcast = false)
    public JoinResponse joinRoom(SimpMessageHeaderAccessor headerAccessor) {
        String sessionId = headerAccessor.getSessionId();
        List<String> data = roomService.addConnectionToRoom(sessionId);
        return new JoinResponse(data.get(0), data.get(1));
    }

    @MessageMapping("/room/{roomId}")
    @SendTo("/topic/room/{roomId}")
    public String isRoomFull(@DestinationVariable String roomId) {
        if(roomService.isRoomFull(roomId)){
            return "true";
        }
        return "false";
    }

    @MessageMapping("/leave")
    public void leaveRoom(LeaveMessage message, SimpMessageHeaderAccessor headerAccessor) {
        String sessionId = headerAccessor.getSessionId();
        roomService.removeConnectionFromRoom(message.getRoomId(), sessionId);
        messagingTemplate.convertAndSend("/topic/leave/"+message.getRoomId(), new LeaveResponse("Left room: " + message.getRoomId()));
    }
}