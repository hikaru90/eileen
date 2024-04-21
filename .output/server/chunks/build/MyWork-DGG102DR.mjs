import { _ as _sfc_main$1 } from './IntersectonPop-BCl9OGRc.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-C8A7HrUk.mjs';
import { i as useRuntimeConfig } from './server.mjs';
import { defineComponent, reactive, onUnmounted, mergeProps, withCtx, createVNode, toDisplayString, createTextVNode, useSSRContext } from 'vue';
import { u as useImage } from './composables-Q-rs6X_2.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { d as defaults$1 } from './defaults-CgFcJQec.mjs';
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
  __name: "MyWork",
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
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: [[{ "-mt-24": props.isFirst }], "relative text-white overflow-visible"]
      }, _attrs))}><div class="max-container h-full relative z-10"><div class="h-full flex items-center justify-center py-16 md:py-24"><div class="mt-10">`);
      _push(ssrRenderComponent(_component_IntersectonPop, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="shiny-pop font-heading text-lg sm:text-xl md:text-3xl lg:text-4xl mb-16 text-center text-salmon"${_scopeId}>${ssrInterpolate(props.component.content.heading)}</h2>`);
          } else {
            return [
              createVNode("h2", { class: "shiny-pop font-heading text-lg sm:text-xl md:text-3xl lg:text-4xl mb-16 text-center text-salmon" }, toDisplayString(props.component.content.heading), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex flex-col lg:flex-row gap-16 items-center lg:items-start"><div class="max-w-[44rem]"><p class="markdown text-coffee">${_ctx.$mdRenderer.set({ html: true }).render(props.component.content.text)}</p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: props.component.content.cta.link,
        class: "inline-flex border border-salmon rounded-full text-coffee items-center px-5 py-2 shadow-md mt-3"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(props.component.content.cta.text)}`);
          } else {
            return [
              createTextVNode(toDisplayString(props.component.content.cta.text), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><img${ssrRenderAttr("src", getCurrentImageUrl(props.component.content.image))} alt="Eileen George" class="w-full md:max-w-[380px] rounded-lg shadow-2xl shadow-coffee/30 -order-1 lg:order-1 flex-shrink-0"></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/Component/MyWork.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=MyWork-DGG102DR.mjs.map
