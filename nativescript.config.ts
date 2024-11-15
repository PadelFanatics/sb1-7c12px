import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'org.nativescript.padelwatch',
  appPath: 'app',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none'
  },
  ios: {
    discardUncaughtJsExceptions: true
  },
  useLibs: true,
  preview: {
    port: 3000,
    hmr: true
  }
} as NativeScriptConfig;