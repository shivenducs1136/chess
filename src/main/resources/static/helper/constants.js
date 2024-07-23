const ROOT_DIV = document.getElementById("root");
const socket = new SockJS('/ws');
const stompClient = Stomp.over(socket);
export{ROOT_DIV,stompClient};