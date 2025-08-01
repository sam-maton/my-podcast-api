import { Controller, HttpCode, Post, HttpStatus, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async authUser(@Body() input: { username: string; password: string }) {
    return await this.authService.authenticate(input);
  }

  @Post('signup')
  async signUp(@Body() input: { username: string; password: string }) {
    const user = await this.authService.signUp(input);

    return user;
  }
}
