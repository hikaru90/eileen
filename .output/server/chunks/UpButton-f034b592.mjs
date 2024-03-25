import { _ as __nuxt_component_0 } from './nuxt-link-f7629129.mjs';
import _sfc_main$2 from './nuxt-icon-8914e1be.mjs';
import { u as useAuthStore, d as usePocketBase } from './server.mjs';
import { defineComponent, withAsyncContext, reactive, computed, onUnmounted, unref, withCtx, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderStyle, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Menu",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const authStore = useAuthStore();
    const { pb } = usePocketBase();
    const records = ([__temp, __restore] = withAsyncContext(() => pb.collection("pages").getFullList(200, {
      sort: "-created",
      expand: "subpages"
    })), __temp = await __temp, __restore(), __temp);
    const state = reactive({
      menuIsOpen: false,
      hoverIndex: null,
      menuEntryCount: 0,
      top: 0
    });
    const menuEntries = computed(() => {
      let entries = records.filter((record) => record.inMenu === true);
      entries.sort((a, b) => a.menuOrder - b.menuOrder);
      let i = 0;
      for (const entry of entries) {
        entry.delay = i * 100;
        i++;
        if (entry.subpages.length > 0) {
          for (const subpage of entry.expand.subpages) {
            subpage.delay = i * 100;
            i++;
          }
        }
      }
      state.menuEntryCount = i;
      return entries;
    });
    const closeMenu = (slug) => {
      console.log("slug", slug);
      if (!slug)
        return;
      state.menuIsOpen = false;
    };
    onUnmounted(() => {
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_nuxt_icon = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="${ssrRenderClass([[
        unref(state).menuIsOpen ? "opacity-100 scale-100 pointer-events-auto" : "scale-110 opacity-0 pointer-events-none"
      ], "fixed z-30 bg-white top-0 left-0 w-full h-full transform transition-all select-none"])}"><div class="max-container w-full"><div class="flex items-center justify-between py-4 mb-10"><div class="font-heading text-lg text-coffee">`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Eileen George `);
          } else {
            return [
              createTextVNode(" Eileen George ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><button aria-label="Men\xFC \xF6ffnen" class="flex items-center justify-center rounded p-1">`);
      _push(ssrRenderComponent(_component_nuxt_icon, {
        name: "icon-cross",
        class: "text-3xl text-red"
      }, null, _parent));
      _push(`</button></div><div class="flex flex-col items-start gap-6"><div class="flex flex-col items-start gap-4"><!--[-->`);
      ssrRenderList(unref(menuEntries), (menuEntry, index) => {
        _push(`<div style="${ssrRenderStyle(menuEntry.inMenu ? null : { display: "none" })}" class="relative">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          onClick: ($event) => closeMenu(menuEntry.slug),
          to: menuEntry.slug === "index" ? "/" : menuEntry.slug,
          key: "menuEntry" + index,
          style: [{ transitionDelay: `${menuEntry.delay}ms` }],
          class: [[
            { hidden: !menuEntry.slug },
            unref(state).menuIsOpen ? "transition-all opacity-100" : "opacity-0"
          ], "select-none flex items-center transition-all px-3 py-1 rounded duration-300"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span${_scopeId}>${ssrInterpolate(menuEntry.title)}</span>`);
            } else {
              return [
                createVNode("span", null, toDisplayString(menuEntry.title), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<div class="flex flex-col gap-3"><!--[-->`);
        ssrRenderList(menuEntry.expand.subpages, (subpage, i) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            onClick: ($event) => closeMenu(menuEntry),
            to: subpage.slug === "index" ? "/" : subpage.slug,
            key: index + "subpage" + i,
            style: [{ transitionDelay: `${subpage.delay}ms` }],
            class: [[unref(state).menuIsOpen ? "transition-all opacity-100" : "opacity-0"], "whitespace-nowrap last:border-b-0 px-3 py-1 hover:bg-white hover:bg-opacity-5 rounded transition-all"]
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(subpage.title)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(subpage.title), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div></div>`);
      });
      _push(`<!--]--></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        onClick: ($event) => closeMenu("buchen"),
        to: "/buchen",
        style: [{ transitionDelay: `${(unref(state).menuEntryCount + 1) * 100}ms` }],
        class: [[unref(state).menuIsOpen ? "transition-all opacity-100" : "opacity-0"], "border-2 border-gold rounded flex items-center px-3 py-2 duration-300"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="font-bold"${_scopeId}>Buchen</div><div class="flex items-center justify-center bg-gradient-to-b from-gold via-lightGold to-darkGold rounded-full ml-2 w-4 h-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_nuxt_icon, {
              name: "icon-caret-right",
              class: "text-sm text-coffee"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "font-bold" }, "Buchen"),
              createVNode("div", { class: "flex items-center justify-center bg-gradient-to-b from-gold via-lightGold to-darkGold rounded-full ml-2 w-4 h-4" }, [
                createVNode(_component_nuxt_icon, {
                  name: "icon-caret-right",
                  class: "text-sm text-coffee"
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><div class="${ssrRenderClass([[
        unref(state).top > 0 ? "bg-white shadow-xl shadow-coffee/5" : "shadow-sm",
        unref(authStore).token ? "absolute" : "fixed"
      ], "top-0 left-0 w-full z-20 text-white transition duration-100"])}"><div class="max-container w-full"><div class="${ssrRenderClass([[unref(state).top > 0 ? "py-4 lg:py-4" : "py-4 lg:py-6"], "flex items-center justify-between transition-all duration-150"])}"><div class="font-heading text-lg lg:text-2xl text-coffee">`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Eileen George `);
          } else {
            return [
              createTextVNode(" Eileen George ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="lg:hidden"><button aria-label="Men\xFC \xF6ffnen" class="flex items-center justify-center rounded p-1">`);
      _push(ssrRenderComponent(_component_nuxt_icon, {
        name: "icon-menu",
        class: "text-2xl text-coffee"
      }, null, _parent));
      _push(`</button></div><div class="hidden lg:flex items-center gap-4 text-coffee"><!--[-->`);
      ssrRenderList(unref(menuEntries), (menuEntry, index) => {
        _push(`<div style="${ssrRenderStyle(menuEntry.inMenu ? null : { display: "none" })}" class="relative">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: menuEntry.slug === "index" ? "/" : menuEntry.slug,
          onMouseenter: ($event) => unref(state).hoverIndex = index,
          key: "menuEntry" + index,
          class: "flex select-none items-center transition-all px-3 py-1 rounded"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div${_scopeId}>${ssrInterpolate(menuEntry.title)}</div>`);
              if (menuEntry.subpages.length > 0) {
                _push2(`<div class="ml-1"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_nuxt_icon, { name: "icon-triangle_down" }, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode("div", null, toDisplayString(menuEntry.title), 1),
                menuEntry.subpages.length > 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "ml-1"
                }, [
                  createVNode(_component_nuxt_icon, { name: "icon-triangle_down" })
                ])) : createCommentVNode("", true)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<div class="${ssrRenderClass([[
          menuEntry.subpages.length > 0 && unref(state).hoverIndex === index ? "select-auto opacity-100 bottom-0" : "select-none opacity-0 bottom-2"
        ], "absolute left-1 transform translate-y-full flex flex-col items-center -ml-3 transition-all"])}"><div class="bg-sand bg-opacity-100 flex flex-col rounded shadow-lg px-2 py-2 mt-3 gap-2"><!--[-->`);
        ssrRenderList(menuEntry.expand.subpages, (subpage, i) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: subpage.slug === "index" ? "/" : subpage.slug,
            key: index + "subpage" + i,
            class: "whitespace-nowrap last:border-b-0 px-3 py-1 hover:bg-white hover:bg-opacity-5 rounded transition-all"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(subpage.title)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(subpage.title), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div></div></div>`);
      });
      _push(`<!--]--></div><div class="hidden lg:block">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/buchen",
        class: "bg-salmon rounded-full text-white flex items-center px-5 py-2 shadow-md shadow-coffee/10"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div style="${ssrRenderStyle({ "text-shadow": "rgba(0, 0, 0, 0.8) 0 0 40px" })}" class=""${_scopeId}>Buchen</div>`);
          } else {
            return [
              createVNode("div", {
                style: { "text-shadow": "rgba(0, 0, 0, 0.8) 0 0 40px" },
                class: ""
              }, "Buchen")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Menu.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "UpButton",
  __ssrInlineRender: true,
  setup(__props) {
    const state = reactive({
      threshold: 500,
      visible: false
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_icon = _sfc_main$2;
      _push(`<button${ssrRenderAttrs(mergeProps({
        class: [[unref(state).visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"], "fixed bottom-4 md:bottom-6 right-5 md:right-10 flex items-center justify-center rounded-full shadow-xl bg-white p-2 md:p-4 border border-grey border-opacity-10 transition duration-500"]
      }, _attrs))}>`);
      _push(ssrRenderComponent(_component_nuxt_icon, {
        name: "icon-arrow_up",
        class: "text-xl text-darkGrey"
      }, null, _parent));
      _push(`</button>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UpButton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main$1 as _, _sfc_main as a };
//# sourceMappingURL=UpButton-f034b592.mjs.map
