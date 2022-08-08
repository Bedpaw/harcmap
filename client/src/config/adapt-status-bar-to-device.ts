// import { Device } from '@capacitor/device';
// import { SafeArea } from 'capacitor-plugin-safe-area';

interface Config {
  statusBar: boolean
  navigationBar: boolean
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const adaptStatusAndNavigationBarToApp = async (config: Config) => {
  // const info = await Device.getInfo();
  // const { insets } = await SafeArea.getSafeAreaInsets();
  //
  // if (info.platform === 'ios') {
  //   config.statusBar && (document.body.style.marginTop = insets.top + 'px');
  //   config.navigationBar && (document.body.style.marginBottom = insets.bottom + 'px');
  // }
};
