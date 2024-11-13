import * as path from 'path';
import * as fs from 'fs';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const httpsOptions = {
  key: fs.readFileSync(path.resolve(process.cwd(), '../https/nest-admin.key')),
  cert: fs.readFileSync(path.resolve(process.cwd(), '../https/nest-admin.pem')),
};

async function bootstrap() {
  const httpsApp = await NestFactory.create(AppModule, {
    cors: true,
    httpsOptions,
  });
  await httpsApp.listen(8000);

  const httpApp = await NestFactory.create(AppModule, {
    cors: true,
  });
  await httpApp.listen(8001);
}

bootstrap();
