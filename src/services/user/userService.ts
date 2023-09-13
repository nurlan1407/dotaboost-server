import {UserDoc, UserModel} from "@App/interfaces/models/user";

class UserService{
    async insertUser(email:string,password:string){
        return await UserModel.create({email: email, password: password});
    }
    async setRefreshToken(user:UserDoc){
        return await user.save();
    }

    async findUser(email:string){
        return await UserModel.findOne({email:email});
    }
}


export default new UserService();