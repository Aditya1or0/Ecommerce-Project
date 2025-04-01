import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus } from '@nestjs/common'; // Importing HttpException and HttpStatus

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(
    email: string,
    pass: string,
    firstName?: string,
    lastName?: string,
  ) {
    try {
      // Check if the email already exists
      const existingUser = await this.prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        // Throw an HTTP exception with a custom message and status code 400 (Bad Request)
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
      // Handle any other errors (e.g. database errors, etc.)
      throw new HttpException(
        error.message || 'An error occurred during registration',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

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
}
