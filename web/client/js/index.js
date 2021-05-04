

// WebClient에서 WebSocket 서버로 통신을 연결하고 서버에서 온 데이터를 웹페이지에 보여줄 수 있도록 해주는 노드입니다.

// 노드 로직 순서
// 1. 서버에서 온 메시지를 웹페이지에 전달
// 2. 버튼 클릭시 호출되는 함수



const socket = io();


socket.on('disconnect', function()  {
    console.log('disconnected form server_client.');
});


// 로직 1. 서버에서 온 메시지를 웹페이지에 전달
socket.on('sendTimeToWeb', function(message) {
    console.log('sendTimeToWeb', message);
    document.querySelector('#tAreaTime').value = message;
});

socket.on('sendWeatherToWeb', function(message) {
    console.log('sendWeatherToWeb', message);
    document.querySelector('#tAreaWeather').value = message;
});

socket.on('sendTemperatureToWeb', function(message) {
    console.log('sendTemperatureToWeb', message);
    document.querySelector('#tAreaTemp').value = message;
});

socket.on('sendAirConditionerToWeb', function(message) {
    console.log('sendAirConditionerToWeb', message);
    document.querySelector('#tAreaAircon').value = message;
});


// 로직 2. 버튼 클릭시 호출되는 함수
function btn_click_on() {

    console.log('btn_click_on');

    let data = { "key" : 1};

    socket.emit('sendAirConOnToServer', data);
};

function btn_click_off() {

    console.log('btn_click_off');

    let data = { "key" : 2};

    socket.emit('sendAirConOffToServer', data);
};

function light_btn_click(num) {

    console.log('light_btn_click', num);

    let data = { "key" : 3};

    socket.emit('sendLightOnToServer', data);
};

function airPurifier_btn_click(num) {

    console.log('airPurifier_btn_click', num);

    let data = { "key" : 4};

    socket.emit('sendAirPurifierOnToServer', data);
};

function blind_btn_click(num) {

    console.log('blind_btn_click', num);

    let data = { "key" : 5};

    socket.emit('sendBlindOnToServer', data);
};