import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, HttpException, HttpStatus, UploadedFiles } from '@nestjs/common';
import { Qd3176Service } from './qd3176.service';
import { CreateQd3176Dto } from './dto/create-qd3176.dto';
import { UpdateQd3176Dto } from './dto/update-qd3176.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { GetXml1sByIdentityDto } from './dto/get-xml1s-by-identity.dto';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

@Controller('qd3176')
export class Qd3176Controller {
  constructor(private readonly qd3176Service: Qd3176Service) {}

  @Post()
  create(@Body() createQd3176Dto: CreateQd3176Dto) {
    return this.qd3176Service.create(createQd3176Dto);
  }

  @Get()
  findAll() {
    return this.qd3176Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.qd3176Service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQd3176Dto: UpdateQd3176Dto) {
    return this.qd3176Service.update(+id, updateQd3176Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.qd3176Service.remove(+id);
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files', 2000, {
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.xml$/)) {
        return cb(
          new HttpException('Chỉ chấp nhận file XML', HttpStatus.BAD_REQUEST),
          false,
        );
      }
      cb(null, true);
    },
  }))
  uploadXml(@UploadedFiles() files: Express.Multer.File[]) {
    const importSessionId = randomUUID();
    return this.qd3176Service.uploadXml(files, importSessionId);
  }

  @ApiOperation({ summary: 'get xml1s by identity' })
  @ApiParam({ name: 'identity', description: 'CCCD/Mã thẻ BHYT' })
  @Get('xml1s/:identity')
  getXml1sByIdentity(@Param('identity') identity: string) {
    return this.qd3176Service.getXml1sByIdentity({ identity });
  }

  @ApiOperation({ summary: 'get xml2s by xml1Id' })
  @ApiParam({ name: 'xml1Id', description: 'ID XML1' })
  @Get('xml2s/:xml1Id')
  getXml2sByXml1Id(@Param('xml1Id') xml1Id: string) {
    return this.qd3176Service.getXml2sByXml1Id({ xml1Id });
  }

  @ApiOperation({ summary: 'get xml3s by xml1Id' })
  @ApiParam({ name: 'xml1Id', description: 'ID XML1' })
  @Get('xml3s/:xml1Id')
  getXml3sByXml1Id(@Param('xml1Id') xml1Id: string) {
    return this.qd3176Service.getXml3sByXml1Id({ xml1Id });
  }

  @ApiOperation({ summary: 'get xml4s by xml1Id' })
  @ApiParam({ name: 'xml1Id', description: 'ID XML1' })
  @Get('xml4s/:xml1Id')
  getXml4sByXml1Id(@Param('xml1Id') xml1Id: string) {
    return this.qd3176Service.getXml4sByXml1Id({ xml1Id });
  }
}
