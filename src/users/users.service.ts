import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { db } from '../index';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';

export type User = {
  userId: number;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    const salt = bcrypt.genSaltSync(10);
    const hashed = await bcrypt.hash(createUserDto.password, salt);

    const user: typeof users.$inferInsert = {
      username: createUserDto.username,
      password: hashed,
    };

    const inserted = await db.insert(users).values(user).returning();
    return inserted;
  }

  async findByUsername(username: string) {
    return await db.select().from(users).where(eq(users.username, username));
  }
}
