import { Injectable, Inject } from '@nestjs/common';
import * as config from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import supabaseConfig from '../config/supabase.config';

type SupabaseClientType = SupabaseClient<any, 'public', any>;

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClientType;

  constructor(
    @Inject(supabaseConfig.KEY)
    private config: config.ConfigType<typeof supabaseConfig>,
  ) {
    if (!this.config.url || !this.config.anonKey) {
      throw new Error('Supabase configuration is incomplete');
    }

    this.supabase = createClient(
      this.config.url,
      this.config.anonKey,
    ) as SupabaseClientType;
  }

  getClient(): SupabaseClientType {
    return this.supabase;
  }
}
