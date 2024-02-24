import { useSSRContext, defineComponent, reactive, withAsyncContext, computed, mergeProps, unref } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderStyle, ssrInterpolate } from 'vue/server-renderer';
import { a as __nuxt_component_1 } from './BlockRenderer-52b92443.mjs';
import _sfc_main$2 from './nuxt-icon-14b11dc2.mjs';
import { _ as _sfc_main$3 } from './Container-b9c9883f.mjs';
import { d as usePocketBase, u as useAuthStore, b as useSidebarStore, f as useContentStore, s as storeToRefs, j as useRoute, E as EventBus } from './server.mjs';
import { u as useAsyncData, r as refreshNuxtData } from './asyncData-8ca360f1.mjs';
import { u as useHead } from './composables-583e67d3.mjs';
import './_plugin-vue_export-helper-cc2b3d55.mjs';
import 'ofetch';
import 'hookable';
import 'unctx';
import '@unhead/vue';
import '@unhead/dom';
import '@unhead/ssr';
import 'vue-router';
import 'h3';
import 'ufo';
import 'markdown-it';
import 'mitt';
import 'defu';
import 'pocketbase';
import './node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'destr';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'ohash';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'ipx';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Pane",
  __ssrInlineRender: true,
  props: {
    content: null
  },
  emits: ["refresh"],
  setup(__props, { emit }) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-lightGrey p-2 rounded" }, _attrs))}><p class="text-sm">${ssrInterpolate(props.content)}</p><button class="bg-white shadow px-2 py-1 rounded block mt-4"> Refresh</button></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/debug/Pane.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[...slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { pb } = usePocketBase();
    const authStore = useAuthStore();
    const sidebarStore = useSidebarStore();
    const contentStore = useContentStore();
    const { moveDown, moveUp, setPage, savePage } = contentStore;
    const { page } = storeToRefs(contentStore);
    storeToRefs(authStore);
    const { viewports, componentId } = storeToRefs(sidebarStore);
    const route = useRoute();
    let slug = route.params.slug;
    slug = !slug ? "index" : slug;
    const state = reactive({
      storePending: true,
      currentContainer: null
    });
    const { pending, data: pageContent } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "pageContent",
      () => pb.collection("pages").getFirstListItem(`slug="${slug}"`, {
        expand: "containers.block.blocks,containers.component,seo"
      })
    )), __temp = await __temp, __restore(), __temp);
    state.storePending = false;
    useHead({
      title: pageContent.value.expand.seo.title ? `Eileen George \u2014 ${pageContent.value.expand.seo.title}` : `Eileen George \u2014 ${pageContent.value.title}`,
      meta: [{ name: "description", content: pageContent.value.expand.seo.description }]
    });
    EventBus.on("refresh", () => {
      console.log("content saved");
      state.storePending = true;
      refresh();
    });
    const refresh = async () => {
      await setTimeout(async () => {
        await refreshNuxtData();
        setPage(pageContent.value);
      }, 400);
      state.storePending = false;
    };
    const currentContainerAuth = computed(() => {
      if (authStore.token) {
        return state.currentContainer;
      }
      return null;
    });
    const isSelected = (container) => {
      var _a, _b;
      const id = ((_a = container == null ? void 0 : container.expand.block) == null ? void 0 : _a.id) || ((_b = container == null ? void 0 : container.expand.component) == null ? void 0 : _b.id);
      if (componentId.value === id)
        return true;
      return false;
    };
    const addBlockContainer = async (index) => {
      const block = await pb.collection("blocks").create({
        type: "default",
        isMaxContainer: false,
        cssClasses: [[{ paddingTop: "40px" }, { marginTop: "40px" }], [], [], [], []]
      });
      const container = await pb.collection("containers").create({ block: block.id });
      const createdId = container.id;
      const containers = pageContent.value.containers;
      containers.splice(index, 0, createdId);
      await pb.collection("pages").update(pageContent.value.id, { containers });
      refresh();
    };
    const addComponent = async (index) => {
      const component = await pb.collection("components").create({ type: "default" });
      const container = await pb.collection("containers").create({ component: component.id });
      const createdId = container.id;
      const containers = pageContent.value.containers;
      containers.splice(index, 0, createdId);
      await pb.collection("pages").update(pageContent.value.id, { containers });
      refresh();
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_DebugPane = _sfc_main$1;
      const _component_Adder = __nuxt_component_1;
      const _component_nuxt_icon = _sfc_main$2;
      const _component_Container = _sfc_main$3;
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "mt-24" }, _attrs))}>`);
      if (unref(state).storePending) {
        _push(`<div>pending</div>`);
      } else {
        _push(`<div>`);
        if (unref(contentStore).debugVisible) {
          _push(ssrRenderComponent(_component_DebugPane, {
            content: unref(page),
            onRefresh: refresh
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<div class=""><div class="">`);
        _push(ssrRenderComponent(_component_Adder, {
          onAddBlock: ($event) => addBlockContainer(0),
          onAddComponent: ($event) => addComponent(0),
          displayComponentOption: ""
        }, null, _parent));
        if ((_a = unref(page)) == null ? void 0 : _a.expand) {
          _push(`<!--[-->`);
          ssrRenderList(unref(page).expand.containers, (container, index) => {
            _push(`<div class="${ssrRenderClass([[
              { "hover:shadow-edit": unref(authStore).token && unref(currentContainerAuth) },
              { "cursor-cell": unref(authStore).token },
              { "shadow-edit": isSelected(container) }
            ], "relative"])}"><div style="${ssrRenderStyle(unref(currentContainerAuth) === index ? null : { display: "none" })}" class="absolute w-full flex justify-between pointer-events-none z-10"><div class="flex items-center pointer-events-auto"><button class="bg-gold">`);
            _push(ssrRenderComponent(_component_nuxt_icon, {
              name: "icon-triangle_up",
              class: "text-xl"
            }, null, _parent));
            _push(`</button><button class="bg-gold">`);
            _push(ssrRenderComponent(_component_nuxt_icon, {
              name: "icon-triangle_down",
              class: "text-xl"
            }, null, _parent));
            _push(`</button></div><div class="flex items-center bg-red pointer-events-auto"><button>`);
            _push(ssrRenderComponent(_component_nuxt_icon, {
              name: "icon-cross",
              class: "text-xl"
            }, null, _parent));
            _push(`</button></div></div>`);
            _push(ssrRenderComponent(_component_Container, {
              container,
              isFirst: index === 0
            }, null, _parent));
            _push(ssrRenderComponent(_component_Adder, {
              onAddBlock: ($event) => addBlockContainer(index + 1),
              onAddComponent: ($event) => addComponent(index + 1),
              displayComponentOption: ""
            }, null, _parent));
            _push(`</div>`);
          });
          _push(`<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
      }
      _push(`</main>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[...slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_...slug_-c302e2c5.mjs.map
