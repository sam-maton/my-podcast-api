import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDto } from './create-episode.dto';

@Controller('episodes')
export class EpisodesController {
  constructor(private episodesService: EpisodesService) {}
  @Get()
  findAll(@Query('sort') sort: 'asc' | 'desc' = 'desc') {
    return this.episodesService.findAll(sort);
  }

  @Get('featured')
  findFeatured() {
    return this.episodesService.findFeatured();
  }

  @Get(':id')
  findOneFeatured(@Param('id') id: string) {
    return this.episodesService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateEpisodeDto) {
    return this.episodesService.create(body);
  }
}
