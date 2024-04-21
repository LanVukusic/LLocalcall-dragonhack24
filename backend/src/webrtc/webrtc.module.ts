import { Module } from '@nestjs/common';
import { WebrtcGateway } from './webrtc.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [WebrtcGateway],
})
export class WebrtcModule {}
