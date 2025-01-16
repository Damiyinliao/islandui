import type { ComponentResolveResult, ComponentResolver } from 'unplugin-vue-components/types'

export interface IslandUIResolverOptions {
  /**
   * IslandUI or IslandUI-Taro
   *
   * @default false
   */
  taro?: boolean

  /**
   * compatible with unplugin-auto-import
   *
   * @default false
   */
  autoImport?: boolean
}

const islandFunctions = ['showToast', 'showNotify', 'showDialog', 'showImagePreview']

function getIslandResolved(name: string, options: IslandUIResolverOptions): ComponentResolveResult {
  const { taro = false, autoImport = false } = options

  // const packageName = taro ? '@islandui/islandui-taro' : '@islandui/islandui'
  const packageName = '@islandui/islandui-taro'

  const componentName = autoImport ? name.slice(4) : name

  const style = `${packageName}/dist/packages/${componentName.toLowerCase()}/style`

  return {
    name,
    from: packageName,
    sideEffects: style
  }
}

/**
 * Resolver for IslandUI 1.0+
 *
 * @link https://github.com/Damiyinliao/island-ui
 */
export default function IslandUIResolver(options: IslandUIResolverOptions = {}): ComponentResolver {
  return {
    type: 'component',
    resolve: (name) => {
      const { autoImport = false } = options

      if (autoImport && islandFunctions.includes(name)) return getIslandResolved(name, options)

      if (name.startsWith('Island')) return getIslandResolved(name.slice(3), options)
    }
  }
}
