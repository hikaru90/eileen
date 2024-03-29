import { reactive, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { u as useAuthStore } from './server.mjs';
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

const _sfc_main = {
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    useAuthStore();
    const state = reactive({
      email: "",
      password: "",
      error: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center justify-center flex-grow" }, _attrs))}><div class="relative flex flex-col"><form class="flex flex-col gap-2"><input${ssrRenderAttr("value", unref(state).email)} type="email" required placeholder="E-Mail" class="border border-grey border-opacity-20 rounded px-3 py-2"><input${ssrRenderAttr("value", unref(state).password)} type="password" required placeholder="Passwort" class="border border-grey border-opacity-20 rounded px-3 py-2"><button type="submit" class="bg-green rounded px-3 py-2">Einloggen</button></form>`);
      if (unref(state).error) {
        _push(`<div class="bg-lightRed text-red rounded px-3 py-0.5 mt-3 w-full absolute -bottom-3 transform translate-y-full left-0">${ssrInterpolate(unref(state).error)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-d370dc57.mjs.map
