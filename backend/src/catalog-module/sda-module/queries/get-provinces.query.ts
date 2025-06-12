import { PAGE_DEFAULT, LIMIT_DEFAULT } from "../../../constant/common.constant";

export class GetProvincesQuery {
    constructor(
        public readonly page: number = PAGE_DEFAULT,
        public readonly limit: number = LIMIT_DEFAULT
    ) {}
}