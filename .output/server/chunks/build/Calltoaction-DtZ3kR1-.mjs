import _sfc_main$1 from './nuxt-icon-Cyx4B1z0.mjs';
import { defineComponent, reactive, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { a as useAuthStore } from './server.mjs';
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
  __name: "Calltoaction",
  __ssrInlineRender: true,
  props: {
    block: {}
  },
  setup(__props) {
    const authStore = useAuthStore();
    const props = __props;
    reactive({});
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d;
      const _component_nuxt_icon = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)}><a${ssrRenderAttr("href", unref(authStore).token ? "#" : (_a = props.block.content) == null ? void 0 : _a.calltoaction.link)}${ssrRenderAttr("title", (_b = props.block.content) == null ? void 0 : _b.calltoaction.text)} class="flex items-center border-2 border-gold rounded text-offwhite px-4 py-3"><div>${ssrInterpolate((_c = props.block.content) == null ? void 0 : _c.calltoaction.text)}</div><div class="flex items-center justify-center bg-gradient-to-b from-gold via-lightGold to-darkGold rounded-full ml-2 w-4 h-4">`);
      _push(ssrRenderComponent(_component_nuxt_icon, {
        name: (_d = props.block.content) == null ? void 0 : _d.calltoaction.icon,
        class: "text-sm text-coffee"
      }, null, _parent));
      _push(`</div></a></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/Block/Calltoaction.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=Calltoaction-DtZ3kR1-.mjs.map
