import { IncomingMessage } from 'node:http';

export const getId = (path: string, req: IncomingMessage): string => {
  return (req.url as string).toLowerCase().replace(path, '');
};
