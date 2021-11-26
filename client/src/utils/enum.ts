import { EnumLike } from 'src/models/common';

export const getEnumValuesAsArray = (e: EnumLike): string[] => Object.values(e).filter(v => typeof v === 'string');
