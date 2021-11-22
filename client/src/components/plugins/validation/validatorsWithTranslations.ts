// @/utils/i18n-validators.js
import * as validators from '@vuelidate/validators';
import i18n from 'dictionary';
import { helpers } from '@vuelidate/validators';
import { ValidateTools } from '@dbetka/wdk/lib/validate-tools';
import { Ref } from '@vue/reactivity';

// or import { createI18nMessage } from '@vuelidate/validators'
const { createI18nMessage } = validators;

// extract the `t` helper, should work for both Vue 2 and Vue 3 versions of vue-i18n
const { t } = i18n.global;

// pass `t` and create your i18n message instance
const withI18nMessage = createI18nMessage({ t });

/**
 * Wrap each validator
 *
 * REMEMBER to add translation for validation
 * File: dictionary/language/pl
 * Path: validations[<validator-name>] = '<translated-message>'
 * Example: pl = { validations: { email: 'Musisz podać poprawny adres email.' } }
 */
export const required = withI18nMessage(validators.required);
export const email = withI18nMessage(validators.email, { withArguments: true });
export const minLength = (param:number) => withI18nMessage(validators.minLength(param));
export const maxLength = (param:number) => withI18nMessage(validators.maxLength(param));
export const sameAs = (ref:Ref) => withI18nMessage(validators.sameAs(ref));
export const hasNumber = withI18nMessage(helpers.withParams({ type: 'hasNumber' }, ValidateTools.hasNumber));
export const hasCapitalize = withI18nMessage(helpers.withParams({ type: 'hasCapitalize' }, (value:string) => /[A-Z]/.test(value)));
