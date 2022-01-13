const socket = io("pistolito.com.br:8080");

$(document).ready(function stats() {
    connectAndEmit("statusTs3", "")

    socket.on("connect", () => {
        socket.on("statusTs3", function(data) {
            console.log("ts3 status : " + data)
            updateStatus("#ts3_status", data)
        });
    })
});

$("#ts3_start").click(connectAndEmit("startTs3", ""));
$("#ts3_stop").click(connectAndEmit("stopTs3", ""));

function connectAndEmit(trigger, arg) {
    socket.on("connect", () => {
        socket.emit(trigger, arg);
    })
}

function updateStatus(field, status) {
    if (status.trim() === "running") {
        $(field).text("Running").css('color', 'green');
        $(ts3_start).toggle(false);
        $(ts3_stop).toggle(true);
    } else {
        $(field).text("Stopped").css('color', 'red');
        $(ts3_stop).toggle(false);
        $(ts3_start).toggle(true);
    }
}

// --------------

// mine
// alias start_mine='cd mine_server && nohup java -Xmx4096M -Xms4096M -jar server.jar nogui &'
// alias stop_mine='kill $(ps aux | grep "[j]ava" | awk "{print $2}")'
// alias check_mine='ps aux | grep "[j]ava"'