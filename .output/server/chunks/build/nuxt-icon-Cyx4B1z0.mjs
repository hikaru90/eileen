import { defineComponent, ref, watchEffect, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "nuxt-icon",
  __ssrInlineRender: true,
  props: {
    name: {},
    filled: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const icon = ref("");
    watchEffect(async () => {
      try {
        const iconsImport = /* @__PURE__ */ Object.assign({
          "/assets/icons/icon-Audio.svg": () => import('./icon-Audio-Clz2ILIm.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-BookingCalendar.svg": () => import('./icon-BookingCalendar-D8cZhttV.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-ClickableHeadings.svg": () => import('./icon-ClickableHeadings-DLU_nNSs.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-Contact.svg": () => import('./icon-Contact-Byb4u6US.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-Default.svg": () => import('./icon-Default-Cn3JqdxD.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-Downloads.svg": () => import('./icon-Downloads-ChFK8-ue.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-Faq.svg": () => import('./icon-Faq-ytrh_UdX.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-HeroBig.svg": () => import('./icon-HeroBig-D0ZXqsN4.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-HeroSmall.svg": () => import('./icon-HeroSmall-BSy2oleK.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-ImageList.svg": () => import('./icon-ImageList-B45PwgnH.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-ImageRotation.svg": () => import('./icon-ImageRotation-B6byvM6E.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-Map.svg": () => import('./icon-Map-CoxpDrzH.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-MyWork.svg": () => import('./icon-MyWork-i3f4UzkH.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-Offer.svg": () => import('./icon-Offer-Bx6HkGj9.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-PortraitText.svg": () => import('./icon-PortraitText-k7YQSMg7.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-Prices.svg": () => import('./icon-Prices-C9kRPl0_.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-Testimonials.svg": () => import('./icon-Testimonials-CcjdcCAm.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-archive.svg": () => import('./icon-archive-C2_9fv7s.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-area.svg": () => import('./icon-area-C5NxLOGa.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-arrow_down.svg": () => import('./icon-arrow_down-Ddm6fOKI.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-arrow_left.svg": () => import('./icon-arrow_left-8niShVZu.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-arrow_right.svg": () => import('./icon-arrow_right-suav2XEE.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-arrow_up.svg": () => import('./icon-arrow_up-UBuT3T7c.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-bug.svg": () => import('./icon-bug-Cvmhq7NV.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-camera.svg": () => import('./icon-camera-DrsmPF8J.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-car.svg": () => import('./icon-car-S-htv3n7.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-caret-left.svg": () => import('./icon-caret-left-BmejlBew.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-caret-right.svg": () => import('./icon-caret-right-6QOZ6hQ7.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-center-aligned.svg": () => import('./icon-center-aligned-gMkffEJx.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-check.svg": () => import('./icon-check-BHGKVX9Q.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-circle.svg": () => import('./icon-circle-C2dJBvtq.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-co2.svg": () => import('./icon-co2-BPS0Fs4O.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-consulting.svg": () => import('./icon-consulting-qmTc271H.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-copy.svg": () => import('./icon-copy-CWCABdE6.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-cost.svg": () => import('./icon-cost-CsemzgE_.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-cross.svg": () => import('./icon-cross-D_I2Ol8K.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-customer_service.svg": () => import('./icon-customer_service-C27-L6r8.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-customer_support.svg": () => import('./icon-customer_support-e4MpjFpx.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-dashboard.svg": () => import('./icon-dashboard-lGe9Hnum.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-desktop.svg": () => import('./icon-desktop-K0c_sfyR.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-dials.svg": () => import('./icon-dials-BcIPdYnA.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-dot.svg": () => import('./icon-dot-ClMK27iw.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-download.svg": () => import('./icon-download-eyd1f1d4.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-dragarea.svg": () => import('./icon-dragarea-CAm_fcfw.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-eco.svg": () => import('./icon-eco-D1LjpVNy.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-energy.svg": () => import('./icon-energy-GkHd0N7z.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-error.svg": () => import('./icon-error-CRlsgnlH.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-file-generic.svg": () => import('./icon-file-generic-BJbmdzUL.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-file-img.svg": () => import('./icon-file-img-BEq44Qq4.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-file-pdf.svg": () => import('./icon-file-pdf-C7b5hix6.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-file-text.svg": () => import('./icon-file-text-D-t_4E9F.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-flip.svg": () => import('./icon-flip-CHsbh2UR.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-help.svg": () => import('./icon-help-5D-dNf45.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-house.svg": () => import('./icon-house-DgfVXyCc.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-info.svg": () => import('./icon-info-CvHs7EyO.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-insta.svg": () => import('./icon-insta-ZBDvFiZH.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-installation.svg": () => import('./icon-installation-CgMbBTdT.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-laptop.svg": () => import('./icon-laptop-Cci_Ora-.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-left-aligned.svg": () => import('./icon-left-aligned-CAmffbzw.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-link.svg": () => import('./icon-link-CMpqIRj-.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-lower.svg": () => import('./icon-lower-BFFrN6o1.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-mail-line.svg": () => import('./icon-mail-line-BAo_0x_R.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-mail.svg": () => import('./icon-mail-BwdOYU0R.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-margin-bottom.svg": () => import('./icon-margin-bottom-QVoi_epr.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-margin-left.svg": () => import('./icon-margin-left-D10t-0lD.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-margin-right.svg": () => import('./icon-margin-right-CwunkkSV.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-margin-top.svg": () => import('./icon-margin-top-UqiJR3mO.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-marker.svg": () => import('./icon-marker-B1JWZOW2.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-menu.svg": () => import('./icon-menu-FgJG5Uov.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-mess.svg": () => import('./icon-mess-CEBZ4ek_.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-minus.svg": () => import('./icon-minus-D6fEuRcb.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-mobile+.svg": () => import('./icon-mobile_-v7I84D-C.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-mobile.svg": () => import('./icon-mobile-BU9CBr2M.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-modules.svg": () => import('./icon-modules-BrfaQYfx.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-modules_check.svg": () => import('./icon-modules_check-C1l1aSCL.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-modules_landscape.svg": () => import('./icon-modules_landscape-DMHsa1cz.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-move.svg": () => import('./icon-move-DI8KLRIK.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-padding-bottom.svg": () => import('./icon-padding-bottom-KTqdIgMt.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-padding-left.svg": () => import('./icon-padding-left-DWDXJOLC.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-padding-right.svg": () => import('./icon-padding-right-BaATBpjE.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-padding-top.svg": () => import('./icon-padding-top-Bj2qZm7f.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-pause.svg": () => import('./icon-pause-Da1NLaR1.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-pdf.svg": () => import('./icon-pdf-Bah1O9T8.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-pending.svg": () => import('./icon-pending-DZ1DairS.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-phone-line.svg": () => import('./icon-phone-line-DPCy2Qv_.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-phone.svg": () => import('./icon-phone-CTu6UrR5.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-play.svg": () => import('./icon-play-CisByabI.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-plus.svg": () => import('./icon-plus-BXzy1XJ-.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-polygon_add2.svg": () => import('./icon-polygon_add2-CVerGsLL.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-polygon_subtract.svg": () => import('./icon-polygon_subtract-bfHJteNK.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-power.svg": () => import('./icon-power-BfzUaMGH.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-quote.svg": () => import('./icon-quote-D9t0_RtH.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-rectangle.svg": () => import('./icon-rectangle-CeZJpb8-.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-reload.svg": () => import('./icon-reload-BJgsPNGI.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-repair.svg": () => import('./icon-repair-CmiMqZLS.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-right-aligned.svg": () => import('./icon-right-aligned-Br5WcdNA.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-save.svg": () => import('./icon-save-SSnHH_R2.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-search.svg": () => import('./icon-search-D-ueYEQy.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-sort.svg": () => import('./icon-sort-BsqIDZ_U.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-subvention.svg": () => import('./icon-subvention-ei8bL80K.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-sun.svg": () => import('./icon-sun-x8sZTnnk.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-tablet.svg": () => import('./icon-tablet-C4nq4XBb.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-trash.svg": () => import('./icon-trash-BprwGnui.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-tree.svg": () => import('./icon-tree-kReavBPl.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-triangle_down.svg": () => import('./icon-triangle_down-Dkd5NUcw.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-triangle_up.svg": () => import('./icon-triangle_up-CAXnAmI1.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-triangles.svg": () => import('./icon-triangles-DZjrfu4G.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-upload.svg": () => import('./icon-upload-BRt7Toe0.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-user.svg": () => import('./icon-user-DY_f8yJi.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-whatsapp.svg": () => import('./icon-whatsapp-Ci-Wz6x-.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"]),
          "/assets/icons/icon-years.svg": () => import('./icon-years-BuS6xrDW.mjs').then(function(n) {
            return n._;
          }).then((m) => m["default"])
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
        class: ["nuxt-icon", { "nuxt-icon--fill": !_ctx.filled }]
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
//# sourceMappingURL=nuxt-icon-Cyx4B1z0.mjs.map
