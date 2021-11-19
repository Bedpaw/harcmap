import { required, minLength, maxLength, email } from '@vuelidate/validators';

const definedRules = { // based on vee-validate rules
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

export const validationRulesMixin = {
  data: () => ({ definedRules }),
};

export const validateMixin = {
  data: () => ({ definedRules }),
  props: {
    rules: {
      type: Array,
      default: '',
    },
  },
  computed: {
    rulesObjects () {
      const config = {};
      for (const rule of this.rules) {
        config[rule.$params.type] = rule;
      }
      return config;
    },
  },
};
