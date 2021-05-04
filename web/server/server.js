
// Websocket 서버 구동을 위한 서버 코드입니다.

// 노드 로직 순서
// 1. WebSocket 서버, WebClient 통신 규약 정의
// 2. 포트번호 지정
// 3. 사용자의 메시지 수신시 WebClient로 메시지 전달
// 4. WebClient에서 메시지 수신시 사용자에게 메시지 전달

// const path = require('path');
const express = require('express');

// client 경로의 폴더를 지정해줍니다.
// const publicPath = path.join(__dirname, "/../client");
var app = express();
const fs = require('fs')

// app.use(express.static(publicPath));

// 로직 1. WebSocket 서버, WebClient 통신 규약 정의
const server = require('http').createServer(app);
const io = require('socket.io')(server)

// 로직 2. 포트번호 지정
// const port = process.env.port || 12001
const port = process.env.port || 12001


server.listen(port, () => {
    console.log(`listening on *:${port}`);
});

const roomName = 'team';


io.on('connection', socket => {
    socket.join(roomName);

    // 로직 3. 사용자의 메시지 수신시 WebClient로 메시지 전달
    // message = [month, day, hour, minute]
    socket.on('sendTime', (message) => {
        socket.to(roomName).emit('sendTimeToWeb', message);
    });
    // message = "weather"
    socket.on('sendWeather', (message) => {
        socket.to(roomName).emit('sendWeatherToWeb', message);
    });
    // message = temperature
    socket.on('sendTemperature', (message) => {
        socket.to(roomName).emit('sendTemperatureToWeb', message);
    });

    // message = { 'name' = [ [uid], 'net_state', 'obj_state', [iotX, iotY], [imgX, imgY] }
    socket.on('sendRegistedObj', (message) => {
        socket.to(roomName).emit('sendRegistedObjToWeb', message);
    });
    
    // message = { 'name' = [ [uid], 'net_state', 'obj_state', [iotX, iotY], [imgX, imgY] }
    socket.on('sendRegScannedObj', (message) => {
        socket.to(roomName).emit('sendRegScannedObjToWeb', message);
    });
    // message = { 'uid' = [ 'uid', 'net_state', 'obj_state' ] }
    socket.on('sendNewScannedObj', (message) => {
        socket.to(roomName).emit('sendNewScannedObjToWeb', message);
    });
    // message = [x, y] 
    socket.on('sendRocation', (data) => {
        console.log('sendRocationToWeb')
        socket.to(roomName).emit('sendRocationToWeb', data);
    })

    // message = True / False
    socket.on('sendSecurityStatus', (data) => {
        console.log('sendSecurityStatusToWeb')
        socket.to(roomName).emit('sendSecurityStatusToWeb', data)
    })

    // message = ["imgStr"]
    socket.on('sendThief', (data) => {
        console.log(data)
        const stringToList = data.split(" ");
        console.log(stringToList)
        socket.to(roomName).emit('sendThiefToWeb', stringToList);
    })



    // 로직 4. WebClient에서 메시지 수신시 사용자에게 메시지 전달
    //data = ""
    socket.on('sendStateRefreshToServer', (data) => {
        console.log('sendStateRefresh')
        socket.to(roomName).emit('sendStateRefresh', data);
    });

    //data = ""
    socket.on('sendScanOnToServer', (data) => {
        console.log('sendScanOn')
        socket.to(roomName).emit('sendScanOn', data);
    });
    //data = ""
    socket.on('sendScanOffToServer', (data) => {
        console.log('sendScanOff')
        socket.to(roomName).emit('sendScanOff', data);
    });
    
    //data = ""
    socket.on('sendGetRegObjToServer', (data) => {
        console.log('sendGetRegObj')
        socket.to(roomName).emit('sendGetRegObj', data);
    });

    //data = "name"
    socket.on('sendObjOnToServer', (data) => {
        console.log('sendObjOn')
        socket.to(roomName).emit('sendObjOn', data);
    });
    //data = "name"
    socket.on('sendObjOffToServer', (data) => {
        console.log('sendObjOff')
        socket.to(roomName).emit('sendObjOff', data);
    });

    //data = [uid, name, net_status, dev_status, [imgX, imgY]]
    socket.on('sendRegistObjToServer', (data) => {
        console.log('sendRegistObj')
        socket.to(roomName).emit('sendRegistObj', data);
    });
    //data = "name"
    socket.on('sendRemoveObjToServer', (data) => {
        console.log('sendRemoveObj')
        socket.to(roomName).emit('sendRemoveObj', data);
    });

    //data = ""
    socket.on('sendGetRocationToServer', (data) => {
        console.log('sendGetRocation')
        socket.to(roomName).emit('sendGetRocation', data);
    })

    //data = ""
    socket.on('sendSecurityModeOnToServer', (data) => {
        console.log('sendSecurityModeOn')
        socket.to(roomName).emit('sendSecurityModeOn', data);
    })

    //data = ""
    socket.on('sendSecurityModeOffToServer', (data) => {
        console.log('sendSecurityModeOff')
        socket.to(roomName).emit('sendSecurityModeOff', data);
    })

    //data = ""
    socket.on('sendGetSecurityStatusToServer', (data) => {
        console.log('sendGetSecurityStatus')
        socket.to(roomName).emit('sendGetSecurityStatus', data);
    })
    
    //data = ""
    socket.on('sendGetThiefToServer', (data) => {
        console.log('sendGetThief')
        socket.to(roomName).emit('sendGetThief', data);
    })

    socket.on('disconnect', () => {
        console.log('disconnected from server');
    });

});