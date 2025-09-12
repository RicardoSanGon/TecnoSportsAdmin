import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ConfederationsService } from './confederations.service';
import { CreateConfederationDto } from './dto/create-confederation.dto';
import { UpdateConfederationDto } from './dto/update-confederation.dto';
import { env } from 'env';
import { SupabaseAuthGuard } from 'src/supabase-auth/supabase-auth.guard';

@Controller(`${env.api_prefix}confederations`)
@UseGuards(SupabaseAuthGuard)
export class ConfederationsController {
  constructor(private readonly confederationsService: ConfederationsService) {}

  @Post()
  create(@Body() createConfederationDto: CreateConfederationDto) {
    return this.confederationsService.create(createConfederationDto);
  }

  @Get()
  findAll() {
    return this.confederationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.confederationsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateConfederationDto: UpdateConfederationDto,
  ) {
    return this.confederationsService.update(+id, updateConfederationDto);
  }
}
