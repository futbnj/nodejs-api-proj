import {IUsersRepository} from "./users.repository.interface";
import {UserEntity} from "./user.entity";
import {UserModel} from "@prisma/client";
import {inject, injectable} from "inversify";
import {TYPES} from "../types";
import {PrismaService} from "../db/prisma.service";

@injectable()
export class UsersRepository implements IUsersRepository {
    constructor(
        @inject(TYPES.PrismaService) private readonly prismaService: PrismaService,
    ) {
    }

    async create ({ email, name, password }: UserEntity): Promise<UserModel>{
        return this.prismaService.client.userModel.create({
            data: {
                email,
                password,
                name,
            }
        })
    };

    async find(email: string): Promise<UserModel | null> {
        return this.prismaService.client.userModel.findFirst({
            where: {
                email,
            }
        })
    }

}