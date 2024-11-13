declare module 'json-server' {
  import { Application, RequestHandler } from 'express';

  interface JsonServerOptions {
    static?: string;
    readonly?: boolean;
    bodyParser?: boolean;
    noCors?: boolean;
    logger?: boolean;
  }

  interface JsonServer {
    create: () => Application;
    defaults: (options?: JsonServerOptions) => RequestHandler[];
    router: (source: string) => RequestHandler;
  }

  const jsonServer: JsonServer;
  export = jsonServer;
} 