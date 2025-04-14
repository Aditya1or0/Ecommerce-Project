import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  UseGuards,
  Request,
  UploadedFile,
  UseInterceptors,
  Post,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getCurrentUser(@Request() req) {
    return this.userService.findUser(req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload-avatar')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
    }),
  )
  async uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    try {
      const userId = req.user.sub;

      // Upload to Cloudinary
      const result = await this.cloudinaryService.uploadImage(file);

      // Save the Cloudinary URL to user profile
      await this.userService.update(userId, { avatar: result.secure_url });

      return { avatarUrl: result.secure_url };
    } catch (error) {
      console.error('Error uploading avatar:', error);
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findUser(@Param('id') id: string) {
    return this.userService.findUser(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
}
