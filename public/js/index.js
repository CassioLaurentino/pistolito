const express = require("express");
const app = express();
var shell = require('shelljs');
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

// var io = require("socket.io")(http, {
//   path: "public/socket.io-client/",
//   cors: {
//     methods: ["GET", "POST"]
//   }
// });

app.use(express.static("public"));

app.get('/', (req, res) => {
  res.sendFile(path.resolve('public/html/index.html'));
});

app.get('/servers', (req, res) => {
  res.sendFile(path.resolve('public/html/servers.html'));
});

http.listen(8080, function(){
  console.log('listening on port 8080');
});

io.on("connection", (socket) => {
  socket.on("statusTs3", function(data){
    data = statusTs3()
    socket.emit("statusTs3", data)
  });
});

function statusTs3() {
  return shell.exec("systemctl status ts3server | grep -o running")
}

// function statusTs3() {
//   shell.exec("./home/ec2-user/ts3/ts3server_startscript.sh status")
// }

function startTs3() {
  shell.exec("ip a")
}

// function startTs3() {
//   shell.exec("./home/ec2-user/ts3/ts3server_startscript.sh start")
// }

// function stopTs3() {
//   shell.exec("./home/ec2-user/ts3/ts3server_startscript.sh stop")
// }

// --------------

// mine
// alias start_mine='cd mine_server && nohup java -Xmx4096M -Xms4096M -jar server.jar nogui &'
// alias stop_mine='kill $(ps aux | grep "[j]ava" | awk "{print $2}")'
// alias check_mine='ps aux | grep "[j]ava"'