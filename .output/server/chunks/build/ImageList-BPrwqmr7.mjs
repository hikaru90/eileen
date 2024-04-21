import { _ as _sfc_main$1 } from './IntersectonPop-BCl9OGRc.mjs';
import { i as useRuntimeConfig } from './server.mjs';
import { defineComponent, reactive, computed, mergeProps, withCtx, createVNode, toDisplayString, unref, useSSRContext } from 'vue';
import { u as useImage } from './composables-Q-rs6X_2.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderList } from 'vue/server-renderer';
import { d as defaults$1 } from './defaults-CgFcJQec.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ImageList",
  __ssrInlineRender: true,
  props: {
    component: { default: {
      content: defaults$1.find((el) => el.type === "imageList").content
    } }
  },
  setup(__props) {
    const config = useRuntimeConfig();
    const props = __props;
    reactive({});
    const currentImageUrl = computed(() => {
      const img = useImage();
      const imgUrl = img(
        `${config.public.SERVER_URL}/api/files/${props.component.collectionName}/${props.component.id}/${props.component.content.image}`,
        {
          format: "webp"
        }
      );
      return imgUrl;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_IntersectonPop = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mb-36 mt-24" }, _attrs))} data-v-6bec99c7><div class="max-container" data-v-6bec99c7><div class="flex items-center justify-center" data-v-6bec99c7>`);
      _push(ssrRenderComponent(_component_IntersectonPop, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="shiny-pop text-salmon font-bold text-lg md:text-xl lg:text-2xl mb-20" data-v-6bec99c7${_scopeId}>${ssrInterpolate(props.component.content.heading)}</h2>`);
          } else {
            return [
              createVNode("h2", { class: "shiny-pop text-salmon font-bold text-lg md:text-xl lg:text-2xl mb-20" }, toDisplayString(props.component.content.heading), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex flex-col lg:flex-row lg:items-stretch justify-center" data-v-6bec99c7><div class="w-full lg:w-1/2 lg:flex lg:justify-end mb-20 lg:mb-0" data-v-6bec99c7><div style="${ssrRenderStyle([{ backgroundImage: `url(${unref(currentImageUrl)})` }])}" class="h-60 lg:h-full lg:w-[500px] lg:mr-10 relative bg-cover bg-center rounded" data-v-6bec99c7></div></div><div class="w-full lg:w-1/2" data-v-6bec99c7><div class="" data-v-6bec99c7><!--[-->`);
      ssrRenderList(props.component.content.list, (item, index) => {
        _push(`<div class="slide flex items-start gap-4 transition-opacity delay-300 relative -ml-2 lg:ml-0" data-v-6bec99c7><div style="${ssrRenderStyle({ "width": "1px" })}" class="connector h-full absolute top-2 left-[7px] bg-gold mb-1 -z-10" data-v-6bec99c7></div><div class="slideParagraph mb-6 flex" data-v-6bec99c7><div class="w-4 h-4 bg-gold rounded-full flex-shrink-0" data-v-6bec99c7></div><div class="ml-4 -mt-[5px]" data-v-6bec99c7><h3 class="inline-block bg-gold rounded px-2 mb-[5px] text-sm" data-v-6bec99c7>${ssrInterpolate(item.type)}</h3><div class="" data-v-6bec99c7>${ssrInterpolate(item.place)}</div><div class="font-bold" data-v-6bec99c7>${ssrInterpolate(item.name)}</div></div></div></div>`);
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
const ImageList = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6bec99c7"]]);

export { ImageList as default };
//# sourceMappingURL=ImageList-BPrwqmr7.mjs.map
