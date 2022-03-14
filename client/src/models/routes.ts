export interface EnterPermissionOptions {
    beforeLogin?: boolean
    afterLogin?: boolean
    afterEventChosen?: boolean
    teamLeader?: boolean
    observer?: boolean
    admin?: boolean
    alwaysAllowed?: boolean
}

export interface EnterPermissionGroup {
    alwaysAllowed: EnterPermissionOptions,
    beforeLogin: EnterPermissionOptions,
    afterLogin: EnterPermissionOptions,
    afterEventChosen: EnterPermissionOptions,
    teamLeader: EnterPermissionOptions,
    adminObserver: EnterPermissionOptions,
    admin: EnterPermissionOptions,
}

export interface AppRouteParams {
    name: string,
    icon?: string,
    enterPermissions?: EnterPermissionOptions,
    path?: string,
    dynamicParam?: string,
    hasShortLabel?: boolean
}
