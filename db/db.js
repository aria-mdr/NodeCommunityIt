const mongoose = require('mongoose'); // bring in mongoose code
let connection = undefined; // connection


/**
 * this function looks for an existing data base connection
 * if one is found, returns existing, if not creates a new connection and returns it
 * @returns 
 */
const getConnection = async () => {
    if(connection) {
        console.log('returning existing connection')
        return connection
    } else {
        console.log('creating new connection')
        connection = await mongoose.connect('mongodb+srv://comit:qNuhtBKAwzOchJGt@cluster0.fk2n5r2.mongodb.net/communityIt?retryWrites=true&w=majority')
        return connection;
    }
}

module.exports = {
    getConnection,
    mongoose, 
    Schema: mongoose.Schema
};