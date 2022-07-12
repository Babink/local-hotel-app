import { IOwner } from '../interface/owner'
import { ownerModel } from '../model/owner/owner'
import { IServerRes } from '../interface/serverResponse'
import { IEncoder } from '../interface/encoder'
import { EncoderE } from '../interface/enum/encoder'


interface IOwnerService {
    owner: IOwner
    serverResponse?: IServerRes
    encoder?: IEncoder

    createNewOwner(): Promise<IServerRes>
    getAllOwners(): Promise<IServerRes>
    getSingleOwner(): Promise<IServerRes>
    deleteOwner(): Promise<IServerRes>
    updateOwner(): Promise<IServerRes>
}


class OwnerService implements IOwnerService {
    owner: IOwner
    serverResponse?: IServerRes;
    encoder?: IEncoder

    constructor(owner: IOwner) {
        this.owner = owner;
    }

    async createNewOwner(): Promise<IServerRes> {
        const {
            userName,
            isMainOwner,
            contactNumber,
            password
        } = this.owner;
        try {
            const docs = new ownerModel({
                userName,
                password,
                contactNumber,
                isMainOwner
            })


            const ownerResponse: any = await docs.save();
            // const tokenRespnse: any = await ownerResponse.generateToken();
            this.encoder = new IEncoder(EncoderE.owner, ownerResponse, EncoderE.obj);

            return this.serverResponse = {
                isFailed: false,
                isSuccess: true,
                statusCode: 201,
                messageTitle: `Created new owner`,
                messageDescription: `New owner: ${userName},  has been added to database`,
                _resource: this.encoder.runEncoder()
            }
        }
        catch (e: any) {
            return this.serverResponse = {
                isFailed: true,
                isSuccess: false,
                statusCode: 401,
                messageTitle: "Unable to create new owner",
                messageDescription: e.message
            };
        }
    }

    async getSingleOwner(): Promise<IServerRes> {
        try{
            const docs: any = await ownerModel.findOne({ _id: this.owner.id })
            this.encoder = new IEncoder(EncoderE.owner, docs, EncoderE.obj);

            return this.serverResponse = {
                isFailed: false,
                isSuccess: true,
                statusCode: 201,
                messageTitle: "Retrevied Successfully",
                messageDescription: `Owner: ${this.owner.userName} has been successfully retrieved`,
                _resource: this.encoder.runEncoder()
            }
        }

        catch(e: any){
            return this.serverResponse = {
                isFailed: true,
                isSuccess: false,
                statusCode: 401,
                messageTitle: "Unabble to retrieve new owner",
                messageDescription: e.message
            }
        }
    }


    async getAllOwners(): Promise<IServerRes> {
        try{
            const docs = await ownerModel.find();
            this.encoder = new IEncoder(EncoderE.owner, docs, EncoderE.arr);
            return this.serverResponse = {
                isFailed: false,
                isSuccess: true,
                statusCode: 201,
                messageTitle: "Retrevvied all owners",
                messageDescription: "SUccessfully retrieved all owner records",
                _resource: this.encoder.runEncoder()
            }
        }   
        catch(e: any){
            return this.serverResponse = {
                isFailed: true,
                isSuccess: false,
                statusCode: 401,
                messageDescription: e.message,
                messageTitle: "Failed to retrieve all owner records"
            }
        } 
    }


    async deleteOwner(): Promise<IServerRes> {
        try{
            const docs: any = await ownerModel.deleteOne({_id: this.owner.id});
            return this.serverResponse = {
                isFailed: false,
                isSuccess: true,
                statusCode: 201,
                messageTitle: "Successfully deleted owner record",
                messageDescription: `Owner: ${this.owner.userName} has been deleted from the server.`,
                _resource: docs
            };
        }
        catch(e: any){
            return this.serverResponse={
                isFailed: true,
                isSuccess: false,
                statusCode: 401,
                messageTitle: "Failed while updating owner records",
                messageDescription: e.message
            };
        }
    }


    // @Todo: Track which item was updated by owner and pass it to description
    async updateOwner(): Promise<IServerRes> {
        try{
            const docs: any = await ownerModel.updateOne({ _id: this.owner.id }, this.owner)
            return this.serverResponse = {
                isFailed: false,
                isSuccess: true,
                statusCode: 201,
                messageTitle: "Successfully updated owner record",
                messageDescription: `Owner: ${this.owner.userName}'s xyz field has been updated to server`,
                _resource: docs
            };
        }
        catch(e: any){
            return this.serverResponse={
                isFailed: true,
                isSuccess: false,
                statusCode: 401,
                messageTitle: "Failed while updating owner records",
                messageDescription: e.message
            };
        }
    }

    


}


export {
    OwnerService
}