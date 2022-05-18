import { Device } from '@capacitor/device';
import { SafeArea } from 'capacitor-plugin-safe-area';

export const adaptStatusBarToApp = async () => {
  const info = await Device.getInfo();
  const { insets } = await SafeArea.getSafeAreaInsets();

  if (info.platform === 'ios') {
    document.body.style.marginTop = insets.top + 'px';
    document.body.style.marginBottom = insets.bottom + 'px';
  }
};
