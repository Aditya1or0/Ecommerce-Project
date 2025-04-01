import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { UsePipes, ValidationPipe } from '@nestjs/common'; // Add validation pipe
import { RegisterDto } from './dto/register-dto';
import { LoginDto } from './dto/login-dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true }))
  async register(@Body() registerDto: RegisterDto) {
    const { email, password, firstName, lastName } = registerDto;
    return this.authService.register(email, password, firstName, lastName);
  }

  @Delete('delete/:email')
  async deleteUser(@Param('email') email: string) {
    try {
      return await this.authService.deleteUser(email);
    } catch (error) {
      return { message: error.response || 'Something went wrong' };
    }
  }
  @Post('logout')
  @UseGuards(JwtAuthGuard) // Protect with JwtAuthGuard
  async logout() {
    return this.authService.logout(); // Inform client to delete the token on their side
  }
}
