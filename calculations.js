/**
 * definitions: 
 *  - Empty = 0
 *  - Pawn = 1
 *  - Rook = 2
 *  - Knight = 3
 *  - Bishop = 4
 *  - Queen = 5
 *  - King = 6
 * 
 * color placed at front of the piece:
 *  - 1 = Black
 *  - 2 = White 
 */
var alphabet = "abcdefgh";
class Game {
    constructor(game_id) {
        this.game_id = game_id;
        // initialise 8 by 8 array
        this.board = new Array(8)
        this.board[0] = new Array(8)
        this.board[1] = new Array(8)
        this.board[2] = new Array(8)
        this.board[3] = new Array(8)
        this.board[4] = new Array(8)
        this.board[5] = new Array(8)
        this.board[6] = new Array(8)
        this.board[7] = new Array(8)

        // initialise first row 
        this.board[0][0] = '12';
        this.board[0][1] = '13';
        this.board[0][2] = '14';
        this.board[0][3] = '15';
        this.board[0][4] = '16';
        this.board[0][5] = '14';
        this.board[0][6] = '13';
        this.board[0][7] = '12';

        // initialise last row
        this.board[7][0] = '22';
        this.board[7][1] = '23';
        this.board[7][2] = '24';
        this.board[7][3] = '25';
        this.board[7][4] = '26';
        this.board[7][5] = '24';
        this.board[7][6] = '23';
        this.board[7][7] = '22';

        // initalise second row
        for (let i = 0; i < 8; i++){
            this.board[1][i] = '11';
        }
        // initalise second to last row
        for (let i = 0; i < 8; i++){
            this.board[6][i] = '21';
        }
        //initialise middle lines
        for (let row = 2; row < 6; row++){
            for (let column = 0; column < 8; column++){
                this.board[row][column] = '00'
            }
        }
        this.game_state = [];
    }
    
    move(code) {
        let initial_row = code[0].charAt(0);
        let initial_column = code[0].charAt(1);
        let later_row = code[1].charAt(0);
        let later_column = code[1].charAt(1);

        let move = this.to_pgn(code[1], code[0]);
        this.game_state.push(move);
        this.board[later_row][later_column] = this.board[initial_row][initial_column];
        console.log(this.game_state);
        this.board[initial_row][initial_column] = '00';
    }

    to_pgn(move_code, piece_position) {
        let row = move_code.charAt(0);
        let column = move_code.charAt(1);
        let piece_row = piece_position.charAt(0);
        let piece_column = piece_position.charAt(1);
        let piece_code = this.board[piece_row][piece_column].charAt(1);
        // first get the type of piece
        let type_piece = null;
        if (piece_code == '1') {
            type_piece = '';
        } else if (piece_code == '2') {
            type_piece = 'R';
        } else if (piece_code == '3') {
            type_piece = 'N';
        } else if (piece_code == '4') {
            type_piece = 'B';
        } else if (piece_code == '5') {
            type_piece = 'Q';
        } else {
            type_piece = 'K';
        }
        // get the position
        let position = alphabet.charAt(column) + (8 - row);
        return type_piece + position;
    }
}


function to_position_code(pgn) {

}

module.exports = Game
