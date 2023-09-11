import {UserDoc, UserModel} from "@App/interfaces/models/user";

class UserService{
    async insertUser(email:string,password:string){
        return await UserModel.create({email: email, password: password});
    }
    async setRefreshToken(user:UserDoc){
        return await user.save()
    }

}


export default new UserService();