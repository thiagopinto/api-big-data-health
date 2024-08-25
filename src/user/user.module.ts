import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from '../user/entities/user.entity';
import { RoleEntity } from '../user/entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity])],
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule],
})
export class UserModule {}
