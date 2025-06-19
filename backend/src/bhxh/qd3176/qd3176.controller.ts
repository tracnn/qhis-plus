import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, HttpException, HttpStatus, UploadedFiles } from '@nestjs/common';
import { Qd3176Service } from './qd3176.service';
import { CreateQd3176Dto } from './dto/create-qd3176.dto';
import { UpdateQd3176Dto } from './dto/update-qd3176.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';

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
  @UseInterceptors(FilesInterceptor('files', 100, {
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
    return this.qd3176Service.uploadXml(files);
  }
}
