import 'reflect-metadata'; // Required for tsyringe
import express from 'express';
import { registerDependencies } from '@shared/container';
import authRoutes from '@modules/user/routes/v1/AuthRoute'
import { createUserRoutes } from '@modules/user/routes/v1/UserRoute'; 
import { errorHandler, notFoundHandler } from '@/shared/infrastructure/middleware/ErrorHandler';

export class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.configure();
  }

  private configure(): void {
    // Register dependencies first
    registerDependencies();

    // Middleware
    this.app.use(express.json());

    // Routes
    this.app.use('/api/v1/auth', authRoutes);
    this.app.use('/api/v1/users', createUserRoutes());

    // Error handling middleware last
    this.app.use(notFoundHandler);
    this.app.use(errorHandler);
  }
}