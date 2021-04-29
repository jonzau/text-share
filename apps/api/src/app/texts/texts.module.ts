import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TextSchema } from "./schemas/text.schema";
import { TextsController } from "./texts.controller";
import { TextsService } from "./texts.service";

@Module({
  imports: [MongooseModule.forFeature([{name: 'Text', schema: TextSchema}])],
  controllers: [TextsController],
  providers: [TextsService],
})
export class TextsModule {}
