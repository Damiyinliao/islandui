import IslandModal from "./components/modal";
import IslandImage from "./components/image";
export { IslandImage, IslandModal };
function install(app) {
    const packages = [IslandModal, IslandImage];
    packages.forEach((item) => {
        if (item.install) {
            app.use(item);
        }
        else if (item.name) {
            app.component(item.name, item);
        }
    });
}
export default { install };
