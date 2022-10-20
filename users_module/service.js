const userModel = require('./model.js')

const storeUser = async (userData) => {
    const user = new userModel(userData)
    try {
        await user.save()
    } catch(err) {
        throw 'failed to create user, please check your input'
    }
}

const getUser = async (email) => {
    try {
        const user = userModel.findOne({
            email: email
        })
        return user
    } catch (error) {
        throw 'unable to find user'
    }

}
module.exports = {
    storeUser,
    getUser
}