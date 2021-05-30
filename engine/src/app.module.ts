import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { StaticDataModule } from './static-data/static-data.module';

@Module({
  imports: [ConfigModule, StaticDataModule],
  controllers: [],
})
export class AppModule {}
