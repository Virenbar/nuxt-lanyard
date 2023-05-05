# Nuxt Lanyard

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

A Nuxt module to track your Discord status using [Lanyard API](https://github.com/Phineas/lanyard/).

The `useLanyard` composable returns a reactive state containing lanyard data.

The `$lanyard` plugin provides resolving/formatting function.

- [✨ Release Notes](/CHANGELOG.md)
- [🏀 Online playground](https://stackblitz.com/github/virenbar/nuxt-lanyard?file=playground%2Fapp.vue)
<!-- - [📖 Documentation](https://example.com) -->

## Features

- 🏷️ Single composable for fetching lanyard data
- 🌐 REST/WebSocket support
- 🧹 Socket/Connection auto close on unmount
- 📃 Resolving/Formatting functions (WIP)

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
      ],
      // For self-hosted lanyard set apiURL
      "nuxt-lanyard": {
        apiURL: "api.lanyard.rest"
      }
    })
    ```

That's it! You can now use Nuxt Lanyard in your Nuxt app ✨

## Usage

### REST

```ts
// Subscribe to user
const L = useLanyard({ method: "rest", id: "94490510688792576" });
```

```ts
// Use an interval of 10s (default 5s)
const L = useLanyard({
  method: "rest",
  pollInterval: 10e3,
  id: "94490510688792576"
});
```

### WebSocket

```ts
// Subscribe to single user
const L = useLanyard({ method: "ws", id: "94490510688792576" });
```

```ts
// Subscribe to multiple users
const LM = useLanyard({
  method: "ws", ids: [
    "132479201470185472",
    "94490510688792576"
  ]
});
```

```ts
// Subscribe to all users tracked by Lanyard
const LM = useLanyard({ method: "ws", all: true });
```

### Template

#### Single user

```html
<template>
  <div>
    <span>User:</span> <b> {{ L?.discord_user.username }}#{{ L?.discord_user.discriminator }}</b>
  </div>
</template>
```

#### Multiple users

```html
<template>
  <div v-for="L in LM" :key="L.discord_user.id">
    <span>User:</span> <b> {{ L?.discord_user.username }}#{{ L?.discord_user.discriminator }}</b>
  </div>
</template>
```

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
#yarn test
#yarn test:watch
# Release new version
yarn release
```

## Thanks

- [Phineas](https://github.com/Phineas) - Creator of [Lanyard API](https://github.com/Phineas/lanyard)
- [eggsy](https://github.com/eggsy) - Creator of [vue-lanyard](https://github.com/eggsy/vue-lanyard)
- [nebulatgs](https://github.com/nebulatgs) - Creator of [sk-lanyard](https://github.com/nebulatgs/sk-lanyard)

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@virenbar/nuxt-lanyard/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/@virenbar/nuxt-lanyard

[npm-downloads-src]: https://img.shields.io/npm/dm/@virenbar/nuxt-lanyard.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/@virenbar/nuxt-lanyard

[license-src]: https://img.shields.io/npm/l/@virenbar/nuxt-lanyard.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/@virenbar/nuxt-lanyard

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
