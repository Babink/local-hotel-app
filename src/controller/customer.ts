import { Request, Response } from 'express';
import { customerModel } from '../model/customer/customer'

class CustomerController{
    getAllCustomers(req: Request, res: Response): void {
        console.log("Return all customer list")
    }


    getACustomer(req: Request, res: Response): void {
        console.log("Get single customer")
    }


    addCustomer(req: Request, res: Response): void {
        console.log("[log] Getting data from client....")
        const { firstName, lastName }: {firstName: string, lastName: string} = req.body;

        if(firstName && lastName){
            const result: any =  new customerModel({
                firstName,
                lastName
            })

            result.save()
                .then((docs: any) => {
                    res.send(docs)
                })
                .catch((e: any) => {
                    res.send({ "mssg": e.message })
                })
        }

        else{
            res.send({
                "mesg": "please provide first and last name"
            })
        }
    }
}


export {
    CustomerController
}