import { defineComponent, computed, resolveComponent, reactive, unref, createVNode, resolveDynamicComponent, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderVNode } from 'vue/server-renderer';
import { b as useSidebarStore, s as storeToRefs } from './server.mjs';
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
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarStore = useSidebarStore();
    const { componentName, componentCss, componentType } = storeToRefs(sidebarStore);
    const dynamicComponent = computed(() => {
      const componentNameValue = componentName.value;
      if (componentNameValue) {
        const thisComponent = resolveComponent(componentNameValue);
        return thisComponent;
      }
    });
    const state = reactive({
      selectedMode: 0,
      modes: {
        blocks: [
          { id: 0, name: "Content" },
          { id: 1, name: "Style" }
        ],
        components: [
          { id: 0, name: "Component" },
          { id: 1, name: "Content" }
        ]
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="">`);
      if (unref(componentType) === "block") {
        _push(`<div style="${ssrRenderStyle({ "padding-top": "17px", "padding-bottom": "17px" })}" class="border-b border-darkOffwhite border-opacity-20 px-4 flex gap-2"><!--[-->`);
        ssrRenderList(unref(state).modes.blocks, (mode) => {
          _push(`<button class="${ssrRenderClass([[{ "bg-white bg-opacity-20": mode.id === unref(state).selectedMode }], "rounded-sm px-2 py-1"])}">${ssrInterpolate(mode.name)}</button>`);
        });
        _push(`<!--]--></div>`);
      } else if (unref(componentType) === "component") {
        _push(`<div style="${ssrRenderStyle({ "padding-top": "17px", "padding-bottom": "17px" })}" class="border-b border-darkOffwhite border-opacity-20 px-4 flex gap-2"><!--[-->`);
        ssrRenderList(unref(state).modes.components, (mode) => {
          _push(`<button class="${ssrRenderClass([[{ "bg-white bg-opacity-20": mode.id === unref(state).selectedMode }], "rounded-sm px-2 py-1"])}">${ssrInterpolate(mode.name)}</button>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(dynamicComponent)), {
        selectedMode: unref(state).selectedMode
      }, null), _parent);
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/Sidebar/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CCzkVZ3A.mjs.map
