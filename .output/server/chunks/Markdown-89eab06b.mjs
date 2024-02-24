import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
import { b as useSidebarStore, s as storeToRefs } from './server.mjs';
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
  __name: "Markdown",
  __ssrInlineRender: true,
  props: {
    block: null
  },
  setup(__props) {
    const props = __props;
    const sidebarStore = useSidebarStore();
    storeToRefs(sidebarStore);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      if ((_a = props.block.content) == null ? void 0 : _a.markdown) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          style: { "min-height": "20px" },
          class: "markdown"
        }, _attrs))}>${_ctx.$mdRenderer.render((_c = (_b = props.block) == null ? void 0 : _b.content) == null ? void 0 : _c.markdown)}</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/Block/Markdown.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=Markdown-89eab06b.mjs.map
