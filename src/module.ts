import { addImportsDir, addPlugin, defineNuxtModule } from "@nuxt/kit";
import { defu } from "defu";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { name, version } from "../package.json";

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: "nuxt-lanyard",
    compatibility: {
      nuxt: "^3.0.0"
    }
  },
  defaults: {
    apiURL: "api.lanyard.rest"
  },
  setup(options, nuxt) {
    const runtimeDir = fileURLToPath(new URL("./runtime", import.meta.url));

    addPlugin(resolve(runtimeDir, "plugin.client"));
    addImportsDir(resolve(runtimeDir, "composables"));

    nuxt.options.runtimeConfig.public.lanyard = defu(nuxt.options.runtimeConfig.public.lanyard, {
      apiURL: options.apiURL
    });
  }
});

export interface ModuleOptions {
  apiURL: string
}
