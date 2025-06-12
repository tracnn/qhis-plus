import { LIMIT_DEFAULT, PAGE_DEFAULT } from '../../../constant/common.constant';
export class GetUsersQuery {
    constructor(
        public readonly page: number = PAGE_DEFAULT,
        public readonly limit: number = LIMIT_DEFAULT
    ) {}
} 