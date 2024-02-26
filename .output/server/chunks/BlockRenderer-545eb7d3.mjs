import _sfc_main$2 from './nuxt-icon-5eb3d977.mjs';
import { useSSRContext, defineComponent, unref, mergeProps, reactive, computed, createVNode, resolveDynamicComponent, withCtx, createTextVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderVNode } from 'vue/server-renderer';
import { u as useAuthStore, d as usePocketBase, b as useSidebarStore, e as useContentStore, s as storeToRefs, E as EventBus } from './server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Adder",
  __ssrInlineRender: true,
  props: {
    displayComponentOption: { type: Boolean, default: false }
  },
  emits: ["addBlock", "addComponent"],
  setup(__props, { emit }) {
    const props = __props;
    const authStore = useAuthStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_icon = _sfc_main$2;
      if (unref(authStore).token) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "element relative w-full h-0" }, _attrs))} data-v-b9bca515><div class="absolute top-1/2 border-b-2 border-gold w-full opacity-0" data-v-b9bca515></div><div class="absolute top-1/2 transform -translate-y-1/2 w-full flex items-center justify-center opacity-0 z-10 gap-2" data-v-b9bca515><button aria-label="Add Block" class="p-0" data-v-b9bca515><div class="flex items-center bg-lightBlue rounded-full m-0" data-v-b9bca515>`);
        _push(ssrRenderComponent(_component_nuxt_icon, {
          name: "icon-plus",
          class: "text-xl"
        }, null, _parent));
        _push(`<span style="${ssrRenderStyle({ "padding-top": "2px" })}" class="text-xs pr-2" data-v-b9bca515> Block </span></div></button>`);
        if (props.displayComponentOption) {
          _push(`<button aria-label="Add Component" class="p-0" data-v-b9bca515><div class="flex items-center bg-lightGreen rounded-full m-0" data-v-b9bca515>`);
          _push(ssrRenderComponent(_component_nuxt_icon, {
            name: "icon-plus",
            class: "text-xl"
          }, null, _parent));
          _push(`<span style="${ssrRenderStyle({ "padding-top": "2px" })}" class="text-xs pr-2" data-v-b9bca515> Component </span></div></button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Adder.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-b9bca515"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BlockRenderer",
  __ssrInlineRender: true,
  props: {
    block: null,
    depth: { default: 0 },
    isFirst: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const { pb } = usePocketBase();
    const authStore = useAuthStore();
    const sidebarStore = useSidebarStore();
    const contentStore = useContentStore();
    const { viewports, componentId } = storeToRefs(sidebarStore);
    const { windowWidth } = storeToRefs(contentStore);
    const { capitalize } = contentStore;
    const state = reactive({
      matrix: []
    });
    const createMatrix = (cssClasses) => {
      try {
        const keys = JSON.parse(JSON.stringify(cssClasses.flat())).map((row) => Object.keys(row)[0]);
        const uniqueKeys = [...new Set(keys)];
        let matrix = viewports.value.map((entry) => []);
        for (const [index, viewport] of matrix.entries()) {
          if (index === 0) {
            matrix[index] = cssClasses[index];
          } else if (cssClasses[index]) {
            const lastEntries = matrix[index - 1].map((entry) => Object.entries(entry)[0]);
            const lastKeys = lastEntries.map((entry) => entry[0]);
            const lastValues = lastEntries.map((entry) => entry[1]);
            const currentEntries = cssClasses[index].map((entry) => Object.entries(entry)[0]);
            const currentKeys = currentEntries.map((entry) => entry[0]);
            const currentValues = currentEntries.map((entry) => entry[1]);
            for (const currentEntry of currentEntries) {
              if (lastKeys.includes(currentEntry[0])) {
                let newProperty = {};
                newProperty[currentEntry[0]] = currentEntry[1];
                matrix[index].push(newProperty);
              } else {
                let newProperty = {};
                newProperty[currentEntry[0]] = currentEntry[1];
                matrix[index].push(newProperty);
              }
            }
            for (const lastEntry of lastEntries) {
              if (!currentKeys.includes(lastEntry[0])) {
                let newProperty = {};
                newProperty[lastEntry[0]] = lastEntry[1];
                matrix[index].push(newProperty);
              }
            }
          } else {
            matrix[index] = matrix[index - 1];
          }
        }
        return JSON.parse(JSON.stringify(matrix));
      } catch (err) {
        return [[], [], [], [], []];
      }
    };
    const currentViewportIndex = computed(() => {
      return viewports.value.filter((viewport) => windowWidth.value >= viewport.value).reduce((prev, current) => {
        return prev.value > current.value ? prev : current;
      }).id;
    });
    const style = computed(() => {
      state.matrix = createMatrix(props.block.cssClasses);
      const blockStyle = state.matrix.map(
        (viewport) => viewport.filter((property) => {
          if (property.hasOwnProperty("background") && !props.block.limitBackgroundToMaxContainer)
            return false;
          return true;
        })
      )[currentViewportIndex.value];
      const containerStyle = state.matrix.map(
        (viewport) => viewport.filter((property) => {
          if (property.hasOwnProperty("background") && !props.block.limitBackgroundToMaxContainer)
            return true;
          if (property.hasOwnProperty("width"))
            return true;
          return false;
        })
      )[currentViewportIndex.value];
      return { container: containerStyle, block: blockStyle };
    });
    const addBlock = async (container) => {
      console.log("container", container);
      const block = await pb.collection("blocks").create({
        type: "default",
        isMaxContainer: false,
        cssClasses: [
          [
            { paddingTop: "40px" },
            { paddingBottom: "40px" },
            { marginTop: "40px" },
            { marginBottom: "40px" }
          ],
          [],
          [],
          [],
          []
        ]
      });
      let allBlocks = props.block.blocks;
      allBlocks.push(block.id);
      await pb.collection("blocks").update(container.id, { blocks: allBlocks });
      EventBus.emit("refresh");
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_Adder = __nuxt_component_1;
      _push(`<!--[-->`);
      if ((_a = props.block) == null ? void 0 : _a.type) {
        _push(`<div id="sidebarTarget" style="${ssrRenderStyle([unref(style).container])}" class="flex">`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent("Block" + unref(capitalize)(props.block.type)), {
          block: props.block,
          isFirst: props.isFirst,
          depth: props.depth + 1,
          style: [unref(style).block],
          class: [
            { "hover:shadow-block": unref(authStore).token },
            { "shadow-block": unref(authStore).token && unref(componentId) === ((_b = props.block) == null ? void 0 : _b.id) },
            { "max-container": props.block.isMaxContainer }
          ]
        }, null), _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="relative -top-6 h-0">`);
      if (props.depth === 0) {
        _push(ssrRenderComponent(_component_Adder, {
          onAddBlock: ($event) => addBlock(props.block)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Block`);
            } else {
              return [
                createTextVNode("Block")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BlockRenderer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _, __nuxt_component_1 as a };
//# sourceMappingURL=BlockRenderer-545eb7d3.mjs.map
