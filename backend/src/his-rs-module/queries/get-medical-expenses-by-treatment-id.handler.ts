import { Injectable } from "@nestjs/common";
import { GetMedicalExpensesByTreatmentIdQuery } from "./get-medical-expenses-by-treatment-id.query";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { BASE_SCHEMA, TRANSACTION_TYPE_IDS } from "../../constant/common.constant";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

@QueryHandler(GetMedicalExpensesByTreatmentIdQuery)
export class GetMedicalExpensesByTreatmentIdHandler implements IQueryHandler<GetMedicalExpensesByTreatmentIdQuery> {
    constructor(
        @InjectDataSource(BASE_SCHEMA.HIS_RS) private dataSource: DataSource
    ) {}

    async execute(query: GetMedicalExpensesByTreatmentIdQuery): Promise<any> {
        const { treatmentId } = query.dto;

        
        const medicalExpensesQuery = 
        `
            SELECT
                HST.SERVICE_TYPE_NAME AS "serviceTypeName",
                SUM(HSS.AMOUNT) AS "amount",
                SUM(HSS.AMOUNT * HSS.PRICE) AS "totalPrice"
            FROM
                HIS_SERE_SERV HSS
                JOIN HIS_SERVICE_TYPE HST ON HST.ID = HSS.TDL_SERVICE_TYPE_ID
            WHERE
                HSS.IS_DELETE = 0
                AND HSS.IS_EXPEND IS NULL
                AND HSS.IS_NO_PAY IS NULL
                AND HSS.IS_NO_EXECUTE IS NULL
                AND HSS.TDL_TREATMENT_ID = :P1
            GROUP BY
                HST.SERVICE_TYPE_NAME
        `;

        const totalExpenseByPatientTypeQuery = 
        `
        SELECT
            SUM(VIR_TOTAL_PRICE) AS "totalPrice",
            SUM(VIR_TOTAL_HEIN_PRICE) AS "totalHeinPrice",
            SUM(VIR_TOTAL_PATIENT_PRICE) AS "totalPatientPrice"
        FROM
            HIS_SERE_SERV
        WHERE
            TDL_TREATMENT_ID = :P1
            AND IS_DELETE = 0
            AND IS_EXPEND IS NULL
            AND IS_NO_PAY IS NULL
            AND IS_NO_EXECUTE IS NULL
        `;

        const totalTransacntionQuery = 
        `
        SELECT
            SUM(CASE WHEN TRANSACTION_TYPE_ID = ${TRANSACTION_TYPE_IDS.ADVANCE_PAYMENT} THEN AMOUNT ELSE 0 END) AS "advancePayment",
            SUM(CASE WHEN TRANSACTION_TYPE_ID = ${TRANSACTION_TYPE_IDS.REFUND} THEN AMOUNT ELSE 0 END) AS "refund",
            SUM(CASE WHEN TRANSACTION_TYPE_ID = ${TRANSACTION_TYPE_IDS.PAYMENT} AND SALE_TYPE_ID IS NULL THEN AMOUNT ELSE 0 END) AS "payment",
            SUM(CASE WHEN TRANSACTION_TYPE_ID = ${TRANSACTION_TYPE_IDS.PAYMENT} AND SALE_TYPE_ID = 2 THEN AMOUNT ELSE 0 END) AS "otherCost"
        FROM
            HIS_TRANSACTION
        WHERE
            TREATMENT_ID = :P1
            AND IS_CANCEL IS NULL
            AND IS_DELETE = 0
        `;

        const [medicalExpensesResult, totalExpenseByPatientTypeResult, totalTransacntionResult] = await Promise.all([
            this.dataSource.query(medicalExpensesQuery, [treatmentId]),
            this.dataSource.query(totalExpenseByPatientTypeQuery, [treatmentId]),
            this.dataSource.query(totalTransacntionQuery, [treatmentId])
        ]);

        const needToPay = Math.floor(totalExpenseByPatientTypeResult[0].totalPatientPrice - 
        (totalTransacntionResult[0].advancePayment - totalTransacntionResult[0].refund + totalTransacntionResult[0].payment));
        
        const totalAccountantByPatient = {
            ...totalExpenseByPatientTypeResult[0],
            ...totalTransacntionResult[0],
            needToPay
        };

        return {
            medicalExpensesResult: medicalExpensesResult,
            totalAccountantByPatient: totalAccountantByPatient
        };
    }
}
