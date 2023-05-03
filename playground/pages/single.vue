<script setup lang="ts">
import { useLanyard } from "#imports";

const L = useLanyard({ method: "ws", id: "132479201470185472" });
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
          <b> {{ L?.discord_user.username }}#{{ L?.discord_user.discriminator }}</b>
        </div>
        <div class="card-body">
          <DiscordActivity :data="L" />
        </div>
      </div>
    </div>
  </div>
</template>
