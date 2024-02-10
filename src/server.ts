import 'dotenv/config';
import cluster from 'cluster';
import { handler } from './handler';
import http from 'http';
import { availableParallelism } from 'os';

const app = http.createServer(handler);

const port = Number(process.env.PORT) || 4000;

if (cluster.isPrimary) {
  const isMultiArgument = process?.argv.filter((element) =>
    element.startsWith('--isMulti'),
  )[0];
  const isMulti: boolean = isMultiArgument?.split('=')[1] === 'true';

  if (isMulti) {
    const numCPUs = availableParallelism();
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork({ PORT: (port + i).toString() });
    }

    cluster.on('exit', () => {
      cluster.fork({ PORT: port + Object.keys(cluster.workers || {}).length });
    });
  } else {
    cluster.fork({ port: port });
  }
} else {
  app.listen(port, () => {
    console.log(`App running on port ${port}...`);
  });
}
