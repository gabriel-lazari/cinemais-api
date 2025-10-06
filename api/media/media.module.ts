import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MediaController } from "./media.controller";
import { MediaRepository } from "./media.repository";
import { MediaService } from "./media.service";
import { MediaEntity } from "./media.entity";

@Module({
    imports: [TypeOrmModule.forFeature([MediaEntity])],
    controllers:[MediaController],
    providers: [MediaService, MediaRepository]
})

export class MediaModule {};