import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUSerDTO";

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider
  ) {}
  async execute(data: ICreateUserRequestDTO) {
    const userAlreadtExists = await this.usersRepository.findByEmail(
      data.email
    );

    if (userAlreadtExists) {
      throw new Error("User already exists");
    }

    const user = new User(data);

    await this.usersRepository.save(user);

    await this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email,
      },
      from: {
        name: "Farma Web",
        email: "equipe@meuapp.com",
      },
      subject: "Seja bem vindo!",
      body: "<p>Cadastro confirmado</p>",
    });
  }
}
