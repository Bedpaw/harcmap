// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { AppRouteParams, EnterPermissionOptions } from 'models/routes';
import { translator } from 'dictionary';

export class AppRoute {
  public name: string; // !!!camelCase!!!
  public path = '';
  public meta: EnterPermissionOptions;
  public icon = '';
  public label: string | null = null;
  public shortLabel: string | null = null;

  constructor (config: AppRouteParams) {
    const { name, path = '', icon = '', enterPermissions = {}, dynamicParam = null, hasShortLabel = false } = config;
    this.name = name;
    this.setPath(path, dynamicParam);
    this.setLabel();
    this.setShortLabel(hasShortLabel);
    this.icon = icon;
    this.meta = enterPermissions;
  }

  private setPath (path: string, dynamicParam: string | null) {
    const camelToKebab = (str: string): string => str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
    let mainPath = path || '/' + camelToKebab(this.name);
    if (dynamicParam)
      mainPath += '/:' + dynamicParam;

    this.path = mainPath;
  }

  private setLabel (): void {
    const label = translator.t(`title.${this.name}`);
    this.label = typeof label === 'string' ? label : '';
  }

  private setShortLabel (hasShortLabel: boolean): void {
    const shortLabel = hasShortLabel ? translator.t(`title.short.${this.name}`) : '';
    this.shortLabel = typeof shortLabel === 'string' ? shortLabel : '';
  }

  static getDataForRouter (route: AppRoute): { path: string, name: string, meta: EnterPermissionOptions } {
    return {
      path: route.path,
      name: route.name,
      meta: route.meta,
    };
  }

  static createRoutes <RouteNameKey extends string> (
    routesObject: Record<string, AppRouteParams>,
    enterPermissions: EnterPermissionOptions)
      : Record<RouteNameKey, AppRoute> {
    for (const [key, routeDetails] of Object.entries(routesObject)) {
      routeDetails.enterPermissions = enterPermissions;
      routesObject[key] = new AppRoute(routeDetails);
    }
    return routesObject as Record<RouteNameKey, AppRoute>;
  }
}
