import _sfc_main$1 from './nuxt-icon-8914e1be.mjs';
import { a as useRuntimeConfig } from './server.mjs';
import { defineComponent, reactive, mergeProps, useSSRContext } from 'vue';
import { u as useImage } from './composables-94ee145b.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';
import { u as useBrevo } from './useBrevo-805cf4fe.mjs';
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
  __name: "Map",
  __ssrInlineRender: true,
  props: {
    component: { default: {
      content: defaults$1.find((el) => el.type === "map").content
    } }
  },
  setup(__props) {
    const props = __props;
    useBrevo();
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
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g;
      const _component_nuxt_icon = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white pb-24 text-coffee" }, _attrs))} data-v-a5cfa359><div class="max-container" data-v-a5cfa359><div class="flex flex-col lg:flex-row gap-10" data-v-a5cfa359><div class="w-full lg:w-1/3 flex flex-col gap-10 py-16 text-sm" data-v-a5cfa359><div class="flex items-start" data-v-a5cfa359><div class="flex-shrink-0 mr-2 flex items-center justify-center w-20 h-10" data-v-a5cfa359>`);
      _push(ssrRenderComponent(_component_nuxt_icon, {
        name: "icon-marker",
        class: "text-6xl text-coffee"
      }, null, _parent));
      _push(`</div><div data-v-a5cfa359>${_ctx.$mdRenderer.set({ html: true }).render((_a = props.component.content) == null ? void 0 : _a.address)}</div></div><div class="flex items-center" data-v-a5cfa359><div class="flex-shrink-0 mr-2 flex items-center justify-center w-20 h-10" data-v-a5cfa359>`);
      _push(ssrRenderComponent(_component_nuxt_icon, {
        name: "icon-phone",
        class: "text-6xl text-coffee"
      }, null, _parent));
      _push(`</div><div data-v-a5cfa359><a${ssrRenderAttr("href", "tel:" + ((_b = props.component.content) == null ? void 0 : _b.phone))} class="underline" data-v-a5cfa359>${ssrInterpolate((_c = props.component.content) == null ? void 0 : _c.phone)}</a><br data-v-a5cfa359> ${ssrInterpolate((_d = props.component.content) == null ? void 0 : _d.openinghours)}</div></div><div class="flex items-center" data-v-a5cfa359><div class="flex-shrink-0 mr-2 flex items-center justify-center w-20 h-10" data-v-a5cfa359>`);
      _push(ssrRenderComponent(_component_nuxt_icon, {
        name: "icon-mail",
        class: "text-5xl text-coffee"
      }, null, _parent));
      _push(`</div><div data-v-a5cfa359><a${ssrRenderAttr("href", "mailto:" + ((_e = props.component.content) == null ? void 0 : _e.mail))} class="underline" data-v-a5cfa359>${ssrInterpolate((_f = props.component.content) == null ? void 0 : _f.mail)}</a></div></div></div><div class="w-full lg:w-2/3 flex flex-col lg:flex-row" data-v-a5cfa359><div class="w-full lg:w-1/2 h-80 lg:h-auto relative flex-grow-0 mb-4 lg:mb-0 lg:px-3" data-v-a5cfa359><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d287.4959587134769!2d9.380399237009717!3d54.79811157845696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b35d3f9dcb3963%3A0x6eec38a226cb1f32!2sWerkstra%C3%9Fe%205%2C%2024955%20Harrislee!5e0!3m2!1sen!2sde!4v1711322436183!5m2!1sen!2sde" class="overflow-hidden rounded w-full h-full" style="${ssrRenderStyle({ "border": "0" })}" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" data-v-a5cfa359></iframe></div><div style="${ssrRenderStyle([
        { backgroundImage: `url(${getCurrentImageUrl((_g = props.component) == null ? void 0 : _g.content.image)})` }
      ])}" class="w-full lg:w-1/2 h-72 lg:h-auto bg-cover rounded lg:px-3" data-v-a5cfa359></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/Component/Map.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Map = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a5cfa359"]]);

export { Map as default };
//# sourceMappingURL=Map-4fc9292b.mjs.map
