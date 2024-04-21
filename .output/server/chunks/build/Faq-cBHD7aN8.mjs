import { _ as _sfc_main$2 } from './IntersectonPop-BCl9OGRc.mjs';
import _sfc_main$3 from './nuxt-icon-Cyx4B1z0.mjs';
import { useSSRContext, defineComponent, mergeProps, withCtx, createVNode, toDisplayString, reactive, unref } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderStyle } from 'vue/server-renderer';
import { d as defaults$1 } from './defaults-CgFcJQec.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "FaqEntry",
  __ssrInlineRender: true,
  props: {
    faq: {}
  },
  setup(__props) {
    const state = reactive({
      isOpen: false
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_icon = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white shadow-2xl shadow-coffee/10 rounded border border-grey border-opacity-10" }, _attrs))}><button aria-label="FAQ Frage \xF6ffnen" class="w-full flex items-center justify-between p-4 md:p-6 lg:px-8 lg:py-6"><div class="text-left mr-5 overflow-hidden" style="${ssrRenderStyle({ "max-width": "calc(100% - 40px)" })}">${_ctx.$mdRenderer.set({ html: true }).render(_ctx.faq.question)}</div><div class="flex-shrink-0 w-5 h-5 rounded-full text-darkCoffee">`);
      if (unref(state).isOpen) {
        _push(ssrRenderComponent(_component_nuxt_icon, {
          name: "icon-minus",
          class: "text-xl"
        }, null, _parent));
      } else {
        _push(ssrRenderComponent(_component_nuxt_icon, {
          name: "icon-plus",
          class: "text-xl"
        }, null, _parent));
      }
      _push(`</div></button><div style="${ssrRenderStyle([{ "maxHeight": unref(state).isOpen ? "1500px" : "0px" }])}" class="overflow-hidden transition-all"><div class="p-4 md:px-6 md:pt-4 md:pb-8 lg:px-8 lg:pt-6 lg:pb-10 border-t border-grey border-opacity-10 leading-relaxed">${_ctx.$mdRenderer.render(_ctx.faq.answer)}</div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/FaqEntry.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Faq",
  __ssrInlineRender: true,
  props: {
    component: { default: {
      content: defaults$1.find((el) => el.type === "faq").content
    } }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_IntersectonPop = _sfc_main$2;
      const _component_FaqEntry = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "my-28" }, _attrs))}><div class="max-container"><div class="flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_IntersectonPop, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="shiny-pop font-heading text-lg sm:text-xl md:text-3xl lg:text-4xl mb-16 text-center text-salmon"${_scopeId}>${ssrInterpolate(props.component.content.heading)}</h2>`);
          } else {
            return [
              createVNode("h2", { class: "shiny-pop font-heading text-lg sm:text-xl md:text-3xl lg:text-4xl mb-16 text-center text-salmon" }, toDisplayString(props.component.content.heading), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex flex-col gap-6"><!--[-->`);
      ssrRenderList((_a = props.component.content) == null ? void 0 : _a.faqs, (faq, index) => {
        _push(ssrRenderComponent(_component_FaqEntry, { faq }, null, _parent));
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/Component/Faq.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=Faq-cBHD7aN8.mjs.map
