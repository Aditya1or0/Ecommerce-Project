import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findUser(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: {
        firstName: updateUserDto.firstName,
        lastName: updateUserDto.lastName,
        dateOfBirth: updateUserDto.dateOfBirth,
        age: updateUserDto.age,
        bio: updateUserDto.bio,
        avatar: updateUserDto.avatar,
      },
    });
  }
}
