import { _ as _sfc_main$1, a as _sfc_main$2 } from './Footer-DbLffQR7.mjs';
import { a as useAuthStore, i as useRuntimeConfig } from './server.mjs';
import { defineComponent, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import './nuxt-icon-Cyx4B1z0.mjs';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'ipx';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'mitt';
import 'markdown-it';
import 'pocketbase';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "blank",
  __ssrInlineRender: true,
  setup(__props) {
    useAuthStore();
    const config = useRuntimeConfig();
    computed(() => {
      return config.ENV;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EditorBar = _sfc_main$1;
      const _component_Footer = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "content-container",
        class: "flex flex-col h-full justify-between"
      }, _attrs))}>`);
      _push(ssrRenderComponent(_component_EditorBar, null, null, _parent));
      _push(`<div class="flex flex-col flex-grow">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
      _push(ssrRenderComponent(_component_Footer, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/blank.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=blank-CYvuOZut.mjs.map
