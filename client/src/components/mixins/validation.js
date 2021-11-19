import { validationRules } from 'config/validationRules';

export const formValidation = {
  computed: {
    validationRules () {
      return validationRules;
    },
  },
};

export const fieldValidation = (rules = []) => ({
  props: {
    rules: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    isError () {
      return this.v$?.vModel?.$silentErrors?.length > 0;
    },
    errorMessage () {
      return this.v$?.vModel?.$silentErrors[0]?.$message || '';
    },
    validationRules () {
      return validationRules;
    },
    validationConfig () {
      const config = {};
      for (const rule of [...rules, ...this.rules]) {
        config[rule.$params.type] = rule;
      }
      return config;
    },
  },
});
