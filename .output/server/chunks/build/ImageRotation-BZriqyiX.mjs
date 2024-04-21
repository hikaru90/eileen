import { _ as _sfc_main$1 } from './IntersectonPop-BCl9OGRc.mjs';
import _sfc_main$2 from './nuxt-icon-Cyx4B1z0.mjs';
import { i as useRuntimeConfig } from './server.mjs';
import { defineComponent, reactive, onUnmounted, mergeProps, withCtx, createVNode, toDisplayString, unref, useSSRContext } from 'vue';
import { u as useImage } from './composables-Q-rs6X_2.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderStyle, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
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
  __name: "ImageRotation",
  __ssrInlineRender: true,
  props: {
    component: { default: {
      content: defaults$1.find((el) => el.type === "imageRotation").content
    } }
  },
  setup(__props) {
    const config = useRuntimeConfig();
    const props = __props;
    const state = reactive({
      donutSize: 0.15,
      timeout: 8e3,
      currentSlide: 0,
      interval: void 0
    });
    const getCurrentImageUrl = (filename) => {
      const img = useImage();
      const imgUrl = img(
        `${config.public.SERVER_URL}/api/files/${props.component.collectionName}/${props.component.id}/${filename}`,
        {
          format: "webp"
        }
      );
      return imgUrl;
    };
    const stopInterval = () => {
      clearInterval(state.interval);
    };
    onUnmounted(() => {
      stopInterval();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_IntersectonPop = _sfc_main$1;
      const _component_nuxt_icon = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mb-36" }, _attrs))} data-v-0e796a65><div class="flex items-center justify-center" data-v-0e796a65>`);
      _push(ssrRenderComponent(_component_IntersectonPop, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="shiny-pop text-salmon font-bold text-lg md:text-xl lg:text-2xl mb-20" data-v-0e796a65${_scopeId}>${ssrInterpolate(props.component.content.heading)}</h2>`);
          } else {
            return [
              createVNode("h2", { class: "shiny-pop text-salmon font-bold text-lg md:text-xl lg:text-2xl mb-20" }, toDisplayString(props.component.content.heading), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex flex-col lg:flex-row lg:items-center justify-center" data-v-0e796a65><div class="w-full lg:w-1/2 lg:flex lg:justify-end mb-20 lg:mb-0" data-v-0e796a65><div class="h-60 sm:h-80 lg:h-96 lg:w-[500px] lg:mr-10 relative bg-cover" data-v-0e796a65><!--[-->`);
      ssrRenderList(props.component.content.slides, (slide, index) => {
        _push(`<div style="${ssrRenderStyle([
          { backgroundImage: `url(${getCurrentImageUrl(slide.image)})` },
          {
            animation: index === unref(state).currentSlide ? `fadeInOut ${unref(state).timeout}ms forwards infinite` : ""
          }
        ])}" class="bg-cover bg-center absolute top-0 left-0 w-full h-full ease-in lg:rounded-md opacity-0" data-v-0e796a65></div>`);
      });
      _push(`<!--]--></div></div><div class="w-full lg:w-1/2 p-10 lg:p-0" data-v-0e796a65><div class="sm:ml-10" data-v-0e796a65><!--[-->`);
      ssrRenderList(props.component.content.slides, (slide, index) => {
        _push(`<div class="${ssrRenderClass([[index === unref(state).currentSlide ? "opacity-100" : "opacity-40"], "slide flex items-start gap-4 transition-opacity relative -ml-2 lg:ml-0"])}" data-v-0e796a65><div class="w-6 h-6 mt-[2px] flex-shrink-0 rounded-full flex items-center justify-center" data-v-0e796a65><div class="w-full my-0 mx-auto transform -rotate-90" data-v-0e796a65><svg viewBox="0 0 40 40" class="donut w-full h-full" data-v-0e796a65><linearGradient id="gold" x1="1" x2="0" y1="0" y2="0" data-v-0e796a65><stop offset="0%" stop-color="#E3C879" data-v-0e796a65></stop><stop offset="50%" stop-color="#FBF48A" data-v-0e796a65></stop><stop offset="100%" stop-color="#9B6C1C" data-v-0e796a65></stop></linearGradient><circle class="transform-center" fill="#e3c879" cx="20" cy="20" r="12" data-v-0e796a65></circle><circle style="${ssrRenderStyle([
          {
            animation: index === unref(state).currentSlide ? `donut1 ${unref(state).timeout}ms forwards infinite` : ""
          }
        ])}" class="transform-center stroke-gold" cx="20" cy="20" r="15" fill="transparent" stroke-width="10" stroke-dasharray="0 94.2" stroke-dashoffset="0" data-v-0e796a65></circle></svg></div></div><div style="${ssrRenderStyle({ "width": "1px" })}" class="connector h-full absolute top-2 left-[9px] lg:left-3 bg-gold mb-1 -z-10" data-v-0e796a65></div><div class="slideParagraph mb-10" data-v-0e796a65><a${ssrRenderAttr("href", slide.link)} class="flex items-center gap-2 mb-2" data-v-0e796a65><h3 class="font-bold lg:text-xl" data-v-0e796a65>${ssrInterpolate(slide.text)}</h3><div class="w-4 h-4 bg-lightGrey rounded-full flex items-center justify-center text-white" data-v-0e796a65>`);
        _push(ssrRenderComponent(_component_nuxt_icon, {
          name: slide.icon,
          class: "text-sm"
        }, null, _parent));
        _push(`</div></a><p style="${ssrRenderStyle({ "max-width": "19em" })}" class="" data-v-0e796a65>${ssrInterpolate(slide.description)}</p></div></div>`);
      });
      _push(`<!--]--></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/Component/ImageRotation.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ImageRotation = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0e796a65"]]);

export { ImageRotation as default };
//# sourceMappingURL=ImageRotation-BZriqyiX.mjs.map
