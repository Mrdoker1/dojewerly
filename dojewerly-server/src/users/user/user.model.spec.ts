import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './user.model';
import { Model } from 'mongoose';

describe('UserModel', () => {
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken('User'),
          useValue: {
            // Методы модели, которые вы хотите протестировать
            // Например, findOne, create, update и т.д.
          },
        },
      ],
    }).compile();

    userModel = module.get<Model<User>>(getModelToken('User'));
  });

  it('should be defined', () => {
    expect(userModel).toBeDefined();
  });

  // Добавьте дополнительные тестовые случаи для вашей модели пользователя
});
