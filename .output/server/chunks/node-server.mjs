globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import 'node-fetch-native/polyfill';
import { Server as Server$1 } from 'node:http';
import { Server } from 'node:https';
import destr from 'destr';
import { defineEventHandler, handleCacheHeaders, createEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, getRequestHeader, getRequestHeaders, setResponseHeader, createError, lazyEventHandler, createApp, createRouter as createRouter$1, toNodeListener, fetchWithEvent } from 'h3';
import { createFetch as createFetch$1, Headers } from 'ofetch';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { createHooks } from 'hookable';
import { snakeCase } from 'scule';
import { hash } from 'ohash';
import { parseURL, withoutBase, joinURL, withQuery, withLeadingSlash, withoutTrailingSlash } from 'ufo';
import { createStorage } from 'unstorage';
import defu from 'defu';
import { toRouteMatcher, createRouter } from 'radix3';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'pathe';
import { createIPX, createIPXMiddleware } from 'ipx';

const _runtimeConfig = {"app":{"baseURL":"/","buildAssetsDir":"/_nuxt/","cdnURL":""},"nitro":{"envPrefix":"NUXT_","routeRules":{"/__nuxt_error":{"cache":false},"/_nuxt/**":{"headers":{"cache-control":"public, max-age=2592000, immutable"}}}},"public":{"ENV":"dev","SERVER_URL":"https://backend.eileengeorge.de","BREVO_API_KEY":"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"},"ipx":{"dir":"../public","domains":[],"sharp":{},"alias":{}}};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _runtimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
const getEnv = (key) => {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]
  );
};
function isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function overrideConfig(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey);
    if (isObject(obj[key])) {
      if (isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      overrideConfig(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
}
overrideConfig(_runtimeConfig);
const config$1 = deepFreeze(_runtimeConfig);
const useRuntimeConfig = () => config$1;
function deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
}

const _assets = {

};

function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

const storage = createStorage({});

const useStorage = () => storage;

storage.mount('/assets', assets$1);

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  const validate = opts.validate || (() => true);
  async function get(key, resolver, shouldInvalidateCache) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || !validate(entry);
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      entry.value = await pending[key];
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry)) {
          useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = opts.shouldInvalidateCache?.(...args);
    const entry = await get(key, () => fn(...args), shouldInvalidateCache);
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return key.replace(/[^\dA-Za-z]/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const key = await opts.getKey?.(event);
      if (key) {
        return escapeKey(key);
      }
      const url = event.node.req.originalUrl || event.node.req.url;
      const friendlyName = escapeKey(decodeURI(parseURL(url).pathname)).slice(
        0,
        16
      );
      const urlHash = hash(url);
      return `${friendlyName}.${urlHash}`;
    },
    validate: (entry) => {
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: [opts.integrity, handler]
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const reqProxy = cloneWithProxy(incomingEvent.node.req, { headers: {} });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            for (const header in headers2) {
              this.setHeader(header, headers2[header]);
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.context = incomingEvent.context;
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = headers.Etag || headers.etag || `W/"${hash(body)}"`;
      headers["last-modified"] = headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString();
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      event.node.res.setHeader(name, response.headers[name]);
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler() {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      return sendRedirect(
        event,
        routeRules.redirect.to,
        routeRules.redirect.statusCode
      );
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      }
      return proxyRequest(event, target, {
        fetch: $fetch.raw,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    const path = new URL(event.node.req.url, "http://localhost").pathname;
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(path, useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const plugins = [
  
];

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function normalizeError(error) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.node.req.url,
    statusCode,
    statusMessage,
    message,
    stack: "",
    data: error.data
  };
  event.node.res.statusCode = errorObject.statusCode !== 200 && errorObject.statusCode || 500;
  if (errorObject.statusMessage) {
    event.node.res.statusMessage = errorObject.statusMessage;
  }
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (isJsonRequest(event)) {
    event.node.res.setHeader("Content-Type", "application/json");
    event.node.res.end(JSON.stringify(errorObject));
    return;
  }
  const isErrorPage = event.node.req.url?.startsWith("/__nuxt_error");
  const res = !isErrorPage ? await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig().app.baseURL, "/__nuxt_error"), errorObject), {
    headers: getRequestHeaders(event),
    redirect: "manual"
  }).catch(() => null) : null;
  if (!res) {
    const { template } = await import('./error-500.mjs');
    event.node.res.setHeader("Content-Type", "text/html;charset=UTF-8");
    event.node.res.end(template(errorObject));
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  if (res.status && res.status !== 200) {
    event.node.res.statusCode = res.status;
  }
  if (res.statusText) {
    event.node.res.statusMessage = res.statusText;
  }
  event.node.res.end(await res.text());
});

const assets = {
  "/audio.jpg": {
    "type": "image/jpeg",
    "etag": "\"22efb-1EunF71GNVlBHz2ivlkES/oN9SI\"",
    "mtime": "2024-03-02T20:07:57.360Z",
    "size": 143099,
    "path": "../public/audio.jpg"
  },
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"3aee-dT2XTeUG3x0ADJ3F6s63sIzEYzU\"",
    "mtime": "2024-02-24T13:17:34.643Z",
    "size": 15086,
    "path": "../public/favicon.ico"
  },
  "/hero-bg.svg": {
    "type": "image/svg+xml",
    "etag": "\"6c61-F42yYqI6bJM++ZRuTl5pQSy/YA4\"",
    "mtime": "2024-03-24T15:34:21.755Z",
    "size": 27745,
    "path": "../public/hero-bg.svg"
  },
  "/hero-bg2.svg": {
    "type": "image/svg+xml",
    "etag": "\"17360-sGx7sBzJJT2dFDgzGHLDxX70KKo\"",
    "mtime": "2024-03-24T16:28:39.094Z",
    "size": 95072,
    "path": "../public/hero-bg2.svg"
  },
  "/hero-bg3.svg": {
    "type": "image/svg+xml",
    "etag": "\"18738-Yn7MpEmsgA0AWuVM+j7FcmPen4k\"",
    "mtime": "2024-03-24T16:28:39.211Z",
    "size": 100152,
    "path": "../public/hero-bg3.svg"
  },
  "/hero-bg4.svg": {
    "type": "image/svg+xml",
    "etag": "\"4f2e-An/yGWuftFN4l1H/DUo3vIhi0pI\"",
    "mtime": "2024-03-24T16:44:12.622Z",
    "size": 20270,
    "path": "../public/hero-bg4.svg"
  },
  "/hero-bg5.svg": {
    "type": "image/svg+xml",
    "etag": "\"24374-GbmBEFbB52fFVz39kCfCWHX5JK0\"",
    "mtime": "2024-03-24T16:51:00.754Z",
    "size": 148340,
    "path": "../public/hero-bg5.svg"
  },
  "/image-blank.svg": {
    "type": "image/svg+xml",
    "etag": "\"3cc7-Y/X3uOHmjM29BJ5vnxaAVqqGSxc\"",
    "mtime": "2024-03-03T18:23:02.476Z",
    "size": 15559,
    "path": "../public/image-blank.svg"
  },
  "/image-eileen-cropped.jpg": {
    "type": "image/jpeg",
    "etag": "\"39906-g9gKB1eeSyUN7/TqVoFV6nR+Hko\"",
    "mtime": "2024-03-29T16:04:32.935Z",
    "size": 235782,
    "path": "../public/image-eileen-cropped.jpg"
  },
  "/image-eileen-head.jpg": {
    "type": "image/jpeg",
    "etag": "\"1ea07-25oj1p75a8csJV16WRg3KxPbju8\"",
    "mtime": "2024-03-29T16:04:32.958Z",
    "size": 125447,
    "path": "../public/image-eileen-head.jpg"
  },
  "/image-eileen.jpg": {
    "type": "image/jpeg",
    "etag": "\"73c0b-OqQMHSaFcBvNiLLEuqKngs8U330\"",
    "mtime": "2024-03-29T16:04:32.960Z",
    "size": 474123,
    "path": "../public/image-eileen.jpg"
  },
  "/image-find_your_way_home.jpg": {
    "type": "image/jpeg",
    "etag": "\"18fce-tWlk5LRiJMhslTwRfYsKPDR0ybM\"",
    "mtime": "2024-02-25T23:36:47.892Z",
    "size": 102350,
    "path": "../public/image-find_your_way_home.jpg"
  },
  "/image-psychological_coaching.jpg": {
    "type": "image/jpeg",
    "etag": "\"14199-EsfXfi2Ci8b3t9IhuRTZCyRvJY4\"",
    "mtime": "2024-02-25T23:36:47.899Z",
    "size": 82329,
    "path": "../public/image-psychological_coaching.jpg"
  },
  "/postit-1.png": {
    "type": "image/png",
    "etag": "\"fc73-jMT/3pCYZV23yf0u3jBibvd5GZE\"",
    "mtime": "2024-02-24T13:17:34.644Z",
    "size": 64627,
    "path": "../public/postit-1.png"
  },
  "/postit-2.png": {
    "type": "image/png",
    "etag": "\"ea04-czbSNb+3C3lXi6rFw0fhgUiqqlc\"",
    "mtime": "2024-02-24T13:17:34.645Z",
    "size": 59908,
    "path": "../public/postit-2.png"
  },
  "/postit-3.png": {
    "type": "image/png",
    "etag": "\"1275c-JApa79yprdxZ+O+UT+lMl233nlI\"",
    "mtime": "2024-02-24T13:17:34.647Z",
    "size": 75612,
    "path": "../public/postit-3.png"
  },
  "/postit-4.png": {
    "type": "image/png",
    "etag": "\"11e3a-xL1dnEAK+pAjU/tRodYYeHlA2Vs\"",
    "mtime": "2024-02-24T13:17:34.648Z",
    "size": 73274,
    "path": "../public/postit-4.png"
  },
  "/robots.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"58-N9b3ecNhyAYvDHqiB9paBil/eCk\"",
    "mtime": "2024-02-24T15:49:25.834Z",
    "size": 88,
    "path": "../public/robots.txt"
  },
  "/trees.webp": {
    "type": "image/webp",
    "etag": "\"9d980-k4B5JEMreMCfwM1usDlWofyb/Bs\"",
    "mtime": "2024-03-03T18:46:15.266Z",
    "size": 645504,
    "path": "../public/trees.webp"
  },
  "/origs/hero-bg.svg": {
    "type": "image/svg+xml",
    "etag": "\"ddc-nQkd54uHxrMS4vb2PdZZ7Bw07tI\"",
    "mtime": "2024-02-25T00:03:21.586Z",
    "size": 3548,
    "path": "../public/origs/hero-bg.svg"
  },
  "/_nuxt/ArrayPane.vue.30341060.js": {
    "type": "application/javascript",
    "etag": "\"600-jq+Qah+Kn8eaWECA+sIOa7S5Ddg\"",
    "mtime": "2024-03-30T20:14:33.681Z",
    "size": 1536,
    "path": "../public/_nuxt/ArrayPane.vue.30341060.js"
  },
  "/_nuxt/asyncData.04ba2ccc.js": {
    "type": "application/javascript",
    "etag": "\"955-kwLiqrV0qMD2s9U2u6GzgnEUqDk\"",
    "mtime": "2024-03-30T20:14:33.680Z",
    "size": 2389,
    "path": "../public/_nuxt/asyncData.04ba2ccc.js"
  },
  "/_nuxt/Audio.1a5e2757.js": {
    "type": "application/javascript",
    "etag": "\"ec6-5eCtOBRPj4vvseSkE+cJqxjhAsk\"",
    "mtime": "2024-03-30T20:14:33.667Z",
    "size": 3782,
    "path": "../public/_nuxt/Audio.1a5e2757.js"
  },
  "/_nuxt/Audio.244951ec.js": {
    "type": "application/javascript",
    "etag": "\"7f4e-NbrqXdmUXV8JnyIAtfT1lFFDelo\"",
    "mtime": "2024-03-30T20:14:33.696Z",
    "size": 32590,
    "path": "../public/_nuxt/Audio.244951ec.js"
  },
  "/_nuxt/Audio.a3c20319.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7f-RfGFhMVvg0XRJU4lhDp+8jMrIt8\"",
    "mtime": "2024-03-30T20:14:33.635Z",
    "size": 127,
    "path": "../public/_nuxt/Audio.a3c20319.css"
  },
  "/_nuxt/bak-index.c8a363a9.js": {
    "type": "application/javascript",
    "etag": "\"179-tKwN/DbGw4Pzyhd4zqZuSgO3EAs\"",
    "mtime": "2024-03-30T20:14:33.667Z",
    "size": 377,
    "path": "../public/_nuxt/bak-index.c8a363a9.js"
  },
  "/_nuxt/blank.bb4142f2.js": {
    "type": "application/javascript",
    "etag": "\"1fe-+84Yf5PFtYVcqPXK4zkRatel1ig\"",
    "mtime": "2024-03-30T20:14:33.667Z",
    "size": 510,
    "path": "../public/_nuxt/blank.bb4142f2.js"
  },
  "/_nuxt/Block.4a7f39b8.js": {
    "type": "application/javascript",
    "etag": "\"9c20-MPK9rlXXOnTyIOOj8kiHP10l2LI\"",
    "mtime": "2024-03-30T20:14:33.694Z",
    "size": 39968,
    "path": "../public/_nuxt/Block.4a7f39b8.js"
  },
  "/_nuxt/BlockRenderer.a0bd72d9.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"5f-gDASvBie5KUEnKlwyIjku61RDS0\"",
    "mtime": "2024-03-30T20:14:33.635Z",
    "size": 95,
    "path": "../public/_nuxt/BlockRenderer.a0bd72d9.css"
  },
  "/_nuxt/BlockRenderer.vue.aab31ca1.js": {
    "type": "application/javascript",
    "etag": "\"10f8-LqHPJJgzPf97RnEelZ6Qr4Kpb10\"",
    "mtime": "2024-03-30T20:14:33.681Z",
    "size": 4344,
    "path": "../public/_nuxt/BlockRenderer.vue.aab31ca1.js"
  },
  "/_nuxt/BookingCalendar.2af19399.js": {
    "type": "application/javascript",
    "etag": "\"6905-WXaRaHvAR4XH0gakIjPOFhInyhc\"",
    "mtime": "2024-03-30T20:14:33.696Z",
    "size": 26885,
    "path": "../public/_nuxt/BookingCalendar.2af19399.js"
  },
  "/_nuxt/BookingCalendar.4c3cd375.js": {
    "type": "application/javascript",
    "etag": "\"e52-Ly9nF7rXTdElVQsIjBaQs6VXGRo\"",
    "mtime": "2024-03-30T20:14:33.686Z",
    "size": 3666,
    "path": "../public/_nuxt/BookingCalendar.4c3cd375.js"
  },
  "/_nuxt/BookingCalendar.5da9e906.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"5b7-5h6UFSDfV+4fSyRf+jU3lh7m+2M\"",
    "mtime": "2024-03-30T20:14:33.635Z",
    "size": 1463,
    "path": "../public/_nuxt/BookingCalendar.5da9e906.css"
  },
  "/_nuxt/buchungen.0d87a8bc.js": {
    "type": "application/javascript",
    "etag": "\"2a5e-qN9l/UFZj5ATjYIdBhAV6LWk5kM\"",
    "mtime": "2024-03-30T20:14:33.685Z",
    "size": 10846,
    "path": "../public/_nuxt/buchungen.0d87a8bc.js"
  },
  "/_nuxt/Calltoaction.680cc8b1.js": {
    "type": "application/javascript",
    "etag": "\"37b-hYpwDIM07NJZx2Clv+8K9cE1CD8\"",
    "mtime": "2024-03-30T20:14:33.668Z",
    "size": 891,
    "path": "../public/_nuxt/Calltoaction.680cc8b1.js"
  },
  "/_nuxt/ClickableHeadings.2ec5cd27.js": {
    "type": "application/javascript",
    "etag": "\"a0a-W+wBJv5J9drERBXrj4I8Ds3ugWc\"",
    "mtime": "2024-03-30T20:14:33.696Z",
    "size": 2570,
    "path": "../public/_nuxt/ClickableHeadings.2ec5cd27.js"
  },
  "/_nuxt/ClickableHeadings.3057427b.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"8a-YmjIAmbrD9UHf1J7esku6Hug4DY\"",
    "mtime": "2024-03-30T20:14:33.635Z",
    "size": 138,
    "path": "../public/_nuxt/ClickableHeadings.3057427b.css"
  },
  "/_nuxt/ClickableHeadings.9aaca830.js": {
    "type": "application/javascript",
    "etag": "\"64c-/F6VNuZzxWK0rjz8dhJV7nbhI6I\"",
    "mtime": "2024-03-30T20:14:33.656Z",
    "size": 1612,
    "path": "../public/_nuxt/ClickableHeadings.9aaca830.js"
  },
  "/_nuxt/Component.8770972d.js": {
    "type": "application/javascript",
    "etag": "\"12d91-froS9VY+3sXbtj3I/Xif7RjzVEw\"",
    "mtime": "2024-03-30T20:14:33.680Z",
    "size": 77201,
    "path": "../public/_nuxt/Component.8770972d.js"
  },
  "/_nuxt/composables.157ec9c0.js": {
    "type": "application/javascript",
    "etag": "\"61-fZT8CsaWnZ58ao4PIpSwDqW+xgc\"",
    "mtime": "2024-03-30T20:14:33.667Z",
    "size": 97,
    "path": "../public/_nuxt/composables.157ec9c0.js"
  },
  "/_nuxt/composables.9130a2d4.js": {
    "type": "application/javascript",
    "etag": "\"ba7-405ySA1BlNpfpfhWJqO6ldibyqY\"",
    "mtime": "2024-03-30T20:14:33.656Z",
    "size": 2983,
    "path": "../public/_nuxt/composables.9130a2d4.js"
  },
  "/_nuxt/Contact.526219c6.js": {
    "type": "application/javascript",
    "etag": "\"12fb-rJLri4YT6+sZNsdJz4WK6YU1jQI\"",
    "mtime": "2024-03-30T20:14:33.694Z",
    "size": 4859,
    "path": "../public/_nuxt/Contact.526219c6.js"
  },
  "/_nuxt/Contact.baa24f08.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"c8-2I2rvGXBxJIB2z69h4ByYJnAAhQ\"",
    "mtime": "2024-03-30T20:14:33.630Z",
    "size": 200,
    "path": "../public/_nuxt/Contact.baa24f08.css"
  },
  "/_nuxt/Contact.ecd83e9e.js": {
    "type": "application/javascript",
    "etag": "\"945-djeMgKqbn2VrtJjz5yAjwN7DxUM\"",
    "mtime": "2024-03-30T20:14:33.649Z",
    "size": 2373,
    "path": "../public/_nuxt/Contact.ecd83e9e.js"
  },
  "/_nuxt/Container.e005cebf.js": {
    "type": "application/javascript",
    "etag": "\"21b-VtcXkQ0EGZgRgQkFJdXW3y8YDaY\"",
    "mtime": "2024-03-30T20:14:33.644Z",
    "size": 539,
    "path": "../public/_nuxt/Container.e005cebf.js"
  },
  "/_nuxt/Container.vue.bfb968eb.js": {
    "type": "application/javascript",
    "etag": "\"679-33NbN3xzXNUOAgIQh5+4jm1hSW0\"",
    "mtime": "2024-03-30T20:14:33.656Z",
    "size": 1657,
    "path": "../public/_nuxt/Container.vue.bfb968eb.js"
  },
  "/_nuxt/Default.778ccb8e.js": {
    "type": "application/javascript",
    "etag": "\"123-mEacmvZ8E3tzppOq8Lqbt5wOqvY\"",
    "mtime": "2024-03-30T20:14:33.675Z",
    "size": 291,
    "path": "../public/_nuxt/Default.778ccb8e.js"
  },
  "/_nuxt/Default.a6696a8d.js": {
    "type": "application/javascript",
    "etag": "\"f7-XbeZ1yF6knkeKM9GTY+gORa9fec\"",
    "mtime": "2024-03-30T20:14:33.667Z",
    "size": 247,
    "path": "../public/_nuxt/Default.a6696a8d.js"
  },
  "/_nuxt/default.cd4f64a8.js": {
    "type": "application/javascript",
    "etag": "\"2df-HEDjDdPGDq67POpgoM4VzIbNCr4\"",
    "mtime": "2024-03-30T20:14:33.677Z",
    "size": 735,
    "path": "../public/_nuxt/default.cd4f64a8.js"
  },
  "/_nuxt/defaults.24cc49a8.js": {
    "type": "application/javascript",
    "etag": "\"113b-aR+WEwzxZbcxXv1ZjYeAZ/bgJ+Y\"",
    "mtime": "2024-03-30T20:14:33.649Z",
    "size": 4411,
    "path": "../public/_nuxt/defaults.24cc49a8.js"
  },
  "/_nuxt/Downloads.265b4110.js": {
    "type": "application/javascript",
    "etag": "\"1863-WL6Tzm099CM/tFLFpUZda7H0ZWA\"",
    "mtime": "2024-03-30T20:14:33.686Z",
    "size": 6243,
    "path": "../public/_nuxt/Downloads.265b4110.js"
  },
  "/_nuxt/Downloads.56cdc461.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2b-2RnMOoGAkzsCE5LLGpzPRgfEy70\"",
    "mtime": "2024-03-30T20:14:33.635Z",
    "size": 43,
    "path": "../public/_nuxt/Downloads.56cdc461.css"
  },
  "/_nuxt/Downloads.755db48f.js": {
    "type": "application/javascript",
    "etag": "\"2c2-fT/qFS2fwfgnLujHXdF10UbhYds\"",
    "mtime": "2024-03-30T20:14:33.642Z",
    "size": 706,
    "path": "../public/_nuxt/Downloads.755db48f.js"
  },
  "/_nuxt/entry.714c7b7e.js": {
    "type": "application/javascript",
    "etag": "\"4f12e-3sVm+bIo6MSqD93s5zKL5oqQJFQ\"",
    "mtime": "2024-03-30T20:14:33.700Z",
    "size": 323886,
    "path": "../public/_nuxt/entry.714c7b7e.js"
  },
  "/_nuxt/entry.c344dd44.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"9646-0gsnDLK/QffAaa+vI3XXPXoSlV0\"",
    "mtime": "2024-03-30T20:14:33.630Z",
    "size": 38470,
    "path": "../public/_nuxt/entry.c344dd44.css"
  },
  "/_nuxt/error-404.8bdbaeb8.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e70-jl7r/kE1FF0H+CLPNh+07RJXuFI\"",
    "mtime": "2024-03-30T20:14:33.635Z",
    "size": 3696,
    "path": "../public/_nuxt/error-404.8bdbaeb8.css"
  },
  "/_nuxt/error-404.fa6b6cfd.js": {
    "type": "application/javascript",
    "etag": "\"92e-tL2Pc+9cf5oXPrg3JdPXJhtMXFc\"",
    "mtime": "2024-03-30T20:14:33.696Z",
    "size": 2350,
    "path": "../public/_nuxt/error-404.fa6b6cfd.js"
  },
  "/_nuxt/error-500.8c7e7f60.js": {
    "type": "application/javascript",
    "etag": "\"7b2-kN3v2m4QFYAoKtKQDGp/WIeEmVI\"",
    "mtime": "2024-03-30T20:14:33.680Z",
    "size": 1970,
    "path": "../public/_nuxt/error-500.8c7e7f60.js"
  },
  "/_nuxt/error-500.b63a96f5.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7e0-loEWA9n4Kq4UMBzJyT6hY9SSl00\"",
    "mtime": "2024-03-30T20:14:33.635Z",
    "size": 2016,
    "path": "../public/_nuxt/error-500.b63a96f5.css"
  },
  "/_nuxt/error-component.e1524601.js": {
    "type": "application/javascript",
    "etag": "\"504-9m7hdp9dP5eY48BAdmUXclX3qas\"",
    "mtime": "2024-03-30T20:14:33.662Z",
    "size": 1284,
    "path": "../public/_nuxt/error-component.e1524601.js"
  },
  "/_nuxt/Faq.09a739ba.js": {
    "type": "application/javascript",
    "etag": "\"7e0-ozzQd8Kp3dNJFtPPOykfkJbZUnc\"",
    "mtime": "2024-03-30T20:14:33.675Z",
    "size": 2016,
    "path": "../public/_nuxt/Faq.09a739ba.js"
  },
  "/_nuxt/Faq.e07ff0ec.js": {
    "type": "application/javascript",
    "etag": "\"76c-mqV5WfIo/8IK5KtfAwPNDNO6wf4\"",
    "mtime": "2024-03-30T20:14:33.649Z",
    "size": 1900,
    "path": "../public/_nuxt/Faq.e07ff0ec.js"
  },
  "/_nuxt/Footer.vue.42ffa247.js": {
    "type": "application/javascript",
    "etag": "\"ba1-EbxEqODGxZ8LNPdHW5Lh7x0j/Cg\"",
    "mtime": "2024-03-30T20:14:33.656Z",
    "size": 2977,
    "path": "../public/_nuxt/Footer.vue.42ffa247.js"
  },
  "/_nuxt/helpers.37c70a75.js": {
    "type": "application/javascript",
    "etag": "\"293-3Xp5nC6ou7HRkB6d8Bnkqw/LaGA\"",
    "mtime": "2024-03-30T20:14:33.643Z",
    "size": 659,
    "path": "../public/_nuxt/helpers.37c70a75.js"
  },
  "/_nuxt/HeroBig.4412d70a.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3c-n4isMMIPKOuGSFMt3gJmHrllPcA\"",
    "mtime": "2024-03-30T20:14:33.635Z",
    "size": 60,
    "path": "../public/_nuxt/HeroBig.4412d70a.css"
  },
  "/_nuxt/HeroBig.864ae773.js": {
    "type": "application/javascript",
    "etag": "\"1b8c-fSacjH99x4YpJV5xpGbtavsgrIQ\"",
    "mtime": "2024-03-30T20:14:33.667Z",
    "size": 7052,
    "path": "../public/_nuxt/HeroBig.864ae773.js"
  },
  "/_nuxt/HeroBig.dbd6de02.js": {
    "type": "application/javascript",
    "etag": "\"7da-sqMD7FWYumpeDdBJToVYUSNamNs\"",
    "mtime": "2024-03-30T20:14:33.694Z",
    "size": 2010,
    "path": "../public/_nuxt/HeroBig.dbd6de02.js"
  },
  "/_nuxt/HeroSmall.3cb3b25a.js": {
    "type": "application/javascript",
    "etag": "\"94b-xtCacqXhkmhGt64joNRRgpjm5tQ\"",
    "mtime": "2024-03-30T20:14:33.656Z",
    "size": 2379,
    "path": "../public/_nuxt/HeroSmall.3cb3b25a.js"
  },
  "/_nuxt/HeroSmall.e9ca3c95.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3c-HkWIgaUdu5WzAyBoquJQEQt6ViA\"",
    "mtime": "2024-03-30T20:14:33.632Z",
    "size": 60,
    "path": "../public/_nuxt/HeroSmall.e9ca3c95.css"
  },
  "/_nuxt/HeroSmall.eeb8f42d.js": {
    "type": "application/javascript",
    "etag": "\"7f9-mmj6lecYL71vJlRK2m/Cz3uNq/U\"",
    "mtime": "2024-03-30T20:14:33.685Z",
    "size": 2041,
    "path": "../public/_nuxt/HeroSmall.eeb8f42d.js"
  },
  "/_nuxt/icon-archive.1763f3b7.js": {
    "type": "application/javascript",
    "etag": "\"261-+DLrp+6B8BtD0DFPa7xXbOWFcRI\"",
    "mtime": "2024-03-30T20:14:33.656Z",
    "size": 609,
    "path": "../public/_nuxt/icon-archive.1763f3b7.js"
  },
  "/_nuxt/icon-area.2d0562f9.js": {
    "type": "application/javascript",
    "etag": "\"27b-V+SfGo1W0kb6Z7XwIYZmD8+A024\"",
    "mtime": "2024-03-30T20:14:33.685Z",
    "size": 635,
    "path": "../public/_nuxt/icon-area.2d0562f9.js"
  },
  "/_nuxt/icon-arrow_down.238da9d1.js": {
    "type": "application/javascript",
    "etag": "\"171-w6L9FzQmHt/uK+fBqs5UDaLbyvA\"",
    "mtime": "2024-03-30T20:14:33.675Z",
    "size": 369,
    "path": "../public/_nuxt/icon-arrow_down.238da9d1.js"
  },
  "/_nuxt/icon-arrow_left.c4801f41.js": {
    "type": "application/javascript",
    "etag": "\"170-zn/4ivMDEMlavOcIJ9G3wlf2hEA\"",
    "mtime": "2024-03-30T20:14:33.662Z",
    "size": 368,
    "path": "../public/_nuxt/icon-arrow_left.c4801f41.js"
  },
  "/_nuxt/icon-arrow_right.d220ba52.js": {
    "type": "application/javascript",
    "etag": "\"174-Oonx9B20V1HMqKvlIllmAC/LCCU\"",
    "mtime": "2024-03-30T20:14:33.676Z",
    "size": 372,
    "path": "../public/_nuxt/icon-arrow_right.d220ba52.js"
  },
  "/_nuxt/icon-arrow_up.d0c70d43.js": {
    "type": "application/javascript",
    "etag": "\"174-CvZAX9JTuwkeYgsHLMQ86ZJ9pn0\"",
    "mtime": "2024-03-30T20:14:33.662Z",
    "size": 372,
    "path": "../public/_nuxt/icon-arrow_up.d0c70d43.js"
  },
  "/_nuxt/icon-Audio.c6bff5c6.js": {
    "type": "application/javascript",
    "etag": "\"324-+ZOK0sjGXEa8gavKgwOyX5csh5g\"",
    "mtime": "2024-03-30T20:14:33.642Z",
    "size": 804,
    "path": "../public/_nuxt/icon-Audio.c6bff5c6.js"
  },
  "/_nuxt/icon-BookingCalendar.8dbf5310.js": {
    "type": "application/javascript",
    "etag": "\"503-PDdP8YjaG3kN6cBk1/+t0xsIZqQ\"",
    "mtime": "2024-03-30T20:14:33.642Z",
    "size": 1283,
    "path": "../public/_nuxt/icon-BookingCalendar.8dbf5310.js"
  },
  "/_nuxt/icon-bug.3b18a914.js": {
    "type": "application/javascript",
    "etag": "\"43a-DHzXkAx5RF35mdsBzXfzcZL6NT0\"",
    "mtime": "2024-03-30T20:14:33.641Z",
    "size": 1082,
    "path": "../public/_nuxt/icon-bug.3b18a914.js"
  },
  "/_nuxt/icon-camera.fd0e590f.js": {
    "type": "application/javascript",
    "etag": "\"26b-CkIDCWsiNembMoxcH8NXbizQXc0\"",
    "mtime": "2024-03-30T20:14:33.680Z",
    "size": 619,
    "path": "../public/_nuxt/icon-camera.fd0e590f.js"
  },
  "/_nuxt/icon-car.f1507615.js": {
    "type": "application/javascript",
    "etag": "\"34a-heI0pvyHKTxAwU3ADA+4vdd3aA4\"",
    "mtime": "2024-03-30T20:14:33.682Z",
    "size": 842,
    "path": "../public/_nuxt/icon-car.f1507615.js"
  },
  "/_nuxt/icon-caret-left.5cb81b32.js": {
    "type": "application/javascript",
    "etag": "\"206-KhFHCJiqa335sHXp2itSbR4pmYo\"",
    "mtime": "2024-03-30T20:14:33.680Z",
    "size": 518,
    "path": "../public/_nuxt/icon-caret-left.5cb81b32.js"
  },
  "/_nuxt/icon-caret-right.b22c6143.js": {
    "type": "application/javascript",
    "etag": "\"206-k6Kqx0PaVxMMJEy4N8WiUAmAjjc\"",
    "mtime": "2024-03-30T20:14:33.662Z",
    "size": 518,
    "path": "../public/_nuxt/icon-caret-right.b22c6143.js"
  },
  "/_nuxt/icon-center-aligned.0cf0cae6.js": {
    "type": "application/javascript",
    "etag": "\"333-KqHFQtu1db3J59Z0lAee8PAa+EE\"",
    "mtime": "2024-03-30T20:14:33.649Z",
    "size": 819,
    "path": "../public/_nuxt/icon-center-aligned.0cf0cae6.js"
  },
  "/_nuxt/icon-check.4a070d5e.js": {
    "type": "application/javascript",
    "etag": "\"128-NHDVOQkydIVRRgs4FPmC+Cja6X0\"",
    "mtime": "2024-03-30T20:14:33.642Z",
    "size": 296,
    "path": "../public/_nuxt/icon-check.4a070d5e.js"
  },
  "/_nuxt/icon-circle.0a9d352c.js": {
    "type": "application/javascript",
    "etag": "\"ff-4XDbHx0PbzTghUnGT05hycelmHE\"",
    "mtime": "2024-03-30T20:14:33.649Z",
    "size": 255,
    "path": "../public/_nuxt/icon-circle.0a9d352c.js"
  },
  "/_nuxt/icon-ClickableHeadings.2577bbc3.js": {
    "type": "application/javascript",
    "etag": "\"359-rpVzBfHxqaJpKBXNBj93qQmGCrU\"",
    "mtime": "2024-03-30T20:14:33.662Z",
    "size": 857,
    "path": "../public/_nuxt/icon-ClickableHeadings.2577bbc3.js"
  },
  "/_nuxt/icon-co2.1f3fbaa2.js": {
    "type": "application/javascript",
    "etag": "\"f8-or/9nCZ9j+lKnO4hsZSlzr3WcOo\"",
    "mtime": "2024-03-30T20:14:33.649Z",
    "size": 248,
    "path": "../public/_nuxt/icon-co2.1f3fbaa2.js"
  },
  "/_nuxt/icon-consulting.3e6314d5.js": {
    "type": "application/javascript",
    "etag": "\"8a6-/V7klcPPpV1zFkBj14wD9SU9aco\"",
    "mtime": "2024-03-30T20:14:33.649Z",
    "size": 2214,
    "path": "../public/_nuxt/icon-consulting.3e6314d5.js"
  },
  "/_nuxt/icon-Contact.5d67c47e.js": {
    "type": "application/javascript",
    "etag": "\"1e2-6H7kOxo6sKxS+dDP3NM9c4dO9Mo\"",
    "mtime": "2024-03-30T20:14:33.649Z",
    "size": 482,
    "path": "../public/_nuxt/icon-Contact.5d67c47e.js"
  },
  "/_nuxt/icon-copy.82ad9815.js": {
    "type": "application/javascript",
    "etag": "\"1b0-16ShkOvK5ZFD4it6Hq/LW/nyJkI\"",
    "mtime": "2024-03-30T20:14:33.656Z",
    "size": 432,
    "path": "../public/_nuxt/icon-copy.82ad9815.js"
  },
  "/_nuxt/icon-cost.7b5894b5.js": {
    "type": "application/javascript",
    "etag": "\"18f-DbdueujaGfvJ0NpUpKTsLvVQcBU\"",
    "mtime": "2024-03-30T20:14:33.680Z",
    "size": 399,
    "path": "../public/_nuxt/icon-cost.7b5894b5.js"
  },
  "/_nuxt/icon-cross.647c2b5f.js": {
    "type": "application/javascript",
    "etag": "\"12d-pD4k6bLwJGJZW5ZfZg9GQ4+jsrQ\"",
    "mtime": "2024-03-30T20:14:33.680Z",
    "size": 301,
    "path": "../public/_nuxt/icon-cross.647c2b5f.js"
  },
  "/_nuxt/icon-customer_service.614393a9.js": {
    "type": "application/javascript",
    "etag": "\"37f-sr7XXC19CmFLFjU3emA4pgDvmqQ\"",
    "mtime": "2024-03-30T20:14:33.638Z",
    "size": 895,
    "path": "../public/_nuxt/icon-customer_service.614393a9.js"
  },
  "/_nuxt/icon-customer_support.e3dbba6e.js": {
    "type": "application/javascript",
    "etag": "\"600-6RHfDNEFhlDCUI8BHp6iSdylDgQ\"",
    "mtime": "2024-03-30T20:14:33.642Z",
    "size": 1536,
    "path": "../public/_nuxt/icon-customer_support.e3dbba6e.js"
  },
  "/_nuxt/icon-dashboard.bddf6744.js": {
    "type": "application/javascript",
    "etag": "\"1a5-hBFEmWK10E4aKxlpppFj+Krg35Y\"",
    "mtime": "2024-03-30T20:14:33.649Z",
    "size": 421,
    "path": "../public/_nuxt/icon-dashboard.bddf6744.js"
  },
  "/_nuxt/icon-Default.63f4c97b.js": {
    "type": "application/javascript",
    "etag": "\"17e-NbXe0TN8wly+pIxeH+zOyGninXA\"",
    "mtime": "2024-03-30T20:14:33.668Z",
    "size": 382,
    "path": "../public/_nuxt/icon-Default.63f4c97b.js"
  },
  "/_nuxt/icon-desktop.dca8c5f2.js": {
    "type": "application/javascript",
    "etag": "\"2a4-xwCrTeKcgO+vo/XLESkdw+RlODU\"",
    "mtime": "2024-03-30T20:14:33.667Z",
    "size": 676,
    "path": "../public/_nuxt/icon-desktop.dca8c5f2.js"
  },
  "/_nuxt/icon-dials.ebe13a16.js": {
    "type": "application/javascript",
    "etag": "\"4b7-nrEwOF8PIdwQQCSt9SRxiBvp7OY\"",
    "mtime": "2024-03-30T20:14:33.675Z",
    "size": 1207,
    "path": "../public/_nuxt/icon-dials.ebe13a16.js"
  },
  "/_nuxt/icon-dot.c32c6d4c.js": {
    "type": "application/javascript",
    "etag": "\"91-FphsvPJceNN6tkq0wvjvAKzQMLE\"",
    "mtime": "2024-03-30T20:14:33.649Z",
    "size": 145,
    "path": "../public/_nuxt/icon-dot.c32c6d4c.js"
  },
  "/_nuxt/icon-download.9ccdfe8a.js": {
    "type": "application/javascript",
    "etag": "\"1c3-edFiDL3VFsZlqmpPFPbZUnw/apM\"",
    "mtime": "2024-03-30T20:14:33.662Z",
    "size": 451,
    "path": "../public/_nuxt/icon-download.9ccdfe8a.js"
  },
  "/_nuxt/icon-Downloads.d28311ee.js": {
    "type": "application/javascript",
    "etag": "\"6b4-gTJyc1BQz0Hnld0ca9Ko5e1LWEU\"",
    "mtime": "2024-03-30T20:14:33.655Z",
    "size": 1716,
    "path": "../public/_nuxt/icon-Downloads.d28311ee.js"
  },
  "/_nuxt/icon-dragarea.4cd48675.js": {
    "type": "application/javascript",
    "etag": "\"1e3-UsM0IlXKPUh3tTPqeynoDDots+M\"",
    "mtime": "2024-03-30T20:14:33.642Z",
    "size": 483,
    "path": "../public/_nuxt/icon-dragarea.4cd48675.js"
  },
  "/_nuxt/icon-eco.085f03d1.js": {
    "type": "application/javascript",
    "etag": "\"24a-WLehZAB/ZIJgCuKL/2JtKYNTj5E\"",
    "mtime": "2024-03-30T20:14:33.656Z",
    "size": 586,
    "path": "../public/_nuxt/icon-eco.085f03d1.js"
  },
  "/_nuxt/icon-energy.168355c4.js": {
    "type": "application/javascript",
    "etag": "\"c3-0Y/XGsI/MoJWaOfodXPXfhWo6ZU\"",
    "mtime": "2024-03-30T20:14:33.642Z",
    "size": 195,
    "path": "../public/_nuxt/icon-energy.168355c4.js"
  },
  "/_nuxt/icon-error.553241b0.js": {
    "type": "application/javascript",
    "etag": "\"219-s+gn+0O4H4YCXZRvzSK6IlwDTOQ\"",
    "mtime": "2024-03-30T20:14:33.649Z",
    "size": 537,
    "path": "../public/_nuxt/icon-error.553241b0.js"
  },
  "/_nuxt/icon-Faq.9dbaa21c.js": {
    "type": "application/javascript",
    "etag": "\"238-1HrTnt9Jqa8IvQCcmlVQe4C2JuQ\"",
    "mtime": "2024-03-30T20:14:33.663Z",
    "size": 568,
    "path": "../public/_nuxt/icon-Faq.9dbaa21c.js"
  },
  "/_nuxt/icon-file-generic.c646e2b5.js": {
    "type": "application/javascript",
    "etag": "\"123-g2Iw61R3dTuUtzTbvynhusL8UPA\"",
    "mtime": "2024-03-30T20:14:33.667Z",
    "size": 291,
    "path": "../public/_nuxt/icon-file-generic.c646e2b5.js"
  },
  "/_nuxt/icon-file-img.e16a2031.js": {
    "type": "application/javascript",
    "etag": "\"2bc-aDzBvMhZOZYjI3fhokylkPymsE4\"",
    "mtime": "2024-03-30T20:14:33.649Z",
    "size": 700,
    "path": "../public/_nuxt/icon-file-img.e16a2031.js"
  },
  "/_nuxt/icon-file-pdf.afed463f.js": {
    "type": "application/javascript",
    "etag": "\"55f-OUWuozj3dkzDlJhrldUTgfMMPzw\"",
    "mtime": "2024-03-30T20:14:33.667Z",
    "size": 1375,
    "path": "../public/_nuxt/icon-file-pdf.afed463f.js"
  },
  "/_nuxt/icon-file-text.cc6a6735.js": {
    "type": "application/javascript",
    "etag": "\"166-hnx22CKgVlrE94fbzvxiLvVV3Lg\"",
    "mtime": "2024-03-30T20:14:33.676Z",
    "size": 358,
    "path": "../public/_nuxt/icon-file-text.cc6a6735.js"
  },
  "/_nuxt/icon-flip.9485b999.js": {
    "type": "application/javascript",
    "etag": "\"186-tmMsjGHHXLY/xHvzFLVbsiMzoLs\"",
    "mtime": "2024-03-30T20:14:33.650Z",
    "size": 390,
    "path": "../public/_nuxt/icon-flip.9485b999.js"
  },
  "/_nuxt/icon-help.8d6d8ef7.js": {
    "type": "application/javascript",
    "etag": "\"393-octMPo1z7Q3fEXFYx+upHG6W+KA\"",
    "mtime": "2024-03-30T20:14:33.663Z",
    "size": 915,
    "path": "../public/_nuxt/icon-help.8d6d8ef7.js"
  },
  "/_nuxt/icon-HeroBig.5a47c548.js": {
    "type": "application/javascript",
    "etag": "\"2af-evcCEKM2cN3VtCkIGP6ihwYQb6k\"",
    "mtime": "2024-03-30T20:14:33.649Z",
    "size": 687,
    "path": "../public/_nuxt/icon-HeroBig.5a47c548.js"
  },
  "/_nuxt/icon-HeroSmall.a2349b9a.js": {
    "type": "application/javascript",
    "etag": "\"2af-lsgYbpmkRKEjV+hvC7txrX4HBgs\"",
    "mtime": "2024-03-30T20:14:33.675Z",
    "size": 687,
    "path": "../public/_nuxt/icon-HeroSmall.a2349b9a.js"
  },
  "/_nuxt/icon-house.71b2ef80.js": {
    "type": "application/javascript",
    "etag": "\"33f-a3EPjE00i7szzX6i5Ym82EGHoio\"",
    "mtime": "2024-03-30T20:14:33.656Z",
    "size": 831,
    "path": "../public/_nuxt/icon-house.71b2ef80.js"
  },
  "/_nuxt/icon-ImageList.92ebbd66.js": {
    "type": "application/javascript",
    "etag": "\"298-vDd7l89vdCp+CVGz5gYRyDjnEA0\"",
    "mtime": "2024-03-30T20:14:33.642Z",
    "size": 664,
    "path": "../public/_nuxt/icon-ImageList.92ebbd66.js"
  },
  "/_nuxt/icon-ImageRotation.d3378d52.js": {
    "type": "application/javascript",
    "etag": "\"2f5-jzOF0yJALdvQk+kMaYOuCT5axvc\"",
    "mtime": "2024-03-30T20:14:33.686Z",
    "size": 757,
    "path": "../public/_nuxt/icon-ImageRotation.d3378d52.js"
  },
  "/_nuxt/icon-info.4739d71e.js": {
    "type": "application/javascript",
    "etag": "\"1b3-ldY19KZPj5bvrbt4ZC0k8PvuBhA\"",
    "mtime": "2024-03-30T20:14:33.645Z",
    "size": 435,
    "path": "../public/_nuxt/icon-info.4739d71e.js"
  },
  "/_nuxt/icon-installation.a1f3fdb4.js": {
    "type": "application/javascript",
    "etag": "\"949-J7zbleD14ghrcHtdQ5AKArapgg8\"",
    "mtime": "2024-03-30T20:14:33.661Z",
    "size": 2377,
    "path": "../public/_nuxt/icon-installation.a1f3fdb4.js"
  },
  "/_nuxt/icon-laptop.33d81383.js": {
    "type": "application/javascript",
    "etag": "\"2ae-gH//R+/R8mwr2CT/j3CtZCDL5+Y\"",
    "mtime": "2024-03-30T20:14:33.661Z",
    "size": 686,
    "path": "../public/_nuxt/icon-laptop.33d81383.js"
  },
  "/_nuxt/icon-left-aligned.7a036a17.js": {
    "type": "application/javascript",
    "etag": "\"331-Qha8Pgf0Tp5r2KTJS3BQNjHVbeM\"",
    "mtime": "2024-03-30T20:14:33.649Z",
    "size": 817,
    "path": "../public/_nuxt/icon-left-aligned.7a036a17.js"
  },
  "/_nuxt/icon-link.6f30d258.js": {
    "type": "application/javascript",
    "etag": "\"329-g8COb+8BGHmgfnvwbgCPtGEI5Sc\"",
    "mtime": "2024-03-30T20:14:33.636Z",
    "size": 809,
    "path": "../public/_nuxt/icon-link.6f30d258.js"
  },
  "/_nuxt/icon-lower.59c77d7a.js": {
    "type": "application/javascript",
    "etag": "\"13d-m3O7tMiBSgUVmNHNnjLMJKuG9Jo\"",
    "mtime": "2024-03-30T20:14:33.643Z",
    "size": 317,
    "path": "../public/_nuxt/icon-lower.59c77d7a.js"
  },
  "/_nuxt/icon-mail.669f39e1.js": {
    "type": "application/javascript",
    "etag": "\"1ee-Fkkdk7s3FuGFDMX7DVecFQ2Hmgs\"",
    "mtime": "2024-03-30T20:14:33.642Z",
    "size": 494,
    "path": "../public/_nuxt/icon-mail.669f39e1.js"
  },
  "/_nuxt/icon-Map.1278a051.js": {
    "type": "application/javascript",
    "etag": "\"46f-YyDk1rO3S99VT9gHHiXw71rjNDM\"",
    "mtime": "2024-03-30T20:14:33.662Z",
    "size": 1135,
    "path": "../public/_nuxt/icon-Map.1278a051.js"
  },
  "/_nuxt/icon-margin-bottom.f581f224.js": {
    "type": "application/javascript",
    "etag": "\"23f-e1etuhnWapoaiMFLQEGwtFdOHdc\"",
    "mtime": "2024-03-30T20:14:33.649Z",
    "size": 575,
    "path": "../public/_nuxt/icon-margin-bottom.f581f224.js"
  },
  "/_nuxt/icon-margin-left.c0aeff6f.js": {
    "type": "application/javascript",
    "etag": "\"20f-pTlOJS6yF2YIaOt9VJaQ9yM3Xow\"",
    "mtime": "2024-03-30T20:14:33.656Z",
    "size": 527,
    "path": "../public/_nuxt/icon-margin-left.c0aeff6f.js"
  },
  "/_nuxt/icon-margin-right.1d29332a.js": {
    "type": "application/javascript",
    "etag": "\"240-RrGVQJ345L3Fsl2qjwhvbGupXXk\"",
    "mtime": "2024-03-30T20:14:33.675Z",
    "size": 576,
    "path": "../public/_nuxt/icon-margin-right.1d29332a.js"
  },
  "/_nuxt/icon-margin-top.f0600c91.js": {
    "type": "application/javascript",
    "etag": "\"23f-BYyUQJ2JL0Y2qhHuimM3qzcHIJo\"",
    "mtime": "2024-03-30T20:14:33.676Z",
    "size": 575,
    "path": "../public/_nuxt/icon-margin-top.f0600c91.js"
  },
  "/_nuxt/icon-marker.37ca3d47.js": {
    "type": "application/javascript",
    "etag": "\"1a2-27Gi6XVPoZN0HKRY+nZCZFxvG6k\"",
    "mtime": "2024-03-30T20:14:33.657Z",
    "size": 418,
    "path": "../public/_nuxt/icon-marker.37ca3d47.js"
  },
  "/_nuxt/icon-menu.6d0c149e.js": {
    "type": "application/javascript",
    "etag": "\"13c-f0dlgbwXPhvdV9j775YEx4SHghA\"",
    "mtime": "2024-03-30T20:14:33.649Z",
    "size": 316,
    "path": "../public/_nuxt/icon-menu.6d0c149e.js"
  },
  "/_nuxt/icon-mess.db246453.js": {
    "type": "application/javascript",
    "etag": "\"2ae-KAe7j/zZnDjYVU9wOpKTV25SPBg\"",
    "mtime": "2024-03-30T20:14:33.667Z",
    "size": 686,
    "path": "../public/_nuxt/icon-mess.db246453.js"
  },
  "/_nuxt/icon-minus.b81865aa.js": {
    "type": "application/javascript",
    "etag": "\"a4-8yfEJX3B81OctiW7k5ubW/73+kM\"",
    "mtime": "2024-03-30T20:14:33.675Z",
    "size": 164,
    "path": "../public/_nuxt/icon-minus.b81865aa.js"
  },
  "/_nuxt/icon-mobile.c3fc9578.js": {
    "type": "application/javascript",
    "etag": "\"256-srM2GG9FjJTZVSwWzbc8QSQjH/s\"",
    "mtime": "2024-03-30T20:14:33.667Z",
    "size": 598,
    "path": "../public/_nuxt/icon-mobile.c3fc9578.js"
  },
  "/_nuxt/icon-mobile_.1336496a.js": {
    "type": "application/javascript",
    "etag": "\"259-mzjXdJbAa4vXTWwQOmOT/I0VCEY\"",
    "mtime": "2024-03-30T20:14:33.656Z",
    "size": 601,
    "path": "../public/_nuxt/icon-mobile_.1336496a.js"
  },
  "/_nuxt/icon-modules.8e93bb8a.js": {
    "type": "application/javascript",
    "etag": "\"53a-3M5y+5KmKes7wf39pF4HJ2UrVqA\"",
    "mtime": "2024-03-30T20:14:33.685Z",
    "size": 1338,
    "path": "../public/_nuxt/icon-modules.8e93bb8a.js"
  },
  "/_nuxt/icon-modules_check.aaadba13.js": {
    "type": "application/javascript",
    "etag": "\"71e-K492livcgS57qE1h814p/MJbpIc\"",
    "mtime": "2024-03-30T20:14:33.662Z",
    "size": 1822,
    "path": "../public/_nuxt/icon-modules_check.aaadba13.js"
  },
  "/_nuxt/icon-modules_landscape.481e4020.js": {
    "type": "application/javascript",
    "etag": "\"7f6-W9/2v6vH3QhY74/UIN00alTaCUY\"",
    "mtime": "2024-03-30T20:14:33.656Z",
    "size": 2038,
    "path": "../public/_nuxt/icon-modules_landscape.481e4020.js"
  },
  "/_nuxt/icon-move.ede86bb4.js": {
    "type": "application/javascript",
    "etag": "\"ef-UEhUubWS1Ojbr5l7XjB86Scd6gM\"",
    "mtime": "2024-03-30T20:14:33.649Z",
    "size": 239,
    "path": "../public/_nuxt/icon-move.ede86bb4.js"
  },
  "/_nuxt/icon-MyWork.964562cd.js": {
    "type": "application/javascript",
    "etag": "\"23d-gx1lNLMwVVvT0DWJOALWLv/sLoQ\"",
    "mtime": "2024-03-30T20:14:33.680Z",
    "size": 573,
    "path": "../public/_nuxt/icon-MyWork.964562cd.js"
  },
  "/_nuxt/icon-Offer.d39362ab.js": {
    "type": "application/javascript",
    "etag": "\"1e1-nNIKYj5RW1Q0M9MIRqBxiXwuN/M\"",
    "mtime": "2024-03-30T20:14:33.670Z",
    "size": 481,
    "path": "../public/_nuxt/icon-Offer.d39362ab.js"
  },
  "/_nuxt/icon-padding-bottom.1a8df249.js": {
    "type": "application/javascript",
    "etag": "\"23c-ujGsWxgcnIy+1Fj4h0mn30e0458\"",
    "mtime": "2024-03-30T20:14:33.680Z",
    "size": 572,
    "path": "../public/_nuxt/icon-padding-bottom.1a8df249.js"
  },
  "/_nuxt/icon-padding-left.5b009712.js": {
    "type": "application/javascript",
    "etag": "\"20a-NMOCEqHVoGeThhOwQgLr8vH0Z4A\"",
    "mtime": "2024-03-30T20:14:33.667Z",
    "size": 522,
    "path": "../public/_nuxt/icon-padding-left.5b009712.js"
  },
  "/_nuxt/icon-padding-right.b80dfee2.js": {
    "type": "application/javascript",
    "etag": "\"20d-/fEIpuKAc3mduXkzDSlW589/Hzk\"",
    "mtime": "2024-03-30T20:14:33.650Z",
    "size": 525,
    "path": "../public/_nuxt/icon-padding-right.b80dfee2.js"
  },
  "/_nuxt/icon-padding-top.b2954044.js": {
    "type": "application/javascript",
    "etag": "\"23e-QkKyrHS8jlCZhLM7J2U9EGBL/oY\"",
    "mtime": "2024-03-30T20:14:33.649Z",
    "size": 574,
    "path": "../public/_nuxt/icon-padding-top.b2954044.js"
  },
  "/_nuxt/icon-pause.747beb1c.js": {
    "type": "application/javascript",
    "etag": "\"110-BEzcxRFWr9EzmKTWSM3xAx2dEmE\"",
    "mtime": "2024-03-30T20:14:33.677Z",
    "size": 272,
    "path": "../public/_nuxt/icon-pause.747beb1c.js"
  },
  "/_nuxt/icon-pending.c59bad18.js": {
    "type": "application/javascript",
    "etag": "\"119-WyK5Jnylfw0rC7mODDLRFjl6xsA\"",
    "mtime": "2024-03-30T20:14:33.636Z",
    "size": 281,
    "path": "../public/_nuxt/icon-pending.c59bad18.js"
  },
  "/_nuxt/icon-phone.911d269e.js": {
    "type": "application/javascript",
    "etag": "\"320-JiRTWcaUkQj84OOhS5B4IDWwYMM\"",
    "mtime": "2024-03-30T20:14:33.676Z",
    "size": 800,
    "path": "../public/_nuxt/icon-phone.911d269e.js"
  },
  "/_nuxt/icon-play.8d9117d7.js": {
    "type": "application/javascript",
    "etag": "\"103-2aQyj7hQkcARXzriz46ymko7lkY\"",
    "mtime": "2024-03-30T20:14:33.642Z",
    "size": 259,
    "path": "../public/_nuxt/icon-play.8d9117d7.js"
  },
  "/_nuxt/icon-plus.4934a9f9.js": {
    "type": "application/javascript",
    "etag": "\"d8-8G4fM39pXSYSiaglgPYTXp83l7o\"",
    "mtime": "2024-03-30T20:14:33.689Z",
    "size": 216,
    "path": "../public/_nuxt/icon-plus.4934a9f9.js"
  },
  "/_nuxt/icon-polygon_add2.2f6d7929.js": {
    "type": "application/javascript",
    "etag": "\"355-7Ro/g9JUFWDMfU0NfvC/+xns9hg\"",
    "mtime": "2024-03-30T20:14:33.642Z",
    "size": 853,
    "path": "../public/_nuxt/icon-polygon_add2.2f6d7929.js"
  },
  "/_nuxt/icon-polygon_subtract.6fbbe36f.js": {
    "type": "application/javascript",
    "etag": "\"373-oUQ6ZlBGWt17mPbqgXpzbceMi4M\"",
    "mtime": "2024-03-30T20:14:33.636Z",
    "size": 883,
    "path": "../public/_nuxt/icon-polygon_subtract.6fbbe36f.js"
  },
  "/_nuxt/icon-PortraitText.d2f962a4.js": {
    "type": "application/javascript",
    "etag": "\"21a-7NMKQUv43X5Sl/F0oQCqWmtWW2g\"",
    "mtime": "2024-03-30T20:14:33.675Z",
    "size": 538,
    "path": "../public/_nuxt/icon-PortraitText.d2f962a4.js"
  },
  "/_nuxt/icon-power.0d57bd38.js": {
    "type": "application/javascript",
    "etag": "\"16d-RVxSDCjcDWim7UxJtr62yCJ7BQc\"",
    "mtime": "2024-03-30T20:14:33.675Z",
    "size": 365,
    "path": "../public/_nuxt/icon-power.0d57bd38.js"
  },
  "/_nuxt/icon-Prices.c20cefb5.js": {
    "type": "application/javascript",
    "etag": "\"24e-daUzqT3TkoCyhzYOr/R6x9OGpvA\"",
    "mtime": "2024-03-30T20:14:33.642Z",
    "size": 590,
    "path": "../public/_nuxt/icon-Prices.c20cefb5.js"
  },
  "/_nuxt/icon-quote.6bdea76e.js": {
    "type": "application/javascript",
    "etag": "\"146-YyuVhAMZo1wd9CAfIJwuBNGW54w\"",
    "mtime": "2024-03-30T20:14:33.667Z",
    "size": 326,
    "path": "../public/_nuxt/icon-quote.6bdea76e.js"
  },
  "/_nuxt/icon-rectangle.3a080e31.js": {
    "type": "application/javascript",
    "etag": "\"b5-k13ONwGOdIDEeue6tMZ9XXnRyUU\"",
    "mtime": "2024-03-30T20:14:33.680Z",
    "size": 181,
    "path": "../public/_nuxt/icon-rectangle.3a080e31.js"
  },
  "/_nuxt/icon-reload.d3a588cc.js": {
    "type": "application/javascript",
    "etag": "\"179-ATwfJK2yZQBgkb8lD9rYtAcJ5Bs\"",
    "mtime": "2024-03-30T20:14:33.656Z",
    "size": 377,
    "path": "../public/_nuxt/icon-reload.d3a588cc.js"
  },
  "/_nuxt/icon-repair.294b373d.js": {
    "type": "application/javascript",
    "etag": "\"2f8-vkXoWRI7LyTKGhCvaapfUAOPG78\"",
    "mtime": "2024-03-30T20:14:33.689Z",
    "size": 760,
    "path": "../public/_nuxt/icon-repair.294b373d.js"
  },
  "/_nuxt/icon-right-aligned.209d640f.js": {
    "type": "application/javascript",
    "etag": "\"333-DQ0RZGePsug3BUHgYkgTqtP+Qy8\"",
    "mtime": "2024-03-30T20:14:33.675Z",
    "size": 819,
    "path": "../public/_nuxt/icon-right-aligned.209d640f.js"
  },
  "/_nuxt/icon-save.e0d2d1b7.js": {
    "type": "application/javascript",
    "etag": "\"1e8-X1B23DUpFQEvjbQt9vRd7nNI1Ro\"",
    "mtime": "2024-03-30T20:14:33.636Z",
    "size": 488,
    "path": "../public/_nuxt/icon-save.e0d2d1b7.js"
  },
  "/_nuxt/icon-search.0fb0ffae.js": {
    "type": "application/javascript",
    "etag": "\"12b-Xmhs3hbNBXzQjT9bz37XnAkMIeo\"",
    "mtime": "2024-03-30T20:14:33.662Z",
    "size": 299,
    "path": "../public/_nuxt/icon-search.0fb0ffae.js"
  },
  "/_nuxt/icon-sort.c1016673.js": {
    "type": "application/javascript",
    "etag": "\"158-BG7EBVDu3qUYwhvCifLmPJvp5DY\"",
    "mtime": "2024-03-30T20:14:33.668Z",
    "size": 344,
    "path": "../public/_nuxt/icon-sort.c1016673.js"
  },
  "/_nuxt/icon-subvention.b7153929.js": {
    "type": "application/javascript",
    "etag": "\"362-oAF+vRKFn4TJIaDf1cnkX/nEGBQ\"",
    "mtime": "2024-03-30T20:14:33.675Z",
    "size": 866,
    "path": "../public/_nuxt/icon-subvention.b7153929.js"
  },
  "/_nuxt/icon-sun.5957cb9c.js": {
    "type": "application/javascript",
    "etag": "\"3f1-MuquWQX3wBf+lnM+J6WiO3eRZ8E\"",
    "mtime": "2024-03-30T20:14:33.681Z",
    "size": 1009,
    "path": "../public/_nuxt/icon-sun.5957cb9c.js"
  },
  "/_nuxt/icon-tablet.3ba5a300.js": {
    "type": "application/javascript",
    "etag": "\"227-xEv9DcAJMna0W0zaoqjTsZWxo0Y\"",
    "mtime": "2024-03-30T20:14:33.681Z",
    "size": 551,
    "path": "../public/_nuxt/icon-tablet.3ba5a300.js"
  },
  "/_nuxt/icon-Testimonials.093d1e34.js": {
    "type": "application/javascript",
    "etag": "\"2aa-3KK81wLYTstGFbpV8rVxa1vfRZ8\"",
    "mtime": "2024-03-30T20:14:33.655Z",
    "size": 682,
    "path": "../public/_nuxt/icon-Testimonials.093d1e34.js"
  },
  "/_nuxt/icon-trash.df7d6836.js": {
    "type": "application/javascript",
    "etag": "\"2c9-pP0QKOazQGf2latRDqD3K2o5jgk\"",
    "mtime": "2024-03-30T20:14:33.662Z",
    "size": 713,
    "path": "../public/_nuxt/icon-trash.df7d6836.js"
  },
  "/_nuxt/icon-tree.ca0f2a56.js": {
    "type": "application/javascript",
    "etag": "\"20a-BU4Ldr3hmfyalUDsANRDm8Ea6y4\"",
    "mtime": "2024-03-30T20:14:33.662Z",
    "size": 522,
    "path": "../public/_nuxt/icon-tree.ca0f2a56.js"
  },
  "/_nuxt/icon-triangles.e14ee52b.js": {
    "type": "application/javascript",
    "etag": "\"17f-u73WX20wCoUOCJJH2oBKqppEAhI\"",
    "mtime": "2024-03-30T20:14:33.680Z",
    "size": 383,
    "path": "../public/_nuxt/icon-triangles.e14ee52b.js"
  },
  "/_nuxt/icon-triangle_down.32d0a561.js": {
    "type": "application/javascript",
    "etag": "\"102-RqszTiF3ZPIeWPMDxaQO7Wi8vmM\"",
    "mtime": "2024-03-30T20:14:33.656Z",
    "size": 258,
    "path": "../public/_nuxt/icon-triangle_down.32d0a561.js"
  },
  "/_nuxt/icon-triangle_up.774f0633.js": {
    "type": "application/javascript",
    "etag": "\"104-V0sIqs5UGK1UdB2UnlalfnWE0l8\"",
    "mtime": "2024-03-30T20:14:33.685Z",
    "size": 260,
    "path": "../public/_nuxt/icon-triangle_up.774f0633.js"
  },
  "/_nuxt/icon-upload.d2f90f86.js": {
    "type": "application/javascript",
    "etag": "\"1c7-pYbD5Aw6W7VJFCE+h1+fDW1ZG1g\"",
    "mtime": "2024-03-30T20:14:33.636Z",
    "size": 455,
    "path": "../public/_nuxt/icon-upload.d2f90f86.js"
  },
  "/_nuxt/icon-user.470e4aa0.js": {
    "type": "application/javascript",
    "etag": "\"146-kOPcEFbl8t50fEqmQXX1UBySVCs\"",
    "mtime": "2024-03-30T20:14:33.675Z",
    "size": 326,
    "path": "../public/_nuxt/icon-user.470e4aa0.js"
  },
  "/_nuxt/icon-years.d10af544.js": {
    "type": "application/javascript",
    "etag": "\"2a3-+pRocztF4lBKQeOZLfc8/PpKLWY\"",
    "mtime": "2024-03-30T20:14:33.642Z",
    "size": 675,
    "path": "../public/_nuxt/icon-years.d10af544.js"
  },
  "/_nuxt/IconSelector.vue.4ffe6963.js": {
    "type": "application/javascript",
    "etag": "\"25fa-8pp5kal1bTHkc5rKp1SY20mjTD0\"",
    "mtime": "2024-03-30T20:14:33.658Z",
    "size": 9722,
    "path": "../public/_nuxt/IconSelector.vue.4ffe6963.js"
  },
  "/_nuxt/image-options.bca13af2.js": {
    "type": "application/javascript",
    "etag": "\"51f-AhaV4hzwhZi8sa0S7FaUxjZ7QgU\"",
    "mtime": "2024-03-30T20:14:33.687Z",
    "size": 1311,
    "path": "../public/_nuxt/image-options.bca13af2.js"
  },
  "/_nuxt/ImageList.2cde5437.js": {
    "type": "application/javascript",
    "etag": "\"85c-sqSqeEKso9UBUrQfLq1fWsqBN/c\"",
    "mtime": "2024-03-30T20:14:33.687Z",
    "size": 2140,
    "path": "../public/_nuxt/ImageList.2cde5437.js"
  },
  "/_nuxt/ImageList.662b5ce1.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7f-XXV3VPckbzE8NdtVYL71EBaQg34\"",
    "mtime": "2024-03-30T20:14:33.635Z",
    "size": 127,
    "path": "../public/_nuxt/ImageList.662b5ce1.css"
  },
  "/_nuxt/ImageList.750f9839.js": {
    "type": "application/javascript",
    "etag": "\"edd-5KmEja/M3mNIuhBR+paJMbbR/cg\"",
    "mtime": "2024-03-30T20:14:33.668Z",
    "size": 3805,
    "path": "../public/_nuxt/ImageList.750f9839.js"
  },
  "/_nuxt/ImageRotation.411f5ec7.js": {
    "type": "application/javascript",
    "etag": "\"de2-jvZkja7Vxg2uH2bB4uKJWVF6tlc\"",
    "mtime": "2024-03-30T20:14:33.686Z",
    "size": 3554,
    "path": "../public/_nuxt/ImageRotation.411f5ec7.js"
  },
  "/_nuxt/ImageRotation.896d4a81.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7f-Gfb7vhZoraQ4QoYI8dZu/Q0+XAI\"",
    "mtime": "2024-03-30T20:14:33.635Z",
    "size": 127,
    "path": "../public/_nuxt/ImageRotation.896d4a81.css"
  },
  "/_nuxt/ImageRotation.cc57720f.js": {
    "type": "application/javascript",
    "etag": "\"e77-ji8M+vAnYRRjHzQxg65vTkc8Fic\"",
    "mtime": "2024-03-30T20:14:33.685Z",
    "size": 3703,
    "path": "../public/_nuxt/ImageRotation.cc57720f.js"
  },
  "/_nuxt/index.15a26356.js": {
    "type": "application/javascript",
    "etag": "\"c81-2Lxzv3ZDpR5THm9fkIQB2QgXnXI\"",
    "mtime": "2024-03-30T20:14:33.685Z",
    "size": 3201,
    "path": "../public/_nuxt/index.15a26356.js"
  },
  "/_nuxt/index.863835cb.js": {
    "type": "application/javascript",
    "etag": "\"5e-Ozxn1NQecc3QyocmSGkm09jLBL4\"",
    "mtime": "2024-03-30T20:14:33.662Z",
    "size": 94,
    "path": "../public/_nuxt/index.863835cb.js"
  },
  "/_nuxt/index.vue.948aca9a.js": {
    "type": "application/javascript",
    "etag": "\"57e-zixt9vckLQsaG7v9lnJMdn8btKs\"",
    "mtime": "2024-03-30T20:14:33.686Z",
    "size": 1406,
    "path": "../public/_nuxt/index.vue.948aca9a.js"
  },
  "/_nuxt/IntersectonPop.vue.1cd2e498.js": {
    "type": "application/javascript",
    "etag": "\"264-FDAAOLqljoztDH+jSTtifcVnAKw\"",
    "mtime": "2024-03-30T20:14:33.675Z",
    "size": 612,
    "path": "../public/_nuxt/IntersectonPop.vue.1cd2e498.js"
  },
  "/_nuxt/login.c98885d9.js": {
    "type": "application/javascript",
    "etag": "\"521-1i2tysAYqu9ZFZ4SV5FCUWZsEWE\"",
    "mtime": "2024-03-30T20:14:33.662Z",
    "size": 1313,
    "path": "../public/_nuxt/login.c98885d9.js"
  },
  "/_nuxt/Map.20626f46.js": {
    "type": "application/javascript",
    "etag": "\"bec-8xD3qzVeRgmclzrf/EZ9bOLHHdA\"",
    "mtime": "2024-03-30T20:14:33.662Z",
    "size": 3052,
    "path": "../public/_nuxt/Map.20626f46.js"
  },
  "/_nuxt/Map.51d9e0b1.js": {
    "type": "application/javascript",
    "etag": "\"b7d-sH3xwAwWQhvcqQIWqjWUJl6TQBk\"",
    "mtime": "2024-03-30T20:14:33.688Z",
    "size": 2941,
    "path": "../public/_nuxt/Map.51d9e0b1.js"
  },
  "/_nuxt/Map.72f52712.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"c8-W21r0u5wwzc16LhFaeYTpwdLwDU\"",
    "mtime": "2024-03-30T20:14:33.635Z",
    "size": 200,
    "path": "../public/_nuxt/Map.72f52712.css"
  },
  "/_nuxt/Markdown.1bc97f60.js": {
    "type": "application/javascript",
    "etag": "\"1bd-kA8ClO0ZumE077oRQ79ZEze+ZmM\"",
    "mtime": "2024-03-30T20:14:33.682Z",
    "size": 445,
    "path": "../public/_nuxt/Markdown.1bc97f60.js"
  },
  "/_nuxt/Markdown.f942a929.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"14e-WuPk42WYFEvYwqrzKJpKD/aPopo\"",
    "mtime": "2024-03-30T20:14:33.630Z",
    "size": 334,
    "path": "../public/_nuxt/Markdown.f942a929.css"
  },
  "/_nuxt/MyWork.4ccde687.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"20-sJXDFVLglbJLxV6RPboqT2G6ijM\"",
    "mtime": "2024-03-30T20:14:33.629Z",
    "size": 32,
    "path": "../public/_nuxt/MyWork.4ccde687.css"
  },
  "/_nuxt/MyWork.9ca32752.js": {
    "type": "application/javascript",
    "etag": "\"be6-IlIDR7ROqb1wMTZjWv1842xKdac\"",
    "mtime": "2024-03-30T20:14:33.656Z",
    "size": 3046,
    "path": "../public/_nuxt/MyWork.9ca32752.js"
  },
  "/_nuxt/MyWork.d765da4d.js": {
    "type": "application/javascript",
    "etag": "\"736-2kOxNMtmZy1V+aOKoTsQ0ztRJFs\"",
    "mtime": "2024-03-30T20:14:33.694Z",
    "size": 1846,
    "path": "../public/_nuxt/MyWork.d765da4d.js"
  },
  "/_nuxt/nuxt-icon.2f1fba64.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"a4-sWDBQZSmvHB2/Zs70D8cQGDErp0\"",
    "mtime": "2024-03-30T20:14:33.635Z",
    "size": 164,
    "path": "../public/_nuxt/nuxt-icon.2f1fba64.css"
  },
  "/_nuxt/nuxt-icon.680d3224.js": {
    "type": "application/javascript",
    "etag": "\"62-MeSBN6eZz+RCbplJU3i33rDxgqI\"",
    "mtime": "2024-03-30T20:14:33.667Z",
    "size": 98,
    "path": "../public/_nuxt/nuxt-icon.680d3224.js"
  },
  "/_nuxt/nuxt-icon.vue.17f4aeb4.js": {
    "type": "application/javascript",
    "etag": "\"33e1-8asKI1uhK1wULrNq4g45RG8CBfg\"",
    "mtime": "2024-03-30T20:14:33.696Z",
    "size": 13281,
    "path": "../public/_nuxt/nuxt-icon.vue.17f4aeb4.js"
  },
  "/_nuxt/nuxt-link.b70a293c.js": {
    "type": "application/javascript",
    "etag": "\"f48-1NJJTPo0b0W47f/dM7LhPT0MHvM\"",
    "mtime": "2024-03-30T20:14:33.680Z",
    "size": 3912,
    "path": "../public/_nuxt/nuxt-link.b70a293c.js"
  },
  "/_nuxt/Offer.374ee320.js": {
    "type": "application/javascript",
    "etag": "\"2423-VNBAYjL8PJcmhejFim0q2/LCCi8\"",
    "mtime": "2024-03-30T20:14:33.680Z",
    "size": 9251,
    "path": "../public/_nuxt/Offer.374ee320.js"
  },
  "/_nuxt/Offer.66bbd17b.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7f-s7hJEktd6aZaYhfFgwc0nZPQJF8\"",
    "mtime": "2024-03-30T20:14:33.635Z",
    "size": 127,
    "path": "../public/_nuxt/Offer.66bbd17b.css"
  },
  "/_nuxt/Offer.bd1391e6.js": {
    "type": "application/javascript",
    "etag": "\"aaa-wjbfbH1lJ0fakNO5WMxWyd011kg\"",
    "mtime": "2024-03-30T20:14:33.694Z",
    "size": 2730,
    "path": "../public/_nuxt/Offer.bd1391e6.js"
  },
  "/_nuxt/Pagelist.27e5f837.js": {
    "type": "application/javascript",
    "etag": "\"6af-u9/D0rHc8suCqWWbe4ibmutDzCA\"",
    "mtime": "2024-03-30T20:14:33.643Z",
    "size": 1711,
    "path": "../public/_nuxt/Pagelist.27e5f837.js"
  },
  "/_nuxt/PortraitText.2187a131.js": {
    "type": "application/javascript",
    "etag": "\"7ed-h2HMsEmHgk2MGy1Rl2JxEakjfnU\"",
    "mtime": "2024-03-30T20:14:33.685Z",
    "size": 2029,
    "path": "../public/_nuxt/PortraitText.2187a131.js"
  },
  "/_nuxt/PortraitText.71ef223c.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3c-SOtwc5IoIiOTYGJKnRfqO//fJEI\"",
    "mtime": "2024-03-30T20:14:33.630Z",
    "size": 60,
    "path": "../public/_nuxt/PortraitText.71ef223c.css"
  },
  "/_nuxt/PortraitText.d93c5763.js": {
    "type": "application/javascript",
    "etag": "\"943-NKDJs5Vc/YkHGX+lYLp8wTCxxLk\"",
    "mtime": "2024-03-30T20:14:33.675Z",
    "size": 2371,
    "path": "../public/_nuxt/PortraitText.d93c5763.js"
  },
  "/_nuxt/Prices.009786ce.js": {
    "type": "application/javascript",
    "etag": "\"1de3-+1HGpWlJ2F1jMFtgKiq76/vh3YY\"",
    "mtime": "2024-03-30T20:14:33.685Z",
    "size": 7651,
    "path": "../public/_nuxt/Prices.009786ce.js"
  },
  "/_nuxt/Prices.ee7a08d6.js": {
    "type": "application/javascript",
    "etag": "\"13d1-Fzi47yLiIkQd9AtPOQrj1E6tIYg\"",
    "mtime": "2024-03-30T20:14:33.681Z",
    "size": 5073,
    "path": "../public/_nuxt/Prices.ee7a08d6.js"
  },
  "/_nuxt/sidebar.b8bb48ed.js": {
    "type": "application/javascript",
    "etag": "\"43f-TCrlrhtopnulKXUOkCghBIeJT44\"",
    "mtime": "2024-03-30T20:14:33.661Z",
    "size": 1087,
    "path": "../public/_nuxt/sidebar.b8bb48ed.js"
  },
  "/_nuxt/subset-Nunito-Regular.61d3c7b5.svg": {
    "type": "image/svg+xml",
    "etag": "\"2ac7e-OAre8eCHzsKasu7o2u6fPE1VPV0\"",
    "mtime": "2024-03-30T20:14:33.629Z",
    "size": 175230,
    "path": "../public/_nuxt/subset-Nunito-Regular.61d3c7b5.svg"
  },
  "/_nuxt/subset-Nunito-Regular.71ef052c.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"c560-suKcqZ7aC5BsXv1rb6qUrfA8HUM\"",
    "mtime": "2024-03-30T20:14:33.629Z",
    "size": 50528,
    "path": "../public/_nuxt/subset-Nunito-Regular.71ef052c.eot"
  },
  "/_nuxt/subset-Nunito-Regular.7d9717c0.woff": {
    "type": "font/woff",
    "etag": "\"6770-jEzDjsaUYA9NyIUFitCy8PirftU\"",
    "mtime": "2024-03-30T20:14:33.629Z",
    "size": 26480,
    "path": "../public/_nuxt/subset-Nunito-Regular.7d9717c0.woff"
  },
  "/_nuxt/subset-Nunito-Regular.e2286a83.woff2": {
    "type": "font/woff2",
    "etag": "\"5184-h804HNDtQTeJ/sRq44s1wdTnP5s\"",
    "mtime": "2024-03-30T20:14:33.629Z",
    "size": 20868,
    "path": "../public/_nuxt/subset-Nunito-Regular.e2286a83.woff2"
  },
  "/_nuxt/subset-Nunito-Regular.fc3a84a3.ttf": {
    "type": "font/ttf",
    "etag": "\"c4ac-wCWIWv30B9tPJsDVjWLJcA8pX4M\"",
    "mtime": "2024-03-30T20:14:33.629Z",
    "size": 50348,
    "path": "../public/_nuxt/subset-Nunito-Regular.fc3a84a3.ttf"
  },
  "/_nuxt/subset-PlayfairDisplay-Italic.0bebc797.ttf": {
    "type": "font/ttf",
    "etag": "\"de64-1fv6DZijY1ygvwbOov7a8i7Ck0s\"",
    "mtime": "2024-03-30T20:14:33.629Z",
    "size": 56932,
    "path": "../public/_nuxt/subset-PlayfairDisplay-Italic.0bebc797.ttf"
  },
  "/_nuxt/subset-PlayfairDisplay-Italic.357a9a3d.woff": {
    "type": "font/woff",
    "etag": "\"876c-PIhpv8AoFMrhRIbbMotUXCRj1a8\"",
    "mtime": "2024-03-30T20:14:33.629Z",
    "size": 34668,
    "path": "../public/_nuxt/subset-PlayfairDisplay-Italic.357a9a3d.woff"
  },
  "/_nuxt/subset-PlayfairDisplay-Italic.876fc37c.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"e010-osIlilI61cSjhjqej0/eEynkVN8\"",
    "mtime": "2024-03-30T20:14:33.629Z",
    "size": 57360,
    "path": "../public/_nuxt/subset-PlayfairDisplay-Italic.876fc37c.eot"
  },
  "/_nuxt/subset-PlayfairDisplay-Italic.917a2f62.svg": {
    "type": "image/svg+xml",
    "etag": "\"280fc-5aMROSuvlcE12E/O4wsHNuk2GWQ\"",
    "mtime": "2024-03-30T20:14:33.630Z",
    "size": 164092,
    "path": "../public/_nuxt/subset-PlayfairDisplay-Italic.917a2f62.svg"
  },
  "/_nuxt/subset-PlayfairDisplay-Italic.a00bb13f.woff2": {
    "type": "font/woff2",
    "etag": "\"6d24-Md24MrVqfzkkZiE5RMI8XcE/od8\"",
    "mtime": "2024-03-30T20:14:33.629Z",
    "size": 27940,
    "path": "../public/_nuxt/subset-PlayfairDisplay-Italic.a00bb13f.woff2"
  },
  "/_nuxt/subset-PlayfairDisplay-Regular.26779443.woff": {
    "type": "font/woff",
    "etag": "\"7f78-9UYQykAgvYLyG/v6v4Y8oxpy++w\"",
    "mtime": "2024-03-30T20:14:33.629Z",
    "size": 32632,
    "path": "../public/_nuxt/subset-PlayfairDisplay-Regular.26779443.woff"
  },
  "/_nuxt/subset-PlayfairDisplay-Regular.395edcd5.ttf": {
    "type": "font/ttf",
    "etag": "\"ec00-OAE1y6wo4qiMr37BkXIS9d5Q+/k\"",
    "mtime": "2024-03-30T20:14:33.629Z",
    "size": 60416,
    "path": "../public/_nuxt/subset-PlayfairDisplay-Regular.395edcd5.ttf"
  },
  "/_nuxt/subset-PlayfairDisplay-Regular.7193146a.svg": {
    "type": "image/svg+xml",
    "etag": "\"314b6-F7WOcDu7ZTttzJmMOZ18IZaLrOM\"",
    "mtime": "2024-03-30T20:14:33.629Z",
    "size": 201910,
    "path": "../public/_nuxt/subset-PlayfairDisplay-Regular.7193146a.svg"
  },
  "/_nuxt/subset-PlayfairDisplay-Regular.deb9c1c9.woff2": {
    "type": "font/woff2",
    "etag": "\"67a4-npFcjxy67aUoxsJWoiVZ1Fnceh0\"",
    "mtime": "2024-03-30T20:14:33.629Z",
    "size": 26532,
    "path": "../public/_nuxt/subset-PlayfairDisplay-Regular.deb9c1c9.woff2"
  },
  "/_nuxt/subset-PlayfairDisplay-Regular.e8f92288.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"eda0-TU0ZDnFpUjUznPGQr/bBwbdqhUk\"",
    "mtime": "2024-03-30T20:14:33.626Z",
    "size": 60832,
    "path": "../public/_nuxt/subset-PlayfairDisplay-Regular.e8f92288.eot"
  },
  "/_nuxt/Testimonials.8c318873.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7f-ybZv1xAI5c3OTVWG6AY2ad55zio\"",
    "mtime": "2024-03-30T20:14:33.635Z",
    "size": 127,
    "path": "../public/_nuxt/Testimonials.8c318873.css"
  },
  "/_nuxt/Testimonials.c4c7c45b.js": {
    "type": "application/javascript",
    "etag": "\"e7f-Ry569Aqgspc93SxjRRSZNU4XdOA\"",
    "mtime": "2024-03-30T20:14:33.694Z",
    "size": 3711,
    "path": "../public/_nuxt/Testimonials.c4c7c45b.js"
  },
  "/_nuxt/Testimonials.cc6cfb98.js": {
    "type": "application/javascript",
    "etag": "\"9b4-HGWBy1ZEZ2gnv5j/45oWVioqI3Q\"",
    "mtime": "2024-03-30T20:14:33.687Z",
    "size": 2484,
    "path": "../public/_nuxt/Testimonials.cc6cfb98.js"
  },
  "/_nuxt/UpButton.vue.dc2ae0c9.js": {
    "type": "application/javascript",
    "etag": "\"18c9-hffiBDW6dEytHMCcM2NNPoMrPAc\"",
    "mtime": "2024-03-30T20:14:33.668Z",
    "size": 6345,
    "path": "../public/_nuxt/UpButton.vue.dc2ae0c9.js"
  },
  "/_nuxt/useBrevo.64b18ee7.js": {
    "type": "application/javascript",
    "etag": "\"1521-A0/cUxMwg1fHs6nGqJctoi5Dkko\"",
    "mtime": "2024-03-30T20:14:33.662Z",
    "size": 5409,
    "path": "../public/_nuxt/useBrevo.64b18ee7.js"
  },
  "/_nuxt/_...slug_.516a1cbd.js": {
    "type": "application/javascript",
    "etag": "\"10df-tBe2fR9mIhlLaflwSpvFKup1yhU\"",
    "mtime": "2024-03-30T20:14:33.694Z",
    "size": 4319,
    "path": "../public/_nuxt/_...slug_.516a1cbd.js"
  },
  "/_nuxt/_plugin-vue_export-helper.c27b6911.js": {
    "type": "application/javascript",
    "etag": "\"5b-eFCz/UrraTh721pgAl0VxBNR1es\"",
    "mtime": "2024-03-30T20:14:33.656Z",
    "size": 91,
    "path": "../public/_nuxt/_plugin-vue_export-helper.c27b6911.js"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt":{"maxAge":2592000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler((event) => {
  if (event.node.req.method && !METHODS.has(event.node.req.method)) {
    return;
  }
  let id = decodeURIComponent(
    withLeadingSlash(
      withoutTrailingSlash(parseURL(event.node.req.url).pathname)
    )
  );
  let asset;
  const encodingHeader = String(
    event.node.req.headers["accept-encoding"] || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    event.node.res.setHeader("Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      event.node.res.removeHeader("cache-control");
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = event.node.req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    event.node.res.statusCode = 304;
    event.node.res.end();
    return;
  }
  const ifModifiedSinceH = event.node.req.headers["if-modified-since"];
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= new Date(asset.mtime)) {
    event.node.res.statusCode = 304;
    event.node.res.end();
    return;
  }
  if (asset.type && !event.node.res.getHeader("Content-Type")) {
    event.node.res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag && !event.node.res.getHeader("ETag")) {
    event.node.res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime && !event.node.res.getHeader("Last-Modified")) {
    event.node.res.setHeader("Last-Modified", asset.mtime);
  }
  if (asset.encoding && !event.node.res.getHeader("Content-Encoding")) {
    event.node.res.setHeader("Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !event.node.res.getHeader("Content-Length")) {
    event.node.res.setHeader("Content-Length", asset.size);
  }
  return readAsset(id);
});

const _TXJbB1 = lazyEventHandler(() => {
  const opts = useRuntimeConfig().ipx;
  const ipxOptions = {
    ...opts || {},
    // TODO: Switch to storage API when ipx supports it
    dir: fileURLToPath(new URL(opts.dir, globalThis._importMeta_.url))
  };
  const ipx = createIPX(ipxOptions);
  const middleware = createIPXMiddleware(ipx);
  return eventHandler(async (event) => {
    event.node.req.url = withLeadingSlash(event.context.params._);
    await middleware(event.node.req, event.node.res);
  });
});

const _lazy_b7xL0c = () => import('./renderer.mjs');

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_b7xL0c, lazy: true, middleware: false, method: undefined },
  { route: '/_ipx/**', handler: _TXJbB1, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_b7xL0c, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(false),
    onError: errorHandler
  });
  const router = createRouter$1();
  h3App.use(createRouteRulesHandler());
  const localCall = createCall(toNodeListener(h3App));
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(
    eventHandler((event) => {
      const envContext = event.node.req.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: $fetch });
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch
  };
  for (const plugin of plugins) {
    plugin(app);
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const s = server.listen(port, host, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const i = s.address();
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${i.family === "IPv6" ? `[${i.address}]` : i.address}:${i.port}${baseURL}`;
  console.log(`Listening ${url}`);
});
{
  process.on(
    "unhandledRejection",
    (err) => console.error("[nitro] [dev] [unhandledRejection] " + err)
  );
  process.on(
    "uncaughtException",
    (err) => console.error("[nitro] [dev] [uncaughtException] " + err)
  );
}
const nodeServer = {};

export { useRuntimeConfig as a, getRouteRules as g, nodeServer as n, useNitroApp as u };
//# sourceMappingURL=node-server.mjs.map
