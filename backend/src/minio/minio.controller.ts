import { Controller, Get, Post, Body, Patch,
  Param, Delete, UseInterceptors, UploadedFile, HttpException, HttpStatus, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinioService } from './minio.service';
import { Response } from 'express';

@Controller('minio')
export class MinioController {
  constructor(private readonly minioService: MinioService) {}

  //@Post('upload')
  //@UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: any) {
    if (!file) {
      throw new HttpException('File not found', HttpStatus.BAD_REQUEST);
    }
    const fileName = Date.now() + '-' + file.originalname;
    await this.minioService.uploadFile(file.buffer, fileName, file.mimetype);
    return { fileName };
  }

  // Upload file qua base64
  //@Post('upload-base64')
  async uploadBase64(@Body() body: { base64: string; fileName: string; contentType: string }) {
    if (!body.base64 || !body.fileName || !body.contentType) {
      throw new HttpException('Missing parameters', HttpStatus.BAD_REQUEST);
    }
    const buffer = Buffer.from(body.base64, 'base64');
    await this.minioService.uploadFile(buffer, body.fileName, body.contentType);
    return { fileName: body.fileName };
  }

  // Download file về (buffer)
  //@Get(':fileName')
  async getFile(@Param('fileName') fileName: string, @Res() res: Response) {
    try {
      const buffer = await this.minioService.getFile(fileName);
      // Có thể tự động set mimetype nếu lưu metadata
      res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
      res.end(buffer);
    } catch (err) {
      throw new HttpException('File not found', HttpStatus.NOT_FOUND);
    }
  }

  // Xoá file
  //@Delete(':fileName')
  async deleteFile(@Param('fileName') fileName: string) {
    await this.minioService.deleteFile(fileName);
    return { deleted: true };
  }
}
