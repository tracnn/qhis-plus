import { Inject, Injectable } from '@nestjs/common';
import { Client as MinioClient } from 'minio';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MinioService {
  constructor(
    @Inject('MINIO_CLIENT') private readonly minioClient: MinioClient,
    private readonly configService: ConfigService
  ) {}

  async uploadContent(
    content: string | Buffer,
    fileName: string,
    mimetype: string,
    metadata?: Record<string, string>
  ): Promise<string> {
    const bucket = this.configService.get<string>('MINIO_BUCKET');
    if (!bucket) {
      throw new Error('Bucket is not configured');
    }
    await this.ensureBucket(bucket);
  
    // Nếu là string, convert sang Buffer
    const buffer = Buffer.isBuffer(content) ? content : Buffer.from(content, 'utf-8');
    
    const meta = {
      'Content-Type': mimetype,
      ...Object.entries(metadata || {}).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [`X-Amz-Meta-${key}`]: value,
        }),
        {}
      ),
    };
    
    await this.minioClient.putObject(bucket, fileName, buffer, buffer.length, meta);
    return fileName;
  }

  async uploadFile(buffer: Buffer, fileName: string, mimetype: string): Promise<string> {
    const bucket = this.configService.get<string>('MINIO_BUCKET');
    if (!bucket) {
      throw new Error('Bucket is not configured');
    }
    await this.ensureBucket(bucket);

    await this.minioClient.putObject(bucket, fileName, buffer, buffer.length, { 'Content-Type': mimetype });
    return fileName;
  }

  async getFile(fileName: string): Promise<Buffer> {
    const bucket = this.configService.get<string>('MINIO_BUCKET');
    if (!bucket) {
      throw new Error('Bucket is not configured');
    }
    const stream = await this.minioClient.getObject(bucket, fileName);
    return new Promise<Buffer>((resolve, reject) => {
      const chunks: Buffer[] = [];
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('end', () => resolve(Buffer.concat(chunks)));
      stream.on('error', (error) => reject(error));
    });
  }

  async getFileBase64(fileName: string): Promise<string> {
    const buffer = await this.getFile(fileName);
    return buffer.toString('base64');
  }

  async deleteFile(fileName: string): Promise<void> {
    const bucket = this.configService.get<string>('MINIO_BUCKET');
    if (!bucket) {
      throw new Error('Bucket is not configured');
    }
    await this.minioClient.removeObject(bucket, fileName);
  }

  private async ensureBucket(bucket: string): Promise<void> {
    const exists = await this.minioClient.bucketExists(bucket);
    if (!exists) {
      await this.minioClient.makeBucket(bucket, 'us-east-1');
    }
  }

  async exists(fileName: string): Promise<boolean> {
    const bucket = this.configService.get<string>('MINIO_BUCKET');
    if (!bucket) {
      throw new Error('Bucket is not configured');
    }
    try {
      await this.minioClient.statObject(bucket, fileName);
      return true;
    } catch (error) {
      // Not found thì lỗi code 'NoSuchKey' hoặc 'NotFound'
      if (error.code === 'NotFound' || error.code === 'NoSuchKey') {
        return false;
      }
      throw error;
    }
  }
}
