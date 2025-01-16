import { App } from "vue";
import Modal from "./components/modal/index.taro";
export * from "./components/modal/index.taro";
import Image from "./components/image/index.taro";
export * from "./components/image/index.taro";

function install(app: App) {
  const packages = [Modal, Image];
  packages.forEach((item: any) => {
    if (item.install) {
      app.use(item);
    } else if (item.name) {
      app.component(item.name, item)
    }
  })
}

export { install, Modal, Image }
export default { install }