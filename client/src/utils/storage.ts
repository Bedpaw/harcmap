import { store } from 'store';

interface Identifiers {
  eventId?: string
  email?: string
}

function getStorageType (type = 'l'): Storage {
  switch (type) {
    case 'l':
      return localStorage;
    case 's':
      return sessionStorage;
    default:
      return localStorage;
  }
}
/*
* Abstraction over local/session storage
* */
const multiStorage = {
  use: (storageIndex: 'l' | 's' = 'l'): Storage => ({
    getItem (key: string): string | null {
      const value = getStorageType(storageIndex).getItem(key);
      return value ? JSON.parse(value) : null;
    },
    key (index: number): string | null {
      return getStorageType(storageIndex).key(index);
    },
    length: 0, // Don't use
    removeItem (key: string): void {
      getStorageType(storageIndex).removeItem(key);
    },
    setItem (key: string, value: string): void {
      getStorageType(storageIndex).setItem(key, value);
    },
    clear (): void {
      getStorageType(storageIndex).clear();
    },
  }),
};

function createPrefix (ids: Identifiers = {}): string {
  let result = 'hm-';
  if (ids.email) {
    result += ids.email + '-';
  }
  if (ids.eventId) {
    result += ids.eventId + '-';
  }
  return result;
}

function getPrefixedKey (key: string, ids: Identifiers = {}) {
  return createPrefix(ids) + key;
}
export const appStorage = {
  appKeys: {
    firstLogin: 'firstLogin',
    recentEvent: 'recentEvent',
    mapPosition: 'mapPosition',
    incompatibleVersionAfterReload: 'incompatible-version-after-reload',
    theme: 'theme',
    uuid: 'hm.u.u.i.d',
    wantsAutoLoginToEvent: 'wantsAutoLoginToEvent',
    lastRoute: 'lastRoute',
  },
  getIds: {
    eventId: () => ({ eventId: store.getters['event/eventId'] }),
    email: () => ({ email: store.getters['user/email'] }),
    eventIdAndEmail: () => ({ ...appStorage.getIds.email(), ...appStorage.getIds.eventId() }),
  },
  getItem (key: string, ids: Identifiers = {}, storageIndex: 'l' | 's' = 'l'): string | null {
    const pKey = getPrefixedKey(key, ids);
    return multiStorage.use(storageIndex).getItem(pKey);
  },
  key (index: number, storageIndex: 'l' | 's' = 'l'): string | null {
    return multiStorage.use(storageIndex).key(index);
  },
  removeItem (key: string, ids: Identifiers = {}, storageIndex: 'l' | 's' = 'l'): void {
    const pKey = getPrefixedKey(key, ids);
    multiStorage.use(storageIndex).removeItem(pKey);
  },
  setItem<T> (key: string, value: T, ids: Identifiers = {}, storageIndex: 'l' | 's' = 'l'): void {
    const pKey = getPrefixedKey(key, ids);
    multiStorage.use(storageIndex).setItem(pKey, JSON.stringify(value));
  },
  clear (storageIndex: 'l' | 's' = 'l'): void {
    multiStorage.use(storageIndex).clear();
  },
};
