import { Request, Response } from 'express';
import { ICustomer } from '../interface/customer'
import { IServerRes } from '../interface/serverResponse'
import { CustomerService } from '../services/customer'

class CustomerController {
    getAllCustomers(req: Request, res: Response): void {
        console.log("Return all customer list")
    }


    getACustomer(req: Request, res: Response): void {
        console.log("Get single customer")
    }


    addCustomer(req: Request, res: Response): void {
        console.log("[log] Getting data from client....")
        const { firstName, lastName }: { firstName: string, lastName: string } = req.body;

        if (firstName && lastName) {
            const customer: ICustomer = {
                firstName,
                lastName,
                temporaryAddress: "Kapan",
                contactNumber: 9823379007
            }

            const SCustomer: CustomerService = new CustomerService(customer);
            SCustomer.addCustomerToDB()
                .then((docs: IServerRes) => {
                    res.send(docs);
                })
                .catch((e: any) => {
                    const responseMessage: IServerRes = {
                        isFailed: true,
                        isSuccess: false,
                        statusCode: 400,
                        messageTitle: "Incomplete informataion provided",
                        messageDescription: "Please provide all required information"
                    }
                    res.send(responseMessage)
                })
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