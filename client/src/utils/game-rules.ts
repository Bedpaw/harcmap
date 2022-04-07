import { getEnumValuesAsArray } from 'utils/enum';
import { gameRulesTranslation } from 'utils/translations';
import {
  GameRule,
  GameRuleEntryDTO,
  InputTypeEnum, Rules,
  rulesOptions,
} from 'src/models/game-rules';
import { DEFAULT_EVENT_CONFIG } from 'config/event-config';
import { store } from 'store';

const getOptionsEnumAsArray = (rule: GameRule): string[] => {
  const optionsEnum = rulesOptions.get(rule.ruleId);
  return optionsEnum ? getEnumValuesAsArray(optionsEnum) : [];
};
const getKeyFromOptions = (rule: GameRule): string | undefined => {
  if (typeof rule.ruleValue !== 'boolean') {
    return getOptionsEnumAsArray(rule)[rule.ruleValue];
  }
  return undefined;
};

export const gameRulesUtils = {
  getDescription (rule: GameRule) {
    if (rule.ruleType === InputTypeEnum.Checkbox) {
      return gameRulesTranslation(rule.ruleId).description();
    }
    return gameRulesTranslation(rule.ruleId, getKeyFromOptions(rule)).optionsDescription();
  },
  getRuleValueById: (ruleId: Rules) => {
    const eventRules = store.getters['event/eventSettings'] as GameRule[];
    const rule = eventRules?.find(rule => rule.ruleId === ruleId);
    return rule?.ruleValue;
  },
  getName: (rule: GameRule) => gameRulesTranslation(rule.ruleId).name(),
  getOptions: (rule: GameRule) =>
    getOptionsEnumAsArray(rule)
      .map((option, index) => ({
        label: gameRulesTranslation(rule.ruleId, option).options(),
        value: index,
      })),
  mapEventConfigIn (backendEventOptions: GameRuleEntryDTO[]) {
    return backendEventOptions.map((data, index) => {
      const details = DEFAULT_EVENT_CONFIG.gameRules[index];
      return { ...details, ruleValue: data.ruleValue };
    });
  },
};
