import { BaseEntity } from "../../common/base.entity";
import { Column, Entity, Index } from "typeorm";
import { SatisfactionSurveyStatus, SatisfactionSurveyType } from "../enums/satisfaction-survey.enum";

@Entity('SATISFACTION_SURVEYS')
export class SatisfactionSurvey extends BaseEntity{
    
    @Column({ name: 'USER_ID' })
    @Index()
    userId: string;

    @Column({ name: 'PATIENT_CODE' })
    patientCode: string;

    @Column({ name: 'TREATMENT_CODE' })
    @Index()
    treatmentCode: string;

    @Column({ name: 'SERVICE_REQ_CODE', nullable: true })
    serviceReqCode: string;

    @Column({ name: 'SURVEY_STATUS', default: SatisfactionSurveyStatus.PENDING })
    surveyStatus: SatisfactionSurveyStatus;

    @Column({ name: 'SURVEY_TYPE' })
    surveyType: SatisfactionSurveyType;

    @Column({ name: 'SURVEY_SCORE' })
    surveyScore: number;

    @Column({ name: 'SURVEY_COMMENT', nullable: true })
    surveyComment: string;
}
