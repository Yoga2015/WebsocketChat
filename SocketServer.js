const WebSocket  = require('ws');

const wss = new WebSocket.Server({ port: 9527 });

wss.on('connection', function connection(ws) {    //ws 指客户端

    ws.on('open',function open(){   //当有人连上来，就可以调用open，
        console.log("connectd")   //先在后台输出connectd
        ws.send('wellcome')     //给客户端发送信息，回应他
    })

    ws.on('message', function incoming(data,isBinary) {    //只要有人给我发信息，我就广播
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
            client.send(data, { binary: isBinary });
            }
        });
    });

});

wss.on('close',function close(){
    console.log("disconnected")
})