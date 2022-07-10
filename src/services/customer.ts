import { ICustomer } from '../interface/customer'
import { IServerRes } from '../interface/serverResponse'
import { customerModel } from '../model/customer/customer'
import { isValidObjectId } from 'mongoose'
import { IEncoder } from '../interface/encoder'
import { EncoderE } from '../interface/enum/encoder'


interface ICustomerService {
    encoder?: IEncoder
    customer: ICustomer
    serverResponse: IServerRes

    addCustomerToDB(): Promise<IServerRes>
    getAllCustomer(): Promise<IServerRes>
    deleteCustomer(): Promise<IServerRes>
    updateCustomer(): Promise<IServerRes>
    getACustomer(): Promise<IServerRes>
}

class CustomerService implements ICustomerService {

    encoder?: IEncoder
    customer: ICustomer;
    serverResponse: IServerRes = {
        isSuccess: false,
        isFailed: false,
        statusCode: 0,
        messageTitle: "",
        messageDescription: ""
    };


    constructor(customer: ICustomer) {
        this.customer = customer;
    }


    async getACustomer(): Promise<IServerRes> {
        if (this.customer.id) {
            try {
                const docs = await customerModel.findOne({ _id: this.customer.id })
                this.encoder = new IEncoder(EncoderE.customer, docs, 'object');

                return this.serverResponse = {
                    _resource: this.encoder.runEncoder(),
                    isFailed: false,
                    isSuccess: true,
                    statusCode: 200,
                    messageTitle: "Successfully got customer record",
                    messageDescription: `Record of: ${this.customer.firstName} has been successfully fetched from database`
                }
            }
            catch (e: any) {
                return this.serverResponse = {
                    isFailed: true,
                    isSuccess: false,
                    statusCode: 401,
                    messageDescription: e.message,
                    messageTitle: "Unable to find customer"
                }
            }
        }
        else{
            return this.serverResponse = {
                isFailed: true,
                isSuccess: false,
                statusCode: 401,
                messageTitle: "Invalid ID",
                messageDescription: "Please provide relevant ID in-order to get customer record"
            }
        }
    }

    async addCustomerToDB(): Promise<IServerRes> {
        const {
            firstName,
            lastName,
            permanentAddress,
            temporaryAddress,
            contactNumber
        } = this.customer;


        try {
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
        catch (e: any) {
            return this.serverResponse = {
                isFailed: true,
                statusCode: 401,
                messageTitle: `Failed while adding customer Mr.${lastName}`,
                messageDescription: e.message,
                isSuccess: false
            }
        }
    }


    async getAllCustomer(): Promise<IServerRes> {
        try {
            const customerDocs: any = await customerModel.find();
            this.encoder = new IEncoder(EncoderE.customer, customerDocs, 'array');

            return customerDocs ?
                this.serverResponse = {
                    isFailed: false,
                    isSuccess: true,
                    statusCode: 200,
                    messageTitle: "Successfully retrieved customer records",
                    messageDescription: `Total number of data retrived from database`,
                    _resource: this.encoder.runEncoder()
                } : this.serverResponse = {
                    isFailed: true,
                    isSuccess: true,
                    statusCode: 200,
                    messageTitle: "Failed to retreived customer records",
                    messageDescription: "Server responded with no collection in database."
                }
        }
        catch (e: any) {
            return this.serverResponse = {
                isFailed: true,
                isSuccess: false,
                statusCode: 401,
                messageTitle: `Unable to access customer collection from database`,
                messageDescription: e.message
            }
        }
    }


    async deleteCustomer(): Promise<IServerRes> {
        if (isValidObjectId(this.customer.id)) {
            try {
                const docs = await customerModel.deleteOne({ _id: this.customer.id })
                return this.serverResponse = {
                    isFailed: false,
                    isSuccess: true,
                    statusCode: 201,
                    messageTitle: `Successfully deleted customer ${this.customer.firstName}`,
                    messageDescription: "Server responded with success message which delete the customer",
                    _resource: docs
                }
            }
            catch (e: any) {
                return this.serverResponse = {
                    isFailed: true,
                    isSuccess: false,
                    statusCode: 401,
                    messageTitle: `Unable to connect to database server`,
                    messageDescription: e.message
                }
            }
        }

        return this.serverResponse = {
            isFailed: true,
            isSuccess: false,
            statusCode: 401,
            messageTitle: `Unable to find customer with given id: ${this.customer.id}`,
            messageDescription: "Server didn't find the customer, please provide correct id to delete customer"
        };
    }



    async updateCustomer(): Promise<IServerRes> {
        try {
            const docs = await customerModel.updateOne({ _id: this.customer.id }, this.customer)

            return this.serverResponse = {
                isFailed: false,
                isSuccess: true,
                statusCode: 200,
                messageTitle: `Successfully updated customer record`,
                messageDescription: `Customer: ${this.customer.firstName}'s record has been successfully removed from the database`,
                _resource: docs
            }
        }
        catch (e: any) {
            return this.serverResponse = {
                isFailed: true,
                isSuccess: false,
                statusCode: 401,
                messageDescription: e.message,
                messageTitle: 'Unable to connect to database'
            }
        }
    }

}


export {
    CustomerService
}