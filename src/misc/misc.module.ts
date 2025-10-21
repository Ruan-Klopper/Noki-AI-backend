import { Module } from "@nestjs/common";
import { MiscController } from "./misc.controller";
import { MiscService } from "./misc.service";
import { PrismaModule } from "../database/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [MiscController],
  providers: [MiscService],
  exports: [MiscService],
})
export class MiscModule {}
