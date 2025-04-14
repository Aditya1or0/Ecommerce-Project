import { Module } from '@nestjs/common';
import { CloudinaryProvider } from 'src/cloudinary.config';
import { CloudinaryService } from './cloudinary.service';

@Module({
  providers: [CloudinaryService, CloudinaryProvider],
  exports: [CloudinaryService, CloudinaryProvider],
})
export class CloudinaryModule {}
