import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from '../auth.service';
import { UserProfile } from './auth.types';
import { CreateStaffOrAdminInput } from '../dto/auth.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // Admin mutation
  @Mutation(() => UserProfile)
  async createStaffOrAdmin(
    @Args('data') data: CreateStaffOrAdminInput,
  ): Promise<UserProfile> {
    const result = await this.authService.createStaffOrAdmin(data);
    return result.profile;
  }

  // Current user query
  @Query(() => UserProfile, { nullable: true })
  async me(@Args('supabaseId') supabaseId: string) {
    return this.authService.me(supabaseId);
  }
}
