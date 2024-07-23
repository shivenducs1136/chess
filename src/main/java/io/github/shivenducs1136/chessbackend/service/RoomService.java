package io.github.shivenducs1136.chessbackend.service;

import ch.qos.logback.core.joran.sanity.Pair;
import lombok.Getter;
import org.slf4j.event.KeyValuePair;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class RoomService {

    @Getter
    private final Map<String, Set<String>> rooms = new ConcurrentHashMap<>();
    private int roomId = 0;
    public List<String> addConnectionToRoom(String sessionId) {
        rooms.computeIfAbsent("room"+roomId, k -> ConcurrentHashMap.newKeySet());

        if (rooms.get("room"+roomId).size() < 2) {
            List<String> list = new ArrayList<>();
            list.add("room"+roomId);
            if(rooms.get("room"+roomId).size() == 1){
                list.add("black");
            }
            else{
                list.add("white");
            }
            rooms.get("room"+roomId).add(sessionId);
            return list;
        } else {
            roomId++;
            return addConnectionToRoom(sessionId);
        }
    }

    public void removeConnectionFromRoom(String roomId, String sessionId) {
        Set<String> connections = rooms.get(roomId);
        if (connections != null) {
            connections.remove(sessionId);
            if (connections.isEmpty()) {
                rooms.remove(roomId);
            }
        }
    }

    public Set<String> getConnectionsInRoom(String roomId) {
        return rooms.get(roomId);
    }
    public boolean isRoomFull(String roomId){
        if(rooms.containsKey(roomId)){
            if(rooms.get(roomId).size()==2){
                return true;
            }
            else{
                return false;
            }
        }
        else{
            return false;
        }
    }
}
