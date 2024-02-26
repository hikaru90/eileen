import { useSSRContext, defineComponent, withAsyncContext, computed, mergeProps, unref, reactive } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';
import { u as useAuthStore, d as usePocketBase, e as useContentStore, b as useSidebarStore } from './server.mjs';
import _sfc_main$2 from './nuxt-icon-5eb3d977.mjs';

const _sfc_main$1 = {
  __name: "EditorBar",
  __ssrInlineRender: true,
  setup(__props) {
    const authStore = useAuthStore();
    useContentStore();
    useSidebarStore();
    const data = reactive({
      modalVisible: false
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-coffee text-darkOffwhite py-4" }, _attrs))}><div class="max-container"><div class="flex items-center justify-between"><div>${ssrInterpolate((_b = (_a = unref(authStore)) == null ? void 0 : _a.user) == null ? void 0 : _b.name)}</div><div class="flex items-center"><button class="rounded-sm border border-lightBlue px-3 py-1 mx-2"> Home </button><button class="rounded-sm border border-lightBlue px-3 py-1 mx-2"> Debug </button><button class="rounded-sm border border-lightBlue px-3 py-1 mx-2"> Buchungen verwalten </button></div></div></div>`);
      if (unref(data).modalVisible) {
        _push(`<div class="fixed bg-lilac w-full h-full top-0 left-0 py-4"><div class="max-container"></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/EditorBar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = _sfc_main$1;
const groupBy = (collection, property) => {
  var i = 0, val, index, values = [], result = [];
  for (; i < collection.length; i++) {
    val = collection[i][property];
    index = values.indexOf(val);
    if (index > -1)
      result[index].push(collection[i]);
    else {
      values.push(val);
      result.push([collection[i]]);
    }
  }
  return result;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Footer",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const authStore = useAuthStore();
    const { pb } = usePocketBase();
    const records = ([__temp, __restore] = withAsyncContext(() => pb.collection("pages").getFullList(200, {
      sort: "-created",
      expand: "subpages"
    })), __temp = await __temp, __restore(), __temp);
    const footerItems = computed(() => {
      const value = groupBy(
        records.filter((record) => record.footerGroup.length > 0),
        "footerGroup"
      ).sort((a, b) => a[0].footerGroup > b[0].footerGroup ? 1 : -1);
      return value;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_icon = _sfc_main$2;
      _push(`<footer${ssrRenderAttrs(mergeProps({
        style: { "background": "linear-gradient(30deg, #F6F4F2 0%, #F9F2ED 60%)" },
        class: "py-20 text-coffee"
      }, _attrs))}><div class="max-container"><div class="flex flex-col md:flex-row justify-between gap-10"><div class="w-full md:w-1/5"><h2 class="font-bold opacity-60 mb-2 md:mb-6"> Privatpraxis<br></h2><p style="${ssrRenderStyle({ "line-height": "37px" })}" class=""> Eileen George<br> Paar- und Sexualtherapeutin &amp; Beziehungscoach<br> Breitscheidstra\xDFe 33<br> 70176 Stuttgart<br></p></div><!--[-->`);
      ssrRenderList(unref(footerItems), (column) => {
        _push(`<div class=""><h2 class="font-bold opacity-60 mb-2 md:mb-6">${ssrInterpolate(column[0].footerGroup)}</h2><div class="flex flex-col gap-2 md:gap-4"><!--[-->`);
        ssrRenderList(column, (link) => {
          _push(`<a${ssrRenderAttr("href", `/${link.slug}`)} class="">${ssrInterpolate(link.title)}</a>`);
        });
        _push(`<!--]--></div></div>`);
      });
      _push(`<!--]--></div><div class="mt-16 text-sm flex justify-between"><span class="opacity-60"> \xA9 ${ssrInterpolate(( new Date()).getFullYear())} \u2014 Eileen George </span><div>`);
      if (unref(authStore).token) {
        _push(`<button aria-label="Anmelden" class="text-red flex items-center">`);
        _push(ssrRenderComponent(_component_nuxt_icon, {
          name: "icon-cross",
          class: "text-2xl"
        }, null, _parent));
        _push(` Ausloggen </button>`);
      } else {
        _push(`<a href="/login" class="text-gold">`);
        _push(ssrRenderComponent(_component_nuxt_icon, {
          name: "icon-dashboard",
          class: "text-2xl"
        }, null, _parent));
        _push(`</a>`);
      }
      _push(`</div></div></div></footer>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Footer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { __nuxt_component_0 as _, _sfc_main as a };
//# sourceMappingURL=Footer-6f3c9e0f.mjs.map
