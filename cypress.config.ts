import { defineConfig } from 'cypress';

export default defineConfig({
  env: {
    backendUrl: '',
    token: '',
    portfolioId: '',
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    videoUploadOnPasses: false,
    video: false,
    setupNodeEvents(on, config) {
    },
  },
  defaultCommandTimeout: 80000,
  requestTimeout: 20000,
});
