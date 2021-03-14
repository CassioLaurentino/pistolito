const socket = io("ws://localhost:3000");

$(document).ready(function stats() {
    connectAndEmit("hello", "teste")
    connectAndEmit("statusTs3", "")

    socket.on("connect", () => {
        socket.on("hello-return", function(msg) {
            console.log("retorno: " + msg)
        });

        socket.on("statusTs3", function(data) {
            console.log("ts3 status : " + data)
            updateStatus("#ts3_status" + data)
        });
    })

    // socket.emit('statusReqTs3');
    // socket.on('statusResTs3', function (data) {
    //     updateStatus('#ts3_status', data);
    // });
});

$("#ts3_start").click(connectAndEmit("startTs3", ""));
$("#ts3_stop").click(connectAndEmit("stopTs3", ""));

function connectAndEmit(trigger, arg) {
    socket.on("connect", () => {
        socket.emit(trigger, arg);
    })
}


function updateStatus(field, status) {
    if (status == "Server is running") {
        $(field).text("Running");
        $(ts3_start).toggle(true);
        $(ts3_stop).toggle(false);
    } else {
        $(field).text("Stopped");
        $(ts3_start).toggle(false);
        $(ts3_stop).toggle(true);
    }
}

// --------------

// mine
// alias start_mine='cd mine_server && nohup java -Xmx4096M -Xms4096M -jar server.jar nogui &'
// alias stop_mine='kill $(ps aux | grep "[j]ava" | awk "{print $2}")'
// alias check_mine='ps aux | grep "[j]ava"'