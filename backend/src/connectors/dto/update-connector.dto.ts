import { PartialType } from '@nestjs/swagger';
import { CreateConnectorDto } from './create-connector.dto';

export class UpdateConnectorDto extends PartialType(CreateConnectorDto) {}
