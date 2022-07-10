import { ICustomer } from '../interface/customer'
import { IServerRes } from '../interface/serverResponse'
import { customerModel } from '../model/customer/customer'
import { Model } from 'mongoose'
import { IEncoder } from '../interface/encoder'
import { EncoderE } from '../interface/enum/encoder'

class CustomerService{
    encoder?: IEncoder

    customer: ICustomer;
    serverResponse: IServerRes = {
        isSuccess: false,
        isFailed: false,
        statusCode: 0,
        messageTitle: "",
        messageDescription: ""
    };


    constructor(customer: ICustomer){
        this.customer = customer;
    }


    async addCustomerToDB(): Promise<IServerRes>{
        // let encoder: IEncoder;
        const { 
            firstName,
            lastName,
            permanentAddress,
            temporaryAddress,
            contactNumber
         } = this.customer;
         

         try{
            const docs: any = new customerModel({
                firstName,
                lastName,
                permanentAddress,
                temporaryAddress,
                contactNumber
            })

            const customerResponse = await docs.save();
            this.encoder = new IEncoder(EncoderE.customer, customerResponse, 'object');

            return this.serverResponse = {
                isSuccess: true,
                isFailed: false,
                statusCode: 201,
                messageTitle: `Added New Customer --> ${firstName}}`,
                messageDescription: 'Successfully saved customer information in database.',
                _resource: this.encoder.runEncoder()
            }


         }
         catch(e: any){
            return this.serverResponse = {
                isFailed: true,
                statusCode: 401,
                messageTitle: `Failed while adding customer Mr.${lastName}`,
                messageDescription: e.message,
                isSuccess: false
            }
         }
    }


    async getAllCustomer(): Promise<IServerRes>{
        try{
            const customerDocs: any = await customerModel.find();
            this.encoder = new IEncoder(EncoderE.customer, customerDocs, 'array');
            
            return customerDocs ? 
                this.serverResponse = {
                    isFailed: false,
                    isSuccess: true,
                    statusCode: 200,
                    messageTitle: "Successfully retrieved customer records",
                    messageDescription: "xxxxx",
                    _resource: this.encoder.runEncoder()
                } : this.serverResponse = {
                    isFailed: true,
                    isSuccess: true,
                    statusCode: 200,
                    messageTitle: "Failed to retreived customer records",
                    messageDescription: "Server responded with no collection in database."    
                }
        }
        catch(e: any){
            return this.serverResponse = {
                isFailed: true,
                isSuccess: false,
                statusCode: 401,
                messageTitle: `Unable to access customer collection from database`,
                messageDescription: e.message
            }
        }
    }

}


export {
    CustomerService
}