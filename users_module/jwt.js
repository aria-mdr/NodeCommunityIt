const jwt = require('jsonwebtoken');
const SECRECT_KEY = "SECRECT_KEY"

const createToken = async (userId) => {
    return await jwt.sign(
                {userId: userId},
                SECRECT_KEY,
                { expiresIn: "1h" }
            )
}

module.exports = {
    createToken
}