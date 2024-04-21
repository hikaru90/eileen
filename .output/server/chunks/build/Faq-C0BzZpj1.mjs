import { _ as _sfc_main$1 } from './ArrayPane--5deJtAy.mjs';
import { b as useSidebarStore, s as storeToRefs, u as usePocketBase } from './server.mjs';
import { defineComponent, reactive, mergeProps, unref, withCtx, createVNode, withDirectives, vModelText, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import './nuxt-icon-Cyx4B1z0.mjs';
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
  __name: "Faq",
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-4" }, _attrs))}><div class="mb-4"><h2 class="text-xs mb-2 opacity-40">Heading</h2><input${ssrRenderAttr("value", unref(componentContent).heading)} type="text" class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20"></div><div class="flex flex-col gap-2"><!--[-->`);
      ssrRenderList(unref(componentContent).faqs, (faq, index) => {
        _push(ssrRenderComponent(_component_ArrayPane, {
          onArrayChanged: unref(saveContent),
          key: "child" + index,
          array: unref(componentContent).faqs,
          entry: faq,
          index,
          label: faq.question
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="px-2"${_scopeId}><input${ssrRenderAttr("value", faq.question)} type="text" class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 mb-2"${_scopeId}><textarea type="text" class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20"${_scopeId}>${ssrInterpolate(faq.answer)}</textarea></div>`);
            } else {
              return [
                createVNode("div", { class: "px-2" }, [
                  withDirectives(createVNode("input", {
                    onChange: unref(saveContent),
                    "onUpdate:modelValue": ($event) => faq.question = $event,
                    type: "text",
                    class: "w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 mb-2"
                  }, null, 40, ["onChange", "onUpdate:modelValue"]), [
                    [vModelText, faq.question]
                  ]),
                  withDirectives(createVNode("textarea", {
                    onChange: unref(saveContent),
                    "onUpdate:modelValue": ($event) => faq.answer = $event,
                    type: "text",
                    class: "w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20"
                  }, null, 40, ["onChange", "onUpdate:modelValue"]), [
                    [vModelText, faq.answer]
                  ])
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div><button aria-label="FAQ Frage hinzuf\xFCgen" class="rounded-sm hover:bg-white hover:bg-opacity-20 px-2 border border-darkOffwhite border-opacity-20"> FAQ hinzuf\xFCgen </button></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/Sidebar/Faq.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=Faq-C0BzZpj1.mjs.map
