export const env = {
  port: parseInt(process.env.PORT || '3000', 10),

  supabase: {
    url: process.env.SUPABASE_URL || '',
    key: process.env.SUPABASE_KEY || '',
  },

  database: {
    url: process.env.DATABASE_URL,
    host: process.env.SUPABASE_DB_HOST || 'localhost',
    port: parseInt(process.env.SUPABASE_DB_PORT || '5432', 10),
    username: process.env.SUPABASE_DB_USER || 'postgres',
    password: process.env.SUPABASE_DB_PASS || '',
    name: process.env.SUPABASE_DB_NAME || 'postgres',
  },
};
