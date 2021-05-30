import { Module } from '@nestjs/common';
import { StaticDataController } from './static-data.controller';

@Module({
  controllers: [StaticDataController]
})
export class StaticDataModule {}
