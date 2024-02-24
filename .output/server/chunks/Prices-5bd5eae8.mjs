import { _ as _sfc_main$1 } from './ArrayPane-2afba066.mjs';
import { _ as _sfc_main$2 } from './IconSelector-e361f108.mjs';
import { b as useSidebarStore, s as storeToRefs, d as usePocketBase, a as useRuntimeConfig } from './server.mjs';
import { defineComponent, reactive, mergeProps, unref, withCtx, createVNode, withDirectives, vModelText, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import './nuxt-icon-14b11dc2.mjs';
import './icon-BookingCalendar-00dab00c.mjs';
import './icon-Default-85dc2ff8.mjs';
import './icon-Faq-2f618915.mjs';
import './icon-HeroBig-86e284c7.mjs';
import './icon-HeroSmall-30cf3e99.mjs';
import './icon-ImageList-d957c076.mjs';
import './icon-ImageRotation-3c13e7e9.mjs';
import './icon-Prices-0a4393ae.mjs';
import './icon-archive-4dc2e644.mjs';
import './icon-area-761ec823.mjs';
import './icon-arrow_down-84315b51.mjs';
import './icon-arrow_left-3cc20fb3.mjs';
import './icon-arrow_right-97e20096.mjs';
import './icon-arrow_up-ce72e0ca.mjs';
import './icon-bug-5ba91c63.mjs';
import './icon-car-b2e25dc3.mjs';
import './icon-caret-left-94f4de0a.mjs';
import './icon-caret-right-27dd4932.mjs';
import './icon-center-aligned-13a63377.mjs';
import './icon-check-6fa862b2.mjs';
import './icon-circle-3747153d.mjs';
import './icon-co2-90066342.mjs';
import './icon-consulting-6ed90642.mjs';
import './icon-copy-1fe81b3f.mjs';
import './icon-cost-798c6e98.mjs';
import './icon-cross-aab68f74.mjs';
import './icon-customer_service-09ecbb52.mjs';
import './icon-customer_support-32fdd24a.mjs';
import './icon-dashboard-cddf0596.mjs';
import './icon-desktop-5bea7949.mjs';
import './icon-dials-6d2f8dda.mjs';
import './icon-dot-74ce8b1a.mjs';
import './icon-download-c72fddff.mjs';
import './icon-dragarea-fcb6cf6d.mjs';
import './icon-eco-3b24403d.mjs';
import './icon-energy-66d3c799.mjs';
import './icon-error-0165b3c4.mjs';
import './icon-file-generic-23c3dcb2.mjs';
import './icon-file-img-b008a7f2.mjs';
import './icon-file-pdf-d3e64025.mjs';
import './icon-file-text-eafea048.mjs';
import './icon-flip-7dc328a9.mjs';
import './icon-help-70987525.mjs';
import './icon-house-aa111ead.mjs';
import './icon-info-2d984e0f.mjs';
import './icon-installation-ee74f22b.mjs';
import './icon-laptop-4f8849dd.mjs';
import './icon-left-aligned-d1e00faf.mjs';
import './icon-link-821e7926.mjs';
import './icon-lower-a6f410fe.mjs';
import './icon-mail-70c9ab04.mjs';
import './icon-margin-bottom-25627c8c.mjs';
import './icon-margin-left-12db653f.mjs';
import './icon-margin-right-e45cedad.mjs';
import './icon-margin-top-f98aafb5.mjs';
import './icon-marker-5a38e0a3.mjs';
import './icon-menu-adb5dca6.mjs';
import './icon-mess-2ca9c138.mjs';
import './icon-minus-af64a28d.mjs';
import './icon-mobile_-0f28c527.mjs';
import './icon-mobile-b5a18aa5.mjs';
import './icon-modules-ee4b7a2f.mjs';
import './icon-modules_check-e0179e4f.mjs';
import './icon-modules_landscape-9f0901a3.mjs';
import './icon-move-42886ec5.mjs';
import './icon-padding-bottom-c26823e9.mjs';
import './icon-padding-left-a992dac1.mjs';
import './icon-padding-right-0c9e199c.mjs';
import './icon-padding-top-30463e4d.mjs';
import './icon-pause-794d2d01.mjs';
import './icon-pending-e91fc2b3.mjs';
import './icon-phone-98abcef7.mjs';
import './icon-play-9b268b4d.mjs';
import './icon-plus-976dcab9.mjs';
import './icon-polygon_add2-dfae0d34.mjs';
import './icon-polygon_subtract-b90557c1.mjs';
import './icon-power-3d78b4aa.mjs';
import './icon-quote-7b8f8faa.mjs';
import './icon-rectangle-278e40f9.mjs';
import './icon-reload-015443a4.mjs';
import './icon-repair-9b9e8b26.mjs';
import './icon-right-aligned-62cdead9.mjs';
import './icon-save-d26ffe1e.mjs';
import './icon-search-3c2f0835.mjs';
import './icon-sort-f3ad8ef0.mjs';
import './icon-subvention-03c4b50d.mjs';
import './icon-sun-e25ae887.mjs';
import './icon-tablet-8489ca6a.mjs';
import './icon-trash-fd026653.mjs';
import './icon-tree-b9e3465e.mjs';
import './icon-triangle_down-620b2304.mjs';
import './icon-triangle_up-307905cf.mjs';
import './icon-triangles-1ec0048c.mjs';
import './icon-upload-1f0db0c4.mjs';
import './icon-user-af805b6e.mjs';
import './icon-years-d767bd1a.mjs';
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
  __name: "Prices",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarStore = useSidebarStore();
    const { setComponentContent, saveContent, deleteFile } = sidebarStore;
    const { componentContent, componentId, componentType, componentFiles } = storeToRefs(sidebarStore);
    usePocketBase();
    useRuntimeConfig();
    reactive({
      heading: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ArrayPane = _sfc_main$1;
      const _component_InputIconSelector = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-4" }, _attrs))}><div class="mb-4"><h2 class="text-xs mb-2 opacity-40">Heading</h2><input${ssrRenderAttr("value", unref(componentContent).heading)} type="text" class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20"></div><div class="mb-4"><h2 class="text-xs mb-2 opacity-40">Heading</h2><textarea type="text" class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20">${ssrInterpolate(unref(componentContent).subline)}</textarea></div><div class="mb-4"><h2 class="text-xs mb-2 opacity-40">Prices</h2><div class="flex flex-col gap-2"><!--[-->`);
      ssrRenderList(unref(componentContent).prices, (price, index) => {
        _push(ssrRenderComponent(_component_ArrayPane, {
          onArrayChanged: unref(saveContent),
          key: "child" + index,
          array: unref(componentContent).prices,
          entry: price,
          index,
          label: price.name
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="px-2"${_scopeId}><input${ssrRenderAttr("value", price.name)} type="text" class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 mb-2"${_scopeId}><input${ssrRenderAttr("value", price.price)} type="number" class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 mb-2"${_scopeId}><input${ssrRenderAttr("value", price.duration)} type="number" class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 mb-2"${_scopeId}><textarea type="text" class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20"${_scopeId}>${ssrInterpolate(price.description)}</textarea><div class="py-4"${_scopeId}><h2 class="text-xs mb-2 opacity-40"${_scopeId}>Text</h2><input type="text"${ssrRenderAttr("value", price.cta.text)} class="rounded-sm px-2 py-1 w-full bg-transparent border border-darkOffwhite border-opacity-20 mb-4"${_scopeId}><h2 class="text-xs mb-2 opacity-40"${_scopeId}>Link</h2><input type="text"${ssrRenderAttr("value", price.cta.link)} class="rounded-sm px-2 py-1 w-full bg-transparent border border-darkOffwhite border-opacity-20 mb-4"${_scopeId}><h2 class="text-xs mb-2 opacity-40"${_scopeId}>Icon</h2>`);
              _push2(ssrRenderComponent(_component_InputIconSelector, {
                modelValue: price.cta.icon,
                "onUpdate:modelValue": ($event) => price.cta.icon = $event
              }, null, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              return [
                createVNode("div", { class: "px-2" }, [
                  withDirectives(createVNode("input", {
                    onChange: unref(saveContent),
                    "onUpdate:modelValue": ($event) => price.name = $event,
                    type: "text",
                    class: "w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 mb-2"
                  }, null, 40, ["onChange", "onUpdate:modelValue"]), [
                    [vModelText, price.name]
                  ]),
                  withDirectives(createVNode("input", {
                    onChange: unref(saveContent),
                    "onUpdate:modelValue": ($event) => price.price = $event,
                    type: "number",
                    class: "w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 mb-2"
                  }, null, 40, ["onChange", "onUpdate:modelValue"]), [
                    [vModelText, price.price]
                  ]),
                  withDirectives(createVNode("input", {
                    onChange: unref(saveContent),
                    "onUpdate:modelValue": ($event) => price.duration = $event,
                    type: "number",
                    class: "w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 mb-2"
                  }, null, 40, ["onChange", "onUpdate:modelValue"]), [
                    [vModelText, price.duration]
                  ]),
                  withDirectives(createVNode("textarea", {
                    onChange: unref(saveContent),
                    "onUpdate:modelValue": ($event) => price.description = $event,
                    type: "text",
                    class: "w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20"
                  }, null, 40, ["onChange", "onUpdate:modelValue"]), [
                    [vModelText, price.description]
                  ]),
                  createVNode("div", { class: "py-4" }, [
                    createVNode("h2", { class: "text-xs mb-2 opacity-40" }, "Text"),
                    withDirectives(createVNode("input", {
                      onChange: unref(saveContent),
                      type: "text",
                      "onUpdate:modelValue": ($event) => price.cta.text = $event,
                      class: "rounded-sm px-2 py-1 w-full bg-transparent border border-darkOffwhite border-opacity-20 mb-4"
                    }, null, 40, ["onChange", "onUpdate:modelValue"]), [
                      [vModelText, price.cta.text]
                    ]),
                    createVNode("h2", { class: "text-xs mb-2 opacity-40" }, "Link"),
                    withDirectives(createVNode("input", {
                      onChange: unref(saveContent),
                      type: "text",
                      "onUpdate:modelValue": ($event) => price.cta.link = $event,
                      class: "rounded-sm px-2 py-1 w-full bg-transparent border border-darkOffwhite border-opacity-20 mb-4"
                    }, null, 40, ["onChange", "onUpdate:modelValue"]), [
                      [vModelText, price.cta.link]
                    ]),
                    createVNode("h2", { class: "text-xs mb-2 opacity-40" }, "Icon"),
                    createVNode(_component_InputIconSelector, {
                      modelValue: price.cta.icon,
                      "onUpdate:modelValue": ($event) => price.cta.icon = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div><button class="rounded-sm hover:bg-white hover:bg-opacity-20 px-2 border border-darkOffwhite border-opacity-20"> Hinzuf\xFCgen </button></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/Sidebar/Prices.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=Prices-5bd5eae8.mjs.map
