import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetClinicsByIdsQuery } from "./get-clinics-by-ids.query";
import { BASE_SCHEMA, ROOM_TYPE_IDS } from "../../constant/common.constant";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

@QueryHandler(GetClinicsByIdsQuery)
export class GetClinicsByIdsHandler implements IQueryHandler<GetClinicsByIdsQuery> {
  constructor(
    @InjectDataSource(BASE_SCHEMA.HIS_RS) private readonly dataSource: DataSource,
  ) {}

  async execute(query: GetClinicsByIdsQuery): Promise<any[]> {
    const { clinicIds } = query;
    if (!clinicIds?.length) return [];

    // Nếu mảng lớn, chunk để tránh lỗi SQL IN
    const chunkSize = 500;
    const chunkArray = (arr: number[], size: number) =>
      Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
        arr.slice(i * size, i * size + size)
      );

    let allClinics: any[] = [];

    for (const ids of chunkArray(clinicIds, chunkSize)) {
      if (!ids.length) continue;
      const inStr = ids.map(() => ":P").join(",");
      const sql = `
        SELECT 
          VHR.ID AS "id",
          VHR.ROOM_CODE AS "clinicCode",
          VHR.ROOM_NAME AS "clinicName",
          HA.AREA_CODE AS "areaCode",
          HA.AREA_NAME AS "areaName",
          HD.DEPARTMENT_CODE AS "departmentCode",
          HD.DEPARTMENT_NAME AS "departmentName",
          VHR.BRANCH_CODE AS "branchCode",
          VHR.BRANCH_NAME AS "branchName",
          VHR.ADDRESS AS "address"
        FROM 
          V_HIS_ROOM VHR
        LEFT JOIN
          HIS_DEPARTMENT HD ON HD.ID = VHR.DEPARTMENT_ID
        LEFT JOIN
          HIS_AREA HA ON HA.ID = VHR.AREA_ID
        WHERE 
          VHR.IS_ACTIVE = 1
          AND VHR.IS_EXAM = 1
          AND VHR.ROOM_TYPE_ID = ${ROOM_TYPE_IDS.EXAM_PARACLINIC}
          AND VHR.ID IN (${inStr})
      `;
      const result = await this.dataSource.query(sql, ids);
      allClinics = allClinics.concat(result);
    }
    return allClinics;
  }
}