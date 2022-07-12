import { EncoderE } from './enum/encoder'
import { ICustomer } from '../interface/customer'
import { IOwner } from '../interface/owner'

class IEncoder {
    private encode: string
    private type: string
    private _resource: any


    constructor(encodeWho: string, _resource: any, type: string) {
        this.encode = encodeWho;
        this._resource = _resource;
        this.type = type;
    }


    runEncoder(): Boolean | ICustomer | ICustomer[] | IOwner | IOwner[] {
        switch (this.encode) {
            case EncoderE.customer:
                return this.encodeCustomerRawToInterface();

            case EncoderE.owner:
                return this.encodeOwnerRawToInterface()

            default:
                return false
        }
    }



    // customer encoder
    private encodeCustomerRawToInterface(): ICustomer | ICustomer[] {
        return this.type === EncoderE.arr
            ?
            this.filterArrayDataType()
            :
            this.filterObjectDataType()
    }

    private filterArrayDataType(): ICustomer[] {
        const customers: ICustomer[] = [];

        this._resource.map((docs: any) => {
            const customer: ICustomer = this.convertCustomerData(docs);

            customers.push(customer);
        })

        return customers
    }

    private filterObjectDataType(): ICustomer {
        return this.convertCustomerData(this._resource);
    }

    private convertCustomerData(docs: any): ICustomer{
        let {
            _id,
            firstName,
            lastName,
            permanentAddress,
            temporaryAddress,
            contactNumber
        } = docs;


        const customer: ICustomer = {
            id: _id,
            firstName,
            lastName,
            permanentAddress,
            temporaryAddress,
            contactNumber
        }

        return customer;
    }



    // owner encoder
    private encodeOwnerRawToInterface(): IOwner | IOwner[] {
        return this.type === EncoderE.arr ?
            this.filterArrayDataTypeOwner()
            : this.filterObjectDataTypeOwner()
    }

    private filterArrayDataTypeOwner(): IOwner[] {
        const owners: IOwner[] = [];

        this._resource.map((docs: any) => {
            const owner: IOwner = this.convertOwnerData(docs)

            owners.push(owner);
        })

        return owners;
    }


    private filterObjectDataTypeOwner(): IOwner {
        return this.convertOwnerData(this._resource)
    }

    private convertOwnerData(docs: any): IOwner{
        const {
            _id,
            userName,
            isMainOwner,
            password,
            contactNumber
        } = docs;

        const owner: IOwner = {
            id: _id,
            userName,
            isMainOwner,
            password,
            contactNumber
        }

        return owner;
    }
}


export {
    IEncoder
}