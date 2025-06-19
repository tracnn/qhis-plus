import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateFullXmlRecordCommand } from "./create-full-xml-record.command";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { Xml1PatientSummary } from "../entities/xml1-patient-summary.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Xml2DrugDetail } from "../entities/xml2-drug-detail.entity";
import { Xml3ServiceDetail } from "../entities/xml3-service-detail.entity";
import { Xml4SubclinicalDetail } from "../entities/xml4-subclinical-detail.entity";
import { Xml5ClinicalProgress } from "../entities/xml5-clinical-progress.entity";
import { Xml6HivCareRecord } from "../entities/xml6-hiv-care-record.entity";
import { Xml7DischargePaper } from "../entities/xml7-discharge-paper.entity";
import { Xml8MedicalRecordSummary } from "../entities/xml8-medical-record-summary.entity";
import { Xml9BirthCertificate } from "../entities/xml9-birth-certificate.entity";
import { Xml10MaternityLeave } from "../entities/xml10-maternity-leave.entity";
import { Xml11InsuranceLeave } from "../entities/xml11-insurance-leave.entity";
import { Xml12MedicalAssessment } from "../entities/xml12-medical-assessment.entity";
import { Xml13TransferForm } from "../entities/xml13-transfer-form.entity";
import { Xml14ReexamAppointment } from "../entities/xml14-reexam-appointment.entity";
import { Xml15TuberculosisTreatment } from "../entities/xml15-tuberculosis-treatment.entity";
import { snakeUpperToCamel } from "../utils/snake-upper-to-camel.utils";

@CommandHandler(CreateFullXmlRecordCommand)
export class CreateFullXmlRecordHandler implements ICommandHandler<CreateFullXmlRecordCommand> {
    constructor(
        @InjectDataSource()
        private readonly dataSource: DataSource,
        @InjectRepository(Xml1PatientSummary)
        private readonly xml1PatientSummaryRepository: Repository<Xml1PatientSummary>,
        @InjectRepository(Xml2DrugDetail)
        private readonly xml2DrugDetailRepository: Repository<Xml2DrugDetail>,
        @InjectRepository(Xml3ServiceDetail)
        private readonly xml3ServiceDetailRepository: Repository<Xml3ServiceDetail>,
        @InjectRepository(Xml4SubclinicalDetail)
        private readonly xml4SubclinicalDetailRepository: Repository<Xml4SubclinicalDetail>,
        @InjectRepository(Xml5ClinicalProgress)
        private readonly xml5ClinicalProgressRepository: Repository<Xml5ClinicalProgress>,
        @InjectRepository(Xml6HivCareRecord)
        private readonly xml6HivCareRecordRepository: Repository<Xml6HivCareRecord>,
        @InjectRepository(Xml7DischargePaper)
        private readonly xml7DischargePaperRepository: Repository<Xml7DischargePaper>,
        @InjectRepository(Xml8MedicalRecordSummary)
        private readonly xml8MedicalRecordSummaryRepository: Repository<Xml8MedicalRecordSummary>,
        @InjectRepository(Xml9BirthCertificate)
        private readonly xml9BirthCertificateRepository: Repository<Xml9BirthCertificate>,
        @InjectRepository(Xml10MaternityLeave)
        private readonly xml10MaternityLeaveRepository: Repository<Xml10MaternityLeave>,
        @InjectRepository(Xml11InsuranceLeave)
        private readonly xml11InsuranceLeaveRepository: Repository<Xml11InsuranceLeave>,
        @InjectRepository(Xml12MedicalAssessment)
        private readonly xml12MedicalAssessmentRepository: Repository<Xml12MedicalAssessment>,
        @InjectRepository(Xml13TransferForm)
        private readonly xml13TransferFormRepository: Repository<Xml13TransferForm>,
        @InjectRepository(Xml14ReexamAppointment)
        private readonly xml14ReexamAppointmentRepository: Repository<Xml14ReexamAppointment>,
        @InjectRepository(Xml15TuberculosisTreatment)
        private readonly xml15TuberculosisTreatmentRepository: Repository<Xml15TuberculosisTreatment>,
    ) {}
    async execute(command: CreateFullXmlRecordCommand) {
        const {xmlPayloads} = command;

        return await this.dataSource.transaction(async manager => {

            //console.log(xmlPayloads.XML1);
            // 1. Insert XML1
            const xml1 = manager.getRepository(Xml1PatientSummary).create(xmlPayloads.XML1);
            //console.log(xml1);

            const savedXml1 = await manager.getRepository(Xml1PatientSummary).save(xml1 as unknown as Xml1PatientSummary);
      
            const xml1Id = savedXml1.id;
    
            // 2. Insert các bảng XML2 đến XML15, liên kết xml1Id
            for (const key of Object.keys(xmlPayloads)) {
                if (key === 'XML1') continue;

                const rawData = xmlPayloads[key];
                
                switch (key) {
                    case 'XML2':
                        const chiTietThuoc = rawData.dsachChiTietThuoc?.CHI_TIET_THUOC;
                        const chiTietThuocItems = Array.isArray(chiTietThuoc) ? 
                        chiTietThuoc : chiTietThuoc ? [chiTietThuoc] : [];
                        for (const item of chiTietThuocItems) {
                            const normalizedItem = snakeUpperToCamel(item);
                            const xml2 = manager.getRepository(Xml2DrugDetail).create(xmlPayloads.XML2);
                            await manager.getRepository(Xml2DrugDetail).save({ ...normalizedItem, xml1Id });
                        }
                        break;
                    case 'XML3':
                        const chiTietDichVu = rawData.dsachChiTietDvkt?.CHI_TIET_DVKT;
                        const chiTietDichVuItems = Array.isArray(chiTietDichVu) ? 
                        chiTietDichVu : chiTietDichVu ? [chiTietDichVu] : [];
                        for (const item of chiTietDichVuItems) {
                            const normalizedItem = snakeUpperToCamel(item);
                            const xml3 = manager.getRepository(Xml3ServiceDetail).create(xmlPayloads.XML3);
                            await manager.getRepository(Xml3ServiceDetail).save({ ...normalizedItem, xml1Id });
                        }
                        break;

                    case 'XML4':
                        const dsachChiTietCls = rawData.dsachChiTietCls?.CHI_TIET_CLS;
                        const dsachChiTietClsItems = Array.isArray(dsachChiTietCls) ? 
                        dsachChiTietCls : dsachChiTietCls ? [dsachChiTietCls] : [];
                        for (const item of dsachChiTietClsItems) {
                            const normalizedItem = snakeUpperToCamel(item);
                            const xml4 = manager.getRepository(Xml4SubclinicalDetail).create(xmlPayloads.XML4);
                            await manager.getRepository(Xml4SubclinicalDetail).save({ ...normalizedItem, xml1Id });
                        }
                        break;

                    case 'XML5':
                        const dienBien = rawData.dsachChiTietDienBienBenh?.CHI_TIET_DIEN_BIEN_BENH;
                        const dienBienItems = Array.isArray(dienBien) ? 
                        dienBien : dienBien ? [dienBien] : [];
                        for (const item of dienBienItems) {
                            const normalizedItem = snakeUpperToCamel(item);
                            const xml5 = manager.getRepository(Xml5ClinicalProgress).create(xmlPayloads.XML5);
                            await manager.getRepository(Xml5ClinicalProgress).save({ ...normalizedItem, xml1Id });
                        }
                        break;

                    case 'XML7':
                        const xml7 = manager.getRepository(Xml7DischargePaper).create(xmlPayloads.XML7);
                        await manager.getRepository(Xml7DischargePaper).save({ ...rawData, xml1Id });
                        break;

                    case 'XML8':
                        const xml8 = manager.getRepository(Xml8MedicalRecordSummary).create(xmlPayloads.XML8);
                        await manager.getRepository(Xml8MedicalRecordSummary).save({ ...rawData, xml1Id });
                        break;

                    case 'XML14':
                        const xml14 = manager.getRepository(Xml14ReexamAppointment).create(xmlPayloads.XML14);
                        await manager.getRepository(Xml14ReexamAppointment).save({ ...rawData, xml1Id });
                        break;
                }
            }
            return {
                success: true,
                xml1Id, // hoặc thêm các kết quả khác nếu cần
              };
        });
    }

    private getEntityByLoaiXml(type: string): any {
        switch (type) {
          case 'XML2': return Xml2DrugDetail;
          case 'XML3': return Xml3ServiceDetail;
          case 'XML4': return Xml4SubclinicalDetail;
          case 'XML5': return Xml5ClinicalProgress;
          case 'XML6': return Xml6HivCareRecord;
          case 'XML7': return Xml7DischargePaper;
          case 'XML8': return Xml8MedicalRecordSummary;
          case 'XML9': return Xml9BirthCertificate;
          case 'XML10': return Xml10MaternityLeave;
          case 'XML11': return Xml11InsuranceLeave;
          case 'XML12': return Xml12MedicalAssessment;
          case 'XML13': return Xml13TransferForm;
          case 'XML14': return Xml14ReexamAppointment;
          case 'XML15': return Xml15TuberculosisTreatment;
          default: throw new Error(`Unsupported XML type: ${type}`);
        }
      }
}