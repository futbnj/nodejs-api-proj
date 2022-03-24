import {IUserService} from './users.service.interface';
import {UserRegisterDto} from './dto/user-register.dto';
import {UserEntity} from './user.entity';
import {UserLoginDto} from './dto/user-login.dto';
import {inject, injectable} from 'inversify';
import {TYPES} from '../types';
import {IConfigService} from '../config/config.service.interface';
import {IUsersRepository} from "./users.repository.interface";
import {UserModel} from "@prisma/client";
import {ILogger} from "../logger/logger.interface";

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService) private readonly configService: IConfigService,
		@inject(TYPES.UsersRepository) private readonly usersRepository: IUsersRepository,
		@inject(TYPES.ILogger) private logger: ILogger,
	) {}
	async createUser({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
		const newUser = new UserEntity(email, name);
        const salt = this.configService.get('SALT');
		await newUser.setPassword(password, Number(salt));
		//check whether user exists [business logic]
		const isUser = await this.usersRepository.find(email);
		//if yes - return null, else - return new UserEntity;
		if (isUser) {
			return null;
		}
		return this.usersRepository.create(newUser)
	}

	async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
		const isUser = await this.usersRepository.find(email);
		if (!isUser) {
			return false;
		}
		const newUser = new UserEntity(isUser.email, isUser.name, isUser.password);
		return newUser.comparePasswords(password);
	}
}
