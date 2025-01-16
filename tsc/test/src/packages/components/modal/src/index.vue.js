import { computed, ref, watch } from 'vue';
defineOptions({
    name: 'BlankModal'
});
const props = defineProps();
const emit = defineEmits();
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
    }
    else {
        startLeaveAnimation();
    }
});
;
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    __VLS_elementAsFunction(__VLS_intrinsicElements.view, __VLS_intrinsicElements.view)({});
    if (__VLS_ctx.show) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.view, __VLS_intrinsicElements.view)({
            ...{ onTap: (__VLS_ctx.onMaskClick) },
            ...{ class: ("modal-mask") },
        });
    }
    if (__VLS_ctx.show) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.view, __VLS_intrinsicElements.view)({
            ...{ onAnimationend: (__VLS_ctx.onAnimationEnd) },
            ...{ onTap: () => { } },
            ...{ class: ("modal-container") },
            ...{ class: (({ 'modal-enter': __VLS_ctx.isEntering, 'modal-leave': __VLS_ctx.isLeaving })) },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.view, __VLS_intrinsicElements.view)({
            ...{ class: ("modal-container__inner") },
        });
        var __VLS_0 = {};
    }
    ['modal-mask', 'modal-container', 'modal-enter', 'modal-leave', 'modal-container__inner',];
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
            show: show,
            isEntering: isEntering,
            isLeaving: isLeaving,
            onMaskClick: onMaskClick,
            onAnimationEnd: onAnimationEnd,
        };
    },
    __typeEmits: {},
    __typeProps: {},
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
    __typeProps: {},
    __typeEl: {},
});
export default {};
;
