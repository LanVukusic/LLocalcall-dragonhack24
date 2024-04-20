import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvModule } from '../env/env.module';
import { EnvService } from '../env/env.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory(env: EnvService) {
        const isTesting = env.get('NODE_ENV') === 'test';

        return {
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'postgres',
          database: isTesting ? 'tests' : 'db',
          entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
          migrations: [`${__dirname}/../migrations/*{.ts,.js}`],
          synchronize: true,
          migrationsRun: true,
          logging: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
