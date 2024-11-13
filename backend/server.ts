import jsonServer from 'json-server';
import { Request, Response, NextFunction } from 'express';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.use(middlewares);

// Add CORS headers
server.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});

server.use(router);

server.listen(port, () => {
  // Check if we're in Docker environment
  const isDocker = process.env.DOCKER === 'true';
  
  const baseUrl = isDocker ? 
    `http://localhost:${port}` : // Docker development
    process.env.PORT ? 
      'https://seller-dashboard-backend.onrender.com' : // Production on Render
      `http://localhost:${port}`; // Local development
      
  console.log(`JSON Server is running at: ${baseUrl}`);
  console.log(`Try ${baseUrl}/advertisements to see your data`);
});