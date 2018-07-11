const electron = require('electron');
const path = require('path');
const axios = require('axios');

const BrowserWindow = electron.remote.BrowserWindow;
const ipc = electron.ipcRenderer

const notifyBtn = document.getElementById('notifyBtn');

notifyBtn.addEventListener('click', function (event) {
    const modalPath = path.join('file://', __dirname, 'add.html');
    let win = new BrowserWindow({ 
        frame: false,
        alwaysOnTop: true,
        width: 400, 
        height: 200 
    });
    win.on('close', function () { win = null });
    win.loadURL(modalPath);    
    win.show();
});


var price = document.querySelector('h1')
var targetPrice = document.getElementById('targetPrice')

function getBTC() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=BRL')
    .then(res => {
        const cryptos = res.data.BTC.BRL
        price.innerHTML = 'R$ '+cryptos.toLocaleString('pt-BR')
    })
}
getBTC();
setInterval ( getBTC, 30000 );

var targetPriceVal;
var targetPrice = document.getElementById('targetPrice');

ipc.on('targetPriceVal', function (event, arg) {
    targetPriceVal = Number(arg);
    targetPrice.innerHTML = 'R$ '+targetPriceVal.toLocaleString('pt-BR')
});