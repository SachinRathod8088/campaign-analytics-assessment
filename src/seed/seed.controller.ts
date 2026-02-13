import { Controller, Get, Post } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed-data')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  /**
   * GET /seed-data
   * Allows easy triggering from browser
   */
  @Get()
  seedDataGet() {
    return this.seedService.generateSampleData();
  }

  /**
   * POST /seed-data
   * Assignment compliant endpoint
   */
  @Post()
  seedDataPost() {
    return this.seedService.generateSampleData();
  }
}
