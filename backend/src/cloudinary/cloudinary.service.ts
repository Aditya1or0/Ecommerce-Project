// src/cloudinary/cloudinary.service.ts
import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  async uploadImage(file: Express.Multer.File): Promise<any> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'user_avatars',
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      // Convert buffer to stream
      const stream = Readable.from(file.buffer);
      stream.pipe(uploadStream);
    });
  }
}
