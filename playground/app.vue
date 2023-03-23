<script setup lang="ts">
import { computed, useLanyard, useNuxtApp } from "#imports";

const L1 = useNuxtApp().$lanyard.data;
const L2 = useLanyard().data;
const A = computed(() => L2?.value?.activities[0] ?? null);
</script>
<template>
  <div>
    Nuxt Lanyard playground!
  </div>
  <h3>Basic Example</h3>
  <h4>useNuxtApp().$lanyard</h4>
  <div>
    Status: {{ L1?.discord_status }}
  </div>
  <h4>useLanyard()</h4>
  <div>
    Status: {{ L2?.discord_status }}
  </div>
  <h3>Activity Component Example</h3>
  <div>
    <DiscordActivity :data="A" />
  </div>
</template>
