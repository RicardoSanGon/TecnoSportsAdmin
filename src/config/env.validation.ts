/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as Joi from 'joi';

export const validationSchema = Joi.object({
  SUPABASE_URL: Joi.string().required(),
  SUPABASE_ANON_KEY: Joi.string().required(),
  SUPABASE_JWT_SECRET: Joi.string().required(),
});
