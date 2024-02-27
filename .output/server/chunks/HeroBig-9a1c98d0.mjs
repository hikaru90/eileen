import { a as useRuntimeConfig } from './server.mjs';
import { defineComponent, reactive, onUnmounted, mergeProps, useSSRContext } from 'vue';
import { u as useImage } from './composables-94ee145b.mjs';
import { ssrRenderAttrs, ssrRenderStyle } from 'vue/server-renderer';
import { d as defaults$1 } from './defaults-8dd57efa.mjs';
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
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: [[{ "-mt-24": props.isFirst }], "h-[400px] lg:h-[900px] relative bg-[#F6F4F2] text-white overflow-visible"]
      }, _attrs))} data-v-635684cd><div class="max-container h-full relative z-10" data-v-635684cd><div class="h-full flex items-center justify-center" data-v-635684cd><div class="mt-10" data-v-635684cd><h2 style="${ssrRenderStyle({ "max-width": "15em" })}" class="text-coffee font-heading text-2xl sm:text-5xl md:text-6xl lg:text-7xl mb-10 lg:mb-20 text-center" data-v-635684cd>${_ctx.$mdRenderer.set({ html: true }).render(props.component.content.heading)}</h2><p class="text-coffee uppercase text-center text-xs sm:text-lg" data-v-635684cd>${_ctx.$mdRenderer.set({ html: true }).render(props.component.content.subline)}</p></div></div></div><div class="w-full h-full absolute top-0 left-0" data-v-635684cd><div style="${ssrRenderStyle({ "background-image": "radial-gradient(\r\n            circle,\r\n            rgb(250, 244, 216) 0%,\r\n            #FBF9F7 60%,\r\n            #f9f3ec 100%\r\n          )", "mix-blend-mode": "multiply" })}" class="w-full h-full opacity-20 absolute" data-v-635684cd></div><div style="${ssrRenderStyle([{ backgroundImage: `url(${getCurrentImageUrl(props.component.content.image)})` }])}" class="w-full h-full bg-cover bg-center opacity-70" data-v-635684cd></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/Component/HeroBig.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const HeroBig = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-635684cd"]]);

export { HeroBig as default };
//# sourceMappingURL=HeroBig-9a1c98d0.mjs.map
