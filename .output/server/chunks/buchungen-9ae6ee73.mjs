import _sfc_main$4 from './nuxt-icon-8914e1be.mjs';
import { u as useAuthStore, d as usePocketBase } from './server.mjs';
import { useSSRContext, defineComponent, reactive, computed, withAsyncContext, unref, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderStyle, ssrGetDirectiveProps } from 'vue/server-renderer';
import { v as vOnClickOutside } from './index-4dc78d0f.mjs';
import { u as useBrevo } from './useBrevo-e20f6334.mjs';
import { d as defaults$1 } from './defaults-65aa47ff.mjs';
import { u as useAsyncData, r as refreshNuxtData } from './asyncData-a00119f5.mjs';
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

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "BookingBlockCreator",
  __ssrInlineRender: true,
  emits: ["createdBlock"],
  setup(__props, { emit }) {
    usePocketBase();
    const state = reactive({
      booking: {
        start: void 0,
        end: void 0
      },
      deletionConfirmed: false
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_icon = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "border border-dashed border-darkGrey border-opacity-40 rounded pl-4 p-2 flex items-center justify-between" }, _attrs))}><div class="">Neuen Block erstellen</div><div class="flex items-center gap-4"><div class="flex items-center gap-2"><input type="datetime-local"${ssrRenderAttr("value", unref(state).booking.start)} class="border border-grey border-opacity-20 rounded px-4 py-1"> - <input type="datetime-local"${ssrRenderAttr("value", unref(state).booking.end)} class="border border-grey border-opacity-20 rounded px-4 py-1"></div><button class="border-2 border-green hover:border-green/50 text-green hover:text-green/70 rounded px-4 py-1 flex items-center">`);
      _push(ssrRenderComponent(_component_nuxt_icon, {
        name: "icon-trash",
        class: "text-2xl -ml-2"
      }, null, _parent));
      _push(` Erstellen </button></div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BookingBlockCreator.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "BookingBlock",
  __ssrInlineRender: true,
  props: {
    booking: null
  },
  emits: ["refreshBookings"],
  setup(__props, { emit }) {
    usePocketBase();
    const getDateString = (dateString) => {
      const date = new Date(dateString.split(".")[0]);
      return date.toLocaleDateString("de-DE", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
      });
    };
    const cancelDeletion = () => {
      state.deletionConfirmed = false;
    };
    const state = reactive({
      deletionConfirmed: false
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_icon = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "border border-grey bg-gradient-to-r from-grey to-offwhite rounded p-4 flex items-center justify-between" }, _attrs))}><div class="text-darkOffwhite">Block</div><div class="flex items-center gap-4"><div class="flex items-center gap-2"><span class="border border-darkGrey px-2 rounded">${ssrInterpolate(getDateString(__props.booking.start))}</span> - <span class="border border-darkGrey px-2 rounded">${ssrInterpolate(getDateString(__props.booking.end))}</span></div><button style="${ssrRenderStyle(!unref(state).deletionConfirmed ? null : { display: "none" })}" class="border-2 border-lightRed hover:border-lightRed/50 text-lightRed hover:text-lightRed/70 rounded px-4 py-1 flex items-center">`);
      _push(ssrRenderComponent(_component_nuxt_icon, {
        name: "icon-trash",
        class: "text-2xl -ml-2"
      }, null, _parent));
      _push(` L\xF6schen </button><button${ssrRenderAttrs(mergeProps({
        style: unref(state).deletionConfirmed ? null : { display: "none" },
        class: "border-2 border-lightRed hover:border-lightRed/50 text-lightRed hover:text-lightRed/70 rounded px-4 py-1 flex items-center"
      }, ssrGetDirectiveProps(_ctx, unref(vOnClickOutside), cancelDeletion)))}>`);
      _push(ssrRenderComponent(_component_nuxt_icon, {
        name: "icon-check",
        class: "text-2xl -ml-2"
      }, null, _parent));
      _push(` Sicher? </button></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BookingBlock.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "BookingAppointment",
  __ssrInlineRender: true,
  props: {
    booking: null
  },
  emits: ["refreshBookings"],
  setup(__props, { emit }) {
    const props = __props;
    usePocketBase();
    useBrevo();
    const getDateString = (dateString) => {
      const date = new Date(dateString.split(".")[0]);
      return date.toLocaleDateString("de-DE", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
      });
    };
    const prettifyAppointmentType = (payload) => {
      var _a, _b;
      const value = (_b = (_a = defaults$1.find((e) => e.type === "appointmentTypes").options) == null ? void 0 : _a.find((option) => option.value === payload)) == null ? void 0 : _b.label;
      return value;
    };
    const prettifyService = (payload) => {
      var _a, _b;
      const value = (_b = (_a = defaults$1.find((e) => e.type === "services").options) == null ? void 0 : _a.find((option) => option.value === payload)) == null ? void 0 : _b.label;
      return value;
    };
    const cancelDeletion = () => {
      state.deletionConfirmed = false;
    };
    const state = reactive({
      deletionConfirmed: false,
      isOpen: false,
      formEntries: [
        { name: "Vorname", value: props.booking.firstName },
        { name: "Nachname", value: props.booking.lastName },
        { name: "E-Mail", value: props.booking.mail },
        { name: "Telefonnummer", value: props.booking.phone },
        { name: "Terminart", value: prettifyAppointmentType(props.booking.appointmentType) },
        { name: "Leistung", value: prettifyService(props.booking.service) },
        { name: "Ort", value: props.booking.place },
        { name: "Thema", value: props.booking.description },
        { name: "Rechnungsadresse", value: props.booking.invoiceAddress }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_icon = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: [[
          props.booking.deleted ? "bg-red opacity-20" : "",
          props.booking.confirmed ? "bg-green" : "",
          { "bg-offwhite": !props.booking.deleted && !props.booking.confirmed }
        ], "select-none border border-darkGrey border-opacity-40 rounded"]
      }, _attrs))}><button aria-label="Buchung \xF6ffnen" class="w-full flex items-center justify-between p-4"><div class="flex items-center"><div>Buchung</div>`);
      if (!unref(state).isOpen) {
        _push(ssrRenderComponent(_component_nuxt_icon, {
          name: "icon-triangle_down",
          class: "text-xl"
        }, null, _parent));
      } else {
        _push(ssrRenderComponent(_component_nuxt_icon, {
          name: "icon-triangle_up",
          class: "text-xl"
        }, null, _parent));
      }
      _push(`</div><div class="flex items-center gap-2"><span class="border border-darkGrey px-2 rounded">${ssrInterpolate(getDateString(__props.booking.start))}</span> - <span class="border border-darkGrey px-2 rounded">${ssrInterpolate(getDateString(__props.booking.end))}</span></div></button>`);
      if (unref(state).isOpen) {
        _push(`<div class="p-4 border-t border-grey border-opacity-20 flex flex-col"><div><!--[-->`);
        ssrRenderList(unref(state).formEntries, (entry, index) => {
          _push(`<div class="flex items-center justify-between border-b border-grey border-opacity-20 last:border-b-0 py-1 px-2"><div class="">${ssrInterpolate(entry.name)}</div><div class="">${ssrInterpolate(entry.value)}</div></div>`);
        });
        _push(`<!--]--></div>`);
        if (props.booking.deleted) {
          _push(`<div class="bg-white rounded p-2 shadow-lg mt-4 flex items-center justify-center"><button class="border-2 border-sand/70 hover:border-sand text-coffee/70 hover:text-coffee rounded px-4 py-1 flex items-center"> Reaktivieren </button></div>`);
        } else if (props.booking.confirmed) {
          _push(`<div class="bg-white rounded p-2 shadow-lg mt-4 flex items-center justify-center"> Best\xE4tigt </div>`);
        } else {
          _push(`<div class="bg-white rounded p-2 shadow-lg mt-4 flex items-center justify-between"><button style="${ssrRenderStyle(!unref(state).deletionConfirmed ? null : { display: "none" })}" class="border-2 border-red/50 hover:border-red text-red/70 hover:text-red rounded px-4 py-1 flex items-center">`);
          _push(ssrRenderComponent(_component_nuxt_icon, {
            name: "icon-trash",
            class: "text-2xl -ml-2"
          }, null, _parent));
          _push(` L\xF6schen </button><button${ssrRenderAttrs(mergeProps({
            style: unref(state).deletionConfirmed ? null : { display: "none" },
            class: "border-2 border-red/50 hover:border-red text-red/70 hover:text-red rounded px-4 py-1 flex items-center"
          }, ssrGetDirectiveProps(_ctx, unref(vOnClickOutside), cancelDeletion)))}>`);
          _push(ssrRenderComponent(_component_nuxt_icon, {
            name: "icon-check",
            class: "text-2xl -ml-2"
          }, null, _parent));
          _push(` Sicher? </button><button class="border-2 border-green/70 hover:border-green text-green/70 hover:text-green rounded px-4 py-1 flex items-center">`);
          _push(ssrRenderComponent(_component_nuxt_icon, {
            name: "icon-check",
            class: "text-2xl -ml-2"
          }, null, _parent));
          _push(` Best\xE4tigen </button></div>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BookingAppointment.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "buchungen",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const authStore = useAuthStore();
    const { pb } = usePocketBase();
    const getDateFilter = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      String(date.getHours()).padStart(2, "0");
      String(date.getMinutes()).padStart(2, "0");
      String(date.getSeconds()).padStart(2, "0");
      const dateTime = `${year}-${month}-${day}`;
      return dateTime;
    };
    const getTimeFilter = (date) => {
      const noUtcDate = date;
      const hours = String(noUtcDate.getHours()).padStart(2, "0");
      const minutes = String(noUtcDate.getMinutes()).padStart(2, "0");
      const seconds = String(noUtcDate.getSeconds()).padStart(2, "0");
      const dateTime = `${hours}:${minutes}:${seconds}`;
      return dateTime;
    };
    const getMoringOfDate = (date) => new Date(new Date(date).setHours(0, 0, 0));
    const getEveningOfDate = (date) => new Date(new Date(date).setHours(23, 59, 59));
    const state = reactive({
      start: getMoringOfDate(/* @__PURE__ */ new Date()),
      end: getEveningOfDate(new Date(getMoringOfDate(/* @__PURE__ */ new Date()).setDate(getEveningOfDate(/* @__PURE__ */ new Date()).getDate() + 7))),
      type: void 0
    });
    const typeFilterString = computed(() => {
      if (!state.type) {
        return "";
      }
      return ` && bookingType = "${state.type}"`;
    });
    const filterString = computed(() => {
      const value = `(end >= "${getDateFilter(state.start)} ${getTimeFilter(
        state.start
      )}" && start <= "${getDateFilter(state.end)} ${getTimeFilter(state.end)}")${typeFilterString.value}`;
      return value;
    });
    const { pending, data: bookings } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "bookings",
      () => pb.collection("bookings").getFullList(200, {
        filter: filterString.value,
        sort: "-start"
      })
    )), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BookingBlockCreator = _sfc_main$3;
      const _component_nuxt_icon = _sfc_main$4;
      const _component_BookingBlock = _sfc_main$2;
      const _component_BookingAppointment = _sfc_main$1;
      if (unref(authStore).token) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-container" }, _attrs))}><div class="flex items-center justify-between mt-10 mb-4 border border-grey border-opacity-20 shadow-lg rounded p-2"><div class="flex items-center gap-2"><button class="border border-grey border-opacity-20 rounded px-4 py-1">Alle</button><button class="border border-grey border-opacity-20 rounded px-4 py-1">Block</button><button class="border border-grey border-opacity-20 rounded px-4 py-1">Buchung</button></div><div class="flex items-center gap-2"><input type="date"${ssrRenderAttr("value", getDateFilter(unref(state).start))} class="border border-grey border-opacity-20 rounded px-4 py-1"><input type="date"${ssrRenderAttr("value", getDateFilter(unref(state).end))} class="border border-grey border-opacity-20 rounded px-4 py-1"></div></div><div class="mb-10">`);
        _push(ssrRenderComponent(_component_BookingBlockCreator, {
          onCreatedBlock: ($event) => ("refreshNuxtData" in _ctx ? _ctx.refreshNuxtData : unref(refreshNuxtData))("bookings")
        }, null, _parent));
        _push(`</div>`);
        if (unref(pending)) {
          _push(`<div class="flex justify-center">`);
          _push(ssrRenderComponent(_component_nuxt_icon, {
            name: "icon-pending",
            class: "text-4xl inline-block animate-spin"
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<div class="flex flex-col gap-4 mb-20"><!--[-->`);
          ssrRenderList(unref(bookings), (booking, index) => {
            _push(`<div class="">`);
            if (booking.bookingType === "block") {
              _push(ssrRenderComponent(_component_BookingBlock, {
                onRefreshBookings: ($event) => ("refreshNuxtData" in _ctx ? _ctx.refreshNuxtData : unref(refreshNuxtData))("bookings"),
                booking
              }, null, _parent));
            } else {
              _push(`<!---->`);
            }
            if (booking.bookingType === "appointment") {
              _push(ssrRenderComponent(_component_BookingAppointment, {
                onRefreshBookings: ($event) => ("refreshNuxtData" in _ctx ? _ctx.refreshNuxtData : unref(refreshNuxtData))("bookings"),
                booking
              }, null, _parent));
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          });
          _push(`<!--]--></div>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/buchungen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=buchungen-9ae6ee73.mjs.map
