import { App } from "vue";
import Modal from "./components/modal/index.taro";
export * from "./components/modal/index.taro";
import Image from "./components/image/index.taro";
export * from "./components/image/index.taro";
declare function install(app: App): void;
export { install, Modal, Image };
declare const _default: {
    install: typeof install;
};
export default _default;
