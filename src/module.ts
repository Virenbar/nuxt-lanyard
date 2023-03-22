import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
import { defu } from 'defu'

// Module options TypeScript interface definition
export interface ModuleOptions {
  UserID: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@virenbar/nuxt-lanyard',
    configKey: 'nuxt-lanyard',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  // Default configuration options of the Nuxt module
  defaults: {
    UserID: ""
  },
  setup(options, nuxt) {
    nuxt.options.runtimeConfig.public.lanyard = defu(nuxt.options.runtimeConfig.public.lanyard, {
      UserID: options.UserID
    })

    const resolver = createResolver(import.meta.url)
    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))
  }
})
