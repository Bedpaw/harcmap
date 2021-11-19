import { email, maxLength, minLength, required } from '@vuelidate/validators';

export const validationRules = {
  email: [required, email],
  password: 'required minLength:8 maxLength:64 hasNumber hasCapitalize',
  passwordConfirmation: 'required confirmed:password',
  userTeam: [required, minLength(4)],
  eventId: [required, minLength(4), maxLength(4)],
  pointId: [required, minLength(4), maxLength(4)],
  required: [required],
  name: [maxLength(128)],
  date: [required],
};
