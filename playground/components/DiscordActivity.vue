<script setup lang="ts">
import { computed } from "vue";
import { Activity, LanyardData } from "~/../dist/runtime/types";
const props = defineProps<Props>();

const A = computed(() => props.activity ?? props.data?.activities.filter(A => A.type == 0)[0]);

interface Props {
  data?: LanyardData | null
  activity?: Activity | null
}
</script>
<template>
  <div v-if="A" class="body">
    <div class="assets">
      <template v-if="A.assets?.large_image">
        <img :alt="A.assets?.large_text" :src="$lanyard.resolveActivity(A, 'large')" class="large">
        <img v-if="A.assets.small_image" :alt="A.assets?.small_text" :src="$lanyard.resolveActivity(A, 'small')" class="small">
      </template>
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
