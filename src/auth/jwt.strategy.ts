/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import type { ConfigType } from '@nestjs/config';
import { SupabaseService } from '../supabase/supabase.service';
import supabaseConfig from '../config/supabase.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private supabaseService: SupabaseService,
    @Inject(supabaseConfig.KEY)
    private config: ConfigType<typeof supabaseConfig>,
  ) {
    // Validar que el secret existe
    const jwtSecret = config.jwtSecret;
    if (!jwtSecret) {
      throw new Error('JWT Secret is required');
    }

    // Definir opciones con tipado explícito
    const options: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret, // Ya sabemos que no es undefined
    };

    super(options);
  }

  async validate(payload: any) {
    try {
      const {
        data: { user },
        error,
      } = await this.supabaseService.getClient().auth.getUser(payload.sub);

      if (error || !user) {
        throw new UnauthorizedException('Invalid token');
      }

      return user;
    } catch {
      throw new UnauthorizedException('Token validation failed');
    }
  }
}
