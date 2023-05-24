// function Message(type,data){
//     this.type = type;
//     this.data = data;
// }

// const socket = new WebSocket("ws://localhost:3001");
// socket.onopen = function(e) {
//     socket.send(JSON.stringify(new Message('start', 0)));
// };
// socket.onclose = function(event){
//     window.location.replace("/");
// };
// socket.onmessage = function(event){

// }


// generate initialia board 
window.onload = (function () {
    for (let row = 0; row < 8; row++){
        for (let column = 0; column < 8; column++){
            let div = document.createElement("div");
            if ((row + column) % 2 == 0) {
                div.className = "tile-black";
            } else {
                div.className = "tile-white";
            }
            div.style.gridColumn = 
            document.getElementById("board").appendChild(div);
        }
    }
})
