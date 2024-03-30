import { _ as _sfc_main$1 } from './IntersectonPop-27c95f80.mjs';
import _sfc_main$2 from './nuxt-icon-f71b9bd1.mjs';
import { d as usePocketBase, a as useRuntimeConfig } from './server.mjs';
import { defineComponent, withAsyncContext, reactive, onUnmounted, mergeProps, withCtx, openBlock, createBlock, createCommentVNode, unref, useSSRContext } from 'vue';
import { u as useImage } from './composables-94ee145b.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderAttr, ssrRenderClass, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { d as defaults$1 } from './defaults-a0139de5.mjs';
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
  __name: "Downloads",
  __ssrInlineRender: true,
  props: {
    component: { default: {
      content: defaults$1.find((el) => el.type === "heroBig").content
    } },
    isFirst: { type: Boolean, default: false }
  },
  async setup(__props) {
    let __temp, __restore;
    const props = __props;
    const { pb } = usePocketBase();
    const config = useRuntimeConfig();
    const downloads = ([__temp, __restore] = withAsyncContext(() => pb.collection("downloads").getFullList(
      200
      /* batch size */
    )), __temp = await __temp, __restore(), __temp);
    const state = reactive({
      newsletterSignupOpen: false,
      mail: "",
      subscriptionPending: false,
      subscriptionSubmitted: false,
      errors: [],
      successes: [],
      userSubribed: false
    });
    const getCurrentImageUrl = (id, filename) => {
      const img = useImage();
      const imgUrl = img(`${config.SERVER_URL}/api/files/downloads/${id}/${filename}`, {
        format: "webp"
      });
      return imgUrl;
    };
    onUnmounted(() => {
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_IntersectonPop = _sfc_main$1;
      const _component_nuxt_icon = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "py-16 md:py-24 relative" }, _attrs))}><div class="max-container h-full relative z-10"><div class="h-full flex items-center justify-center"><div class="mt-10">`);
      _push(ssrRenderComponent(_component_IntersectonPop, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (props.component.content.heading) {
              _push2(`<h2 style="${ssrRenderStyle({ "max-width": "15em" })}" class="shiny-pop text-salmon font-heading text-2xl sm:text-5xl md:text-6xl lg:text-7xl mb-10 lg:mb-20 text-center"${_scopeId}>${_ctx.$mdRenderer.set({ html: true }).render(props.component.content.heading)}</h2>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              props.component.content.heading ? (openBlock(), createBlock("h2", {
                key: 0,
                style: { "max-width": "15em" },
                class: "shiny-pop text-salmon font-heading text-2xl sm:text-5xl md:text-6xl lg:text-7xl mb-10 lg:mb-20 text-center",
                innerHTML: _ctx.$mdRenderer.set({ html: true }).render(props.component.content.heading)
              }, null, 8, ["innerHTML"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex-grow flex flex-col md:flex-row md:flex-wrap">`);
      if (unref(state).newsletterSignupOpen) {
        _push(`<div class="w-full md:w-1/2 shadow-2xl shadow-coffee/10 rounded-lg overflow-hidden bg-white relative border border-coffee border-opacity-10 py-4 px-5"><h3 class="font-heading text-lg md:text-2xl mb-4 mt-1 ml-1">Datei herunterladen</h3><p class="pl-1"> Um diese Datei herunterzuladen, gib bitte Deine E-Mail-Adresse ein um Dich in meinem Newsletter einzutragen. Ich verwende Deine Daten ausschlie\xDFlich um neue Meditationen und Inspiration mit Dir zu teilen. Ich werde Deine E-Mail-Adresse nicht f\xFCr andere Zwecke verwenden oder weitergeben, versprochen. </p><div class="relative"><form class="flex items-center gap-4 justify-start mt-5 mb-1"><input type="text"${ssrRenderAttr("value", unref(state).mail)} placeholder="E-Mail Adresse" class="px-5 py-2 shadow-xl shadow-coffee/5 rounded-full flex-grow border border-coffee border-opacity-10"><button type="submit" class="${ssrRenderClass([[{ "pointer-events-none cursor-default": unref(state).subscriptionPending }], "shadow-xl shadow-coffee/20 bg-salmon px-5 py-2 rounded-full text-white flex-shrink-0 flex items-center justify-center"])}"><div style="${ssrRenderStyle(!unref(state).subscriptionPending ? null : { display: "none" })}">Eintragen</div><div style="${ssrRenderStyle(unref(state).subscriptionPending ? null : { display: "none" })}" class="animate-spin">`);
        _push(ssrRenderComponent(_component_nuxt_icon, {
          name: "icon-pending",
          class: "text-2xl text-white"
        }, null, _parent));
        _push(`</div></button><input type="submit" class="hidden"></form><!--[-->`);
        ssrRenderList(unref(state).errors, (error, index) => {
          _push(`<div class="w-full mt-4"><div class="bg-lightRed px-3 py-1 text-darkRed rounded-lg">${ssrInterpolate(error)}</div></div>`);
        });
        _push(`<!--]--><!--[-->`);
        ssrRenderList(unref(state).successes, (success, index) => {
          _push(`<div class="mt-4"><div class="bg-green px-3 py-1 text-white rounded-lg">${ssrInterpolate(success)}</div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!--[-->`);
        ssrRenderList(unref(downloads), (download, index) => {
          _push(`<div class="w-full md:w-1/2 shadow-2xl shadow-coffee/10 rounded-lg overflow-hidden bg-white relative border border-coffee border-opacity-10 flex"><div style="${ssrRenderStyle([
            { backgroundImage: `url(${getCurrentImageUrl(download.id, download.thumbnail)})` }
          ])}" class="relative w-1/3 h-full bg-cover bg-center flex-grow-0 flex-shrink-0"></div><div><div class="mb-4 font-heading text-lg lg:text-xl gap-4 border-b border-coffee border-opacity-10 px-6 py-3 flex items-center justify-between">${ssrInterpolate(download.name)} <div class="font-body text-sm text-coffee/50">${ssrInterpolate(new Date(download.created).toLocaleDateString("de-DE"))}</div></div><div class="px-6 pt-1 pb-5"><div class="flex gap-10"><div class="flex-grow"><div class="pl-1">${ssrInterpolate(download.description)}</div><button class="flex items-center justify-center flex-shrink-0 mt-4 mb-1"><div class="flex items-center justify-center gap-1 pl-3 pr-2 py-1 border border-grey/20 rounded-full hover:bg-salmon/80 text-coffee hover:text-white transition"> Herunterladen `);
          _push(ssrRenderComponent(_component_nuxt_icon, {
            name: "icon-download",
            class: "text-2xl -ml-1"
          }, null, _parent));
          _push(`</div></button></div></div></div></div></div>`);
        });
        _push(`<!--]-->`);
      }
      _push(`</div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/Component/Downloads.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=Downloads-60d0474c.mjs.map
