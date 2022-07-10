import mongoose, { Connection } from 'mongoose'

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017', {
    dbName: 'Hotel',
    autoCreate: true,
    autoIndex: false
});

function dbConnectionLog(): void {
    const dbConnection: Connection = mongoose.connection;

    dbConnection.once("open", () => {
        console.log("[Log] Successfully connected to mongo database...")
    })

    dbConnection.on("error", () => {
        console.log("[Log] Error while connecting to database....")
    })

}

export {
    dbConnectionLog
}