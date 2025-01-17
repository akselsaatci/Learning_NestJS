import { Body, Controller, Post } from '@nestjs/common';
import { loginRequestDto } from './dtos/loginRequestDto';
import { RegisterRequestDto } from './dtos/registerRequestDto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  login(@Body() loginDto: loginRequestDto) {
    //TODO Change this later
    return this.authService.signIn(loginDto.username, loginDto.password);
  }

  @Post('register')
  register(@Body() registerDto: RegisterRequestDto) {
    return this.authService.signUp(registerDto.username, registerDto.password);
  }
}
