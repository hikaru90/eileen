import _sfc_main$1 from './nuxt-icon-8914e1be.mjs';
import { a as useRuntimeConfig } from './server.mjs';
import { defineComponent, reactive, mergeProps, unref, useSSRContext } from 'vue';
import { u as useImage } from './composables-94ee145b.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';
import { u as useBrevo } from './useBrevo-805cf4fe.mjs';
import { d as defaults$1 } from './defaults-09259cb5.mjs';
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
  __name: "Contact",
  __ssrInlineRender: true,
  props: {
    component: { default: {
      content: defaults$1.find((el) => el.type === "contact").content
    } }
  },
  setup(__props) {
    const props = __props;
    useBrevo();
    const config = useRuntimeConfig();
    const state = reactive({
      form: [
        {
          name: "firstName",
          validation: "required",
          label: "Vorname",
          type: "text",
          value: "",
          class: "w-full lg:w-1/2",
          error: ""
        },
        {
          name: "lastName",
          validation: "required",
          label: "Nachname",
          type: "text",
          value: "",
          class: "w-full lg:w-1/2",
          error: ""
        },
        {
          name: "mail",
          validation: "required",
          label: "E-Mail",
          type: "text",
          value: "",
          class: "w-full lg:w-1/2",
          error: ""
        },
        {
          name: "phone",
          validation: "",
          label: "Telefonnummer",
          type: "text",
          value: "",
          class: "w-full lg:w-1/2",
          error: ""
        },
        {
          name: "message",
          validation: "required",
          label: "Nachricht",
          type: "textarea",
          value: "",
          class: "w-full",
          error: ""
        }
      ],
      pending: false,
      submitted: false,
      success: false
    });
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
      var _a;
      const _component_nuxt_icon = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mb-28" }, _attrs))} data-v-1db8aaaa><div class="max-container" data-v-1db8aaaa><div class="flex items-center justify-center" data-v-1db8aaaa><h2 class="font-heading text-lg sm:text-xl md:text-3xl lg:text-4xl mb-16 text-center text-coffee" data-v-1db8aaaa>${ssrInterpolate((_a = props.component.content) == null ? void 0 : _a.heading)}</h2></div><div class="flex flex-col lg:flex-row gap-16" data-v-1db8aaaa><div style="${ssrRenderStyle([
        { backgroundImage: `url(${getCurrentImageUrl(props.component.content.image)})` }
      ])}" class="flex-grow bg-cover shadow-2xl shadow-coffee/20 w-full h-60 lg:h-auto lg:w-1/3 rounded" data-v-1db8aaaa></div><div class="-ml-[3%] -mr-[5%] lg:mx-auto w-auto lg:w-2/3" data-v-1db8aaaa><div class="bg-white shadow-2xl shadow-coffee/20 py-5 px-10" data-v-1db8aaaa>`);
      if (!unref(state).submitted) {
        _push(`<div class="flex flex-wrap -mx-3" data-v-1db8aaaa><!--[-->`);
        ssrRenderList(unref(state).form, (input, index) => {
          _push(`<div class="${ssrRenderClass([[input.class], "px-2 mt-3"])}" data-v-1db8aaaa><label${ssrRenderAttr("for", "input" + index)} class="text-sm font-bold block ml-1" data-v-1db8aaaa>${ssrInterpolate(input.label)} `);
          if (input.validation === "required") {
            _push(`<!--[--><!--]-->`);
          } else {
            _push(`<!--[--> (optional) <!--]-->`);
          }
          _push(`</label>`);
          if (input.type === "text") {
            _push(`<input${ssrRenderAttr("id", "input" + index)} type="text"${ssrRenderAttr("value", input.value)} class="${ssrRenderClass([[input.error.length ? "border !border-red" : ""], "input-class"])}" data-v-1db8aaaa>`);
          } else {
            _push(`<!---->`);
          }
          if (input.type === "textarea") {
            _push(`<textarea${ssrRenderAttr("id", "input" + index)} class="${ssrRenderClass([[input.error ? "border !border-red" : ""], "input-class min-h-[200px]"])}" data-v-1db8aaaa>${ssrInterpolate(input.value)}</textarea>`);
          } else {
            _push(`<!---->`);
          }
          if (input.error) {
            _push(`<div class="mt-1 rounded text-red bg-lightRed/60 px-2 py-[2px] text-sm" data-v-1db8aaaa>${ssrInterpolate(input.error)}</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--><div class="flex justify-end w-full mr-3 mt-3" data-v-1db8aaaa><button class="bg-salmon rounded-full text-white flex items-center px-5 py-2 shadow-md shadow-coffee/10" data-v-1db8aaaa><div class="" data-v-1db8aaaa>Nachricht senden</div></button></div></div>`);
      } else {
        _push(`<div class="h-60 flex flex-col items-start justify-center" data-v-1db8aaaa>`);
        if (unref(state).pending) {
          _push(`<div class="animate-spin" data-v-1db8aaaa>`);
          _push(ssrRenderComponent(_component_nuxt_icon, {
            name: "icon-pending",
            class: "text-4xl text-black animate-spin"
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!--[-->`);
          if (unref(state).success) {
            _push(`<!--[--><div class="font-heading text-2xl mb-2" data-v-1db8aaaa>Vielen Dank!</div><p class="max-w-[24em]" data-v-1db8aaaa> Ihre Nachricht ist bei mir eingegangen. Ich melde mich sobald wie m\xF6glich bei Ihnen. </p><!--]-->`);
          } else {
            _push(`<!--[--><div class="font-heading text-2xl mb-2 text-red" data-v-1db8aaaa>Oh!</div><p class="max-w-[24em]" data-v-1db8aaaa> Bei dem Versand Ihrer Nachricht ist ein Fehler aufgetreten. Versuchen Sie es bitte erneut. Falls der Fehler bestehen bleibt, senden Sie mir bitte eine E-Mail an <a href="mailto:kontakt@dimplegoertz.de" class="underline" data-v-1db8aaaa>kontakt@eileengeorge.de</a>. </p><!--]-->`);
          }
          _push(`<!--]-->`);
        }
        _push(`</div>`);
      }
      _push(`</div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/Component/Contact.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Contact = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1db8aaaa"]]);

export { Contact as default };
//# sourceMappingURL=Contact-e1009bd9.mjs.map
