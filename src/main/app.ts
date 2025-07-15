import express, { Application } from 'express';
import cors from 'cors';

export class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.setupMiddlewares();
    this.getApp();
  }

  private setupMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(cors());
  }

  public getApp(): Application {
    return this.app;
  }
}

export default new App().getApp();
