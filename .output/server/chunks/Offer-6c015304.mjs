import { _ as _sfc_main$1 } from './ArrayPane-23137753.mjs';
import { _ as _sfc_main$2 } from './IconSelector-ae785f94.mjs';
import _sfc_main$3 from './nuxt-icon-f71b9bd1.mjs';
import { b as useSidebarStore, s as storeToRefs, d as usePocketBase, a as useRuntimeConfig } from './server.mjs';
import { defineComponent, reactive, mergeProps, unref, withCtx, createVNode, withDirectives, vModelText, useSSRContext } from 'vue';
import { u as useImage } from './composables-94ee145b.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
import './icon-Audio-b44d42c7.mjs';
import './icon-BookingCalendar-950f1831.mjs';
import './icon-ClickableHeadings-dae514ac.mjs';
import './icon-Contact-654d036c.mjs';
import './icon-Default-e6d94fac.mjs';
import './icon-Downloads-64a60962.mjs';
import './icon-Faq-ed3517a2.mjs';
import './icon-HeroBig-50c5e9d3.mjs';
import './icon-HeroSmall-789c9b48.mjs';
import './icon-ImageList-0181c81f.mjs';
import './icon-ImageRotation-472a0e06.mjs';
import './icon-Map-b1d7bf44.mjs';
import './icon-MyWork-43311737.mjs';
import './icon-Offer-03ca6149.mjs';
import './icon-PortraitText-b51ddcd5.mjs';
import './icon-Prices-e5575f18.mjs';
import './icon-Testimonials-ebf24e38.mjs';
import './icon-archive-2c3c3217.mjs';
import './icon-area-7d4f824f.mjs';
import './icon-arrow_down-d226b308.mjs';
import './icon-arrow_left-b9a7a446.mjs';
import './icon-arrow_right-c0e54b54.mjs';
import './icon-arrow_up-930e464f.mjs';
import './icon-bug-551e1817.mjs';
import './icon-camera-55eaacab.mjs';
import './icon-car-b65855a4.mjs';
import './icon-caret-left-af571d92.mjs';
import './icon-caret-right-00f01913.mjs';
import './icon-center-aligned-2b26af0f.mjs';
import './icon-check-5e87ec73.mjs';
import './icon-circle-3f1c8617.mjs';
import './icon-co2-92658eab.mjs';
import './icon-consulting-5b90eb6e.mjs';
import './icon-copy-3c1b6110.mjs';
import './icon-cost-835d8b85.mjs';
import './icon-cross-97040d3c.mjs';
import './icon-customer_service-5fd206dd.mjs';
import './icon-customer_support-f0a913be.mjs';
import './icon-dashboard-0a3a2a5a.mjs';
import './icon-desktop-a1684c59.mjs';
import './icon-dials-3476a214.mjs';
import './icon-dot-0bce099c.mjs';
import './icon-download-e8186f34.mjs';
import './icon-dragarea-205e6942.mjs';
import './icon-eco-eb2dca03.mjs';
import './icon-energy-38d448b2.mjs';
import './icon-error-2593ecf2.mjs';
import './icon-file-generic-1b3d879f.mjs';
import './icon-file-img-57255f07.mjs';
import './icon-file-pdf-f0ddd687.mjs';
import './icon-file-text-2153b86f.mjs';
import './icon-flip-e807bcc8.mjs';
import './icon-help-ec469591.mjs';
import './icon-house-04b5d06e.mjs';
import './icon-info-05aa40c8.mjs';
import './icon-installation-6282cd76.mjs';
import './icon-laptop-f992cb3b.mjs';
import './icon-left-aligned-0a22b405.mjs';
import './icon-link-5174cb12.mjs';
import './icon-lower-d46eb7fb.mjs';
import './icon-mail-74c1f767.mjs';
import './icon-margin-bottom-c20afcdf.mjs';
import './icon-margin-left-374b5f4d.mjs';
import './icon-margin-right-989ccb3d.mjs';
import './icon-margin-top-c8e86378.mjs';
import './icon-marker-784049e0.mjs';
import './icon-menu-a20d24d2.mjs';
import './icon-mess-bab93754.mjs';
import './icon-minus-8ef288c4.mjs';
import './icon-mobile_-8eacae1e.mjs';
import './icon-mobile-766e18b2.mjs';
import './icon-modules-83b2bb9e.mjs';
import './icon-modules_check-a403aa05.mjs';
import './icon-modules_landscape-d59d0cfe.mjs';
import './icon-move-2ec06eda.mjs';
import './icon-padding-bottom-16bb0fa4.mjs';
import './icon-padding-left-58fcf9ee.mjs';
import './icon-padding-right-4f69ac29.mjs';
import './icon-padding-top-8e4a444b.mjs';
import './icon-pause-ee73051e.mjs';
import './icon-pending-fd67f33a.mjs';
import './icon-phone-7d6cbc0a.mjs';
import './icon-play-e3269391.mjs';
import './icon-plus-b0efec02.mjs';
import './icon-polygon_add2-15651c76.mjs';
import './icon-polygon_subtract-d6893e33.mjs';
import './icon-power-541577d1.mjs';
import './icon-quote-c881413c.mjs';
import './icon-rectangle-4bd52d63.mjs';
import './icon-reload-73534c0a.mjs';
import './icon-repair-dd7a8276.mjs';
import './icon-right-aligned-00110403.mjs';
import './icon-save-48f5cc1a.mjs';
import './icon-search-9642f270.mjs';
import './icon-sort-30e180ca.mjs';
import './icon-subvention-faaa8af9.mjs';
import './icon-sun-11fd23fa.mjs';
import './icon-tablet-2ad0d580.mjs';
import './icon-trash-32718ec4.mjs';
import './icon-tree-588c804f.mjs';
import './icon-triangle_down-9af59c8e.mjs';
import './icon-triangle_up-19201ad4.mjs';
import './icon-triangles-4ceeb324.mjs';
import './icon-upload-c3ba6134.mjs';
import './icon-user-ea8eb8d7.mjs';
import './icon-years-5ee6e702.mjs';
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
//# sourceMappingURL=Offer-6c015304.mjs.map
