import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  //allow only in development
  app.enableCors();
  await app.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
  });
}
bootstrap();
