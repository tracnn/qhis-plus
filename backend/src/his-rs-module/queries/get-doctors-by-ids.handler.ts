import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetClinicsByIdsQuery } from "./get-clinics-by-ids.query";
import { BASE_SCHEMA, ROOM_TYPE_IDS } from "../../constant/common.constant";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { GetDoctorsByIdsQuery } from "./get-doctors-by-ids.query";

@QueryHandler(GetDoctorsByIdsQuery)
export class GetDoctorsByIdsHandler implements IQueryHandler<GetDoctorsByIdsQuery> {
  constructor(
    @InjectDataSource(BASE_SCHEMA.HIS_RS) private readonly dataSource: DataSource,
  ) {}

  async execute(query: GetDoctorsByIdsQuery): Promise<any[]> {
    const { doctorIds } = query;
    if (!doctorIds?.length) return [];

    // Nếu mảng lớn, chunk để tránh lỗi SQL IN
    const chunkSize = 500;
    const chunkArray = (arr: number[], size: number) =>
      Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
        arr.slice(i * size, i * size + size)
      );

    let allDoctors: any[] = [];

    for (const ids of chunkArray(doctorIds, chunkSize)) {
      if (!ids.length) continue;
      //const inStr = ids.map(() => '?').join(",");
      const inStr = ids.map((_, i) => `:P${i}`).join(",");
      const sql = `
        SELECT 
            ID AS "id",
            LOGINNAME AS "doctorCode",
            TDL_USERNAME AS "doctorName",
            TITLE AS "title",
            TDL_MOBILE AS "phoneNumber",
            TDL_EMAIL AS "email"
        FROM 
            HIS_EMPLOYEE 
        WHERE 
            IS_ACTIVE = 1 AND TITLE IS NOT NULL AND IS_DOCTOR = 1
        AND HIS_EMPLOYEE.ID IN (${inStr})
      `;
      const result = await this.dataSource.query(sql, ids);
      allDoctors = allDoctors.concat(result);
    }
    return allDoctors;
  }
}