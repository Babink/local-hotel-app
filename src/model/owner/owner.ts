import mongoose from 'mongoose';


const ownerSchema: any = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true
    },
    contactNumber: {
        type: String,
        required: true,
        trim: true
    },

    isMainOwner: {
        type: Boolean,
        required: true
    },

    password: {
        type: String,
        required: true,
        trim: true
    },

    // tokens: [{
    //     access: {
    //         type: String,
    //         required: true
    //     },
    //     token: {
    //         type: String,
    //         required: true
    //     }
    // }]
})


const ownerModel: any = mongoose.model('owner', ownerSchema);

export {
    ownerModel
}