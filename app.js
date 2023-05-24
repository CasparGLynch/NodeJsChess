var express = require("express");
var http = require("http");
const websocket = require("ws");
const Game = require("./calculations");

var app = express();
var port = process.argv[2];
app.use(express.static(__dirname + "/public"));
http.createServer(app).listen(port);

app.get("/", function (req, res) {
    res.sendFile("menu.html", { root: "./public"});
});

app.get("/game", function (req, res) {
    res.sendFile("game.html", { root: "./public"});
});
module.exports = app
const server = http.createServer(app);
const wss = new websocket.Server({ server });

// count the number of games
var game_number = 0;


wss.on("connection", function (ws) {
    let game_id = null;
    ws.on("message", function incoming(message) {
        message = JSON.parse(message);
        if (message.type == "start") {
            // start game and assign a game id (NOTE: game_id generation needs updating)
            game_id = game_number;
            game_number++;
            ws.game = new Game(game_id)
        }
        let mess = new Message("initial", ws.game.board);
        sendActive(wss, websocket, mess);
    });
    ws.on("close", function incoming() {
        game_number--;
    });
});
    function sendActive(wss, WebSocket, data) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data));
            }
        });
    }
    function Message(type, data) {
        this.type = type;
        this.data = data;
    }
    server.listen(3001);

