<template>
  <view>
    <!-- 蒙层 -->
    <view v-if="show" class="modal-mask" @tap.stop="onMaskClick"></view>
    <!-- 模态框 -->
    <view class="modal-container" v-if="show" :class="{ 'modal-enter': isEntering, 'modal-leave': isLeaving }"
      @animationend="onAnimationEnd" @tap.stop>
      <view class="modal-container__inner">
        <slot></slot>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

defineOptions({
  name: 'BlankModal'
})

export interface ModalProps {
  visible: boolean;
}

interface Emits {
  (e: 'update:visible', visible: boolean): void;
  (e: 'mask'): void;
}
const props = defineProps<ModalProps>();
const emit = defineEmits<Emits>();

const show = computed({
  get() {
    return props.visible;
  },
  set(val) {
    emit('update:visible', val);
  }
});

const isEntering = ref(false);
const isLeaving = ref(false);

function onMaskClick() {
  emit('mask');
  startLeaveAnimation();
}

function startEnterAnimation() {
  isEntering.value = true;
  isLeaving.value = false;
}

function startLeaveAnimation() {
  isEntering.value = false;
  isLeaving.value = true;
}

function onAnimationEnd() {
  if (isLeaving.value) {
    emit('update:visible', false);
    isLeaving.value = false;
  }
}

watch(() => show.value, (newVal) => {
  if (newVal) {
    startEnterAnimation();
  } else {
    startLeaveAnimation();
  }
});
</script>