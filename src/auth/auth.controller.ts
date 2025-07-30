import {
  Controller,
  HttpCode,
  Post,
  HttpStatus,
  NotImplementedException,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @HttpCode(HttpStatus.OK)
  @Post('login')
  getHello(): string {
    throw new NotImplementedException('Login endpoint not implemented yet');
  }
}
