var current_state = undefined;
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
        current_state = resp.data;
        generate_board(current_state);
    } else if (resp.type == "valid_turn"){
        document.body.innerHTML = '';
        current_state = resp.data;
        generate_board(current_state);
    } else if (resp.type == "invalid_turn"){
        alert('bad');
    }
}

function get_piece_string(piece_code) {
    if (piece_code == '00'){
        return '';
    } else if (piece_code.charAt(1) == '1') {
        if ((piece_code.charAt(0) == '2')){
            return '♙';
        }
        return '♟';
    } else if (piece_code.charAt(1) == '2') {
        if ((piece_code.charAt(0) == '2')){
            return '♖';
        }
        return '♜';
    } else if (piece_code.charAt(1) == '3') {
        if ((piece_code.charAt(0) == '2')){
            return '♘';
        }
        return '♞';
    } else if (piece_code.charAt(1) == '4') {
        if (piece_code.charAt(0) == '2'){
            return '♗';
        }
        return '♝';
    } else if (piece_code.charAt(1) == '5') {
        if ((piece_code.charAt(0) == '2')){
            return '♕';
        }
        return '♛';
    } else {
        if ((piece_code.charAt(0) == '2')){
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
            div.style.cursor = 'pointer';
            div.addEventListener("click", function(event) {
                    select_piece(event.target);
            });

            document.getElementById("board").appendChild(div);
        }
    }
}

var selected_pieces = new Array();
function select_piece(element) {
    if (current_state != undefined) {
        row = element.id.charAt(0);
        column = element.id.charAt(1);
        console.log(current_state[row][column]);
        // case for second move
        if ((element.click_count == undefined) & (selected_pieces.length == 1)){
            element.click_count = 1;
            selected_pieces.push(element.id);
            socket.send(JSON.stringify(new Message('turn', selected_pieces)));
            element.click_count = 0;
            document.getElementById(selected_pieces[0]).click_count = 0;
            console.log(selected_pieces);
            selected_pieces = new Array();
        // case for unselect piece
        } else if ((element.click_count) == 1){
            element.click_count = undefined;
            selected_pieces.pop();
        // case for first move
        } else if ((selected_pieces.length == 0) & (current_state[row][column] != '00')){
            element.click_count = 1;
            selected_pieces.push(element.id);
        }
    }       
}