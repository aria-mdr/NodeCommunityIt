const mongoose = require('mongoose');
let connection = undefined;

const getConnection = async () => {
    if(connection) {
        console.log('returning existing connection')
        return connection
    } else {
        console.log('creating new connection')
        connection = await mongoose.connect('mongodb+srv://comit:qNuhtBKAwzOchJGt@cluster0.fk2n5r2.mongodb.net/?retryWrites=true&w=majority')
        return connection;
    }
}

module.exports = {
    getConnection,
    mongoose, 
    Schema: mongoose.Schema
};