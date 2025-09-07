import { Module } from '@nestjs/common';
import { PredictionsService } from './predictions.service';
import { PredictionsController } from './predictions.controller';
import { Prediction } from './entities/prediction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Prediction])],
  controllers: [PredictionsController],
  providers: [PredictionsService],
})
export class PredictionsModule {}
