import { v4 } from 'uuid';
import { CreateUserDTO, User } from '../types/types';

export default class UserRepository {
  db: User[];
  constructor() {
    this.db = [];
  }

  getUsers() {
    return this.db;
  }

  getUserById(id: string): User | null {
    return this.db.find((user) => user.id === id) || null;
  }

  createUser(data: CreateUserDTO) {
    const newUser = {
      id: v4(),
      username: data.username,
      age: data.age,
      hobbies: data.hobbies,
    };
    this.db.push(newUser);

    return newUser;
  }

  updateUser(id: string, data: CreateUserDTO) {
    const userIndex = this.db.findIndex((user) => user.id === id);
    if (userIndex === -1) return null;
    this.db[userIndex] = {
      id: id,
      username: data.username,
      age: data.age,
      hobbies: data.hobbies,
    };

    return this.db[userIndex];
  }

  deleteUser(id: string) {
    const userIndex = this.db.findIndex((user) => user.id === id);
    if (userIndex === -1) return null;

    const deletedUser = this.db[userIndex];
    this.db.splice(userIndex, 1);

    return deletedUser;
  }
}
