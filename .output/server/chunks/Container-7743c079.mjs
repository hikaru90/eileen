import { _ as _sfc_main$2 } from './BlockRenderer-e93fa589.mjs';
import { useSSRContext, defineComponent, computed, unref, reactive, createVNode, resolveDynamicComponent } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderVNode } from 'vue/server-renderer';
import { u as useAuthStore, b as useSidebarStore, e as useContentStore, s as storeToRefs } from './server.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ComponentRenderer",
  __ssrInlineRender: true,
  props: {
    component: null,
    isFirst: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const authStore = useAuthStore();
    const sidebarStore = useSidebarStore();
    const contentStore = useContentStore();
    const { viewports, componentId } = storeToRefs(sidebarStore);
    storeToRefs(contentStore);
    const {
      setComponentName,
      setComponentCss,
      setComponentId,
      setComponentContentType,
      setComponentContent,
      setComponentFiles
    } = sidebarStore;
    const { capitalize } = contentStore;
    reactive({
      matrix: []
    });
    const selectBlock = () => {
      if (authStore.token) {
        setComponentId(props.component.id);
        setComponentCss(void 0);
        setComponentName("SidebarComponent");
        setComponentContentType(props.component.type);
        setComponentContent(props.component.content);
        setComponentFiles(props.component.files);
      }
    };
    computed(() => {
      if (componentId.value === props.component.id)
        return true;
      return false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent("Component" + unref(capitalize)(props.component.type)), {
        onClick: selectBlock,
        id: "sidebarTarget",
        component: props.component,
        class: [
          { "hover:shadow-component": unref(authStore).token },
          { "shadow-component": unref(authStore).token && unref(componentId) === ((_a = props.component) == null ? void 0 : _a.id) }
        ],
        isFirst: props.isFirst
      }, null), _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ComponentRenderer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Container",
  __ssrInlineRender: true,
  props: {
    container: { default: void 0 },
    isFirst: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    useAuthStore();
    useSidebarStore();
    const contentType = computed(() => {
      if (props.container.block) {
        return "block";
      } else if (props.container.component) {
        return "component";
      } else {
        return false;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BlockRenderer = _sfc_main$2;
      const _component_ComponentRenderer = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (!unref(contentType)) {
        _push(`<div>Block or Component could not be found</div>`);
      } else if (unref(contentType) === "block") {
        _push(ssrRenderComponent(_component_BlockRenderer, {
          block: __props.container.expand.block,
          isFirst: props.isFirst
        }, null, _parent));
      } else if (unref(contentType) === "component") {
        _push(ssrRenderComponent(_component_ComponentRenderer, {
          isFirst: props.isFirst,
          component: __props.container.expand.component
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Container.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=Container-7743c079.mjs.map
