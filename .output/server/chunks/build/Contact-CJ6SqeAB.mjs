import { _ as _sfc_main$1 } from './IntersectonPop-BCl9OGRc.mjs';
import _sfc_main$2 from './nuxt-icon-Cyx4B1z0.mjs';
import { i as useRuntimeConfig } from './server.mjs';
import { defineComponent, reactive, mergeProps, withCtx, createVNode, toDisplayString, unref, useSSRContext } from 'vue';
import { u as useImage } from './composables-Q-rs6X_2.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
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
  __name: "Contact",
  __ssrInlineRender: true,
  props: {
    component: { default: {
      content: defaults$1.find((el) => el.type === "contact").content
    } }
  },
  setup(__props) {
    const config = useRuntimeConfig();
    const props = __props;
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
        `${config.public.SERVER_URL}/api/files/${props.component.collectionName}/${props.component.id}/${filename}`,
        {
          format: "webp"
        }
      );
      return imgUrl;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_IntersectonPop = _sfc_main$1;
      const _component_nuxt_icon = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mb-28" }, _attrs))} data-v-75e8c12c><div class="max-container" data-v-75e8c12c><div class="flex items-center justify-center" data-v-75e8c12c>`);
      _push(ssrRenderComponent(_component_IntersectonPop, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<h2 class="shiny-pop text-salmon font-heading text-lg sm:text-xl md:text-3xl lg:text-4xl mb-16 text-center" data-v-75e8c12c${_scopeId}>${ssrInterpolate((_a = props.component.content) == null ? void 0 : _a.heading)}</h2>`);
          } else {
            return [
              createVNode("h2", { class: "shiny-pop text-salmon font-heading text-lg sm:text-xl md:text-3xl lg:text-4xl mb-16 text-center" }, toDisplayString((_b = props.component.content) == null ? void 0 : _b.heading), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex flex-col lg:flex-row gap-16" data-v-75e8c12c><div style="${ssrRenderStyle([
        { backgroundImage: `url(${getCurrentImageUrl(props.component.content.image)})` }
      ])}" class="flex-grow bg-cover shadow-2xl shadow-coffee/20 w-full h-60 lg:h-auto lg:w-1/3 rounded" data-v-75e8c12c></div><div class="-ml-[3%] -mr-[5%] lg:mx-auto w-auto lg:w-2/3" data-v-75e8c12c><div class="bg-white shadow-2xl shadow-coffee/20 py-5 px-10" data-v-75e8c12c>`);
      if (!unref(state).submitted) {
        _push(`<div class="flex flex-wrap -mx-3" data-v-75e8c12c><!--[-->`);
        ssrRenderList(unref(state).form, (input, index) => {
          _push(`<div class="${ssrRenderClass([[input.class], "px-2 mt-3"])}" data-v-75e8c12c><label${ssrRenderAttr("for", "input" + index)} class="text-sm block ml-1" data-v-75e8c12c>${ssrInterpolate(input.label)} `);
          if (input.validation === "required") {
            _push(`<!--[--><!--]-->`);
          } else {
            _push(`<!--[--> (optional) <!--]-->`);
          }
          _push(`</label>`);
          if (input.type === "text") {
            _push(`<input${ssrRenderAttr("id", "input" + index)} type="text"${ssrRenderAttr("value", input.value)} class="${ssrRenderClass([[input.error.length ? "border !border-red" : ""], "input-class"])}" data-v-75e8c12c>`);
          } else {
            _push(`<!---->`);
          }
          if (input.type === "textarea") {
            _push(`<textarea${ssrRenderAttr("id", "input" + index)} class="${ssrRenderClass([[input.error ? "border !border-red" : ""], "input-class min-h-[200px]"])}" data-v-75e8c12c>${ssrInterpolate(input.value)}</textarea>`);
          } else {
            _push(`<!---->`);
          }
          if (input.error) {
            _push(`<div class="mt-1 rounded text-red bg-lightRed/60 px-2 py-[2px] text-sm" data-v-75e8c12c>${ssrInterpolate(input.error)}</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--><div class="flex justify-end w-full mr-3 mt-3" data-v-75e8c12c><button class="bg-salmon rounded-full text-white flex items-center px-5 py-2 shadow-md shadow-coffee/10" data-v-75e8c12c><div class="" data-v-75e8c12c>Nachricht senden</div></button></div></div>`);
      } else {
        _push(`<div class="h-60 flex flex-col items-start justify-center" data-v-75e8c12c>`);
        if (unref(state).pending) {
          _push(`<div class="animate-spin" data-v-75e8c12c>`);
          _push(ssrRenderComponent(_component_nuxt_icon, {
            name: "icon-pending",
            class: "text-4xl text-black animate-spin"
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!--[-->`);
          if (unref(state).success) {
            _push(`<!--[--><div class="font-heading text-2xl mb-2" data-v-75e8c12c>Vielen Dank!</div><p class="max-w-[24em]" data-v-75e8c12c> Deine Nachricht ist bei mir eingegangen. Ich melde mich sobald wie m\xF6glich bei Dir. </p><!--]-->`);
          } else {
            _push(`<!--[--><div class="font-heading text-2xl mb-2 text-red" data-v-75e8c12c>Oh!</div><p class="max-w-[24em]" data-v-75e8c12c> Bei dem Versand Deiner Nachricht ist ein Fehler aufgetreten. Versuche es bitte erneut. Falls der Fehler bestehen bleibt, sende mir bitte eine E-Mail an <a href="mailto:kontakt@eileengeorge.de" class="underline" data-v-75e8c12c>kontakt@eileengeorge.de</a>. </p><!--]-->`);
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
const Contact = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-75e8c12c"]]);

export { Contact as default };
//# sourceMappingURL=Contact-CJ6SqeAB.mjs.map
