import { a as useRuntimeConfig } from './server.mjs';
import { defineComponent, reactive, onUnmounted, mergeProps, useSSRContext } from 'vue';
import { u as useImage } from './composables-063a49d0.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';
import { d as defaults$1 } from './defaults-12f97aee.mjs';
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
  __name: "PortraitText",
  __ssrInlineRender: true,
  props: {
    component: { default: {
      content: defaults$1.find((el) => el.type === "portraitText").content
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
        class: [[{ "-mt-24": props.isFirst }], "relative text-white overflow-visible"]
      }, _attrs))} data-v-d21e7056><div class="max-container h-full relative z-10" data-v-d21e7056><div class="h-full flex items-center justify-center py-16 md:py-24" data-v-d21e7056><div class="mt-10" data-v-d21e7056><h2 class="font-heading text-lg sm:text-xl md:text-3xl lg:text-4xl mb-10 text-center text-coffee" data-v-d21e7056>${ssrInterpolate(props.component.content.heading)}</h2><p class="text-coffee text-center max-w-[44rem]" data-v-d21e7056>${ssrInterpolate(props.component.content.text)}</p></div></div></div><div class="w-32 h-32 md:w-40 md:h-40 absolute top-0 left-1/2 transform -translate-y-1/2 -translate-x-1/2 rounded-full overflow-hidden shadow-xl" data-v-d21e7056><div style="${ssrRenderStyle({ "background-image": "radial-gradient(\r\n            circle,\r\n            rgb(250, 244, 216) 0%,\r\n            #fbf9f7 60%,\r\n            #f9f3ec 100%\r\n          )", "mix-blend-mode": "multiply" })}" class="w-full h-full opacity-20 absolute" data-v-d21e7056></div><div style="${ssrRenderStyle([{ backgroundImage: `url(${getCurrentImageUrl(props.component.content.image)})` }])}" class="-left-[1px] -right-[1px] -top-[1px] -bottom-[1px] bg-cover bg-center absolute" data-v-d21e7056></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/Component/PortraitText.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const PortraitText = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d21e7056"]]);

export { PortraitText as default };
//# sourceMappingURL=PortraitText-30f6f733.mjs.map
