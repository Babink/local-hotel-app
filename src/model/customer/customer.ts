import mongoose from 'mongoose'

const CustomerSchema: any = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },

    lastName: {
        type: String,
        required: true,
        trim: true
    },

    permanentAddress: {
        type: String,
        required: false
    },

    temporaryAddress: {
        type: String,
        required: false
    },

    contactNumber: {
        type: String,
        required: false,
        trim: true
    }
})


const customerModel: any = mongoose.model('customer', CustomerSchema);

export {
    customerModel
}