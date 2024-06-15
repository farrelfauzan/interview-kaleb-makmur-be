import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBody({ type: CreateUserDto })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @ApiCreatedResponse({ type: User, isArray: true })
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @ApiCreatedResponse({ type: User })
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Get(':email')
  async findUserByEmail(@Param('email') email: string) {
    return await this.usersService.findUserByEmail(email);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }

  @ApiBody({ type: UpdateUserDto })
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id.toString(), updateUserDto);
  }
}
