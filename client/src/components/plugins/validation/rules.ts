import { Ref } from '@vue/reactivity';
import {
  datetimeAfter,
  email,
  futureDatetime,
  hasCapitalize,
  hasNumber,
  maxLength,
  minLength,
  required,
  sameAs,
  positiveNumber,
} from 'plugins/validation/validatorsWithTranslations';

export const validationRules = {
  email: [required, email],
  password: [required, minLength(8), maxLength(64), hasNumber, hasCapitalize],
  passwordConfirmation: (passwordRef: Ref) => [required, sameAs(passwordRef)],
  userTeam: [required, minLength(4), maxLength(30)],

  eventName: [required, maxLength(45)],
  pointDescription: [minLength(10), maxLength(300)],
  categoryDescription: [minLength(10), maxLength(300)],
  pointSuccessMessage: [minLength(10), maxLength(300)],
  pointId: [required, minLength(4), maxLength(4)],
  required: [required],
  requiredName: [required, maxLength(128)],
  name: [maxLength(128)],
  pointValue: [positiveNumber(0)],
  date: [required],
  futureDatetime: [required, futureDatetime],
  dateTimeAfter: (edgeDatetime: Ref) => [required, datetimeAfter(edgeDatetime)],
};
