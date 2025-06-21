import { BaseEntity } from "../../common/base.entity";
import { Column, Entity, Index } from "typeorm";
import { SupportRequestStatus, SupportRequestType } from "../enums/support-request.enum";

@Entity({ name: 'SUPPORT_REQUESTS' })
export class SupportRequest extends BaseEntity {
    @Column({ type: 'uuid', name: 'USER_ID' })
    @Index()
    userId: string;

    @Column({ name: 'PATIENT_CODE' })
    @Index()
    patientCode: string;

    @Column({ name: 'TREATMENT_CODE' })
    @Index()
    treatmentCode: string;

    @Column({ name: 'REQUEST_TYPE' })
    requestType: SupportRequestType;

    @Column({ name: 'REQUEST_STATUS', default: SupportRequestStatus.PENDING })
    requestStatus: SupportRequestStatus;

    @Column({ name: 'REQUEST_CONTENT', nullable: true })
    requestContent: string;

    @Column({ name: 'REQUEST_ATTACHMENT', nullable: true })
    requestAttachment: string;
}
