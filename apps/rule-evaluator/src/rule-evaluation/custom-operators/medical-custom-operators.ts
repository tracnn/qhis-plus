import { numberOperators } from './number-operators';
import { stringOperators } from './string-operators';
import { arrayOperators } from './array-operators';
import { dateOperators } from './date-operators';
import { objectOperators } from './object-operators';

export const medicalCustomOperators = {
  ...numberOperators,
  ...stringOperators,
  ...arrayOperators,
  ...dateOperators,
  ...objectOperators
};