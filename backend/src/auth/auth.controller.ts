import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterQueryDto } from './DTO/register-query.dto';
import { ValidEmailQueryDto } from './DTO/valid-email-query.dto';
import { LoginQueryDto } from './DTO/login-query.dto';
import { ForgotPasswordQueryDto } from './DTO/forgot-password-query.dto';
import { ResetPasswordQueryDto } from './DTO/reset-password-query.dto';
import { Response, Request } from 'express';
import { UserService } from 'src/user/user.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() registerQueryDto: RegisterQueryDto) {
    await this.authService.register(
      registerQueryDto.email,
      registerQueryDto.password,
      registerQueryDto.firstName,
      registerQueryDto.lastName,
    );
  }

  @Post('validEmail')
  async validEmail(@Body() validEmailQueryDto: ValidEmailQueryDto) {
    await this.authService.validEmail(validEmailQueryDto.token);
  }

  @Post('login')
  async login(@Body() loginQueryDto: LoginQueryDto, @Res() res: Response) {
    const user = await this.authService.login(loginQueryDto.email, loginQueryDto.password);
    const accessToken = this.authService.createAccessToken(user.email);
    const refreshToken = this.authService.createRefreshToken(user.email);
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: false,
      secure: true,
      sameSite: 'strict',
    });
    return res.status(200).json({ message: 'Login successful' });
  }

  @Post('refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    const accessToken = req.cookies['accessToken'];
    if (!accessToken) return res.status(401).json({ message: 'Access token not found' });
    const dataToken = await this.authService.decodeToken(accessToken);
    const refreshToken = this.authService.createRefreshToken(dataToken.email);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: false,
      secure: true,
      sameSite: 'strict',
    });
    return res.status(200).json({ refreshToken: refreshToken });
  }

  @Post('forgotPassword')
  async forgotPassword(@Body() forgotPasswordQueryDto: ForgotPasswordQueryDto) {
    await this.authService.forgotPassword(forgotPasswordQueryDto.email);
  }

  @Post('resetPassword')
  async resetPassword(@Body() resetPasswordQueryDto: ResetPasswordQueryDto) {
    await this.authService.resetPassword(resetPasswordQueryDto.token, resetPasswordQueryDto.password);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me() {
    return {
      email: 'dorian.chantrel@hotmail.fr',
      firstName: 'Dorian',
      lastName: 'Chantrel',
    };
  }
}
