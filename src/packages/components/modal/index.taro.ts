import Modal from './modal.taro.vue'
import type { ComponentPublicInstance } from 'vue'
import { withInstall } from '@/utils/with-install'

withInstall(Modal)

// export type { ButtonProps } from './modal.taro.vue';
export type ModalInstance = ComponentPublicInstance & InstanceType<typeof Modal>
export { Modal, Modal as default }