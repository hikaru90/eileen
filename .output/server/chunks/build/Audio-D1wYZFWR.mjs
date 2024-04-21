import { _ as _sfc_main$1 } from './ArrayPane--5deJtAy.mjs';
import _sfc_main$2 from './nuxt-icon-Cyx4B1z0.mjs';
import { defineComponent, reactive, mergeProps, unref, withCtx, createVNode, withDirectives, vModelText, useSSRContext } from 'vue';
import { b as useSidebarStore, s as storeToRefs, u as usePocketBase } from './server.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderComponent, ssrRenderStyle, ssrInterpolate } from 'vue/server-renderer';
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
  __name: "Audio",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarStore = useSidebarStore();
    const { setComponentContent, saveContent, deleteFile } = sidebarStore;
    const { componentContent, componentId, componentType, componentFiles } = storeToRefs(sidebarStore);
    usePocketBase();
    reactive({
      heading: "",
      offers: []
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ArrayPane = _sfc_main$1;
      const _component_nuxt_icon = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-4 relative" }, _attrs))}><div class="mb-4"><h2 class="text-xs mb-2 opacity-40">Heading</h2><input${ssrRenderAttr("value", unref(componentContent).heading)} type="text" class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20"></div><div class="mb-4"><h2 class="text-xs mb-2 opacity-40">Testimonials</h2><div class="flex flex-col gap-2"><!--[-->`);
      ssrRenderList(unref(componentContent).audios, (audio, index) => {
        _push(ssrRenderComponent(_component_ArrayPane, {
          onArrayChanged: unref(saveContent),
          key: "child" + index,
          array: unref(componentContent).audios,
          entry: audio,
          index,
          label: audio.name
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="px-2"${_scopeId}><input${ssrRenderAttr("value", audio.name)} type="text" class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 mb-2"${_scopeId}><input${ssrRenderAttr("value", audio.file)} type="text" placeholder="filename" class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 mb-2"${_scopeId}></div>`);
            } else {
              return [
                createVNode("div", { class: "px-2" }, [
                  withDirectives(createVNode("input", {
                    onChange: unref(saveContent),
                    "onUpdate:modelValue": ($event2) => audio.name = $event2,
                    type: "text",
                    class: "w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 mb-2"
                  }, null, 40, ["onChange", "onUpdate:modelValue"]), [
                    [vModelText, audio.name]
                  ]),
                  withDirectives(createVNode("input", {
                    onChange: unref(saveContent),
                    "onUpdate:modelValue": ($event2) => audio.file = $event2,
                    type: "text",
                    placeholder: "filename",
                    class: "w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 mb-2"
                  }, null, 40, ["onChange", "onUpdate:modelValue"]), [
                    [vModelText, audio.file]
                  ])
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div><button class="rounded-sm hover:bg-white hover:bg-opacity-20 px-2 border border-darkOffwhite border-opacity-20"> Hinzuf\xFCgen </button></div><div class="mb-4"><h2 class="text-xs opacity-40">Dateien</h2><!--[-->`);
      ssrRenderList(unref(componentFiles), (filename, index) => {
        _push(`<div class="flex items-center gap-2"><div style="${ssrRenderStyle([{ backgroundImage: `url(/audio.jpg)` }])}" class="w-10 h-10 bg-contain bg-no-repeat bg-center"></div><span>${ssrInterpolate(filename)}</span><button class="border border-red rounded-sm">`);
        _push(ssrRenderComponent(_component_nuxt_icon, {
          name: "icon-cross",
          class: "text-red text-xl"
        }, null, _parent));
        _push(`</button></div>`);
      });
      _push(`<!--]--><input type="file" class="mt-2 mb-4"></div><div class="mb-4"><h2 class="text-xs mb-2 opacity-40">Description</h2><textarea type="text" class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20">${ssrInterpolate(unref(componentContent).description)}</textarea><h2 class="text-xs my-2 opacity-40">Placeholder</h2><input${ssrRenderAttr("value", unref(componentContent).placeholder)} type="text" class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20"><h2 class="text-xs my-2 opacity-40">Button Text</h2><input${ssrRenderAttr("value", unref(componentContent).cta)} type="text" class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20"></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/Sidebar/Audio.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=Audio-D1wYZFWR.mjs.map
