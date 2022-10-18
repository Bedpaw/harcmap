import 'src/style/light.sass';
import 'src/style/dark.sass';
import { appStorage } from 'utils/storage';

const lastSheetId = document.styleSheets.length - 1;
const lightSheet = document.styleSheets[lastSheetId - 1];
const darkSheet = document.styleSheets[lastSheetId];

export const THEMES = {
  light: 'light',
  dark: 'dark',
};

function getDefaultTheme () {
  const storageTheme = appStorage.getItem(appStorage.appKeys.theme);
  return storageTheme || THEMES.light;
}

export const styleManager = {
  defaultSheet: getDefaultTheme(),
  sheets: {
    light: lightSheet,
    dark: darkSheet,
  },
  init () {
    styleManager.switch(styleManager.defaultSheet);
  },
  switch (name) {
    appStorage.setItem(appStorage.appKeys.theme, name);
    const sheets = styleManager.sheets;
    const sheetsKeys = Object.keys(sheets);
    if (sheetsKeys.includes(name)) {
      sheetsKeys.forEach(sheetName => {
        sheets[sheetName].disabled = name !== sheetName;
      });
    } else {
      throw new ErrorMessage('This styleSheet does not exist');
    }
  },
  switchTo: {
    dark () {
      styleManager.switch(THEMES.dark);
    },
    light () {
      styleManager.switch(THEMES.light);
    },
  },
};
