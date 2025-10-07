// src/users/user.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.user.dto';

describe('UserService', () => {
    let service: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserService],
        }).compile();

        service = module.get<UserService>(UserService);
    });

    it('deve estar definido', () => {
        expect(service).toBeDefined();
    });

    it('deve criar um usuário', () => {
        const dto: CreateUserDto = {
            name: 'Usuário 1'
        };

        const result = service.create(dto);

        expect(result).toHaveProperty('id');
    });

    it('deve listar usuários', async () => {
        await service.create({ name: 'Usuário 1' });
        await service.create({ name: 'Usuário 2' });

        const users = await service.list();

        expect(users).toHaveLength(2);
        expect(users.map(u => u.name)).toEqual(['Usuário 1', 'Usuário 2']);
    });

    //   it('deve buscar um usuário pelo id', () => {
    //     const created = service.create({ name: 'User', email: 'u@email.com', password: '123456' });

    //     const found = service.findOne(created.id);
    //     expect(found).toBeDefined();
    //     expect(found?.id).toBe(created.id);
    //   });
});