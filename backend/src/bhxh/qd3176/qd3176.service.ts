import { Injectable } from '@nestjs/common';
import { CreateQd3176Dto } from './dto/create-qd3176.dto';
import { UpdateQd3176Dto } from './dto/update-qd3176.dto';
import { XmlImportService } from './services/xml-import.service';
import { QueryBus } from '@nestjs/cqrs';
import { GetXml1sByIdentityQuery } from './queries/get-xml1s-by-identity.query';
import { GetXml1sByIdentityDto } from './dto/get-xml1s-by-identity.dto';
import { GetXml2sByXml1IdDto } from './dto/get-xml2s-by-xml1-id.dto';
import { GetXml2sByXml1IdQuery } from './queries/get-xml2s-by-xml1-id.query';
import { GetXml3sByXml1IdDto } from './dto/get-xml3s-by-xml1-id.dto';
import { GetXml3sByXml1IdQuery } from './queries/get-xml3s-by-xml1-id.query';
import { GetXml4sByXml1IdDto } from './dto/get-xml4s-by-xml1-id.dto';
import { GetXml4sByXml1IdQuery } from './queries/get-xml4s-by-xml1-id.query';

@Injectable()
export class Qd3176Service {
  constructor(private readonly xmlImportService: XmlImportService,
    private readonly queryBus: QueryBus
  ) {}
  create(createQd3176Dto: CreateQd3176Dto) {
    return 'This action adds a new qd3176';
  }

  findAll() {
    return `This action returns all qd3176`;
  }

  findOne(id: number) {
    return `This action returns a #${id} qd3176`;
  }

  update(id: number, updateQd3176Dto: UpdateQd3176Dto) {
    return `This action updates a #${id} qd3176`;
  }

  remove(id: number) {
    return `This action removes a #${id} qd3176`;
  }

  uploadXml(files: Express.Multer.File[], importSessionId: string) {
    return this.xmlImportService.processXmlFiles(files, importSessionId);
  }

  getXml1sByIdentity(dto: GetXml1sByIdentityDto) {
    return this.queryBus.execute(new GetXml1sByIdentityQuery(dto));
  }

  getXml2sByXml1Id(dto: GetXml2sByXml1IdDto) {
    return this.queryBus.execute(new GetXml2sByXml1IdQuery(dto));
  }

  getXml3sByXml1Id(dto: GetXml3sByXml1IdDto) {
    return this.queryBus.execute(new GetXml3sByXml1IdQuery(dto));
  }

  getXml4sByXml1Id(dto: GetXml4sByXml1IdDto) {
    return this.queryBus.execute(new GetXml4sByXml1IdQuery(dto));
  }
}
