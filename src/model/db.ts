import mongoose from 'mongoose'

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017', {
    dbName: 'Hotel',
    autoCreate: true,
    autoIndex: false
});


export default mongoose;