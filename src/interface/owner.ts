interface IOwnerToken{
    accessToken: string
    refreshToken: string
}

interface IOwner{
    id: string
    userName?: string
    contactNumber?: string
    password?: string
    isMainOwner?: boolean
    tokens?: IOwnerToken[]
}


export {
    IOwner,
    IOwnerToken
}