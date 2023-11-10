<script setup lang="ts">
import { useLanyard } from "#imports";

// Change to your ID
const id = "94490510688792576"; // Phineas
const L = useLanyard({ method: "ws", id });
</script>
<template>
  <div>
    <h4>WebSocket - Single User</h4>
    <div>
      <div>
        Status: {{ L?.discord_status }}
      </div>
    </div>
    <div class="d-flex">
      <div class="card">
        <div class="card-header">
          <b> {{ $lanyard.formatUsername(L?.discord_user) }}</b>
        </div>
        <div class="card-body">
          <DiscordActivity :data="L" />
        </div>
      </div>
    </div>
  </div>
</template>
