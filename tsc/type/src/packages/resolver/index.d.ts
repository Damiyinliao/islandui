import type { ComponentResolver } from 'unplugin-vue-components/types';
export interface IslandUIResolverOptions {
    taro?: boolean;
    autoImport?: boolean;
}
export default function IslandUIResolver(options?: IslandUIResolverOptions): ComponentResolver;
