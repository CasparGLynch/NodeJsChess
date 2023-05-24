// socket stuff
function Message(type,data){
    this.type = type;
    this.data = data;
}
const socket = new WebSocket("ws://localhost:3001");
socket.onopen = function(e) {
    socket.send(JSON.stringify(new Message("connected",0)));
};
socket.onclose = function(event){
    window.location.replace("/");
};
socket.onmessage = function(event){
        
}

// start game button
function start_game() {
    window.location.replace("/game");
}