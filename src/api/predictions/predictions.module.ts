import { Module } from '@nestjs/common';
import { PredictionsService } from './predictions.service';
import { PredictionsController } from './predictions.controller';
import { Prediction } from './entities/prediction.entity';
import { User } from '../users/entities/user.entity';
import { Pool } from '../pools/entities/pool.entity';
import { Match } from '../matches/entities/match.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Prediction, User, Pool, Match])],
  controllers: [PredictionsController],
  providers: [PredictionsService],
  exports: [PredictionsService],
})
export class PredictionsModule {}
