import { getEnumValuesAsArray } from 'utils/enum';
import { gameRulesTranslation } from 'utils/translations';
import {
  GameRule,
  rulesOptions,
  InputTypeEnum, GameRuleEntryDTO,
} from 'src/models/game-rules';
import { DEFAULT_EVENT_CONFIG } from 'config/event-config';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// Cannot use enum as object key
const getOptionsEnumAsArray = (rule: GameRule) => getEnumValuesAsArray(rulesOptions[rule.ruleId]);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// Cannot narrow type rule value, which depends from inputTypeEnum
// Use only with rule.ruleType = InputTypeEnum.Select
const getKeyFromOptions = (rule: GameRule) => getOptionsEnumAsArray(rule)[rule.ruleValue];

export const gameRulesUtils = {
  getDescription (rule: GameRule) {
    if (rule.ruleType === InputTypeEnum.Checkbox) {
      return gameRulesTranslation(rule.ruleId).description();
    }
    return gameRulesTranslation(rule.ruleId, getKeyFromOptions(rule)).optionsDescription();
  },
  getName: (rule: GameRule) => gameRulesTranslation(rule.ruleId).name(),
  getOptions: (rule: GameRule) =>
    getOptionsEnumAsArray(rule)
      .map((option, index) => ({
        label: gameRulesTranslation(rule.ruleId, option as string).options(),
        value: index,
      })),
  mapEventConfigIn (backendEventOptions: GameRuleEntryDTO[]) {
    return backendEventOptions.map((data, index) => {
      const details = DEFAULT_EVENT_CONFIG.gameRules[index];
      return { ...details, ruleValue: data.ruleValue };
    });
  },
};
