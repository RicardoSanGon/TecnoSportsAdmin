/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class SupabaseAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private supabaseService: SupabaseService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No bearer token found');
    }

    const token = authHeader.split(' ')[1];

    try {
      const { data, error } = await this.supabaseService
        .getClient()
        .auth.getUser(token);

      if (error || !data.user) {
        throw new UnauthorizedException('Invalid or expired token');
      }

      request.user = data.user; // Attach user information to the request
      return true;
    } catch {
      throw new UnauthorizedException('Authentication failed');
    }
  }
}
