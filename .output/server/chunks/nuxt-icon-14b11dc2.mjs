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
          "/assets/icons/icon-BookingCalendar.svg": () => import('./icon-BookingCalendar-00dab00c.mjs').then((m) => m["default"]),
          "/assets/icons/icon-Default.svg": () => import('./icon-Default-85dc2ff8.mjs').then((m) => m["default"]),
          "/assets/icons/icon-Faq.svg": () => import('./icon-Faq-2f618915.mjs').then((m) => m["default"]),
          "/assets/icons/icon-HeroBig.svg": () => import('./icon-HeroBig-86e284c7.mjs').then((m) => m["default"]),
          "/assets/icons/icon-HeroSmall.svg": () => import('./icon-HeroSmall-30cf3e99.mjs').then((m) => m["default"]),
          "/assets/icons/icon-ImageList.svg": () => import('./icon-ImageList-d957c076.mjs').then((m) => m["default"]),
          "/assets/icons/icon-ImageRotation.svg": () => import('./icon-ImageRotation-3c13e7e9.mjs').then((m) => m["default"]),
          "/assets/icons/icon-Prices.svg": () => import('./icon-Prices-0a4393ae.mjs').then((m) => m["default"]),
          "/assets/icons/icon-archive.svg": () => import('./icon-archive-4dc2e644.mjs').then((m) => m["default"]),
          "/assets/icons/icon-area.svg": () => import('./icon-area-761ec823.mjs').then((m) => m["default"]),
          "/assets/icons/icon-arrow_down.svg": () => import('./icon-arrow_down-84315b51.mjs').then((m) => m["default"]),
          "/assets/icons/icon-arrow_left.svg": () => import('./icon-arrow_left-3cc20fb3.mjs').then((m) => m["default"]),
          "/assets/icons/icon-arrow_right.svg": () => import('./icon-arrow_right-97e20096.mjs').then((m) => m["default"]),
          "/assets/icons/icon-arrow_up.svg": () => import('./icon-arrow_up-ce72e0ca.mjs').then((m) => m["default"]),
          "/assets/icons/icon-bug.svg": () => import('./icon-bug-5ba91c63.mjs').then((m) => m["default"]),
          "/assets/icons/icon-car.svg": () => import('./icon-car-b2e25dc3.mjs').then((m) => m["default"]),
          "/assets/icons/icon-caret-left.svg": () => import('./icon-caret-left-94f4de0a.mjs').then((m) => m["default"]),
          "/assets/icons/icon-caret-right.svg": () => import('./icon-caret-right-27dd4932.mjs').then((m) => m["default"]),
          "/assets/icons/icon-center-aligned.svg": () => import('./icon-center-aligned-13a63377.mjs').then((m) => m["default"]),
          "/assets/icons/icon-check.svg": () => import('./icon-check-6fa862b2.mjs').then((m) => m["default"]),
          "/assets/icons/icon-circle.svg": () => import('./icon-circle-3747153d.mjs').then((m) => m["default"]),
          "/assets/icons/icon-co2.svg": () => import('./icon-co2-90066342.mjs').then((m) => m["default"]),
          "/assets/icons/icon-consulting.svg": () => import('./icon-consulting-6ed90642.mjs').then((m) => m["default"]),
          "/assets/icons/icon-copy.svg": () => import('./icon-copy-1fe81b3f.mjs').then((m) => m["default"]),
          "/assets/icons/icon-cost.svg": () => import('./icon-cost-798c6e98.mjs').then((m) => m["default"]),
          "/assets/icons/icon-cross.svg": () => import('./icon-cross-aab68f74.mjs').then((m) => m["default"]),
          "/assets/icons/icon-customer_service.svg": () => import('./icon-customer_service-09ecbb52.mjs').then((m) => m["default"]),
          "/assets/icons/icon-customer_support.svg": () => import('./icon-customer_support-32fdd24a.mjs').then((m) => m["default"]),
          "/assets/icons/icon-dashboard.svg": () => import('./icon-dashboard-cddf0596.mjs').then((m) => m["default"]),
          "/assets/icons/icon-desktop.svg": () => import('./icon-desktop-5bea7949.mjs').then((m) => m["default"]),
          "/assets/icons/icon-dials.svg": () => import('./icon-dials-6d2f8dda.mjs').then((m) => m["default"]),
          "/assets/icons/icon-dot.svg": () => import('./icon-dot-74ce8b1a.mjs').then((m) => m["default"]),
          "/assets/icons/icon-download.svg": () => import('./icon-download-c72fddff.mjs').then((m) => m["default"]),
          "/assets/icons/icon-dragarea.svg": () => import('./icon-dragarea-fcb6cf6d.mjs').then((m) => m["default"]),
          "/assets/icons/icon-eco.svg": () => import('./icon-eco-3b24403d.mjs').then((m) => m["default"]),
          "/assets/icons/icon-energy.svg": () => import('./icon-energy-66d3c799.mjs').then((m) => m["default"]),
          "/assets/icons/icon-error.svg": () => import('./icon-error-0165b3c4.mjs').then((m) => m["default"]),
          "/assets/icons/icon-file-generic.svg": () => import('./icon-file-generic-23c3dcb2.mjs').then((m) => m["default"]),
          "/assets/icons/icon-file-img.svg": () => import('./icon-file-img-b008a7f2.mjs').then((m) => m["default"]),
          "/assets/icons/icon-file-pdf.svg": () => import('./icon-file-pdf-d3e64025.mjs').then((m) => m["default"]),
          "/assets/icons/icon-file-text.svg": () => import('./icon-file-text-eafea048.mjs').then((m) => m["default"]),
          "/assets/icons/icon-flip.svg": () => import('./icon-flip-7dc328a9.mjs').then((m) => m["default"]),
          "/assets/icons/icon-help.svg": () => import('./icon-help-70987525.mjs').then((m) => m["default"]),
          "/assets/icons/icon-house.svg": () => import('./icon-house-aa111ead.mjs').then((m) => m["default"]),
          "/assets/icons/icon-info.svg": () => import('./icon-info-2d984e0f.mjs').then((m) => m["default"]),
          "/assets/icons/icon-installation.svg": () => import('./icon-installation-ee74f22b.mjs').then((m) => m["default"]),
          "/assets/icons/icon-laptop.svg": () => import('./icon-laptop-4f8849dd.mjs').then((m) => m["default"]),
          "/assets/icons/icon-left-aligned.svg": () => import('./icon-left-aligned-d1e00faf.mjs').then((m) => m["default"]),
          "/assets/icons/icon-link.svg": () => import('./icon-link-821e7926.mjs').then((m) => m["default"]),
          "/assets/icons/icon-lower.svg": () => import('./icon-lower-a6f410fe.mjs').then((m) => m["default"]),
          "/assets/icons/icon-mail.svg": () => import('./icon-mail-70c9ab04.mjs').then((m) => m["default"]),
          "/assets/icons/icon-margin-bottom.svg": () => import('./icon-margin-bottom-25627c8c.mjs').then((m) => m["default"]),
          "/assets/icons/icon-margin-left.svg": () => import('./icon-margin-left-12db653f.mjs').then((m) => m["default"]),
          "/assets/icons/icon-margin-right.svg": () => import('./icon-margin-right-e45cedad.mjs').then((m) => m["default"]),
          "/assets/icons/icon-margin-top.svg": () => import('./icon-margin-top-f98aafb5.mjs').then((m) => m["default"]),
          "/assets/icons/icon-marker.svg": () => import('./icon-marker-5a38e0a3.mjs').then((m) => m["default"]),
          "/assets/icons/icon-menu.svg": () => import('./icon-menu-adb5dca6.mjs').then((m) => m["default"]),
          "/assets/icons/icon-mess.svg": () => import('./icon-mess-2ca9c138.mjs').then((m) => m["default"]),
          "/assets/icons/icon-minus.svg": () => import('./icon-minus-af64a28d.mjs').then((m) => m["default"]),
          "/assets/icons/icon-mobile+.svg": () => import('./icon-mobile_-0f28c527.mjs').then((m) => m["default"]),
          "/assets/icons/icon-mobile.svg": () => import('./icon-mobile-b5a18aa5.mjs').then((m) => m["default"]),
          "/assets/icons/icon-modules.svg": () => import('./icon-modules-ee4b7a2f.mjs').then((m) => m["default"]),
          "/assets/icons/icon-modules_check.svg": () => import('./icon-modules_check-e0179e4f.mjs').then((m) => m["default"]),
          "/assets/icons/icon-modules_landscape.svg": () => import('./icon-modules_landscape-9f0901a3.mjs').then((m) => m["default"]),
          "/assets/icons/icon-move.svg": () => import('./icon-move-42886ec5.mjs').then((m) => m["default"]),
          "/assets/icons/icon-padding-bottom.svg": () => import('./icon-padding-bottom-c26823e9.mjs').then((m) => m["default"]),
          "/assets/icons/icon-padding-left.svg": () => import('./icon-padding-left-a992dac1.mjs').then((m) => m["default"]),
          "/assets/icons/icon-padding-right.svg": () => import('./icon-padding-right-0c9e199c.mjs').then((m) => m["default"]),
          "/assets/icons/icon-padding-top.svg": () => import('./icon-padding-top-30463e4d.mjs').then((m) => m["default"]),
          "/assets/icons/icon-pause.svg": () => import('./icon-pause-794d2d01.mjs').then((m) => m["default"]),
          "/assets/icons/icon-pending.svg": () => import('./icon-pending-e91fc2b3.mjs').then((m) => m["default"]),
          "/assets/icons/icon-phone.svg": () => import('./icon-phone-98abcef7.mjs').then((m) => m["default"]),
          "/assets/icons/icon-play.svg": () => import('./icon-play-9b268b4d.mjs').then((m) => m["default"]),
          "/assets/icons/icon-plus.svg": () => import('./icon-plus-976dcab9.mjs').then((m) => m["default"]),
          "/assets/icons/icon-polygon_add2.svg": () => import('./icon-polygon_add2-dfae0d34.mjs').then((m) => m["default"]),
          "/assets/icons/icon-polygon_subtract.svg": () => import('./icon-polygon_subtract-b90557c1.mjs').then((m) => m["default"]),
          "/assets/icons/icon-power.svg": () => import('./icon-power-3d78b4aa.mjs').then((m) => m["default"]),
          "/assets/icons/icon-quote.svg": () => import('./icon-quote-7b8f8faa.mjs').then((m) => m["default"]),
          "/assets/icons/icon-rectangle.svg": () => import('./icon-rectangle-278e40f9.mjs').then((m) => m["default"]),
          "/assets/icons/icon-reload.svg": () => import('./icon-reload-015443a4.mjs').then((m) => m["default"]),
          "/assets/icons/icon-repair.svg": () => import('./icon-repair-9b9e8b26.mjs').then((m) => m["default"]),
          "/assets/icons/icon-right-aligned.svg": () => import('./icon-right-aligned-62cdead9.mjs').then((m) => m["default"]),
          "/assets/icons/icon-save.svg": () => import('./icon-save-d26ffe1e.mjs').then((m) => m["default"]),
          "/assets/icons/icon-search.svg": () => import('./icon-search-3c2f0835.mjs').then((m) => m["default"]),
          "/assets/icons/icon-sort.svg": () => import('./icon-sort-f3ad8ef0.mjs').then((m) => m["default"]),
          "/assets/icons/icon-subvention.svg": () => import('./icon-subvention-03c4b50d.mjs').then((m) => m["default"]),
          "/assets/icons/icon-sun.svg": () => import('./icon-sun-e25ae887.mjs').then((m) => m["default"]),
          "/assets/icons/icon-tablet.svg": () => import('./icon-tablet-8489ca6a.mjs').then((m) => m["default"]),
          "/assets/icons/icon-trash.svg": () => import('./icon-trash-fd026653.mjs').then((m) => m["default"]),
          "/assets/icons/icon-tree.svg": () => import('./icon-tree-b9e3465e.mjs').then((m) => m["default"]),
          "/assets/icons/icon-triangle_down.svg": () => import('./icon-triangle_down-620b2304.mjs').then((m) => m["default"]),
          "/assets/icons/icon-triangle_up.svg": () => import('./icon-triangle_up-307905cf.mjs').then((m) => m["default"]),
          "/assets/icons/icon-triangles.svg": () => import('./icon-triangles-1ec0048c.mjs').then((m) => m["default"]),
          "/assets/icons/icon-upload.svg": () => import('./icon-upload-1f0db0c4.mjs').then((m) => m["default"]),
          "/assets/icons/icon-user.svg": () => import('./icon-user-af805b6e.mjs').then((m) => m["default"]),
          "/assets/icons/icon-years.svg": () => import('./icon-years-d767bd1a.mjs').then((m) => m["default"])
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
//# sourceMappingURL=nuxt-icon-14b11dc2.mjs.map
