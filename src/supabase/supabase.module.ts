import { Global, Module } from '@nestjs/common';
import { SupabaseService } from './supabase.service';
import supabaseConfig from '../config/supabase.config';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule.forFeature(supabaseConfig)],
  providers: [SupabaseService],
  exports: [SupabaseService],
})
export class SupabaseModule {}
