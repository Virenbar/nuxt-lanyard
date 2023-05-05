export default defineNuxtConfig({
  app: {
    head: {
      link: [{ href: "https://cdn.jsdelivr.net/npm/bootswatch@5.2.3/dist/darkly/bootstrap.min.css", rel: "stylesheet" }],
      script: [{ src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" }]
    }
  },
  modules: ["../src/module"],
  "nuxt-lanyard": {
    apiURL: "api.lanyard.rest"
  }
});
