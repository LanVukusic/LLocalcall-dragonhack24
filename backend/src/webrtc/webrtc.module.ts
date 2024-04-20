import { Module } from '@nestjs/common';
import { WebrtcGateway } from './webrtc.controller';

@Module({
  providers: [WebrtcGateway],
})
export class WebrtcModule {}
