import { createI18n } from 'vue-i18n';
import { plPL } from 'src/dictionary/language/plPL';
export type MessageSchema = typeof plPL

const i18n = createI18n<MessageSchema, 'plPL'>({
  locale: 'plPL',
  messages: {
    plPL,
  },
});

export const translator = i18n.global;
export default i18n;
