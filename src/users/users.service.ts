import { IUserService } from './users.service.interface';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserEntity } from './user.entity';
import { UserLoginDto } from './dto/user-login.dto';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.service.interface';
import {IUsersRepository} from "./users.repository.interface";
import {UserModel} from "@prisma/client";

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService) private readonly configService: IConfigService,
		@inject(TYPES.UsersRepository) private readonly usersRepository: IUsersRepository,
	) {}
	async createUser({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
		const newUser = new UserEntity(email, name);
        const salt = this.configService.get('SALT');
		await newUser.setPassword(password, Number(salt));
		const isUser = await this.usersRepository.find(email);
		if (isUser) {
			return null;
		}
		return this.usersRepository.create(newUser)
		//check whether user exists [business logic]
		//if yes - return null, else - return new UserEntity;
	}

	async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
		return true;
	}
}
