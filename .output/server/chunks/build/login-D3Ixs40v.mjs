import { reactive, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
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
//# sourceMappingURL=login-D3Ixs40v.mjs.map
