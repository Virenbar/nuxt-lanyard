export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  app: {
    head: {
      link: [{ href: 'https://cdn.jsdelivr.net/npm/bootswatch@5.3.8/dist/darkly/bootstrap.min.css', rel: 'stylesheet' }],
      script: [{ src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js' }],
    },
  },
  runtimeConfig: {
    public: {
      ID: '94490510688792576', // Phineas
    },
  },
  compatibilityDate: '2025-11-01',
  lanyard: {
    apiURL: 'api.lanyard.rest',
  },
})
