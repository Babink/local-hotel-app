import { IOwnerToken } from "../owner"


interface IOwnerClass{
    accessToken: string
    refreshToken: string
    tokenID: string

    getAccessToken(): string
    getRefreshToken(): string
    getTokenID(): string

    setAccessToken(accessToken: string): boolean
    setRefreshToken(refreshToken: string): boolean
    setTokenID(id: string): boolean

    getTokens(): IOwnerToken
}

class OwnerC implements IOwnerClass{
    tokenID: string = ""
    accessToken: string = ""
    refreshToken: string = ""

    getAccessToken(): string {
        return this.accessToken != undefined ? this.accessToken : ""
    }

    getRefreshToken(): string {
        return this.refreshToken != undefined ? this.refreshToken : ""
    }

    getTokenID(): string {
        return this.tokenID != undefined ? this.tokenID : ""
    }


    setTokenID(id: string): boolean {
        try{
            this.tokenID = id;
            return true
        }
        catch(e: any){
            return false
        }
    }
    setAccessToken(accessToken: string): boolean {
        try{
            this.accessToken = accessToken;
            return true
        }
        catch(e: any){
            return false
        }
    }

    setRefreshToken(refreshToken: string): boolean {
        try{
            this.refreshToken = refreshToken
            return true
        }
        catch(e: any){
            return false
        }
    }

    getTokens(): IOwnerToken {
        let ownerToken: IOwnerToken = {
            refreshToken: this.refreshToken,
            accessToken: this.accessToken
        }
        
        return ownerToken;
    }
}


export {
    OwnerC
}