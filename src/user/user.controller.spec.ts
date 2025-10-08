import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UserEntity } from './user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UserController', () => {
    let controller: UserController;
    let service: jest.Mocked<UserService>;

    beforeEach(async () => {
        const serviceMock: Partial<jest.Mocked<UserService>> = {
            create: jest.fn(),
            list: jest.fn(),
            findById: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [{ provide: UserService, useValue: serviceMock }],
        }).compile();

        controller = module.get<UserController>(UserController);
        service = module.get(UserService);
    });

    describe('create()', () => {
        it('deve chamar o service e retornar o usuário criado', async () => {
            const dto: CreateUserDto = { name: 'Usuário Teste' };
            const user: UserEntity = {
                id: 1,
                uuid: 'uuid-1',
                name: 'Usuário Teste',
                is_active: true,
                created_at: new Date(),
                updated_at: new Date(),
            };

            service.create.mockResolvedValue(user);

            const result = await controller.create(dto);

            expect(result).toEqual(user);
            expect(service.create).toHaveBeenCalledWith(dto);
        });
    });

    describe('list()', () => {
        it('deve retornar a lista de usuários', async () => {
            const users: UserEntity[] = [
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
                    updated_at: new Date(),
                },
            ];

            service.list.mockResolvedValue(users);

            const result = await controller.list();

            expect(result).toEqual(users);
            expect(service.list).toHaveBeenCalled();
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

            service.findById.mockResolvedValue(user);

            const result = await controller.findById('1');

            expect(result).toEqual(user);
            expect(service.findById).toHaveBeenCalledWith(1);
        });

        it('deve propagar NotFoundException lançado pelo service', async () => {
            service.findById.mockRejectedValue(
                new NotFoundException('Usuário com id 999 não encontrada'),
            );

            await expect(controller.findById('999')).rejects.toThrow(NotFoundException);
        });
    });
});
