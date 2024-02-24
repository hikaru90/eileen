import { _ as __nuxt_component_0 } from './nuxt-link-f7629129.mjs';
import _sfc_main$1 from './nuxt-icon-14b11dc2.mjs';
import { a as useRuntimeConfig } from './server.mjs';
import { defineComponent, reactive, onUnmounted, mergeProps, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
import { u as useImage } from './composables-6a57cce2.mjs';
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { d as defaults$1 } from './defaults-f8562223.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';
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
  __name: "HeroBig",
  __ssrInlineRender: true,
  props: {
    component: { default: {
      content: defaults$1.find((el) => el.type === "heroBig").content
    } },
    isFirst: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const config = useRuntimeConfig();
    reactive({});
    const getCurrentImageUrl = (filename) => {
      const img = useImage();
      const imgUrl = img(
        `${config.SERVER_URL}/api/files/${props.component.collectionName}/${props.component.id}/${filename}`,
        {
          format: "webp"
        }
      );
      return imgUrl;
    };
    onUnmounted(() => {
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_nuxt_icon = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: [[{ "-mt-24": props.isFirst }], "h-[400px] lg:h-[900px] relative bg-black text-white overflow-visible"]
      }, _attrs))} data-v-45d99df6><div class="max-container h-full relative z-10" data-v-45d99df6><div class="h-full flex items-center justify-start" data-v-45d99df6><div class="mt-10 sm:ml-10 md:ml-20" data-v-45d99df6><h2 style="${ssrRenderStyle({ "max-width": "15em" })}" class="font-bold text-xl sm:text-2xl md:text-4xl lg:text-5xl mb-10" data-v-45d99df6>${ssrInterpolate(props.component.content.heading)}</h2>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: props.component.content.cta.link,
        title: props.component.content.cta.text,
        class: "inline-flex items-center border-2 border-gold rounded text-offwhite px-4 py-3"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div style="${ssrRenderStyle({ "text-shadow": "rgba(0, 0, 0, 0.8) 0 0 40px" })}" data-v-45d99df6${_scopeId}>${ssrInterpolate(props.component.content.cta.text)}</div><div class="flex items-center justify-center bg-gradient-to-b from-gold via-lightGold to-darkGold rounded-full ml-2 w-4 h-4" data-v-45d99df6${_scopeId}>`);
            _push2(ssrRenderComponent(_component_nuxt_icon, {
              name: props.component.content.cta.icon,
              class: "text-sm text-black"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { style: { "text-shadow": "rgba(0, 0, 0, 0.8) 0 0 40px" } }, toDisplayString(props.component.content.cta.text), 1),
              createVNode("div", { class: "flex items-center justify-center bg-gradient-to-b from-gold via-lightGold to-darkGold rounded-full ml-2 w-4 h-4" }, [
                createVNode(_component_nuxt_icon, {
                  name: props.component.content.cta.icon,
                  class: "text-sm text-black"
                }, null, 8, ["name"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><div class="w-full h-full absolute top-0 left-0" data-v-45d99df6><div style="${ssrRenderStyle({ "background-image": "radial-gradient(\r\n            circle,\r\n            rgba(2, 55, 41, 1) 0%,\r\n            rgba(0, 31, 31, 1) 60%,\r\n            rgba(53, 65, 30, 1) 100%\r\n          )", "mix-blend-mode": "multiply" })}" class="w-full h-full opacity-20 absolute" data-v-45d99df6></div><div style="${ssrRenderStyle([{ backgroundImage: `url(${getCurrentImageUrl(props.component.content.image)})` }])}" class="w-full h-full bg-cover bg-[60%] lg:bg-bottom" data-v-45d99df6></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/Component/HeroBig.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const HeroBig = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-45d99df6"]]);

export { HeroBig as default };
//# sourceMappingURL=HeroBig-d253ac38.mjs.map
