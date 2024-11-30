import { RegisterUserCommand } from "../../useCases/commands/RegisterUserCommand";
import { UserDTO } from "../dtos/Auth.dto";

export interface IRegisterUserHandler {
    execute(command: RegisterUserCommand): Promise<UserDTO>;
  }
  