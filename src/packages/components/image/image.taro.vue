<template>
  <view class="island-image flex-center" :style="mainStyle">
    <view class="skeleton-container" v-if="!isLoad"></view>
    <image class="inner-image" :lazy-load="true" :mode="props.mode" :src="props.src || ''" @load="handleImageLoad"
      @error="handleError" />
  </view>
</template>
<script lang="ts">
export default {
  name: 'TaroImage'
}
</script>
<script lang="ts" setup>
import { computed, ref } from 'vue';
import type { CommonEvent, ImageProps as TaroImageProps } from '@tarojs/components';

export type ImageProps = Partial<{
  size: number;
  width: number | string;
  height: number;
  radius: number | string;
  src: string;
  mode: keyof TaroImageProps.Mode;
}>
const props = withDefaults(defineProps<ImageProps>(), {
  radius: 0,
  mode: 'widthFix'
});

const emit = defineEmits(['load']);

const wrapperHeight = computed(() => {
  if (props.height) {
    return props.height + 'rpx';
  } else if (props.size) {
    return props.size + 'rpx';
  } else {
    return 'auto';
  }
});

const mainStyle = computed(() => ({
  width: (props.width && typeof props.width === 'string') ? props.width : `${props.size || props.width}rpx`,
  borderRadius: typeof props.radius === 'string' ? props.radius : props.radius + 'px',
  '--island-image-height': wrapperHeight.value
}));

const isLoad = ref(false);

const handleImageLoad = (e: any) => {
  isLoad.value = true;
  emit('load', e.detail)
};

const handleError = (e: any) => {
  console.warn(e.detail.errMsg);
};
</script>
<style lang="scss">
@keyframes imageloading {

  /* 骨架屏的动画 */
  100% {
    transform: translateX(100%);
  }
}

.island-image {
  position: relative;
  overflow: hidden;

  .skeleton-container {
    display: block;
    background-color: #F2F2F2;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: var(--island-image-height);
  }

  .skeleton-container:after {
    /* 内容区域空状态时追加骨架屏样式 */
    content: '';
    display: block;
    width: 100%;
    height: var(--island-image-height);
    transform: translateX(-100%);
    background: linear-gradient(90deg, transparent, rgba(225, 225, 225, 0.753), transparent);
    animation: imageloading 3s infinite;
  }

  .inner-image {
    width: 100%;
    position: relative;
    height: var(--island-image-height);
    transition: all .2s;
  }
}
</style>