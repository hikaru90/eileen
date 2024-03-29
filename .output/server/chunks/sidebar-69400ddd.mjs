import { _ as __nuxt_component_0, a as _sfc_main$3 } from './Footer-e04622cb.mjs';
import { _ as _sfc_main$1, a as _sfc_main$2 } from './UpButton-f034b592.mjs';
import _sfc_main$4 from './index-6b012427.mjs';
import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderSlot } from 'vue/server-renderer';
import { u as useAuthStore } from './server.mjs';
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
  __name: "sidebar",
  __ssrInlineRender: true,
  setup(__props) {
    const authStore = useAuthStore();
    computed(() => {
      return false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EditorBar = __nuxt_component_0;
      const _component_Menu = _sfc_main$1;
      const _component_UpButton = _sfc_main$2;
      const _component_Footer = _sfc_main$3;
      const _component_Sidebar = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col h-full justify-between" }, _attrs))}><div class="flex flex-grow h-screen"><div id="content-container" class="flex flex-col flex-grow overflow-auto relative"><div class="flex flex-col flex-grow"><div>`);
      if (unref(authStore).token) {
        _push(ssrRenderComponent(_component_EditorBar, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="${ssrRenderClass([[{ "overflow-hidden": !unref(authStore).token }], "flex flex-col flex-grow relative"])}">`);
      _push(ssrRenderComponent(_component_Menu, {
        id: "top",
        class: ""
      }, null, _parent));
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_UpButton, null, null, _parent));
      _push(ssrRenderComponent(_component_Footer, null, null, _parent));
      _push(`</div>`);
      if (unref(authStore).token) {
        _push(`<div class="bg-coffee w-96 text-darkOffwhite overflow-auto flex-shrink-0">`);
        _push(ssrRenderComponent(_component_Sidebar, null, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/sidebar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=sidebar-69400ddd.mjs.map
