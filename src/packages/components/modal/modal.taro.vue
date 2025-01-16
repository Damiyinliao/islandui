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
<style lang="scss">
/* 蒙层样式 */
.modal-mask {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 1;
  transition: opacity 0.3s ease;
}

/* 模态框样式 */
.modal-container {
  position: fixed;
  z-index: 10000;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  background-color: #fff;
  border-radius: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  overflow: hidden;

  &__inner {
    padding: 30px 30px;
  }
}

.modal-header {
  &__title {
    text-align: center;
    font-size: 32px;
    font-weight: bold;
    padding: 20px 0;
  }
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-footer {
  position: relative;

  &__content {
    display: flex;
    border-top: 2px solid #f1f1f1;
  }

  &__btn {
    flex: 1;
    font-weight: bold;
    font-size: 32px;
    text-align: center;
    padding: 30px 0;

    &:last-child {
      border-left: 2px solid #f1f1f1;
      color: #576b95;
    }

    &:active {
      background-color: #f1f1f1;
    }
  }
}

/* 动画样式 */
.modal-enter {
  animation: modal-fade-in 0.4s ease forwards;
}

.modal-leave {
  animation: modal-fade-out 0.4s ease forwards;
}

@keyframes modal-fade-in {
  from {
    transform: translate(-50%, -50%) scale(0.9);
    opacity: 0;
  }

  to {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
}

@keyframes modal-fade-out {
  from {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }

  to {
    transform: translate(-50%, -50%) scale(0.9);
    opacity: 0;
  }
}
</style>