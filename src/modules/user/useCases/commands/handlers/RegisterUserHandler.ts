import { inject, injectable } from "tsyringe";
import { RegisterUserCommand } from "../RegisterUserCommand";
import { UserAlreadyExistsError } from "@/shared/errors/UserErrors";
import { IHashService } from "@/shared/infrastructure/security/IHashService";
import { IEmailService } from "@/shared/infrastructure/email/IEmailService";
import { IUserRepository } from "../../../domain/interfaces/IUserRepository";
import { UserDTO } from "@/modules/user/domain/dtos/Auth.dto";
import { User } from "@/modules/user/domain/entities/User";
import { IRegisterUserHandler } from "@/modules/user/domain/interfaces/IRegisterUserHandler";

@injectable()
export class RegisterUserHandler implements IRegisterUserHandler {
    constructor(
        @inject('UserRepository') private userRepository: IUserRepository,
        @inject('HashService') private hashService: IHashService,
        @inject('EmailService') private emailService: IEmailService
    ){}

    async execute(command: RegisterUserCommand): Promise<UserDTO> {
        const existingUser = await this.userRepository.findOne({email: command.email});
        if (existingUser) {
            // throw new UserAlreadyExistsError();
        }

        const hashedPassword = await this.hashService.hash(command.password);
        const verifyToken = crypto.randomUUID();

        const user = await this.userRepository.create({
            ...command,
            password: hashedPassword,
            verifyToken, 
            verified: false
        });
        console.log(user)
        await this.emailService.sendVerificationEmail(command.email, verifyToken)
        return this.toUserDTO(user)

    }
    private toUserDTO(user: User): UserDTO {
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          verified: user.verified,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        };
      }
}