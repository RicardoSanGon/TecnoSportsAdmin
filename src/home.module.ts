import { Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { SupabaseModule } from './supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [HomeController],
})
export class HomeModule {}
