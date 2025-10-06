import { Injectable } from "@nestjs/common";
import { MediaEntity } from "./media.entity";

@Injectable()
export class MediaRepository {
    private mediaItems: MediaEntity[] = [];

    async create(user: MediaEntity) {
        this.mediaItems.push(user);
    }
}