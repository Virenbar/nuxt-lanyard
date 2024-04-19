<script setup lang="ts">
import { useLanyard, useLanyardHelper } from '#imports'

const { formatUsername } = useLanyardHelper()
const LM = useLanyard({ method: 'ws', all: true })
</script>

<template>
  <div class="container p-3">
    <h4>WebSocket - Multiple Users</h4>
    <div class="d-flex flex-wrap justify-content-center">
      <div
        v-for="L in LM"
        :key="L.discord_user.id"
        class="card"
      >
        <div class="card-header">
          <b> {{ formatUsername(L.discord_user) }}</b>
        </div>
        <div class="card-body">
          Status: {{ L?.discord_status }}
          <DiscordStatus :data="L" />
        </div>
      </div>
    </div>
  </div>
</template>
