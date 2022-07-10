import { Request, Response } from 'express';
import { ICustomer } from '../interface/customer'
import { IServerRes } from '../interface/serverResponse'
import { CustomerService } from '../services/customer'

class CustomerController {

    getAllCustomers(req: Request, res: Response): void {
        console.log("[log] Getting all customer records");
        let customer: ICustomer = {
            firstName: '',
            lastName: "",
            temporaryAddress: "",
            contactNumber: "00000000"
        };

        new CustomerService(customer)
            .getAllCustomer()
                .then((docs: IServerRes) => res.send(docs))
                .catch((e: IServerRes) => res.send(e))
    }


    getACustomer(req: Request, res: Response): void {
        console.log("Get single customer")
    }


    addCustomer(req: Request, res: Response): void {
        let {
            firstName,
            lastName,
            permanentAddress,
            temporaryAddress,
            contactNumber
        } = req.body;

        if ((firstName && lastName && temporaryAddress && contactNumber) || permanentAddress === undefined) {
            permanentAddress = permanentAddress === undefined ? "not-provided" : permanentAddress;
            const customer: ICustomer = {
                firstName,
                lastName,
                permanentAddress,
                temporaryAddress,
                contactNumber
            }

            const SCustomer: CustomerService = new CustomerService(customer);
            SCustomer.addCustomerToDB()
                .then((docs: IServerRes) => res.send(docs))
                .catch((err: IServerRes) => res.send(err))
        }

        else {
            const responseMessage: IServerRes = {
                isFailed: true,
                isSuccess: false,
                statusCode: 400,
                messageTitle: "Incomplete informataion provided",
                messageDescription: "Please provide all required information"
            }

            res.send(responseMessage)
        }
    }
}


export {
    CustomerController
}