import http from 'http';
import { app } from './app';
import { env } from './config/env';
import { connectDB } from './config/db';

async function start() {
  await connectDB();

  const server = http.createServer(app);
  server.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT} ✔`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});