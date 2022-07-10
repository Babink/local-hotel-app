import { ICustomer } from '../interface/customer'
import { IServerRes } from '../interface/serverResponse'
import { customerModel } from '../model/customer/customer'
import { Model } from 'mongoose'

class CustomerService{
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
                lastName
            })

            const customerResponse = await docs.save();

            return this.serverResponse = {
                isSuccess: true,
                isFailed: false,
                statusCode: 201,
                messageTitle: `Added New Customer Mr.${lastName}`,
                messageDescription: 'Successfully saved customer information in database.',
                _resource: customerResponse
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

}


export {
    CustomerService
}