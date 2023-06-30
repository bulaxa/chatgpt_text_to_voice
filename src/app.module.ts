import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GptTextModule } from './modules/gpt_text/gpt_text.module';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { GptVoiceModule } from './modules/gpt_voice/gpt_voice.module';
import { AuthModule } from './modules/auth/auth.module';
import config from './config/config';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      envFilePath: process.env.NODE_ENV === 'development' ? '.env.local' : '.env',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: 3306,
        username: process.env.DB_USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrationsRun: true,
        migrations: [__dirname + '/migrations'],
        syncronize: false,
        autoLoadEntities: true,
      }),
    }),
    GptTextModule,
    HttpModule,
    GptVoiceModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
