import { a as useRuntimeConfig } from './server.mjs';
import { defineComponent, reactive, onUnmounted, mergeProps, useSSRContext } from 'vue';
import { u as useImage } from './composables-6a57cce2.mjs';
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate } from 'vue/server-renderer';
import { d as defaults$1 } from './defaults-f8562223.mjs';
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
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: [[{ "-mt-24": props.isFirst }], "h-[400px] lg:h-[600px] relative text-white overflow-visible"]
      }, _attrs))} data-v-e3d1bb7f><div class="max-container h-full relative z-10" data-v-e3d1bb7f><div class="h-full flex items-center justify-center" data-v-e3d1bb7f><div class="mt-10" data-v-e3d1bb7f><h2 style="${ssrRenderStyle({ "max-width": "15em", "text-shadow": "rgba(0,0,0,0.8) 0 0 80px" })}" class="font-bold text-xl sm:text-2xl md:text-4xl lg:text-5xl mb-10 border-2 border-gold px-5 py-3 rounded text-center" data-v-e3d1bb7f>${ssrInterpolate(props.component.content.heading)}</h2></div></div></div><div class="w-full h-full absolute top-0 left-0" data-v-e3d1bb7f><div style="${ssrRenderStyle({ "background-image": "radial-gradient(\r\n            circle,\r\n            rgba(2, 55, 41, 1) 0%,\r\n            rgba(0, 31, 31, 1) 60%,\r\n            rgba(53, 65, 30, 1) 100%\r\n          )", "mix-blend-mode": "multiply" })}" class="w-full h-full opacity-20 absolute" data-v-e3d1bb7f></div><div style="${ssrRenderStyle([{ backgroundImage: `url(${getCurrentImageUrl(props.component.content.image)})` }])}" class="w-full h-full bg-cover bg-[60%] lg:bg-center" data-v-e3d1bb7f></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/Component/HeroSmall.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const HeroSmall = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e3d1bb7f"]]);

export { HeroSmall as default };
//# sourceMappingURL=HeroSmall-8c0fc427.mjs.map
