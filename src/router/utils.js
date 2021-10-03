import { ICONS } from 'src/__jscash__/icons-names-list';
import { translator } from 'src/dictionary';

export class AppRoute {
  /**
   * @description Create app route fields from specific name
   * @param name {string} - !!!camelCase!!! 'id' property ->  path, label and short labels are generated from name
   * @param enterPermissions {object} - object with custom flags, which is mapped to 'meta' property
   * @param icon {string} - icon, which appear next to route in some views
   * @param hasShortLabel {boolean} - key for translation is generated from name, if no translations it should be false
   * @param path {string} - specify path if you don't want it from name
   * @param dynamicParam {string} - dynamic param after path
   * */
  constructor ({
    name,
    enterPermissions,
    icon = ICONS.event,
    hasShortLabel = false,
    path = null,
    dynamicParam = null,
  }) {
    this.name = name;
    this.path = this.getPath(path, dynamicParam);
    this.label = this.getLabel();
    this.shortLabel = this.getShortLabel(hasShortLabel);
    this.icon = icon;
    this.meta = enterPermissions;
  }

  getPath (path, dynamicParam) {
    const camelToKebab = str => str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
    let mainPath = path || '/' + camelToKebab(this.name);
    if (dynamicParam) {
      mainPath += '/:' + dynamicParam;
    }
    return mainPath;
  }

  getLabel () {
    return translator.t(`title.${this.name}`);
  }

  getShortLabel (hasShortLabel) {
    return hasShortLabel ? translator.t(`title.short.${this.name}`) : '';
  }

  static getDataForRouter (route) {
    return {
      path: route.path,
      name: route.name,
      meta: route.meta,
    };
  }

  static createRoutes (routesObject, enterPermissions) {
    for (const [key, routeDetails] of Object.entries(routesObject)) {
      routeDetails.enterPermissions = enterPermissions;
      routesObject[key] = new AppRoute(routeDetails);
    }
    return routesObject;
  };
}
