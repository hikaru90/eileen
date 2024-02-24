import { mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr } from 'vue/server-renderer';
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
    let email = "";
    let password = "";
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-center flex-grow" }, _attrs))}><form class="flex flex-col gap-2"><input${ssrRenderAttr("value", unref(email))} type="email" required placeholder="E-Mail" class="border border-grey border-opacity-20 rounded-sm px-3 py-2"><input${ssrRenderAttr("value", unref(password))} type="password" required placeholder="Passwort" class="border border-grey border-opacity-20 rounded-sm px-3 py-2"><button type="submit" class="bg-green rounded-sm px-3 py-2">Einloggen</button></form></div>`);
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
//# sourceMappingURL=login-59f7df70.mjs.map
