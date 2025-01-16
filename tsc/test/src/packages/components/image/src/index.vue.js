import { computed, ref } from 'vue';
export default await (async () => {
    const props = withDefaults(defineProps(), {
        radius: 0,
        mode: 'widthFix'
    });
    const emit = defineEmits(['load']);
    const wrapperHeight = computed(() => {
        if (props.height) {
            return props.height + 'rpx';
        }
        else if (props.size) {
            return props.size + 'rpx';
        }
        else {
            return 'auto';
        }
    });
    const mainStyle = computed(() => ({
        width: (props.width && typeof props.width === 'string') ? props.width : `${props.size || props.width}rpx`,
        borderRadius: typeof props.radius === 'string' ? props.radius : props.radius + 'px',
        '--island-image-height': wrapperHeight.value
    }));
    const isLoad = ref(false);
    const handleImageLoad = (e) => {
        isLoad.value = true;
        emit('load', e.detail);
    };
    const handleError = (e) => {
        console.warn(e.detail.errMsg);
    };
    ;
    const __VLS_withDefaultsArg = (function (t) { return t; })({
        radius: 0,
        mode: 'widthFix'
    });
    function __VLS_template() {
        const __VLS_ctx = {};
        let __VLS_components;
        let __VLS_directives;
        __VLS_elementAsFunction(__VLS_intrinsicElements.view, __VLS_intrinsicElements.view)({
            ...{ class: ("island-image flex-center") },
            ...{ style: ((__VLS_ctx.mainStyle)) },
        });
        if (!__VLS_ctx.isLoad) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.view, __VLS_intrinsicElements.view)({
                ...{ class: ("skeleton-container") },
            });
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.image)({
            ...{ onLoad: (__VLS_ctx.handleImageLoad) },
            ...{ onError: (__VLS_ctx.handleError) },
            ...{ class: ("inner-image") },
            'lazy-load': ((true)),
            mode: ((props.mode)),
            src: ((props.src || '')),
        });
        ['island-image', 'flex-center', 'skeleton-container', 'inner-image',];
        var __VLS_slots;
        var $slots;
        let __VLS_inheritedAttrs;
        var $attrs;
        const __VLS_refs = {};
        var $refs;
        var $el;
        return {
            attrs: {},
            slots: __VLS_slots,
            refs: $refs,
            rootEl: $el,
        };
    }
    ;
    const __VLS_self = (await import('vue')).defineComponent({
        setup() {
            return {
                mainStyle: mainStyle,
                isLoad: isLoad,
                handleImageLoad: handleImageLoad,
                handleError: handleError,
            };
        },
        emits: {},
        __typeProps: {},
        props: {},
        name: 'TaroImage'
    });
    return (await import('vue')).defineComponent({
        setup() {
            return {};
        },
        emits: {},
        __typeProps: {},
        props: {},
        name: 'TaroImage',
        __typeEl: {},
    });
})();
;
