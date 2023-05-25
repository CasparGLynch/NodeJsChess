function Message(type,data){
    this.type = type;
    this.data = data;
}

const socket = new WebSocket("ws://localhost:3001");
socket.onopen = function(e) {
    socket.send(JSON.stringify(new Message('start', 0)));
};
socket.onclose = function(event){
    window.location.replace("/");
};
socket.onmessage = function(event){
    let resp = JSON.parse(event.data);
    if (resp.type == "initial"){
        var current_state = resp.data;
        generate_board(current_state);
    }
}

function get_piece_string(piece_code) {
    if (piece_code == 0){
        return '';
    } else if ((piece_code % 10) == 1) {
        if ((piece_code > 20)){
            return '♙';
        }
        return '♟';
    } else if ((piece_code % 10) == 2) {
        if ((piece_code > 20)){
            return '♖';
        }
        return '♜';
    } else if ((piece_code % 10) == 3) {
        if ((piece_code > 20)){
            return '♘';
        }
        return '♞';
    } else if ((piece_code % 10) == 4) {
        if ((piece_code > 20)){
            return '♗';
        }
        return '♝';
    } else if ((piece_code % 10) == 5) {
        if ((piece_code > 20)){
            return '♕';
        }
        return '♛';
    } else {
        if ((piece_code > 20)){
            return '♔';
        }
        return '♚';
    } 
}

function generate_board(current_state){
    for (let row = 0; row < 8; row++){
        for (let column = 0; column < 8; column++){
            let div = document.createElement("div");
            if ((row + column) % 2 == 0) {
                div.className = "tile-white";
            } else {
                div.className = "tile-black";
            }
            div.id = String(row) + String(column);
            /**
             * Piece codes found in src/calculations.js
             */
            piece_str = get_piece_string(current_state[row][column]);
            div.textContent = piece_str;
            if (piece_str != ''){
                div.style.cursor = 'pointer';
            }

            document.getElementById("board").appendChild(div);
        }
    }
}
