#!/bin/bash

read -p "Nhập tên microservice mới (viết bằng kebab-case): " SERVICE_NAME
CLASS_NAME=$(echo "$SERVICE_NAME" | sed -r 's/(^|-)([a-z])/\U\2/g')

nest generate app $SERVICE_NAME

BASE_DIR="apps/$SERVICE_NAME"
SRC_DIR="$BASE_DIR/src"

mkdir -p $SRC_DIR/application/use-cases
mkdir -p $SRC_DIR/application/ports/inbound
mkdir -p $SRC_DIR/application/ports/outbound
mkdir -p $SRC_DIR/application/dtos
mkdir -p $SRC_DIR/application/services

mkdir -p $SRC_DIR/domain/entities
mkdir -p $SRC_DIR/domain/value-objects
mkdir -p $SRC_DIR/domain/validators
mkdir -p $SRC_DIR/domain/services

mkdir -p $SRC_DIR/infrastructure/database
mkdir -p $SRC_DIR/infrastructure/external/example/custom-operators
mkdir -p $SRC_DIR/infrastructure/config

mkdir -p $SRC_DIR/presentation/controllers
mkdir -p $SRC_DIR/presentation/middlewares
mkdir -p $SRC_DIR/presentation/filters

mkdir -p $BASE_DIR/test

touch $SRC_DIR/main.ts

# tsconfig.app.json
cat <<EOF > $BASE_DIR/tsconfig.app.json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "declaration": false,
    "outDir": "../../dist/apps/$SERVICE_NAME"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "test", "**/*spec.ts"]
}
EOF

# File mẫu UseCase
cat <<EOF > $SRC_DIR/application/use-cases/${SERVICE_NAME}.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { I${CLASS_NAME}UseCase } from '../ports/inbound/${SERVICE_NAME}.usecase.interface';
import { I${CLASS_NAME}Repository } from '../ports/outbound/${SERVICE_NAME}.repository.interface';
import { ${CLASS_NAME} } from '../../domain/entities/${SERVICE_NAME}.entity';
import { ${CLASS_NAME}Dto } from '../dtos/${SERVICE_NAME}.dto';

@Injectable()
export class ${CLASS_NAME}UseCase implements I${CLASS_NAME}UseCase {
  constructor(
	@Inject('I${CLASS_NAME}Repository')
	private readonly repo: I${CLASS_NAME}Repository
  ) {}

  async hello(): Promise<string> {
    return 'Hello';
  }
  
  async execute(input: ${CLASS_NAME}Dto): Promise<any> {
    return;
  }
}
EOF

# DTO
cat <<EOF > $SRC_DIR/application/dtos/${SERVICE_NAME}.dto.ts
export class ${CLASS_NAME}Dto {
  readonly id: string;
  readonly value: string;
}
EOF

# Entity
cat <<EOF > $SRC_DIR/domain/entities/${SERVICE_NAME}.entity.ts
export class ${CLASS_NAME} {
  constructor(
    public readonly id: string,
    public readonly value: string
  ) {}
}
EOF

# Inbound Interface
cat <<EOF > $SRC_DIR/application/ports/inbound/${SERVICE_NAME}.usecase.interface.ts
import { ${CLASS_NAME} } from '../../../domain/entities/${SERVICE_NAME}.entity';

export interface I${CLASS_NAME}UseCase {
  execute(input: Partial<${CLASS_NAME}>): Promise<any>;
  hello(): Promise<string>;
}
EOF

# Outbound Interface
cat <<EOF > $SRC_DIR/application/ports/outbound/${SERVICE_NAME}.repository.interface.ts
import { ${CLASS_NAME} } from '../../../domain/entities/${SERVICE_NAME}.entity';

export interface I${CLASS_NAME}Repository {
  findById(id: string): Promise<${CLASS_NAME} | null>;
  save(data: ${CLASS_NAME}): Promise<void>;
}
EOF

# Controller
cat <<EOF > $SRC_DIR/presentation/controllers/${SERVICE_NAME}.controller.ts
import { Controller, Post, Body, Inject, Get } from '@nestjs/common';
import { ${CLASS_NAME}Dto } from '../../application/dtos/${SERVICE_NAME}.dto';
import { I${CLASS_NAME}UseCase } from '../../application/ports/inbound/${SERVICE_NAME}.usecase.interface';

@Controller('${SERVICE_NAME}')
export class ${CLASS_NAME}Controller {
  constructor(
	@Inject('I${CLASS_NAME}UseCase')
	private readonly useCase: I${CLASS_NAME}UseCase
  ) {}

  @Get()
  async hello(@Body() dto: ${CLASS_NAME}Dto) {
    return await this.useCase.hello();
  }
}
EOF

# Validator
cat <<EOF > $SRC_DIR/domain/validators/${SERVICE_NAME}.validator.ts
import { ${CLASS_NAME} } from '../entities/${SERVICE_NAME}.entity';

export class ${CLASS_NAME}Validator {
  static validate(entity: ${CLASS_NAME}): string[] {
    const errors: string[] = [];
    if (!entity.value || entity.value.trim() === '') {
      errors.push('Giá trị không được để trống.');
    }
    return errors;
  }
}
EOF

# Value Object
cat <<EOF > $SRC_DIR/domain/value-objects/${SERVICE_NAME}.vo.ts
export class ${CLASS_NAME}Value {
  constructor(private readonly value: string) {
    if (!this.isValid(value)) {
      throw new Error('${CLASS_NAME}Value không hợp lệ');
    }
  }

  private isValid(val: string): boolean {
    return val.length > 0;
  }

  getValue(): string {
    return this.value;
  }
}
EOF

# Domain Service
cat <<EOF > $SRC_DIR/domain/services/${SERVICE_NAME}.service.ts
import { ${CLASS_NAME} } from '../entities/${SERVICE_NAME}.entity';

export class ${CLASS_NAME}DomainService {
  static isActive(entity: ${CLASS_NAME}): boolean {
    return !!entity && entity.value !== '';
  }
}
EOF

# Repository Mock
cat <<EOF > $SRC_DIR/infrastructure/database/${SERVICE_NAME}.repository.ts
import { Injectable } from '@nestjs/common';
import { I${CLASS_NAME}Repository } from '../../application/ports/outbound/${SERVICE_NAME}.repository.interface';
import { ${CLASS_NAME} } from '../../domain/entities/${SERVICE_NAME}.entity';

export class ${CLASS_NAME}Repository implements I${CLASS_NAME}Repository {
  async findById(id: string): Promise<${CLASS_NAME} | null> {
    return new ${CLASS_NAME}(id, 'demo-value');
  }
  async save(entity: ${CLASS_NAME}): Promise<void> {
    console.log('Saved', entity);
  }
}
EOF

# Middleware
cat <<EOF > $SRC_DIR/presentation/middlewares/request-logger.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(\`[Request] \${req.method} \${req.url}\`);
    next();
  }
}
EOF

# Exception Filter
cat <<EOF > $SRC_DIR/presentation/filters/http-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      message: exception.message,
    });
  }
}
EOF

# Config
cat <<EOF > $SRC_DIR/infrastructure/config/env.config.ts
export const EnvConfig = {
  base_url: process.env.${SERVICE_NAME}_BASE_URL || 'localhost',
  port: parseInt(process.env.${SERVICE_NAME}_PORT || '3000', 10),
};
EOF

# External integration
cat <<EOF > $SRC_DIR/infrastructure/external/example/example.service.ts
export class ExampleService {
  evaluate() {
    // TODO: implement
  }
}
EOF

# Custom Operator
cat <<EOF > $SRC_DIR/infrastructure/external/example/custom-operators/sample.operator.ts
export function sampleOperator(args: any) {
  // TODO: custom operator logic
  return true;
}
EOF

# Application Service
cat <<EOF > $SRC_DIR/application/services/${SERVICE_NAME}.runner.service.ts
export class ${CLASS_NAME}RunnerService {
  run() {
    // orchestrate your usecases
  }
}
EOF

# Test
cat <<EOF > $BASE_DIR/test/${SERVICE_NAME}.use-case.spec.ts
import { ${CLASS_NAME}UseCase } from '../src/application/use-cases/${SERVICE_NAME}.use-case';
import { I${CLASS_NAME}Repository } from '../src/application/ports/outbound/${SERVICE_NAME}.repository.interface';

describe('${CLASS_NAME}UseCase', () => {
  let useCase: ${CLASS_NAME}UseCase;

  beforeEach(() => {
    const mockRepo: I${CLASS_NAME}Repository = {
      findById: jest.fn().mockResolvedValue({ id: '1', value: 'mock' }),
    };
    useCase = new ${CLASS_NAME}UseCase(mockRepo);
  });

  it('should execute without error', async () => {
    const result = await useCase.execute({ id: '1', value: 'test' });
    expect(result).toBeUndefined();
  });
});
EOF

# File app.module.ts
cat <<EOF > $SRC_DIR/app.module.ts
import { Module } from '@nestjs/common';
import { ${CLASS_NAME}Controller } from './presentation/controllers/${SERVICE_NAME}.controller';
import { I${CLASS_NAME}UseCase } from './application/ports/inbound/${SERVICE_NAME}.usecase.interface';
import { ${CLASS_NAME}UseCase } from './application/use-cases/${SERVICE_NAME}.use-case';
import { ${CLASS_NAME}Repository } from './infrastructure/database/${SERVICE_NAME}.repository';

@Module({
  controllers: [${CLASS_NAME}Controller],
  providers: [
    {
      provide: 'I${CLASS_NAME}UseCase',
      useClass: ${CLASS_NAME}UseCase,
    },
    {
      provide: 'I${CLASS_NAME}Repository',
      useClass: ${CLASS_NAME}Repository,
    },
  ],
})
export class AppModule {} 
EOF

# File main.ts
cat <<EOF > $SRC_DIR/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.port);
  console.log('🚀 ${CLASS_NAME} microservice running http://localhost:process.env.port');
}

bootstrap();
EOF

echo "✅ Microservice '$SERVICE_NAME' đã được tạo đầy đủ với tất cả file mẫu theo kiến trúc Clean Architecture."