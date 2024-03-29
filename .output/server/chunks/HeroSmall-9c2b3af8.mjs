import { _ as _sfc_main$1 } from './IntersectonPop-27c95f80.mjs';
import { a as useRuntimeConfig } from './server.mjs';
import { defineComponent, reactive, onUnmounted, mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { u as useImage } from './composables-94ee145b.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate } from 'vue/server-renderer';
import { d as defaults$1 } from './defaults-65aa47ff.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';
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
  __name: "HeroSmall",
  __ssrInlineRender: true,
  props: {
    component: { default: {
      content: defaults$1.find((el) => el.type === "heroSmall").content
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
      const _component_IntersectonPop = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: [[{ "-mt-24": props.isFirst }], "h-[300px] lg:h-[400px] relative text-white overflow-visible"]
      }, _attrs))} data-v-6f7c13b4><div class="max-container h-full relative z-10" data-v-6f7c13b4><div class="h-full flex items-center justify-center" data-v-6f7c13b4><div class="mt-10 mb-10" data-v-6f7c13b4>`);
      _push(ssrRenderComponent(_component_IntersectonPop, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 style="${ssrRenderStyle({ "max-width": "15em" })}" class="shiny-pop text-salmon font-heading text-2xl sm:text-5xl md:text-5xl lg:text-6xl text-center" data-v-6f7c13b4${_scopeId}>${_ctx.$mdRenderer.set({ html: true }).render(props.component.content.heading)}</h2>`);
          } else {
            return [
              createVNode("h2", {
                style: { "max-width": "15em" },
                class: "shiny-pop text-salmon font-heading text-2xl sm:text-5xl md:text-5xl lg:text-6xl text-center",
                innerHTML: _ctx.$mdRenderer.set({ html: true }).render(props.component.content.heading)
              }, null, 8, ["innerHTML"])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (props.component.content.subline) {
        _push(`<div class="text-coffee uppercase text-center text-xs sm:text-lg mt-6" data-v-6f7c13b4>${ssrInterpolate(props.component.content.subline)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div><div class="w-full h-full absolute top-0 left-0" data-v-6f7c13b4><div style="${ssrRenderStyle({ "background-image": "radial-gradient(\r\n            circle,\r\n            rgb(250, 244, 216) 0%,\r\n            #FBF9F7 60%,\r\n            #f9f3ec 100%\r\n          )", "mix-blend-mode": "multiply" })}" class="w-full h-full opacity-20 absolute" data-v-6f7c13b4></div><div style="${ssrRenderStyle([{ backgroundImage: `url(${getCurrentImageUrl(props.component.content.image)})` }])}" class="w-full h-full bg-cover bg-center opacity-70" data-v-6f7c13b4></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/Component/HeroSmall.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const HeroSmall = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6f7c13b4"]]);

export { HeroSmall as default };
//# sourceMappingURL=HeroSmall-9c2b3af8.mjs.map
