import { LIMIT_DEFAULT, PAGE_DEFAULT } from "../../constant/common.constant";

export class GetHistoryByIdentityQuery {
    constructor(
        public readonly identityNumber: string,
        public readonly page: number = PAGE_DEFAULT,
        public readonly limit: number = LIMIT_DEFAULT
    ) {}
  }