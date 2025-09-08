/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// auth/auth.controller.ts
import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SupabaseGuard } from './supabase.guard';
import { CreateUserDto } from 'src/api/users/dto/create-user.dto';
import { found, ok } from 'src/utils/Responses';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() body: CreateUserDto) {
    return ok(await this.authService.signUp(body));
  }

  @Post('signin')
  async signIn(@Body() body: { email: string; password: string }) {
    return this.authService.signIn(body.email, body.password);
  }

  @UseGuards(SupabaseGuard)
  @Get('profile')
  async getProfile(@Req() req) {
    return found(
      'Profile',
      await this.authService.getUserProfile(req.user.authUserId),
    );
  }

  @UseGuards(SupabaseGuard)
  @Post('signout')
  async signOut() {
    return this.authService.signOut();
  }
}
