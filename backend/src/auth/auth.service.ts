import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  }

  async register(
    email: string,
    pass: string,
    firstName?: string,
    lastName?: string,
  ) {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new HttpException(
          'Email is already taken',
          HttpStatus.BAD_REQUEST,
        );
      }

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(pass, salt);

      // Create the user in the database
      const user = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
        },
      });

      const { password, ...result } = user;
      return result;
    } catch (error) {
      throw new HttpException(
        error.message || 'An error occurred during registration',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //deleting user based on email
  async deleteUser(email: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      await this.prisma.user.delete({
        where: { email },
      });
      return { message: 'User successfully deleted' };
    } catch (error) {
      throw new HttpException(
        error.message || 'An error occurred while deleting the user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async logout() {
    return {
      message:
        'Logged out successfully. Please delete your token on the client side.',
    };
  }
}
