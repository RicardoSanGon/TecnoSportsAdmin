import { Module } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { LeaderboardController } from './leaderboard.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Leaderboard, LeaderboardSchema } from './schemas/leaderboard.schema';
import { Pool } from '../pools/entities/pool.entity';
import { Prediction } from '../predictions/entities/prediction.entity';
import { User } from '../users/entities/user.entity';
import { Match } from '../matches/entities/match.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Leaderboard.name, schema: LeaderboardSchema },
    ]),
    TypeOrmModule.forFeature([Pool, Prediction, User, Match]),
  ],
  controllers: [LeaderboardController],
  providers: [LeaderboardService],
})
export class LeaderboardModule {}
