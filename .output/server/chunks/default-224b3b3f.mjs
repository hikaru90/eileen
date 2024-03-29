import { _ as __nuxt_component_0, a as _sfc_main$3 } from './Footer-e04622cb.mjs';
import { _ as _sfc_main$1, a as _sfc_main$2 } from './UpButton-926e7e5a.mjs';
import { u as useAuthStore, a as useRuntimeConfig } from './server.mjs';
import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import './nuxt-icon-8914e1be.mjs';
import './nuxt-link-f7629129.mjs';
import 'ufo';
import 'ofetch';
import 'hookable';
import 'unctx';
import '@unhead/vue';
import '@unhead/dom';
import '@unhead/ssr';
import 'vue-router';
import 'h3';
import 'markdown-it';
import 'mitt';
import 'defu';
import 'pocketbase';
import './node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'destr';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'ohash';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'ipx';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const authStore = useAuthStore();
    const config = useRuntimeConfig();
    computed(() => {
      return config.ENV;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EditorBar = __nuxt_component_0;
      const _component_Menu = _sfc_main$1;
      const _component_UpButton = _sfc_main$2;
      const _component_Footer = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col h-full justify-between" }, _attrs))}><div class="flex flex-col flex-grow"><div>`);
      if (unref(authStore).token) {
        _push(ssrRenderComponent(_component_EditorBar, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex flex-col flex-grow relative">`);
      _push(ssrRenderComponent(_component_Menu, { class: "" }, null, _parent));
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_UpButton, null, null, _parent));
      _push(ssrRenderComponent(_component_Footer, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-224b3b3f.mjs.map
