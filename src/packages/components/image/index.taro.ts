import Image from './image.taro.vue'
import type { ComponentPublicInstance } from 'vue'
import { withInstall } from '@/utils/with-install'

withInstall(Image)

export type ImageInstance = ComponentPublicInstance & InstanceType<typeof Image>
export { Image, Image as default }