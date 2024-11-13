import jsonServer from "json-server";
import { Request, Response, NextFunction } from "express";
import path from "path";

const server = jsonServer.create();
const router = jsonServer.router(path.join(process.cwd(), "db.json"));
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use((req: Request, res: Response, next: NextFunction) => {
  const allowedOrigins = [
    "http://localhost:5173",
  ];
  const origin = req.headers.origin;
  
  if (origin && allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

server.use(router);

export default server;


// import jsonServer from "json-server";
// import { Request, Response, NextFunction } from "express";

// const server = jsonServer.create();
// const router = jsonServer.router("db.json");
// const middlewares = jsonServer.defaults();
// const port = process.env.PORT || 3000;

// server.use(middlewares);

// server.use((req: Request, res: Response, next: NextFunction) => {
//   const allowedOrigins = ["http://localhost:5173"];
//   const origin = req.headers.origin;

//   if (origin && allowedOrigins.includes(origin)) {
//     res.header("Access-Control-Allow-Origin", origin);
//   }
//   res.header("Access-Control-Allow-Headers", "*");
//   res.header("Access-Control-Allow-Methods", "*");
//   next();
// });

// server.use(router);

// server.listen(port, () => {
//   // Check if we're in Docker environment
//   const isDocker = process.env.DOCKER === "true";

//   const baseUrl = isDocker
//     ? `http://localhost:${port}` // Docker development
//     : process.env.PORT
//     ? "https://seller-dashboard-backend.onrender.com" // Production on Render
//     : `http://localhost:${port}`; // Local development

//   console.log(`JSON Server is running at: ${baseUrl}`);
//   console.log(`Try ${baseUrl}/advertisements to see your data`);
// });
