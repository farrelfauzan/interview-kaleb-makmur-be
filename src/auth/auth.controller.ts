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
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginAuthDto } from './dto/login-auth';
import { LocalGuard } from './guards/local.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: LoginAuthDto })
  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Body() user: LoginAuthDto) {
    return await this.authService.login(user);
  }
}
