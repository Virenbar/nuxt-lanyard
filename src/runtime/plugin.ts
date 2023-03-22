import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  console.log('Plugin injected by @virenbar/nuxt-lanyard!')
  const options = useRuntimeConfig().public.lanyard
})
