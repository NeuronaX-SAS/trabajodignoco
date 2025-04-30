import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users/entities/user.entity'; // Corrected path
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create(userData: Partial<User>): Promise<User> {
    if (!userData.password) {
      // Consider throwing a BadRequestException or similar here
      // For now, just preventing the hash call with undefined
      throw new Error('Password is required to create a user.');
    }
    const saltRounds = 10; // Store salt rounds in config later
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    
    // Create a new user entity instance
    const newUser = new User();
    Object.assign(newUser, userData); // Assign provided data
    newUser.password = hashedPassword; // Set the hashed password

    // Save the new user entity
    return this.usersRepository.save(newUser);
  }
}
