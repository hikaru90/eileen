import _sfc_main$1 from './nuxt-icon-5eb3d977.mjs';
import { _ as _sfc_main$2 } from './IconSelector-409cb6e6.mjs';
import { b as useSidebarStore, s as storeToRefs, d as usePocketBase, a as useRuntimeConfig } from './server.mjs';
import { defineComponent, reactive, mergeProps, unref, useSSRContext } from 'vue';
import { u as useImage } from './composables-063a49d0.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderStyle, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import './icon-BookingCalendar-00dab00c.mjs';
import './icon-Default-85dc2ff8.mjs';
import './icon-Faq-2f618915.mjs';
import './icon-HeroBig-86e284c7.mjs';
import './icon-HeroSmall-30cf3e99.mjs';
import './icon-ImageList-d957c076.mjs';
import './icon-ImageRotation-3c13e7e9.mjs';
import './icon-Offer-f72c3541.mjs';
import './icon-PortraitText-43abf39c.mjs';
import './icon-Prices-973d4b8b.mjs';
import './icon-archive-b6417352.mjs';
import './icon-area-9aefdeba.mjs';
import './icon-arrow_down-7d82f777.mjs';
import './icon-arrow_left-6d8955a1.mjs';
import './icon-arrow_right-dafe2060.mjs';
import './icon-arrow_up-393faf41.mjs';
import './icon-bug-e50c2586.mjs';
import './icon-camera-e3bc1773.mjs';
import './icon-car-52f18aea.mjs';
import './icon-caret-left-9a2c159d.mjs';
import './icon-caret-right-92e84adf.mjs';
import './icon-center-aligned-558ce8f0.mjs';
import './icon-check-aba52989.mjs';
import './icon-circle-41c4f662.mjs';
import './icon-co2-a8c22777.mjs';
import './icon-consulting-925e245d.mjs';
import './icon-copy-334a3c7f.mjs';
import './icon-cost-afd52a8f.mjs';
import './icon-cross-103e3df7.mjs';
import './icon-customer_service-4013665f.mjs';
import './icon-customer_support-336bda79.mjs';
import './icon-dashboard-232a8825.mjs';
import './icon-desktop-c65ec7df.mjs';
import './icon-dials-ddfb748c.mjs';
import './icon-dot-16b56015.mjs';
import './icon-download-ce1fecc5.mjs';
import './icon-dragarea-adff3deb.mjs';
import './icon-eco-8501d037.mjs';
import './icon-energy-e61ccee6.mjs';
import './icon-error-2974dbcc.mjs';
import './icon-file-generic-684a42da.mjs';
import './icon-file-img-907fa624.mjs';
import './icon-file-pdf-15a29ab7.mjs';
import './icon-file-text-248233d7.mjs';
import './icon-flip-351da373.mjs';
import './icon-help-ed15c2a5.mjs';
import './icon-house-7ede6888.mjs';
import './icon-info-f4b08c01.mjs';
import './icon-installation-33f887a8.mjs';
import './icon-laptop-8ce863f9.mjs';
import './icon-left-aligned-940d7c3b.mjs';
import './icon-link-42fcae5a.mjs';
import './icon-lower-23799be5.mjs';
import './icon-mail-c2371140.mjs';
import './icon-margin-bottom-dbc57739.mjs';
import './icon-margin-left-e08509af.mjs';
import './icon-margin-right-95a62607.mjs';
import './icon-margin-top-956720f8.mjs';
import './icon-marker-47d62bb7.mjs';
import './icon-menu-edcc7b6a.mjs';
import './icon-mess-f760b4a4.mjs';
import './icon-minus-3bd39f6c.mjs';
import './icon-mobile_-b91cd5da.mjs';
import './icon-mobile-4bd5ccd4.mjs';
import './icon-modules-56cc8c23.mjs';
import './icon-modules_check-c9fcbc6b.mjs';
import './icon-modules_landscape-da4c4195.mjs';
import './icon-move-7507b446.mjs';
import './icon-padding-bottom-9077b280.mjs';
import './icon-padding-left-5d95f303.mjs';
import './icon-padding-right-4b79cd3f.mjs';
import './icon-padding-top-dcbef159.mjs';
import './icon-pause-20fba507.mjs';
import './icon-pending-d7f004e2.mjs';
import './icon-phone-29bb355d.mjs';
import './icon-play-e5bd1e26.mjs';
import './icon-plus-46a3b97e.mjs';
import './icon-polygon_add2-74ac10c1.mjs';
import './icon-polygon_subtract-c99079ed.mjs';
import './icon-power-74fc708c.mjs';
import './icon-quote-444a8512.mjs';
import './icon-rectangle-0e312088.mjs';
import './icon-reload-bf8d3ee8.mjs';
import './icon-repair-e5014f33.mjs';
import './icon-right-aligned-f2a94c94.mjs';
import './icon-save-1fa9f01c.mjs';
import './icon-search-087410b2.mjs';
import './icon-sort-a24f9aa9.mjs';
import './icon-subvention-b918f3d7.mjs';
import './icon-sun-c6442cf2.mjs';
import './icon-tablet-34b55f6c.mjs';
import './icon-trash-17dfb360.mjs';
import './icon-tree-afd03568.mjs';
import './icon-triangle_down-4552985e.mjs';
import './icon-triangle_up-a30ab9f0.mjs';
import './icon-triangles-a57b491e.mjs';
import './icon-upload-d4527061.mjs';
import './icon-user-aae1851a.mjs';
import './icon-years-b802c2b3.mjs';
import './index-4dc78d0f.mjs';
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
  __name: "HeroBig",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarStore = useSidebarStore();
    const { componentContent, componentId, componentType, componentFiles } = storeToRefs(sidebarStore);
    usePocketBase();
    const config = useRuntimeConfig();
    reactive({
      heading: ""
    });
    const getCurrentImageUrl = (filename) => {
      const img = useImage();
      const imgUrl = img(
        `${config.SERVER_URL}/api/files/${componentType.value + "s"}/${componentId.value}/${filename}?thumb=160x90f`,
        {
          format: "webp"
        }
      );
      return imgUrl;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_icon = _sfc_main$1;
      const _component_InputIconSelector = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-4" }, _attrs))}><div class="mb-4"><h2 class="text-xs mb-2 opacity-40">Heading</h2><input${ssrRenderAttr("value", unref(componentContent).heading)} type="text" class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20"></div><div class="mb-4"><h2 class="text-xs mb-2 opacity-40">Subline</h2><input${ssrRenderAttr("value", unref(componentContent).subline)} type="text" class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20"></div><div class="mb-4"><h2 class="text-xs mb-2 opacity-40">Hintergrundbild</h2><input${ssrRenderAttr("value", unref(componentContent).image)} type="text" class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20"></div><h2 class="text-xs opacity-40">Dateien</h2><!--[-->`);
      ssrRenderList(unref(componentFiles), (filename, index) => {
        _push(`<div class="flex items-center gap-2"><div style="${ssrRenderStyle([{ backgroundImage: `url(${getCurrentImageUrl(filename)})` }])}" class="w-10 h-10 bg-contain bg-no-repeat bg-center"></div><span>${ssrInterpolate(filename)}</span><button class="border border-red rounded-sm">`);
        _push(ssrRenderComponent(_component_nuxt_icon, {
          name: "icon-cross",
          class: "text-red text-xl"
        }, null, _parent));
        _push(`</button></div>`);
      });
      _push(`<!--]--><input type="file" class="mt-2 mb-4"><h2 class="text-xs mb-2 opacity-40">Text</h2><input type="text"${ssrRenderAttr("value", unref(componentContent).cta.text)} class="rounded-sm px-2 py-1 w-full bg-transparent border border-darkOffwhite border-opacity-20 mb-4"><h2 class="text-xs mb-2 opacity-40">Link</h2><input type="text"${ssrRenderAttr("value", unref(componentContent).cta.link)} class="rounded-sm px-2 py-1 w-full bg-transparent border border-darkOffwhite border-opacity-20 mb-4"><h2 class="text-xs mb-2 opacity-40">Icon</h2>`);
      _push(ssrRenderComponent(_component_InputIconSelector, {
        modelValue: unref(componentContent).cta.icon,
        "onUpdate:modelValue": ($event) => unref(componentContent).cta.icon = $event
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/Sidebar/HeroBig.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=HeroBig-e2932f27.mjs.map
