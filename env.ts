export const env = {
  port: parseInt(process.env.PORT || '3000', 10),

  api_prefix: 'api/',

  // supabase: {
  //   url: process.env.SUPABASE_URL || '',
  //   key: process.env.SUPABASE_KEY || '',
  // },

  database: {
    url: process.env.DATABASE_URL,
  },

  mongodb: {
    url: process.env.MONGO_URL,
  },
};
