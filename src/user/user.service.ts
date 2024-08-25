import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/dto/pagination.dto';
import { PaginationOptionsDto } from 'src/dto/pagination-options.dto';
import { PaginationMetaDto } from 'src/dto/pagination-meta.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.usersRepository.create(createUserDto);

      return await this.usersRepository.save(user);
    } catch (error) {
      throw new HttpException(error.detail, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Get All Users with Pagination
  async findAll(
    paginationOptionsDto: PaginationOptionsDto,
  ): Promise<PaginationDto<UserEntity>> {
    const [results, total] = await this.usersRepository.findAndCount({
      relations: ['roles'], // Se necessário, carregue as relações
      skip: paginationOptionsDto.skip,
      take: paginationOptionsDto.take,
    });

    const paginationMetaDto = new PaginationMetaDto({
      paginationOptionsDto,
      total: total,
    });

    return new PaginationDto(results, paginationMetaDto);
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['roles'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.usersRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.usersRepository.remove(user);
  }
}
