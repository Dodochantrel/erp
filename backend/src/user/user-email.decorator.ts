import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../auth/auth.service';

export const UserEmail = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>();
  if (!request.headers.authorization) {
    return null;
  }
  const accessToken = request.headers.authorization.split(' ')[1];
  return jwtDecode<JwtPayload>(accessToken).email;
});
