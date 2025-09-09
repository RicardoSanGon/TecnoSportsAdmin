/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class SupabaseGuard implements CanActivate {
  constructor(private supabaseService: SupabaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException('No token provided');

    try {
      // Verify the JWT token with Supabase
      const { data: user, error } = await this.supabaseService
        .getClient()
        .auth.getUser(token);

      if (error || !user?.user) {
        console.log('Supabase auth error:', error);
        throw new UnauthorizedException('Invalid token');
      }

      // For now, just check if user exists in Supabase
      // We'll handle role validation in the controllers
      request.user = {
        id: user.user.id,
        email: user.user.email,
        authUserId: user.user.id,
      };

      return true;
    } catch (error) {
      console.log('SupabaseGuard error:', error);
      throw new UnauthorizedException('Authentication failed');
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    // Try Authorization header first
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    if (type === 'Bearer' && token) {
      return token;
    }

    // Try query parameter
    const queryToken = request.query?.token;
    if (queryToken) {
      return queryToken;
    }

    // Try cookie
    const cookieToken = request.cookies?.authToken;
    if (cookieToken) {
      return cookieToken;
    }

    return undefined;
  }
}
