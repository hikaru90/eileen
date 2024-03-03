import _sfc_main$1 from './nuxt-icon-19667aae.mjs';
import { d as usePocketBase, a as useRuntimeConfig } from './server.mjs';
import { defineComponent, reactive, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderComponent, ssrRenderStyle, ssrRenderClass } from 'vue/server-renderer';
import { d as defaults$1 } from './defaults-f325294b.mjs';
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
      errors: []
    });
    const formatTime = (seconds) => {
      var minutes = Math.floor(seconds / 60);
      var remainingSeconds = Math.floor(seconds % 60);
      remainingSeconds = remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
      return minutes + ":" + remainingSeconds;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_icon = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "py-16 md:py-24 relative" }, _attrs))} data-v-e9214c35><div class="max-container" data-v-e9214c35><div class="flex items-center justify-center" data-v-e9214c35><h2 class="font-heading text-lg sm:text-xl md:text-3xl lg:text-4xl mb-16 text-center text-coffee" data-v-e9214c35>${ssrInterpolate(props.component.content.heading)}</h2></div><div class="flex flex-col items-center gap-8 relative mb-32" data-v-e9214c35><!--[-->`);
      ssrRenderList(props.component.content.audios, (audio, index) => {
        _push(`<div class="w-full md:w-1/2 md:max-w-[500px] shadow-2xl shadow-coffee/30 rounded-lg overflow-hidden bg-white relative" data-v-e9214c35><div class="mb-4 font-heading text-lg lg:text-xl flex items-center gap-4 border-b border-coffee border-opacity-30 px-6 py-4" data-v-e9214c35>${ssrInterpolate(audio.name)}</div><div class="px-6 pt-3 pb-7" data-v-e9214c35><div class="relative w-full h-full" data-v-e9214c35>`);
        if (unref(state).audios.length > 0) {
          _push(`<div class="absolute left-0 top-1/2 transform -translate-y-1/2" data-v-e9214c35>${ssrInterpolate(formatTime(Number(unref(state).audios[index].times.total)))}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div${ssrRenderAttr("id", "audio" + index)} class="inline-block ml-[60px] h-12 w-[calc(100%-120px)] overflow-hidden" data-v-e9214c35></div>`);
        if (unref(state).audios.length > 0) {
          _push(`<button class="inline-block w-[60px]" data-v-e9214c35>`);
          if (unref(state).audios[index].isPlaying) {
            _push(ssrRenderComponent(_component_nuxt_icon, {
              name: "icon-pause",
              class: "text-6xl"
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(ssrRenderComponent(_component_nuxt_icon, {
            name: "icon-play",
            class: "text-6xl"
          }, null, _parent));
          _push(`</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
      });
      _push(`<!--]--></div><div class="flex justify-center relative mb-12" data-v-e9214c35><div style="${ssrRenderStyle({ "background-image": "radial-gradient(circle, #fef1d0 0%, transparent 60%)" })}" class="absolute left-1/2 top-1/2 -z-10 w-[1600px] h-[1600px] transform -translate-x-1/2 -translate-y-1/2" data-v-e9214c35></div><div class="max-w-lg text-2xl font-heading text-center" data-v-e9214c35>${ssrInterpolate(props.component.content.description)}</div></div><div class="relative" data-v-e9214c35><form class="flex items-center gap-4 justify-center" data-v-e9214c35><input type="text"${ssrRenderAttr("value", unref(state).mail)}${ssrRenderAttr("placeholder", props.component.content.placeholder)} class="px-5 py-2 shadow-xl shadow-coffee/20 rounded-full flex-grow max-w-[300px]" data-v-e9214c35><button class="${ssrRenderClass([[{ "pointer-events-none cursor-default": unref(state).subscriptionPending }], "shadow-xl shadow-coffee/20 bg-coffee px-5 py-1.5 rounded-full text-white flex-shrink-0 flex items-center justify-center"])}" data-v-e9214c35><div style="${ssrRenderStyle(!unref(state).subscriptionPending ? null : { display: "none" })}" data-v-e9214c35>${ssrInterpolate(props.component.content.cta)}</div><div style="${ssrRenderStyle(unref(state).subscriptionPending ? null : { display: "none" })}" class="animate-spin" data-v-e9214c35>`);
      _push(ssrRenderComponent(_component_nuxt_icon, {
        name: "icon-pending",
        class: "text-2xl text-white"
      }, null, _parent));
      _push(`</div></button><input type="submit" class="hidden" data-v-e9214c35></form><!--[-->`);
      ssrRenderList(unref(state).errors, (error, index) => {
        _push(`<div class="absolute w-full top-full flex flex-col items-center mt-4" data-v-e9214c35><div class="bg-lightRed px-3 py-1 text-darkRed rounded-lg" data-v-e9214c35>${ssrInterpolate(error)}</div></div>`);
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
const Audio = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e9214c35"]]);

export { Audio as default };
//# sourceMappingURL=Audio-39addbc1.mjs.map
