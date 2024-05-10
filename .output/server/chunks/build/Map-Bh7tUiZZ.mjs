import _sfc_main$1 from './nuxt-icon-Cyx4B1z0.mjs';
import { defineComponent, reactive, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { d as defaults$1 } from './defaults-CgFcJQec.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Map",
  __ssrInlineRender: true,
  props: {
    component: { default: {
      content: defaults$1.find((el) => el.type === "map").content
    } }
  },
  setup(__props) {
    const props = __props;
    reactive({});
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f;
      const _component_nuxt_icon = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white pb-24 text-coffee" }, _attrs))} data-v-7f71699c><div class="max-container" data-v-7f71699c><div class="flex flex-col lg:flex-row gap-10" data-v-7f71699c><div class="w-full flex gap-10 py-8 text-sm justify-around" data-v-7f71699c><div class="flex items-center" data-v-7f71699c><div class="flex-shrink-0 mr-2 flex items-center justify-center w-20 h-10" data-v-7f71699c>`);
      _push(ssrRenderComponent(_component_nuxt_icon, {
        name: "icon-marker",
        class: "text-6xl text-coffee"
      }, null, _parent));
      _push(`</div><div data-v-7f71699c>${_ctx.$mdRenderer.set({ html: true }).render((_a = props.component.content) == null ? void 0 : _a.address)}</div></div><div class="flex items-center" data-v-7f71699c><div class="flex-shrink-0 mr-2 flex items-center justify-center w-20 h-10" data-v-7f71699c>`);
      _push(ssrRenderComponent(_component_nuxt_icon, {
        name: "icon-phone",
        class: "text-6xl text-coffee"
      }, null, _parent));
      _push(`</div><div data-v-7f71699c><a${ssrRenderAttr("href", "tel:" + ((_b = props.component.content) == null ? void 0 : _b.phone))} class="underline" data-v-7f71699c>${ssrInterpolate((_c = props.component.content) == null ? void 0 : _c.phone)}</a><br data-v-7f71699c> ${ssrInterpolate((_d = props.component.content) == null ? void 0 : _d.openinghours)}</div></div><div class="flex items-center" data-v-7f71699c><div class="flex-shrink-0 mr-2 flex items-center justify-center w-20 h-10" data-v-7f71699c>`);
      _push(ssrRenderComponent(_component_nuxt_icon, {
        name: "icon-mail",
        class: "text-5xl text-coffee"
      }, null, _parent));
      _push(`</div><div data-v-7f71699c><a${ssrRenderAttr("href", "mailto:" + ((_e = props.component.content) == null ? void 0 : _e.mail))} class="underline" data-v-7f71699c>${ssrInterpolate((_f = props.component.content) == null ? void 0 : _f.mail)}</a></div></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/Component/Map.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Map = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7f71699c"]]);

export { Map as default };
//# sourceMappingURL=Map-Bh7tUiZZ.mjs.map
