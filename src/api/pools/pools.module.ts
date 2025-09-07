import { Module } from '@nestjs/common';
import { PoolsService } from './pools.service';
import { PoolsController } from './pools.controller';
import { Pool } from './entities/pool.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Pool])],
  controllers: [PoolsController],
  providers: [PoolsService],
})
export class PoolsModule {}
