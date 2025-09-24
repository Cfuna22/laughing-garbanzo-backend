import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Users } from 'src/db/schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('DRIZZLE')
    private db: NodePgDatabase<typeof import('src/db/schema')>,
  ) {}

  // Get all Users
  async findAll() {
    return await this.db.select().from(Users);
  }

  // User by Id
  async findOneById(id: string) {
    const user = await this.db.select().from(Users).where(eq(Users.id, id));
    if (!user) {
      throw new BadRequestException('User does not exist');
    }
    return user;
  }

  // create a new user
  async createUser(data: CreateUserDto) {
    const [user] = await this.db
      .insert(Users)
      .values({
        supabaseId: data.supabaseId,
        name: data.name,
        email: data.email,
        role: data.role ?? 'customer',
        phone: Number(data.phone),
      })
      .returning();

    return user;
  }

  // update user
  async updateUser(id: string, data: UpdateUserDto) {
    const [user] = await this.db
      .update(Users)
      .set(data)
      .where(eq(Users.id, id))
      .returning();

    return user;
  }

  // delete user
  async deleteUser(id: string) {
    const [user] = await this.db
      .delete(Users)
      .where(eq(Users.id, id))
      .returning();

    return user;
  }
}
