import { Module } from '@nestjs/common';
import { ConfederationsService } from './confederations.service';
import { ConfederationsController } from './confederations.controller';
import { Confederation } from './entities/confederation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Confederation])],
  controllers: [ConfederationsController],
  providers: [ConfederationsService],
})
export class ConfederationsModule {}
