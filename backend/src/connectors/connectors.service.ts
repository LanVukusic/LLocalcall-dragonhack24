import { Injectable } from '@nestjs/common';
import { CreateConnectorDto } from './dto/create-connector.dto';
import { UpdateConnectorDto } from './dto/update-connector.dto';

@Injectable()
export class ConnectorsService {
  create(createConnectorDto: CreateConnectorDto) {
    return 'This action adds a new connector';
  }

  findAll() {
    return `This action returns all connectors`;
  }

  findOne(id: number) {
    return `This action returns a #${id} connector`;
  }

  update(id: number, updateConnectorDto: UpdateConnectorDto) {
    return `This action updates a #${id} connector`;
  }

  remove(id: number) {
    return `This action removes a #${id} connector`;
  }
}
