import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import dataSource from './database/data.sources';
import { DataSource } from 'typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...dataSource.options, autoLoadEntities: true }),
    UserModule,
    AuthModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
