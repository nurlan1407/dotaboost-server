import jwt from 'jsonwebtoken';

export class UserDTO{
    _id:string;
    email:string;
    constructor(_id:string, email:string){
        this._id = _id;
        this.email = email
    }
}

const TOKEN_KEY = "ll"
class TokenService{

    signTokens(_id:string, email:string){
        const userDTO = new UserDTO(_id,email);
        const accessToken = jwt.sign(
            {...userDTO},
            TOKEN_KEY,
            {expiresIn:"1h"}
            );
        const refreshToken = jwt.sign(
            {...userDTO},
            TOKEN_KEY,
            {expiresIn:"7d"}
            );
        return {accessToken:accessToken, refreshToken:refreshToken}
    }

    decodeAccessToken(accessToken:string){
        const decoded = jwt.verify(accessToken,TOKEN_KEY);
        console.log(decoded);
        return decoded
    }

    auth(token:string){
        return jwt.verify(token,TOKEN_KEY)
    }
    refreshToken(){
        
    }

}

const tokenService = new TokenService()
export {tokenService}