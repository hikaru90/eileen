import _sfc_main$1 from './nuxt-icon-19667aae.mjs';
import { defineComponent, reactive, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { b as useSidebarStore, e as useContentStore } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ArrayPane",
  __ssrInlineRender: true,
  props: {
    array: null,
    entry: null,
    index: null,
    label: { default: "Eintrag" }
  },
  emits: ["arrayChanged"],
  setup(__props, { emit }) {
    const props = __props;
    useSidebarStore();
    useContentStore();
    const state = reactive({
      expanded: false
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_icon = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mb-2 border border-offwhite rounded-sm border-opacity-20" }, _attrs))}><div class="${ssrRenderClass([[{ "border-b border-offwhite mb-2 border-opacity-20": unref(state).expanded }], "flex items-center justify-between px-2 hover:bg-offwhite hover:bg-opacity-20"])}"><button aria-label="Expand" class="flex-grow text-left flex items-center gap-2"><div>${ssrInterpolate(unref(state).expanded ? "-" : "+")}</div><div class="flex-grow">${ssrInterpolate(props.label)}</div></button><div class="flex items-center"><button aria-label="Delete and save">`);
      _push(ssrRenderComponent(_component_nuxt_icon, {
        name: "icon-cross",
        class: "text-xl"
      }, null, _parent));
      _push(`</button><button aria-label="Move up and save">`);
      _push(ssrRenderComponent(_component_nuxt_icon, {
        name: "icon-triangle_up",
        class: "text-xl"
      }, null, _parent));
      _push(`</button><button aria-label="Move down and save">`);
      _push(ssrRenderComponent(_component_nuxt_icon, {
        name: "icon-triangle_down",
        class: "text-xl"
      }, null, _parent));
      _push(`</button></div></div>`);
      if (unref(state).expanded) {
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ArrayPane.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=ArrayPane-dd6b7018.mjs.map
