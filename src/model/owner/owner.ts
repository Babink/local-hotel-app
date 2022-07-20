import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { IOwner, IOwnerToken } from '../../interface/owner';
import * as bcrypt from 'bcrypt';


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

ownerSchema.methods.generateToken = async function () {
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


// this function is not defined properly, and isn't tested too
// so it will throw few errors probably
ownerSchema.statics.verfiyOwner = async function (userName: string, password: string) {
    const owner = this;

    return owner.findOne({
        userName
    })
        .then((own: any) => {
            if (!own) {
                // when unable to find user
                return Promise.reject()
            }

            // when user is found
            return new Promise((resolve: any, reject: any) => {
                bcrypt.compare(
                    password,
                    own.password,
                    (err: any, res: boolean) => {
                        if(res) resolve(own)
                        else reject();
                        
                    })
            })
        })
}


ownerSchema.pre('save', async function (this: any, next: any) {
    let owner: any = this;

    if (owner.isModified('password')) {
        const res: any = await bcrypt.hash(owner.password, 10);
        owner.password = res;

        next();
    }
    else {
        console.log("[Log] Unable to hash password!!!");
        next();
    }
})


const ownerModel: any = mongoose.model('owner', ownerSchema);

export {
    ownerModel
}