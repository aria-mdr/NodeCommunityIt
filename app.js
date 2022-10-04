const express = require('express');
const path = require('path');
const app = express();
const port = 3000

app.use(express.static(path.join(__dirname, './client/public')))


app.get('/', (req, res) => {
    console.log('accessing route /, METHOD = GET');
    res.sendFile(path.join(__dirname, '/client/index.html'));
})

app.get('/login', (req, res) => {
    console.log('accessing route /login, METHOD = GET');
    res.sendFile(path.join(__dirname, '/client/login.html'));
})


app.listen(port, () => {
    console.log('Listening on port: ' + port);
})

// exporting app so vercel can access it
module.exports = app;