import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageEntity } from './entities/image.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { v2 as cloudinary } from 'cloudinary';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config({
  path: process.env.ENV === 'test' ? '.env.test' : '.env',
});

@Injectable()
export class CloudinaryService {
  constructor(
    @InjectRepository(ImageEntity)
    private readonly imageRepository: Repository<ImageEntity>,
  ) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadImage(
    file: Express.Multer.File,
    user: UserEntity,
  ): Promise<ImageEntity> {
    try {
      const filePath = path.join(__dirname, '../../uploads', file.filename);
      const result = await cloudinary.uploader.upload(file.path);
      fs.unlinkSync(filePath);

      console.log(result);

      const image = this.imageRepository.create({
        url: result.secure_url,
        public_id: result.public_id,
        user,
      });
      return this.imageRepository.save(image);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteImage(imageId: string, user: UserEntity): Promise<void> {
    const image = await this.imageRepository.findOne({
      where: { id: imageId, user: { id: user.id } },
    });

    if (!image) {
      throw new NotFoundException('Image not found');
    }

    await cloudinary.uploader.destroy(image.public_id);
    await this.imageRepository.remove(image);
  }

  async findAllImagesByUser(user: UserEntity): Promise<ImageEntity[]> {
    return this.imageRepository.find({ where: { user: { id: user.id } } });
  }
}
