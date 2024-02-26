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
          "/assets/icons/icon-Offer.svg": () => import('./icon-Offer-f72c3541.mjs').then((m) => m["default"]),
          "/assets/icons/icon-PortraitText.svg": () => import('./icon-PortraitText-43abf39c.mjs').then((m) => m["default"]),
          "/assets/icons/icon-Prices.svg": () => import('./icon-Prices-973d4b8b.mjs').then((m) => m["default"]),
          "/assets/icons/icon-archive.svg": () => import('./icon-archive-b6417352.mjs').then((m) => m["default"]),
          "/assets/icons/icon-area.svg": () => import('./icon-area-9aefdeba.mjs').then((m) => m["default"]),
          "/assets/icons/icon-arrow_down.svg": () => import('./icon-arrow_down-7d82f777.mjs').then((m) => m["default"]),
          "/assets/icons/icon-arrow_left.svg": () => import('./icon-arrow_left-6d8955a1.mjs').then((m) => m["default"]),
          "/assets/icons/icon-arrow_right.svg": () => import('./icon-arrow_right-dafe2060.mjs').then((m) => m["default"]),
          "/assets/icons/icon-arrow_up.svg": () => import('./icon-arrow_up-393faf41.mjs').then((m) => m["default"]),
          "/assets/icons/icon-bug.svg": () => import('./icon-bug-e50c2586.mjs').then((m) => m["default"]),
          "/assets/icons/icon-camera.svg": () => import('./icon-camera-e3bc1773.mjs').then((m) => m["default"]),
          "/assets/icons/icon-car.svg": () => import('./icon-car-52f18aea.mjs').then((m) => m["default"]),
          "/assets/icons/icon-caret-left.svg": () => import('./icon-caret-left-9a2c159d.mjs').then((m) => m["default"]),
          "/assets/icons/icon-caret-right.svg": () => import('./icon-caret-right-92e84adf.mjs').then((m) => m["default"]),
          "/assets/icons/icon-center-aligned.svg": () => import('./icon-center-aligned-558ce8f0.mjs').then((m) => m["default"]),
          "/assets/icons/icon-check.svg": () => import('./icon-check-aba52989.mjs').then((m) => m["default"]),
          "/assets/icons/icon-circle.svg": () => import('./icon-circle-41c4f662.mjs').then((m) => m["default"]),
          "/assets/icons/icon-co2.svg": () => import('./icon-co2-a8c22777.mjs').then((m) => m["default"]),
          "/assets/icons/icon-consulting.svg": () => import('./icon-consulting-925e245d.mjs').then((m) => m["default"]),
          "/assets/icons/icon-copy.svg": () => import('./icon-copy-334a3c7f.mjs').then((m) => m["default"]),
          "/assets/icons/icon-cost.svg": () => import('./icon-cost-afd52a8f.mjs').then((m) => m["default"]),
          "/assets/icons/icon-cross.svg": () => import('./icon-cross-103e3df7.mjs').then((m) => m["default"]),
          "/assets/icons/icon-customer_service.svg": () => import('./icon-customer_service-4013665f.mjs').then((m) => m["default"]),
          "/assets/icons/icon-customer_support.svg": () => import('./icon-customer_support-336bda79.mjs').then((m) => m["default"]),
          "/assets/icons/icon-dashboard.svg": () => import('./icon-dashboard-232a8825.mjs').then((m) => m["default"]),
          "/assets/icons/icon-desktop.svg": () => import('./icon-desktop-c65ec7df.mjs').then((m) => m["default"]),
          "/assets/icons/icon-dials.svg": () => import('./icon-dials-ddfb748c.mjs').then((m) => m["default"]),
          "/assets/icons/icon-dot.svg": () => import('./icon-dot-16b56015.mjs').then((m) => m["default"]),
          "/assets/icons/icon-download.svg": () => import('./icon-download-ce1fecc5.mjs').then((m) => m["default"]),
          "/assets/icons/icon-dragarea.svg": () => import('./icon-dragarea-adff3deb.mjs').then((m) => m["default"]),
          "/assets/icons/icon-eco.svg": () => import('./icon-eco-8501d037.mjs').then((m) => m["default"]),
          "/assets/icons/icon-energy.svg": () => import('./icon-energy-e61ccee6.mjs').then((m) => m["default"]),
          "/assets/icons/icon-error.svg": () => import('./icon-error-2974dbcc.mjs').then((m) => m["default"]),
          "/assets/icons/icon-file-generic.svg": () => import('./icon-file-generic-684a42da.mjs').then((m) => m["default"]),
          "/assets/icons/icon-file-img.svg": () => import('./icon-file-img-907fa624.mjs').then((m) => m["default"]),
          "/assets/icons/icon-file-pdf.svg": () => import('./icon-file-pdf-15a29ab7.mjs').then((m) => m["default"]),
          "/assets/icons/icon-file-text.svg": () => import('./icon-file-text-248233d7.mjs').then((m) => m["default"]),
          "/assets/icons/icon-flip.svg": () => import('./icon-flip-351da373.mjs').then((m) => m["default"]),
          "/assets/icons/icon-help.svg": () => import('./icon-help-ed15c2a5.mjs').then((m) => m["default"]),
          "/assets/icons/icon-house.svg": () => import('./icon-house-7ede6888.mjs').then((m) => m["default"]),
          "/assets/icons/icon-info.svg": () => import('./icon-info-f4b08c01.mjs').then((m) => m["default"]),
          "/assets/icons/icon-installation.svg": () => import('./icon-installation-33f887a8.mjs').then((m) => m["default"]),
          "/assets/icons/icon-laptop.svg": () => import('./icon-laptop-8ce863f9.mjs').then((m) => m["default"]),
          "/assets/icons/icon-left-aligned.svg": () => import('./icon-left-aligned-940d7c3b.mjs').then((m) => m["default"]),
          "/assets/icons/icon-link.svg": () => import('./icon-link-42fcae5a.mjs').then((m) => m["default"]),
          "/assets/icons/icon-lower.svg": () => import('./icon-lower-23799be5.mjs').then((m) => m["default"]),
          "/assets/icons/icon-mail.svg": () => import('./icon-mail-c2371140.mjs').then((m) => m["default"]),
          "/assets/icons/icon-margin-bottom.svg": () => import('./icon-margin-bottom-dbc57739.mjs').then((m) => m["default"]),
          "/assets/icons/icon-margin-left.svg": () => import('./icon-margin-left-e08509af.mjs').then((m) => m["default"]),
          "/assets/icons/icon-margin-right.svg": () => import('./icon-margin-right-95a62607.mjs').then((m) => m["default"]),
          "/assets/icons/icon-margin-top.svg": () => import('./icon-margin-top-956720f8.mjs').then((m) => m["default"]),
          "/assets/icons/icon-marker.svg": () => import('./icon-marker-47d62bb7.mjs').then((m) => m["default"]),
          "/assets/icons/icon-menu.svg": () => import('./icon-menu-edcc7b6a.mjs').then((m) => m["default"]),
          "/assets/icons/icon-mess.svg": () => import('./icon-mess-f760b4a4.mjs').then((m) => m["default"]),
          "/assets/icons/icon-minus.svg": () => import('./icon-minus-3bd39f6c.mjs').then((m) => m["default"]),
          "/assets/icons/icon-mobile+.svg": () => import('./icon-mobile_-b91cd5da.mjs').then((m) => m["default"]),
          "/assets/icons/icon-mobile.svg": () => import('./icon-mobile-4bd5ccd4.mjs').then((m) => m["default"]),
          "/assets/icons/icon-modules.svg": () => import('./icon-modules-56cc8c23.mjs').then((m) => m["default"]),
          "/assets/icons/icon-modules_check.svg": () => import('./icon-modules_check-c9fcbc6b.mjs').then((m) => m["default"]),
          "/assets/icons/icon-modules_landscape.svg": () => import('./icon-modules_landscape-da4c4195.mjs').then((m) => m["default"]),
          "/assets/icons/icon-move.svg": () => import('./icon-move-7507b446.mjs').then((m) => m["default"]),
          "/assets/icons/icon-padding-bottom.svg": () => import('./icon-padding-bottom-9077b280.mjs').then((m) => m["default"]),
          "/assets/icons/icon-padding-left.svg": () => import('./icon-padding-left-5d95f303.mjs').then((m) => m["default"]),
          "/assets/icons/icon-padding-right.svg": () => import('./icon-padding-right-4b79cd3f.mjs').then((m) => m["default"]),
          "/assets/icons/icon-padding-top.svg": () => import('./icon-padding-top-dcbef159.mjs').then((m) => m["default"]),
          "/assets/icons/icon-pause.svg": () => import('./icon-pause-20fba507.mjs').then((m) => m["default"]),
          "/assets/icons/icon-pending.svg": () => import('./icon-pending-d7f004e2.mjs').then((m) => m["default"]),
          "/assets/icons/icon-phone.svg": () => import('./icon-phone-29bb355d.mjs').then((m) => m["default"]),
          "/assets/icons/icon-play.svg": () => import('./icon-play-e5bd1e26.mjs').then((m) => m["default"]),
          "/assets/icons/icon-plus.svg": () => import('./icon-plus-46a3b97e.mjs').then((m) => m["default"]),
          "/assets/icons/icon-polygon_add2.svg": () => import('./icon-polygon_add2-74ac10c1.mjs').then((m) => m["default"]),
          "/assets/icons/icon-polygon_subtract.svg": () => import('./icon-polygon_subtract-c99079ed.mjs').then((m) => m["default"]),
          "/assets/icons/icon-power.svg": () => import('./icon-power-74fc708c.mjs').then((m) => m["default"]),
          "/assets/icons/icon-quote.svg": () => import('./icon-quote-444a8512.mjs').then((m) => m["default"]),
          "/assets/icons/icon-rectangle.svg": () => import('./icon-rectangle-0e312088.mjs').then((m) => m["default"]),
          "/assets/icons/icon-reload.svg": () => import('./icon-reload-bf8d3ee8.mjs').then((m) => m["default"]),
          "/assets/icons/icon-repair.svg": () => import('./icon-repair-e5014f33.mjs').then((m) => m["default"]),
          "/assets/icons/icon-right-aligned.svg": () => import('./icon-right-aligned-f2a94c94.mjs').then((m) => m["default"]),
          "/assets/icons/icon-save.svg": () => import('./icon-save-1fa9f01c.mjs').then((m) => m["default"]),
          "/assets/icons/icon-search.svg": () => import('./icon-search-087410b2.mjs').then((m) => m["default"]),
          "/assets/icons/icon-sort.svg": () => import('./icon-sort-a24f9aa9.mjs').then((m) => m["default"]),
          "/assets/icons/icon-subvention.svg": () => import('./icon-subvention-b918f3d7.mjs').then((m) => m["default"]),
          "/assets/icons/icon-sun.svg": () => import('./icon-sun-c6442cf2.mjs').then((m) => m["default"]),
          "/assets/icons/icon-tablet.svg": () => import('./icon-tablet-34b55f6c.mjs').then((m) => m["default"]),
          "/assets/icons/icon-trash.svg": () => import('./icon-trash-17dfb360.mjs').then((m) => m["default"]),
          "/assets/icons/icon-tree.svg": () => import('./icon-tree-afd03568.mjs').then((m) => m["default"]),
          "/assets/icons/icon-triangle_down.svg": () => import('./icon-triangle_down-4552985e.mjs').then((m) => m["default"]),
          "/assets/icons/icon-triangle_up.svg": () => import('./icon-triangle_up-a30ab9f0.mjs').then((m) => m["default"]),
          "/assets/icons/icon-triangles.svg": () => import('./icon-triangles-a57b491e.mjs').then((m) => m["default"]),
          "/assets/icons/icon-upload.svg": () => import('./icon-upload-d4527061.mjs').then((m) => m["default"]),
          "/assets/icons/icon-user.svg": () => import('./icon-user-aae1851a.mjs').then((m) => m["default"]),
          "/assets/icons/icon-years.svg": () => import('./icon-years-b802c2b3.mjs').then((m) => m["default"])
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
//# sourceMappingURL=nuxt-icon-5eb3d977.mjs.map
