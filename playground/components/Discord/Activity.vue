<script setup lang="ts">
import mask from "@/assets/discord/large-mask.svg";
import { computed } from "vue";
import type { Activity, LanyardData } from "~/../dist/module";

const props = defineProps<Props>();
interface Props {
  data?: LanyardData | null
  activity?: Activity | null
}

const A = computed(() => props.activity ?? props.data?.activities.filter(A => A.type == 0)[0]);
</script>
<template>
  <div v-if="A" class="body">
    <div class="assets">
      <img
        class="large" :alt="A.assets?.large_text" :src="$lanyard.resolveActivity(A, 'large')"
        :style="A.assets?.small_image ? { 'mask-image': `url(${mask})` } : ''">
      <img
        v-if="A.assets?.small_image"
        class="small"
        :alt="A.assets?.small_text"
        :src="$lanyard.resolveActivity(A, 'small')">
    </div>
    <div class="content">
      <div class="name">
        {{ A?.name }}
      </div>
      <div>{{ A?.details }}</div>
      <div>{{ A?.state }}</div>
      <div>Passed {{ $lanyard.formatStart(A) }} </div>
    </div>
  </div>
</template>
<!-- Style from Discord -->
<style scoped lang="scss">
.body {
  outline: 0;
  display: flex;
  align-items: center;
  width: 20rem;
}

.assets {
  position: relative;

  .large {
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
