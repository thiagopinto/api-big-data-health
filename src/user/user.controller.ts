import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { PaginationDto } from 'src/dto/pagination.dto';
import { PaginationOptionsDto } from 'src/dto/pagination-options.dto';
import { ApiPaginatedResponse } from 'src/decorator/api-paginated-response';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiPaginatedResponse(UserEntity)
  async findAll(
    @Query() paginationOptionsDto: PaginationOptionsDto,
  ): Promise<PaginationDto<UserEntity>> {
    return this.userService.findAll(paginationOptionsDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UserEntity> {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
