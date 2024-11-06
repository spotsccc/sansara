import { faker } from "@faker-js/faker";
import { CreateUserInput } from "../database/create-user";

export function generateUser(): CreateUserInput {
  return {
    username: faker.internet.username(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}
