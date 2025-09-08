/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
// auth/auth.controller.ts
import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SupabaseGuard } from './supabase.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() body: { email: string; password: string }) {
    return this.authService.signUp(body.email, body.password);
  }

  @Post('signin')
  async signIn(@Body() body: { email: string; password: string }) {
    return this.authService.signIn(body.email, body.password);
  }

  @UseGuards(SupabaseGuard)
  @Get('profile')
  async getProfile(@Req() req) {
    return await req.user;
  }

  @UseGuards(SupabaseGuard)
  @Post('signout')
  async signOut() {
    return this.authService.signOut();
  }
}
