import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { IOwner, IOwnerToken } from '../../interface/owner';


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

    tokens: [{
        accessToken: {
            type: String,
            required: true
        },
        refreshToken: {
            type: String,
            required: true
        }
    }]
})

ownerSchema.methods.generateToken = async function(){
    console.log("[LOG] Generating tokens...")
    const owner: any = this;
    const access: string = "auth";
    const token: string = jwt.sign({
        _id: owner.id,
        access
    }, 'salt').toString();

    const itoken: IOwnerToken = {
        accessToken: access,
        refreshToken: token
    }

    owner.tokens.push(itoken);
    const docs: any = await owner.save();
    return docs;
}



const ownerModel: any = mongoose.model('owner', ownerSchema);

export {
    ownerModel
}