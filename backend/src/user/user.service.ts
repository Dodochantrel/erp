import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email: email },
      select: ['id', 'firstName', 'lastName', 'email', 'isValidate', 'token', 'role'],
    });
  }

  async findByEmailForLogin(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email: email },
      select: ['firstName', 'lastName', 'email', 'password', 'isValidate', 'lastLogin', 'role'],
    });
  }

  async update(user: User): Promise<void> {
    await this.userRepository.update({ email: user.email }, user);
  }

  async create(firstName: string, lastName: string, email: string, password: string, token: string): Promise<User> {
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = password;
    user.token = token;
    return this.userRepository.save(user);
  }

  async validEmail(email: string): Promise<void> {
    await this.userRepository.update({ email: email }, { isValidate: true });
  }

  async updateRefreshToken(userId: number, token: string) {
    await this.userRepository.update({ id: userId }, { token: token });
  }

  async findByToken(token: string) {
    return this.userRepository.findOne({
      where: { token: token },
      select: ['firstName', 'lastName', 'email', 'isValidate', 'token'],
    });
  }
}
