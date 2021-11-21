import { Ref } from '@vue/reactivity';
import { email, hasCapitalize, hasNumber, maxLength, minLength, required, sameAs } from 'plugins/validation/validatorsWithTranslations';

export const validationRules = {
  email: [required, email],
  password: [required, minLength(8), maxLength(64), hasNumber, hasCapitalize],
  passwordConfirmation: (passwordRef: Ref) => [required, sameAs(passwordRef)],
  userTeam: [required, minLength(4)],

  eventId: [required, minLength(4), maxLength(4)],
  eventName: [required, maxLength(45)],

  pointId: [required, minLength(4), maxLength(4)],
  required: [required],
  name: [maxLength(128)],
  date: [required],
};
