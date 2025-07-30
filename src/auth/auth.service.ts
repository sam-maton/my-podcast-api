import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

type AuthInput = {
  username: string;
  password: string;
};

type SignInData = {
  id: string;
  username: string;
};

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(input: AuthInput): Promise<SignInData | null> {
    const user = await this.usersService.findByUsername(input.username);

    return null;
  }
}
