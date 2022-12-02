const jwt = require('jsonwebtoken');
const { getUserById } = require("./service");
const SECRECT_KEY = "SECRECT_KEY"

// authentication - send to login page
const auth = async (req, res, next) => {
    const cookies = req.cookies // read the cookies
        try {
            const verfied = await jwt.verify(cookies.token, SECRECT_KEY) // verify token was created by us
            if(verfied && verfied.userId) { // make sure there is a user id embedded in the token 
                req.userId = verfied.userId // add user id to request object so controll doesnt need to deal with the cookie any more
                next() // call the next call back function
            } else {
                throw "invalid user"
            }
        } catch (error) {
            // if jwt throws error when verfying token, send to login
            res.status(401).redirect('/login')
            res.end()
            return;
        }

}

// authorization - send to home page
const adminGaurd = async (req, res, next) => {
    try {
        if(!req.userId) {
            throw "User needs to be logged in"
        }

        const user = await getUserById(req.userId)

        if(!user) {
            throw "User not found"
        }

        if(user.userType === 0) {
            next()
        } else {
            throw "User not authorized"
        }
    } catch (error) {
        console.log(error)
        res.status(401).redirect('/')
        res.end()
        return;
    }

}



module.exports = {
    auth, 
    adminGaurd,
    SECRECT_KEY,
}