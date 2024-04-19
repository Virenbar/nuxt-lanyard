<script setup lang="ts">
import { useLanyard, useLanyardHelper, useRuntimeConfig } from '#imports'

const { formatUsername } = useLanyardHelper()
const id = useRuntimeConfig().public.ID as string
const L = useLanyard({ method: 'ws', id })
</script>

<template>
  <div class="container p-3">
    <h4>WebSocket - Single User</h4>
    <div class="d-flex flex-wrap justify-content-center">
      <div class="card">
        <div class="card-header">
          <b> {{ formatUsername(L?.discord_user) }}</b>
        </div>
        <div class="card-body">
          <DiscordStatus :data="L" />
          <div>
            Status: {{ L?.discord_status }}
          </div>
          <DiscordActivity :data="L" />
        </div>
      </div>
    </div>
  </div>
</template>
