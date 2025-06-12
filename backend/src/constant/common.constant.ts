import { PACS_VIEWER_CONFIG } from "../config/pacs-viewer.config";

export const LIMIT_DEFAULT = 10;
export const PAGE_DEFAULT = 1;

export const BASE_SCHEMA = {
    DEFAULT: 'default',
    ACS_RS: 'ACS_RS',
    SDA_RS: 'SDA_RS',
    HIS_RS: 'HIS_RS',
    EMR_RS: 'EMR_RS',
    LIS_RS: 'LIS_RS',
}

export const SERVICE_REQ_TYPE_IDS_CLINICAL_LAB = [6, 7, 11, 14, 15, 16, 17];

export enum SERVICE_REQ_STATUS_ID {
    ALL = 0,
    NOT_STARTED = 1,
    IN_PROGRESS = 2,
    COMPLETED = 3
}

export const SERVICE_REQ_STATUS_HAS_START_TIME = [
    SERVICE_REQ_STATUS_ID.IN_PROGRESS,
    SERVICE_REQ_STATUS_ID.COMPLETED
];

export const SERVICE_REQ_STATUS_HAS_END_TIME = [
    SERVICE_REQ_STATUS_ID.COMPLETED
];

export const SERVICE_REQ_TYPE_IDS_CLINICAL_PRESCRIPTION = [6];

export const TRANSACTION_TYPE_IDS = {
    ADVANCE_PAYMENT: 1,
    REFUND: 2,
    PAYMENT: 3,
    DEBT: 4
};

export const VRPACS_INTERNAL_URL = PACS_VIEWER_CONFIG.INTERNAL_URL; 
export const VRPACS_EXTERNAL_URL = PACS_VIEWER_CONFIG.EXTERNAL_URL;
export const SERVICE_TYPE_ID_PACS = [3];
export const SERVICE_PACS_NOT_CAPTURE = 'Ca chưa được chụp';

export const EMR_DOCUMENT_TYPE_RETURN_TO_PATIENT = [22, 3];

export const EMR_DOCUMENT_CONTENT_TYPE = {
    pdf: 'application/pdf',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    doc: 'application/msword',
    ppt: 'application/vnd.ms-powerpoint',
};

export const PRESCRIPTION_SOURCE_TYPE = {
    INTERNAL: 'Đơn cấp phát',
    EXTERNAL: 'Đơn tự túc',
};