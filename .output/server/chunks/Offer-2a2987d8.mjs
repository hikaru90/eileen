import { _ as _sfc_main$1 } from './IntersectonPop-27c95f80.mjs';
import _sfc_main$2 from './nuxt-icon-8914e1be.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-f7629129.mjs';
import { a as useRuntimeConfig } from './server.mjs';
import { defineComponent, reactive, mergeProps, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
import { u as useImage } from './composables-94ee145b.mjs';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { d as defaults$1 } from './defaults-65aa47ff.mjs';
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
  __name: "Offer",
  __ssrInlineRender: true,
  props: {
    component: { default: {
      content: defaults$1.find((el) => el.type === "offer").content
    } }
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
    return (_ctx, _push, _parent, _attrs) => {
      const _component_IntersectonPop = _sfc_main$1;
      const _component_nuxt_icon = _sfc_main$2;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "py-16 md:py-24 relative" }, _attrs))} data-v-f00aa45d><div style="${ssrRenderStyle({ "background-image": "radial-gradient(\r\n          circle,\r\n          #FAF1DF 0%,\r\n          transparent 60%\r\n        )" })}" class="absolute left-1/2 top-1/2 -z-10 w-[2000px] h-[2000px] transform -translate-x-1/2 -translate-y-1/2" data-v-f00aa45d></div><div class="max-container" data-v-f00aa45d><div class="flex items-center justify-center" data-v-f00aa45d>`);
      _push(ssrRenderComponent(_component_IntersectonPop, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="shiny-pop font-heading text-lg sm:text-xl md:text-3xl lg:text-4xl mb-16 text-center text-salmon" data-v-f00aa45d${_scopeId}>${ssrInterpolate(props.component.content.heading)}</h2>`);
          } else {
            return [
              createVNode("h2", { class: "shiny-pop font-heading text-lg sm:text-xl md:text-3xl lg:text-4xl mb-16 text-center text-salmon" }, toDisplayString(props.component.content.heading), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex flex-col md:flex-row itmes-stretch justify-center gap-16 relative" data-v-f00aa45d><!--[-->`);
      ssrRenderList(props.component.content.offers, (offer, index) => {
        _push(`<div class="w-full md:w-1/2 md:max-w-[390px] shadow-2xl shadow-coffee/10 rounded-lg overflow-hidden border border-coffee border-opacity-10" data-v-f00aa45d><div style="${ssrRenderStyle([{ backgroundImage: `url(${getCurrentImageUrl(offer.image)})` }])}" class="w-full h-52 bg-cover" data-v-f00aa45d></div><div class="bg-white px-10 py-12 h-full" data-v-f00aa45d><h3 class="font-heading text-xl mb-1.5" data-v-f00aa45d>${ssrInterpolate(offer.name)}</h3><div class="mb-2" data-v-f00aa45d>${ssrInterpolate(offer.type)}</div><div class="border border-coffee border-opacity-20 rounded-full inline-flex items-center text-xs px-2 gap-1 mb-10 -ml-0.5" data-v-f00aa45d>`);
        _push(ssrRenderComponent(_component_nuxt_icon, {
          name: "icon-camera",
          class: "text-xs text-green opacity-80"
        }, null, _parent));
        _push(` online verf\xFCgbar </div><div class="min-h-[60px] mb-10" data-v-f00aa45d>${ssrInterpolate(offer.description)}</div><div class="flex items-end gap-4 mb-6" data-v-f00aa45d><div class="text-2xl" data-v-f00aa45d>${ssrInterpolate(offer.price)} \u20AC </div><div class="mb-[2px]" data-v-f00aa45d>${ssrInterpolate(offer.duration)}</div></div>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/buchen",
          class: "bg-salmon rounded-full text-white inline-flex items-center px-5 py-2 shadow-md"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div style="${ssrRenderStyle({ "text-shadow": "rgba(0, 0, 0, 0.8) 0 0 40px" })}" class="" data-v-f00aa45d${_scopeId}> Buchen </div>`);
            } else {
              return [
                createVNode("div", {
                  style: { "text-shadow": "rgba(0, 0, 0, 0.8) 0 0 40px" },
                  class: ""
                }, " Buchen ")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div></div>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/Component/Offer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Offer = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f00aa45d"]]);

export { Offer as default };
//# sourceMappingURL=Offer-2a2987d8.mjs.map
