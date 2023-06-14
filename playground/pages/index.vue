<script setup lang="ts">
import { useLanyard } from "#imports";

// Change to your ID
const id = "94490510688792576"; // Phineas
const L = useLanyard({ method: "rest", id, pollInterval: 10e3 });
</script>
<template>
  <div>
    <h4>REST - Single User</h4>
    <template v-if="L">
      <div>
        <span>User:</span> <b> {{ $lanyard.formatUsername(L.discord_user) }}</b>
        <div>
          Status: {{ L.discord_status }}
        </div>
      </div>
      <div class="d-flex flex-column">
        <div class="card">
          <div class="card-header">
            <b>Status Component Example</b>
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
              <li v-for="V, K in L.kv" :key="K">
                {{ K }}: {{ V }}
              </li>
            </ul>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <b>Activity Component Example</b>
          </div>
          <div class="card-body">
            <DiscordActivity :data="L" />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
