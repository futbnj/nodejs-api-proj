import {IsEmail, IsString} from "class-validator";

export class UserRegisterDto {
    @IsEmail({}, { message: "Email is incorrect" })
    email: string;

    @IsString({ message: "Name is not set"})
    name: string;

    @IsString({ message: "Password is not set"})
    password: string;
}