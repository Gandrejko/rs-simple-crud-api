import 'dotenv/config';
import http from 'http';

const app = http.createServer();

const port = Number(process.env.PORT);
const host = process.env.HOST;

app.listen(port, host, () => {
  console.log(`App running on port ${port}...`);
});
