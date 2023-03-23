# Nuxt Lanyard

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

My new Nuxt module for doing amazing things.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
- [🏀 Online playground](https://stackblitz.com/github/virenbar/nuxt-lanyard?file=playground%2Fapp.vue)
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

<!-- Highlight some of the features your module provide here -->
- 🔖 &nbsp;Bar
- 🌲 &nbsp;Baz

## Quick Setup

1. Add `@virenbar/nuxt-lanyard` dependency to your project

```bash
# Using npm
npm install --save-dev @virenbar/nuxt-lanyard

# Using yarn
yarn add --dev @virenbar/nuxt-lanyard

# Using pnpm
pnpm add -D @virenbar/nuxt-lanyard
```

2. Add `@virenbar/nuxt-lanyard` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    '@virenbar/nuxt-lanyard'
  ]
})
```

That's it! You can now use Nuxt Lanyard in your Nuxt app ✨

## Development

```bash
# Install dependencies
yarn install

# Generate type stubs
yarn dev:prepare

# Develop with the playground
yarn dev

# Build the playground
yarn dev:build

# Run ESLint
yarn lint

# Run Vitest
yarn test
yarn test:watch

# Release new version
yarn release
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@virenbar/nuxt-lanyard/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/@virenbar/nuxt-lanyard

[npm-downloads-src]: https://img.shields.io/npm/dm/@virenbar/nuxt-lanyard.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/@virenbar/nuxt-lanyard

[license-src]: https://img.shields.io/npm/l/@virenbar/nuxt-lanyard.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/@virenbar/nuxt-lanyard

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
