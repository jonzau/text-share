import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { TextsModule } from './texts/texts.module';
import config from './config/keys';

@Module({
  imports: [TextsModule, MongooseModule.forRoot(config.mongoURI)],
  controllers: [AppController]
})
export class AppModule {}
