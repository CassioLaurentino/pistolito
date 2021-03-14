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

http.listen(3000, function(){
  console.log('listening on port 3000');
});

io.on("connection", (socket) => {
  console.log('connectou');
  socket.on("hello", function(msg){
    socket.emit("hello-return", msg);
  });

  socket.on("statusTs3", function(data){
    data = statusTs3()
    socket.emit("statusTs3", data)
  });

  // socket.on('statusReqTs3', function(data) {  
  //   socket.emit('statusResTs3', { hello: statusTs3() });
  // });
  
  // socket.on('statusReqTs3', function (data) {  
  //     startTs3();
  // });
  
  // socket.on('stopReqTs3', function (data) {  
  //     stopTs3();
  // });
});

function statusTs3() {
  shell.exec("ls")
}

// function statusTs3() {
//   shell.exec("./home/ec2-user/ts3/ts3server_startscript.sh status")
// }

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