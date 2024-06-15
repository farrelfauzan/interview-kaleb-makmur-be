import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const password = await encodePassword(createUserDto.password);
      const newUser = this.userRepository.create({
        ...createUserDto,
        password,
      });

      return this.userRepository.save(newUser);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.userRepository
        .createQueryBuilder('user')
        .select([
          'user.id',
          'user.firstName',
          'user.lastName',
          'user.email',
          'user.isActive',
        ])
        .getMany();
      return users;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id })
        .select([
          'user.id',
          'user.firstName',
          'user.lastName',
          'user.email',
          'user.isActive',
        ])
        .getOne();
      if (!user) {
        throw new Error('User not found');
      }
      await this.userRepository.update(id, updateUserDto);
      return await this.userRepository.findOne({
        where: { id },
      });
    } catch (error) {
      this.logger.error(error);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
      });
      if (!user) {
        throw new Error('User not found');
      }
      await this.userRepository.delete(id);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async findUserByEmail(email: string): Promise<User> {
    try {
      const findUserByEmail = await this.userRepository
        .createQueryBuilder('user')
        .where('user.email = :email', { email })
        .select([
          'user.id',
          'user.firstName',
          'user.password',
          'user.lastName',
          'user.username',
          'user.email',
          'user.isActive',
        ])
        .getOne();
      this.logger.log(JSON.stringify(findUserByEmail));
      return findUserByEmail;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
