const express = require("express");
const http = require("http");
const path = require("path");
const socketIo = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
io.on("connection", (socket) => {
    socket.on('send-location', (data) => {
        io.emit("receive-location", { id: socket.id, ...data });
    });
    console.log('user connected');
    socket.on('disconnect', () => {
        io.emit("user-disconnected", socket.id);
    });
});

app.get("/", function (req, res) {
    res.render("index");
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
