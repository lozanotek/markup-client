const messageUrl = "https://markupsync.signalr.app/messages"

const messageConnection = new signalR.HubConnectionBuilder()
    .withUrl("https://markupsync.signalr.app/message",
    {
        logger: signalR.LogLevel.Verbose
    })
    .build();

messageConnection.start().catch(function(err){ 
    console.error(err.toString()) 
});

messageConnection.onclose(function () {
    reconnect();
});

function reconnect() {
    try {
        messageConnection.start().catch(function(err){ 
            console.error(err.toString()) 
        });
    } catch (err) {
        console.log(err);
        setTimeout(start(), 5000);
    }
};

$.getJSON(messageUrl, function (data) {
    if (data === null) {
        return;
    }

    setMessage(data);
});

function setMessage(playerMessage) {
    $("#message").html(playerMessage.content);
};

messageConnection.on("syncMessage", function(sync) {
    setMessage(sync);
});
