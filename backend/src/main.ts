import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { configure } from 'serverless-express/handler'; // Import configure
import { NestExpressApplication } from '@nestjs/platform-express'; // Use Express platform

let cachedHandler;

// Function to bootstrap the NestJS application and configure the serverless handler
async function bootstrapServerless() {
  if (cachedHandler) {
    return cachedHandler;
  }
  // Create NestJS app instance with Express platform
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Enable shutdown hooks for graceful termination
  app.enableShutdownHooks();

  // Apply global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Initialize the NestJS application
  await app.init();

  // Get the underlying Express instance
  const expressApp = app.getHttpAdapter().getInstance();

  // Configure serverless-express handler
  cachedHandler = configure({ app: expressApp });
  return cachedHandler;
}

// Cloudflare Worker fetch handler
export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    // Get the configured serverless handler (bootstraps NestJS on first call)
    const handler = await bootstrapServerless();
    // Invoke the handler with the Cloudflare request and context
    // serverless-express should adapt the Request/Response objects
    // Note: serverless-express might expect event/context typical of Lambda.
    // Ensure compatibility or consider Cloudflare-specific adapters if issues arise.
    // Passing request and ctx directly might work depending on the adapter version.
    return handler(request, ctx);
  }
};
