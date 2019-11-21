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
