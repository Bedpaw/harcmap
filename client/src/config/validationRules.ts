import { email, maxLength, minLength, required, helpers, sameAs } from '@vuelidate/validators';
import { ValidateTools } from '@dbetka/wdk/lib/validate-tools';
import { translator } from 'src/dictionary';
import { Ref } from '@vue/reactivity';

const hasNumber = () => helpers.withMessage(
  translator.t('form.validation.hasNumber'),
  helpers.withParams({ type: 'hasNumber' }, ValidateTools.hasNumber),
);

const hasCapitalize = () => helpers.withMessage(
  translator.t('form.validation.hasCapitalize'),
  helpers.withParams({ type: 'hasCapitalize' }, (value:string) => /[A-Z]/.test(value)),
);

export const validationRules = {
  email: [required, email],
  password: [required, minLength(8), maxLength(64), hasNumber(), hasCapitalize()],
  passwordConfirmation: (passwordRef: Ref) => [required, sameAs(passwordRef)],
  userTeam: [required, minLength(4)],
  eventId: [required, minLength(4), maxLength(4)],
  pointId: [required, minLength(4), maxLength(4)],
  required: [required],
  name: [maxLength(128)],
  date: [required],
};

console.log(validationRules.password);
