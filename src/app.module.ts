import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './api/users/users.module';
import { RolesModule } from './api/roles/roles.module';
import { ConfederationsModule } from './api/confederations/confederations.module';
import { TeamsModule } from './api/teams/teams.module';
import { MatchesModule } from './api/matches/matches.module';
import { PoolsModule } from './api/pools/pools.module';
import { PredictionsModule } from './api/predictions/predictions.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SupabaseModule } from './supabase/supabase.module';
import supabaseConfig from './config/supabase.config';
import { validationSchema } from './config/env.validation';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [supabaseConfig],
      isGlobal: true,
      validationSchema,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL ? process.env.MONGO_URL : ''),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL, // 👈 tomamos todo del .env
      autoLoadEntities: true,
      synchronize: true,
      extra: {
        ssl: {
          rejectUnauthorized: false, // ⚡ ignora el certificado autofirmado
        },
      },
    }),
    UsersModule,
    RolesModule,
    ConfederationsModule,
    TeamsModule,
    MatchesModule,
    PoolsModule,
    PredictionsModule,
    SupabaseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
