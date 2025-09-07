import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
// import { env } from 'env';
import { UsersModule } from './api/users/users.module';
import { RolesModule } from './api/roles/roles.module';
import { ConfederationsModule } from './api/confederations/confederations.module';
import { TeamsModule } from './api/teams/teams.module';
import { MatchesModule } from './api/matches/matches.module';
import { PoolsModule } from './api/pools/pools.module';
import { PredictionsModule } from './api/predictions/predictions.module';
import { LeaderboardModule } from './api/leaderboard/leaderboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
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
    LeaderboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
