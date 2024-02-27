import { a as useRuntimeConfig } from './server.mjs';
import { defineComponent, reactive, computed, mergeProps, unref, useSSRContext } from 'vue';
import { u as useImage } from './composables-94ee145b.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderStyle, ssrRenderList } from 'vue/server-renderer';
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
  __name: "ImageList",
  __ssrInlineRender: true,
  props: {
    component: { default: {
      content: defaults$1.find((el) => el.type === "imageList").content
    } }
  },
  setup(__props) {
    const props = __props;
    const config = useRuntimeConfig();
    reactive({});
    const currentImageUrl = computed(() => {
      const img = useImage();
      const imgUrl = img(
        `${config.SERVER_URL}/api/files/${props.component.collectionName}/${props.component.id}/${props.component.content.image}`,
        {
          format: "webp"
        }
      );
      return imgUrl;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mb-36 mt-24" }, _attrs))} data-v-7f7a965a><div class="max-container" data-v-7f7a965a><div class="flex items-center justify-center" data-v-7f7a965a><h2 class="font-bold text-lg md:text-xl lg:text-2xl mb-20" data-v-7f7a965a>${ssrInterpolate(props.component.content.heading)}</h2></div><div class="flex flex-col lg:flex-row lg:items-stretch justify-center" data-v-7f7a965a><div class="w-full lg:w-1/2 lg:flex lg:justify-end mb-20 lg:mb-0" data-v-7f7a965a><div style="${ssrRenderStyle([{ backgroundImage: `url(${unref(currentImageUrl)})` }])}" class="h-60 lg:h-full lg:w-[500px] lg:mr-10 relative bg-cover bg-center rounded" data-v-7f7a965a></div></div><div class="w-full lg:w-1/2" data-v-7f7a965a><div class="" data-v-7f7a965a><!--[-->`);
      ssrRenderList(props.component.content.list, (item, index) => {
        _push(`<div class="slide flex items-start gap-4 transition-opacity delay-300 relative -ml-2 lg:ml-0" data-v-7f7a965a><div style="${ssrRenderStyle({ "width": "1px" })}" class="connector h-full absolute top-2 left-[7px] bg-gold mb-1 -z-10" data-v-7f7a965a></div><div class="slideParagraph mb-6 flex" data-v-7f7a965a><div class="w-4 h-4 bg-gold rounded-full flex-shrink-0" data-v-7f7a965a></div><div class="ml-4 -mt-[5px]" data-v-7f7a965a><h3 class="inline-block bg-gold rounded px-2 mb-[5px] text-sm" data-v-7f7a965a>${ssrInterpolate(item.type)}</h3><div class="" data-v-7f7a965a>${ssrInterpolate(item.place)}</div><div class="font-bold" data-v-7f7a965a>${ssrInterpolate(item.name)}</div></div></div></div>`);
      });
      _push(`<!--]--></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/Component/ImageList.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ImageList = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7f7a965a"]]);

export { ImageList as default };
//# sourceMappingURL=ImageList-457bdfd3.mjs.map
