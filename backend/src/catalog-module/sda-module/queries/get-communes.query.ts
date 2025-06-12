import { PAGE_DEFAULT, LIMIT_DEFAULT } from "../../../constant/common.constant";

export class GetCommunesQuery {
    constructor(
        public readonly districtId: number,
        public readonly page: number = PAGE_DEFAULT,
        public readonly limit: number = LIMIT_DEFAULT
    ) {}
}