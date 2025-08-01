import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    console.log(authorization);
    const token = authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const tokenPayload: { sub: number; username: string } =
        await this.jwtService.verifyAsync(token);
      request['user'] = {
        userId: tokenPayload.sub,
        username: tokenPayload.username,
      };
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
