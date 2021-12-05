<template>
  <m-input
    v-model="vModel"
    type="password"
    :disabled="disabled"
    :placeholder="labels[0]"
    :error="first.error.value"
    :assist="first.message.value || assist[0]"
  />
  <m-input
    v-model="passwordConfirmation"
    type="password"
    :disabled="disabled"
    :placeholder="labels[1]"
    :error="next.error.value"
    :assist="next.message.value || assist[1]"
  />
</template>

<!-- USAGE EXAMPLE
  <m-field-set-password
    v-model="date"
    :disabled="blockForm"
  />
-->

<script>
import MInput from 'molecules/input';
import { translator } from 'src/dictionary';
import { fieldValidationMixin } from 'plugins/validation/field';
import { useDoubleFieldValidation } from 'plugins/validation/double-field';
import { validationRules } from 'plugins/validation/rules';
import { ref } from 'vue';
import { useModelValue } from 'plugins/v-model';

export default {
  name: 'm-field-set-password',
  components: { MInput },
  mixins: [fieldValidationMixin],
  props: {
    disabled: Boolean,
    labels: {
      type: Array,
      default: () => [
        translator.t('form.field.password'),
        translator.t('form.field.rePassword'),
      ],
    },
    assist: {
      type: Array,
      default: () => ['', ''],
    },
  },
  setup (props, context) {
    const { vModel } = useModelValue(props, context);
    const passwordConfirmation = ref('');
    return {
      vModel,
      passwordConfirmation,
      ...useDoubleFieldValidation(
        props,
        context,
        [
          vModel,
          validationRules.password,
        ],
        [
          passwordConfirmation,
          validationRules.passwordConfirmation(vModel),
        ],
      ),
    };
  },
};
</script>
