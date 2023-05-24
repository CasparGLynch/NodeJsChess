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
        this.board[0][0] = 12;
        this.board[0][1] = 13;
        this.board[0][2] = 14;
        this.board[0][3] = 15;
        this.board[0][4] = 16;
        this.board[0][5] = 14;
        this.board[0][6] = 13;
        this.board[0][7] = 12;

        // initialise last row
        this.board[7][0] = 22;
        this.board[7][1] = 23;
        this.board[7][2] = 24;
        this.board[7][3] = 25;
        this.board[7][4] = 26;
        this.board[7][5] = 24;
        this.board[7][6] = 23;
        this.board[7][7] = 22;

        // initalise second row
        for (let i = 0; i < 8; i++){
            this.board[1][i] = 11;
        }
        // initalise second to last row
        for (let i = 0; i < 8; i++){
            this.board[6][i] = 21;
        }
        //initialise middle lines
        for (let row = 2; row < 6; row++){
            for (let column = 0; column < 8; column++){
                this.board[row][column] = 0
            }
        }
        console.log(this.board)
    }
}

module.exports = Game
