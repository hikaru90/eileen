import { _ as _sfc_main$1 } from './ArrayPane-dd6b7018.mjs';
import { _ as _sfc_main$2 } from './IconSelector-5641dbb0.mjs';
import _sfc_main$3 from './nuxt-icon-19667aae.mjs';
import { b as useSidebarStore, s as storeToRefs, d as usePocketBase, a as useRuntimeConfig } from './server.mjs';
import { defineComponent, reactive, mergeProps, unref, withCtx, createVNode, withDirectives, vModelText, useSSRContext } from 'vue';
import { u as useImage } from './composables-94ee145b.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
import './icon-Audio-b44d42c7.mjs';
import './icon-BookingCalendar-950f1831.mjs';
import './icon-Default-0a45fd84.mjs';
import './icon-Faq-0db9fce5.mjs';
import './icon-HeroBig-ea331798.mjs';
import './icon-HeroSmall-514d4d26.mjs';
import './icon-ImageList-4a293cdf.mjs';
import './icon-ImageRotation-5f49ecb8.mjs';
import './icon-MyWork-7efea99b.mjs';
import './icon-Offer-f7986722.mjs';
import './icon-PortraitText-8c3760ea.mjs';
import './icon-Prices-4dc6447d.mjs';
import './icon-Testimonials-1ddcdf79.mjs';
import './icon-archive-666d45fa.mjs';
import './icon-area-d4646bef.mjs';
import './icon-arrow_down-a879e4b0.mjs';
import './icon-arrow_left-63790420.mjs';
import './icon-arrow_right-39d0dd7e.mjs';
import './icon-arrow_up-2bb6f1b1.mjs';
import './icon-bug-f52895ea.mjs';
import './icon-camera-9a54a087.mjs';
import './icon-car-2664bceb.mjs';
import './icon-caret-left-fc959ca5.mjs';
import './icon-caret-right-9e9788ea.mjs';
import './icon-center-aligned-929c9a70.mjs';
import './icon-check-b7ee3bc5.mjs';
import './icon-circle-cae907de.mjs';
import './icon-co2-8ee53b3b.mjs';
import './icon-consulting-f0e0b43e.mjs';
import './icon-copy-bc0c31a5.mjs';
import './icon-cost-22203805.mjs';
import './icon-cross-aad34a00.mjs';
import './icon-customer_service-4d48f446.mjs';
import './icon-customer_support-e91de1cd.mjs';
import './icon-dashboard-61dcaede.mjs';
import './icon-desktop-b08d6520.mjs';
import './icon-dials-5f63d461.mjs';
import './icon-dot-70ad5a4b.mjs';
import './icon-download-ab7b4ceb.mjs';
import './icon-dragarea-226550cb.mjs';
import './icon-eco-878f0494.mjs';
import './icon-energy-5fe922c7.mjs';
import './icon-error-1c2963dd.mjs';
import './icon-file-generic-b3514002.mjs';
import './icon-file-img-420d7e2e.mjs';
import './icon-file-pdf-04aeedc7.mjs';
import './icon-file-text-38b5d3a0.mjs';
import './icon-flip-64fde6a2.mjs';
import './icon-help-c0a9e206.mjs';
import './icon-house-071a8c5b.mjs';
import './icon-info-291e9cdc.mjs';
import './icon-installation-a02d96cd.mjs';
import './icon-laptop-1db167b3.mjs';
import './icon-left-aligned-39fc4b23.mjs';
import './icon-link-c4ef31be.mjs';
import './icon-lower-a94e9b7e.mjs';
import './icon-mail-6ea9100c.mjs';
import './icon-margin-bottom-26aeb7a0.mjs';
import './icon-margin-left-4ad26c31.mjs';
import './icon-margin-right-e10e317e.mjs';
import './icon-margin-top-f33ae917.mjs';
import './icon-marker-deda1fc6.mjs';
import './icon-menu-b18792fb.mjs';
import './icon-mess-e3bf9fd7.mjs';
import './icon-minus-a1781843.mjs';
import './icon-mobile_-09b5105a.mjs';
import './icon-mobile-b803d43d.mjs';
import './icon-modules-d7096a5c.mjs';
import './icon-modules_check-61250c4f.mjs';
import './icon-modules_landscape-0c36794f.mjs';
import './icon-move-63cd8c00.mjs';
import './icon-padding-bottom-72d679d6.mjs';
import './icon-padding-left-1d118eb2.mjs';
import './icon-padding-right-8a918b5d.mjs';
import './icon-padding-top-c09c28bd.mjs';
import './icon-pause-447582dd.mjs';
import './icon-pending-9d843219.mjs';
import './icon-phone-3253cf1d.mjs';
import './icon-play-0f3f618d.mjs';
import './icon-plus-fd05a43d.mjs';
import './icon-polygon_add2-737d6ffd.mjs';
import './icon-polygon_subtract-33fd416a.mjs';
import './icon-power-3dd12977.mjs';
import './icon-quote-26f56aad.mjs';
import './icon-rectangle-9a0f5f81.mjs';
import './icon-reload-f07a1e11.mjs';
import './icon-repair-9921f996.mjs';
import './icon-right-aligned-7da1acda.mjs';
import './icon-save-3af924d8.mjs';
import './icon-search-6d1020fc.mjs';
import './icon-sort-3691b664.mjs';
import './icon-subvention-a166940f.mjs';
import './icon-sun-6a25bb67.mjs';
import './icon-tablet-21cd0061.mjs';
import './icon-trash-659868b2.mjs';
import './icon-tree-9552a3c8.mjs';
import './icon-triangle_down-9f742dcf.mjs';
import './icon-triangle_up-50ec2150.mjs';
import './icon-triangles-4c56a8e1.mjs';
import './icon-upload-a8932599.mjs';
import './icon-user-adff16a2.mjs';
import './icon-years-f97162ca.mjs';
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
  __name: "Offer",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarStore = useSidebarStore();
    const { setComponentContent, saveContent, deleteFile } = sidebarStore;
    const { componentContent, componentId, componentType, componentFiles } = storeToRefs(sidebarStore);
    usePocketBase();
    const config = useRuntimeConfig();
    reactive({
      heading: "",
      offers: []
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
      const _component_ArrayPane = _sfc_main$1;
      const _component_InputIconSelector = _sfc_main$2;
      const _component_nuxt_icon = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-4 relative" }, _attrs))}><div class="mb-4"><h2 class="text-xs mb-2 opacity-40">Heading</h2><input${ssrRenderAttr("value", unref(componentContent).heading)} type="text" class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20"></div><div class="mb-4"><h2 class="text-xs mb-2 opacity-40">Subline</h2><textarea type="text" class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20">${ssrInterpolate(unref(componentContent).subline)}</textarea></div><div class="mb-4"><h2 class="text-xs mb-2 opacity-40">Offers</h2><div class="flex flex-col gap-2"><!--[-->`);
      ssrRenderList(unref(componentContent).offers, (offer, index) => {
        _push(ssrRenderComponent(_component_ArrayPane, {
          onArrayChanged: unref(saveContent),
          key: "child" + index,
          array: unref(componentContent).offers,
          entry: offer,
          index,
          label: offer.name
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="px-2"${_scopeId}><input${ssrRenderAttr("value", offer.name)} type="text" class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 mb-2"${_scopeId}><input${ssrRenderAttr("value", offer.image)} type="text" placeholder="Bild" class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 mb-2"${_scopeId}><input${ssrRenderAttr("value", offer.type)} type="text" class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 mb-2"${_scopeId}><input${ssrRenderAttr("value", offer.description)} type="text" class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 mb-2"${_scopeId}><input${ssrRenderAttr("value", offer.price)} type="number" class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 mb-2"${_scopeId}><input${ssrRenderAttr("value", offer.duration)} type="text" class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 mb-2"${_scopeId}><div class="py-4"${_scopeId}><h2 class="text-xs mb-2 opacity-40"${_scopeId}>Button</h2><input type="text"${ssrRenderAttr("value", offer.cta.text)} class="rounded-sm px-2 py-1 w-full bg-transparent border border-darkOffwhite border-opacity-20 mb-4"${_scopeId}><h2 class="text-xs mb-2 opacity-40"${_scopeId}>Link</h2><input type="text"${ssrRenderAttr("value", offer.cta.link)} class="rounded-sm px-2 py-1 w-full bg-transparent border border-darkOffwhite border-opacity-20 mb-4"${_scopeId}><h2 class="text-xs mb-2 opacity-40"${_scopeId}>Icon</h2>`);
              _push2(ssrRenderComponent(_component_InputIconSelector, {
                modelValue: offer.cta.icon,
                "onUpdate:modelValue": ($event) => offer.cta.icon = $event
              }, null, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              return [
                createVNode("div", { class: "px-2" }, [
                  withDirectives(createVNode("input", {
                    onChange: unref(saveContent),
                    "onUpdate:modelValue": ($event) => offer.name = $event,
                    type: "text",
                    class: "w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 mb-2"
                  }, null, 40, ["onChange", "onUpdate:modelValue"]), [
                    [vModelText, offer.name]
                  ]),
                  withDirectives(createVNode("input", {
                    onChange: unref(saveContent),
                    "onUpdate:modelValue": ($event) => offer.image = $event,
                    type: "text",
                    placeholder: "Bild",
                    class: "w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 mb-2"
                  }, null, 40, ["onChange", "onUpdate:modelValue"]), [
                    [vModelText, offer.image]
                  ]),
                  withDirectives(createVNode("input", {
                    onChange: unref(saveContent),
                    "onUpdate:modelValue": ($event) => offer.type = $event,
                    type: "text",
                    class: "w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 mb-2"
                  }, null, 40, ["onChange", "onUpdate:modelValue"]), [
                    [vModelText, offer.type]
                  ]),
                  withDirectives(createVNode("input", {
                    onChange: unref(saveContent),
                    "onUpdate:modelValue": ($event) => offer.description = $event,
                    type: "text",
                    class: "w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 mb-2"
                  }, null, 40, ["onChange", "onUpdate:modelValue"]), [
                    [vModelText, offer.description]
                  ]),
                  withDirectives(createVNode("input", {
                    onChange: unref(saveContent),
                    "onUpdate:modelValue": ($event) => offer.price = $event,
                    type: "number",
                    class: "w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 mb-2"
                  }, null, 40, ["onChange", "onUpdate:modelValue"]), [
                    [vModelText, offer.price]
                  ]),
                  withDirectives(createVNode("input", {
                    onChange: unref(saveContent),
                    "onUpdate:modelValue": ($event) => offer.duration = $event,
                    type: "text",
                    class: "w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 mb-2"
                  }, null, 40, ["onChange", "onUpdate:modelValue"]), [
                    [vModelText, offer.duration]
                  ]),
                  createVNode("div", { class: "py-4" }, [
                    createVNode("h2", { class: "text-xs mb-2 opacity-40" }, "Button"),
                    withDirectives(createVNode("input", {
                      onChange: unref(saveContent),
                      type: "text",
                      "onUpdate:modelValue": ($event) => offer.cta.text = $event,
                      class: "rounded-sm px-2 py-1 w-full bg-transparent border border-darkOffwhite border-opacity-20 mb-4"
                    }, null, 40, ["onChange", "onUpdate:modelValue"]), [
                      [vModelText, offer.cta.text]
                    ]),
                    createVNode("h2", { class: "text-xs mb-2 opacity-40" }, "Link"),
                    withDirectives(createVNode("input", {
                      onChange: unref(saveContent),
                      type: "text",
                      "onUpdate:modelValue": ($event) => offer.cta.link = $event,
                      class: "rounded-sm px-2 py-1 w-full bg-transparent border border-darkOffwhite border-opacity-20 mb-4"
                    }, null, 40, ["onChange", "onUpdate:modelValue"]), [
                      [vModelText, offer.cta.link]
                    ]),
                    createVNode("h2", { class: "text-xs mb-2 opacity-40" }, "Icon"),
                    createVNode(_component_InputIconSelector, {
                      modelValue: offer.cta.icon,
                      "onUpdate:modelValue": ($event) => offer.cta.icon = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div><button class="rounded-sm hover:bg-white hover:bg-opacity-20 px-2 border border-darkOffwhite border-opacity-20"> Hinzuf\xFCgen </button></div><h2 class="text-xs opacity-40">Dateien</h2><!--[-->`);
      ssrRenderList(unref(componentFiles), (filename, index) => {
        _push(`<div class="flex items-center gap-2 w-full"><div style="${ssrRenderStyle([{ backgroundImage: `url(${getCurrentImageUrl(filename)})` }])}" class="w-10 h-10 bg-cover bg-no-repeat bg-center"></div><div class="flex-shrink max-w-[250px] overflow-hidden">${ssrInterpolate(filename)}</div><button class="border border-red rounded-sm">`);
        _push(ssrRenderComponent(_component_nuxt_icon, {
          name: "icon-cross",
          class: "text-red text-xl"
        }, null, _parent));
        _push(`</button></div>`);
      });
      _push(`<!--]--><input type="file" class="mt-2"></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/Sidebar/Offer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=Offer-d1decb54.mjs.map
