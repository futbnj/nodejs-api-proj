import {IUserService} from "./users.service.interface";
import {UserRegisterDto} from "./dto/user-register.dto";
import {UserEntity} from "./user.entity";
import {UserLoginDto} from "./dto/user-login.dto";
import {injectable} from "inversify";

@injectable()
export class UserService implements IUserService{
    async createUser({ email, name, password }: UserRegisterDto): Promise<UserEntity | null> {
        const newUser = new UserEntity(email, name);
        await newUser.setPassword(password);
        //check whether user exists [business logic]
        //if yes - return null, else - return new UserEntity;
        return null;
    }

    async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
        return true;
    }
}