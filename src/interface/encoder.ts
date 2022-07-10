import { EncoderE } from './enum/encoder'
import { ICustomer } from '../interface/customer'

class IEncoder {
    private encode: string
    private type: string
    private _resource: any


    constructor(encodeWho: string, _resource: any, type: string) {
        this.encode = encodeWho;
        this._resource = _resource;
        this.type = type;
    }


    runEncoder(): ICustomer | ICustomer[] | Boolean {
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
        return this.type === 'array'
            ?
            this.filterArrayDataType()
            :
            this.filterObjectDataType()
    }

    private filterArrayDataType(): ICustomer[] {
        const customers: ICustomer[] = [];

        this._resource.map((docs: any) => {
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

            customers.push(customer);
        })

        return customers
    }

    private filterObjectDataType(): ICustomer {
        let {
            _id,
            firstName,
            lastName,
            permanentAddress,
            temporaryAddress,
            contactNumber
        } = this._resource;


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
    private encodeOwnerRawToInterface(): boolean {
        return false;
    }

    private filterArrayDataTypeOwner(): void{

    }


    private filterObjectDataTypeOwner(): void{

    }
}


export {
    IEncoder
}