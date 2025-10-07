import { Test, TestingModule } from '@nestjs/testing';
import { MediaService } from './media.service';
import { MediaRepository } from './media.repository';
import { CreateMediaDto } from './dto/create.media.dto';
import { MediaEntity } from './media.entity';
import { NotFoundException } from '@nestjs/common';
import { MediaType } from './domain/media-type.enum';

describe('MediaService', () => {
  let service: MediaService;
  let repo: Partial<jest.Mocked<MediaRepository>>;

  beforeEach(async () => {
    repo = {
      create: jest.fn().mockImplementation((dto: CreateMediaDto) => ({
        id: 1,
        uuid: 'fixed-uuid',
        title: dto.title,
        description: dto.description,
        type: dto.type,
        releaseYear: dto.releaseYear,
        genre: dto.genre,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      })),
      list: jest.fn().mockResolvedValue([
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
      ]),
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MediaService,
        { provide: MediaRepository, useValue: repo },
      ],
    }).compile();

    service = module.get<MediaService>(MediaService);
  });

  describe('create()', () => {
    it('deve criar uma mídia com todos os campos obrigatórios', async () => {
      const dto: CreateMediaDto = {
        title: 'Mídia Teste',
        description: 'Descrição da mídia',
        type: MediaType.MOVIE,
        releaseYear: 2022,
        genre: 'Ação',
      };

      const result = await service.create(dto);

      expect(result).toHaveProperty('id', 1);
      expect(result).toHaveProperty('uuid', 'fixed-uuid');
      expect(result.title).toBe('Mídia Teste');
      expect(result.description).toBe('Descrição da mídia');
      expect(result.type).toBe(MediaType.MOVIE);
      expect(result.releaseYear).toBe(2022);
      expect(result.genre).toBe('Ação');
      expect(repo.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('list()', () => {
    it('deve retornar a lista de mídias', async () => {
      const result = await service.list();

      expect(result).toHaveLength(2);
      expect(result.map(m => m.title)).toEqual(['Mídia 1', 'Mídia 2']);
      expect(repo.list).toHaveBeenCalled();
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
        updated_at: new Date()
      };
      (repo.findById as jest.Mock).mockResolvedValue(media);

      const result = await service.findById(1);

      expect(result).toEqual(media);
      expect(repo.findById).toHaveBeenCalledWith(1);
    });

    it('deve lançar NotFoundException se a mídia não existir', async () => {
      (repo.findById as jest.Mock).mockResolvedValue(null);

      await expect(service.findById(999))
        .rejects.toThrow(new NotFoundException('Mídia com id 999 não encontrada'));
    });
  });
});