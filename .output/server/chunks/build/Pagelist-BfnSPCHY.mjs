import _sfc_main$2 from './nuxt-icon-Cyx4B1z0.mjs';
import { useSSRContext, defineComponent, reactive, unref, withCtx, createTextVNode, toDisplayString, openBlock, createBlock, createVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { u as usePocketBase } from './server.mjs';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ListEntry",
  __ssrInlineRender: true,
  props: {
    name: { default: "Name" }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><span class="text-xs font-bold">${ssrInterpolate(props.name)}</span><div>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ListEntry.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Pagelist",
  __ssrInlineRender: true,
  emits: ["setTitle"],
  setup(__props, { emit: __emit }) {
    usePocketBase();
    const data = reactive({
      pending: true,
      pagelist: []
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_icon = _sfc_main$2;
      const _component_ListEntry = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (unref(data).pending) {
        _push(`<div class="w-full h-60 my-8 flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_nuxt_icon, {
          name: "icon-pending",
          class: "text-4xl animate-spin"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="my-8"><!--[-->`);
        ssrRenderList(unref(data).pagelist, (page) => {
          _push(`<div class="flex items-center justify-between p-6 hover:bg-sand hover:bg-opacity-5 rounded-md cursor-pointer"><div class="flex items-center">`);
          _push(ssrRenderComponent(_component_ListEntry, {
            name: "Slug",
            class: "mr-10"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` /${ssrInterpolate(page.slug)}`);
              } else {
                return [
                  createTextVNode(" /" + toDisplayString(page.slug), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(ssrRenderComponent(_component_ListEntry, { name: "Title" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(page.title)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(page.title), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div>`);
          _push(ssrRenderComponent(_component_ListEntry, { name: "Published" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                if (page.published) {
                  _push2(`<div class="bg-green rounded-full flex items-center justify-center w-5 h-5 mt-1"${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_nuxt_icon, {
                    name: "icon-check",
                    class: "text-xl"
                  }, null, _parent2, _scopeId));
                  _push2(`</div>`);
                } else {
                  _push2(`<div class="bg-red rounded-full flex items-center justify-center w-5 h-5 mt-1"${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_nuxt_icon, {
                    name: "icon-cross",
                    class: "text-xl"
                  }, null, _parent2, _scopeId));
                  _push2(`</div>`);
                }
              } else {
                return [
                  page.published ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "bg-green rounded-full flex items-center justify-center w-5 h-5 mt-1"
                  }, [
                    createVNode(_component_nuxt_icon, {
                      name: "icon-check",
                      class: "text-xl"
                    })
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "bg-red rounded-full flex items-center justify-center w-5 h-5 mt-1"
                  }, [
                    createVNode(_component_nuxt_icon, {
                      name: "icon-cross",
                      class: "text-xl"
                    })
                  ]))
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/Sidebar/Pagelist.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=Pagelist-BfnSPCHY.mjs.map
