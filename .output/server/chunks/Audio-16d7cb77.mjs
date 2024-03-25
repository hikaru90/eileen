import _sfc_main$1 from './nuxt-icon-8914e1be.mjs';
import { d as usePocketBase, a as useRuntimeConfig } from './server.mjs';
import { defineComponent, reactive, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderComponent, ssrRenderStyle, ssrRenderClass } from 'vue/server-renderer';
import { d as defaults$1 } from './defaults-5079ec78.mjs';
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
  __name: "Audio",
  __ssrInlineRender: true,
  props: {
    component: { default: {
      content: defaults$1.find((el) => el.type === "offer").content
    } }
  },
  setup(__props) {
    const props = __props;
    usePocketBase();
    useRuntimeConfig();
    const state = reactive({
      audios: [],
      mail: "",
      subscriptionPending: false,
      subscriptionSubmitted: false,
      errors: [],
      successes: []
    });
    const formatTime = (seconds) => {
      var minutes = Math.floor(seconds / 60);
      var remainingSeconds = Math.floor(seconds % 60);
      remainingSeconds = remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
      return minutes + ":" + remainingSeconds;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_icon = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "py-16 md:py-24 relative" }, _attrs))} data-v-6d4738c8><div class="max-container" data-v-6d4738c8><div class="flex items-center justify-center" data-v-6d4738c8><h2 class="font-heading text-lg sm:text-xl md:text-3xl lg:text-4xl mb-16 text-center text-coffee" data-v-6d4738c8>${ssrInterpolate(props.component.content.heading)}</h2></div><div class="flex flex-col items-center gap-8 relative mb-32" data-v-6d4738c8><!--[-->`);
      ssrRenderList(props.component.content.audios, (audio, index) => {
        _push(`<div class="w-full md:w-1/2 md:max-w-[500px] shadow-2xl shadow-coffee/10 rounded-lg overflow-hidden bg-white relative border border-coffee border-opacity-10" data-v-6d4738c8><div class="mb-4 font-heading text-lg lg:text-xl flex items-center gap-4 border-b border-coffee border-opacity-10 px-6 py-3" data-v-6d4738c8>${ssrInterpolate(audio.name)}</div><div class="px-6 pt-1 pb-5" data-v-6d4738c8><div class="relative w-full h-full" data-v-6d4738c8>`);
        if (unref(state).audios.length > 0) {
          _push(`<div class="absolute left-0 top-1/2 transform -translate-y-1/2" data-v-6d4738c8>${ssrInterpolate(formatTime(Number(unref(state).audios[index].times.total)))}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div${ssrRenderAttr("id", "audio" + index)} class="inline-block ml-[60px] h-7 w-[calc(100%-100px)] overflow-hidden" data-v-6d4738c8></div>`);
        if (unref(state).audios.length > 0) {
          _push(`<button class="inline-flex ml-[4px] w-[32px] h-[32px] items-center justify-center border border-coffee border-opacity-30 align-top rounded-lg" data-v-6d4738c8>`);
          if (unref(state).audios[index].isPlaying) {
            _push(ssrRenderComponent(_component_nuxt_icon, {
              name: "icon-pause",
              class: "text-4xl"
            }, null, _parent));
          } else {
            _push(ssrRenderComponent(_component_nuxt_icon, {
              name: "icon-play",
              class: "text-4xl"
            }, null, _parent));
          }
          _push(`</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
      });
      _push(`<!--]--></div><div class="flex justify-center relative mb-12" data-v-6d4738c8><div style="${ssrRenderStyle({ "background-image": "radial-gradient(circle, #FAF1DF 0%, transparent 60%)" })}" class="absolute left-1/2 top-1/2 -z-10 w-[1600px] h-[1600px] transform -translate-x-1/2 -translate-y-1/2" data-v-6d4738c8></div><div class="max-w-lg text-2xl font-heading text-center" data-v-6d4738c8>${ssrInterpolate(props.component.content.description)}</div></div><div class="relative" data-v-6d4738c8><form class="flex items-center gap-4 justify-center" data-v-6d4738c8><input type="text"${ssrRenderAttr("value", unref(state).mail)}${ssrRenderAttr("placeholder", props.component.content.placeholder)} class="px-5 py-2 shadow-xl shadow-coffee/5 rounded-full flex-grow max-w-[300px] border border-coffee border-opacity-10" data-v-6d4738c8><button class="${ssrRenderClass([[{ "pointer-events-none cursor-default": unref(state).subscriptionPending }], "shadow-xl shadow-coffee/20 bg-salmon px-5 py-2 rounded-full text-white flex-shrink-0 flex items-center justify-center"])}" data-v-6d4738c8><div style="${ssrRenderStyle(!unref(state).subscriptionPending ? null : { display: "none" })}" data-v-6d4738c8>${ssrInterpolate(props.component.content.cta)}</div><div style="${ssrRenderStyle(unref(state).subscriptionPending ? null : { display: "none" })}" class="animate-spin" data-v-6d4738c8>`);
      _push(ssrRenderComponent(_component_nuxt_icon, {
        name: "icon-pending",
        class: "text-2xl text-white"
      }, null, _parent));
      _push(`</div></button><input type="submit" class="hidden" data-v-6d4738c8></form><!--[-->`);
      ssrRenderList(unref(state).errors, (error, index) => {
        _push(`<div class="absolute w-full top-full flex flex-col items-center mt-4" data-v-6d4738c8><div class="bg-lightRed px-3 py-1 text-darkRed rounded-lg" data-v-6d4738c8>${ssrInterpolate(error)}</div></div>`);
      });
      _push(`<!--]--><!--[-->`);
      ssrRenderList(unref(state).successes, (success, index) => {
        _push(`<div class="absolute w-full top-full flex flex-col items-center mt-4" data-v-6d4738c8><div class="bg-green px-3 py-1 text-white rounded-lg" data-v-6d4738c8>${ssrInterpolate(success)}</div></div>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/Component/Audio.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Audio = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6d4738c8"]]);

export { Audio as default };
//# sourceMappingURL=Audio-16d7cb77.mjs.map
