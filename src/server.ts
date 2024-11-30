import 'reflect-metadata';
import 'dotenv/config';
import { App } from '@config/app';

async function bootstrap() {
  const app = new App();
  const port = process.env.PORT || 3000;

  app.app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

bootstrap().catch(console.error);