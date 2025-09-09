import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { env } from 'env';

@Controller(`${env.api_prefix}leaderboard`)
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Post()
  async create(@Body() createLeaderboardDto: any) {
    return await this.leaderboardService.create(createLeaderboardDto);
  }

  @Get()
  async findAll() {
    return await this.leaderboardService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.leaderboardService.findOne(id);
  }

  @Get('pool/:poolId')
  async findByPool(@Param('poolId') poolId: string) {
    return await this.leaderboardService.findByPool(+poolId);
  }

  @Get('pool/:poolId/calculate')
  async calculatePoolLeaderboard(@Param('poolId') poolId: string) {
    return await this.leaderboardService.calculatePoolLeaderboard(+poolId);
  }

  @Get('pool/:poolId/ranking')
  async getPoolLeaderboard(@Param('poolId') poolId: string): Promise<any> {
    return await this.leaderboardService.getPoolLeaderboard(+poolId);
  }

  @Post('update/prediction/:predictionId')
  async updateLeaderboardAfterPrediction(@Param('predictionId') predictionId: string) {
    return await this.leaderboardService.updateLeaderboardAfterPrediction(+predictionId);
  }

  @Post('update/match/:matchId')
  async updateLeaderboardAfterMatchResult(@Param('matchId') matchId: string) {
    return await this.leaderboardService.updateLeaderboardAfterMatchResult(+matchId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateLeaderboardDto: any) {
    return await this.leaderboardService.update(id, updateLeaderboardDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.leaderboardService.remove(id);
  }
}
