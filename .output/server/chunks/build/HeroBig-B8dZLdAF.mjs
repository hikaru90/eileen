import { _ as _sfc_main$1 } from './IntersectonPop-BCl9OGRc.mjs';
import { i as useRuntimeConfig } from './server.mjs';
import { defineComponent, reactive, onUnmounted, mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { u as useImage } from './composables-Q-rs6X_2.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
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
  __name: "HeroBig",
  __ssrInlineRender: true,
  props: {
    component: { default: {
      content: defaults$1.find((el) => el.type === "heroBig").content
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
        class: [[{ "-mt-24": props.isFirst }], "h-dvh lg:h-[900px] relative bg-[#F6F4F2] text-white overflow-visible"]
      }, _attrs))} data-v-0c7c766c><div class="max-container h-full relative z-10" data-v-0c7c766c><div class="h-full flex items-center justify-center" data-v-0c7c766c><div class="mt-10" data-v-0c7c766c>`);
      _push(ssrRenderComponent(_component_IntersectonPop, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 style="${ssrRenderStyle({ "max-width": "15em" })}" class="shiny-pop text-salmon font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-10 lg:mb-20 text-center" data-v-0c7c766c${_scopeId}>${_ctx.$mdRenderer.set({ html: true }).render(props.component.content.heading)}</h2>`);
          } else {
            return [
              createVNode("h2", {
                style: { "max-width": "15em" },
                class: "shiny-pop text-salmon font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-10 lg:mb-20 text-center",
                innerHTML: _ctx.$mdRenderer.set({ html: true }).render(props.component.content.heading)
              }, null, 8, ["innerHTML"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p class="text-coffee uppercase text-center text-xs sm:text-lg" data-v-0c7c766c>${_ctx.$mdRenderer.set({ html: true }).render(props.component.content.subline)}</p></div></div></div><div class="w-full h-full absolute top-0 left-0 z-0" data-v-0c7c766c><div style="${ssrRenderStyle({ "background-image": "radial-gradient(\r\n            circle at center,\r\n            transparent 0%,\r\n            #ffffff 100%\r\n          )" })}" class="w-full h-full opacity-100 absolute z-10" data-v-0c7c766c></div><div style="${ssrRenderStyle([{ backgroundImage: `url(${getCurrentImageUrl(props.component.content.image)})` }])}" class="w-full h-full bg-cover bg-center opacity-80" data-v-0c7c766c></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/Component/HeroBig.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const HeroBig = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0c7c766c"]]);

export { HeroBig as default };
//# sourceMappingURL=HeroBig-B8dZLdAF.mjs.map
