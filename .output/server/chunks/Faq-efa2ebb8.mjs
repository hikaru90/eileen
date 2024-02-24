import _sfc_main$2 from './nuxt-icon-14b11dc2.mjs';
import { useSSRContext, defineComponent, mergeProps, reactive, unref } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
import { a as useRuntimeConfig } from './server.mjs';
import { d as defaults$1 } from './defaults-f8562223.mjs';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "FaqEntry",
  __ssrInlineRender: true,
  props: {
    faq: null
  },
  setup(__props) {
    const state = reactive({
      isOpen: false
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_icon = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white shadow-lg rounded border border-grey border-opacity-10" }, _attrs))}><button aria-label="FAQ Frage \xF6ffnen" class="w-full flex items-center justify-between p-4 md:p-6 lg:px-8 lg:py-6"><div class="text-left mr-5 overflow-hidden" style="${ssrRenderStyle({ "max-width": "calc(100% - 40px)" })}">${_ctx.$mdRenderer.set({ html: true }).render(__props.faq.question)}</div><div class="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-b from-gold via-lightGold to-darkGold">`);
      if (unref(state).isOpen) {
        _push(ssrRenderComponent(_component_nuxt_icon, {
          name: "icon-minus",
          class: "text-xl"
        }, null, _parent));
      } else {
        _push(ssrRenderComponent(_component_nuxt_icon, {
          name: "icon-plus",
          class: "text-xl"
        }, null, _parent));
      }
      _push(`</div></button><div style="${ssrRenderStyle([{ "maxHeight": unref(state).isOpen ? "1500px" : "0px" }])}" class="overflow-hidden transition-all"><div class="p-4 md:px-6 md:pt-4 md:pb-8 lg:px-8 lg:pt-6 lg:pb-10 border-t border-grey border-opacity-10 leading-relaxed">${_ctx.$mdRenderer.render(__props.faq.answer)}</div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/FaqEntry.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Faq",
  __ssrInlineRender: true,
  props: {
    component: { default: {
      content: defaults$1.find((el) => el.type === "faq").content
    } }
  },
  setup(__props) {
    const props = __props;
    useRuntimeConfig();
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_FaqEntry = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "my-28" }, _attrs))}><div class="max-container"><div class="flex items-center justify-center"><h2 class="font-bold text-lg md:text-xl lg:text-2xl mb-16">${ssrInterpolate((_a = props.component.content) == null ? void 0 : _a.heading)}</h2></div><div class="flex flex-col gap-2"><!--[-->`);
      ssrRenderList((_b = props.component.content) == null ? void 0 : _b.faqs, (faq, index) => {
        _push(ssrRenderComponent(_component_FaqEntry, { faq }, null, _parent));
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/Component/Faq.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=Faq-efa2ebb8.mjs.map
