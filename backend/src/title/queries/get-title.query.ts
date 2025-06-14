import { IQuery } from "@nestjs/cqrs";

export class GetTitleQuery implements IQuery {
  constructor(public readonly titleId: string) {}
}