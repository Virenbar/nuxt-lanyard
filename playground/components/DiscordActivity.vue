<script setup lang="ts">
import { computed } from "vue";
import { Activity } from "~/../src/types";

const props = defineProps<Props>();

const formatMedia = (url?: string) => url?.replace("mp:", "https://media.discordapp.net/");
const formatStart = (start?: number) => {
  if (!start) { return null; }
  const seconds = (Date.now() - start) / 1000;

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.round(seconds % 60);
  const time = [
    h,
    m > 9 ? m : (h ? "0" + m : m || "0"),
    s > 9 ? s : "0" + s
  ].filter(Boolean).join(":");
  return `Passed ${time}`;
};

const A = computed(() => props.data);

interface Props {
  data: Activity | null
}
</script>
<template>
  <div v-if="A" class="body">
    <div class="assets">
      <img :alt="A.assets?.large_text" :src="formatMedia(A.assets?.large_image)" class="large">
      <img :alt="A.assets?.small_text" :src="formatMedia(A.assets?.small_image)" class="small">
    </div>
    <div class="content">
      <div class="name">
        {{ A?.name }}
      </div>
      <div>{{ A?.details }}</div>
      <div>{{ A?.state }}</div>
      <div>{{ formatStart(A.timestamps?.start) }} </div>
    </div>
  </div>
</template>
<!-- Style from Discord -->
<style scoped lang="scss">
.body {
  outline: 0;
  display: flex;
  align-items: center;
}

.assets {
  position: relative;

  .large {
    mask: url("~/assets/discord/large-mask.svg");
    width: 60px;
    height: 60px;
    border-radius: 8px;
    display: block;
    object-fit: cover;
  }

  .small {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    position: absolute;
    bottom: -4px;
    right: -4px;
  }
}

.content {
  flex: 1 1 auto;
  margin-left: 10px;
  overflow: hidden;
  display: block;
  font-size: 14px;
  line-height: 18px;
  white-space: nowrap;
  text-overflow: ellipsis;

  .name {
    font-weight: 600;
  }
}
</style>
