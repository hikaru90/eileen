import { useSSRContext, defineComponent, computed, unref, mergeProps, reactive, withCtx, createVNode, toDisplayString, ref } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';
import { d as usePocketBase, g as defineStore, b as useSidebarStore, s as storeToRefs, f as useContentStore } from './server.mjs';
import { _ as _sfc_main$y } from './IconSelector-e361f108.mjs';
import { _ as _sfc_main$z } from './ArrayPane-2afba066.mjs';
import _sfc_main$A from './nuxt-icon-14b11dc2.mjs';
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
import './icon-BookingCalendar-00dab00c.mjs';
import './icon-Default-85dc2ff8.mjs';
import './icon-Faq-2f618915.mjs';
import './icon-HeroBig-86e284c7.mjs';
import './icon-HeroSmall-30cf3e99.mjs';
import './icon-ImageList-d957c076.mjs';
import './icon-ImageRotation-3c13e7e9.mjs';
import './icon-Prices-0a4393ae.mjs';
import './icon-archive-4dc2e644.mjs';
import './icon-area-761ec823.mjs';
import './icon-arrow_down-84315b51.mjs';
import './icon-arrow_left-3cc20fb3.mjs';
import './icon-arrow_right-97e20096.mjs';
import './icon-arrow_up-ce72e0ca.mjs';
import './icon-bug-5ba91c63.mjs';
import './icon-car-b2e25dc3.mjs';
import './icon-caret-left-94f4de0a.mjs';
import './icon-caret-right-27dd4932.mjs';
import './icon-center-aligned-13a63377.mjs';
import './icon-check-6fa862b2.mjs';
import './icon-circle-3747153d.mjs';
import './icon-co2-90066342.mjs';
import './icon-consulting-6ed90642.mjs';
import './icon-copy-1fe81b3f.mjs';
import './icon-cost-798c6e98.mjs';
import './icon-cross-aab68f74.mjs';
import './icon-customer_service-09ecbb52.mjs';
import './icon-customer_support-32fdd24a.mjs';
import './icon-dashboard-cddf0596.mjs';
import './icon-desktop-5bea7949.mjs';
import './icon-dials-6d2f8dda.mjs';
import './icon-dot-74ce8b1a.mjs';
import './icon-download-c72fddff.mjs';
import './icon-dragarea-fcb6cf6d.mjs';
import './icon-eco-3b24403d.mjs';
import './icon-energy-66d3c799.mjs';
import './icon-error-0165b3c4.mjs';
import './icon-file-generic-23c3dcb2.mjs';
import './icon-file-img-b008a7f2.mjs';
import './icon-file-pdf-d3e64025.mjs';
import './icon-file-text-eafea048.mjs';
import './icon-flip-7dc328a9.mjs';
import './icon-help-70987525.mjs';
import './icon-house-aa111ead.mjs';
import './icon-info-2d984e0f.mjs';
import './icon-installation-ee74f22b.mjs';
import './icon-laptop-4f8849dd.mjs';
import './icon-left-aligned-d1e00faf.mjs';
import './icon-link-821e7926.mjs';
import './icon-lower-a6f410fe.mjs';
import './icon-mail-70c9ab04.mjs';
import './icon-margin-bottom-25627c8c.mjs';
import './icon-margin-left-12db653f.mjs';
import './icon-margin-right-e45cedad.mjs';
import './icon-margin-top-f98aafb5.mjs';
import './icon-marker-5a38e0a3.mjs';
import './icon-menu-adb5dca6.mjs';
import './icon-mess-2ca9c138.mjs';
import './icon-minus-af64a28d.mjs';
import './icon-mobile_-0f28c527.mjs';
import './icon-mobile-b5a18aa5.mjs';
import './icon-modules-ee4b7a2f.mjs';
import './icon-modules_check-e0179e4f.mjs';
import './icon-modules_landscape-9f0901a3.mjs';
import './icon-move-42886ec5.mjs';
import './icon-padding-bottom-c26823e9.mjs';
import './icon-padding-left-a992dac1.mjs';
import './icon-padding-right-0c9e199c.mjs';
import './icon-padding-top-30463e4d.mjs';
import './icon-pause-794d2d01.mjs';
import './icon-pending-e91fc2b3.mjs';
import './icon-phone-98abcef7.mjs';
import './icon-play-9b268b4d.mjs';
import './icon-plus-976dcab9.mjs';
import './icon-polygon_add2-dfae0d34.mjs';
import './icon-polygon_subtract-b90557c1.mjs';
import './icon-power-3d78b4aa.mjs';
import './icon-quote-7b8f8faa.mjs';
import './icon-rectangle-278e40f9.mjs';
import './icon-reload-015443a4.mjs';
import './icon-repair-9b9e8b26.mjs';
import './icon-right-aligned-62cdead9.mjs';
import './icon-save-d26ffe1e.mjs';
import './icon-search-3c2f0835.mjs';
import './icon-sort-f3ad8ef0.mjs';
import './icon-subvention-03c4b50d.mjs';
import './icon-sun-e25ae887.mjs';
import './icon-tablet-8489ca6a.mjs';
import './icon-trash-fd026653.mjs';
import './icon-tree-b9e3465e.mjs';
import './icon-triangle_down-620b2304.mjs';
import './icon-triangle_up-307905cf.mjs';
import './icon-triangles-1ec0048c.mjs';
import './icon-upload-1f0db0c4.mjs';
import './icon-user-af805b6e.mjs';
import './icon-years-d767bd1a.mjs';
import './index-4dc78d0f.mjs';

const __vite_glob_0_0 = `<script setup lang="ts">\r
  import { useAuthStore } from "~/store/auth";\r
  const authStore = useAuthStore();\r
  const config = useRuntimeConfig();\r
\r
  const props = withDefaults(\r
    defineProps<{\r
      block: object;\r
    }>(),\r
    {\r
    }\r
  );\r
\r
  const state = reactive({\r
  });\r
<\/script>\r
\r
<template>\r
  <div>\r
    <a :href="authStore.token ? '#' : props.block.content?.calltoaction.link" :title="props.block.content?.calltoaction.text" class="flex items-center border-2 border-gold rounded text-offwhite px-4 py-3">\r
      <div>\r
        {{ props.block.content?.calltoaction.text }}\r
      </div>\r
      <div class="flex items-center justify-center bg-gradient-to-b from-gold via-lightGold to-darkGold rounded-full ml-2 w-4 h-4">\r
        <nuxt-icon :name="props.block.content?.calltoaction.icon" class="text-sm text-black" />\r
      </div>\r
    </a>\r
  </div>\r
</template>`;
const __vite_glob_0_1 = `<script setup lang="ts">\r
  const props = withDefaults(\r
    defineProps<{\r
      block: object;\r
      depth?: number;\r
    }>(),\r
    {\r
      depth: 0,\r
    }\r
  );\r
<\/script>\r
\r
<template>\r
  <div style="min-height: 20px">\r
    <BlockRenderer\r
      v-for="(block, index) in props.block.expand.blocks"\r
      :block="block"\r
      :depth="props.depth"\r
      :key="'block' + props.depth + index"\r
    />\r
  </div>\r
</template>\r
`;
const __vite_glob_0_2 = '<script setup lang="ts">\r\n  const props = withDefaults(\r\n    defineProps<{\r\n      block: object;\r\n      depth?: number;\r\n    }>(),\r\n    {\r\n      depth: 0,\r\n    }\r\n  );\r\n<\/script>\r\n\r\n<template>\r\n  <div style="min-height: 20px">\r\n    Suche bitte einen Block aus\r\n  </div>\r\n</template>';
const __vite_glob_0_3 = '<script setup lang="ts">\r\nimport { useSidebarStore } from "~/store/sidebar";\r\n  import { storeToRefs } from "pinia";\r\n  const sidebarStore = useSidebarStore();\r\n  const { componentContent } = storeToRefs(sidebarStore);\r\n\r\n  const props = defineProps<{\r\n    block: object;\r\n  }>();\r\n\r\n<\/script>\r\n\r\n<template>\r\n  <div v-if="props.block.content?.markdown" style="min-height: 20px" v-html="$mdRenderer.render(props.block?.content?.markdown)" class="markdown">\r\n  </div>\r\n</template>\r\n\r\n<style lang="scss">\r\n\r\n\r\n.markdown{\r\n  h1{\r\n    @apply font-bold text-2xl mb-10 mt-6;\r\n  }\r\n  h2{\r\n    @apply font-bold text-xl mb-8 mt-4;\r\n  }\r\n  h3{\r\n    @apply font-bold text-lg mb-6 mt-2;\r\n  }\r\n  p{\r\n    @apply mb-10;\r\n  }\r\n}\r\n\r\n</style>';
const _sfc_main$x = /* @__PURE__ */ defineComponent({
  __name: "BlockSelector",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarStore = useSidebarStore();
    const contentStore = useContentStore();
    const { componentContent, componentContentType } = storeToRefs(sidebarStore);
    const { slugify } = contentStore;
    const files = Object.keys(
      /* @__PURE__ */ Object.assign({ "/components/global/Block/Calltoaction.vue": __vite_glob_0_0, "/components/global/Block/Container.vue": __vite_glob_0_1, "/components/global/Block/Default.vue": __vite_glob_0_2, "/components/global/Block/Markdown.vue": __vite_glob_0_3 })
    ).map((path) => {
      const array = path.split("/");
      return array[array.length - 1].split(".")[0];
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-4" }, _attrs))}><select${ssrRenderAttr("value", unref(componentContentType))} name="contentType" id="contentTypeSelector" class="rounded-sm bg-transparent border border-darkOffwhite border-opacity-20 py-1 px-2"><!--[-->`);
      ssrRenderList(unref(files), (option, index) => {
        _push(`<option${ssrRenderAttr("value", unref(slugify)(option))} class="bg-black">${ssrInterpolate(option)}</option>`);
      });
      _push(`<!--]--></select></div>`);
    };
  }
});
const _sfc_setup$x = _sfc_main$x.setup;
_sfc_main$x.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/input/BlockSelector.vue");
  return _sfc_setup$x ? _sfc_setup$x(props, ctx) : void 0;
};
const _sfc_main$w = /* @__PURE__ */ defineComponent({
  __name: "MaxContainer",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarStore = useSidebarStore();
    const { componentIsMaxContainer } = storeToRefs(sidebarStore);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center gap-2 px-4 py-4 border-b border-offwhite border-opacity-20" }, _attrs))}><input${ssrIncludeBooleanAttr(Array.isArray(unref(componentIsMaxContainer)) ? ssrLooseContain(unref(componentIsMaxContainer), null) : unref(componentIsMaxContainer)) ? " checked" : ""} type="checkbox" class="w-6 h-6 rounded-sm"><h2 class="opacity-40"> Breite begrenzen </h2></div>`);
    };
  }
});
const _sfc_setup$w = _sfc_main$w.setup;
_sfc_main$w.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/input/MaxContainer.vue");
  return _sfc_setup$w ? _sfc_setup$w(props, ctx) : void 0;
};
const _sfc_main$v = /* @__PURE__ */ defineComponent({
  __name: "MaxContainerBackground",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarStore = useSidebarStore();
    const { limitBackgroundToMaxContainer } = storeToRefs(sidebarStore);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center gap-2 px-4 py-4 border-b border-offwhite border-opacity-20" }, _attrs))}><input${ssrIncludeBooleanAttr(Array.isArray(unref(limitBackgroundToMaxContainer)) ? ssrLooseContain(unref(limitBackgroundToMaxContainer), null) : unref(limitBackgroundToMaxContainer)) ? " checked" : ""} type="checkbox" class="w-6 h-6 rounded-sm"><h2 class="opacity-40"> Hintergrund auf Container begrenzen </h2></div>`);
    };
  }
});
const _sfc_setup$v = _sfc_main$v.setup;
_sfc_main$v.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/input/MaxContainerBackground.vue");
  return _sfc_setup$v ? _sfc_setup$v(props, ctx) : void 0;
};
const _sfc_main$u = /* @__PURE__ */ defineComponent({
  __name: "Markdown",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarStore = useSidebarStore();
    const { componentContent } = storeToRefs(sidebarStore);
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-4" }, _attrs))}><textarea rows="20" class="rounded-sm px-2 py-1 w-full bg-transparent border border-darkOffwhite border-opacity-20">${ssrInterpolate((_a = unref(componentContent)) == null ? void 0 : _a.markdown)}</textarea></div>`);
    };
  }
});
const _sfc_setup$u = _sfc_main$u.setup;
_sfc_main$u.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/input/Content/Markdown.vue");
  return _sfc_setup$u ? _sfc_setup$u(props, ctx) : void 0;
};
const _sfc_main$t = /* @__PURE__ */ defineComponent({
  __name: "ContentCallToAction",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarStore = useSidebarStore();
    storeToRefs(sidebarStore);
    const state = reactive({
      calltoaction: {
        text: "Jetzt Termin buchen",
        link: "/buchung",
        icon: "icon-caret-right"
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_InputIconSelector = _sfc_main$y;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-4" }, _attrs))}><h2 class="text-xs mb-2 opacity-40">Text</h2><input type="text"${ssrRenderAttr("value", unref(state).calltoaction.text)} class="rounded-sm px-2 py-1 w-full bg-transparent border border-darkOffwhite border-opacity-20 mb-4"><h2 class="text-xs mb-2 opacity-40">Link</h2><input type="text"${ssrRenderAttr("value", unref(state).calltoaction.link)} class="rounded-sm px-2 py-1 w-full bg-transparent border border-darkOffwhite border-opacity-20 mb-4"><h2 class="text-xs mb-2 opacity-40">Icon</h2>`);
      _push(ssrRenderComponent(_component_InputIconSelector, {
        modelValue: unref(state).calltoaction.icon,
        "onUpdate:modelValue": ($event) => unref(state).calltoaction.icon = $event
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$t = _sfc_main$t.setup;
_sfc_main$t.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/input/Content/ContentCallToAction.vue");
  return _sfc_setup$t ? _sfc_setup$t(props, ctx) : void 0;
};
const _sfc_main$s = /* @__PURE__ */ defineComponent({
  __name: "BlockChildren",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarStore = useSidebarStore();
    const { componentChildren } = storeToRefs(sidebarStore);
    const {
      setComponentName,
      setComponentCss,
      setComponentId,
      setComponentContentType,
      setComponentContent,
      setComponentIsMaxContainer,
      setComponentChildren,
      saveComponentChildren
    } = sidebarStore;
    const contentStore = useContentStore();
    const { capitalize } = contentStore;
    const selectChild = (child) => {
      console.log("child", child);
      setComponentId(child.id);
      setComponentIsMaxContainer(child.isMaxContainer);
      setComponentCss(child.cssClasses);
      setComponentName("SidebarBlock");
      setComponentContentType(child.type);
      setComponentContent(child.content);
      setComponentChildren(child.expand.blocks);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ArrayPane = _sfc_main$z;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-4 flex flex-col gap-2" }, _attrs))}><!--[-->`);
      ssrRenderList(unref(componentChildren), (child, index) => {
        _push(ssrRenderComponent(_component_ArrayPane, {
          onArrayChanged: unref(saveComponentChildren),
          key: "child" + index,
          array: unref(componentChildren),
          entry: child,
          index
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<button class="pb-2 px-2"${_scopeId}>${ssrInterpolate(unref(capitalize)(child.type))}</button>`);
            } else {
              return [
                createVNode("button", {
                  onClick: ($event) => selectChild(child),
                  class: "pb-2 px-2"
                }, toDisplayString(unref(capitalize)(child.type)), 9, ["onClick"])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$s = _sfc_main$s.setup;
_sfc_main$s.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/input/BlockChildren.vue");
  return _sfc_setup$s ? _sfc_setup$s(props, ctx) : void 0;
};
const _sfc_main$r = /* @__PURE__ */ defineComponent({
  __name: "ViewportSelector",
  __ssrInlineRender: true,
  emits: ["setViewport"],
  setup(__props, { emit }) {
    const sidebarStore = useSidebarStore();
    const { viewports, viewport } = storeToRefs(sidebarStore);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_icon = _sfc_main$A;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center px-4 gap-2 mb-2 py-4 border-b border-darkOffwhite border-opacity-20" }, _attrs))}><!--[-->`);
      ssrRenderList(unref(viewports), (viewportEntry, index) => {
        _push(`<div class="${ssrRenderClass([[unref(viewport) === viewportEntry.id ? "bg-white bg-opacity-20 opacity-100" : "opacity-60"], "flex rounded-sm hover:text-white border border-darkOffwhite border-opacity-20"])}"><button>`);
        _push(ssrRenderComponent(_component_nuxt_icon, {
          name: viewportEntry.icon,
          class: "text-4xl animate-spin"
        }, null, _parent));
        _push(`</button></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$r = _sfc_main$r.setup;
_sfc_main$r.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/input/ViewportSelector.vue");
  return _sfc_setup$r ? _sfc_setup$r(props, ctx) : void 0;
};
const _sfc_main$q = /* @__PURE__ */ defineComponent({
  __name: "Display",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarStore = useSidebarStore();
    const { componentCss, viewports, viewport } = storeToRefs(sidebarStore);
    const property = "display";
    const isRealProperty = computed(() => {
      var _a;
      const entry = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find((entry2) => entry2.hasOwnProperty(property));
      if (entry)
        return true;
      return false;
    });
    const currentProperty = computed(() => {
      var _a;
      const entry = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find((entry2) => entry2.hasOwnProperty(property));
      if (entry)
        return entry[property];
    });
    const state = reactive({
      options: [
        { id: 0, name: "block", value: "block" },
        { id: 1, name: "flex", value: "flex" },
        { id: 2, name: "inline", value: "inline" },
        { id: 3, name: "inline-block", value: "inline-block" },
        { id: 4, name: "inline-flex", value: "inline-flex" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_icon = _sfc_main$A;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "" }, _attrs))}><h2 class="text-xs mb-2 opacity-40"> Display </h2><div class="${ssrRenderClass([[{ "opacity-60": !unref(isRealProperty) }], "flex flex-wrap items-center gap-2"])}"><!--[-->`);
      ssrRenderList(unref(state).options, (option) => {
        _push(`<button class="${ssrRenderClass([[{ "bg-white bg-opacity-20": unref(currentProperty) === option.value }], "rounded-sm hover:bg-white hover:bg-opacity-20 px-2 break-inside-avoid whitespace-nowrap border border-darkOffwhite border-opacity-20"])}">${ssrInterpolate(option.name)}</button>`);
      });
      _push(`<!--]-->`);
      if (unref(isRealProperty)) {
        _push(`<button class="border border-red rounded-sm">`);
        _push(ssrRenderComponent(_component_nuxt_icon, {
          name: "icon-cross",
          class: "text-red text-xl"
        }, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$q = _sfc_main$q.setup;
_sfc_main$q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/input/Display.vue");
  return _sfc_setup$q ? _sfc_setup$q(props, ctx) : void 0;
};
const _sfc_main$p = /* @__PURE__ */ defineComponent({
  __name: "FlexGrow",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarStore = useSidebarStore();
    const { componentCss, viewports, viewport } = storeToRefs(sidebarStore);
    const property = "flexGrow";
    const isRealProperty = computed(() => {
      var _a;
      const entry = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find((entry2) => entry2.hasOwnProperty(property));
      if (entry)
        return true;
      return false;
    });
    const currentProperty = computed(() => {
      var _a;
      const entry = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find((entry2) => entry2.hasOwnProperty(property));
      if (entry)
        return entry[property];
    });
    const state = reactive({
      options: [
        { value: 1, name: "Grow" },
        { value: 0, name: "Don't Grow" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_icon = _sfc_main$A;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "" }, _attrs))}><h2 class="text-xs mb-2 opacity-40"> Flex Grow </h2><div class="${ssrRenderClass([[{ "opacity-60": !unref(isRealProperty) }], "flex items-center gap-2"])}"><!--[-->`);
      ssrRenderList(unref(state).options, (option) => {
        _push(`<button class="${ssrRenderClass([[{ "bg-white bg-opacity-20": unref(currentProperty) === option.value }], "rounded-sm hover:bg-white hover:bg-opacity-20 px-2 border border-darkOffwhite border-opacity-20"])}">${ssrInterpolate(option.name)}</button>`);
      });
      _push(`<!--]-->`);
      if (unref(isRealProperty)) {
        _push(`<button class="border border-red rounded-sm">`);
        _push(ssrRenderComponent(_component_nuxt_icon, {
          name: "icon-cross",
          class: "text-red text-xl"
        }, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$p = _sfc_main$p.setup;
_sfc_main$p.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/input/FlexGrow.vue");
  return _sfc_setup$p ? _sfc_setup$p(props, ctx) : void 0;
};
const _sfc_main$o = /* @__PURE__ */ defineComponent({
  __name: "FlexShrink",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarStore = useSidebarStore();
    const { componentCss, viewports, viewport } = storeToRefs(sidebarStore);
    const property = "flexShrink";
    const isRealProperty = computed(() => {
      var _a;
      const entry = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find((entry2) => entry2.hasOwnProperty(property));
      if (entry)
        return true;
      return false;
    });
    const currentProperty = computed(() => {
      var _a;
      const entry = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find((entry2) => entry2.hasOwnProperty(property));
      if (entry)
        return entry[property];
    });
    const state = reactive({
      options: [
        { value: 1, name: "Shrink" },
        { value: 0, name: "Don't Shrink" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_icon = _sfc_main$A;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "" }, _attrs))}><h2 class="text-xs mb-2 opacity-40"> Flex Shrink </h2><div class="${ssrRenderClass([[{ "opacity-60": !unref(isRealProperty) }], "flex items-center gap-2"])}"><!--[-->`);
      ssrRenderList(unref(state).options, (option) => {
        _push(`<button class="${ssrRenderClass([[{ "bg-white bg-opacity-20": unref(currentProperty) === option.value }], "rounded-sm hover:bg-white hover:bg-opacity-20 px-2 border border-darkOffwhite border-opacity-20"])}">${ssrInterpolate(option.name)}</button>`);
      });
      _push(`<!--]-->`);
      if (unref(isRealProperty)) {
        _push(`<button class="border border-red rounded-sm">`);
        _push(ssrRenderComponent(_component_nuxt_icon, {
          name: "icon-cross",
          class: "text-red text-xl"
        }, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$o = _sfc_main$o.setup;
_sfc_main$o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/input/FlexShrink.vue");
  return _sfc_setup$o ? _sfc_setup$o(props, ctx) : void 0;
};
const _sfc_main$n = /* @__PURE__ */ defineComponent({
  __name: "FlexDirection",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarStore = useSidebarStore();
    const { componentCss, viewports, viewport } = storeToRefs(sidebarStore);
    const property = "flexDirection";
    const isRealProperty = computed(() => {
      var _a;
      const entry = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find((entry2) => entry2.hasOwnProperty(property));
      if (entry)
        return true;
      return false;
    });
    const currentProperty = computed(() => {
      var _a;
      const entry = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find((entry2) => entry2.hasOwnProperty(property));
      if (entry)
        return entry[property];
    });
    const state = reactive({
      options: [
        { value: "row", name: "Row" },
        { value: "column", name: "Column" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_icon = _sfc_main$A;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "" }, _attrs))}><h2 class="text-xs mb-2 opacity-40"> Direction </h2><div class="${ssrRenderClass([[{ "opacity-60": !unref(isRealProperty) }], "flex items-center gap-2"])}"><!--[-->`);
      ssrRenderList(unref(state).options, (option) => {
        _push(`<button class="${ssrRenderClass([[{ "bg-white bg-opacity-20": unref(currentProperty) === option.value }], "rounded-sm hover:bg-white hover:bg-opacity-20 px-2 border border-darkOffwhite border-opacity-20"])}">${ssrInterpolate(option.name)}</button>`);
      });
      _push(`<!--]-->`);
      if (unref(isRealProperty)) {
        _push(`<button class="border border-red rounded-sm">`);
        _push(ssrRenderComponent(_component_nuxt_icon, {
          name: "icon-cross",
          class: "text-red text-xl"
        }, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/input/FlexDirection.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  __name: "AlignItems",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarStore = useSidebarStore();
    const { componentCss, viewports, viewport } = storeToRefs(sidebarStore);
    const property = "alignItems";
    const isRealProperty = computed(() => {
      var _a;
      const entry = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find((entry2) => entry2.hasOwnProperty(property));
      if (entry)
        return true;
      return false;
    });
    const currentProperty = computed(() => {
      var _a;
      const entry = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find((entry2) => entry2.hasOwnProperty(property));
      if (entry)
        return entry[property];
    });
    const state = reactive({
      options: [
        { value: "start", name: "Start" },
        { value: "center", name: "Center" },
        { value: "stretch", name: "Stretch" },
        { value: "end", name: "End" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_icon = _sfc_main$A;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "" }, _attrs))}><h2 class="text-xs mb-2 opacity-40"> Align Items </h2><div class="${ssrRenderClass([[{ "opacity-60": !unref(isRealProperty) }], "flex items-center gap-2"])}"><!--[-->`);
      ssrRenderList(unref(state).options, (option) => {
        _push(`<button class="${ssrRenderClass([[{ "bg-white bg-opacity-20": unref(currentProperty) === option.value }], "rounded-sm hover:bg-white hover:bg-opacity-20 px-2 border border-darkOffwhite border-opacity-20"])}">${ssrInterpolate(option.name)}</button>`);
      });
      _push(`<!--]-->`);
      if (unref(isRealProperty)) {
        _push(`<button class="border border-red rounded-sm">`);
        _push(ssrRenderComponent(_component_nuxt_icon, {
          name: "icon-cross",
          class: "text-red text-xl"
        }, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/input/AlignItems.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const _sfc_main$l = /* @__PURE__ */ defineComponent({
  __name: "JustifyContent",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarStore = useSidebarStore();
    const { componentCss, viewports, viewport } = storeToRefs(sidebarStore);
    const property = "justifyContent";
    const isRealProperty = computed(() => {
      var _a;
      const entry = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find((entry2) => entry2.hasOwnProperty(property));
      if (entry)
        return true;
      return false;
    });
    const currentProperty = computed(() => {
      var _a;
      const entry = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find((entry2) => entry2.hasOwnProperty(property));
      if (entry)
        return entry[property];
    });
    const state = reactive({
      options: [
        { value: "start", name: "Start" },
        { value: "center", name: "Center" },
        { value: "space-between", name: "Space Between" },
        { value: "space-around", name: "Space Around" },
        { value: "space-evenly", name: "Space Evenly" },
        { value: "end", name: "End" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_icon = _sfc_main$A;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "" }, _attrs))}><h2 class="text-xs mb-2 opacity-40"> Justify Content </h2><div class="${ssrRenderClass([[{ "opacity-60": !unref(isRealProperty) }], "flex items-center gap-2 flex-wrap"])}"><!--[-->`);
      ssrRenderList(unref(state).options, (option) => {
        _push(`<button class="${ssrRenderClass([[{ "bg-white bg-opacity-20": unref(currentProperty) === option.value }], "rounded-sm hover:bg-white hover:bg-opacity-20 px-2 border border-darkOffwhite border-opacity-20 whitespace-nowrap"])}">${ssrInterpolate(option.name)}</button>`);
      });
      _push(`<!--]-->`);
      if (unref(isRealProperty)) {
        _push(`<button class="border border-red rounded-sm">`);
        _push(ssrRenderComponent(_component_nuxt_icon, {
          name: "icon-cross",
          class: "text-red text-xl"
        }, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/input/JustifyContent.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  __name: "Columns",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarStore = useSidebarStore();
    const { componentCss, viewports, viewport } = storeToRefs(sidebarStore);
    const property = "columns";
    const isRealProperty = computed(() => {
      var _a;
      const entry = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find((entry2) => entry2.hasOwnProperty(property));
      if (entry)
        return true;
      return false;
    });
    const currentProperty = computed(() => {
      var _a;
      const entry = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find((entry2) => entry2.hasOwnProperty(property));
      if (entry)
        return entry[property];
    });
    const state = reactive({
      options: [
        { value: 1, name: "1 Column" },
        { value: 2, name: "2 Column" },
        { value: 3, name: "3 Column" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_icon = _sfc_main$A;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "" }, _attrs))}><h2 class="text-xs mb-2 opacity-40"> Text Columns </h2><div class="${ssrRenderClass([[{ "opacity-60": !unref(isRealProperty) }], "flex items-center gap-2"])}"><!--[-->`);
      ssrRenderList(unref(state).options, (option) => {
        _push(`<button class="${ssrRenderClass([[{ "bg-white bg-opacity-20": unref(currentProperty) === option.value }], "rounded-sm hover:bg-white hover:bg-opacity-20 px-2 border border-darkOffwhite border-opacity-20"])}">${ssrInterpolate(option.name)}</button>`);
      });
      _push(`<!--]-->`);
      if (unref(isRealProperty)) {
        _push(`<button class="border border-red rounded-sm">`);
        _push(ssrRenderComponent(_component_nuxt_icon, {
          name: "icon-cross",
          class: "text-red text-xl"
        }, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/input/Columns.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "ColumnGap",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarStore = useSidebarStore();
    const { componentCss, viewports, viewport } = storeToRefs(sidebarStore);
    const property = "columnGap";
    const isRealProperty = computed(() => {
      var _a;
      const entry = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find((entry2) => entry2.hasOwnProperty(property));
      if (entry)
        return true;
      return false;
    });
    const currentProperty = computed(() => {
      var _a;
      const entry = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find((entry2) => entry2.hasOwnProperty(property));
      if (entry)
        return entry[property];
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "" }, _attrs))}><h2 class="text-xs mb-2 opacity-40"> Column Gap </h2><div class="${ssrRenderClass([[{ "opacity-60": !unref(isRealProperty) }], "flex items-center gap-1"])}"><input${ssrRenderAttr("value", unref(currentProperty) ? parseInt(unref(currentProperty)) : null)} type="number" class="w-12 rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20"><span class="text-sm">px</span></div></div>`);
    };
  }
});
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/input/ColumnGap.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "TextAlign",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarStore = useSidebarStore();
    const { componentCss, viewports, viewport } = storeToRefs(sidebarStore);
    const property = "textAlign";
    const isRealProperty = computed(() => {
      var _a;
      const entry = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find((entry2) => entry2.hasOwnProperty(property));
      if (entry)
        return true;
      return false;
    });
    const currentProperty = computed(() => {
      var _a;
      const entry = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find((entry2) => entry2.hasOwnProperty(property));
      if (entry)
        return entry[property];
    });
    const state = reactive({
      options: [
        { id: 0, icon: "icon-left-aligned", value: "left" },
        { id: 1, icon: "icon-center-aligned", value: "center" },
        { id: 2, icon: "icon-right-aligned", value: "right" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_icon = _sfc_main$A;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "" }, _attrs))}><h2 class="text-xs mb-2 opacity-40"> Text Columns </h2><div class="${ssrRenderClass([[{ "opacity-60": !unref(isRealProperty) }], "flex items-center gap-2"])}"><!--[-->`);
      ssrRenderList(unref(state).options, (option) => {
        _push(`<button class="${ssrRenderClass([[{ "bg-white bg-opacity-20": unref(currentProperty) === option.value }], "rounded-sm hover:bg-white hover:bg-opacity-20 px-2 border border-darkOffwhite border-opacity-20"])}">`);
        _push(ssrRenderComponent(_component_nuxt_icon, {
          name: option.icon,
          class: "text-2xl"
        }, null, _parent));
        _push(`</button>`);
      });
      _push(`<!--]-->`);
      if (unref(isRealProperty)) {
        _push(`<button class="border border-red rounded-sm">`);
        _push(ssrRenderComponent(_component_nuxt_icon, {
          name: "icon-cross",
          class: "text-red text-xl"
        }, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/input/TextAlign.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "PaddingLeft",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarStore = useSidebarStore();
    const { componentCss, viewports, viewport } = storeToRefs(sidebarStore);
    const property = "paddingLeft";
    const isRealProperty = computed(() => {
      var _a;
      const entry = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find((entry2) => entry2.hasOwnProperty(property));
      if (entry)
        return true;
      return false;
    });
    const currentProperty = computed(() => {
      var _a;
      const entry = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find((entry2) => entry2.hasOwnProperty(property));
      if (entry)
        return entry[property];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_icon = _sfc_main$A;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "" }, _attrs))}><h2 class="text-xs mb-2 opacity-40"> Padding Left </h2>`);
      _push(ssrRenderComponent(_component_nuxt_icon, {
        name: "icon-padding-left",
        class: "block text-3xl -mt-1 -ml-1"
      }, null, _parent));
      _push(`<div class="${ssrRenderClass([[{ "opacity-60": !unref(isRealProperty) }], "flex items-center gap-1"])}"><input${ssrRenderAttr("value", unref(currentProperty) ? parseInt(unref(currentProperty)) : null)} type="number" class="w-12 rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20"><span class="text-sm">px</span></div></div>`);
    };
  }
});
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/input/PaddingLeft.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "PaddingTop",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarStore = useSidebarStore();
    const { componentCss, viewports, viewport } = storeToRefs(sidebarStore);
    const property = "paddingTop";
    const isRealProperty = computed(() => {
      var _a;
      const entry = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find((entry2) => entry2.hasOwnProperty(property));
      if (entry)
        return true;
      return false;
    });
    const currentProperty = computed(() => {
      var _a;
      const entry = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find((entry2) => entry2.hasOwnProperty(property));
      if (entry)
        return entry[property];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_icon = _sfc_main$A;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "" }, _attrs))}><h2 class="text-xs mb-2 opacity-40"> Padding Top </h2>`);
      _push(ssrRenderComponent(_component_nuxt_icon, {
        name: "icon-padding-top",
        class: "block text-3xl -mt-1 -ml-1"
      }, null, _parent));
      _push(`<div class="${ssrRenderClass([[{ "opacity-60": !unref(isRealProperty) }], "flex items-center gap-1"])}"><input${ssrRenderAttr("value", unref(currentProperty) ? parseInt(unref(currentProperty)) : null)} type="number" class="w-12 rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20"><span class="text-sm">px</span></div></div>`);
    };
  }
});
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/input/PaddingTop.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "PaddingRight",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarStore = useSidebarStore();
    const { componentCss, viewports, viewport } = storeToRefs(sidebarStore);
    const property = "paddingRight";
    const isRealProperty = computed(() => {
      var _a;
      const entry = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find((entry2) => entry2.hasOwnProperty(property));
      if (entry)
        return true;
      return false;
    });
    const currentProperty = computed(() => {
      var _a;
      const entry = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find((entry2) => entry2.hasOwnProperty(property));
      if (entry)
        return entry[property];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_icon = _sfc_main$A;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "" }, _attrs))}><h2 class="text-xs mb-2 opacity-40"> Padding Right </h2>`);
      _push(ssrRenderComponent(_component_nuxt_icon, {
        name: "icon-padding-right",
        class: "block text-3xl -mt-1 -ml-1"
      }, null, _parent));
      _push(`<div class="${ssrRenderClass([[{ "opacity-60": !unref(isRealProperty) }], "flex items-center gap-1"])}"><input${ssrRenderAttr("value", unref(currentProperty) ? parseInt(unref(currentProperty)) : null)} type="number" class="w-12 rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20"><span class="text-sm">px</span></div></div>`);
    };
  }
});
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/input/PaddingRight.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "PaddingBottom",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarStore = useSidebarStore();
    const { componentCss, viewports, viewport } = storeToRefs(sidebarStore);
    const property = "paddingBottom";
    const isRealProperty = computed(() => {
      var _a;
      const entry = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find((entry2) => entry2.hasOwnProperty(property));
      if (entry)
        return true;
      return false;
    });
    const currentProperty = computed(() => {
      var _a;
      const entry = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find((entry2) => entry2.hasOwnProperty(property));
      if (entry)
        return entry[property];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_icon = _sfc_main$A;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "" }, _attrs))}><h2 class="text-xs mb-2 opacity-40"> Padding Bottom </h2>`);
      _push(ssrRenderComponent(_component_nuxt_icon, {
        name: "icon-padding-bottom",
        class: "block text-3xl -mt-1 -ml-1"
      }, null, _parent));
      _push(`<div class="${ssrRenderClass([[{ "opacity-60": !unref(isRealProperty) }], "flex items-center gap-1"])}"><input${ssrRenderAttr("value", unref(currentProperty) ? parseInt(unref(currentProperty)) : null)} type="number" class="w-12 rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20"><span class="text-sm">px</span></div></div>`);
    };
  }
});
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/input/PaddingBottom.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "MarginLeft",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarStore = useSidebarStore();
    const { componentCss, viewports, viewport } = storeToRefs(sidebarStore);
    const property = "marginLeft";
    const isRealProperty = computed(() => {
      var _a;
      const entry = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find((entry2) => entry2.hasOwnProperty(property));
      if (entry)
        return true;
      return false;
    });
    const currentProperty = computed(() => {
      var _a;
      const entry = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find((entry2) => entry2.hasOwnProperty(property));
      if (entry)
        return entry[property];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_icon = _sfc_main$A;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "" }, _attrs))}><h2 class="text-xs mb-2 opacity-40"> Margin Left </h2>`);
      _push(ssrRenderComponent(_component_nuxt_icon, {
        name: "icon-margin-left",
        class: "block text-3xl -mt-1 -ml-1"
      }, null, _parent));
      _push(`<div class="${ssrRenderClass([[{ "opacity-60": !unref(isRealProperty) }], "flex items-center gap-1"])}"><input${ssrRenderAttr("value", unref(currentProperty) ? parseInt(unref(currentProperty)) : null)} type="number" class="w-12 rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20"><span class="text-sm">px</span></div></div>`);
    };
  }
});
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/input/MarginLeft.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "MarginTop",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarStore = useSidebarStore();
    const { componentCss, viewports, viewport } = storeToRefs(sidebarStore);
    const property = "marginTop";
    const isRealProperty = computed(() => {
      var _a;
      const entry = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find((entry2) => entry2.hasOwnProperty(property));
      if (entry)
        return true;
      return false;
    });
    const currentProperty = computed(() => {
      var _a;
      const entry = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find((entry2) => entry2.hasOwnProperty(property));
      if (entry)
        return entry[property];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_icon = _sfc_main$A;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "" }, _attrs))}><h2 class="text-xs mb-2 opacity-40"> Margin Top </h2>`);
      _push(ssrRenderComponent(_component_nuxt_icon, {
        name: "icon-margin-top",
        class: "block text-3xl -mt-1 -ml-1"
      }, null, _parent));
      _push(`<div class="${ssrRenderClass([[{ "opacity-60": !unref(isRealProperty) }], "flex items-center gap-1"])}"><input${ssrRenderAttr("value", unref(currentProperty) ? parseInt(unref(currentProperty)) : null)} type="number" class="w-12 rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20"><span class="text-sm">px</span></div></div>`);
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/input/MarginTop.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "MarginRight",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarStore = useSidebarStore();
    const { componentCss, viewports, viewport } = storeToRefs(sidebarStore);
    const property = "marginRight";
    const isRealProperty = computed(() => {
      var _a;
      const entry = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find((entry2) => entry2.hasOwnProperty(property));
      if (entry)
        return true;
      return false;
    });
    const currentProperty = computed(() => {
      var _a;
      const entry = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find((entry2) => entry2.hasOwnProperty(property));
      if (entry)
        return entry[property];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_icon = _sfc_main$A;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "" }, _attrs))}><h2 class="text-xs mb-2 opacity-40"> Margin Right </h2>`);
      _push(ssrRenderComponent(_component_nuxt_icon, {
        name: "icon-margin-right",
        class: "block text-3xl -mt-1 -ml-1"
      }, null, _parent));
      _push(`<div class="${ssrRenderClass([[{ "opacity-60": !unref(isRealProperty) }], "flex items-center gap-1"])}"><input${ssrRenderAttr("value", unref(currentProperty) ? parseInt(unref(currentProperty)) : null)} type="number" class="w-12 rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20"><span class="text-sm">px</span></div></div>`);
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/input/MarginRight.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "MarginBottom",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarStore = useSidebarStore();
    const { componentCss, viewports, viewport } = storeToRefs(sidebarStore);
    const property = "marginBottom";
    const isRealProperty = computed(() => {
      var _a;
      const entry = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find((entry2) => entry2.hasOwnProperty(property));
      if (entry)
        return true;
      return false;
    });
    const currentProperty = computed(() => {
      var _a;
      const entry = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find((entry2) => entry2.hasOwnProperty(property));
      if (entry)
        return entry[property];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_icon = _sfc_main$A;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "" }, _attrs))}><h2 class="text-xs mb-2 opacity-40"> Margin Bottom </h2>`);
      _push(ssrRenderComponent(_component_nuxt_icon, {
        name: "icon-margin-bottom",
        class: "block text-3xl -mt-1 -ml-1"
      }, null, _parent));
      _push(`<div class="${ssrRenderClass([[{ "opacity-60": !unref(isRealProperty) }], "flex items-center gap-1"])}"><input${ssrRenderAttr("value", unref(currentProperty) ? parseInt(unref(currentProperty)) : null)} type="number" class="w-12 rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20"><span class="text-sm">px</span></div></div>`);
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/input/MarginBottom.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "FontFamily",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarStore = useSidebarStore();
    const { componentCss, viewports, viewport } = storeToRefs(sidebarStore);
    const property = "fontFamily";
    const isRealProperty = computed(() => {
      var _a;
      const entry = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find((entry2) => entry2.hasOwnProperty(property));
      if (entry)
        return true;
      return false;
    });
    const currentProperty = computed(() => {
      var _a;
      const entry = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find((entry2) => entry2.hasOwnProperty(property));
      if (entry)
        return entry[property];
    });
    const state = reactive({
      options: [
        { value: "Heading, serif", name: "Silk Serif" },
        { value: "Inter, sans-serif", name: "Inter" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_icon = _sfc_main$A;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "" }, _attrs))}><h2 class="text-xs mb-2 opacity-40"> Font </h2><div class="${ssrRenderClass([[{ "opacity-60": !unref(isRealProperty) }], "flex items-center gap-2"])}"><!--[-->`);
      ssrRenderList(unref(state).options, (option) => {
        _push(`<button class="${ssrRenderClass([[{ "bg-white bg-opacity-20": unref(currentProperty) === option.value }], "rounded-sm hover:bg-white hover:bg-opacity-20 px-2 border border-darkOffwhite border-opacity-20"])}">${ssrInterpolate(option.name)}</button>`);
      });
      _push(`<!--]-->`);
      if (unref(isRealProperty)) {
        _push(`<button class="border border-red rounded-sm">`);
        _push(ssrRenderComponent(_component_nuxt_icon, {
          name: "icon-cross",
          class: "text-red text-xl"
        }, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/input/FontFamily.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "FontWeight",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarStore = useSidebarStore();
    const { componentCss, viewports, viewport } = storeToRefs(sidebarStore);
    const property = "fontWeight";
    const isRealProperty = computed(() => {
      var _a;
      const entry = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find((entry2) => entry2.hasOwnProperty(property));
      if (entry)
        return true;
      return false;
    });
    const currentProperty = computed(() => {
      var _a;
      const entry = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find((entry2) => entry2.hasOwnProperty(property));
      if (entry)
        return entry[property];
    });
    const state = reactive({
      options: [
        { value: 300, name: "Light" },
        { value: 400, name: "Regular" },
        { value: 700, name: "Bold" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_icon = _sfc_main$A;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "" }, _attrs))}><h2 class="text-xs mb-2 opacity-40"> Font Weight </h2><div class="${ssrRenderClass([[{ "opacity-60": !unref(isRealProperty) }], "flex items-center gap-2"])}"><!--[-->`);
      ssrRenderList(unref(state).options, (option) => {
        _push(`<button class="${ssrRenderClass([[{ "bg-white bg-opacity-20": unref(currentProperty) === option.value }], "rounded-sm hover:bg-white hover:bg-opacity-20 px-2 border border-darkOffwhite border-opacity-20"])}">${ssrInterpolate(option.name)}</button>`);
      });
      _push(`<!--]-->`);
      if (unref(isRealProperty)) {
        _push(`<button class="border border-red rounded-sm">`);
        _push(ssrRenderComponent(_component_nuxt_icon, {
          name: "icon-cross",
          class: "text-red text-xl"
        }, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/input/FontWeight.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "FontSize",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarStore = useSidebarStore();
    const { componentCss, viewports, viewport } = storeToRefs(sidebarStore);
    const property = "fontSize";
    const isRealProperty = computed(() => {
      var _a;
      const entry = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find((entry2) => entry2.hasOwnProperty(property));
      if (entry)
        return true;
      return false;
    });
    const currentProperty = computed(() => {
      var _a;
      const entry = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find((entry2) => entry2.hasOwnProperty(property));
      if (entry)
        return entry[property];
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "" }, _attrs))}><h2 class="text-xs mb-2 opacity-40"> Font Size </h2><div class="${ssrRenderClass([[{ "opacity-60": !unref(isRealProperty) }], "flex items-center gap-1"])}"><input${ssrRenderAttr("value", unref(currentProperty) ? parseInt(unref(currentProperty)) : null)} type="number" class="w-12 rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20"><span class="text-sm">px</span></div></div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/input/FontSize.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "LineHeight",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarStore = useSidebarStore();
    const { componentCss, viewports, viewport } = storeToRefs(sidebarStore);
    const property = "lineHeight";
    const isRealProperty = computed(() => {
      var _a;
      const entry = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find((entry2) => entry2.hasOwnProperty(property));
      if (entry)
        return true;
      return false;
    });
    const currentProperty = computed(() => {
      var _a;
      const entry = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find((entry2) => entry2.hasOwnProperty(property));
      if (entry)
        return entry[property];
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "" }, _attrs))}><h2 class="text-xs mb-2 opacity-40"> Line Height </h2><div class="${ssrRenderClass([[{ "opacity-60": !unref(isRealProperty) }], "flex items-center gap-1"])}"><input${ssrRenderAttr("value", unref(currentProperty) ? parseInt(unref(currentProperty)) : null)} type="number" class="w-12 rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20"><span class="text-sm">%</span></div></div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/input/LineHeight.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
usePocketBase();
const useValidationStore = defineStore("validationStore", {
  state: () => ({}),
  actions: {
    // setComponentId(payload: string) {
    //   this.componentId = payload;
    // },
    isHexColor(payload) {
      if (payload[0] === "#" && (payload.length === 4 || payload.length === 7)) {
        const hex = payload.slice(1);
        return [...hex].every((char) => /[0-9a-f]/i.test(char));
      }
      return false;
    }
  }
});
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "ColorPicker",
  __ssrInlineRender: true,
  props: {
    color: { default: "#000000" }
  },
  emits: ["setColor", "deleteColor"],
  setup(__props, { emit }) {
    const props = __props;
    useValidationStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_icon = _sfc_main$A;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center" }, _attrs))}><input type="color"${ssrRenderAttr("value", props.color)} class="rounded-sm w-6 h-6 mr-2"><div><input type="text"${ssrRenderAttr("value", props.color)} class="rounded-sm h-6 w-20 mr-2 bg-transparent border border-darkOffwhite border-opacity-20"></div><button class="border border-red rounded-sm">`);
      _push(ssrRenderComponent(_component_nuxt_icon, {
        name: "icon-cross",
        class: "text-red text-xl"
      }, null, _parent));
      _push(`</button></div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/input/ColorPicker.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "Color",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarStore = useSidebarStore();
    const { componentCss, viewports, viewport } = storeToRefs(sidebarStore);
    const { saveCssClasses, setProperty, deleteProperty } = sidebarStore;
    const property = "color";
    const isRealColor = computed(() => {
      var _a;
      const entry = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find((entry2) => entry2.hasOwnProperty(property));
      if (entry)
        return true;
      return false;
    });
    const currentColor = computed(() => {
      var _a;
      const entry = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find((entry2) => entry2.hasOwnProperty(property));
      if (entry)
        return entry[property];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_InputColorPicker = _sfc_main$5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "" }, _attrs))}><h2 class="text-xs mb-2 opacity-40"> Font Color </h2>`);
      _push(ssrRenderComponent(_component_InputColorPicker, {
        color: unref(currentColor),
        onDeleteColor: ($event) => unref(deleteProperty)(property),
        onSetColor: ($event) => unref(setProperty)(property, $event),
        class: [unref(isRealColor) ? "opacity-100" : "opacity-20"]
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/input/Color.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "BackgroundColor",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarStore = useSidebarStore();
    const { componentCss, viewports, viewport } = storeToRefs(sidebarStore);
    const { saveBlock, setProperty, deleteProperty } = sidebarStore;
    const property = "background";
    const isRealColor = computed(() => {
      var _a;
      const entry = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find(
        (entry2) => entry2.hasOwnProperty(property)
      );
      if (entry)
        return true;
      return false;
    });
    const currentColor = computed(() => {
      var _a;
      const entry = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find(
        (entry2) => entry2.hasOwnProperty(property)
      );
      if (entry)
        return entry[property];
    });
    const state = reactive({
      swatches: [
        {
          id: 0,
          name: "darkGreen",
          value: "radial-gradient(circle, rgba(2,55,41,1) 0%, rgba(0,31,31,1) 60%, rgba(53,65,30,1) 100%)"
        },
        {
          id: 1,
          name: "gold",
          value: "linear-gradient(180deg, rgba(227,200,121,1) 0%, rgba(251,244,138,1) 40%, rgba(155,108,28,1) 100%)"
        },
        {
          id: 2,
          name: "darkGreenLinear",
          value: "linear-gradient(30deg, rgba(2, 55, 41, 1) 0%, rgba(0, 31, 31, 1) 60%)"
        },
        {
          id: 3,
          name: "creamLinear",
          value: "linear-gradient(20deg, rgba(243,240,236,1) 0%, rgba(249,247,245,1) 60%)"
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_InputColorPicker = _sfc_main$5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "" }, _attrs))}><h2 class="text-xs mb-2 opacity-40">Background Color</h2>`);
      _push(ssrRenderComponent(_component_InputColorPicker, {
        color: unref(currentColor),
        onDeleteColor: ($event) => unref(deleteProperty)(property),
        onSetColor: ($event) => unref(setProperty)(property, $event),
        class: [[unref(isRealColor) ? "opacity-100" : "opacity-20"], "mb-2"]
      }, null, _parent));
      _push(`<div class="flex items-center gap-2"><!--[-->`);
      ssrRenderList(unref(state).swatches, (swatch, index) => {
        _push(`<button class="w-6 h-6 border border-offwhite border-opacity-10 rounded-sm" style="${ssrRenderStyle([{ background: swatch.value }])}"></button>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/input/BackgroundColor.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Width",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarStore = useSidebarStore();
    const { componentCss, viewports, viewport } = storeToRefs(sidebarStore);
    const property = "width";
    const isRealProperty = computed(() => {
      var _a;
      const entry = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find((entry2) => entry2.hasOwnProperty(property));
      if (entry)
        return true;
      return false;
    });
    const currentProperty = computed(() => {
      var _a;
      const entry = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find((entry2) => entry2.hasOwnProperty(property));
      if (entry)
        return entry[property];
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "" }, _attrs))}><h2 class="text-xs mb-2 opacity-40"> Width </h2><div class="${ssrRenderClass([[{ "opacity-60": !unref(isRealProperty) }], "flex items-center gap-1"])}"><input${ssrRenderAttr("value", unref(currentProperty) ? parseInt(unref(currentProperty)) : null)} type="number" class="w-12 rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20"><span class="text-sm">%</span></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/input/Width.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "MaxWidth",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarStore = useSidebarStore();
    const { componentCss, viewports, viewport } = storeToRefs(sidebarStore);
    const property = "maxWidth";
    const isRealProperty = computed(() => {
      var _a;
      const entry = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find(
        (entry2) => entry2.hasOwnProperty(property)
      );
      if (entry)
        return true;
      return false;
    });
    const removeNumbersFromString = (str) => {
      var result = "";
      for (var i = 0; i < str.length; i++) {
        if (isNaN(Number(str[i]))) {
          result += str[i];
        }
      }
      return result;
    };
    const currentProperty = computed(() => {
      var _a;
      const entry = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find(
        (entry2) => entry2.hasOwnProperty(property)
      );
      if (entry)
        return entry[property];
    });
    const currentUnit = computed(() => {
      if (!currentProperty.value)
        return null;
      return removeNumbersFromString(currentProperty.value);
    });
    const currentValue = computed(() => {
      if (!currentProperty.value)
        return null;
      return currentProperty.value.split(currentUnit.value)[0];
    });
    ref();
    ref();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "" }, _attrs))}><h2 class="text-xs mb-2 opacity-40">Max Width</h2><div class="${ssrRenderClass([[{ "opacity-60": !unref(isRealProperty) }], "flex items-center gap-1"])}"><input${ssrRenderAttr("value", unref(currentValue) ? parseFloat(unref(currentValue)) : null)} type="number" class="w-12 rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20"><select${ssrRenderAttr("value", unref(currentUnit) ? unref(currentUnit) : null)} class="rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 text-white"><option value="em"${ssrIncludeBooleanAttr(unref(currentUnit) === "em") ? " selected" : ""}>em</option><option value="%"${ssrIncludeBooleanAttr(unref(currentUnit) === "%") ? " selected" : ""}>%</option></select></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/input/MaxWidth.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Block",
  __ssrInlineRender: true,
  props: {
    selectedMode: { default: 0 }
  },
  emits: ["setContentType"],
  setup(__props, { emit }) {
    const props = __props;
    const sidebarStore = useSidebarStore();
    usePocketBase();
    const { componentCss, viewport, componentContentType } = storeToRefs(sidebarStore);
    const displayCssValue = computed(() => {
      var _a, _b;
      return (_b = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find((entry) => entry.hasOwnProperty("display"))) == null ? void 0 : _b.display;
    });
    const columnsCssValue = computed(() => {
      var _a, _b;
      return (_b = (_a = componentCss.value[viewport.value]) == null ? void 0 : _a.find((entry) => entry.hasOwnProperty("columns"))) == null ? void 0 : _b.columns;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_InputBlockSelector = _sfc_main$x;
      const _component_InputMaxContainer = _sfc_main$w;
      const _component_InputMaxContainerBackground = _sfc_main$v;
      const _component_InputContentMarkdown = _sfc_main$u;
      const _component_InputContentCallToAction = _sfc_main$t;
      const _component_InputBlockChildren = _sfc_main$s;
      const _component_InputViewportSelector = _sfc_main$r;
      const _component_InputDisplay = _sfc_main$q;
      const _component_InputFlexGrow = _sfc_main$p;
      const _component_InputFlexShrink = _sfc_main$o;
      const _component_InputFlexDirection = _sfc_main$n;
      const _component_InputAlignItems = _sfc_main$m;
      const _component_InputJustifyContent = _sfc_main$l;
      const _component_InputColumns = _sfc_main$k;
      const _component_InputColumnGap = _sfc_main$j;
      const _component_InputTextAlign = _sfc_main$i;
      const _component_InputPaddingLeft = _sfc_main$h;
      const _component_InputPaddingTop = _sfc_main$g;
      const _component_InputPaddingRight = _sfc_main$f;
      const _component_InputPaddingBottom = _sfc_main$e;
      const _component_InputMarginLeft = _sfc_main$d;
      const _component_InputMarginTop = _sfc_main$c;
      const _component_InputMarginRight = _sfc_main$b;
      const _component_InputMarginBottom = _sfc_main$a;
      const _component_InputFontFamily = _sfc_main$9;
      const _component_InputFontWeight = _sfc_main$8;
      const _component_InputFontSize = _sfc_main$7;
      const _component_InputLineHeight = _sfc_main$6;
      const _component_InputColor = _sfc_main$4;
      const _component_InputBackgroundColor = _sfc_main$3;
      const _component_InputWidth = _sfc_main$2;
      const _component_InputMaxWidth = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (props.selectedMode === 0) {
        _push(`<div>`);
        _push(ssrRenderComponent(_component_InputBlockSelector, { class: "border-b border-darkOffwhite border-opacity-20" }, null, _parent));
        _push(ssrRenderComponent(_component_InputMaxContainer, null, null, _parent));
        _push(ssrRenderComponent(_component_InputMaxContainerBackground, null, null, _parent));
        if (unref(componentContentType) === "markdown") {
          _push(ssrRenderComponent(_component_InputContentMarkdown, null, null, _parent));
        } else {
          _push(`<!---->`);
        }
        if (unref(componentContentType) === "calltoaction") {
          _push(ssrRenderComponent(_component_InputContentCallToAction, null, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_component_InputBlockChildren, null, null, _parent));
        _push(`</div>`);
      } else if (props.selectedMode === 1) {
        _push(`<div>`);
        _push(ssrRenderComponent(_component_InputViewportSelector, null, null, _parent));
        _push(ssrRenderComponent(_component_InputDisplay, { class: "mb-4 px-4" }, null, _parent));
        _push(ssrRenderComponent(_component_InputFlexGrow, { class: "mb-4 px-4" }, null, _parent));
        _push(ssrRenderComponent(_component_InputFlexShrink, { class: "mb-4 px-4" }, null, _parent));
        if (unref(displayCssValue) === "flex") {
          _push(`<!--[-->`);
          _push(ssrRenderComponent(_component_InputFlexDirection, { class: "mb-4 px-4" }, null, _parent));
          _push(ssrRenderComponent(_component_InputAlignItems, { class: "mb-4 px-4" }, null, _parent));
          _push(ssrRenderComponent(_component_InputJustifyContent, { class: "mb-4 px-4" }, null, _parent));
          _push(`<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_component_InputColumns, { class: "mb-4 px-4" }, null, _parent));
        if (unref(columnsCssValue)) {
          _push(ssrRenderComponent(_component_InputColumnGap, { class: "mb-4 px-4" }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_component_InputTextAlign, { class: "mb-4 px-4" }, null, _parent));
        _push(`<div class="mb-4 px-4 flex gap-2">`);
        _push(ssrRenderComponent(_component_InputPaddingLeft, null, null, _parent));
        _push(ssrRenderComponent(_component_InputPaddingTop, null, null, _parent));
        _push(ssrRenderComponent(_component_InputPaddingRight, null, null, _parent));
        _push(ssrRenderComponent(_component_InputPaddingBottom, null, null, _parent));
        _push(`</div><div class="mb-4 px-4 flex gap-2">`);
        _push(ssrRenderComponent(_component_InputMarginLeft, null, null, _parent));
        _push(ssrRenderComponent(_component_InputMarginTop, null, null, _parent));
        _push(ssrRenderComponent(_component_InputMarginRight, null, null, _parent));
        _push(ssrRenderComponent(_component_InputMarginBottom, null, null, _parent));
        _push(`</div>`);
        _push(ssrRenderComponent(_component_InputFontFamily, { class: "mb-4 px-4" }, null, _parent));
        _push(ssrRenderComponent(_component_InputFontWeight, { class: "mb-4 px-4" }, null, _parent));
        _push(`<div class="flex items-center mb-4 px-4 gap-4">`);
        _push(ssrRenderComponent(_component_InputFontSize, { class: "" }, null, _parent));
        _push(ssrRenderComponent(_component_InputLineHeight, { class: "" }, null, _parent));
        _push(`</div>`);
        _push(ssrRenderComponent(_component_InputColor, { class: "mb-4 px-4" }, null, _parent));
        _push(ssrRenderComponent(_component_InputBackgroundColor, { class: "mb-4 px-4" }, null, _parent));
        _push(ssrRenderComponent(_component_InputWidth, { class: "mb-4 px-4" }, null, _parent));
        _push(ssrRenderComponent(_component_InputMaxWidth, { class: "mb-4 px-4" }, null, _parent));
        _push(`</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/Sidebar/Block.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=Block-b0c2c40a.mjs.map
