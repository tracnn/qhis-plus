export const EVENT_TYPE_CRITICAL = 'critical';
export const EVENT_TYPE_WARNING = 'warning';
export const EVENT_TYPE_INFO = 'info';

export const EVENT_TYPES = [
    EVENT_TYPE_CRITICAL,
    EVENT_TYPE_WARNING,
    EVENT_TYPE_INFO,
] as const;

export const RULE_GROUP_TYPES = ['DRUG', 'SERVICE'] as const;
export type RULE_GROUP_TYPE = typeof RULE_GROUP_TYPES[number];