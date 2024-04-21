import { _ as _sfc_main$1 } from './ArrayPane--5deJtAy.mjs';
import _sfc_main$2 from './nuxt-icon-Cyx4B1z0.mjs';
import { b as useSidebarStore, s as storeToRefs, u as usePocketBase, i as useRuntimeConfig } from './server.mjs';
import { defineComponent, reactive, mergeProps, unref, withCtx, createVNode, withDirectives, vModelText, useSSRContext } from 'vue';
import { u as useImage } from './composables-Q-rs6X_2.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
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
  __name: "ImageList",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarStore = useSidebarStore();
    const { setComponentContent, saveContent, deleteFile } = sidebarStore;
    const { componentContent, componentId, componentType, componentFiles } = storeToRefs(sidebarStore);
    usePocketBase();
    const config = useRuntimeConfig();
    reactive({
      heading: ""
    });
    const getCurrentImageUrl = (filename) => {
      const img = useImage();
      const imgUrl = img(
        `${config.public.SERVER_URL}/api/files/${componentType.value + "s"}/${componentId.value}/${filename}?thumb=160x90f`,
        {
          format: "webp"
        }
      );
      return imgUrl;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ArrayPane = _sfc_main$1;
      const _component_nuxt_icon = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-4" }, _attrs))}><div class="mb-4"><h2 class="text-xs mb-2 opacity-40">Heading</h2><input${ssrRenderAttr("value", unref(componentContent).heading)} type="text" class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20"></div><div class="mb-4"><h2 class="text-xs mb-2 opacity-40">Image</h2><input${ssrRenderAttr("value", unref(componentContent).image)} type="text" class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20"></div><div class="mb-2 flex items-center justify-between"><h2 class="text-xs opacity-40">Slides</h2><div class="py-1px px-2 rounded-full bg-offwhite text-xs text-coffee font-bold flex items-center justify-center">${ssrInterpolate(unref(componentContent).list.length)}</div></div><div class="mb-4"><!--[-->`);
      ssrRenderList(unref(componentContent).list, (item, index) => {
        _push(ssrRenderComponent(_component_ArrayPane, {
          onArrayChanged: unref(saveContent),
          key: "item" + index,
          array: unref(componentContent).slides,
          entry: item,
          index
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="px-2"${_scopeId}><h2 class="text-xs mb-2 opacity-40"${_scopeId}>Typ</h2><input${ssrRenderAttr("value", item.type)} type="text" class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 mb-4"${_scopeId}><h2 class="text-xs mb-2 opacity-40"${_scopeId}>Ort</h2><input${ssrRenderAttr("value", item.place)} type="text" class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 mb-4"${_scopeId}><h2 class="text-xs mb-2 opacity-40"${_scopeId}>Name</h2><input${ssrRenderAttr("value", item.name)} type="text" class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 mb-4"${_scopeId}></div>`);
            } else {
              return [
                createVNode("div", { class: "px-2" }, [
                  createVNode("h2", { class: "text-xs mb-2 opacity-40" }, "Typ"),
                  withDirectives(createVNode("input", {
                    onChange: unref(saveContent),
                    "onUpdate:modelValue": ($event2) => item.type = $event2,
                    type: "text",
                    class: "w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 mb-4"
                  }, null, 40, ["onChange", "onUpdate:modelValue"]), [
                    [vModelText, item.type]
                  ]),
                  createVNode("h2", { class: "text-xs mb-2 opacity-40" }, "Ort"),
                  withDirectives(createVNode("input", {
                    onChange: unref(saveContent),
                    "onUpdate:modelValue": ($event2) => item.place = $event2,
                    type: "text",
                    class: "w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 mb-4"
                  }, null, 40, ["onChange", "onUpdate:modelValue"]), [
                    [vModelText, item.place]
                  ]),
                  createVNode("h2", { class: "text-xs mb-2 opacity-40" }, "Name"),
                  withDirectives(createVNode("input", {
                    onChange: unref(saveContent),
                    "onUpdate:modelValue": ($event2) => item.name = $event2,
                    type: "text",
                    class: "w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 mb-4"
                  }, null, 40, ["onChange", "onUpdate:modelValue"]), [
                    [vModelText, item.name]
                  ])
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--><button class="rounded-sm hover:bg-white hover:bg-opacity-20 px-2 border border-darkOffwhite border-opacity-20"> Hinzuf\xFCgen </button></div><h2 class="text-xs opacity-40">Dateien</h2><!--[-->`);
      ssrRenderList(unref(componentFiles), (filename, index) => {
        _push(`<div class="flex items-center gap-2"><div style="${ssrRenderStyle([{ backgroundImage: `url(${getCurrentImageUrl(filename)})` }])}" class="w-10 h-10 bg-cover bg-no-repeat bg-center"></div><span>${ssrInterpolate(filename)}</span><button class="border border-red rounded-sm">`);
        _push(ssrRenderComponent(_component_nuxt_icon, {
          name: "icon-cross",
          class: "text-red text-xl"
        }, null, _parent));
        _push(`</button></div>`);
      });
      _push(`<!--]--><input type="file" class="mt-2"></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/Sidebar/ImageList.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ImageList-4A7qMq6q.mjs.map
