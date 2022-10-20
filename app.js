const express = require('express'); // brining express js code so that we can use it
const path = require('path'); // path is a built in library, gives functions that can work with file system
const bodyParser = require('body-parser'); // it parses the body of HTTP request to a JS object that we can use
const { engine } = require('express-handlebars'); // bring in handelbars function
const { getConnection } = require('./db/db'); // our data base driver
const userService = require('./users_module/service');


const app = express(); // creating an express app, an object that contains all of the express logic
const port = 3000; // port, hard coded number of the port we want express to look into


app.engine('handlebars', engine());
app.set('views', './views')
app.set('view engine', 'handlebars'); // tell express we want to use handelbars as our engine
// app.engine('handlebars', handlebars({
//     layoutsDir: __dirname + '/views/layouts',
// })); // set the templating engine to handelbars and tell handel bars where to find the templates/layouts

app.use(express.static(path.join(__dirname, './client/public'))) // for every request, include these static files in the response
app.use(bodyParser.json()) // we want to use body-parses as a middelware

/* defining routes */
app.get('/', (req, res) => {
    console.log('accessing route /, METHOD = GET');
    // __dirname, is a nodejs built in variable representing the current directory where code is ran
    res.sendFile(path.join(__dirname, '/client/index.html')); // responding to a request with a file
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
    // res.status, sets the status of the response
    // json will send json data as the response body
    res.status(200).json({
        message: "user created sucessfully"
    })
})

app.get('/user/:email', (req, res) => {
    const user = userService.getUser(req.params.email)
    res.render('profile', {
        layout: 'profile',
        name: user.name, 
        email: user.email,
        course: user.course,
        address: user.address,
        dob: user.dob,
        bio: user.bio,
    })
})


// telling express to start listening on the given port (first parameter), when its listening it will
// run the next call back
app.listen(port, async () => {
    console.log('Listening on port: ' + port);
    await getConnection()
    console.log('connected to DB')
})

// exporting app so vercel can access it
module.exports = app;