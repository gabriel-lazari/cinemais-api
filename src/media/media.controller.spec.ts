import { Test, TestingModule } from '@nestjs/testing';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create.media.dto';
import { MediaEntity } from './media.entity';
import { NotFoundException } from '@nestjs/common';
import { MediaType } from './domain/media-type.enum';

describe('MediaController', () => {
    let controller: MediaController;
    let service: jest.Mocked<MediaService>;

    beforeEach(async () => {
        const serviceMock: Partial<jest.Mocked<MediaService>> = {
            create: jest.fn(),
            list: jest.fn(),
            findById: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [MediaController],
            providers: [{ provide: MediaService, useValue: serviceMock }],
        }).compile();

        controller = module.get<MediaController>(MediaController);
        service = module.get(MediaService);
    });

    describe('create()', () => {
        it('deve chamar o service e retornar a mídia criada', async () => {
            const dto: CreateMediaDto = {
                title: 'Mídia Teste',
                description: 'Descrição da mídia',
                type: MediaType.MOVIE,
                releaseYear: 2022,
                genre: 'Ação',
            };

            const media: MediaEntity = {
                id: 1,
                uuid: 'uuid-1',
                ...dto,
                is_active: true,
                created_at: new Date(),
                updated_at: new Date(),
            };

            service.create.mockResolvedValue(media);

            const result = await controller.create(dto);

            expect(result).toEqual(media);
            expect(service.create).toHaveBeenCalledWith(dto);
        });
    });

    describe('list()', () => {
        it('deve retornar a lista de mídias', async () => {
            const medias: MediaEntity[] = [
                {
                    id: 1,
                    uuid: 'uuid-1',
                    title: 'Mídia 1',
                    description: 'Descrição 1',
                    type: MediaType.MOVIE,
                    releaseYear: 2020,
                    genre: 'Ação',
                    is_active: true,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: 2,
                    uuid: 'uuid-2',
                    title: 'Mídia 2',
                    description: 'Descrição 2',
                    type: MediaType.SERIES,
                    releaseYear: 2021,
                    genre: 'Drama',
                    is_active: true,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ];

            service.list.mockResolvedValue(medias);

            const result = await controller.list();

            expect(result).toEqual(medias);
            expect(service.list).toHaveBeenCalled();
        });
    });

    describe('findById()', () => {
        it('deve retornar uma mídia existente', async () => {
            const media: MediaEntity = {
                id: 1,
                uuid: 'uuid-1',
                title: 'Mídia 1',
                description: 'Descrição 1',
                type: MediaType.MOVIE,
                releaseYear: 2020,
                genre: 'Ação',
                is_active: true,
                created_at: new Date(),
                updated_at: new Date(),
            };

            service.findById.mockResolvedValue(media);

            const result = await controller.findById('1');

            expect(result).toEqual(media);
            expect(service.findById).toHaveBeenCalledWith(1);
        });

        it('deve propagar NotFoundException lançado pelo service', async () => {
            service.findById.mockRejectedValue(
                new NotFoundException('Mídia com id 999 não encontrada'),
            );

            await expect(controller.findById('999')).rejects.toThrow(NotFoundException);
        });
    });
});
