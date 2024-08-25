import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entities/user.entity';
import { LoginDto } from './dto/login-auth.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      const user = this.usersRepository.create(createUserDto);

      return await this.usersRepository.save(user);
    } catch (error) {
      throw new HttpException(error.detail, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;

    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user || !(await user.validatePassword(password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async validateToken(token: string): Promise<UserEntity> {
    try {
      const payload = this.jwtService.verify(token);

      return await this.usersRepository.findOne({
        where: { id: payload.sub },
        relations: ['roles'],
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid token' + error);
    }
  }
}
