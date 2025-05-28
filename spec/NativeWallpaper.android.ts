import type { TurboModule } from 'react-native';
import { Platform, TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  setWallpaper(imageUri: string): Promise<boolean>;
}

  
export default Platform.OS === "android" ? TurboModuleRegistry.getEnforcing<Spec>('NativeWallpaper') : null