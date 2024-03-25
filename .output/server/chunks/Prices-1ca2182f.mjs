import { _ as _sfc_main$1 } from './ArrayPane-64a1f099.mjs';
import { _ as _sfc_main$2 } from './IconSelector-45374457.mjs';
import { b as useSidebarStore, s as storeToRefs, d as usePocketBase, a as useRuntimeConfig } from './server.mjs';
import { defineComponent, reactive, mergeProps, unref, withCtx, createVNode, withDirectives, vModelText, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import './nuxt-icon-8914e1be.mjs';
import './icon-Audio-b44d42c7.mjs';
import './icon-BookingCalendar-950f1831.mjs';
import './icon-ClickableHeadings-dae514ac.mjs';
import './icon-Contact-654d036c.mjs';
import './icon-Default-e6d94fac.mjs';
import './icon-Faq-92ed4d2b.mjs';
import './icon-HeroBig-11a20b14.mjs';
import './icon-HeroSmall-14747bbc.mjs';
import './icon-ImageList-3504ff33.mjs';
import './icon-ImageRotation-d6d12b48.mjs';
import './icon-Map-15b177b7.mjs';
import './icon-MyWork-c102bc7b.mjs';
import './icon-Offer-7026acd3.mjs';
import './icon-PortraitText-68bc692f.mjs';
import './icon-Prices-0a901b64.mjs';
import './icon-Testimonials-02a24236.mjs';
import './icon-archive-e21bc356.mjs';
import './icon-area-bf8ad37a.mjs';
import './icon-arrow_down-665192b2.mjs';
import './icon-arrow_left-9504e609.mjs';
import './icon-arrow_right-246c5b6c.mjs';
import './icon-arrow_up-50c11a57.mjs';
import './icon-bug-dd2466b0.mjs';
import './icon-camera-12fe6f43.mjs';
import './icon-car-9a6cdada.mjs';
import './icon-caret-left-552d0fe6.mjs';
import './icon-caret-right-5c4e38a3.mjs';
import './icon-center-aligned-1180c92c.mjs';
import './icon-check-b2e310fd.mjs';
import './icon-circle-76f7d41f.mjs';
import './icon-co2-175c2c3f.mjs';
import './icon-consulting-2083186c.mjs';
import './icon-copy-980d9d57.mjs';
import './icon-cost-bd7a43d6.mjs';
import './icon-cross-216d0ca6.mjs';
import './icon-customer_service-af9387ca.mjs';
import './icon-customer_support-957211ce.mjs';
import './icon-dashboard-bc7b27da.mjs';
import './icon-desktop-b427311f.mjs';
import './icon-dials-d066cfae.mjs';
import './icon-dot-2f4ab321.mjs';
import './icon-download-cfbcb1bc.mjs';
import './icon-dragarea-4c807227.mjs';
import './icon-eco-3e62b9bd.mjs';
import './icon-energy-c3758f86.mjs';
import './icon-error-9a0aafa8.mjs';
import './icon-file-generic-88630b52.mjs';
import './icon-file-img-105782de.mjs';
import './icon-file-pdf-640fd6de.mjs';
import './icon-file-text-66672127.mjs';
import './icon-flip-29e86e69.mjs';
import './icon-help-408e79c4.mjs';
import './icon-house-b6cd19fd.mjs';
import './icon-info-6491ce12.mjs';
import './icon-installation-620d59ff.mjs';
import './icon-laptop-cccb6610.mjs';
import './icon-left-aligned-85eb6675.mjs';
import './icon-link-6b075c77.mjs';
import './icon-lower-7d291797.mjs';
import './icon-mail-454d4f6c.mjs';
import './icon-margin-bottom-844d9ce0.mjs';
import './icon-margin-left-4940f72d.mjs';
import './icon-margin-right-bcfc6d71.mjs';
import './icon-margin-top-cc231b23.mjs';
import './icon-marker-ecabd69f.mjs';
import './icon-menu-9147eed5.mjs';
import './icon-mess-537108c6.mjs';
import './icon-minus-7f6278a5.mjs';
import './icon-mobile_-471b6e7f.mjs';
import './icon-mobile-93de207e.mjs';
import './icon-modules-89cd78c7.mjs';
import './icon-modules_check-885c93c1.mjs';
import './icon-modules_landscape-d251d4f8.mjs';
import './icon-move-536b779a.mjs';
import './icon-padding-bottom-3bfe4e8d.mjs';
import './icon-padding-left-15b9cd16.mjs';
import './icon-padding-right-04aa8909.mjs';
import './icon-padding-top-366bace0.mjs';
import './icon-pause-fe2ce65f.mjs';
import './icon-pending-dde928cd.mjs';
import './icon-phone-21d073b8.mjs';
import './icon-play-b82ccbaf.mjs';
import './icon-plus-98928936.mjs';
import './icon-polygon_add2-a1804a0f.mjs';
import './icon-polygon_subtract-ddbd3365.mjs';
import './icon-power-79cdfe98.mjs';
import './icon-quote-4a578f34.mjs';
import './icon-rectangle-ce9aced3.mjs';
import './icon-reload-a1004d53.mjs';
import './icon-repair-6999a4c3.mjs';
import './icon-right-aligned-96573707.mjs';
import './icon-save-47a1fef6.mjs';
import './icon-search-27abf690.mjs';
import './icon-sort-9a804290.mjs';
import './icon-subvention-5b6dfc3b.mjs';
import './icon-sun-7f92d887.mjs';
import './icon-tablet-f57c7aef.mjs';
import './icon-trash-f1cea093.mjs';
import './icon-tree-b6a2035c.mjs';
import './icon-triangle_down-5f72d40f.mjs';
import './icon-triangle_up-b2585524.mjs';
import './icon-triangles-06c1392f.mjs';
import './icon-upload-e60f11ab.mjs';
import './icon-user-e56ca5a9.mjs';
import './icon-years-c94201b2.mjs';
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
//# sourceMappingURL=Prices-1ca2182f.mjs.map
