import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'freecuansite.app',
  appName: 'freecuansite',
  webDir: 'build',
  server: {
    url: 'https://freecuan.site',  // This sets your live server URL
    cleartext: true                // Optional: Allows HTTP connections (set false for only HTTPS)
  }
};

export default config;

