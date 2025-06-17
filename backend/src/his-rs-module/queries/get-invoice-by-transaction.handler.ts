import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetInvoiceByTransactionQuery } from "./get-invoice-by-transaction.query";
import { InjectDataSource } from "@nestjs/typeorm";
import { BASE_SCHEMA, EMR_DOCUMENT_CONTENT_TYPE } from "../../constant/common.constant";
import { DataSource } from "typeorm";
import { InvoiceTypeBySystem } from "../enums/invoice-type.enum";
import { CyberBillBachMaiService } from "../services/cyber-bill-bach-mai.service";
import { ERROR_404 } from "@common/error-messages/error-404";
import { NotFoundException } from "@nestjs/common";
import { MinioService } from "../../minio/minio.service";

@QueryHandler(GetInvoiceByTransactionQuery)
export class GetInvoiceByTransactionHandler implements IQueryHandler<GetInvoiceByTransactionQuery> {
    constructor(
        @InjectDataSource(BASE_SCHEMA.HIS_RS) private readonly dataSource: DataSource,
        private readonly cyberBillBachMaiService: CyberBillBachMaiService,
        private readonly minioService: MinioService
    ) {}
    async execute(query: GetInvoiceByTransactionQuery) {
        const { getInvoiceByTransactionDto } = query;

        const queryData = `
            SELECT
                ID AS "transactionId",
                TRANSACTION_CODE AS "transactionCode",
                INVOICE_LOOKUP_CODE AS "invoiceLookupCode",
                INVOICE_SYS AS "invoiceSys",
                TDL_PATIENT_CODE AS "patientCode",
                TDL_TREATMENT_CODE AS "treatmentCode"
            FROM
                HIS_TRANSACTION
            WHERE
                ID = :P1
                AND IS_DELETE = 0
                AND CANCEL_TIME IS NULL
                AND INVOICE_LOOKUP_CODE IS NOT NULL
        `
        const result = await this.dataSource.query(queryData, [getInvoiceByTransactionDto.transactionId]);

        if (!result) {
            throw new NotFoundException(ERROR_404.NOT_FOUND_TRANSACTION);
        }

        const doc = result[0];

        const patientCode = doc.patientCode;
        const treatmentCode = doc.treatmentCode;
        const originalFileName = `${doc.transactionCode}-${doc.invoiceLookupCode}.pdf`;
        
        const minioFileName = `${patientCode}/${treatmentCode}/${originalFileName}`;
        
        const fileType = 'pdf' as keyof typeof EMR_DOCUMENT_CONTENT_TYPE;
        const contentType = EMR_DOCUMENT_CONTENT_TYPE[fileType];
        const documentTypeName = 'Hóa đơn điện tử';
        
        const metaData = {
            'document-id': encodeURIComponent(doc.transactionId),
            'transaction-code': encodeURIComponent(doc.transactionCode),
            'invoice-lookup-code': encodeURIComponent(doc.invoiceLookupCode),
            'invoice-sys': encodeURIComponent(doc.invoiceSys),
            'patient-code': encodeURIComponent(doc.patientCode),
            'treatment-code': encodeURIComponent(doc.treatmentCode),
            'document-type-name': encodeURIComponent(documentTypeName)
        }
        
        const exists = await this.minioService.exists(minioFileName);
        
        let base64: string | null = null;
        
        if (exists) {
            base64 = await this.minioService.getFileBase64(minioFileName);
        } else {
            switch (doc.invoiceSys) {
                case InvoiceTypeBySystem.CYBERBILL:
                    base64 = await this.cyberBillBachMaiService.getInvoicePdf(
                        doc.invoiceLookupCode, doc.transactionCode);
                        await this.minioService.uploadContent(base64, minioFileName, contentType, metaData, true);
                    break;
                default:
                    throw new NotFoundException(ERROR_404.NOT_FOUND_INVOICE_TYPE);
            }
        }

        return {
            contentType: contentType,
            metaData: metaData,
            base64: base64
        };
    }
}