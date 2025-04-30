import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { CreateUserDto } from './auth/dto/create-user.dto';
import { LoginDto } from './auth/dto/login.dto'; // Added for clarity, though guard handles body
import { UsersService } from './users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService, // Inject UsersService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  // Added LoginDto for clarity, LocalAuthGuard implicitly uses it
  async login(@Request() req, @Body() loginDto: LoginDto) {
    // Passport's LocalStrategy puts the validated user object onto req.user
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    // Validation is handled automatically by the ValidationPipe (configured next)
    // Note: We might want to return only specific fields or a success message
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile') // Should likely be GET, but POST for simple testing now
  getProfile(@Request() req) {
    // JwtStrategy puts the validated payload onto req.user
    return req.user;
  }
}
