import { Module } from '@nestjs/common';
import { CloudinaryController } from './cloudinary.controller';
import { CloudinaryService } from './cloudinary.service';
import { ImageEntity } from './entities/image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'; // Importando o ConfigModule
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([ImageEntity]), AuthModule],
  controllers: [CloudinaryController],
  providers: [CloudinaryService],
  exports: [TypeOrmModule],
})
export class CloudinaryModule {}
