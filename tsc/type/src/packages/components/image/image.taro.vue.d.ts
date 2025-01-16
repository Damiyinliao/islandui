import type { ImageProps as TaroImageProps } from '@tarojs/components';
export type ImageProps = Partial<{
    size: number;
    width: number | string;
    height: number;
    radius: number | string;
    src: string;
    mode: keyof TaroImageProps.Mode;
}>;
declare const _default: import("vue").DefineComponent<Partial<{
    size: number;
    width: number | string;
    height: number;
    radius: number | string;
    src: string;
    mode: keyof TaroImageProps.Mode;
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    load: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<Partial<{
    size: number;
    width: number | string;
    height: number;
    radius: number | string;
    src: string;
    mode: keyof TaroImageProps.Mode;
}>> & Readonly<{
    onLoad?: ((...args: any[]) => any) | undefined;
}>, {
    radius: number | string;
    mode: keyof TaroImageProps.Mode;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, SVGViewElement>;
export default _default;
