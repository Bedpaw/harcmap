export interface AppRouteParams {
    name: string,
    icon?: string,
    enterPermissions?: any,
    path?: string,
    dynamicParam?: string,
    hasShortLabel?: boolean

}
export type EnterPermission = Record<string, Boolean>
