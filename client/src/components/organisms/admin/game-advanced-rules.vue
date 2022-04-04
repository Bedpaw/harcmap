<template>
  <section class="f-flex f-flex-col f-flex-al-center">
    <h3 class="f-mt-0">
      {{ $t('page.admin.eventForm.advancedOptions') }}
    </h3>
    <template
      v-for="rule of advancedGameRules"
      :key="rule.ruleId"
    >
      <component
        :is="inputTypeComponent(rule.ruleType)"
        v-if="!disabledRules.includes(rule.ruleId)"
        v-model="rule.ruleValue"
        :disabled="blockForm"
        :assist="gameRulesUtils.getDescription(rule)"
        v-bind="inputProps(rule)"
        class="f-mb-2"
      >
        {{ gameRulesUtils.getName(rule) }}
      </component>
    </template>
  </section>
</template>

<script>
import ACheckbox from 'atoms/checkbox';
import MSelect from 'molecules/select';
import { gameRulesUtils } from 'utils/game-rules';
import { InputTypeEnum, Rules } from 'models/game-rules';

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
    disabledRules: [Rules.PointDetailsVisibilityOnMap],
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
