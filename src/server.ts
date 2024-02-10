import 'dotenv/config';
import { handler } from './handler';
import http from 'http';

const app = http.createServer(handler);

const port = Number(process.env.PORT);
const host = process.env.HOST;

app.listen(port, host, () => {
  console.log(`App running on port ${port}...`);
});
