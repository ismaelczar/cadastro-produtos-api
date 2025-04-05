import { Router } from 'express';
import { UsersController } from '../controllers/usersController';
import { UserRepository } from '../repositories/users/usersRepository';

export const usersRouter = Router();

const userRepository = new UserRepository();
const usersController = new UsersController(userRepository);

usersRouter.get('/', async (req, res): Promise<any> => {
  const { body, statusCode } = await usersController.getUsers();

  return res.status(statusCode).json({
    // status: 'sucess',
    data: body,
  });
});

usersRouter.post('/', async (req, res): Promise<any> => {
  const user = req.body;
  const { body, statusCode } = await usersController.createUser(user);

  return res.status(statusCode).json({
    // status: '',
    //TODO: Remover a senha do usuário retornado.
    data: body,
  });
});

usersRouter.patch('/:id', async (req, res): Promise<any> => {
  const { id } = req.params;
  const { newPassword } = req.body;

  const { body, statusCode } = await usersController.updatePassword(
    id,
    newPassword,
  );
  return res.status(statusCode).json({
    data: body,
  });
});

usersRouter.delete('/:id', async (req, res): Promise<any> => {
  const { id } = req.params;

  const { body, statusCode } = await usersController.remove(id);

  return res.status(statusCode).json({
    data: body,
  });
});
