import { Controller, Post, Body, Delete, Param } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  async login(@Body() req) {
    return this.authService.login(req);
  }

  @Post('register')
  async register(@Body() req) {
    const { email, password, firstName, lastName } = req;
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
}
