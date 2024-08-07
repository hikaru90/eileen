import { _ as _sfc_main$1, a as _sfc_main$3 } from './Footer-DbLffQR7.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$2 } from './UpButton-DUP0ZfJE.mjs';
import _sfc_main$4 from './index-CCzkVZ3A.mjs';
import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderSlot } from 'vue/server-renderer';
import { a as useAuthStore } from './server.mjs';
import './nuxt-icon-Cyx4B1z0.mjs';
import './nuxt-link-C8A7HrUk.mjs';
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
  __name: "sidebar",
  __ssrInlineRender: true,
  setup(__props) {
    const authStore = useAuthStore();
    computed(() => {
      return false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EditorBar = _sfc_main$1;
      const _component_Menu = _sfc_main$1$1;
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
//# sourceMappingURL=sidebar-CJPkbQdV.mjs.map
