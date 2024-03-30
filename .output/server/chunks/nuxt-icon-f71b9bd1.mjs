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
          "/assets/icons/icon-ClickableHeadings.svg": () => import('./icon-ClickableHeadings-dae514ac.mjs').then((m) => m["default"]),
          "/assets/icons/icon-Contact.svg": () => import('./icon-Contact-654d036c.mjs').then((m) => m["default"]),
          "/assets/icons/icon-Default.svg": () => import('./icon-Default-e6d94fac.mjs').then((m) => m["default"]),
          "/assets/icons/icon-Downloads.svg": () => import('./icon-Downloads-64a60962.mjs').then((m) => m["default"]),
          "/assets/icons/icon-Faq.svg": () => import('./icon-Faq-ed3517a2.mjs').then((m) => m["default"]),
          "/assets/icons/icon-HeroBig.svg": () => import('./icon-HeroBig-50c5e9d3.mjs').then((m) => m["default"]),
          "/assets/icons/icon-HeroSmall.svg": () => import('./icon-HeroSmall-789c9b48.mjs').then((m) => m["default"]),
          "/assets/icons/icon-ImageList.svg": () => import('./icon-ImageList-0181c81f.mjs').then((m) => m["default"]),
          "/assets/icons/icon-ImageRotation.svg": () => import('./icon-ImageRotation-472a0e06.mjs').then((m) => m["default"]),
          "/assets/icons/icon-Map.svg": () => import('./icon-Map-b1d7bf44.mjs').then((m) => m["default"]),
          "/assets/icons/icon-MyWork.svg": () => import('./icon-MyWork-43311737.mjs').then((m) => m["default"]),
          "/assets/icons/icon-Offer.svg": () => import('./icon-Offer-03ca6149.mjs').then((m) => m["default"]),
          "/assets/icons/icon-PortraitText.svg": () => import('./icon-PortraitText-b51ddcd5.mjs').then((m) => m["default"]),
          "/assets/icons/icon-Prices.svg": () => import('./icon-Prices-e5575f18.mjs').then((m) => m["default"]),
          "/assets/icons/icon-Testimonials.svg": () => import('./icon-Testimonials-ebf24e38.mjs').then((m) => m["default"]),
          "/assets/icons/icon-archive.svg": () => import('./icon-archive-2c3c3217.mjs').then((m) => m["default"]),
          "/assets/icons/icon-area.svg": () => import('./icon-area-7d4f824f.mjs').then((m) => m["default"]),
          "/assets/icons/icon-arrow_down.svg": () => import('./icon-arrow_down-d226b308.mjs').then((m) => m["default"]),
          "/assets/icons/icon-arrow_left.svg": () => import('./icon-arrow_left-b9a7a446.mjs').then((m) => m["default"]),
          "/assets/icons/icon-arrow_right.svg": () => import('./icon-arrow_right-c0e54b54.mjs').then((m) => m["default"]),
          "/assets/icons/icon-arrow_up.svg": () => import('./icon-arrow_up-930e464f.mjs').then((m) => m["default"]),
          "/assets/icons/icon-bug.svg": () => import('./icon-bug-551e1817.mjs').then((m) => m["default"]),
          "/assets/icons/icon-camera.svg": () => import('./icon-camera-55eaacab.mjs').then((m) => m["default"]),
          "/assets/icons/icon-car.svg": () => import('./icon-car-b65855a4.mjs').then((m) => m["default"]),
          "/assets/icons/icon-caret-left.svg": () => import('./icon-caret-left-af571d92.mjs').then((m) => m["default"]),
          "/assets/icons/icon-caret-right.svg": () => import('./icon-caret-right-00f01913.mjs').then((m) => m["default"]),
          "/assets/icons/icon-center-aligned.svg": () => import('./icon-center-aligned-2b26af0f.mjs').then((m) => m["default"]),
          "/assets/icons/icon-check.svg": () => import('./icon-check-5e87ec73.mjs').then((m) => m["default"]),
          "/assets/icons/icon-circle.svg": () => import('./icon-circle-3f1c8617.mjs').then((m) => m["default"]),
          "/assets/icons/icon-co2.svg": () => import('./icon-co2-92658eab.mjs').then((m) => m["default"]),
          "/assets/icons/icon-consulting.svg": () => import('./icon-consulting-5b90eb6e.mjs').then((m) => m["default"]),
          "/assets/icons/icon-copy.svg": () => import('./icon-copy-3c1b6110.mjs').then((m) => m["default"]),
          "/assets/icons/icon-cost.svg": () => import('./icon-cost-835d8b85.mjs').then((m) => m["default"]),
          "/assets/icons/icon-cross.svg": () => import('./icon-cross-97040d3c.mjs').then((m) => m["default"]),
          "/assets/icons/icon-customer_service.svg": () => import('./icon-customer_service-5fd206dd.mjs').then((m) => m["default"]),
          "/assets/icons/icon-customer_support.svg": () => import('./icon-customer_support-f0a913be.mjs').then((m) => m["default"]),
          "/assets/icons/icon-dashboard.svg": () => import('./icon-dashboard-0a3a2a5a.mjs').then((m) => m["default"]),
          "/assets/icons/icon-desktop.svg": () => import('./icon-desktop-a1684c59.mjs').then((m) => m["default"]),
          "/assets/icons/icon-dials.svg": () => import('./icon-dials-3476a214.mjs').then((m) => m["default"]),
          "/assets/icons/icon-dot.svg": () => import('./icon-dot-0bce099c.mjs').then((m) => m["default"]),
          "/assets/icons/icon-download.svg": () => import('./icon-download-e8186f34.mjs').then((m) => m["default"]),
          "/assets/icons/icon-dragarea.svg": () => import('./icon-dragarea-205e6942.mjs').then((m) => m["default"]),
          "/assets/icons/icon-eco.svg": () => import('./icon-eco-eb2dca03.mjs').then((m) => m["default"]),
          "/assets/icons/icon-energy.svg": () => import('./icon-energy-38d448b2.mjs').then((m) => m["default"]),
          "/assets/icons/icon-error.svg": () => import('./icon-error-2593ecf2.mjs').then((m) => m["default"]),
          "/assets/icons/icon-file-generic.svg": () => import('./icon-file-generic-1b3d879f.mjs').then((m) => m["default"]),
          "/assets/icons/icon-file-img.svg": () => import('./icon-file-img-57255f07.mjs').then((m) => m["default"]),
          "/assets/icons/icon-file-pdf.svg": () => import('./icon-file-pdf-f0ddd687.mjs').then((m) => m["default"]),
          "/assets/icons/icon-file-text.svg": () => import('./icon-file-text-2153b86f.mjs').then((m) => m["default"]),
          "/assets/icons/icon-flip.svg": () => import('./icon-flip-e807bcc8.mjs').then((m) => m["default"]),
          "/assets/icons/icon-help.svg": () => import('./icon-help-ec469591.mjs').then((m) => m["default"]),
          "/assets/icons/icon-house.svg": () => import('./icon-house-04b5d06e.mjs').then((m) => m["default"]),
          "/assets/icons/icon-info.svg": () => import('./icon-info-05aa40c8.mjs').then((m) => m["default"]),
          "/assets/icons/icon-installation.svg": () => import('./icon-installation-6282cd76.mjs').then((m) => m["default"]),
          "/assets/icons/icon-laptop.svg": () => import('./icon-laptop-f992cb3b.mjs').then((m) => m["default"]),
          "/assets/icons/icon-left-aligned.svg": () => import('./icon-left-aligned-0a22b405.mjs').then((m) => m["default"]),
          "/assets/icons/icon-link.svg": () => import('./icon-link-5174cb12.mjs').then((m) => m["default"]),
          "/assets/icons/icon-lower.svg": () => import('./icon-lower-d46eb7fb.mjs').then((m) => m["default"]),
          "/assets/icons/icon-mail.svg": () => import('./icon-mail-74c1f767.mjs').then((m) => m["default"]),
          "/assets/icons/icon-margin-bottom.svg": () => import('./icon-margin-bottom-c20afcdf.mjs').then((m) => m["default"]),
          "/assets/icons/icon-margin-left.svg": () => import('./icon-margin-left-374b5f4d.mjs').then((m) => m["default"]),
          "/assets/icons/icon-margin-right.svg": () => import('./icon-margin-right-989ccb3d.mjs').then((m) => m["default"]),
          "/assets/icons/icon-margin-top.svg": () => import('./icon-margin-top-c8e86378.mjs').then((m) => m["default"]),
          "/assets/icons/icon-marker.svg": () => import('./icon-marker-784049e0.mjs').then((m) => m["default"]),
          "/assets/icons/icon-menu.svg": () => import('./icon-menu-a20d24d2.mjs').then((m) => m["default"]),
          "/assets/icons/icon-mess.svg": () => import('./icon-mess-bab93754.mjs').then((m) => m["default"]),
          "/assets/icons/icon-minus.svg": () => import('./icon-minus-8ef288c4.mjs').then((m) => m["default"]),
          "/assets/icons/icon-mobile+.svg": () => import('./icon-mobile_-8eacae1e.mjs').then((m) => m["default"]),
          "/assets/icons/icon-mobile.svg": () => import('./icon-mobile-766e18b2.mjs').then((m) => m["default"]),
          "/assets/icons/icon-modules.svg": () => import('./icon-modules-83b2bb9e.mjs').then((m) => m["default"]),
          "/assets/icons/icon-modules_check.svg": () => import('./icon-modules_check-a403aa05.mjs').then((m) => m["default"]),
          "/assets/icons/icon-modules_landscape.svg": () => import('./icon-modules_landscape-d59d0cfe.mjs').then((m) => m["default"]),
          "/assets/icons/icon-move.svg": () => import('./icon-move-2ec06eda.mjs').then((m) => m["default"]),
          "/assets/icons/icon-padding-bottom.svg": () => import('./icon-padding-bottom-16bb0fa4.mjs').then((m) => m["default"]),
          "/assets/icons/icon-padding-left.svg": () => import('./icon-padding-left-58fcf9ee.mjs').then((m) => m["default"]),
          "/assets/icons/icon-padding-right.svg": () => import('./icon-padding-right-4f69ac29.mjs').then((m) => m["default"]),
          "/assets/icons/icon-padding-top.svg": () => import('./icon-padding-top-8e4a444b.mjs').then((m) => m["default"]),
          "/assets/icons/icon-pause.svg": () => import('./icon-pause-ee73051e.mjs').then((m) => m["default"]),
          "/assets/icons/icon-pending.svg": () => import('./icon-pending-fd67f33a.mjs').then((m) => m["default"]),
          "/assets/icons/icon-phone.svg": () => import('./icon-phone-7d6cbc0a.mjs').then((m) => m["default"]),
          "/assets/icons/icon-play.svg": () => import('./icon-play-e3269391.mjs').then((m) => m["default"]),
          "/assets/icons/icon-plus.svg": () => import('./icon-plus-b0efec02.mjs').then((m) => m["default"]),
          "/assets/icons/icon-polygon_add2.svg": () => import('./icon-polygon_add2-15651c76.mjs').then((m) => m["default"]),
          "/assets/icons/icon-polygon_subtract.svg": () => import('./icon-polygon_subtract-d6893e33.mjs').then((m) => m["default"]),
          "/assets/icons/icon-power.svg": () => import('./icon-power-541577d1.mjs').then((m) => m["default"]),
          "/assets/icons/icon-quote.svg": () => import('./icon-quote-c881413c.mjs').then((m) => m["default"]),
          "/assets/icons/icon-rectangle.svg": () => import('./icon-rectangle-4bd52d63.mjs').then((m) => m["default"]),
          "/assets/icons/icon-reload.svg": () => import('./icon-reload-73534c0a.mjs').then((m) => m["default"]),
          "/assets/icons/icon-repair.svg": () => import('./icon-repair-dd7a8276.mjs').then((m) => m["default"]),
          "/assets/icons/icon-right-aligned.svg": () => import('./icon-right-aligned-00110403.mjs').then((m) => m["default"]),
          "/assets/icons/icon-save.svg": () => import('./icon-save-48f5cc1a.mjs').then((m) => m["default"]),
          "/assets/icons/icon-search.svg": () => import('./icon-search-9642f270.mjs').then((m) => m["default"]),
          "/assets/icons/icon-sort.svg": () => import('./icon-sort-30e180ca.mjs').then((m) => m["default"]),
          "/assets/icons/icon-subvention.svg": () => import('./icon-subvention-faaa8af9.mjs').then((m) => m["default"]),
          "/assets/icons/icon-sun.svg": () => import('./icon-sun-11fd23fa.mjs').then((m) => m["default"]),
          "/assets/icons/icon-tablet.svg": () => import('./icon-tablet-2ad0d580.mjs').then((m) => m["default"]),
          "/assets/icons/icon-trash.svg": () => import('./icon-trash-32718ec4.mjs').then((m) => m["default"]),
          "/assets/icons/icon-tree.svg": () => import('./icon-tree-588c804f.mjs').then((m) => m["default"]),
          "/assets/icons/icon-triangle_down.svg": () => import('./icon-triangle_down-9af59c8e.mjs').then((m) => m["default"]),
          "/assets/icons/icon-triangle_up.svg": () => import('./icon-triangle_up-19201ad4.mjs').then((m) => m["default"]),
          "/assets/icons/icon-triangles.svg": () => import('./icon-triangles-4ceeb324.mjs').then((m) => m["default"]),
          "/assets/icons/icon-upload.svg": () => import('./icon-upload-c3ba6134.mjs').then((m) => m["default"]),
          "/assets/icons/icon-user.svg": () => import('./icon-user-ea8eb8d7.mjs').then((m) => m["default"]),
          "/assets/icons/icon-years.svg": () => import('./icon-years-5ee6e702.mjs').then((m) => m["default"])
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
//# sourceMappingURL=nuxt-icon-f71b9bd1.mjs.map
