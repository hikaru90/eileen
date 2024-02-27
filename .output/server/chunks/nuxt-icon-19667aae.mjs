import { defineComponent, ref, watchEffect, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "nuxt-icon",
  __ssrInlineRender: true,
  props: {
    name: null,
    filled: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const icon = ref("");
    watchEffect(async () => {
      try {
        const iconsImport = /* @__PURE__ */ Object.assign({
          "/assets/icons/icon-Audio.svg": () => import('./icon-Audio-b44d42c7.mjs').then((m) => m["default"]),
          "/assets/icons/icon-BookingCalendar.svg": () => import('./icon-BookingCalendar-950f1831.mjs').then((m) => m["default"]),
          "/assets/icons/icon-Default.svg": () => import('./icon-Default-0a45fd84.mjs').then((m) => m["default"]),
          "/assets/icons/icon-Faq.svg": () => import('./icon-Faq-0db9fce5.mjs').then((m) => m["default"]),
          "/assets/icons/icon-HeroBig.svg": () => import('./icon-HeroBig-ea331798.mjs').then((m) => m["default"]),
          "/assets/icons/icon-HeroSmall.svg": () => import('./icon-HeroSmall-514d4d26.mjs').then((m) => m["default"]),
          "/assets/icons/icon-ImageList.svg": () => import('./icon-ImageList-4a293cdf.mjs').then((m) => m["default"]),
          "/assets/icons/icon-ImageRotation.svg": () => import('./icon-ImageRotation-5f49ecb8.mjs').then((m) => m["default"]),
          "/assets/icons/icon-MyWork.svg": () => import('./icon-MyWork-7efea99b.mjs').then((m) => m["default"]),
          "/assets/icons/icon-Offer.svg": () => import('./icon-Offer-f7986722.mjs').then((m) => m["default"]),
          "/assets/icons/icon-PortraitText.svg": () => import('./icon-PortraitText-8c3760ea.mjs').then((m) => m["default"]),
          "/assets/icons/icon-Prices.svg": () => import('./icon-Prices-4dc6447d.mjs').then((m) => m["default"]),
          "/assets/icons/icon-Testimonials.svg": () => import('./icon-Testimonials-1ddcdf79.mjs').then((m) => m["default"]),
          "/assets/icons/icon-archive.svg": () => import('./icon-archive-666d45fa.mjs').then((m) => m["default"]),
          "/assets/icons/icon-area.svg": () => import('./icon-area-d4646bef.mjs').then((m) => m["default"]),
          "/assets/icons/icon-arrow_down.svg": () => import('./icon-arrow_down-a879e4b0.mjs').then((m) => m["default"]),
          "/assets/icons/icon-arrow_left.svg": () => import('./icon-arrow_left-63790420.mjs').then((m) => m["default"]),
          "/assets/icons/icon-arrow_right.svg": () => import('./icon-arrow_right-39d0dd7e.mjs').then((m) => m["default"]),
          "/assets/icons/icon-arrow_up.svg": () => import('./icon-arrow_up-2bb6f1b1.mjs').then((m) => m["default"]),
          "/assets/icons/icon-bug.svg": () => import('./icon-bug-f52895ea.mjs').then((m) => m["default"]),
          "/assets/icons/icon-camera.svg": () => import('./icon-camera-9a54a087.mjs').then((m) => m["default"]),
          "/assets/icons/icon-car.svg": () => import('./icon-car-2664bceb.mjs').then((m) => m["default"]),
          "/assets/icons/icon-caret-left.svg": () => import('./icon-caret-left-fc959ca5.mjs').then((m) => m["default"]),
          "/assets/icons/icon-caret-right.svg": () => import('./icon-caret-right-9e9788ea.mjs').then((m) => m["default"]),
          "/assets/icons/icon-center-aligned.svg": () => import('./icon-center-aligned-929c9a70.mjs').then((m) => m["default"]),
          "/assets/icons/icon-check.svg": () => import('./icon-check-b7ee3bc5.mjs').then((m) => m["default"]),
          "/assets/icons/icon-circle.svg": () => import('./icon-circle-cae907de.mjs').then((m) => m["default"]),
          "/assets/icons/icon-co2.svg": () => import('./icon-co2-8ee53b3b.mjs').then((m) => m["default"]),
          "/assets/icons/icon-consulting.svg": () => import('./icon-consulting-f0e0b43e.mjs').then((m) => m["default"]),
          "/assets/icons/icon-copy.svg": () => import('./icon-copy-bc0c31a5.mjs').then((m) => m["default"]),
          "/assets/icons/icon-cost.svg": () => import('./icon-cost-22203805.mjs').then((m) => m["default"]),
          "/assets/icons/icon-cross.svg": () => import('./icon-cross-aad34a00.mjs').then((m) => m["default"]),
          "/assets/icons/icon-customer_service.svg": () => import('./icon-customer_service-4d48f446.mjs').then((m) => m["default"]),
          "/assets/icons/icon-customer_support.svg": () => import('./icon-customer_support-e91de1cd.mjs').then((m) => m["default"]),
          "/assets/icons/icon-dashboard.svg": () => import('./icon-dashboard-61dcaede.mjs').then((m) => m["default"]),
          "/assets/icons/icon-desktop.svg": () => import('./icon-desktop-b08d6520.mjs').then((m) => m["default"]),
          "/assets/icons/icon-dials.svg": () => import('./icon-dials-5f63d461.mjs').then((m) => m["default"]),
          "/assets/icons/icon-dot.svg": () => import('./icon-dot-70ad5a4b.mjs').then((m) => m["default"]),
          "/assets/icons/icon-download.svg": () => import('./icon-download-ab7b4ceb.mjs').then((m) => m["default"]),
          "/assets/icons/icon-dragarea.svg": () => import('./icon-dragarea-226550cb.mjs').then((m) => m["default"]),
          "/assets/icons/icon-eco.svg": () => import('./icon-eco-878f0494.mjs').then((m) => m["default"]),
          "/assets/icons/icon-energy.svg": () => import('./icon-energy-5fe922c7.mjs').then((m) => m["default"]),
          "/assets/icons/icon-error.svg": () => import('./icon-error-1c2963dd.mjs').then((m) => m["default"]),
          "/assets/icons/icon-file-generic.svg": () => import('./icon-file-generic-b3514002.mjs').then((m) => m["default"]),
          "/assets/icons/icon-file-img.svg": () => import('./icon-file-img-420d7e2e.mjs').then((m) => m["default"]),
          "/assets/icons/icon-file-pdf.svg": () => import('./icon-file-pdf-04aeedc7.mjs').then((m) => m["default"]),
          "/assets/icons/icon-file-text.svg": () => import('./icon-file-text-38b5d3a0.mjs').then((m) => m["default"]),
          "/assets/icons/icon-flip.svg": () => import('./icon-flip-64fde6a2.mjs').then((m) => m["default"]),
          "/assets/icons/icon-help.svg": () => import('./icon-help-c0a9e206.mjs').then((m) => m["default"]),
          "/assets/icons/icon-house.svg": () => import('./icon-house-071a8c5b.mjs').then((m) => m["default"]),
          "/assets/icons/icon-info.svg": () => import('./icon-info-291e9cdc.mjs').then((m) => m["default"]),
          "/assets/icons/icon-installation.svg": () => import('./icon-installation-a02d96cd.mjs').then((m) => m["default"]),
          "/assets/icons/icon-laptop.svg": () => import('./icon-laptop-1db167b3.mjs').then((m) => m["default"]),
          "/assets/icons/icon-left-aligned.svg": () => import('./icon-left-aligned-39fc4b23.mjs').then((m) => m["default"]),
          "/assets/icons/icon-link.svg": () => import('./icon-link-c4ef31be.mjs').then((m) => m["default"]),
          "/assets/icons/icon-lower.svg": () => import('./icon-lower-a94e9b7e.mjs').then((m) => m["default"]),
          "/assets/icons/icon-mail.svg": () => import('./icon-mail-6ea9100c.mjs').then((m) => m["default"]),
          "/assets/icons/icon-margin-bottom.svg": () => import('./icon-margin-bottom-26aeb7a0.mjs').then((m) => m["default"]),
          "/assets/icons/icon-margin-left.svg": () => import('./icon-margin-left-4ad26c31.mjs').then((m) => m["default"]),
          "/assets/icons/icon-margin-right.svg": () => import('./icon-margin-right-e10e317e.mjs').then((m) => m["default"]),
          "/assets/icons/icon-margin-top.svg": () => import('./icon-margin-top-f33ae917.mjs').then((m) => m["default"]),
          "/assets/icons/icon-marker.svg": () => import('./icon-marker-deda1fc6.mjs').then((m) => m["default"]),
          "/assets/icons/icon-menu.svg": () => import('./icon-menu-b18792fb.mjs').then((m) => m["default"]),
          "/assets/icons/icon-mess.svg": () => import('./icon-mess-e3bf9fd7.mjs').then((m) => m["default"]),
          "/assets/icons/icon-minus.svg": () => import('./icon-minus-a1781843.mjs').then((m) => m["default"]),
          "/assets/icons/icon-mobile+.svg": () => import('./icon-mobile_-09b5105a.mjs').then((m) => m["default"]),
          "/assets/icons/icon-mobile.svg": () => import('./icon-mobile-b803d43d.mjs').then((m) => m["default"]),
          "/assets/icons/icon-modules.svg": () => import('./icon-modules-d7096a5c.mjs').then((m) => m["default"]),
          "/assets/icons/icon-modules_check.svg": () => import('./icon-modules_check-61250c4f.mjs').then((m) => m["default"]),
          "/assets/icons/icon-modules_landscape.svg": () => import('./icon-modules_landscape-0c36794f.mjs').then((m) => m["default"]),
          "/assets/icons/icon-move.svg": () => import('./icon-move-63cd8c00.mjs').then((m) => m["default"]),
          "/assets/icons/icon-padding-bottom.svg": () => import('./icon-padding-bottom-72d679d6.mjs').then((m) => m["default"]),
          "/assets/icons/icon-padding-left.svg": () => import('./icon-padding-left-1d118eb2.mjs').then((m) => m["default"]),
          "/assets/icons/icon-padding-right.svg": () => import('./icon-padding-right-8a918b5d.mjs').then((m) => m["default"]),
          "/assets/icons/icon-padding-top.svg": () => import('./icon-padding-top-c09c28bd.mjs').then((m) => m["default"]),
          "/assets/icons/icon-pause.svg": () => import('./icon-pause-447582dd.mjs').then((m) => m["default"]),
          "/assets/icons/icon-pending.svg": () => import('./icon-pending-9d843219.mjs').then((m) => m["default"]),
          "/assets/icons/icon-phone.svg": () => import('./icon-phone-3253cf1d.mjs').then((m) => m["default"]),
          "/assets/icons/icon-play.svg": () => import('./icon-play-0f3f618d.mjs').then((m) => m["default"]),
          "/assets/icons/icon-plus.svg": () => import('./icon-plus-fd05a43d.mjs').then((m) => m["default"]),
          "/assets/icons/icon-polygon_add2.svg": () => import('./icon-polygon_add2-737d6ffd.mjs').then((m) => m["default"]),
          "/assets/icons/icon-polygon_subtract.svg": () => import('./icon-polygon_subtract-33fd416a.mjs').then((m) => m["default"]),
          "/assets/icons/icon-power.svg": () => import('./icon-power-3dd12977.mjs').then((m) => m["default"]),
          "/assets/icons/icon-quote.svg": () => import('./icon-quote-26f56aad.mjs').then((m) => m["default"]),
          "/assets/icons/icon-rectangle.svg": () => import('./icon-rectangle-9a0f5f81.mjs').then((m) => m["default"]),
          "/assets/icons/icon-reload.svg": () => import('./icon-reload-f07a1e11.mjs').then((m) => m["default"]),
          "/assets/icons/icon-repair.svg": () => import('./icon-repair-9921f996.mjs').then((m) => m["default"]),
          "/assets/icons/icon-right-aligned.svg": () => import('./icon-right-aligned-7da1acda.mjs').then((m) => m["default"]),
          "/assets/icons/icon-save.svg": () => import('./icon-save-3af924d8.mjs').then((m) => m["default"]),
          "/assets/icons/icon-search.svg": () => import('./icon-search-6d1020fc.mjs').then((m) => m["default"]),
          "/assets/icons/icon-sort.svg": () => import('./icon-sort-3691b664.mjs').then((m) => m["default"]),
          "/assets/icons/icon-subvention.svg": () => import('./icon-subvention-a166940f.mjs').then((m) => m["default"]),
          "/assets/icons/icon-sun.svg": () => import('./icon-sun-6a25bb67.mjs').then((m) => m["default"]),
          "/assets/icons/icon-tablet.svg": () => import('./icon-tablet-21cd0061.mjs').then((m) => m["default"]),
          "/assets/icons/icon-trash.svg": () => import('./icon-trash-659868b2.mjs').then((m) => m["default"]),
          "/assets/icons/icon-tree.svg": () => import('./icon-tree-9552a3c8.mjs').then((m) => m["default"]),
          "/assets/icons/icon-triangle_down.svg": () => import('./icon-triangle_down-9f742dcf.mjs').then((m) => m["default"]),
          "/assets/icons/icon-triangle_up.svg": () => import('./icon-triangle_up-50ec2150.mjs').then((m) => m["default"]),
          "/assets/icons/icon-triangles.svg": () => import('./icon-triangles-4c56a8e1.mjs').then((m) => m["default"]),
          "/assets/icons/icon-upload.svg": () => import('./icon-upload-a8932599.mjs').then((m) => m["default"]),
          "/assets/icons/icon-user.svg": () => import('./icon-user-adff16a2.mjs').then((m) => m["default"]),
          "/assets/icons/icon-years.svg": () => import('./icon-years-f97162ca.mjs').then((m) => m["default"])
        });
        const rawIcon = await iconsImport[`/assets/icons/${props.name}.svg`]();
        icon.value = rawIcon;
      } catch {
        console.error(
          `[nuxt-icons] Icon '${props.name}' doesn't exist in 'assets/icons'`
        );
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(mergeProps({
        class: ["nuxt-icon", { "nuxt-icon--fill": !__props.filled }]
      }, _attrs))}>${unref(icon)}</span>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt-icons/dist/runtime/components/nuxt-icon.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=nuxt-icon-19667aae.mjs.map
