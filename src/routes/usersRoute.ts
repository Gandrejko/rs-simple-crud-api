import { DEFAULT_HEADER } from '../constants/constants';
import { once } from 'events';
import { handlerProps } from 'handler';
import UserService from '../services/userService';
import { User } from '../types/types';
import { getId } from '../utils/getId';

const userService = new UserService();

export const userRoutes = {
  '/api/users:get': async ({ res }: handlerProps) => {
    try {
      const users = userService.allUsers();
      res.writeHead(200, DEFAULT_HEADER);
      res.write(JSON.stringify(users));
      res.end();
    } catch (err: any) {
      if (err.message === '404') {
        res.writeHead(404, DEFAULT_HEADER);
        res.write('Not found');
        res.end();
      }
    }
  },
  '/api/users:post': async ({ req, res }: handlerProps) => {
    const data = (await once(req, 'data')) as string[];
    const item = JSON.parse(data.join(''));
    try {
      const user: User = userService.addUser(item);
      res.writeHead(201, DEFAULT_HEADER);
      res.write('User has been added\n');
      res.write(JSON.stringify(user));
      res.end();
    } catch (err: any) {
      if (err.message === '400') {
        res.writeHead(400, DEFAULT_HEADER);
        res.write('The data is wrong (username, age or hobbies)');
        res.end();
      }
    }
  },

  '/api/users/{uuid}:get': async ({ req, res }: handlerProps) => {
    const id = getId('/api/users/', req);

    try {
      const user = userService.getById(id);
      res.writeHead(200, DEFAULT_HEADER);
      res.write(JSON.stringify(user));
      res.end();
    } catch (err: any) {
      if (err.message === '404') {
        res.writeHead(404, DEFAULT_HEADER);
        res.write('Not found');
        res.end();
      }
      if (err.message === '400') {
        res.writeHead(400, DEFAULT_HEADER);
        res.write('User ID is invalid');
        res.end();
      }
    }
  },

  '/api/users/{uuid}:delete': async ({ req, res }: handlerProps) => {
    const id = getId('/api/users/', req);

    try {
      userService.deleteUser(id);
      res.writeHead(200, DEFAULT_HEADER);
      res.write('User has been deleted');
      res.end();
    } catch (err: any) {
      if (err.message === '404') {
        res.writeHead(404, DEFAULT_HEADER);
        res.write('Not found');
        res.end();
      }
      if (err.message === '400') {
        res.writeHead(400, DEFAULT_HEADER);
        res.write('User ID is invalid');
        res.end();
      }
    }
  },

  '/api/users/{uuid}:put': async ({ req, res }: handlerProps) => {
    const id = getId('/api/users/', req);
    const data = (await once(req, 'data')) as string[];
    const item = JSON.parse(data.join(''));

    try {
      userService.updateUser(id, item);
      res.writeHead(200, DEFAULT_HEADER);
      res.write('User has been updated');
      res.end();
    } catch (err: any) {
      if (err.message === '404') {
        res.writeHead(404, DEFAULT_HEADER);
        res.write('Not found');
        res.end();
      }
      if (err.message === '400') {
        res.writeHead(400, DEFAULT_HEADER);
        res.write('User ID is invalid');
        res.end();
      }
    }
  },
};
