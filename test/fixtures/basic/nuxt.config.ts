import MyModule from '../../../src/module'

export default defineNuxtConfig({
  modules: [
    // @ts-expect-error False problem
    MyModule,
  ],
})
