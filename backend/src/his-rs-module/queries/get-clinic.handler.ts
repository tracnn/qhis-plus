import { IQueryHandler } from "@nestjs/cqrs";
import { QueryHandler } from "@nestjs/cqrs";
import { BASE_SCHEMA, LIMIT_DEFAULT, PAGE_DEFAULT, ROOM_TYPE_IDS } from "../../constant/common.constant";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { GetClinicQuery } from "./get-clinic.query";
import { ERROR_404 } from "@common/error-messages/error-404";
import { NotFoundException } from "@nestjs/common";


@QueryHandler(GetClinicQuery)
export class GetClinicHandler implements IQueryHandler<GetClinicQuery> {
  constructor(@InjectDataSource(BASE_SCHEMA.HIS_RS) private readonly dataSource: DataSource) {}

  async execute(query: GetClinicQuery): Promise<any> {
    const { id } = query;

    const examRoomId = ROOM_TYPE_IDS.EXAM_PARACLINIC;
    
    const queryData = `
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
        AND VHR.ROOM_TYPE_ID = ${examRoomId}
        AND VHR.ID = :P1
    `;

    const data = await Promise.all([
        this.dataSource.query(queryData, [id]),
    ]);

    if (data[0] === undefined) {
        throw new NotFoundException(ERROR_404.NOT_FOUND_CLINIC);
    }
    return data[0];
  }
}