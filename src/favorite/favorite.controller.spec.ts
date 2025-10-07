import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/create.favorite.dto';
import { FavoriteEntity } from './favorite.entity';

describe('FavoriteController', () => {
    let controller: FavoriteController;
    let service: jest.Mocked<FavoriteService>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [FavoriteController],
            providers: [
                {
                    provide: FavoriteService,
                    useValue: {
                        create: jest.fn(),
                        list: jest.fn(),
                        remove: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<FavoriteController>(FavoriteController);
        service = module.get(FavoriteService);
    });

    describe('create', () => {
        it('deve chamar o service.create com userId e dto', async () => {
            const dto: CreateFavoriteDto = { mediaId: 10 };
            await controller.create('1', dto);

            expect(service.create).toHaveBeenCalledWith(1, dto);
        });
    });

    describe('list', () => {
        it('deve retornar a lista de favoritos do service', async () => {
            const favorites: Partial<FavoriteEntity>[] = [
                { id: 1, user: { id: 1 } as any, media: { id: 10 } as any },
            ];

            service.list.mockResolvedValue(favorites as FavoriteEntity[]);

            const result = await controller.list('1');

            expect(service.list).toHaveBeenCalledWith(1);
            expect(result).toEqual(favorites);
        });
    });

    describe('remove', () => {
        it('deve chamar o service.remove com userId e mediaId', async () => {
            await controller.remove('1', '10');

            expect(service.remove).toHaveBeenCalledWith(1, 10);
        });
    });
});