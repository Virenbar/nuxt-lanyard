<script setup lang="ts">
import { useLanyard, useLanyardHelper, useRuntimeConfig } from '#imports'

const { formatUsername } = useLanyardHelper()
const id = useRuntimeConfig().public.ID as string
const L = useLanyard({ method: 'rest', id, pollInterval: 10e3 })
</script>

<template>
  <div class="container p-3">
    <h4>REST - Single User</h4>
    <template v-if="L">
      <ul>
        <li>User: <b>{{ formatUsername(L.discord_user) }}</b> {{ L.discord_user.global_name }}</li>
        <li>Status: {{ L.discord_status }}</li>
      </ul>

      <div class="d-flex align-items-top justify-content-center">
        <div class="card">
          <div class="card-header">
            <b>Status Example</b>
          </div>
          <div class="card-body">
            <DiscordStatus :data="L" />
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <b>KV Example</b>
          </div>
          <div class="card-body">
            <ul>
              <li
                v-for="V, K in L.kv"
                :key="K"
              >
                {{ K }}: {{ V }}
              </li>
            </ul>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <b>Activity Example</b>
          </div>
          <div class="card-body">
            <DiscordActivity :data="L" />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.container {
  max-width: 50rem;
}
</style>
