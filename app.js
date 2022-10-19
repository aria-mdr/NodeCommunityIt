const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const {getConnection} = require('./db/mongoose');
const userService = require('./users_module/service')
const port = 3000

app.use(express.static(path.join(__dirname, './client/public')))
app.use(bodyParser.json())
app.get('/', (req, res) => {
    console.log('accessing route /, METHOD = GET');
    res.sendFile(path.join(__dirname, '/client/index.html'));
})

app.get('/login', (req, res) => {
    console.log('accessing route /login, METHOD = GET');
    res.sendFile(path.join(__dirname, '/client/login.html'));
})

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/signup.html'))
})

app.post('/signup', async (req, res) => {
    console.log(req.body)
    try {
        await userService.storeUser(req.body)
    } catch(err) {
        res.status(400).json({
            error: err
        })
        return
    }
    res.status(200).json({
        message: "user created sucessfully"
    })
})

app.listen(port, async () => {
    console.log('Listening on port: ' + port);
    await getConnection()
    console.log('connected to DB')
})

// exporting app so vercel can access it
module.exports = app;