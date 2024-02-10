import { IncomingMessage, ServerResponse } from 'http';
import { userRoutes } from './routes/usersRoute';
import { parse } from 'url';

export type handlerProps = {
  req: IncomingMessage;
  res: ServerResponse<IncomingMessage>;
};

type allRoutesTypes = {
  [key: string]: ({ req, res }: handlerProps) => void;
  default: ({ res }: handlerProps) => void;
};

const allRoutes: allRoutesTypes = {
  ...userRoutes,
  default: ({ res }: handlerProps) => {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.write('Unknown request. Please try another one');
    res.end();
  },
};

export const handler = (req: IncomingMessage, res: ServerResponse) => {
  const { url, method } = req;
  const { pathname } = parse(url || '', true);
  const uuid = pathname?.replace('/api/users', '');
  const key = `${uuid ? '/api/users/{uuid}' : pathname}:${method?.toLowerCase()}`;
  const chosen = allRoutes[key] || allRoutes.default;
  return Promise.resolve(chosen({ req, res })).catch(handlerError(res));
};

const handlerError = (response: ServerResponse) => {
  return (error: Error) => {
    console.log("Here's some errors", error.stack);
    response.writeHead(500, { 'Content-Type': 'application/json' });
    response.write(
      JSON.stringify({
        error: 'Server error!',
      }),
    );
  };
};
