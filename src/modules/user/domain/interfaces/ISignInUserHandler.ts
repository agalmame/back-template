import { SignInUserCommand } from "../../useCases/commands/SignInUserCommand";
export interface ISignInUserHandler {
    execute(command: SignInUserCommand): Promise<Record<string, any>>;
  }
  