import { Request, Response } from 'express';
import { ICustomer } from '../interface/customer'
import { IServerRes } from '../interface/serverResponse'
import { CustomerService } from '../services/customer'

class CustomerController {

    getAllCustomers(req: Request, res: Response): void {
        let customer: ICustomer = {};

        new CustomerService(customer)
            .getAllCustomer()
                .then((docs: IServerRes) => res.send(docs))
                .catch((e: IServerRes) => res.send(e))
    }


    getACustomer(req: Request, res: Response): void {
        const id: any = req.query.id != undefined ? req.query.id: "";
        const customer: ICustomer = {
            id
        }

        const customerService: CustomerService = new CustomerService(customer);
        customerService.getACustomer()
            .then((docs: IServerRes) => res.send(docs))
            .catch((e: IServerRes) => res.send(e))
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


    deleteCustomer(req: Request, res: Response): void {
        const id: any  = req.query.id != undefined ? req.query.id : "";

        if(id.length >= 5){
            const customer: ICustomer = {
                id
            }

            const SCustomer: CustomerService = new CustomerService(customer);
            SCustomer.deleteCustomer()
                .then((docs: IServerRes) => res.send(docs))
                .catch((e: IServerRes) => res.send(e))
        }

        else{
            const serverResponse: IServerRes = {
                isSuccess: false,
                isFailed: true,
                statusCode: 401,
                messageTitle: "Invalid ID",
                messageDescription: "provide correct ID in-order to delete"
            }

            res.send(serverResponse);
        }
    }


    updateCustomer(req: Request, res: Response): void {
        const {
            id,
            firstName,
            lastName,
            permanentAddress,
            temporaryAddress,
            contactNumber
        } = req.body;

        const customer: ICustomer = {
            id,
            firstName,
            lastName,
            permanentAddress,
            temporaryAddress,
            contactNumber
        }

        const SCustomer = new CustomerService(customer);
        SCustomer.updateCustomer()
            .then((docs: IServerRes) => res.send(docs))
            .catch((e: IServerRes) => res.send(e))
    }
}


export {
    CustomerController
}