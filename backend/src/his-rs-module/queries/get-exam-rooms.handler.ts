import { IQueryHandler } from "@nestjs/cqrs";
import { GetExamRoomsDto } from "../dto/get-exam-rooms.dto";
import { GetExamRoomsQuery } from "./get-exam-rooms.query";
import { QueryHandler } from "@nestjs/cqrs";
import { BASE_SCHEMA, LIMIT_DEFAULT, PAGE_DEFAULT, ROOM_TYPE_IDS } from "../../constant/common.constant";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { buildPagination } from "@common/pagination.util";


@QueryHandler(GetExamRoomsQuery)
export class GetExamRoomsHandler implements IQueryHandler<GetExamRoomsQuery> {
  constructor(@InjectDataSource(BASE_SCHEMA.HIS_RS) private readonly dataSource: DataSource) {}

  async execute(query: GetExamRoomsQuery): Promise<any> {
    const {  page = PAGE_DEFAULT, limit = LIMIT_DEFAULT } = query.dto;

    const offset = (page - 1) * limit || 0;

    const examRoomId = ROOM_TYPE_IDS.EXAM_PARACLINIC;

    const queryTotal = `
    SELECT 
        COUNT(*) AS "total" 
    FROM 
        V_HIS_ROOM 
    WHERE 
        IS_ACTIVE = 1
        AND IS_EXAM = 1
    `;
    
    const queryData = `
    SELECT 
        VHR.ID AS "id",
        VHR.ROOM_CODE AS "roomCode",
        VHR.ROOM_NAME AS "roomName",
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
        OFFSET :P1 ROWS FETCH NEXT :P2 ROWS ONLY
    `;

    const [data, totalResult] = await Promise.all([
        this.dataSource.query(queryData, [offset, limit]),
        this.dataSource.query(queryTotal)
    ]);

    const total = Number(totalResult[0]?.total || 0);

    return {
        data,
        pagination: buildPagination(page, limit, total),
    };
  }
}