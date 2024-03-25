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
          "/assets/icons/icon-Faq.svg": () => import('./icon-Faq-92ed4d2b.mjs').then((m) => m["default"]),
          "/assets/icons/icon-HeroBig.svg": () => import('./icon-HeroBig-11a20b14.mjs').then((m) => m["default"]),
          "/assets/icons/icon-HeroSmall.svg": () => import('./icon-HeroSmall-14747bbc.mjs').then((m) => m["default"]),
          "/assets/icons/icon-ImageList.svg": () => import('./icon-ImageList-3504ff33.mjs').then((m) => m["default"]),
          "/assets/icons/icon-ImageRotation.svg": () => import('./icon-ImageRotation-d6d12b48.mjs').then((m) => m["default"]),
          "/assets/icons/icon-Map.svg": () => import('./icon-Map-15b177b7.mjs').then((m) => m["default"]),
          "/assets/icons/icon-MyWork.svg": () => import('./icon-MyWork-c102bc7b.mjs').then((m) => m["default"]),
          "/assets/icons/icon-Offer.svg": () => import('./icon-Offer-7026acd3.mjs').then((m) => m["default"]),
          "/assets/icons/icon-PortraitText.svg": () => import('./icon-PortraitText-68bc692f.mjs').then((m) => m["default"]),
          "/assets/icons/icon-Prices.svg": () => import('./icon-Prices-0a901b64.mjs').then((m) => m["default"]),
          "/assets/icons/icon-Testimonials.svg": () => import('./icon-Testimonials-02a24236.mjs').then((m) => m["default"]),
          "/assets/icons/icon-archive.svg": () => import('./icon-archive-e21bc356.mjs').then((m) => m["default"]),
          "/assets/icons/icon-area.svg": () => import('./icon-area-bf8ad37a.mjs').then((m) => m["default"]),
          "/assets/icons/icon-arrow_down.svg": () => import('./icon-arrow_down-665192b2.mjs').then((m) => m["default"]),
          "/assets/icons/icon-arrow_left.svg": () => import('./icon-arrow_left-9504e609.mjs').then((m) => m["default"]),
          "/assets/icons/icon-arrow_right.svg": () => import('./icon-arrow_right-246c5b6c.mjs').then((m) => m["default"]),
          "/assets/icons/icon-arrow_up.svg": () => import('./icon-arrow_up-50c11a57.mjs').then((m) => m["default"]),
          "/assets/icons/icon-bug.svg": () => import('./icon-bug-dd2466b0.mjs').then((m) => m["default"]),
          "/assets/icons/icon-camera.svg": () => import('./icon-camera-12fe6f43.mjs').then((m) => m["default"]),
          "/assets/icons/icon-car.svg": () => import('./icon-car-9a6cdada.mjs').then((m) => m["default"]),
          "/assets/icons/icon-caret-left.svg": () => import('./icon-caret-left-552d0fe6.mjs').then((m) => m["default"]),
          "/assets/icons/icon-caret-right.svg": () => import('./icon-caret-right-5c4e38a3.mjs').then((m) => m["default"]),
          "/assets/icons/icon-center-aligned.svg": () => import('./icon-center-aligned-1180c92c.mjs').then((m) => m["default"]),
          "/assets/icons/icon-check.svg": () => import('./icon-check-b2e310fd.mjs').then((m) => m["default"]),
          "/assets/icons/icon-circle.svg": () => import('./icon-circle-76f7d41f.mjs').then((m) => m["default"]),
          "/assets/icons/icon-co2.svg": () => import('./icon-co2-175c2c3f.mjs').then((m) => m["default"]),
          "/assets/icons/icon-consulting.svg": () => import('./icon-consulting-2083186c.mjs').then((m) => m["default"]),
          "/assets/icons/icon-copy.svg": () => import('./icon-copy-980d9d57.mjs').then((m) => m["default"]),
          "/assets/icons/icon-cost.svg": () => import('./icon-cost-bd7a43d6.mjs').then((m) => m["default"]),
          "/assets/icons/icon-cross.svg": () => import('./icon-cross-216d0ca6.mjs').then((m) => m["default"]),
          "/assets/icons/icon-customer_service.svg": () => import('./icon-customer_service-af9387ca.mjs').then((m) => m["default"]),
          "/assets/icons/icon-customer_support.svg": () => import('./icon-customer_support-957211ce.mjs').then((m) => m["default"]),
          "/assets/icons/icon-dashboard.svg": () => import('./icon-dashboard-bc7b27da.mjs').then((m) => m["default"]),
          "/assets/icons/icon-desktop.svg": () => import('./icon-desktop-b427311f.mjs').then((m) => m["default"]),
          "/assets/icons/icon-dials.svg": () => import('./icon-dials-d066cfae.mjs').then((m) => m["default"]),
          "/assets/icons/icon-dot.svg": () => import('./icon-dot-2f4ab321.mjs').then((m) => m["default"]),
          "/assets/icons/icon-download.svg": () => import('./icon-download-cfbcb1bc.mjs').then((m) => m["default"]),
          "/assets/icons/icon-dragarea.svg": () => import('./icon-dragarea-4c807227.mjs').then((m) => m["default"]),
          "/assets/icons/icon-eco.svg": () => import('./icon-eco-3e62b9bd.mjs').then((m) => m["default"]),
          "/assets/icons/icon-energy.svg": () => import('./icon-energy-c3758f86.mjs').then((m) => m["default"]),
          "/assets/icons/icon-error.svg": () => import('./icon-error-9a0aafa8.mjs').then((m) => m["default"]),
          "/assets/icons/icon-file-generic.svg": () => import('./icon-file-generic-88630b52.mjs').then((m) => m["default"]),
          "/assets/icons/icon-file-img.svg": () => import('./icon-file-img-105782de.mjs').then((m) => m["default"]),
          "/assets/icons/icon-file-pdf.svg": () => import('./icon-file-pdf-640fd6de.mjs').then((m) => m["default"]),
          "/assets/icons/icon-file-text.svg": () => import('./icon-file-text-66672127.mjs').then((m) => m["default"]),
          "/assets/icons/icon-flip.svg": () => import('./icon-flip-29e86e69.mjs').then((m) => m["default"]),
          "/assets/icons/icon-help.svg": () => import('./icon-help-408e79c4.mjs').then((m) => m["default"]),
          "/assets/icons/icon-house.svg": () => import('./icon-house-b6cd19fd.mjs').then((m) => m["default"]),
          "/assets/icons/icon-info.svg": () => import('./icon-info-6491ce12.mjs').then((m) => m["default"]),
          "/assets/icons/icon-installation.svg": () => import('./icon-installation-620d59ff.mjs').then((m) => m["default"]),
          "/assets/icons/icon-laptop.svg": () => import('./icon-laptop-cccb6610.mjs').then((m) => m["default"]),
          "/assets/icons/icon-left-aligned.svg": () => import('./icon-left-aligned-85eb6675.mjs').then((m) => m["default"]),
          "/assets/icons/icon-link.svg": () => import('./icon-link-6b075c77.mjs').then((m) => m["default"]),
          "/assets/icons/icon-lower.svg": () => import('./icon-lower-7d291797.mjs').then((m) => m["default"]),
          "/assets/icons/icon-mail.svg": () => import('./icon-mail-454d4f6c.mjs').then((m) => m["default"]),
          "/assets/icons/icon-margin-bottom.svg": () => import('./icon-margin-bottom-844d9ce0.mjs').then((m) => m["default"]),
          "/assets/icons/icon-margin-left.svg": () => import('./icon-margin-left-4940f72d.mjs').then((m) => m["default"]),
          "/assets/icons/icon-margin-right.svg": () => import('./icon-margin-right-bcfc6d71.mjs').then((m) => m["default"]),
          "/assets/icons/icon-margin-top.svg": () => import('./icon-margin-top-cc231b23.mjs').then((m) => m["default"]),
          "/assets/icons/icon-marker.svg": () => import('./icon-marker-ecabd69f.mjs').then((m) => m["default"]),
          "/assets/icons/icon-menu.svg": () => import('./icon-menu-9147eed5.mjs').then((m) => m["default"]),
          "/assets/icons/icon-mess.svg": () => import('./icon-mess-537108c6.mjs').then((m) => m["default"]),
          "/assets/icons/icon-minus.svg": () => import('./icon-minus-7f6278a5.mjs').then((m) => m["default"]),
          "/assets/icons/icon-mobile+.svg": () => import('./icon-mobile_-471b6e7f.mjs').then((m) => m["default"]),
          "/assets/icons/icon-mobile.svg": () => import('./icon-mobile-93de207e.mjs').then((m) => m["default"]),
          "/assets/icons/icon-modules.svg": () => import('./icon-modules-89cd78c7.mjs').then((m) => m["default"]),
          "/assets/icons/icon-modules_check.svg": () => import('./icon-modules_check-885c93c1.mjs').then((m) => m["default"]),
          "/assets/icons/icon-modules_landscape.svg": () => import('./icon-modules_landscape-d251d4f8.mjs').then((m) => m["default"]),
          "/assets/icons/icon-move.svg": () => import('./icon-move-536b779a.mjs').then((m) => m["default"]),
          "/assets/icons/icon-padding-bottom.svg": () => import('./icon-padding-bottom-3bfe4e8d.mjs').then((m) => m["default"]),
          "/assets/icons/icon-padding-left.svg": () => import('./icon-padding-left-15b9cd16.mjs').then((m) => m["default"]),
          "/assets/icons/icon-padding-right.svg": () => import('./icon-padding-right-04aa8909.mjs').then((m) => m["default"]),
          "/assets/icons/icon-padding-top.svg": () => import('./icon-padding-top-366bace0.mjs').then((m) => m["default"]),
          "/assets/icons/icon-pause.svg": () => import('./icon-pause-fe2ce65f.mjs').then((m) => m["default"]),
          "/assets/icons/icon-pending.svg": () => import('./icon-pending-dde928cd.mjs').then((m) => m["default"]),
          "/assets/icons/icon-phone.svg": () => import('./icon-phone-21d073b8.mjs').then((m) => m["default"]),
          "/assets/icons/icon-play.svg": () => import('./icon-play-b82ccbaf.mjs').then((m) => m["default"]),
          "/assets/icons/icon-plus.svg": () => import('./icon-plus-98928936.mjs').then((m) => m["default"]),
          "/assets/icons/icon-polygon_add2.svg": () => import('./icon-polygon_add2-a1804a0f.mjs').then((m) => m["default"]),
          "/assets/icons/icon-polygon_subtract.svg": () => import('./icon-polygon_subtract-ddbd3365.mjs').then((m) => m["default"]),
          "/assets/icons/icon-power.svg": () => import('./icon-power-79cdfe98.mjs').then((m) => m["default"]),
          "/assets/icons/icon-quote.svg": () => import('./icon-quote-4a578f34.mjs').then((m) => m["default"]),
          "/assets/icons/icon-rectangle.svg": () => import('./icon-rectangle-ce9aced3.mjs').then((m) => m["default"]),
          "/assets/icons/icon-reload.svg": () => import('./icon-reload-a1004d53.mjs').then((m) => m["default"]),
          "/assets/icons/icon-repair.svg": () => import('./icon-repair-6999a4c3.mjs').then((m) => m["default"]),
          "/assets/icons/icon-right-aligned.svg": () => import('./icon-right-aligned-96573707.mjs').then((m) => m["default"]),
          "/assets/icons/icon-save.svg": () => import('./icon-save-47a1fef6.mjs').then((m) => m["default"]),
          "/assets/icons/icon-search.svg": () => import('./icon-search-27abf690.mjs').then((m) => m["default"]),
          "/assets/icons/icon-sort.svg": () => import('./icon-sort-9a804290.mjs').then((m) => m["default"]),
          "/assets/icons/icon-subvention.svg": () => import('./icon-subvention-5b6dfc3b.mjs').then((m) => m["default"]),
          "/assets/icons/icon-sun.svg": () => import('./icon-sun-7f92d887.mjs').then((m) => m["default"]),
          "/assets/icons/icon-tablet.svg": () => import('./icon-tablet-f57c7aef.mjs').then((m) => m["default"]),
          "/assets/icons/icon-trash.svg": () => import('./icon-trash-f1cea093.mjs').then((m) => m["default"]),
          "/assets/icons/icon-tree.svg": () => import('./icon-tree-b6a2035c.mjs').then((m) => m["default"]),
          "/assets/icons/icon-triangle_down.svg": () => import('./icon-triangle_down-5f72d40f.mjs').then((m) => m["default"]),
          "/assets/icons/icon-triangle_up.svg": () => import('./icon-triangle_up-b2585524.mjs').then((m) => m["default"]),
          "/assets/icons/icon-triangles.svg": () => import('./icon-triangles-06c1392f.mjs').then((m) => m["default"]),
          "/assets/icons/icon-upload.svg": () => import('./icon-upload-e60f11ab.mjs').then((m) => m["default"]),
          "/assets/icons/icon-user.svg": () => import('./icon-user-e56ca5a9.mjs').then((m) => m["default"]),
          "/assets/icons/icon-years.svg": () => import('./icon-years-c94201b2.mjs').then((m) => m["default"])
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
//# sourceMappingURL=nuxt-icon-8914e1be.mjs.map
