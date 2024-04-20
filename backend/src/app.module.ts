import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { EnvModule } from './env/env.module';
import { MeetingsModule } from './meetings/meetings.module';
import { RoomsModule } from './rooms/rooms.module';
import { TranscriptsModule } from './transcripts/transcripts.module';
import { UsersModule } from './users/users.module';
import { ConnectorsModule } from './connectors/connectors.module';

@Module({
  imports: [
    EnvModule,
    AuthModule,
    UsersModule,
    DatabaseModule,
    RoomsModule,
    MeetingsModule,
    TranscriptsModule,
    ConnectorsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
