import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'freecuansite.app',
  appName: 'freecuansite',
  webDir: 'build',
  android: {
    webContentsDebuggingEnabled: true,
  },
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '684135355283-64u99lsgun2liict6atftk7gdtdkt9da.apps.googleusercontent.com', // Replace with your OAuth Client ID
      forceCodeForRefreshToken: true,
    },
  },
  server: {
    androidScheme: 'https'
  }
};

export default config;
