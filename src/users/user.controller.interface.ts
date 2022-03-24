import { NextFunction, Request, Response } from 'express';
import { UserRegisterDto } from './dto/user-register.dto';

export interface IUserController {
	login: (req: Request, res: Response, next: NextFunction) => void;
	register: (
		req: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	) => Promise<void>;
}
