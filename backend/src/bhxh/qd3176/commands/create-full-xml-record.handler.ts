import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateFullXmlRecordCommand } from "./create-full-xml-record.command";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { Qd3176Xml1s } from "../entities/qd3176-xml1s.entity";
import { Qd3176Xml2s } from "../entities/qd3176-xml2s.entity";
import { Qd3176Xml3s } from "../entities/qd3176-xml3s.entity";
import { Qd3176Xml4s } from "../entities/qd3176-xml4s.entity";
import { Qd3176Xml5s } from "../entities/qd3176-xml5s.entity";
import { Qd3176Xml6s } from "../entities/qd3176-xml6s.entity";
import { Qd3176Xml7s } from "../entities/qd3176-xml7s.entity";
import { Qd3176Xml8s } from "../entities/qd3176-xml8s.entity";
import { Qd3176Xml9s } from "../entities/qd3176-xml9s.entity";
import { Qd3176Xml10s } from "../entities/qd3176-xml10s.entity";
import { Qd3176Xml11s } from "../entities/qd3176-xml11s.entity";
import { Qd3176Xml12s } from "../entities/qd3176-xml12s.entity";
import { Qd3176Xml13s } from "../entities/qd3176-xml13s.entity";
import { Qd3176Xml14s } from "../entities/qd3176-xml14s.entity";
import { Qd3176Xml15s } from "../entities/qd3176-xml15s.entity";
import { snakeUpperToCamel } from "../utils/snake-upper-to-camel.utils";
import { QD3176_XML_TYPE } from "../enums/qd3176.enum";
import { Logger } from "@nestjs/common";
import { BASE_SCHEMA } from "../../../constant/common.constant";

@CommandHandler(CreateFullXmlRecordCommand)
export class CreateFullXmlRecordHandler implements ICommandHandler<CreateFullXmlRecordCommand> {
    private readonly logger = new Logger(CreateFullXmlRecordHandler.name);
    constructor(
        @InjectDataSource(BASE_SCHEMA.DEFAULT)
        private readonly dataSource: DataSource,
    ) {}
    async execute(command: CreateFullXmlRecordCommand) {
        const {xmlPayloads} = command;
        this.logger.log('Start handling CreateFullXmlRecordCommand');

        return await this.dataSource.transaction(async manager => {

            const savedXml1 = await manager.getRepository(Qd3176Xml1s).save(
                manager.getRepository(Qd3176Xml1s).create(xmlPayloads.XML1 as Qd3176Xml1s)
              );
      
            const xml1Id = savedXml1.id;
            this.logger.log(`XML1 saved with id: ${xml1Id}`);
    
            // 2. Insert các bảng XML2 đến XML15, liên kết xml1Id
            for (const key of Object.keys(xmlPayloads)) {
                if (key === QD3176_XML_TYPE.XML1) continue;

                const rawData = xmlPayloads[key];
                this.logger.log(`Processing XML ${key}`);
                
                switch (key) {
                    case QD3176_XML_TYPE.XML2:
                        const chiTietThuoc = rawData.dsachChiTietThuoc?.CHI_TIET_THUOC;
                        const chiTietThuocItems = Array.isArray(chiTietThuoc) ? 
                        chiTietThuoc : chiTietThuoc ? [chiTietThuoc] : [];
                        for (const item of chiTietThuocItems) {
                            const normalizedItem = snakeUpperToCamel(item);
                            //const xml2 = manager.getRepository(Qd3176Xml2s).create(xmlPayloads.XML2);
                            const savedXml2 = await manager.getRepository(Qd3176Xml2s).save({ ...normalizedItem, xml1Id });
                            this.logger.log(`Saved XML2: ${savedXml2.id}`);
                        }
                        this.logger.log(`Saved ${chiTietThuocItems.length} XML2 items`);
                        break;
                    case QD3176_XML_TYPE.XML3:
                        const chiTietDichVu = rawData.dsachChiTietDvkt?.CHI_TIET_DVKT;
                        const chiTietDichVuItems = Array.isArray(chiTietDichVu) ? 
                        chiTietDichVu : chiTietDichVu ? [chiTietDichVu] : [];
                        for (const item of chiTietDichVuItems) {
                            const normalizedItem = snakeUpperToCamel(item);
                            //const xml3 = manager.getRepository(Qd3176Xml3s).create(xmlPayloads.XML3);
                            const savedXml3 = await manager.getRepository(Qd3176Xml3s).save({ ...normalizedItem, xml1Id });
                            this.logger.log(`Saved XML3: ${savedXml3.id}`);
                        }
                        this.logger.log(`Saved ${chiTietDichVuItems.length} XML3 items`);
                        break;

                    case QD3176_XML_TYPE.XML4:
                        const dsachChiTietCls = rawData.dsachChiTietCls?.CHI_TIET_CLS;
                        const dsachChiTietClsItems = Array.isArray(dsachChiTietCls) ? 
                        dsachChiTietCls : dsachChiTietCls ? [dsachChiTietCls] : [];
                        for (const item of dsachChiTietClsItems) {
                            const normalizedItem = snakeUpperToCamel(item);
                            //const xml4 = manager.getRepository(Qd3176Xml4s).create(xmlPayloads.XML4);
                            const savedXml4 = await manager.getRepository(Qd3176Xml4s).save({ ...normalizedItem, xml1Id });
                            this.logger.log(`Saved XML4: ${savedXml4.id}`);
                        }
                        this.logger.log(`Saved ${dsachChiTietClsItems.length} XML4 items`);
                        break;

                    case QD3176_XML_TYPE.XML5:
                        const dienBien = rawData.dsachChiTietDienBienBenh?.CHI_TIET_DIEN_BIEN_BENH;
                        const dienBienItems = Array.isArray(dienBien) ? 
                        dienBien : dienBien ? [dienBien] : [];
                        for (const item of dienBienItems) {
                            const normalizedItem = snakeUpperToCamel(item);
                            //const xml5 = manager.getRepository(Qd3176Xml5s).create(xmlPayloads.XML5);
                            const savedXml5 = await manager.getRepository(Qd3176Xml5s).save({ ...normalizedItem, xml1Id });
                            this.logger.log(`Saved XML5: ${savedXml5.id}`);
                        }
                        this.logger.log(`Saved ${dienBienItems.length} XML5 items`);
                        break;

                    case QD3176_XML_TYPE.XML7:
                        //const xml7 = manager.getRepository(Qd3176Xml7s).create(xmlPayloads.XML7);
                        const savedXml7 = await manager.getRepository(Qd3176Xml7s).save({ ...rawData, xml1Id });
                        this.logger.log(`Saved XML7: ${savedXml7.id}`);
                        break;

                    case QD3176_XML_TYPE.XML8:
                        //const xml8 = manager.getRepository(Qd3176Xml8s).create(xmlPayloads.XML8);
                        const savedXml8 = await manager.getRepository(Qd3176Xml8s).save({ ...rawData, xml1Id });
                        this.logger.log(`Saved XML8: ${savedXml8.id}`);
                        break;

                    case QD3176_XML_TYPE.XML14:
                        //const xml14 = manager.getRepository(Qd3176Xml14s).create(xmlPayloads.XML14);
                        const savedXml14 = await manager.getRepository(Qd3176Xml14s).save({ ...rawData, xml1Id });
                        this.logger.log(`Saved XML14: ${savedXml14.id}`);
                        break;
                }
            }
            return {
                success: true,
                xml1Id, // hoặc thêm các kết quả khác nếu cần
              };
        });
    }
}