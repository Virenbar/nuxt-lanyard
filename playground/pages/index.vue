<script setup lang="ts">
import { useLanyard } from "#imports";

const L = useLanyard({ method: "rest", id: "94490510688792576" });
</script>
<template>
  <div>
    <h4>REST - Single User</h4>
    <div>
      <span>User:</span> <b> {{ L?.discord_user.username }}#{{ L?.discord_user.discriminator }}</b>
      <div>
        Status: {{ L?.discord_status }}
      </div>
    </div>
    <template v-if="L">
      <div class="d-flex flex-column">
        <div class="card">
          <div class="card-header">
            <b> KV </b>
          </div>
          <div class="card-body">
            <ul>
              <li v-for="V, K in L?.kv" :key="K">
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
