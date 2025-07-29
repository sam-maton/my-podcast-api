import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDto } from './create-episode.dto';
import { ConfigService } from '../config/config.service';
import { IsPositivePipe } from '../pipes/is-positive/is-positive.pipe';

@Controller('episodes')
export class EpisodesController {
  constructor(
    private episodesService: EpisodesService,
    private configService: ConfigService,
  ) {}
  @Get()
  findAll(
    @Query('sort') sort: 'asc' | 'desc' = 'desc',
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe, IsPositivePipe)
    limit: number = 10,
  ) {
    console.log(limit);
    return this.episodesService.findAll(sort);
  }

  @Get('featured')
  findFeatured() {
    return this.episodesService.findFeatured();
  }

  @Get(':id')
  findOneFeatured(@Param('id') id: string) {
    const episode = this.episodesService.findOne(id);
    if (!episode) {
      throw new HttpException('Episode not found', HttpStatus.NOT_FOUND);
    }
    return episode;
  }

  @Post()
  create(@Body(ValidationPipe) body: CreateEpisodeDto) {
    const newEpisode = this.episodesService.create(body);
    return newEpisode;
  }
}
