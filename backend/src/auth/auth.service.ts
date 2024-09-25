import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppError } from 'src/error/app-error.exception';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';

export const SALTORROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private mailService: MailService,
  ) {}

  async isAdminCheck(token: string): Promise<boolean> {
    const email = (await this.decodeToken(token)).email;
    const user = await this.userService.findByEmail(email);
    return user.role === 'admin' ? true : false;
  }

  async register(email: string, password: string, firstName: string, lastName: string) {
    const userExists = await this.userService.findByEmail(email);
    if (userExists) {
      throw new AppError('User already exists', 400);
    }
    const token: string = await this.createToken(email);
    try {
      await this.mailService.registerEmail(email, token);
      await this.userService.create(firstName, lastName, email, await this.hashPassword(password), token);
    } catch (error) {
      throw new AppError(error.message, 500);
    }
  }

  async validEmail(token: string) {
    const tokenDecoded = await this.decodeToken(token);
    const user = await this.userService.findByEmail(tokenDecoded.email);
    if (user) {
      user.token = null;
      user.isValidate = true;
      await this.userService.update(user);
    } else {
      throw new AppError('User not found', 404);
    }
  }

  async login(email: string, password: string) {
    const user = await this.userService.findByEmailForLogin(email);
    if (user) {
      if (!user.isValidate) {
        throw new AppError('User not validate', 400);
      }
      await this.checkPassword(password, user.password);
      user.lastLogin = new Date();
      await this.userService.update(user);

      return user;
    } else {
      throw new AppError('User not found', 404);
    }
  }

  createAccessToken(email: string) {
    return this.jwtService.sign({ email: email }, { expiresIn: '7d' });
  }

  createRefreshToken(email: string) {
    return this.jwtService.sign({ email: email }, { expiresIn: '15m' });
  }

  async forgotPassword(email: string) {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const token = await this.createToken(email);
      await this.mailService.forgotPasswordEmail(email, token);
    } else {
      throw new AppError('User not found', 404);
    }
  }

  async resetPassword(token: string, password: string) {
    const user = await this.userService.findByToken(token);
    if (user) {
      user.password = await this.hashPassword(password);
      user.token = null;
      await this.userService.update(user);
      await this.mailService.resetPasswordEmail(user.email);
    } else {
      throw new AppError('User not found', 404);
    }
  }

  private async createToken(email: string): Promise<string> {
    const payload = { email: email };
    return await this.jwtService.signAsync(payload);
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, SALTORROUNDS);
  }

  async decodeToken(token: string): Promise<JwtPayload> {
    return await this.jwtService.decode(token);
  }

  private async checkPassword(password: string, hash: string) {
    const isMatch = await bcrypt.compare(password, hash);
    if (!isMatch) {
      throw new AppError('Wrong password', 400);
    }
  }
}

export interface JwtPayload {
  email: string;
  role: string;
}
