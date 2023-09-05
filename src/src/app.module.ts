import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PassportModule } from '@nestjs/passport';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { LocalStrategy } from './auth/auth.strategy';

@Module({
  imports: [TasksModule, AuthModule, PassportModule],
  controllers: [AppController],
  providers: [AppService, LocalStrategy],
})
export class AppModule {}
