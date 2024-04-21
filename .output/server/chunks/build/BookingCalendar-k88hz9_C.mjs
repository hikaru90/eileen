import _sfc_main$a from './nuxt-icon-Cyx4B1z0.mjs';
import { u as usePocketBase, i as useRuntimeConfig } from './server.mjs';
import { defineComponent, computed, reactive, mergeProps, unref, useSSRContext, ref, withCtx, createTextVNode, createVNode, watch, getCurrentInstance, getCurrentScope, onScopeDispose } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrRenderDynamicModel, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderSlot } from 'vue/server-renderer';
import { d as defaults$1 } from './defaults-CgFcJQec.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
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

const getTemplate = (templateName, formData) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
  const templates = [
    {
      name: "contactForm",
      subject: "Neue Kontaktanfrage",
      content: `<html><body>
      Liebe Eileen,<br /><br />
    
      es gibt eine neue Kontaktanfrage von Deiner Seite.<br /><br />

      Vorname: ${formData == null ? void 0 : formData.firstName}<br />
      Nachname: ${formData == null ? void 0 : formData.lastName}<br />
      E-Mail: ${formData == null ? void 0 : formData.mail}<br />
      Nachricht: ${formData == null ? void 0 : formData.message}<br /><br />

      Viel Liebe aus dem Backend \u2665\uFE0F<br />
      </body></html>`
    },
    {
      name: "bookingRequestUser",
      subject: "Deine Buchungsanfrage bei Eileen George",
      content: `<html><body>
      Liebe/r ${formData == null ? void 0 : formData.firstName} ${formData == null ? void 0 : formData.lastName},<br /><br />
    
      vielen Dank f\xFCr Deine Terminanfrage.<br/>
      Sobald ich Deine Daten gepr\xFCft habe, melde ich mich noch einmal f\xFCr die Best\xE4tigung des Termins bei Dir.<br /><br />
      
      <strong>Anfragendetails:</strong><br />
      Datum: ${(_a = formData == null ? void 0 : formData.timeslot) == null ? void 0 : _a.day}.${(_b = formData == null ? void 0 : formData.timeslot) == null ? void 0 : _b.month}.${(_c = formData == null ? void 0 : formData.timeslot) == null ? void 0 : _c.year}<br />
      Uhrzeit: ${(_d = formData == null ? void 0 : formData.timeslot) == null ? void 0 : _d.timeslot}<br /><br />
      
      Herzliche Gr\xFC\xDFe<br />
      von dem Buchungssystem von Eileen<br/><br/>
      <strong>Eileen George<br/></strong>
      Psychologisches Coaching<br />
      Selbstwert & Innere Kind Arbeit<br />
      Embodiment<br />
      Werkstra\xDFe 5<br />
      24955 Harrislee<br />
      kontakt@eileengeorge.de<br />
      +49 1525 140 2928<br />
      <br />
      <br />
      Stornierungsrichtlinie<br />
      Eine kostenlose Stornierung Deines Termins ist bis zu 48 Stunden vorher m\xF6glich. Danach wird eine Ausfallgeb\xFChr von 50% f\xE4llig.<br />
      </body></html>`
    },
    {
      name: "bookingConfirmationUser",
      subject: "Terminbest\xE4tigung",
      content: `<html><body>
      Liebe/r ${formData == null ? void 0 : formData.firstName} ${formData == null ? void 0 : formData.lastName},<br /><br />
      
      Ich habe mir Deinen Wunschtermin eingetragen und freue mich sehr auf unsere gemeinsame Sitzung.<br/>
      F\xFCr die endg\xFCltige Best\xE4tigung des Termins, \xFCberweise bitte den Rechnungsbetrag \xFCber folgenden Link:
      <a href="https://www.paypal.com/ncp/payment/TT3QLBPLZPAT2">https://www.paypal.com/ncp/payment/TT3QLBPLZPAT2</a>
      <br /><br />

      <strong>Termin:</strong><br />
      Datum: ${(_e = formData == null ? void 0 : formData.timeslot) == null ? void 0 : _e.day}.${(_f = formData == null ? void 0 : formData.timeslot) == null ? void 0 : _f.month}.${(_g = formData == null ? void 0 : formData.timeslot) == null ? void 0 : _g.year}<br />
      Uhrzeit: ${(_h = formData == null ? void 0 : formData.timeslot) == null ? void 0 : _h.timeslot}<br /><br />


      ${(formData == null ? void 0 : formData.place) === "inPerson" ? "Ich freue mich, Dich bald in meinen R\xE4umlichkeiten in Harrislee zu empfangen, melde mich davor aber noch einmal pers\xF6nlich bei Dir per Mail.<br /><br />" : "Ich sende Dir den entsprechenden Link f\xFCr die Durchf\xFChrung Deines Onlinetermins im Vorfeld zu und melde mich davor aber auch einmal pers\xF6nlich per Mail bei Dir.<br /><br />"}

      Bei Fragen oder anderen Anliegen, melde Dich gerne jederzeit bei mir.<br/><br/>
      
      Herzliche Gr\xFC\xDFe<br />
      von dem Buchungssystem von Eileen<br/><br/>
      <strong>Eileen George<br/></strong>
      Psychologisches Coaching<br />
      Selbstwert & Innere Kind Arbeit<br />
      Embodiment<br />
      Werkstra\xDFe 5<br />
      24955 Harrislee<br />
      kontakt@eileengeorge.de<br />
      +49 1525 140 2928<br />
      <br />
      <br />
      Stornierungsrichtlinie<br />
      Eine kostenlose Stornierung Deines Termins ist bis zu 48 Stunden vorher m\xF6glich. Danach wird eine Ausfallgeb\xFChr von 50% f\xE4llig.<br />
      </body></html>`
    },
    {
      name: "bookingRequestOwner",
      subject: `Neue Buchungsanfrage von ${formData == null ? void 0 : formData.firstName} ${formData == null ? void 0 : formData.lastName}`,
      content: `<html><body>
      Liebe Eileen,<br /><br />
    
      es liegt eine neue Buchung von ${formData == null ? void 0 : formData.firstName} ${formData == null ? void 0 : formData.lastName} im Backend bereit und wartet auf Moderation.<br />
      <a href="https://eileengeorge.de/buchungen" title="Eileen George Buchungen">Zu den Buchungen</a>
      <br /><br />
      
      <strong>Anfragendetails:</strong><br />
      Vorname: ${formData == null ? void 0 : formData.firstName}<br />
      Nachname: ${formData == null ? void 0 : formData.lastName}<br />
      Datum: ${(_i = formData == null ? void 0 : formData.timeslot) == null ? void 0 : _i.day}.${(_j = formData == null ? void 0 : formData.timeslot) == null ? void 0 : _j.month}.${(_k = formData == null ? void 0 : formData.timeslot) == null ? void 0 : _k.year}<br />
      Uhrzeit: ${(_l = formData == null ? void 0 : formData.timeslot) == null ? void 0 : _l.timeslot}<br />
      Terminart: ${formData == null ? void 0 : formData.appointmentType}<br />
      Leistung: ${formData == null ? void 0 : formData.service}<br />
      Ort: ${formData == null ? void 0 : formData.place}<br />
      Beschreibung des Themas: ${formData == null ? void 0 : formData.description}<br />
      Rechnungsadresse: ${formData == null ? void 0 : formData.invoiceAddress}<br /><br />
      E-Mail: ${formData == null ? void 0 : formData.mail}<br /><br />
      
      Viel Liebe aus dem Backend \u2665\uFE0F<br />
      <strong>Alex</strong><br />
      </body></html>`
    }
  ];
  return templates.find((template) => template.name === templateName);
};
function useBrevo() {
  const config = useRuntimeConfig();
  const sendMail = async (template, to, formData) => {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": config.public.BREVO_API_KEY,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        sender: {
          email: "kontakt@eileengeorge.de",
          name: `Eileen George`
        },
        replyTo: {
          email: "kontakt@eileengeorge.de",
          name: `Eileen George`
        },
        to: [{ email: to, name: `${formData.firstName} ${formData.lastName}` }],
        subject: getTemplate(template, formData).subject,
        htmlContent: getTemplate(template, formData).content
      })
    });
    if (!response.ok) {
      return "Message could not be sent at this time.";
    }
  };
  return {
    sendMail
  };
}
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "BookingCalendarDate",
  __ssrInlineRender: true,
  props: {
    component: { default: {
      content: defaults$1.find((el) => el.type === "bookingCalendar").content
    } },
    selectedTimeslot: {}
  },
  emits: ["selectTimeslot"],
  setup(__props, { emit: __emit }) {
    usePocketBase();
    const props = __props;
    const weekdays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
    const getDaysInMonth = (year, month) => {
      return new Date(year, month + 1, 0).getDate();
    };
    const getOffsetToMondayInMonth = (year, month) => {
      const currentDayIndex = new Date(year, month, 1).getDay();
      const mondayIndex = 1;
      const offset = (currentDayIndex + 7 - mondayIndex) % 7;
      return offset;
    };
    const getWeekday = (year, month, day) => {
      return new Date(year, month, day).getDay();
    };
    const addDays = (date, days) => {
      const result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    };
    const addMonths = (date, months) => {
      const newDate = new Date(date);
      newDate.setMonth(newDate.getMonth() + months);
      return newDate;
    };
    const isWeekend = (dayIndex) => {
      if (dayIndex === 6 || dayIndex === 0)
        return true;
      return false;
    };
    const isTooLate = (year, month, day) => {
      const currentDate = (/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0);
      const datePlus5 = new Date(addDays(currentDate, 5)).setHours(0, 0, 0, 0);
      const truncatedDate = new Date(year, month, day).setHours(0, 0, 0, 0);
      if (truncatedDate < datePlus5)
        return true;
      return false;
    };
    const daysInCurrentMonth = computed(() => {
      const numberOfDays = getDaysInMonth(state.year, state.month);
      const daysInMonth = Array.from(Array(numberOfDays).keys()).map((el) => el + 1);
      return daysInMonth.map((day) => {
        const weekday = getWeekday(state.year, state.month, day);
        return {
          date: day,
          weekday,
          isDisabled: isWeekend(weekday) || isTooLate(state.year, state.month, day)
        };
      });
    });
    const offsetToMonday = computed(() => getOffsetToMondayInMonth(state.year, state.month));
    const daysInLastMonth = computed(() => {
      let month = state.month;
      let year = state.year;
      if (month > 0) {
        month--;
      } else {
        month = 11;
        year--;
      }
      const days = Array.from(Array(getDaysInMonth(year, month)).keys()).map((el) => el + 1);
      if (offsetToMonday.value === 0) {
        return [];
      } else {
        const amount = -1 * offsetToMonday.value;
        return days.slice(amount);
      }
    });
    const state = reactive({
      step: 1,
      // minMonth: new Date().getMonth(),
      minMonth: Number((/* @__PURE__ */ new Date()).toISOString().split("-").slice(0, 2).join("")),
      maxMonth: Number(addMonths(/* @__PURE__ */ new Date(), 3).toISOString().split("-").slice(0, 2).join("")),
      // maxMonth: new Date().getMonth() + 3,
      today: /* @__PURE__ */ new Date(),
      month: (/* @__PURE__ */ new Date()).getMonth(),
      year: (/* @__PURE__ */ new Date()).getFullYear(),
      // selectedDate: new Date().setHours(0, 0, 0, 0),
      selectedDate: void 0,
      appointmentsOfTheDay: [],
      timeslots: []
    });
    const yearMonth = computed(() => {
      return Number(new Date(state.year, state.month + 1).toISOString().split("-").slice(0, 2).join(""));
    });
    computed(() => {
      const minMonth = new Date(state.minMonth).getMonth();
      const maxMonth = new Date(state.maxMonth).getMonth() + 3;
      if (minMonth < maxMonth)
        return true;
      return false;
    });
    const paddedMonth = computed(() => {
      return String(state.month + 1).padStart(2, "0");
    });
    const paddedDay = computed(() => {
      return String(new Date(state.selectedDate).getDate()).padStart(2, "0");
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_icon = _sfc_main$a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col lg:flex-row gap-10 mb-36" }, _attrs))}><div class="w-full lg:w-1/2"><div class="flex items-center justify-between mb-2"><div style="${ssrRenderStyle({ "width": "14.285%" })}" class="flex items-center justify-center">`);
      if (unref(yearMonth) > unref(state).minMonth) {
        _push(`<button aria-label="Monat zur\xFCck" class="aspect-square w-full hover:bg-gold rounded-full m-3 flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_nuxt_icon, {
          name: "icon-caret-left",
          class: "text-xl"
        }, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div>${ssrInterpolate(new Date(unref(state).year, unref(state).month).toLocaleString("de-DE", { month: "long" }))}</div><div style="${ssrRenderStyle({ "width": "14.285%" })}" class="flex items-center justify-center">`);
      if (unref(yearMonth) < unref(state).maxMonth) {
        _push(`<button aria-label="Monat vor" class="aspect-square w-full hover:bg-gold rounded-full m-3 flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_nuxt_icon, {
          name: "icon-caret-right",
          class: "text-xl"
        }, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="weekdays flex justify-start mb-2"><!--[-->`);
      ssrRenderList(weekdays, (weekday, index) => {
        _push(`<div style="${ssrRenderStyle({ "width": "14.285%" })}" class="flex items-center justify-center text-lightGrey text-opacity-60">${ssrInterpolate(weekday)}</div>`);
      });
      _push(`<!--]--></div><div class="flex flex-wrap justify-start"><!--[-->`);
      ssrRenderList(unref(daysInLastMonth), (dayInLastMonth, index) => {
        _push(`<div style="${ssrRenderStyle({ "width": "14.285%" })}" class="offsets text-lightGrey text-opacity-60 flex items-center justify-center flex-shrink-0"><div class="w-full aspect-square flex items-center justify-center">${ssrInterpolate(dayInLastMonth)}</div></div>`);
      });
      _push(`<!--]--><!--[-->`);
      ssrRenderList(unref(daysInCurrentMonth), (day, index) => {
        _push(`<div style="${ssrRenderStyle({ "width": "14.285%" })}" class="${ssrRenderClass([[day.isDisabled ? "text-lightGrey text-opacity-60" : ""], "flex items-center justify-center flex-shrink-0 p-1"])}">`);
        if (!day.isDisabled) {
          _push(`<button aria-label="Tag ausw\xE4hlen" class="${ssrRenderClass([[
            unref(state).selectedDate === new Date(unref(state).year, unref(state).month, day.date).setHours(0, 0, 0, 0) ? "bg-gold" : ""
          ], "hover:border hover:border-gold rounded-full w-full aspect-square"])}">${ssrInterpolate(day.date)}</button>`);
        } else {
          _push(`<div class="w-full aspect-square flex items-center justify-center">${ssrInterpolate(day.date)}</div>`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div></div><div class="w-full lg:w-1/2">`);
      if (!unref(state).selectedDate) {
        _push(`<h2 class="text-md mb-10 mt-6"> Hier kannst Du ganz bequem \xFCber das Online Buchungstool einen Erst- oder Folgetermin buchen.<br><br> W\xE4hle daf\xFCr ein Datum und eine passende Uhrzeit aus. </h2>`);
      } else {
        _push(`<!--[-->`);
        if (unref(state).timeslots.length === 0) {
          _push(`<!--[--> Am <span class="">${ssrInterpolate(new Date(unref(state).selectedDate).toLocaleDateString("de-DE", {}))}</span> stehen Dir leider keine freien Termine zur Verf\xFCgung. <!--]-->`);
        } else {
          _push(`<!--[--><div class="mb-3"> Am <span class="">${ssrInterpolate(new Date(unref(state).selectedDate).toLocaleDateString("de-DE", {}))}</span> stehen Dir folgende Termine zur Verf\xFCgung: </div><div class="flex items-center flex-wrap gap-2"><!--[-->`);
          ssrRenderList(unref(state).timeslots, (timeslot, index) => {
            var _a, _b, _c;
            _push(`<button aria-label="Zeitslot ausw\xE4hlen" class="${ssrRenderClass([[
              ((_a = props.selectedTimeslot) == null ? void 0 : _a.month) === unref(paddedMonth) && ((_b = props.selectedTimeslot) == null ? void 0 : _b.day) === unref(paddedDay) && ((_c = props.selectedTimeslot) == null ? void 0 : _c.timeslot) === timeslot ? "bg-gold" : "hover:bg-gold"
            ], "border border-gold rounded px-1 py-1 w-14 flex items-center justify-center"])}">${ssrInterpolate(timeslot)}</button>`);
          });
          _push(`<!--]--></div><!--]-->`);
        }
        _push(`<!--]-->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BookingCalendarDate.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full flex items-center px-4" }, _attrs))}><h2 class="mr-2">`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</h2><div class="border-b border-sand flex-grow"></div></div>`);
}
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Form/Heading.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "InputLabel",
  __ssrInlineRender: true,
  props: {
    label: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["text-xs ml-2", [{ "mb-1": props.label }]]
      }, _attrs))}>${ssrInterpolate(props.label)}</div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Form/InputLabel.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "InputError",
  __ssrInlineRender: true,
  props: {
    error: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-red bg-opacity-40 text-red text-sm mt-1 px-1 py-[2px] rounded" }, _attrs))}>${ssrInterpolate(props.error)}</div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Form/InputError.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const isDef = (val) => typeof val !== "undefined";
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const noop = () => {
};
function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function identity(arg) {
  return arg;
}
function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
function unrefElement(elRef) {
  var _a;
  const plain = resolveUnref(elRef);
  return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain;
}
const defaultWindow = void 0;
function useEventListener(...args) {
  let target;
  let events2;
  let listeners;
  let options;
  if (isString(args[0]) || Array.isArray(args[0])) {
    [events2, listeners, options] = args;
    target = defaultWindow;
  } else {
    [target, events2, listeners, options] = args;
  }
  if (!target)
    return noop;
  if (!Array.isArray(events2))
    events2 = [events2];
  if (!Array.isArray(listeners))
    listeners = [listeners];
  const cleanups = [];
  const cleanup = () => {
    cleanups.forEach((fn) => fn());
    cleanups.length = 0;
  };
  const register = (el, event, listener, options2) => {
    el.addEventListener(event, listener, options2);
    return () => el.removeEventListener(event, listener, options2);
  };
  const stopWatch = watch(() => [unrefElement(target), resolveUnref(options)], ([el, options2]) => {
    cleanup();
    if (!el)
      return;
    cleanups.push(...events2.flatMap((event) => {
      return listeners.map((listener) => register(el, event, listener, options2));
    }));
  }, { immediate: true, flush: "post" });
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(stop);
  return stop;
}
function cloneFnJSON(source) {
  return JSON.parse(JSON.stringify(source));
}
const _global = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey = "__vueuse_ssr_handlers__";
_global[globalKey] = _global[globalKey] || {};
var SwipeDirection;
(function(SwipeDirection2) {
  SwipeDirection2["UP"] = "UP";
  SwipeDirection2["RIGHT"] = "RIGHT";
  SwipeDirection2["DOWN"] = "DOWN";
  SwipeDirection2["LEFT"] = "LEFT";
  SwipeDirection2["NONE"] = "NONE";
})(SwipeDirection || (SwipeDirection = {}));
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
const _TransitionPresets = {
  easeInSine: [0.12, 0, 0.39, 0],
  easeOutSine: [0.61, 1, 0.88, 1],
  easeInOutSine: [0.37, 0, 0.63, 1],
  easeInQuad: [0.11, 0, 0.5, 0],
  easeOutQuad: [0.5, 1, 0.89, 1],
  easeInOutQuad: [0.45, 0, 0.55, 1],
  easeInCubic: [0.32, 0, 0.67, 0],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeInQuart: [0.5, 0, 0.75, 0],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeInQuint: [0.64, 0, 0.78, 0],
  easeOutQuint: [0.22, 1, 0.36, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
  easeInExpo: [0.7, 0, 0.84, 0],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeInCirc: [0.55, 0, 1, 0.45],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeInBack: [0.36, 0, 0.66, -0.56],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6]
};
__spreadValues({
  linear: identity
}, _TransitionPresets);
function useVModel(props, key, emit, options = {}) {
  var _a, _b, _c;
  const {
    clone = false,
    passive = false,
    eventName,
    deep = false,
    defaultValue
  } = options;
  const vm = getCurrentInstance();
  const _emit = emit || (vm == null ? void 0 : vm.emit) || ((_a = vm == null ? void 0 : vm.$emit) == null ? void 0 : _a.bind(vm)) || ((_c = (_b = vm == null ? void 0 : vm.proxy) == null ? void 0 : _b.$emit) == null ? void 0 : _c.bind(vm == null ? void 0 : vm.proxy));
  let event = eventName;
  event = eventName || event || `update:${key.toString()}`;
  const cloneFn = (val) => !clone ? val : isFunction(clone) ? clone(val) : cloneFnJSON(val);
  const getValue2 = () => isDef(props[key]) ? cloneFn(props[key]) : defaultValue;
  if (passive) {
    const initialValue = getValue2();
    const proxy = ref(initialValue);
    watch(() => props[key], (v) => proxy.value = cloneFn(v));
    watch(proxy, (v) => {
      if (v !== props[key] || deep)
        _emit(event, v);
    }, { deep });
    return proxy;
  } else {
    return computed({
      get() {
        return getValue2();
      },
      set(value) {
        _emit(event, value);
      }
    });
  }
}
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "Input",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    label: {},
    innerClass: {},
    inputClass: { default: "pl-2 pr-10 py-1 w-full border border-grey rounded" },
    placeholder: {},
    validation: {},
    type: { default: "text" }
  },
  emits: ["update:modelValue", "update"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const state = reactive({
      touched: false
    });
    const isValid = computed(() => {
      if (state.touched) {
        if (errors.value.length > 0) {
          return false;
        }
        return true;
      }
      return void 0;
    });
    const errors = computed(() => {
      var _a, _b, _c;
      let errors2 = [];
      if (state.touched) {
        if ((_a = props.validation) == null ? void 0 : _a.includes("required")) {
          if (!props.modelValue) {
            errors2.push("Dieses Feld ist ein Pflichtfeld");
          }
        }
        if ((_b = props.validation) == null ? void 0 : _b.includes("email")) {
          if (((_c = props.modelValue) == null ? void 0 : _c.includes("@")) === false) {
            errors2.push("Bitte gib eine g\xFCltige E-Mail-Adresse ein");
          }
        }
      }
      return errors2;
    });
    const emit = __emit;
    const data = useVModel(props, "modelValue", emit);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FormInputLabel = _sfc_main$7;
      const _component_nuxt_icon = _sfc_main$a;
      const _component_FormInputError = _sfc_main$6;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: _ctx.innerClass }, _attrs))}><div class="relative">`);
      _push(ssrRenderComponent(_component_FormInputLabel, {
        label: props.label,
        class: "text-left"
      }, null, _parent));
      _push(`<div class="w-full relative"><input autocomplete="disabled"${ssrRenderAttr("type", _ctx.type)}${ssrRenderAttr("placeholder", _ctx.placeholder)} class="${ssrRenderClass([props.inputClass, "fieldTarget"])}"${ssrRenderDynamicModel(_ctx.type, unref(data), null)}><div class="absolute top-1/2 right-2 transform -translate-y-1/2">`);
      if (unref(isValid)) {
        _push(`<div class="bg-green bg-opacity-40 rounded">`);
        _push(ssrRenderComponent(_component_nuxt_icon, {
          name: "icon-check",
          class: "text-green text-xl"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(isValid) === false) {
        _push(`<div class="bg-red bg-opacity-40 rounded">`);
        _push(ssrRenderComponent(_component_nuxt_icon, {
          name: "icon-cross",
          class: "text-red text-xl"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (!unref(isValid)) {
        _push(`<!--[-->`);
        ssrRenderList(unref(errors), (error, index) => {
          _push(`<div>`);
          _push(ssrRenderComponent(_component_FormInputError, { error }, null, _parent));
          _push(`</div>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Form/Input.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "InputSelect",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    label: {},
    options: {},
    innerClass: {},
    validation: {}
  },
  emits: ["update:modelValue", "update"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const data = useVModel(props, "modelValue", emit);
    const state = reactive({
      touched: false
    });
    const isValid = computed(() => {
      if (state.touched) {
        if (errors.value.length > 0) {
          return false;
        }
        return true;
      }
      return void 0;
    });
    const errors = computed(() => {
      var _a;
      let errors2 = [];
      if (state.touched) {
        if ((_a = props.validation) == null ? void 0 : _a.includes("required")) {
          if (!props.modelValue) {
            errors2.push("W\xE4hle bitte eine Option");
          }
        }
      }
      return errors2;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FormInputLabel = _sfc_main$7;
      const _component_nuxt_icon = _sfc_main$a;
      const _component_FormInputError = _sfc_main$6;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: _ctx.innerClass }, _attrs))}><div class="relative">`);
      _push(ssrRenderComponent(_component_FormInputLabel, {
        label: props.label,
        class: "text-left"
      }, null, _parent));
      _push(`<div class="w-full relative"><select class="fieldTarget w-full border border-grey rounded pl-2 pr-8 py-[6px]"><!--[-->`);
      ssrRenderList(props.options, (option, index) => {
        _push(`<option${ssrRenderAttr("value", option.value)}${ssrIncludeBooleanAttr(option.value === unref(data)) ? " selected" : ""}>${ssrInterpolate(option.label)}</option>`);
      });
      _push(`<!--]--></select><div class="absolute top-1/2 right-5 transform -translate-y-1/2">`);
      if (unref(isValid)) {
        _push(`<div class="bg-green bg-opacity-40 rounded">`);
        _push(ssrRenderComponent(_component_nuxt_icon, {
          name: "icon-check",
          class: "text-green text-xl"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(isValid) === false) {
        _push(`<div class="bg-red bg-opacity-40 rounded">`);
        _push(ssrRenderComponent(_component_nuxt_icon, {
          name: "icon-cross",
          class: "text-red text-xl"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (!unref(isValid)) {
        _push(`<!--[-->`);
        ssrRenderList(unref(errors), (error, index) => {
          _push(`<div>`);
          _push(ssrRenderComponent(_component_FormInputError, { error }, null, _parent));
          _push(`</div>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Form/InputSelect.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "InputTextarea",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    label: {},
    innerClass: {},
    placeholder: {},
    validation: {},
    type: { default: "textarea" }
  },
  emits: ["update:modelValue", "update"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const state = reactive({
      touched: false
    });
    const isValid = computed(() => {
      if (state.touched) {
        if (errors.value.length > 0) {
          return false;
        }
        return true;
      }
      return void 0;
    });
    const errors = computed(() => {
      var _a, _b, _c;
      let errors2 = [];
      if (state.touched) {
        if ((_a = props.validation) == null ? void 0 : _a.includes("required")) {
          if (!props.modelValue) {
            errors2.push("Dieses Feld ist ein Pflichtfeld");
          }
        }
        if ((_b = props.validation) == null ? void 0 : _b.includes("email")) {
          if (((_c = props.modelValue) == null ? void 0 : _c.includes("@")) === false) {
            errors2.push("Bitte gib eine g\xFCltige E-Mail-Adresse ein");
          }
        }
      }
      return errors2;
    });
    const emit = __emit;
    const data = useVModel(props, "modelValue", emit);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FormInputLabel = _sfc_main$7;
      const _component_nuxt_icon = _sfc_main$a;
      const _component_FormInputError = _sfc_main$6;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: _ctx.innerClass }, _attrs))}><div class="relative">`);
      _push(ssrRenderComponent(_component_FormInputLabel, {
        label: props.label,
        class: "text-left"
      }, null, _parent));
      _push(`<div class="w-full relative"><textarea autocomplete="disabled"${ssrRenderAttr("type", _ctx.type)}${ssrRenderAttr("placeholder", _ctx.placeholder)} class="fieldTarget w-full p-2 border border-grey rounded">${ssrInterpolate(unref(data))}</textarea><div class="absolute top-2 right-2">`);
      if (unref(isValid)) {
        _push(`<div class="bg-green bg-opacity-40 rounded">`);
        _push(ssrRenderComponent(_component_nuxt_icon, {
          name: "icon-check",
          class: "text-green text-xl"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(isValid) === false) {
        _push(`<div class="bg-red bg-opacity-40 rounded">`);
        _push(ssrRenderComponent(_component_nuxt_icon, {
          name: "icon-cross",
          class: "text-red text-xl"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (!unref(isValid)) {
        _push(`<!--[-->`);
        ssrRenderList(unref(errors), (error, index) => {
          _push(`<div>`);
          _push(ssrRenderComponent(_component_FormInputError, { error }, null, _parent));
          _push(`</div>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Form/InputTextarea.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "InputToggle",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: [Boolean, null] },
    label: {},
    innerClass: {},
    validation: {}
  },
  emits: ["update:modelValue", "update"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    let data = useVModel(props, "modelValue", emit);
    const toggle = (e) => {
      if (e.code === "Space") {
        console.log("space toggle");
        data.value = !data.value;
      }
    };
    const state = reactive({
      touched: false
    });
    const isValid = computed(() => {
      if (state.touched) {
        if (errors.value.length > 0) {
          return false;
        }
        return true;
      }
      return void 0;
    });
    const errors = computed(() => {
      var _a;
      let errors2 = [];
      if (state.touched) {
        if ((_a = props.validation) == null ? void 0 : _a.includes("required")) {
          if (props.modelValue === false) {
            errors2.push("Bitte best\xE4tige dieses Feld");
          }
        }
      }
      return errors2;
    });
    const target = ref();
    useEventListener(target, "keyup", (e) => {
      toggle(e);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FormInputLabel = _sfc_main$7;
      const _component_FormInputError = _sfc_main$6;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-0c5b6ad4><div class="${ssrRenderClass(_ctx.innerClass)}" data-v-0c5b6ad4><div class="relative" data-v-0c5b6ad4>`);
      _push(ssrRenderComponent(_component_FormInputLabel, {
        label: props.label,
        class: "text-left"
      }, null, _parent));
      _push(`<div class="w-full relative" data-v-0c5b6ad4><div class="flex items-center gap-4" data-v-0c5b6ad4><label class="switch ml-02 my-01 flex-shrink-0" data-v-0c5b6ad4><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(data)) ? ssrLooseContain(unref(data), null) : unref(data)) ? " checked" : ""} class="fieldTarget" data-v-0c5b6ad4><span class="slider" data-v-0c5b6ad4></span></label><div class="text-left text-sm flex-grow" data-v-0c5b6ad4>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div></div></div></div>`);
      if (!unref(isValid)) {
        _push(`<!--[-->`);
        ssrRenderList(unref(errors), (error, index) => {
          _push(`<div data-v-0c5b6ad4>`);
          _push(ssrRenderComponent(_component_FormInputError, { error }, null, _parent));
          _push(`</div>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Form/InputToggle.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-0c5b6ad4"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "BookingCalendarForm",
  __ssrInlineRender: true,
  props: {
    selectedTimeslot: {}
  },
  emits: ["formSubmitted"],
  setup(__props, { emit: __emit }) {
    usePocketBase();
    const props = __props;
    const timeslotString = computed(() => {
      if (!props.selectedTimeslot)
        return;
      const dateString = (/* @__PURE__ */ new Date(
        `${props.selectedTimeslot.year}-${props.selectedTimeslot.month}-${props.selectedTimeslot.day}`
      )).toLocaleDateString("de-DE", {
        weekday: "short",
        year: "numeric",
        month: "numeric",
        day: "numeric"
      });
      return `${dateString} um ${props.selectedTimeslot.timeslot}`;
    });
    const state = reactive({
      form: {
        firstName: {
          value: void 0,
          validation: "required"
        },
        lastName: {
          value: void 0,
          validation: "required"
        },
        mail: {
          value: void 0,
          validation: "required|email"
        },
        phone: {
          value: void 0,
          validation: ""
        },
        appointmentType: {
          value: void 0,
          validation: "required"
        },
        service: {
          value: void 0,
          validation: "required"
        },
        place: {
          value: void 0,
          validation: "required"
        },
        description: {
          value: void 0,
          validation: "required"
        },
        invoiceAddress: {
          value: void 0,
          validation: "required"
        },
        approvedCancellationConditions: {
          value: false,
          validation: "required"
        },
        approvedDataprotection: {
          value: false,
          validation: "required"
        }
      },
      success: false,
      formSubmitted: false,
      pending: true
    });
    computed(() => {
      let res = [];
      for (const el of Object.values(state.form)) {
        if (el.validation) {
          if (el.validation === "required" && !el.value) {
            res.push("error");
          }
        }
      }
      if (res.length === 0) {
        return true;
      } else {
        return false;
      }
    });
    computed(() => {
      let value = [];
      for (const letter of state.form.service.value) {
        if (!isNaN(parseInt(letter)))
          value.push(letter);
      }
      return parseInt(value.join(""));
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FormHeading = __nuxt_component_0;
      const _component_FormInput = _sfc_main$5;
      const _component_FormInputSelect = _sfc_main$4;
      const _component_FormInputTextarea = _sfc_main$3;
      const _component_FormInputToggle = __nuxt_component_4;
      const _component_nuxt_icon = _sfc_main$a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center justify-center text-center" }, _attrs))}><div class="mb-4">Du hast folgenden Termin ausgew\xE4hlt:</div><div class="text-xl border rounded-full border-gold inline-block px-4 py-1 mb-10">${ssrInterpolate(unref(timeslotString))}</div><div class="w-full lg:w-2/3 mb-10"> Um Deine Buchung abzuschlie\xDFen, ben\xF6tige ich noch ein paar Informationen von Dir. F\xFCll bitte untenstehendes Formular aus. </div><form class="w-full lg:w-2/3 flex flex-wrap -m-2">`);
      _push(ssrRenderComponent(_component_FormHeading, { class: "mb-4" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Deine Angaben`);
          } else {
            return [
              createTextVNode("Deine Angaben")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_FormInput, {
        modelValue: unref(state).form.firstName.value,
        "onUpdate:modelValue": ($event) => unref(state).form.firstName.value = $event,
        label: "Vorname",
        placeholder: "Vorname",
        validation: unref(state).form.firstName.validation,
        class: "p-2 w-full lg:w-1/2"
      }, null, _parent));
      _push(ssrRenderComponent(_component_FormInput, {
        modelValue: unref(state).form.lastName.value,
        "onUpdate:modelValue": ($event) => unref(state).form.lastName.value = $event,
        label: "Nachname",
        placeholder: "Nachname",
        validation: unref(state).form.lastName.validation,
        class: "p-2 w-full lg:w-1/2"
      }, null, _parent));
      _push(ssrRenderComponent(_component_FormInput, {
        modelValue: unref(state).form.mail.value,
        "onUpdate:modelValue": ($event) => unref(state).form.mail.value = $event,
        label: "E-Mail",
        placeholder: "E-Mail",
        validation: unref(state).form.mail.validation,
        class: "p-2 w-full lg:w-1/2"
      }, null, _parent));
      _push(ssrRenderComponent(_component_FormInput, {
        modelValue: unref(state).form.phone.value,
        "onUpdate:modelValue": ($event) => unref(state).form.phone.value = $event,
        label: "Telefonnummer (optional)",
        placeholder: "Telefonnummer",
        validation: unref(state).form.phone.validation,
        class: "p-2 w-full lg:w-1/2"
      }, null, _parent));
      _push(ssrRenderComponent(_component_FormInputSelect, {
        modelValue: unref(state).form.appointmentType.value,
        "onUpdate:modelValue": ($event) => unref(state).form.appointmentType.value = $event,
        options: unref(defaults$1).find((e) => e.type === "appointmentTypes").options,
        label: "Terminart",
        validation: unref(state).form.appointmentType.validation,
        class: "p-2 w-full lg:w-1/2"
      }, null, _parent));
      _push(ssrRenderComponent(_component_FormInputSelect, {
        modelValue: unref(state).form.service.value,
        "onUpdate:modelValue": ($event) => unref(state).form.service.value = $event,
        options: unref(defaults$1).find((e) => e.type === "services").options,
        label: "Leistung",
        validation: unref(state).form.service.validation,
        class: "p-2 w-full lg:w-1/2"
      }, null, _parent));
      _push(ssrRenderComponent(_component_FormInputSelect, {
        modelValue: unref(state).form.place.value,
        "onUpdate:modelValue": ($event) => unref(state).form.place.value = $event,
        options: [
          { label: "Online", value: "online" },
          { label: "Vor Ort in Harrislee", value: "inPerson" }
        ],
        label: "Wo soll der Termin stattfinden?",
        validation: unref(state).form.place.validation,
        class: "p-2 w-full lg:w-1/2 mb-8"
      }, null, _parent));
      _push(ssrRenderComponent(_component_FormHeading, { class: "mb-4" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Terminvorbereitung`);
          } else {
            return [
              createTextVNode("Terminvorbereitung")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_FormInputTextarea, {
        modelValue: unref(state).form.description.value,
        "onUpdate:modelValue": ($event) => unref(state).form.description.value = $event,
        label: "Beschreibung Deines Themas",
        placeholder: "Bitte beschreibe kurz Dein Thema",
        validation: unref(state).form.description.validation,
        class: "p-2 w-full"
      }, null, _parent));
      _push(ssrRenderComponent(_component_FormInputTextarea, {
        modelValue: unref(state).form.invoiceAddress.value,
        "onUpdate:modelValue": ($event) => unref(state).form.invoiceAddress.value = $event,
        label: "Rechnungsadresse",
        placeholder: "Bitte trage die gew\xFCnschte Rechnungsadresse ein",
        validation: unref(state).form.invoiceAddress.validation,
        class: "p-2 w-full mb-6"
      }, null, _parent));
      _push(ssrRenderComponent(_component_FormHeading, { class: "mb-4" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Rechtliches`);
          } else {
            return [
              createTextVNode("Rechtliches")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_FormInputToggle, {
        modelValue: unref(state).form.approvedCancellationConditions.value,
        "onUpdate:modelValue": ($event) => unref(state).form.approvedCancellationConditions.value = $event,
        class: "p-2 w-full",
        innerClass: "",
        validation: unref(state).form.approvedCancellationConditions.validation
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Ich habe verstanden, dass eine kostenlose Stornierung meines Termins bis zu 48 Stunden vor Terminbeginn m\xF6glich ist und dass danach eine Ausfallgeb\xFChr von 50% f\xE4llig wird. `);
          } else {
            return [
              createTextVNode(" Ich habe verstanden, dass eine kostenlose Stornierung meines Termins bis zu 48 Stunden vor Terminbeginn m\xF6glich ist und dass danach eine Ausfallgeb\xFChr von 50% f\xE4llig wird. ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_FormInputToggle, {
        modelValue: unref(state).form.approvedDataprotection.value,
        "onUpdate:modelValue": ($event) => unref(state).form.approvedDataprotection.value = $event,
        class: "p-2 w-full mb-6",
        innerClass: "",
        validation: unref(state).form.approvedDataprotection.validation
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Ich habe die <a href="/datenschutz" target="_blank" class="underline"${_scopeId}>Datenschutzbestimmung</a> gelesen und bin damit einverstanden. `);
          } else {
            return [
              createTextVNode(" Ich habe die "),
              createVNode("a", {
                href: "/datenschutz",
                target: "_blank",
                class: "underline"
              }, "Datenschutzbestimmung"),
              createTextVNode(" gelesen und bin damit einverstanden. ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex justify-center w-full"><button aria-label="Termin buchen" type="submit" class="border-2 border-gold bg-gold rounded text-offwhite flex items-center px-3 py-2 mb-20"><div class="text-coffee">Termin buchen</div><div class="flex items-center justify-center bg-white rounded-full ml-2 w-4 h-4">`);
      _push(ssrRenderComponent(_component_nuxt_icon, {
        name: "icon-check",
        class: "text-sm text-coffee"
      }, null, _parent));
      _push(`</div></button></div></form></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BookingCalendarForm.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BookingCalendar",
  __ssrInlineRender: true,
  props: {
    component: {}
  },
  setup(__props) {
    const { sendMail } = useBrevo();
    const props = __props;
    const state = reactive({
      currentStep: 0,
      steps: [
        { id: 0, name: "Terminfindung" },
        { id: 1, name: "Buchung" }
      ],
      selectedTimeslot: void 0,
      formValues: void 0,
      formSubmitted: false,
      success: void 0
    });
    const selectTimeslot = (timeslot) => {
      state.selectedTimeslot = timeslot;
      state.currentStep = 1;
    };
    const stepIsValid = (stepId) => {
      if (stepId === 0) {
        if (state.selectedTimeslot != void 0)
          return true;
        return false;
      }
      if (stepId === 1) {
        if (state.formValues != void 0)
          return true;
        return false;
      }
    };
    const handleFormSubmit = async (payload) => {
      try {
        console.log("payload", payload);
        if (payload.success === false) {
          console.log("state.success = false;", state.success = false);
          state.success = false;
        } else {
          console.log("state.success = true;", state.success = true);
          const formData = {
            ...payload.formValues,
            timeslot: state.selectedTimeslot
          };
          console.log("formData", formData);
          await sendMail("bookingRequestUser", payload.formValues.mail, formData);
          await sendMail("bookingRequestOwner", "kontakt@eileengeorge.de", formData);
          await sendMail("bookingRequestOwner", "alexbueckner@gmail.com", formData);
          state.success = true;
        }
        state.formSubmitted = true;
      } catch (err) {
        console.error("Error sending Mail", err);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_icon = _sfc_main$a;
      const _component_BookingCalendarDate = _sfc_main$9;
      const _component_BookingCalendarForm = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-container" }, _attrs))}>`);
      if (unref(state).formSubmitted) {
        _push(`<!--[-->`);
        if (unref(state).success) {
          _push(`<div class="flex justify-center my-20"><div class="w-full lg:w-2/3 border-2 rounded border-green bg-green bg-opacity-40 inline-block px-6 py-4 mb-10 text-center"> Vielen Dank f\xFCr Deine Buchung. <br> Ich melde mich zeitnah per E-Mail bei Dir. </div></div>`);
        } else {
          _push(`<div class="flex justify-center my-20"><div class="w-full lg:w-2/3 border-2 rounded border-red bg-red bg-opacity-40 inline-block px-6 py-4 mb-10 text-center"> Bei der \xDCbermittlung Deiner Daten ist leider ein Fehler aufgetreten. <br>Versuch es bitte erneut. Sollte das Problem weiterhin bestehen, schreib mir bitte eine Mail an <a href="mailto:kontakt@eileengeorge.de" class="underline">kontakt@eileengeorge.de</a>. </div></div>`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<!--[--><div class="flex items-center justify-center gap-10"><!--[-->`);
        ssrRenderList(unref(state).steps, (step, index) => {
          _push(`<button aria-label="Schritt ausw\xE4hlen" class="flex flex-col gap-4 items-center justify-center w-1/3 py-10"><div class="${ssrRenderClass([[unref(state).currentStep === step.id ? "bg-salmon/60" : "bg-darkOffwhite"], "w-full h-[5px] rounded relative"])}"><div class="${ssrRenderClass([[
            unref(state).currentStep === step.id ? "bg-salmon" : "bg-darkOffwhite"
          ], "w-5 h-5 rounded-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"])}">`);
          if (stepIsValid(step.id)) {
            _push(ssrRenderComponent(_component_nuxt_icon, {
              name: "icon-check",
              class: "text-xl"
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div><div class="${ssrRenderClass([[unref(state).currentStep === step.id ? "text-coffee" : "text-lightGrey"], ""])}" class="">${ssrInterpolate(step.name)}</div></button>`);
        });
        _push(`<!--]--></div>`);
        _push(ssrRenderComponent(_component_BookingCalendarDate, {
          style: unref(state).currentStep === 0 ? null : { display: "none" },
          onSelectTimeslot: selectTimeslot,
          component: props.component,
          selectedTimeslot: unref(state).selectedTimeslot
        }, null, _parent));
        _push(ssrRenderComponent(_component_BookingCalendarForm, {
          style: unref(state).currentStep === 1 ? null : { display: "none" },
          onFormSubmitted: handleFormSubmit,
          selectedTimeslot: unref(state).selectedTimeslot
        }, null, _parent));
        _push(`<!--]-->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/Component/BookingCalendar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=BookingCalendar-k88hz9_C.mjs.map
