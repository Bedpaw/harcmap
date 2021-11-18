<template>
  <section>
    <component  v-for="rule of advancedGameRules" :key="rule.ruleId"
                :is="inputTypeComponent(rule.ruleType)"
                v-model="rule.ruleValue"
                :disabled="blockForm"
                :assist="gameRulesUtils.getDescription(rule)"
                v-bind="inputProps(rule)"
                class="f-mb-2"
    >
      {{gameRulesUtils.getName(rule)}}
    </component>
  </section>
</template>

<script>
import ACheckbox from 'atoms/checkbox';
import MSelect from 'molecules/select';
import { gameRulesUtils } from 'utils/game-rules';
import { INPUT_TYPES, InputTypeEnum } from 'models/game-rules';

export default {
  name: 'o-game-advanced-rules.vue',
  data: () => ({
    gameRulesUtils,
    INPUT_TYPES,
  }),
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
  methods: {
    inputTypeComponent (ruleType) {
      return {
        [INPUT_TYPES.Checkbox]: ACheckbox.name,
        [INPUT_TYPES.Select]: MSelect.name,
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
