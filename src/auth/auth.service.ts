import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findUser(username);
    if (!user || user.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async signUp(username: string, password: string) {
    await this.userService.createUser(username, password);
    try {
    } catch (ex) {
      throw new HttpException(ex.response, ex.status);
    }

    return await this.signIn(username, password);
  }
}
