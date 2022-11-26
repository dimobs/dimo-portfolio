const mongoose = require('mongoose');
require('../models/Users')
require('../models/Pay');
// require('../models/Trip');


const dbName = 'potfolio'
const connectionString = `mongodb://localhost:27017/${dbName}`;

module.exports = async(app) =>{
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // autoIndex: false
        });
        console.log('Database connected');

        mongoose.connection.on('error', (err) => {
            console.error('Database error');
            console.error(err);
        });
    } catch (err) {
        console.error('Error connecting to database');
        process.exit(1); //0 - Приложението е завършили успешно, 1 - има проблем
    }
};