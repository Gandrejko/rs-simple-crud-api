import { CreateUserDTO } from 'types/types';
import { validateUser } from '../validation/userValidation';
import UserRepository from '../repositories/userRepository';

export default class UserService {
  userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  allUsers() {
    return this.userRepository.getUsers();
  }

  getById(id: unknown) {
    if (!this.userRepository.getUserById(String(id))) throw new Error('404');

    return this.userRepository.getUserById(String(id));
  }

  addUser(data: { [key: string]: string | number | string[] }) {
    if (!validateUser(data)) throw new Error('400');
    return this.userRepository.createUser(data as CreateUserDTO);
  }

  updateUser(id: unknown, data: { [key: string]: string | number | string[] }) {
    if (!validateUser(data)) throw new Error('400');
    if (!this.userRepository.getUserById(String(id))) throw new Error('404');
    return this.userRepository.updateUser(String(id), data as CreateUserDTO);
  }

  deleteUser(id: unknown) {
    if (!this.userRepository.getUserById(String(id))) throw new Error('404');
    return this.userRepository.deleteUser(String(id));
  }
}
