import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { SignupCreateDto } from './dto/signup-create.dto';
import { SigninDto } from './dto/signin.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Register' })
  @HttpCode(HttpStatus.OK)
  @Post('register')
  signUp(@Body() signInDto: SignupCreateDto) {
    return this.authService.signUp(signInDto.username, signInDto.password);
  }

  @ApiOperation({ summary: 'Login' })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SigninDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @ApiOperation({ summary: 'Get user profile' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
