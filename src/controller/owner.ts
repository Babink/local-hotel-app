import { Request, Response } from 'express'
import { IOwner } from '../interface/owner'
import { OwnerService } from '../services/owner'
import { IServerRes } from '../interface/serverResponse'
import { isValidObjectId } from 'mongoose'

class OwnerController {
    getAllOwner(req: Request, res: Response): void {
        const dummyOwner: IOwner = {
            id: '69'
        }
        new OwnerService(dummyOwner)
            .getAllOwners()
            .then((docs: IServerRes) => res.send(docs))
            .catch((e: IServerRes) => res.send(e));
    }


    getAOwner(req: Request, res: Response): void {
        const id: any = req.query.id != undefined ? req.query.id : ""

        if (isValidObjectId(id)) {
            const owner: IOwner = {
                id: id
            }

            new OwnerService(owner)
                .getSingleOwner()
                .then((docs: IServerRes) => res.send(docs))
                .catch((e: IServerRes) => res.send(e));
        } else {
            const serverResponse: IServerRes = {
                isFailed: true,
                isSuccess: false,
                statusCode: 401,
                messageTitle: "Invalid Owner ID",
                messageDescription: "Please provide valid id in-order to read owner's record"
            }

            res.send(serverResponse);
        }
    }

    addOwner(req: Request, res: Response): void {
        const {
            userName,
            password,
            contactNumber,
            isMainOwner
        } = req.body;

        const owner: IOwner = {
            id: "",
            userName,
            password,
            contactNumber,
            isMainOwner
        }

        if (userName.length >= 1 && password) {
            new OwnerService(owner)
                .createNewOwner()
                .then((docs: IServerRes) => res.send(docs))
                .catch((e: IServerRes) => res.send(e));
        }
        else {
            const addOwnerResponse: IServerRes = {
                isFailed: true,
                isSuccess: false,
                statusCode: 401,
                messageTitle: "Invalid input",
                messageDescription: "Please provide proper data to create new owner"
            }

            res.send(addOwnerResponse);
        }
    }

    deleteOwner(req: Request, res: Response): void {
        const id: any = req.query.id != undefined ? req.query.id : "";

        if (isValidObjectId(id)) {
            const owner: IOwner = {
                id
            }

            new OwnerService(owner)
                .deleteOwner()
                .then((docs: IServerRes) => res.send(docs))
                .catch((e: IServerRes) => res.send(e));
        }
        else {
            const serverResponse: IServerRes = {
                isFailed: true,
                isSuccess: false,
                statusCode: 401,
                messageTitle: "Invalid Owner ID",
                messageDescription: "Please provide valid id in-order to delete owner's record"
            }

            res.send(serverResponse);
        }
    }

    updateOwner(req: Request, res: Response): void {
        const {
            id,
            userName,
            password,
            contactNumber,
            isMainOwner
        } = req.body;

        const owner: IOwner = {
            id,
            userName,
            password,
            contactNumber,
            isMainOwner
        }

        if (isValidObjectId(owner.id)) {
            const owner: IOwner = {
                id,
                userName,
                password,
                contactNumber,
                isMainOwner
            }

            new OwnerService(owner)
                .updateOwner()
                .then((docs: IServerRes) => res.send(docs))
                .catch((e: IServerRes) => res.send(e));
        }
        else {
            const serverResponse: IServerRes = {
                isFailed: true,
                isSuccess: false,
                statusCode: 401,
                messageTitle: "Invalid Owner ID",
                messageDescription: "Please provide valid id in-order to update owner's record"
            }

            res.send(serverResponse);
        }
    }
}


export {
    OwnerController
}