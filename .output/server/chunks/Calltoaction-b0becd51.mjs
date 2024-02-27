import _sfc_main$1 from './nuxt-icon-19667aae.mjs';
import { u as useAuthStore, a as useRuntimeConfig } from './server.mjs';
import { defineComponent, reactive, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import 'ofetch';
import 'hookable';
import 'unctx';
import '@unhead/vue';
import '@unhead/dom';
import '@unhead/ssr';
import 'vue-router';
import 'h3';
import 'ufo';
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
  __name: "Calltoaction",
  __ssrInlineRender: true,
  props: {
    block: null
  },
  setup(__props) {
    const props = __props;
    const authStore = useAuthStore();
    useRuntimeConfig();
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
//# sourceMappingURL=Calltoaction-b0becd51.mjs.map
