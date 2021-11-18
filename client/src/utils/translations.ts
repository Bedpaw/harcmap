import { translator } from 'src/dictionary';
import { Rules } from 'src/models/game-rules';

export const apiErrorTranslationFactory = (category: string) => {
  const root = 'apiError';
  const categoryPrefix = `${root}.${category}`;
  return (name: string) => translator.t(`${categoryPrefix}.${name}`);
};

export const gameRulesTranslation = (ruleId: Rules, key: string = null) => {
  const build = (segment: string) => {
    const root = `gameRules.${segment}.${Rules[ruleId]}`;
    const rootWithKey = `${root}.${key}`;
    return translator.t(key ? rootWithKey : root);
  };
  return {
    description: () => build('description'),
    optionsDescription: () => build('optionsDescription'),
    name: () => build('name'),
    options: () => build('options'),
  };
};
