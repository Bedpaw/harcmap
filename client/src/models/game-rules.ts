export enum InputTypeEnum {
  Select,
  Checkbox
}

export enum Rules {
  GeolocationAvailability,
  PointDetailsVisibilityOnMap
}

export enum GeolocationAvailabilityOptions {
  Required,
  Available,
  Forbidden
}
export const rulesOptions = new Map([
  [Rules.GeolocationAvailability, GeolocationAvailabilityOptions],
]);

export type GameRulesOptions = boolean | GeolocationAvailabilityOptions

export interface GameRuleEntryDTO {
  ruleId: Rules,
  ruleValue: GameRulesOptions
}
export interface GameRuleUpdateDTO {
  ruleId: Rules,
  ruleValue: GameRulesOptions
}

export interface GameRule {
  ruleId: Rules,
  ruleValue: GameRulesOptions
  ruleType: InputTypeEnum,
  ruleCategoryName: string,
}
