// This is a Cloudflare Worker that integrates with your NestJS application

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

let app;

// Initialize the NestJS application
async function bootstrap() {
  if (!app) {
    app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }));
    await app.init();
  }
  return app;
}

export default {
  async fetch(request, env, ctx) {
    try {
      // Initialize NestJS application
      const nestApp = await bootstrap();
      const httpAdapter = nestApp.getHttpAdapter();
      
      // Process the request with NestJS
      try {
        const response = await httpAdapter.getInstance()(request);
        
        // Convert NestJS response to Cloudflare Worker response
        return new Response(response.body, {
          status: response.statusCode || 200,
          headers: response.headers
        });
      } catch (error) {
        console.error('Error processing request with NestJS:', error);
        return new Response(JSON.stringify({ 
          error: 'Internal Server Error',
          message: error.message
        }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
    } catch (error) {
      console.error('Worker error:', error);
      return new Response(JSON.stringify({ 
        error: 'Worker Error', 
        message: error.message 
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  }
};