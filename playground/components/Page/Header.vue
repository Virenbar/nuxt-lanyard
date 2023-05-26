<template>
  <header class="navbar navbar-expand-lg navbar-dark bg-dark px-3 sticky-top">
    <nav class="container">
      <NuxtLink class="navbar-brand mx-auto" to="/">
        Nuxt Lanyard
      </NuxtLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon" />
      </button>

      <div id="navbar" class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <NuxtLink class="nav-link" to="/websocket/single/">
              WebSocket - Single
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link" to="/websocket/multiple/">
              WebSocket - Multiple
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link" to="/websocket/all/">
              ⚠WebSocket - All⚠
            </NuxtLink>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
