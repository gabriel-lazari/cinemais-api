import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteService } from './favorite.service';
import { UserRepository } from '../user/user.repository';
import { MediaRepository } from '../media/media.repository';
import { FavoriteRepository } from './favorite.repository';
import { CreateFavoriteDto } from './dto/create.favorite.dto';
import { FavoriteEntity } from './favorite.entity';
import { NotFoundException, ConflictException } from '@nestjs/common';

describe('FavoriteService', () => {
    let service: FavoriteService;
    let userRepo: jest.Mocked<UserRepository>;
    let mediaRepo: jest.Mocked<MediaRepository>;
    let favoriteRepo: jest.Mocked<FavoriteRepository>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FavoriteService,
                { provide: UserRepository, useValue: { findById: jest.fn() } },
                { provide: MediaRepository, useValue: { findById: jest.fn() } },
                {
                    provide: FavoriteRepository,
                    useValue: {
                        existFavorite: jest.fn(),
                        create: jest.fn(),
                        list: jest.fn(),
                        remove: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<FavoriteService>(FavoriteService);
        userRepo = module.get(UserRepository);
        mediaRepo = module.get(MediaRepository);
        favoriteRepo = module.get(FavoriteRepository);
    });

    describe('create()', () => {
        const dto: CreateFavoriteDto = { mediaId: 10 };

        it('deve criar um favorito com sucesso', async () => {
            userRepo.findById.mockResolvedValue({ id: 1 } as any);
            mediaRepo.findById.mockResolvedValue({ id: 10 } as any);
            favoriteRepo.existFavorite.mockResolvedValue(false);

            await service.create(1, dto);

            expect(userRepo.findById).toHaveBeenCalledWith(1);
            expect(mediaRepo.findById).toHaveBeenCalledWith(10);
            expect(favoriteRepo.existFavorite).toHaveBeenCalledWith(1, 10);
            expect(favoriteRepo.create).toHaveBeenCalledWith(1, dto);
        });

        it('deve lançar NotFoundException se usuário não existir', async () => {
            userRepo.findById.mockResolvedValue(null);

            await expect(service.create(1, dto))
                .rejects.toThrow(new NotFoundException('Usuário 1 não existe'));
        });

        it('deve lançar NotFoundException se mídia não existir', async () => {
            userRepo.findById.mockResolvedValue({ id: 1 } as any);
            mediaRepo.findById.mockResolvedValue(null);

            await expect(service.create(1, dto))
                .rejects.toThrow(new NotFoundException('Mídia com id 10 não encontrada no catálogo'));
        });

        it('deve lançar ConflictException se já for favorito', async () => {
            userRepo.findById.mockResolvedValue({ id: 1 } as any);
            mediaRepo.findById.mockResolvedValue({ id: 10 } as any);
            favoriteRepo.existFavorite.mockResolvedValue(true);

            await expect(service.create(1, dto))
                .rejects.toThrow(new ConflictException('Essa mídia com id 10 já é um favorito'));
        });
    });

    describe('list()', () => {
        it('deve retornar lista de favoritos', async () => {
            const favorites: FavoriteEntity[] = [
                { id: 1, uuid: 'uuid-1' } as any,
                { id: 2, uuid: 'uuid-2' } as any,
            ];
            favoriteRepo.list.mockResolvedValue(favorites);

            const result = await service.list(1);

            expect(result).toEqual(favorites);
            expect(favoriteRepo.list).toHaveBeenCalledWith(1);
        });
    });

    describe('remove()', () => {
        it('deve remover favorito existente', async () => {
            favoriteRepo.existFavorite.mockResolvedValue(true);

            await service.remove(1, 10);

            expect(favoriteRepo.existFavorite).toHaveBeenCalledWith(1, 10);
            expect(favoriteRepo.remove).toHaveBeenCalledWith(1, 10);
        });

        it('deve lançar NotFoundException se favorito não existir', async () => {
            favoriteRepo.existFavorite.mockResolvedValue(false);

            await expect(service.remove(1, 10))
                .rejects.toThrow(new NotFoundException('Não existe mídia 10 como favorito'));
        });
    });
});