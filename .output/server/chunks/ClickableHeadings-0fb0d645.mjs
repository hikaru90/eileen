import { a as useRuntimeConfig } from './server.mjs';
import { defineComponent, reactive, onUnmounted, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';
import { d as defaults$1 } from './defaults-5079ec78.mjs';
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
  __name: "ClickableHeadings",
  __ssrInlineRender: true,
  props: {
    component: { default: {
      content: defaults$1.find((el) => el.type === "portraitText").content
    } },
    isFirst: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    useRuntimeConfig();
    const state = reactive({
      selectedIndex: 0,
      enrichedBlocks: []
    });
    onUnmounted(() => {
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: [[{ "-mt-24": props.isFirst }], "relative overflow-visible"]
      }, _attrs))}><div class="max-container h-full relative z-10"><div class="flex flex-col lg:flex-row gap-10"><div class="my-20"><!--[-->`);
      ssrRenderList(props.component.content.blocks, (block, index) => {
        _push(`<div class="lg:hidden"><div class="font-heading text-lg sm:text-xl md:text-2xl mb-6">${ssrInterpolate(block.heading)}</div><p class="markdown mb-10">${_ctx.$mdRenderer.set({ html: true }).render(block.text)}</p></div>`);
      });
      _push(`<!--]--><div class="hidden lg:block"><div class="flex flex-row gap-16"><div><!--[-->`);
      ssrRenderList(props.component.content.blocks, (block, index) => {
        _push(`<div><button class="${ssrRenderClass([[index === unref(state).selectedIndex ? "text-coffee border-coffee/20" : "text-coffee/60 border-transparent"], "font-heading text-lg sm:text-xl md:text-2xl mb-2 whitespace-nowrap relative hover:text-coffee hover:border-coffee/10 transition py-2 px-5 border rounded-full"])}">${ssrInterpolate(block.heading)} </button></div>`);
      });
      _push(`<!--]--></div><div id="text-container">`);
      if (unref(state).enrichedBlocks.length > 0) {
        _push(`<p style="${ssrRenderStyle({ height: `${unref(state).enrichedBlocks[unref(state).selectedIndex].height}px` })}" class="markdown mb-10 leading-loose transition-all duration-300 mb-20">${_ctx.$mdRenderer.set({ html: true }).render(unref(state).enrichedBlocks[unref(state).selectedIndex].text)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/Component/ClickableHeadings.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ClickableHeadings-0fb0d645.mjs.map
