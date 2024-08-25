import {
  Controller,
  Post,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Req,
  Param,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request, Express } from 'express';
import { CloudinaryService } from './cloudinary.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Controller('images')
export class CloudinaryController {
  constructor(private readonly imageService: CloudinaryService) {}

  @ApiOperation({ summary: 'Upload de imagem' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // Diretório onde os arquivos serão armazenados
        filename: (req, file, cb) => {
          // Gera um nome de arquivo único
          const filename: string = uuidv4() + path.extname(file.originalname);
          cb(null, filename);
        },
      }),
    }),
  )
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    const user = req['user'];
    return this.imageService.uploadImage(file, user);
  }

  @ApiOperation({ summary: 'Deletar imagem por ID' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteImage(@Param('id') imageId: string, @Req() req: Request) {
    const user = req['user'];
    await this.imageService.deleteImage(imageId, user);
    return { message: 'Image deleted successfully' };
  }

  @ApiOperation({ summary: 'Obter todas as imagens do usuário logado' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserImages(@Req() req: Request) {
    const user = req['user'];
    return this.imageService.findAllImagesByUser(user);
  }
}
