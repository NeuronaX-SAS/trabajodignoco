import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service'; // Corrected path assuming users.service is at src level
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && await bcrypt.compare(pass, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user; // Return user object without password
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id }; // Use 'sub' for user ID as per JWT standard
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
