<script setup lang="ts">
import { computed } from "vue";
import { LanyardData } from "~/../dist/runtime/types";
const props = defineProps<Props>();
interface Props { data?: LanyardData | null }

const user = computed(() => props.data?.discord_user);
const status = computed(() => props.data?.discord_status);
const color = computed(() => {
  switch (props.data?.discord_status) {
    case "online": return "#23a55a";
    case "idle": return "#f0b232";
    case "dnd": return "#f23f43";
    default: return "#80848e";
  }
});

const avatarSize = 100;
const statusSize = 30;
const colorSize = statusSize * 0.6;

const statusCircle = {
  c: avatarSize - statusSize / 2,
  r: statusSize / 2
};
const colorRect = {
  wh: colorSize,
  xy: avatarSize - statusSize * (1 - 0.4 / 2)
};
const avatarMask = {
  c: 1 - (statusSize / 2) / avatarSize, //cx cy
  r: (statusSize / 2) / avatarSize
};
</script>
<template>
  <svg viewBox="0 0 1 1" aria-hidden="true" style="position: absolute; pointer-events: none; top: -1px; left: -1px; width: 1px; height: 1px;">
    <mask id="svg-mask-avatar" maskContentUnits="objectBoundingBox" viewBox="0 0 1 1">
      <circle fill="white" cx="0.5" cy="0.5" r="0.5" />
      <circle fill="black" :cx="avatarMask.c" :cy="avatarMask.c" :r="avatarMask.r" />
    </mask>
    <mask id="svg-mask-status-online" maskContentUnits="objectBoundingBox" viewBox="0 0 1 1">
      <circle fill="white" cx="0.5" cy="0.5" r="0.5" />
    </mask>
    <mask id="svg-mask-status-idle" maskContentUnits="objectBoundingBox" viewBox="0 0 1 1">
      <circle fill="white" cx="0.5" cy="0.5" r="0.5" />
      <circle fill="black" cx="0.25" cy="0.25" r="0.375" />
    </mask>
    <mask id="svg-mask-status-dnd" maskContentUnits="objectBoundingBox" viewBox="0 0 1 1">
      <circle fill="white" cx="0.5" cy="0.5" r="0.5" />
      <rect fill="black" x="0.125" y="0.375" width="0.75" height="0.25" rx="0.125" ry="0.125" />
    </mask>
    <mask id="svg-mask-status-offline" maskContentUnits="objectBoundingBox" viewBox="0 0 1 1">
      <circle fill="white" cx="0.5" cy="0.5" r="0.5" />
      <circle fill="black" cx="0.5" cy="0.5" r="0.25" />
    </mask>
  </svg>
  <!-- <div>{{ user?.username }} {{ status }}</div> -->
  <div class="wrapper" :style="`width: ${avatarSize}px;height: ${avatarSize}px;`">
    <svg class="mask svg">
      <foreignObject x="0" y="0" :width="avatarSize" :height="avatarSize" mask="url(#svg-mask-avatar)">
        <div class="avatarStack">
          <img :src="$lanyard.resolveAvatar(user, 128)" class="avatar">
        </div>
      </foreignObject>
      <circle fill="black" :cx="statusCircle.c" :cy="statusCircle.c" :r="statusCircle.r" style="opacity: 0.45;" />
      <rect :width="colorRect.wh" :height="colorRect.wh" :x="colorRect.xy" :y="colorRect.xy" :fill="color" :mask="`url(#svg-mask-status-${status})`" />
    </svg>
  </div>
</template>
<style scoped lang="scss">
.wrapper {
  border-radius: 50%;
}

.avatarStack {
  display: grid;
  width: 100%;
  height: 100%;
}

.avatar {
  display: block;
  width: 100%;
  height: 100%;
}

.svg {
  position: absolute;
  contain: paint;
}
</style>
