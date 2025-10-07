import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create.user.dto';
import { UserEntity } from './user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UserService', () => {
    let service: UserService;
    let repo: Partial<jest.Mocked<UserRepository>>;

    beforeEach(async () => {
        repo = {
            create: jest.fn().mockImplementation((dto: CreateUserDto) => ({
                id: 1,
                uuid: 'fixed-uuid',
                name: dto.name,
                is_active: true,
                created_at: new Date(),
                updated_at: new Date(),
            })),
            list: jest.fn().mockResolvedValue([
                {
                    id: 1,
                    uuid: 'uuid-1',
                    name: 'Usuário 1',
                    is_active: true,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: 2,
                    uuid: 'uuid-2',
                    name: 'Usuário 2',
                    is_active: true,
                    created_at: new Date(),
                    updated_at: new Date()
                }
            ]),
            findById: jest.fn()
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                { provide: UserRepository, useValue: repo }
            ],
        }).compile();

        service = module.get<UserService>(UserService);
    });

    describe('create()', () => {
        it('deve criar um usuário', async () => {
            const dto: CreateUserDto = { name: 'Usuário 1' };

            const result = await service.create(dto);

            expect(result).toHaveProperty('id', 1);
            expect(result.name).toBe('Usuário 1');
            expect(repo.create).toHaveBeenCalledWith(dto);
        });
    });

    describe('list()', () => {
        it('deve retornar a lista de usuários', async () => {
            const result = await service.list();

            expect(result).toHaveLength(2);
            expect(result.map(u => u.name)).toEqual(['Usuário 1', 'Usuário 2']);
            expect(repo.list).toHaveBeenCalled();
        });
    });

    describe('findById()', () => {
        it('deve retornar um usuário existente', async () => {
            const user: UserEntity = {
                id: 1,
                uuid: 'uuid-1',
                name: 'Usuário 1',
                is_active: true,
                created_at: new Date(),
                updated_at: new Date(),
            };
            (repo.findById as jest.Mock).mockResolvedValue(user);

            const result = await service.findById(1);

            expect(result).toEqual(user);
            expect(repo.findById).toHaveBeenCalledWith(1);
        });

        it('deve lançar NotFoundException se o usuário não existir', async () => {
            (repo.findById as jest.Mock).mockResolvedValue(null);

            await expect(service.findById(999))
                .rejects.toThrow(new NotFoundException('Usuário com id 999 não encontrada'));
        });
    });
});