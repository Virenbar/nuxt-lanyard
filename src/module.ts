import { addImportsDir, addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'
import { defu } from 'defu'
import { name, version } from '../package.json'

export * from './runtime/types'

export interface ModuleOptions {
  /**
   * API URL for Lanyard
   * @default `api.lanyard.rest`
   */
  apiURL: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'lanyard',
    compatibility: {
      nuxt: '^3.0.0 || ^4.0.0',
    },
  },
  defaults: {
    apiURL: 'api.lanyard.rest',
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const resolveRuntimeModule = (path: string) => resolve('./runtime', path)

    addPlugin(resolveRuntimeModule('./plugin'))
    addImportsDir(resolveRuntimeModule('./composables'))

    nuxt.options.runtimeConfig.public.lanyard = defu(nuxt.options.runtimeConfig.public.lanyard, {
      apiURL: options.apiURL,
    })
  },
})
