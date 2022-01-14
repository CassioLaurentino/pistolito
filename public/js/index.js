const express = require("express");
const app = express();
var shell = require('shelljs');
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

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
  socket.once("statusTs3", function(data){
    data = statusTs3()
    socket.emit("statusTs3", data)
  });
  // socket.on("startTs3", function(data){
  //   data = startTs3()
  //   socket.emit("startTs3", data)
  // });
  // socket.on("stopTs3", function(data){
  //   data = stopTs3()
  //   socket.emit("stopTs3", data)
  // });

  //minecraft
  socket.once("statusMinecraft", function(data){
    data = statusMinecraft()
    socket.emit("statusMinecraft", data)
  });

  socket.once("startMinecraft", function(data){
    data = startMinecraft()
    socket.emit("startMinecraft", data)
  });
  
  socket.once("stopMinecraft", function(data){
    data = stopMinecraft()
    socket.emit("stopMinecraft", data)
  });
});

//ts3
function statusTs3() {
  return shell.exec("systemctl status ts3server | grep -o running")
}

function startTs3() {
  return shell.exec("systemctl status ts3server | grep -o running")
}

function stopTs3() {
  return shell.exec("systemctl status ts3server | grep -o running")
}

//minecraft
function statusMinecraft() {
  return shell.exec("ps aux | grep '[j]ava' | grep -o minecraft").trim() == "minecraft" ? "running" : "stopped";
}

function startMinecraft() {
  shell.cd('/home/pistolito/games/minecraft');
  shell.exec('nohup java -Xmx2048M -Xms2048M -jar minecraft_server.1.18.1.jar nogui &');
  shell.cd('/home/pistolito');
  return statusMinecraft();
}

function stopMinecraft() {
  return shell.exec("kill $(ps aux | grep '[j]ava' | awk '{print $2}')")
}