import { _ as _sfc_main$1 } from './ArrayPane--5deJtAy.mjs';
import { _ as _sfc_main$2 } from './IconSelector-CSILmsrW.mjs';
import { defineComponent, reactive, mergeProps, unref, withCtx, createVNode, withDirectives, vModelText, useSSRContext } from 'vue';
import { b as useSidebarStore, s as storeToRefs, u as usePocketBase } from './server.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import './nuxt-icon-Cyx4B1z0.mjs';
import './icon-Audio-Clz2ILIm.mjs';
import './icon-BookingCalendar-D8cZhttV.mjs';
import './icon-ClickableHeadings-DLU_nNSs.mjs';
import './icon-Contact-Byb4u6US.mjs';
import './icon-Default-Cn3JqdxD.mjs';
import './icon-Downloads-ChFK8-ue.mjs';
import './icon-Faq-ytrh_UdX.mjs';
import './icon-HeroBig-D0ZXqsN4.mjs';
import './icon-HeroSmall-BSy2oleK.mjs';
import './icon-ImageList-B45PwgnH.mjs';
import './icon-ImageRotation-B6byvM6E.mjs';
import './icon-Map-CoxpDrzH.mjs';
import './icon-MyWork-i3f4UzkH.mjs';
import './icon-Offer-Bx6HkGj9.mjs';
import './icon-PortraitText-k7YQSMg7.mjs';
import './icon-Prices-C9kRPl0_.mjs';
import './icon-Testimonials-CcjdcCAm.mjs';
import './icon-archive-C2_9fv7s.mjs';
import './icon-area-C5NxLOGa.mjs';
import './icon-arrow_down-Ddm6fOKI.mjs';
import './icon-arrow_left-8niShVZu.mjs';
import './icon-arrow_right-suav2XEE.mjs';
import './icon-arrow_up-UBuT3T7c.mjs';
import './icon-bug-Cvmhq7NV.mjs';
import './icon-camera-DrsmPF8J.mjs';
import './icon-car-S-htv3n7.mjs';
import './icon-caret-left-BmejlBew.mjs';
import './icon-caret-right-6QOZ6hQ7.mjs';
import './icon-center-aligned-gMkffEJx.mjs';
import './icon-check-BHGKVX9Q.mjs';
import './icon-circle-C2dJBvtq.mjs';
import './icon-co2-BPS0Fs4O.mjs';
import './icon-consulting-qmTc271H.mjs';
import './icon-copy-CWCABdE6.mjs';
import './icon-cost-CsemzgE_.mjs';
import './icon-cross-D_I2Ol8K.mjs';
import './icon-customer_service-C27-L6r8.mjs';
import './icon-customer_support-e4MpjFpx.mjs';
import './icon-dashboard-lGe9Hnum.mjs';
import './icon-desktop-K0c_sfyR.mjs';
import './icon-dials-BcIPdYnA.mjs';
import './icon-dot-ClMK27iw.mjs';
import './icon-download-eyd1f1d4.mjs';
import './icon-dragarea-CAm_fcfw.mjs';
import './icon-eco-D1LjpVNy.mjs';
import './icon-energy-GkHd0N7z.mjs';
import './icon-error-CRlsgnlH.mjs';
import './icon-file-generic-BJbmdzUL.mjs';
import './icon-file-img-BEq44Qq4.mjs';
import './icon-file-pdf-C7b5hix6.mjs';
import './icon-file-text-D-t_4E9F.mjs';
import './icon-flip-CHsbh2UR.mjs';
import './icon-help-5D-dNf45.mjs';
import './icon-house-DgfVXyCc.mjs';
import './icon-info-CvHs7EyO.mjs';
import './icon-insta-ZBDvFiZH.mjs';
import './icon-installation-CgMbBTdT.mjs';
import './icon-laptop-Cci_Ora-.mjs';
import './icon-left-aligned-CAmffbzw.mjs';
import './icon-link-CMpqIRj-.mjs';
import './icon-lower-BFFrN6o1.mjs';
import './icon-mail-line-BAo_0x_R.mjs';
import './icon-mail-BwdOYU0R.mjs';
import './icon-margin-bottom-QVoi_epr.mjs';
import './icon-margin-left-D10t-0lD.mjs';
import './icon-margin-right-CwunkkSV.mjs';
import './icon-margin-top-UqiJR3mO.mjs';
import './icon-marker-B1JWZOW2.mjs';
import './icon-menu-FgJG5Uov.mjs';
import './icon-mess-CEBZ4ek_.mjs';
import './icon-minus-D6fEuRcb.mjs';
import './icon-mobile_-v7I84D-C.mjs';
import './icon-mobile-BU9CBr2M.mjs';
import './icon-modules-BrfaQYfx.mjs';
import './icon-modules_check-C1l1aSCL.mjs';
import './icon-modules_landscape-DMHsa1cz.mjs';
import './icon-move-DI8KLRIK.mjs';
import './icon-padding-bottom-KTqdIgMt.mjs';
import './icon-padding-left-DWDXJOLC.mjs';
import './icon-padding-right-BaATBpjE.mjs';
import './icon-padding-top-Bj2qZm7f.mjs';
import './icon-pause-Da1NLaR1.mjs';
import './icon-pdf-Bah1O9T8.mjs';
import './icon-pending-DZ1DairS.mjs';
import './icon-phone-line-DPCy2Qv_.mjs';
import './icon-phone-CTu6UrR5.mjs';
import './icon-play-CisByabI.mjs';
import './icon-plus-BXzy1XJ-.mjs';
import './icon-polygon_add2-CVerGsLL.mjs';
import './icon-polygon_subtract-bfHJteNK.mjs';
import './icon-power-BfzUaMGH.mjs';
import './icon-quote-D9t0_RtH.mjs';
import './icon-rectangle-CeZJpb8-.mjs';
import './icon-reload-BJgsPNGI.mjs';
import './icon-repair-CmiMqZLS.mjs';
import './icon-right-aligned-Br5WcdNA.mjs';
import './icon-save-SSnHH_R2.mjs';
import './icon-search-D-ueYEQy.mjs';
import './icon-sort-BsqIDZ_U.mjs';
import './icon-subvention-ei8bL80K.mjs';
import './icon-sun-x8sZTnnk.mjs';
import './icon-tablet-C4nq4XBb.mjs';
import './icon-trash-BprwGnui.mjs';
import './icon-tree-kReavBPl.mjs';
import './icon-triangle_down-Dkd5NUcw.mjs';
import './icon-triangle_up-CAXnAmI1.mjs';
import './icon-triangles-DZjrfu4G.mjs';
import './icon-upload-BRt7Toe0.mjs';
import './icon-user-DY_f8yJi.mjs';
import './icon-whatsapp-Ci-Wz6x-.mjs';
import './icon-years-BuS6xrDW.mjs';
import './index-DD0SuucI.mjs';
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
  __name: "Prices",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarStore = useSidebarStore();
    const { setComponentContent, saveContent, deleteFile } = sidebarStore;
    const { componentContent, componentId, componentType, componentFiles } = storeToRefs(sidebarStore);
    usePocketBase();
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
                "onUpdate:modelValue": ($event2) => price.cta.icon = $event2
              }, null, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              return [
                createVNode("div", { class: "px-2" }, [
                  withDirectives(createVNode("input", {
                    onChange: unref(saveContent),
                    "onUpdate:modelValue": ($event2) => price.name = $event2,
                    type: "text",
                    class: "w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 mb-2"
                  }, null, 40, ["onChange", "onUpdate:modelValue"]), [
                    [vModelText, price.name]
                  ]),
                  withDirectives(createVNode("input", {
                    onChange: unref(saveContent),
                    "onUpdate:modelValue": ($event2) => price.price = $event2,
                    type: "number",
                    class: "w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 mb-2"
                  }, null, 40, ["onChange", "onUpdate:modelValue"]), [
                    [vModelText, price.price]
                  ]),
                  withDirectives(createVNode("input", {
                    onChange: unref(saveContent),
                    "onUpdate:modelValue": ($event2) => price.duration = $event2,
                    type: "number",
                    class: "w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 mb-2"
                  }, null, 40, ["onChange", "onUpdate:modelValue"]), [
                    [vModelText, price.duration]
                  ]),
                  withDirectives(createVNode("textarea", {
                    onChange: unref(saveContent),
                    "onUpdate:modelValue": ($event2) => price.description = $event2,
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
                      "onUpdate:modelValue": ($event2) => price.cta.text = $event2,
                      class: "rounded-sm px-2 py-1 w-full bg-transparent border border-darkOffwhite border-opacity-20 mb-4"
                    }, null, 40, ["onChange", "onUpdate:modelValue"]), [
                      [vModelText, price.cta.text]
                    ]),
                    createVNode("h2", { class: "text-xs mb-2 opacity-40" }, "Link"),
                    withDirectives(createVNode("input", {
                      onChange: unref(saveContent),
                      type: "text",
                      "onUpdate:modelValue": ($event2) => price.cta.link = $event2,
                      class: "rounded-sm px-2 py-1 w-full bg-transparent border border-darkOffwhite border-opacity-20 mb-4"
                    }, null, 40, ["onChange", "onUpdate:modelValue"]), [
                      [vModelText, price.cta.link]
                    ]),
                    createVNode("h2", { class: "text-xs mb-2 opacity-40" }, "Icon"),
                    createVNode(_component_InputIconSelector, {
                      modelValue: price.cta.icon,
                      "onUpdate:modelValue": ($event2) => price.cta.icon = $event2
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
//# sourceMappingURL=Prices-fzaJz00L.mjs.map
