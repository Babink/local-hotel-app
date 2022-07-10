

interface ICustomer{
    id: number
    firstName: string
    lastName: string
    permanentAddress?: string
    temporaryAddress: string
    contactNumber: number
}


export {
    ICustomer
}