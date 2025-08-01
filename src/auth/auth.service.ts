import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

type AuthInput = {
  username: string;
  password: string;
};

type AuthResult = {
  accessToken: string;
  userId: number;
  username: string;
};

type SignInData = {
  userId: number;
  username: string;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async authenticate(input: AuthInput): Promise<AuthResult> {
    const user = await this.validateUser(input);

    console.log(user);

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    return this.signIn(user);
  }

  async validateUser(input: AuthInput): Promise<SignInData | null> {
    const dbResult = await this.usersService.findByUsername(input.username);
    if (dbResult.length > 0) {
      const user = dbResult[0];

      try {
        const result = await bcrypt.compare(input.password, user.password);
        console.log(result);

        if (result) {
          console.log('inside result');
          const returnedUser: SignInData = {
            userId: user.userId,
            username: user.username,
          };
          return returnedUser;
        }

        return null;
      } catch (err) {
        throw new InternalServerErrorException(
          'Error comparing passwords: ' + err,
        );
      }
    }
    return null;
  }

  async signUp(input: AuthInput) {
    const user = await this.usersService.create(input);
    return user;
  }

  async signIn(user: SignInData): Promise<AuthResult> {
    const tokenPayload = {
      sub: user.userId,
      username: user.username,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload);

    return { accessToken, ...user };
  }
}
