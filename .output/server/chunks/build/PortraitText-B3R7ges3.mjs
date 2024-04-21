import { _ as _sfc_main$1 } from './IntersectonPop-BCl9OGRc.mjs';
import { i as useRuntimeConfig } from './server.mjs';
import { defineComponent, reactive, onUnmounted, mergeProps, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
import { u as useImage } from './composables-Q-rs6X_2.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';
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
  __name: "PortraitText",
  __ssrInlineRender: true,
  props: {
    component: { default: {
      content: defaults$1.find((el) => el.type === "portraitText").content
    } },
    isFirst: { type: Boolean, default: false }
  },
  setup(__props) {
    const config = useRuntimeConfig();
    const props = __props;
    reactive({});
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
    onUnmounted(() => {
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_IntersectonPop = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: [[{ "-mt-24": props.isFirst }], "relative text-white overflow-visible"]
      }, _attrs))} data-v-eea4a491><div class="max-container h-full relative z-10" data-v-eea4a491><div class="h-full flex items-center justify-center py-16 md:pt-32 md:pb-24" data-v-eea4a491><div class="mt-10" data-v-eea4a491>`);
      _push(ssrRenderComponent(_component_IntersectonPop, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="shiny-pop font-heading text-lg sm:text-xl md:text-3xl lg:text-4xl mb-10 text-center text-salmon" data-v-eea4a491${_scopeId}>${ssrInterpolate(props.component.content.heading)}</h2>`);
          } else {
            return [
              createVNode("h2", { class: "shiny-pop font-heading text-lg sm:text-xl md:text-3xl lg:text-4xl mb-10 text-center text-salmon" }, toDisplayString(props.component.content.heading), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p class="text-coffee text-center max-w-[44rem]" data-v-eea4a491>${ssrInterpolate(props.component.content.text)}</p></div></div></div><div class="w-24 h-24 sm:w-32 sm:h-32 lg:w-52 lg:h-52 absolute top-0 left-1/2 transform -translate-y-1/2 -translate-x-1/2 rounded-full overflow-hidden shadow-2xl shadow-coffee/30" data-v-eea4a491><div style="${ssrRenderStyle({ "background-image": "radial-gradient(\r\n            circle,\r\n            rgb(250, 244, 216) 0%,\r\n            #fbf9f7 60%,\r\n            #f9f3ec 100%\r\n          )", "mix-blend-mode": "multiply" })}" class="w-full h-full opacity-20 absolute" data-v-eea4a491></div><div style="${ssrRenderStyle([{ backgroundImage: `url(${getCurrentImageUrl(props.component.content.image)})` }])}" class="-left-[1px] -right-[1px] -top-[1px] -bottom-[1px] bg-cover bg-center absolute" data-v-eea4a491></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/Component/PortraitText.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const PortraitText = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-eea4a491"]]);

export { PortraitText as default };
//# sourceMappingURL=PortraitText-B3R7ges3.mjs.map
