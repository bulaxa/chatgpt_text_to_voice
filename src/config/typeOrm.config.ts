import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import UserEntity from '../modules/users/entities/user.entity';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'mysql',
  host: configService.get('DB_HOST'),
  port: 3306,
  username: configService.get('DB_USERNAME'),
  password: configService.get('PASSWORD'),
  database: configService.get('DATABASE'),
  entities: [UserEntity],
  migrations: [__dirname + '/../migrations/*.{ts,js}'],
});
