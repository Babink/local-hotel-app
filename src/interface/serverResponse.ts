

interface IServerRes{
    isSuccess: boolean
    isFailed: boolean
    statusCode: number
    messageTitle: string
    messageDescription: string
    _resource?: any
}

export {
    IServerRes
}