import { Module } from '@nestjs/common';
import { PoolsService } from './pools.service';
import { PoolsController } from './pools.controller';
import { Pool } from './entities/pool.entity';
import { User } from '../users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Pool, User])],
  controllers: [PoolsController],
  providers: [PoolsService],
  exports: [PoolsService],
})
export class PoolsModule {}
