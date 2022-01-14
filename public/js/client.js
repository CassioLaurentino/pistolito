const socket = io("pistolito.com.br:8080");

$(document).ready(function stats() {
    connectAndEmit("statusTs3", "")
    connectAndEmit("statusMinecraft", "")

    socket.on("connect", () => {
        socket.on("statusTs3", function(data) {
            console.log("ts3 status : " + data)
            updateStatus("#ts3", data)
        });
        socket.on("statusMinecraft", function(data) {
            console.log("Minecraft status : " + data)
            updateStatus("#minecraft", data)
        });
    })

    $("#minecraft_start").on( "click", function() {
        console.log("ligando minecraft");
        connectAndEmit("startMinecraft", "")
            socket.on("startMinecraft", function(data) {
                console.log("startou? : " + data)
                // updateStatus("#minecraft", data)
            });
    });

    $("#minecraft_stop").on( "click", function() {
        console.log("desligando minecraft");
        connectAndEmit("stopMinecraft", "")
            socket.on("stopMinecraft", function(data) {
                console.log("desligou? : " + data)
                // updateStatus("#minecraft", data)
            });
    });
});

// $("#ts3_start").click(connectAndEmit("startTs3"));
// $("#ts3_stop").click(connectAndEmit("stopTs3"));

function connectAndEmit(trigger, arg) {
    socket.on("connect", () => {
        socket.emit(trigger, arg);
    })
}

function updateStatus(field, status) {
    if (status.trim() === "running") {
        $(field).text("Running").css('color', 'green');
        $(field + "_start").hide();
        $(field + "_stop").show();
    } else {
        $(field).text("Stopped").css('color', 'red');
        $(field + "_stop").hide();
        $(field + "_start").show();
    }
}