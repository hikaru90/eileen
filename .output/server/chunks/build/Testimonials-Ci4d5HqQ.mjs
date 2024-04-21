import { _ as _sfc_main$1 } from './IntersectonPop-BCl9OGRc.mjs';
import _sfc_main$2 from './nuxt-icon-Cyx4B1z0.mjs';
import { defineComponent, reactive, computed, mergeProps, withCtx, createVNode, toDisplayString, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { d as defaults$1 } from './defaults-CgFcJQec.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Testimonials",
  __ssrInlineRender: true,
  props: {
    component: { default: {
      content: defaults$1.find((el) => el.type === "offer").content
    } }
  },
  setup(__props) {
    const props = __props;
    const state = reactive({
      vw: 0,
      sizes: [
        { width: 1024, count: 3 },
        { width: 768, count: 2 },
        { width: 0, count: 1 }
      ],
      currentSlide: 0,
      startX: 0,
      isTracking: false,
      flickedLeft: false,
      flickedRight: false
    });
    const visibleSlideCount = computed(() => {
      var _a;
      return (_a = state.sizes.find((size) => state.vw > size.width)) == null ? void 0 : _a.count;
    });
    const visibleSlides = computed(() => {
      let res = [];
      for (let i = 0; i < visibleSlideCount.value; i++) {
        res.push(state.currentSlide + i);
      }
      return res;
    });
    const slideTranslation = computed(() => {
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_IntersectonPop = _sfc_main$1;
      const _component_nuxt_icon = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "py-16 md:py-24 relative" }, _attrs))} data-v-585cba48><div class="max-container !px-0 !md:px-3" data-v-585cba48><div class="flex items-center justify-center" data-v-585cba48>`);
      _push(ssrRenderComponent(_component_IntersectonPop, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="shiny-pop font-heading text-lg sm:text-xl md:text-3xl lg:text-4xl mb-16 text-center text-salmon" data-v-585cba48${_scopeId}>${ssrInterpolate(props.component.content.heading)}</h2>`);
          } else {
            return [
              createVNode("h2", { class: "shiny-pop font-heading text-lg sm:text-xl md:text-3xl lg:text-4xl mb-16 text-center text-salmon" }, toDisplayString(props.component.content.heading), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div id="carousel" style="${ssrRenderStyle([{ transform: `translate(${unref(slideTranslation)}px,0)` }])}" class="flex flex-row itmes-stretch justify-start relative w-full transition duration-300 select-none cursor-grab" data-v-585cba48><!--[-->`);
      ssrRenderList(props.component.content.testimonials, (offer, index) => {
        _push(`<div class="${ssrRenderClass([[
          `slide${index}`,
          unref(visibleSlideCount) > 1 ? `w-1/${unref(visibleSlideCount)}` : "w-full",
          unref(slideTranslation),
          unref(visibleSlides).includes(index) ? "opacity-100" : "opacity-0"
        ], "w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-6 transition"])}" data-v-585cba48><div class="${ssrRenderClass([[
          unref(visibleSlides).includes(index) ? "shadow-2xl shadow-coffee/10 scale-100" : "shadow-sm shadow-coffee/10 scale-80"
        ], "bg-white px-8 pt-8 pb-12 h-full border border-coffee border-opacity-10 rounded-lg overflow-hidden transition-all duration-300 delay-100 transform"])}" data-v-585cba48><div class="flex items-center gap-1 justify-between mb-8" data-v-585cba48><h3 class="font-heading text-xl mb-1.5" data-v-585cba48>${ssrInterpolate(offer.name)}</h3><div class="border-b border-coffee border-opacity-30 flex-grow" data-v-585cba48></div><div class="" data-v-585cba48>${ssrInterpolate(new Date(offer.date).getFullYear())}</div></div><div class="" data-v-585cba48>${ssrInterpolate(offer.text)}</div></div></div>`);
      });
      _push(`<!--]--></div><div class="flex items-center justify-end gap-1px mr-6 mt-10 rounded-full" data-v-585cba48><button class="py-1 pl-1.5 pr-2.5 bg-salmon border-r border-orange border-opacity-30 text-white rounded-l-full hover:bg-opacity-90 transition shadow-md shadow-coffee/10" data-v-585cba48>`);
      _push(ssrRenderComponent(_component_nuxt_icon, {
        name: "icon-caret-left",
        class: "text-2xl"
      }, null, _parent));
      _push(`</button><button class="py-1 pr-1.5 pl-2.5 bg-salmon border-r border-orange border-opacity-30 text-white rounded-r-full hover:bg-opacity-90 transition shadow-md shadow-coffee/10" data-v-585cba48>`);
      _push(ssrRenderComponent(_component_nuxt_icon, {
        name: "icon-caret-right",
        class: "text-2xl"
      }, null, _parent));
      _push(`</button></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/Component/Testimonials.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Testimonials = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-585cba48"]]);

export { Testimonials as default };
//# sourceMappingURL=Testimonials-Ci4d5HqQ.mjs.map
