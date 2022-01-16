<template>
  <section class="f-flex f-flex-col f-flex-al-center">
    <h3 class="f-mt-0">
      {{ $t('page.admin.eventForm.advancedOptions') }}
    </h3>
    <component
      :is="inputTypeComponent(rule.ruleType)"
      v-for="rule of advancedGameRules"
      :key="rule.ruleId"
      v-model="rule.ruleValue"
      :disabled="blockForm"
      :assist="gameRulesUtils.getDescription(rule)"
      v-bind="inputProps(rule)"
      class="f-mb-2"
    >
      {{ gameRulesUtils.getName(rule) }}
    </component>
  </section>
</template>

<script>
import ACheckbox from 'atoms/checkbox';
import MSelect from 'molecules/select';
import { gameRulesUtils } from 'utils/game-rules';
import { InputTypeEnum } from 'models/game-rules';

export default {
  name: 'o-game-advanced-rules',
  components: {
    ACheckbox,
    MSelect,
  },
  props: {
    advancedGameRules: {
      type: Array,
      required: true,
    },
    blockForm: {
      type: Boolean,
    },
  },
  data: () => ({
    gameRulesUtils,
  }),
  methods: {
    inputTypeComponent (ruleType) {
      return {
        [InputTypeEnum.Checkbox]: ACheckbox.name,
        [InputTypeEnum.Select]: MSelect.name,
      }[ruleType];
    },
    inputProps (rule) {
      switch (rule.ruleType) {
        case InputTypeEnum.Select: {
          return {
            options: gameRulesUtils.getOptions(rule),
            placeholder: gameRulesUtils.getName(rule),
          };
        }
        case InputTypeEnum.Checkbox: {
          return {};
        }
      }
    },
  },
};
</script>
