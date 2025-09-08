// config/supabase.config.ts
import { registerAs } from '@nestjs/config';

export default registerAs('supabase', () => ({
  url: process.env.SUPABASE_URL,
  anonKey: process.env.SUPABASE_ANON_KEY,
  jwtSecret: process.env.SUPABASE_JWT_SECRET,
}));
