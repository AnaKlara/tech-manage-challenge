import { Mapper } from "../utils/mapper";
import { UserForm } from "./user-form.model";
import { User } from "./user.model";

export class UserMapper extends Mapper<UserForm, User> {
    mapFrom(param: UserForm): User {

      const { nomeCompleto, email, celular, dataNascimento, tipoUsuario } = param;
  
      const user: User = {
        nomeCompleto,
        email,
        celular,
        dataNascimento,
        tipoUsuario,
      };
  
      return user;
    }
  }