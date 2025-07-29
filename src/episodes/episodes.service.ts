import { Injectable } from '@nestjs/common';
import { Episode } from './episode.entity';
import { CreateEpisodeDto } from './create-episode.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class EpisodesService {
  private episodes: Episode[] = [];

  findAll(sort: 'asc' | 'desc' = 'desc') {
    const sortAsc = (a: Episode, b: Episode) => (a.name > b.name ? 1 : -1);
    const sortDesc = (a: Episode, b: Episode) => (a.name < b.name ? 1 : -1);

    return sort === 'asc'
      ? this.episodes.sort(sortAsc)
      : this.episodes.sort(sortDesc);
  }

  findFeatured() {
    return this.episodes.filter((episode) => episode.featured);
  }

  findOne(id: string) {
    return this.episodes.find((episode) => episode.id === id);
  }

  create(createEpisodeDto: CreateEpisodeDto) {
    const newEpisode: Episode = { ...createEpisodeDto, id: randomUUID() };
    this.episodes.push(newEpisode);
    return newEpisode;
  }
}
