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
    "etag": "\"166ef-8//Ru73CzFJucpOJl8gtyY9eW44\"",
    "mtime": "2024-03-03T18:12:05.586Z",
    "size": 91887,
    "path": "../public/image-eileen-cropped.jpg"
  },
  "/image-eileen-head.jpg": {
    "type": "image/jpeg",
    "etag": "\"f449-0m/0+DIARRtzToE/RJAeW2T7fi8\"",
    "mtime": "2024-02-25T17:12:41.895Z",
    "size": 62537,
    "path": "../public/image-eileen-head.jpg"
  },
  "/image-eileen.jpg": {
    "type": "image/jpeg",
    "etag": "\"267f2-HkaX4KA4/eBWKKO2Algf/82nXZk\"",
    "mtime": "2024-02-25T17:12:41.904Z",
    "size": 157682,
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
  "/_nuxt/ArrayPane.vue.e1af75bc.js": {
    "type": "application/javascript",
    "etag": "\"600-W1XGTaobCDceHnQYykWthAe8MC4\"",
    "mtime": "2024-03-29T15:44:10.311Z",
    "size": 1536,
    "path": "../public/_nuxt/ArrayPane.vue.e1af75bc.js"
  },
  "/_nuxt/asyncData.df364d4d.js": {
    "type": "application/javascript",
    "etag": "\"955-qPUC03L2UnUuiCiEowGY2Yi+FvE\"",
    "mtime": "2024-03-29T15:44:10.345Z",
    "size": 2389,
    "path": "../public/_nuxt/asyncData.df364d4d.js"
  },
  "/_nuxt/Audio.3287f67e.js": {
    "type": "application/javascript",
    "etag": "\"7f32-0Pxj7i5qG8nvR24yjegzIsUKYtI\"",
    "mtime": "2024-03-29T15:44:10.352Z",
    "size": 32562,
    "path": "../public/_nuxt/Audio.3287f67e.js"
  },
  "/_nuxt/Audio.76244c56.js": {
    "type": "application/javascript",
    "etag": "\"ec6-kK/PznBFTkLUcDj2V2BV8SmO8eQ\"",
    "mtime": "2024-03-29T15:44:10.316Z",
    "size": 3782,
    "path": "../public/_nuxt/Audio.76244c56.js"
  },
  "/_nuxt/Audio.fc3dae53.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7f-T3dAyYjBGKi7R9cWckNg7IAUSUc\"",
    "mtime": "2024-03-29T15:44:10.297Z",
    "size": 127,
    "path": "../public/_nuxt/Audio.fc3dae53.css"
  },
  "/_nuxt/bak-index.0e8f4df5.js": {
    "type": "application/javascript",
    "etag": "\"179-J6yvIVet/T+sjvKZ8DPSWaUBX5c\"",
    "mtime": "2024-03-29T15:44:10.336Z",
    "size": 377,
    "path": "../public/_nuxt/bak-index.0e8f4df5.js"
  },
  "/_nuxt/blank.205aaf24.js": {
    "type": "application/javascript",
    "etag": "\"1fe-l4kbS6IsXkVSmzRM/jysEt1t0FY\"",
    "mtime": "2024-03-29T15:44:10.338Z",
    "size": 510,
    "path": "../public/_nuxt/blank.205aaf24.js"
  },
  "/_nuxt/Block.49d81b90.js": {
    "type": "application/javascript",
    "etag": "\"9bfb-T1iI3vALYag+nZ+NN9LmGcBFy0U\"",
    "mtime": "2024-03-29T15:44:10.352Z",
    "size": 39931,
    "path": "../public/_nuxt/Block.49d81b90.js"
  },
  "/_nuxt/BlockRenderer.a0bd72d9.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"5f-gDASvBie5KUEnKlwyIjku61RDS0\"",
    "mtime": "2024-03-29T15:44:10.297Z",
    "size": 95,
    "path": "../public/_nuxt/BlockRenderer.a0bd72d9.css"
  },
  "/_nuxt/BlockRenderer.vue.16fe9032.js": {
    "type": "application/javascript",
    "etag": "\"10f8-GVKOIjhyH2uGMXP0CVqtOWZrNJY\"",
    "mtime": "2024-03-29T15:44:10.353Z",
    "size": 4344,
    "path": "../public/_nuxt/BlockRenderer.vue.16fe9032.js"
  },
  "/_nuxt/BookingCalendar.55f035e2.js": {
    "type": "application/javascript",
    "etag": "\"6901-lfmKINYxIoVsurZyCDYPsgMkMEg\"",
    "mtime": "2024-03-29T15:44:10.352Z",
    "size": 26881,
    "path": "../public/_nuxt/BookingCalendar.55f035e2.js"
  },
  "/_nuxt/BookingCalendar.5da9e906.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"5b7-5h6UFSDfV+4fSyRf+jU3lh7m+2M\"",
    "mtime": "2024-03-29T15:44:10.291Z",
    "size": 1463,
    "path": "../public/_nuxt/BookingCalendar.5da9e906.css"
  },
  "/_nuxt/BookingCalendar.8af6769a.js": {
    "type": "application/javascript",
    "etag": "\"e52-DnqRGBNnWU2KfOVbzo4x9hxlcMk\"",
    "mtime": "2024-03-29T15:44:10.316Z",
    "size": 3666,
    "path": "../public/_nuxt/BookingCalendar.8af6769a.js"
  },
  "/_nuxt/buchungen.b663254a.js": {
    "type": "application/javascript",
    "etag": "\"2a5f-GfsJ5of8v4Rjivy2J7EtGIy5jg4\"",
    "mtime": "2024-03-29T15:44:10.349Z",
    "size": 10847,
    "path": "../public/_nuxt/buchungen.b663254a.js"
  },
  "/_nuxt/Calltoaction.99e64ebb.js": {
    "type": "application/javascript",
    "etag": "\"37b-Yj4B4386vd8HLR8atwcUDJZulao\"",
    "mtime": "2024-03-29T15:44:10.332Z",
    "size": 891,
    "path": "../public/_nuxt/Calltoaction.99e64ebb.js"
  },
  "/_nuxt/ClickableHeadings.3057427b.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"8a-YmjIAmbrD9UHf1J7esku6Hug4DY\"",
    "mtime": "2024-03-29T15:44:10.291Z",
    "size": 138,
    "path": "../public/_nuxt/ClickableHeadings.3057427b.css"
  },
  "/_nuxt/ClickableHeadings.688b96a6.js": {
    "type": "application/javascript",
    "etag": "\"64c-l2J3kARo438IuGI7HMJVsfCJR2g\"",
    "mtime": "2024-03-29T15:44:10.317Z",
    "size": 1612,
    "path": "../public/_nuxt/ClickableHeadings.688b96a6.js"
  },
  "/_nuxt/ClickableHeadings.e3e99436.js": {
    "type": "application/javascript",
    "etag": "\"a0a-g1k8T5nNShrHz73ZRvLqhg7bTqk\"",
    "mtime": "2024-03-29T15:44:10.350Z",
    "size": 2570,
    "path": "../public/_nuxt/ClickableHeadings.e3e99436.js"
  },
  "/_nuxt/Component.5e2a3439.js": {
    "type": "application/javascript",
    "etag": "\"105ca-xGLmWLvwaSLSep2qzTKj2qz5CgQ\"",
    "mtime": "2024-03-29T15:44:10.335Z",
    "size": 67018,
    "path": "../public/_nuxt/Component.5e2a3439.js"
  },
  "/_nuxt/composables.7f424e17.js": {
    "type": "application/javascript",
    "etag": "\"61-kOra9OgSbnqltVPmKDt32cDcFHU\"",
    "mtime": "2024-03-29T15:44:10.316Z",
    "size": 97,
    "path": "../public/_nuxt/composables.7f424e17.js"
  },
  "/_nuxt/composables.85542df4.js": {
    "type": "application/javascript",
    "etag": "\"ba1-lNAA2zgUdlbA8Xz5vzRE7z7Hu6s\"",
    "mtime": "2024-03-29T15:44:10.340Z",
    "size": 2977,
    "path": "../public/_nuxt/composables.85542df4.js"
  },
  "/_nuxt/Contact.7c465d96.js": {
    "type": "application/javascript",
    "etag": "\"12fb-bRlfY5KRRx+Sa5anl2Cib1NZ0XM\"",
    "mtime": "2024-03-29T15:44:10.352Z",
    "size": 4859,
    "path": "../public/_nuxt/Contact.7c465d96.js"
  },
  "/_nuxt/Contact.baa24f08.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"c8-2I2rvGXBxJIB2z69h4ByYJnAAhQ\"",
    "mtime": "2024-03-29T15:44:10.291Z",
    "size": 200,
    "path": "../public/_nuxt/Contact.baa24f08.css"
  },
  "/_nuxt/Contact.ee92259d.js": {
    "type": "application/javascript",
    "etag": "\"945-LQTK5yllUQtaFXppaceHqkZJoVk\"",
    "mtime": "2024-03-29T15:44:10.338Z",
    "size": 2373,
    "path": "../public/_nuxt/Contact.ee92259d.js"
  },
  "/_nuxt/Container.70f2c904.js": {
    "type": "application/javascript",
    "etag": "\"21b-HUkeeKkxaAXWwXLMpC3dvUKet7s\"",
    "mtime": "2024-03-29T15:44:10.298Z",
    "size": 539,
    "path": "../public/_nuxt/Container.70f2c904.js"
  },
  "/_nuxt/Container.vue.61b6f40b.js": {
    "type": "application/javascript",
    "etag": "\"679-sYDfYxCwnZVJ3IZz63xPRUdQboo\"",
    "mtime": "2024-03-29T15:44:10.312Z",
    "size": 1657,
    "path": "../public/_nuxt/Container.vue.61b6f40b.js"
  },
  "/_nuxt/default.48e35d83.js": {
    "type": "application/javascript",
    "etag": "\"2df-/I3DKW74w/pSa8W6wiRm5KP0CUo\"",
    "mtime": "2024-03-29T15:44:10.344Z",
    "size": 735,
    "path": "../public/_nuxt/default.48e35d83.js"
  },
  "/_nuxt/Default.6a444596.js": {
    "type": "application/javascript",
    "etag": "\"f7-2HX3yUxlpPx2k5TYb0xLsNNvmSU\"",
    "mtime": "2024-03-29T15:44:10.304Z",
    "size": 247,
    "path": "../public/_nuxt/Default.6a444596.js"
  },
  "/_nuxt/Default.ab032544.js": {
    "type": "application/javascript",
    "etag": "\"123-UAfALW/4/VytkQoRfnx8lupioik\"",
    "mtime": "2024-03-29T15:44:10.298Z",
    "size": 291,
    "path": "../public/_nuxt/Default.ab032544.js"
  },
  "/_nuxt/defaults.89e50d4f.js": {
    "type": "application/javascript",
    "etag": "\"110a-JgPgHDRvCHBWIuSxV+/CL3O8F84\"",
    "mtime": "2024-03-29T15:44:10.346Z",
    "size": 4362,
    "path": "../public/_nuxt/defaults.89e50d4f.js"
  },
  "/_nuxt/entry.0c0f7311.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"92e7-+3patJAx1yeEYUEfT7Eq/cPCQX0\"",
    "mtime": "2024-03-29T15:44:10.291Z",
    "size": 37607,
    "path": "../public/_nuxt/entry.0c0f7311.css"
  },
  "/_nuxt/entry.6fad6921.js": {
    "type": "application/javascript",
    "etag": "\"4eedf-lGp6eX1ZIKB/eeqy1UP/5y2Hi9w\"",
    "mtime": "2024-03-29T15:44:10.355Z",
    "size": 323295,
    "path": "../public/_nuxt/entry.6fad6921.js"
  },
  "/_nuxt/error-404.8bdbaeb8.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e70-jl7r/kE1FF0H+CLPNh+07RJXuFI\"",
    "mtime": "2024-03-29T15:44:10.293Z",
    "size": 3696,
    "path": "../public/_nuxt/error-404.8bdbaeb8.css"
  },
  "/_nuxt/error-404.e1a19cd7.js": {
    "type": "application/javascript",
    "etag": "\"92e-xMVgUGwsJKjZAsVUZ8WMqHLvghk\"",
    "mtime": "2024-03-29T15:44:10.351Z",
    "size": 2350,
    "path": "../public/_nuxt/error-404.e1a19cd7.js"
  },
  "/_nuxt/error-500.b63a96f5.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7e0-loEWA9n4Kq4UMBzJyT6hY9SSl00\"",
    "mtime": "2024-03-29T15:44:10.297Z",
    "size": 2016,
    "path": "../public/_nuxt/error-500.b63a96f5.css"
  },
  "/_nuxt/error-500.be718b15.js": {
    "type": "application/javascript",
    "etag": "\"7b2-NC62zk0pGr7HGIynQzvI2Xn3qWo\"",
    "mtime": "2024-03-29T15:44:10.351Z",
    "size": 1970,
    "path": "../public/_nuxt/error-500.be718b15.js"
  },
  "/_nuxt/error-component.6beba598.js": {
    "type": "application/javascript",
    "etag": "\"504-MqxwvpGd69qOZkcEPqXPgPpIVoI\"",
    "mtime": "2024-03-29T15:44:10.332Z",
    "size": 1284,
    "path": "../public/_nuxt/error-component.6beba598.js"
  },
  "/_nuxt/Faq.d59be854.js": {
    "type": "application/javascript",
    "etag": "\"76c-eqSTioGPL4FPAuLhM5RNGwlsLs8\"",
    "mtime": "2024-03-29T15:44:10.298Z",
    "size": 1900,
    "path": "../public/_nuxt/Faq.d59be854.js"
  },
  "/_nuxt/Faq.fe822f0e.js": {
    "type": "application/javascript",
    "etag": "\"7e0-/FEaHctrFl698P0IdYJu0z3bEAo\"",
    "mtime": "2024-03-29T15:44:10.304Z",
    "size": 2016,
    "path": "../public/_nuxt/Faq.fe822f0e.js"
  },
  "/_nuxt/Footer.vue.cab53463.js": {
    "type": "application/javascript",
    "etag": "\"ba2-e5Kawf8sMx8oaXWQvkUawXQxBwM\"",
    "mtime": "2024-03-29T15:44:10.345Z",
    "size": 2978,
    "path": "../public/_nuxt/Footer.vue.cab53463.js"
  },
  "/_nuxt/helpers.8021eb3b.js": {
    "type": "application/javascript",
    "etag": "\"153-NNqE4zIKptFa3ZiP3IyKLweqD9s\"",
    "mtime": "2024-03-29T15:44:10.336Z",
    "size": 339,
    "path": "../public/_nuxt/helpers.8021eb3b.js"
  },
  "/_nuxt/HeroBig.40b04235.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3c-j+NNZg8dK3YoPltipzDi355L6As\"",
    "mtime": "2024-03-29T15:44:10.291Z",
    "size": 60,
    "path": "../public/_nuxt/HeroBig.40b04235.css"
  },
  "/_nuxt/HeroBig.4105c800.js": {
    "type": "application/javascript",
    "etag": "\"7da-QHh9OCVT9SYXnURASv2sNorMTVI\"",
    "mtime": "2024-03-29T15:44:10.350Z",
    "size": 2010,
    "path": "../public/_nuxt/HeroBig.4105c800.js"
  },
  "/_nuxt/HeroBig.8949f102.js": {
    "type": "application/javascript",
    "etag": "\"1b67-DBVLRghG78jqEbhzyWsvHNBXLF4\"",
    "mtime": "2024-03-29T15:44:10.305Z",
    "size": 7015,
    "path": "../public/_nuxt/HeroBig.8949f102.js"
  },
  "/_nuxt/HeroSmall.c6fda112.js": {
    "type": "application/javascript",
    "etag": "\"94b-cKXHVe7VZJz5iaXwmT6fGf214ek\"",
    "mtime": "2024-03-29T15:44:10.298Z",
    "size": 2379,
    "path": "../public/_nuxt/HeroSmall.c6fda112.js"
  },
  "/_nuxt/HeroSmall.e9ca3c95.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3c-HkWIgaUdu5WzAyBoquJQEQt6ViA\"",
    "mtime": "2024-03-29T15:44:10.297Z",
    "size": 60,
    "path": "../public/_nuxt/HeroSmall.e9ca3c95.css"
  },
  "/_nuxt/HeroSmall.f1aa62d4.js": {
    "type": "application/javascript",
    "etag": "\"7f9-VnCWZLo0hjppYSmFLTbs7HH4BKU\"",
    "mtime": "2024-03-29T15:44:10.354Z",
    "size": 2041,
    "path": "../public/_nuxt/HeroSmall.f1aa62d4.js"
  },
  "/_nuxt/icon-archive.1763f3b7.js": {
    "type": "application/javascript",
    "etag": "\"261-+DLrp+6B8BtD0DFPa7xXbOWFcRI\"",
    "mtime": "2024-03-29T15:44:10.331Z",
    "size": 609,
    "path": "../public/_nuxt/icon-archive.1763f3b7.js"
  },
  "/_nuxt/icon-area.2d0562f9.js": {
    "type": "application/javascript",
    "etag": "\"27b-V+SfGo1W0kb6Z7XwIYZmD8+A024\"",
    "mtime": "2024-03-29T15:44:10.336Z",
    "size": 635,
    "path": "../public/_nuxt/icon-area.2d0562f9.js"
  },
  "/_nuxt/icon-arrow_down.238da9d1.js": {
    "type": "application/javascript",
    "etag": "\"171-w6L9FzQmHt/uK+fBqs5UDaLbyvA\"",
    "mtime": "2024-03-29T15:44:10.312Z",
    "size": 369,
    "path": "../public/_nuxt/icon-arrow_down.238da9d1.js"
  },
  "/_nuxt/icon-arrow_left.c4801f41.js": {
    "type": "application/javascript",
    "etag": "\"170-zn/4ivMDEMlavOcIJ9G3wlf2hEA\"",
    "mtime": "2024-03-29T15:44:10.311Z",
    "size": 368,
    "path": "../public/_nuxt/icon-arrow_left.c4801f41.js"
  },
  "/_nuxt/icon-arrow_right.d220ba52.js": {
    "type": "application/javascript",
    "etag": "\"174-Oonx9B20V1HMqKvlIllmAC/LCCU\"",
    "mtime": "2024-03-29T15:44:10.305Z",
    "size": 372,
    "path": "../public/_nuxt/icon-arrow_right.d220ba52.js"
  },
  "/_nuxt/icon-arrow_up.d0c70d43.js": {
    "type": "application/javascript",
    "etag": "\"174-CvZAX9JTuwkeYgsHLMQ86ZJ9pn0\"",
    "mtime": "2024-03-29T15:44:10.311Z",
    "size": 372,
    "path": "../public/_nuxt/icon-arrow_up.d0c70d43.js"
  },
  "/_nuxt/icon-Audio.c6bff5c6.js": {
    "type": "application/javascript",
    "etag": "\"324-+ZOK0sjGXEa8gavKgwOyX5csh5g\"",
    "mtime": "2024-03-29T15:44:10.311Z",
    "size": 804,
    "path": "../public/_nuxt/icon-Audio.c6bff5c6.js"
  },
  "/_nuxt/icon-BookingCalendar.8dbf5310.js": {
    "type": "application/javascript",
    "etag": "\"503-PDdP8YjaG3kN6cBk1/+t0xsIZqQ\"",
    "mtime": "2024-03-29T15:44:10.334Z",
    "size": 1283,
    "path": "../public/_nuxt/icon-BookingCalendar.8dbf5310.js"
  },
  "/_nuxt/icon-bug.3b18a914.js": {
    "type": "application/javascript",
    "etag": "\"43a-DHzXkAx5RF35mdsBzXfzcZL6NT0\"",
    "mtime": "2024-03-29T15:44:10.332Z",
    "size": 1082,
    "path": "../public/_nuxt/icon-bug.3b18a914.js"
  },
  "/_nuxt/icon-camera.fd0e590f.js": {
    "type": "application/javascript",
    "etag": "\"26b-CkIDCWsiNembMoxcH8NXbizQXc0\"",
    "mtime": "2024-03-29T15:44:10.330Z",
    "size": 619,
    "path": "../public/_nuxt/icon-camera.fd0e590f.js"
  },
  "/_nuxt/icon-car.f1507615.js": {
    "type": "application/javascript",
    "etag": "\"34a-heI0pvyHKTxAwU3ADA+4vdd3aA4\"",
    "mtime": "2024-03-29T15:44:10.313Z",
    "size": 842,
    "path": "../public/_nuxt/icon-car.f1507615.js"
  },
  "/_nuxt/icon-caret-left.5cb81b32.js": {
    "type": "application/javascript",
    "etag": "\"206-KhFHCJiqa335sHXp2itSbR4pmYo\"",
    "mtime": "2024-03-29T15:44:10.322Z",
    "size": 518,
    "path": "../public/_nuxt/icon-caret-left.5cb81b32.js"
  },
  "/_nuxt/icon-caret-right.b22c6143.js": {
    "type": "application/javascript",
    "etag": "\"206-k6Kqx0PaVxMMJEy4N8WiUAmAjjc\"",
    "mtime": "2024-03-29T15:44:10.336Z",
    "size": 518,
    "path": "../public/_nuxt/icon-caret-right.b22c6143.js"
  },
  "/_nuxt/icon-center-aligned.0cf0cae6.js": {
    "type": "application/javascript",
    "etag": "\"333-KqHFQtu1db3J59Z0lAee8PAa+EE\"",
    "mtime": "2024-03-29T15:44:10.298Z",
    "size": 819,
    "path": "../public/_nuxt/icon-center-aligned.0cf0cae6.js"
  },
  "/_nuxt/icon-check.4a070d5e.js": {
    "type": "application/javascript",
    "etag": "\"128-NHDVOQkydIVRRgs4FPmC+Cja6X0\"",
    "mtime": "2024-03-29T15:44:10.311Z",
    "size": 296,
    "path": "../public/_nuxt/icon-check.4a070d5e.js"
  },
  "/_nuxt/icon-circle.0a9d352c.js": {
    "type": "application/javascript",
    "etag": "\"ff-4XDbHx0PbzTghUnGT05hycelmHE\"",
    "mtime": "2024-03-29T15:44:10.324Z",
    "size": 255,
    "path": "../public/_nuxt/icon-circle.0a9d352c.js"
  },
  "/_nuxt/icon-ClickableHeadings.2577bbc3.js": {
    "type": "application/javascript",
    "etag": "\"359-rpVzBfHxqaJpKBXNBj93qQmGCrU\"",
    "mtime": "2024-03-29T15:44:10.322Z",
    "size": 857,
    "path": "../public/_nuxt/icon-ClickableHeadings.2577bbc3.js"
  },
  "/_nuxt/icon-co2.1f3fbaa2.js": {
    "type": "application/javascript",
    "etag": "\"f8-or/9nCZ9j+lKnO4hsZSlzr3WcOo\"",
    "mtime": "2024-03-29T15:44:10.304Z",
    "size": 248,
    "path": "../public/_nuxt/icon-co2.1f3fbaa2.js"
  },
  "/_nuxt/icon-consulting.3e6314d5.js": {
    "type": "application/javascript",
    "etag": "\"8a6-/V7klcPPpV1zFkBj14wD9SU9aco\"",
    "mtime": "2024-03-29T15:44:10.317Z",
    "size": 2214,
    "path": "../public/_nuxt/icon-consulting.3e6314d5.js"
  },
  "/_nuxt/icon-Contact.5d67c47e.js": {
    "type": "application/javascript",
    "etag": "\"1e2-6H7kOxo6sKxS+dDP3NM9c4dO9Mo\"",
    "mtime": "2024-03-29T15:44:10.318Z",
    "size": 482,
    "path": "../public/_nuxt/icon-Contact.5d67c47e.js"
  },
  "/_nuxt/icon-copy.82ad9815.js": {
    "type": "application/javascript",
    "etag": "\"1b0-16ShkOvK5ZFD4it6Hq/LW/nyJkI\"",
    "mtime": "2024-03-29T15:44:10.323Z",
    "size": 432,
    "path": "../public/_nuxt/icon-copy.82ad9815.js"
  },
  "/_nuxt/icon-cost.7b5894b5.js": {
    "type": "application/javascript",
    "etag": "\"18f-DbdueujaGfvJ0NpUpKTsLvVQcBU\"",
    "mtime": "2024-03-29T15:44:10.324Z",
    "size": 399,
    "path": "../public/_nuxt/icon-cost.7b5894b5.js"
  },
  "/_nuxt/icon-cross.647c2b5f.js": {
    "type": "application/javascript",
    "etag": "\"12d-pD4k6bLwJGJZW5ZfZg9GQ4+jsrQ\"",
    "mtime": "2024-03-29T15:44:10.338Z",
    "size": 301,
    "path": "../public/_nuxt/icon-cross.647c2b5f.js"
  },
  "/_nuxt/icon-customer_service.614393a9.js": {
    "type": "application/javascript",
    "etag": "\"37f-sr7XXC19CmFLFjU3emA4pgDvmqQ\"",
    "mtime": "2024-03-29T15:44:10.323Z",
    "size": 895,
    "path": "../public/_nuxt/icon-customer_service.614393a9.js"
  },
  "/_nuxt/icon-customer_support.e3dbba6e.js": {
    "type": "application/javascript",
    "etag": "\"600-6RHfDNEFhlDCUI8BHp6iSdylDgQ\"",
    "mtime": "2024-03-29T15:44:10.343Z",
    "size": 1536,
    "path": "../public/_nuxt/icon-customer_support.e3dbba6e.js"
  },
  "/_nuxt/icon-dashboard.bddf6744.js": {
    "type": "application/javascript",
    "etag": "\"1a5-hBFEmWK10E4aKxlpppFj+Krg35Y\"",
    "mtime": "2024-03-29T15:44:10.324Z",
    "size": 421,
    "path": "../public/_nuxt/icon-dashboard.bddf6744.js"
  },
  "/_nuxt/icon-Default.63f4c97b.js": {
    "type": "application/javascript",
    "etag": "\"17e-NbXe0TN8wly+pIxeH+zOyGninXA\"",
    "mtime": "2024-03-29T15:44:10.338Z",
    "size": 382,
    "path": "../public/_nuxt/icon-Default.63f4c97b.js"
  },
  "/_nuxt/icon-desktop.dca8c5f2.js": {
    "type": "application/javascript",
    "etag": "\"2a4-xwCrTeKcgO+vo/XLESkdw+RlODU\"",
    "mtime": "2024-03-29T15:44:10.317Z",
    "size": 676,
    "path": "../public/_nuxt/icon-desktop.dca8c5f2.js"
  },
  "/_nuxt/icon-dials.ebe13a16.js": {
    "type": "application/javascript",
    "etag": "\"4b7-nrEwOF8PIdwQQCSt9SRxiBvp7OY\"",
    "mtime": "2024-03-29T15:44:10.330Z",
    "size": 1207,
    "path": "../public/_nuxt/icon-dials.ebe13a16.js"
  },
  "/_nuxt/icon-dot.c32c6d4c.js": {
    "type": "application/javascript",
    "etag": "\"91-FphsvPJceNN6tkq0wvjvAKzQMLE\"",
    "mtime": "2024-03-29T15:44:10.304Z",
    "size": 145,
    "path": "../public/_nuxt/icon-dot.c32c6d4c.js"
  },
  "/_nuxt/icon-download.9ccdfe8a.js": {
    "type": "application/javascript",
    "etag": "\"1c3-edFiDL3VFsZlqmpPFPbZUnw/apM\"",
    "mtime": "2024-03-29T15:44:10.332Z",
    "size": 451,
    "path": "../public/_nuxt/icon-download.9ccdfe8a.js"
  },
  "/_nuxt/icon-dragarea.4cd48675.js": {
    "type": "application/javascript",
    "etag": "\"1e3-UsM0IlXKPUh3tTPqeynoDDots+M\"",
    "mtime": "2024-03-29T15:44:10.323Z",
    "size": 483,
    "path": "../public/_nuxt/icon-dragarea.4cd48675.js"
  },
  "/_nuxt/icon-eco.085f03d1.js": {
    "type": "application/javascript",
    "etag": "\"24a-WLehZAB/ZIJgCuKL/2JtKYNTj5E\"",
    "mtime": "2024-03-29T15:44:10.337Z",
    "size": 586,
    "path": "../public/_nuxt/icon-eco.085f03d1.js"
  },
  "/_nuxt/icon-energy.168355c4.js": {
    "type": "application/javascript",
    "etag": "\"c3-0Y/XGsI/MoJWaOfodXPXfhWo6ZU\"",
    "mtime": "2024-03-29T15:44:10.304Z",
    "size": 195,
    "path": "../public/_nuxt/icon-energy.168355c4.js"
  },
  "/_nuxt/icon-error.553241b0.js": {
    "type": "application/javascript",
    "etag": "\"219-s+gn+0O4H4YCXZRvzSK6IlwDTOQ\"",
    "mtime": "2024-03-29T15:44:10.311Z",
    "size": 537,
    "path": "../public/_nuxt/icon-error.553241b0.js"
  },
  "/_nuxt/icon-Faq.9dbaa21c.js": {
    "type": "application/javascript",
    "etag": "\"238-1HrTnt9Jqa8IvQCcmlVQe4C2JuQ\"",
    "mtime": "2024-03-29T15:44:10.338Z",
    "size": 568,
    "path": "../public/_nuxt/icon-Faq.9dbaa21c.js"
  },
  "/_nuxt/icon-file-generic.c646e2b5.js": {
    "type": "application/javascript",
    "etag": "\"123-g2Iw61R3dTuUtzTbvynhusL8UPA\"",
    "mtime": "2024-03-29T15:44:10.304Z",
    "size": 291,
    "path": "../public/_nuxt/icon-file-generic.c646e2b5.js"
  },
  "/_nuxt/icon-file-img.e16a2031.js": {
    "type": "application/javascript",
    "etag": "\"2bc-aDzBvMhZOZYjI3fhokylkPymsE4\"",
    "mtime": "2024-03-29T15:44:10.332Z",
    "size": 700,
    "path": "../public/_nuxt/icon-file-img.e16a2031.js"
  },
  "/_nuxt/icon-file-pdf.afed463f.js": {
    "type": "application/javascript",
    "etag": "\"55f-OUWuozj3dkzDlJhrldUTgfMMPzw\"",
    "mtime": "2024-03-29T15:44:10.304Z",
    "size": 1375,
    "path": "../public/_nuxt/icon-file-pdf.afed463f.js"
  },
  "/_nuxt/icon-file-text.cc6a6735.js": {
    "type": "application/javascript",
    "etag": "\"166-hnx22CKgVlrE94fbzvxiLvVV3Lg\"",
    "mtime": "2024-03-29T15:44:10.311Z",
    "size": 358,
    "path": "../public/_nuxt/icon-file-text.cc6a6735.js"
  },
  "/_nuxt/icon-flip.9485b999.js": {
    "type": "application/javascript",
    "etag": "\"186-tmMsjGHHXLY/xHvzFLVbsiMzoLs\"",
    "mtime": "2024-03-29T15:44:10.337Z",
    "size": 390,
    "path": "../public/_nuxt/icon-flip.9485b999.js"
  },
  "/_nuxt/icon-help.8d6d8ef7.js": {
    "type": "application/javascript",
    "etag": "\"393-octMPo1z7Q3fEXFYx+upHG6W+KA\"",
    "mtime": "2024-03-29T15:44:10.350Z",
    "size": 915,
    "path": "../public/_nuxt/icon-help.8d6d8ef7.js"
  },
  "/_nuxt/icon-HeroBig.5a47c548.js": {
    "type": "application/javascript",
    "etag": "\"2af-evcCEKM2cN3VtCkIGP6ihwYQb6k\"",
    "mtime": "2024-03-29T15:44:10.298Z",
    "size": 687,
    "path": "../public/_nuxt/icon-HeroBig.5a47c548.js"
  },
  "/_nuxt/icon-HeroSmall.a2349b9a.js": {
    "type": "application/javascript",
    "etag": "\"2af-lsgYbpmkRKEjV+hvC7txrX4HBgs\"",
    "mtime": "2024-03-29T15:44:10.298Z",
    "size": 687,
    "path": "../public/_nuxt/icon-HeroSmall.a2349b9a.js"
  },
  "/_nuxt/icon-house.71b2ef80.js": {
    "type": "application/javascript",
    "etag": "\"33f-a3EPjE00i7szzX6i5Ym82EGHoio\"",
    "mtime": "2024-03-29T15:44:10.311Z",
    "size": 831,
    "path": "../public/_nuxt/icon-house.71b2ef80.js"
  },
  "/_nuxt/icon-ImageList.92ebbd66.js": {
    "type": "application/javascript",
    "etag": "\"298-vDd7l89vdCp+CVGz5gYRyDjnEA0\"",
    "mtime": "2024-03-29T15:44:10.299Z",
    "size": 664,
    "path": "../public/_nuxt/icon-ImageList.92ebbd66.js"
  },
  "/_nuxt/icon-ImageRotation.d3378d52.js": {
    "type": "application/javascript",
    "etag": "\"2f5-jzOF0yJALdvQk+kMaYOuCT5axvc\"",
    "mtime": "2024-03-29T15:44:10.336Z",
    "size": 757,
    "path": "../public/_nuxt/icon-ImageRotation.d3378d52.js"
  },
  "/_nuxt/icon-info.4739d71e.js": {
    "type": "application/javascript",
    "etag": "\"1b3-ldY19KZPj5bvrbt4ZC0k8PvuBhA\"",
    "mtime": "2024-03-29T15:44:10.310Z",
    "size": 435,
    "path": "../public/_nuxt/icon-info.4739d71e.js"
  },
  "/_nuxt/icon-installation.a1f3fdb4.js": {
    "type": "application/javascript",
    "etag": "\"949-J7zbleD14ghrcHtdQ5AKArapgg8\"",
    "mtime": "2024-03-29T15:44:10.329Z",
    "size": 2377,
    "path": "../public/_nuxt/icon-installation.a1f3fdb4.js"
  },
  "/_nuxt/icon-laptop.33d81383.js": {
    "type": "application/javascript",
    "etag": "\"2ae-gH//R+/R8mwr2CT/j3CtZCDL5+Y\"",
    "mtime": "2024-03-29T15:44:10.332Z",
    "size": 686,
    "path": "../public/_nuxt/icon-laptop.33d81383.js"
  },
  "/_nuxt/icon-left-aligned.7a036a17.js": {
    "type": "application/javascript",
    "etag": "\"331-Qha8Pgf0Tp5r2KTJS3BQNjHVbeM\"",
    "mtime": "2024-03-29T15:44:10.298Z",
    "size": 817,
    "path": "../public/_nuxt/icon-left-aligned.7a036a17.js"
  },
  "/_nuxt/icon-link.6f30d258.js": {
    "type": "application/javascript",
    "etag": "\"329-g8COb+8BGHmgfnvwbgCPtGEI5Sc\"",
    "mtime": "2024-03-29T15:44:10.304Z",
    "size": 809,
    "path": "../public/_nuxt/icon-link.6f30d258.js"
  },
  "/_nuxt/icon-lower.59c77d7a.js": {
    "type": "application/javascript",
    "etag": "\"13d-m3O7tMiBSgUVmNHNnjLMJKuG9Jo\"",
    "mtime": "2024-03-29T15:44:10.317Z",
    "size": 317,
    "path": "../public/_nuxt/icon-lower.59c77d7a.js"
  },
  "/_nuxt/icon-mail.669f39e1.js": {
    "type": "application/javascript",
    "etag": "\"1ee-Fkkdk7s3FuGFDMX7DVecFQ2Hmgs\"",
    "mtime": "2024-03-29T15:44:10.332Z",
    "size": 494,
    "path": "../public/_nuxt/icon-mail.669f39e1.js"
  },
  "/_nuxt/icon-Map.1278a051.js": {
    "type": "application/javascript",
    "etag": "\"46f-YyDk1rO3S99VT9gHHiXw71rjNDM\"",
    "mtime": "2024-03-29T15:44:10.298Z",
    "size": 1135,
    "path": "../public/_nuxt/icon-Map.1278a051.js"
  },
  "/_nuxt/icon-margin-bottom.f581f224.js": {
    "type": "application/javascript",
    "etag": "\"23f-e1etuhnWapoaiMFLQEGwtFdOHdc\"",
    "mtime": "2024-03-29T15:44:10.310Z",
    "size": 575,
    "path": "../public/_nuxt/icon-margin-bottom.f581f224.js"
  },
  "/_nuxt/icon-margin-left.c0aeff6f.js": {
    "type": "application/javascript",
    "etag": "\"20f-pTlOJS6yF2YIaOt9VJaQ9yM3Xow\"",
    "mtime": "2024-03-29T15:44:10.311Z",
    "size": 527,
    "path": "../public/_nuxt/icon-margin-left.c0aeff6f.js"
  },
  "/_nuxt/icon-margin-right.1d29332a.js": {
    "type": "application/javascript",
    "etag": "\"240-RrGVQJ345L3Fsl2qjwhvbGupXXk\"",
    "mtime": "2024-03-29T15:44:10.324Z",
    "size": 576,
    "path": "../public/_nuxt/icon-margin-right.1d29332a.js"
  },
  "/_nuxt/icon-margin-top.f0600c91.js": {
    "type": "application/javascript",
    "etag": "\"23f-BYyUQJ2JL0Y2qhHuimM3qzcHIJo\"",
    "mtime": "2024-03-29T15:44:10.311Z",
    "size": 575,
    "path": "../public/_nuxt/icon-margin-top.f0600c91.js"
  },
  "/_nuxt/icon-marker.37ca3d47.js": {
    "type": "application/javascript",
    "etag": "\"1a2-27Gi6XVPoZN0HKRY+nZCZFxvG6k\"",
    "mtime": "2024-03-29T15:44:10.330Z",
    "size": 418,
    "path": "../public/_nuxt/icon-marker.37ca3d47.js"
  },
  "/_nuxt/icon-menu.6d0c149e.js": {
    "type": "application/javascript",
    "etag": "\"13c-f0dlgbwXPhvdV9j775YEx4SHghA\"",
    "mtime": "2024-03-29T15:44:10.316Z",
    "size": 316,
    "path": "../public/_nuxt/icon-menu.6d0c149e.js"
  },
  "/_nuxt/icon-mess.db246453.js": {
    "type": "application/javascript",
    "etag": "\"2ae-KAe7j/zZnDjYVU9wOpKTV25SPBg\"",
    "mtime": "2024-03-29T15:44:10.330Z",
    "size": 686,
    "path": "../public/_nuxt/icon-mess.db246453.js"
  },
  "/_nuxt/icon-minus.b81865aa.js": {
    "type": "application/javascript",
    "etag": "\"a4-8yfEJX3B81OctiW7k5ubW/73+kM\"",
    "mtime": "2024-03-29T15:44:10.311Z",
    "size": 164,
    "path": "../public/_nuxt/icon-minus.b81865aa.js"
  },
  "/_nuxt/icon-mobile.c3fc9578.js": {
    "type": "application/javascript",
    "etag": "\"256-srM2GG9FjJTZVSwWzbc8QSQjH/s\"",
    "mtime": "2024-03-29T15:44:10.338Z",
    "size": 598,
    "path": "../public/_nuxt/icon-mobile.c3fc9578.js"
  },
  "/_nuxt/icon-mobile_.1336496a.js": {
    "type": "application/javascript",
    "etag": "\"259-mzjXdJbAa4vXTWwQOmOT/I0VCEY\"",
    "mtime": "2024-03-29T15:44:10.316Z",
    "size": 601,
    "path": "../public/_nuxt/icon-mobile_.1336496a.js"
  },
  "/_nuxt/icon-modules.8e93bb8a.js": {
    "type": "application/javascript",
    "etag": "\"53a-3M5y+5KmKes7wf39pF4HJ2UrVqA\"",
    "mtime": "2024-03-29T15:44:10.298Z",
    "size": 1338,
    "path": "../public/_nuxt/icon-modules.8e93bb8a.js"
  },
  "/_nuxt/icon-modules_check.aaadba13.js": {
    "type": "application/javascript",
    "etag": "\"71e-K492livcgS57qE1h814p/MJbpIc\"",
    "mtime": "2024-03-29T15:44:10.324Z",
    "size": 1822,
    "path": "../public/_nuxt/icon-modules_check.aaadba13.js"
  },
  "/_nuxt/icon-modules_landscape.481e4020.js": {
    "type": "application/javascript",
    "etag": "\"7f6-W9/2v6vH3QhY74/UIN00alTaCUY\"",
    "mtime": "2024-03-29T15:44:10.326Z",
    "size": 2038,
    "path": "../public/_nuxt/icon-modules_landscape.481e4020.js"
  },
  "/_nuxt/icon-move.ede86bb4.js": {
    "type": "application/javascript",
    "etag": "\"ef-UEhUubWS1Ojbr5l7XjB86Scd6gM\"",
    "mtime": "2024-03-29T15:44:10.304Z",
    "size": 239,
    "path": "../public/_nuxt/icon-move.ede86bb4.js"
  },
  "/_nuxt/icon-MyWork.964562cd.js": {
    "type": "application/javascript",
    "etag": "\"23d-gx1lNLMwVVvT0DWJOALWLv/sLoQ\"",
    "mtime": "2024-03-29T15:44:10.318Z",
    "size": 573,
    "path": "../public/_nuxt/icon-MyWork.964562cd.js"
  },
  "/_nuxt/icon-Offer.d39362ab.js": {
    "type": "application/javascript",
    "etag": "\"1e1-nNIKYj5RW1Q0M9MIRqBxiXwuN/M\"",
    "mtime": "2024-03-29T15:44:10.311Z",
    "size": 481,
    "path": "../public/_nuxt/icon-Offer.d39362ab.js"
  },
  "/_nuxt/icon-padding-bottom.1a8df249.js": {
    "type": "application/javascript",
    "etag": "\"23c-ujGsWxgcnIy+1Fj4h0mn30e0458\"",
    "mtime": "2024-03-29T15:44:10.312Z",
    "size": 572,
    "path": "../public/_nuxt/icon-padding-bottom.1a8df249.js"
  },
  "/_nuxt/icon-padding-left.5b009712.js": {
    "type": "application/javascript",
    "etag": "\"20a-NMOCEqHVoGeThhOwQgLr8vH0Z4A\"",
    "mtime": "2024-03-29T15:44:10.322Z",
    "size": 522,
    "path": "../public/_nuxt/icon-padding-left.5b009712.js"
  },
  "/_nuxt/icon-padding-right.b80dfee2.js": {
    "type": "application/javascript",
    "etag": "\"20d-/fEIpuKAc3mduXkzDSlW589/Hzk\"",
    "mtime": "2024-03-29T15:44:10.323Z",
    "size": 525,
    "path": "../public/_nuxt/icon-padding-right.b80dfee2.js"
  },
  "/_nuxt/icon-padding-top.b2954044.js": {
    "type": "application/javascript",
    "etag": "\"23e-QkKyrHS8jlCZhLM7J2U9EGBL/oY\"",
    "mtime": "2024-03-29T15:44:10.307Z",
    "size": 574,
    "path": "../public/_nuxt/icon-padding-top.b2954044.js"
  },
  "/_nuxt/icon-pause.747beb1c.js": {
    "type": "application/javascript",
    "etag": "\"110-BEzcxRFWr9EzmKTWSM3xAx2dEmE\"",
    "mtime": "2024-03-29T15:44:10.344Z",
    "size": 272,
    "path": "../public/_nuxt/icon-pause.747beb1c.js"
  },
  "/_nuxt/icon-pending.c59bad18.js": {
    "type": "application/javascript",
    "etag": "\"119-WyK5Jnylfw0rC7mODDLRFjl6xsA\"",
    "mtime": "2024-03-29T15:44:10.316Z",
    "size": 281,
    "path": "../public/_nuxt/icon-pending.c59bad18.js"
  },
  "/_nuxt/icon-phone.911d269e.js": {
    "type": "application/javascript",
    "etag": "\"320-JiRTWcaUkQj84OOhS5B4IDWwYMM\"",
    "mtime": "2024-03-29T15:44:10.343Z",
    "size": 800,
    "path": "../public/_nuxt/icon-phone.911d269e.js"
  },
  "/_nuxt/icon-play.8d9117d7.js": {
    "type": "application/javascript",
    "etag": "\"103-2aQyj7hQkcARXzriz46ymko7lkY\"",
    "mtime": "2024-03-29T15:44:10.344Z",
    "size": 259,
    "path": "../public/_nuxt/icon-play.8d9117d7.js"
  },
  "/_nuxt/icon-plus.4934a9f9.js": {
    "type": "application/javascript",
    "etag": "\"d8-8G4fM39pXSYSiaglgPYTXp83l7o\"",
    "mtime": "2024-03-29T15:44:10.336Z",
    "size": 216,
    "path": "../public/_nuxt/icon-plus.4934a9f9.js"
  },
  "/_nuxt/icon-polygon_add2.2f6d7929.js": {
    "type": "application/javascript",
    "etag": "\"355-7Ro/g9JUFWDMfU0NfvC/+xns9hg\"",
    "mtime": "2024-03-29T15:44:10.323Z",
    "size": 853,
    "path": "../public/_nuxt/icon-polygon_add2.2f6d7929.js"
  },
  "/_nuxt/icon-polygon_subtract.6fbbe36f.js": {
    "type": "application/javascript",
    "etag": "\"373-oUQ6ZlBGWt17mPbqgXpzbceMi4M\"",
    "mtime": "2024-03-29T15:44:10.298Z",
    "size": 883,
    "path": "../public/_nuxt/icon-polygon_subtract.6fbbe36f.js"
  },
  "/_nuxt/icon-PortraitText.d2f962a4.js": {
    "type": "application/javascript",
    "etag": "\"21a-7NMKQUv43X5Sl/F0oQCqWmtWW2g\"",
    "mtime": "2024-03-29T15:44:10.304Z",
    "size": 538,
    "path": "../public/_nuxt/icon-PortraitText.d2f962a4.js"
  },
  "/_nuxt/icon-power.0d57bd38.js": {
    "type": "application/javascript",
    "etag": "\"16d-RVxSDCjcDWim7UxJtr62yCJ7BQc\"",
    "mtime": "2024-03-29T15:44:10.336Z",
    "size": 365,
    "path": "../public/_nuxt/icon-power.0d57bd38.js"
  },
  "/_nuxt/icon-Prices.c20cefb5.js": {
    "type": "application/javascript",
    "etag": "\"24e-daUzqT3TkoCyhzYOr/R6x9OGpvA\"",
    "mtime": "2024-03-29T15:44:10.332Z",
    "size": 590,
    "path": "../public/_nuxt/icon-Prices.c20cefb5.js"
  },
  "/_nuxt/icon-quote.6bdea76e.js": {
    "type": "application/javascript",
    "etag": "\"146-YyuVhAMZo1wd9CAfIJwuBNGW54w\"",
    "mtime": "2024-03-29T15:44:10.345Z",
    "size": 326,
    "path": "../public/_nuxt/icon-quote.6bdea76e.js"
  },
  "/_nuxt/icon-rectangle.3a080e31.js": {
    "type": "application/javascript",
    "etag": "\"b5-k13ONwGOdIDEeue6tMZ9XXnRyUU\"",
    "mtime": "2024-03-29T15:44:10.331Z",
    "size": 181,
    "path": "../public/_nuxt/icon-rectangle.3a080e31.js"
  },
  "/_nuxt/icon-reload.d3a588cc.js": {
    "type": "application/javascript",
    "etag": "\"179-ATwfJK2yZQBgkb8lD9rYtAcJ5Bs\"",
    "mtime": "2024-03-29T15:44:10.338Z",
    "size": 377,
    "path": "../public/_nuxt/icon-reload.d3a588cc.js"
  },
  "/_nuxt/icon-repair.294b373d.js": {
    "type": "application/javascript",
    "etag": "\"2f8-vkXoWRI7LyTKGhCvaapfUAOPG78\"",
    "mtime": "2024-03-29T15:44:10.322Z",
    "size": 760,
    "path": "../public/_nuxt/icon-repair.294b373d.js"
  },
  "/_nuxt/icon-right-aligned.209d640f.js": {
    "type": "application/javascript",
    "etag": "\"333-DQ0RZGePsug3BUHgYkgTqtP+Qy8\"",
    "mtime": "2024-03-29T15:44:10.311Z",
    "size": 819,
    "path": "../public/_nuxt/icon-right-aligned.209d640f.js"
  },
  "/_nuxt/icon-save.e0d2d1b7.js": {
    "type": "application/javascript",
    "etag": "\"1e8-X1B23DUpFQEvjbQt9vRd7nNI1Ro\"",
    "mtime": "2024-03-29T15:44:10.324Z",
    "size": 488,
    "path": "../public/_nuxt/icon-save.e0d2d1b7.js"
  },
  "/_nuxt/icon-search.0fb0ffae.js": {
    "type": "application/javascript",
    "etag": "\"12b-Xmhs3hbNBXzQjT9bz37XnAkMIeo\"",
    "mtime": "2024-03-29T15:44:10.317Z",
    "size": 299,
    "path": "../public/_nuxt/icon-search.0fb0ffae.js"
  },
  "/_nuxt/icon-sort.c1016673.js": {
    "type": "application/javascript",
    "etag": "\"158-BG7EBVDu3qUYwhvCifLmPJvp5DY\"",
    "mtime": "2024-03-29T15:44:10.343Z",
    "size": 344,
    "path": "../public/_nuxt/icon-sort.c1016673.js"
  },
  "/_nuxt/icon-subvention.b7153929.js": {
    "type": "application/javascript",
    "etag": "\"362-oAF+vRKFn4TJIaDf1cnkX/nEGBQ\"",
    "mtime": "2024-03-29T15:44:10.348Z",
    "size": 866,
    "path": "../public/_nuxt/icon-subvention.b7153929.js"
  },
  "/_nuxt/icon-sun.5957cb9c.js": {
    "type": "application/javascript",
    "etag": "\"3f1-MuquWQX3wBf+lnM+J6WiO3eRZ8E\"",
    "mtime": "2024-03-29T15:44:10.343Z",
    "size": 1009,
    "path": "../public/_nuxt/icon-sun.5957cb9c.js"
  },
  "/_nuxt/icon-tablet.3ba5a300.js": {
    "type": "application/javascript",
    "etag": "\"227-xEv9DcAJMna0W0zaoqjTsZWxo0Y\"",
    "mtime": "2024-03-29T15:44:10.330Z",
    "size": 551,
    "path": "../public/_nuxt/icon-tablet.3ba5a300.js"
  },
  "/_nuxt/icon-Testimonials.093d1e34.js": {
    "type": "application/javascript",
    "etag": "\"2aa-3KK81wLYTstGFbpV8rVxa1vfRZ8\"",
    "mtime": "2024-03-29T15:44:10.304Z",
    "size": 682,
    "path": "../public/_nuxt/icon-Testimonials.093d1e34.js"
  },
  "/_nuxt/icon-trash.df7d6836.js": {
    "type": "application/javascript",
    "etag": "\"2c9-pP0QKOazQGf2latRDqD3K2o5jgk\"",
    "mtime": "2024-03-29T15:44:10.305Z",
    "size": 713,
    "path": "../public/_nuxt/icon-trash.df7d6836.js"
  },
  "/_nuxt/icon-tree.ca0f2a56.js": {
    "type": "application/javascript",
    "etag": "\"20a-BU4Ldr3hmfyalUDsANRDm8Ea6y4\"",
    "mtime": "2024-03-29T15:44:10.324Z",
    "size": 522,
    "path": "../public/_nuxt/icon-tree.ca0f2a56.js"
  },
  "/_nuxt/icon-triangles.e14ee52b.js": {
    "type": "application/javascript",
    "etag": "\"17f-u73WX20wCoUOCJJH2oBKqppEAhI\"",
    "mtime": "2024-03-29T15:44:10.317Z",
    "size": 383,
    "path": "../public/_nuxt/icon-triangles.e14ee52b.js"
  },
  "/_nuxt/icon-triangle_down.32d0a561.js": {
    "type": "application/javascript",
    "etag": "\"102-RqszTiF3ZPIeWPMDxaQO7Wi8vmM\"",
    "mtime": "2024-03-29T15:44:10.323Z",
    "size": 258,
    "path": "../public/_nuxt/icon-triangle_down.32d0a561.js"
  },
  "/_nuxt/icon-triangle_up.774f0633.js": {
    "type": "application/javascript",
    "etag": "\"104-V0sIqs5UGK1UdB2UnlalfnWE0l8\"",
    "mtime": "2024-03-29T15:44:10.317Z",
    "size": 260,
    "path": "../public/_nuxt/icon-triangle_up.774f0633.js"
  },
  "/_nuxt/icon-upload.d2f90f86.js": {
    "type": "application/javascript",
    "etag": "\"1c7-pYbD5Aw6W7VJFCE+h1+fDW1ZG1g\"",
    "mtime": "2024-03-29T15:44:10.304Z",
    "size": 455,
    "path": "../public/_nuxt/icon-upload.d2f90f86.js"
  },
  "/_nuxt/icon-user.470e4aa0.js": {
    "type": "application/javascript",
    "etag": "\"146-kOPcEFbl8t50fEqmQXX1UBySVCs\"",
    "mtime": "2024-03-29T15:44:10.304Z",
    "size": 326,
    "path": "../public/_nuxt/icon-user.470e4aa0.js"
  },
  "/_nuxt/icon-years.d10af544.js": {
    "type": "application/javascript",
    "etag": "\"2a3-+pRocztF4lBKQeOZLfc8/PpKLWY\"",
    "mtime": "2024-03-29T15:44:10.317Z",
    "size": 675,
    "path": "../public/_nuxt/icon-years.d10af544.js"
  },
  "/_nuxt/IconSelector.vue.35ef582e.js": {
    "type": "application/javascript",
    "etag": "\"25a7-VNCKiLt42GtPIf0d5WRt/ydlCOE\"",
    "mtime": "2024-03-29T15:44:10.304Z",
    "size": 9639,
    "path": "../public/_nuxt/IconSelector.vue.35ef582e.js"
  },
  "/_nuxt/image-options.b8dcd861.js": {
    "type": "application/javascript",
    "etag": "\"51f-UiCpIb4QrPd4oeg0WaFYrar8jjk\"",
    "mtime": "2024-03-29T15:44:10.317Z",
    "size": 1311,
    "path": "../public/_nuxt/image-options.b8dcd861.js"
  },
  "/_nuxt/ImageList.34c95e95.js": {
    "type": "application/javascript",
    "etag": "\"edd-y8u11Rk9ECTG0iwtruC8qh2I5TM\"",
    "mtime": "2024-03-29T15:44:10.330Z",
    "size": 3805,
    "path": "../public/_nuxt/ImageList.34c95e95.js"
  },
  "/_nuxt/ImageList.4807436c.js": {
    "type": "application/javascript",
    "etag": "\"85c-eiq/EzFu3jhTxJLAm7/gutuQ5QM\"",
    "mtime": "2024-03-29T15:44:10.350Z",
    "size": 2140,
    "path": "../public/_nuxt/ImageList.4807436c.js"
  },
  "/_nuxt/ImageList.662b5ce1.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7f-XXV3VPckbzE8NdtVYL71EBaQg34\"",
    "mtime": "2024-03-29T15:44:10.291Z",
    "size": 127,
    "path": "../public/_nuxt/ImageList.662b5ce1.css"
  },
  "/_nuxt/ImageRotation.4ba5d4ca.js": {
    "type": "application/javascript",
    "etag": "\"e77-nrYA1OZ7W+s7KcKuTGTP5gTZEY4\"",
    "mtime": "2024-03-29T15:44:10.354Z",
    "size": 3703,
    "path": "../public/_nuxt/ImageRotation.4ba5d4ca.js"
  },
  "/_nuxt/ImageRotation.896d4a81.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7f-Gfb7vhZoraQ4QoYI8dZu/Q0+XAI\"",
    "mtime": "2024-03-29T15:44:10.297Z",
    "size": 127,
    "path": "../public/_nuxt/ImageRotation.896d4a81.css"
  },
  "/_nuxt/ImageRotation.ddc7f433.js": {
    "type": "application/javascript",
    "etag": "\"de2-YVTYqD/xbgQsevt0SeGZOmuY/kM\"",
    "mtime": "2024-03-29T15:44:10.345Z",
    "size": 3554,
    "path": "../public/_nuxt/ImageRotation.ddc7f433.js"
  },
  "/_nuxt/index.0545a2e7.js": {
    "type": "application/javascript",
    "etag": "\"5e-d4P7J2wInpXqWScF/F8H3mWmGZc\"",
    "mtime": "2024-03-29T15:44:10.317Z",
    "size": 94,
    "path": "../public/_nuxt/index.0545a2e7.js"
  },
  "/_nuxt/index.a74e982a.js": {
    "type": "application/javascript",
    "etag": "\"c81-NbsMeg4uofCApKAco8Ubl3u+YdE\"",
    "mtime": "2024-03-29T15:44:10.342Z",
    "size": 3201,
    "path": "../public/_nuxt/index.a74e982a.js"
  },
  "/_nuxt/index.vue.433fed6c.js": {
    "type": "application/javascript",
    "etag": "\"57e-dOM/ti+aaEn38dLb2MZtJ9JT3tw\"",
    "mtime": "2024-03-29T15:44:10.330Z",
    "size": 1406,
    "path": "../public/_nuxt/index.vue.433fed6c.js"
  },
  "/_nuxt/IntersectonPop.vue.98d9ae67.js": {
    "type": "application/javascript",
    "etag": "\"264-YGQrIxTHG0yQNUIrys5cRzW20D0\"",
    "mtime": "2024-03-29T15:44:10.304Z",
    "size": 612,
    "path": "../public/_nuxt/IntersectonPop.vue.98d9ae67.js"
  },
  "/_nuxt/login.61a65f30.js": {
    "type": "application/javascript",
    "etag": "\"521-P4l25M/ORb8x04FRWeRA7t83EJc\"",
    "mtime": "2024-03-29T15:44:10.343Z",
    "size": 1313,
    "path": "../public/_nuxt/login.61a65f30.js"
  },
  "/_nuxt/Map.371b055c.js": {
    "type": "application/javascript",
    "etag": "\"bec-8kBuat9cvSjQ6o1iyALv+VH9Bkc\"",
    "mtime": "2024-03-29T15:44:10.338Z",
    "size": 3052,
    "path": "../public/_nuxt/Map.371b055c.js"
  },
  "/_nuxt/Map.72f52712.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"c8-W21r0u5wwzc16LhFaeYTpwdLwDU\"",
    "mtime": "2024-03-29T15:44:10.297Z",
    "size": 200,
    "path": "../public/_nuxt/Map.72f52712.css"
  },
  "/_nuxt/Map.771c3fad.js": {
    "type": "application/javascript",
    "etag": "\"b7d-Ql4+P4guBh/XvqJsPT75yDFTBXw\"",
    "mtime": "2024-03-29T15:44:10.351Z",
    "size": 2941,
    "path": "../public/_nuxt/Map.771c3fad.js"
  },
  "/_nuxt/Markdown.6a831abd.js": {
    "type": "application/javascript",
    "etag": "\"1bd-YzD+QhICsLAr3XRxcs/U+B6Cmzs\"",
    "mtime": "2024-03-29T15:44:10.350Z",
    "size": 445,
    "path": "../public/_nuxt/Markdown.6a831abd.js"
  },
  "/_nuxt/Markdown.f942a929.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"14e-WuPk42WYFEvYwqrzKJpKD/aPopo\"",
    "mtime": "2024-03-29T15:44:10.291Z",
    "size": 334,
    "path": "../public/_nuxt/Markdown.f942a929.css"
  },
  "/_nuxt/MyWork.12017784.js": {
    "type": "application/javascript",
    "etag": "\"be6-NIataW9nCWKeiVoUBaanj5W2qD0\"",
    "mtime": "2024-03-29T15:44:10.343Z",
    "size": 3046,
    "path": "../public/_nuxt/MyWork.12017784.js"
  },
  "/_nuxt/MyWork.4ccde687.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"20-sJXDFVLglbJLxV6RPboqT2G6ijM\"",
    "mtime": "2024-03-29T15:44:10.291Z",
    "size": 32,
    "path": "../public/_nuxt/MyWork.4ccde687.css"
  },
  "/_nuxt/MyWork.fab6c02a.js": {
    "type": "application/javascript",
    "etag": "\"736-yBgMiLXY/5QhgQegAPnbGP6O+yg\"",
    "mtime": "2024-03-29T15:44:10.350Z",
    "size": 1846,
    "path": "../public/_nuxt/MyWork.fab6c02a.js"
  },
  "/_nuxt/nuxt-icon.2f1fba64.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"a4-sWDBQZSmvHB2/Zs70D8cQGDErp0\"",
    "mtime": "2024-03-29T15:44:10.291Z",
    "size": 164,
    "path": "../public/_nuxt/nuxt-icon.2f1fba64.css"
  },
  "/_nuxt/nuxt-icon.76883f84.js": {
    "type": "application/javascript",
    "etag": "\"62-HsZTGUZ9PHPML2tBcUZCQms5FV4\"",
    "mtime": "2024-03-29T15:44:10.322Z",
    "size": 98,
    "path": "../public/_nuxt/nuxt-icon.76883f84.js"
  },
  "/_nuxt/nuxt-icon.vue.a9ee7894.js": {
    "type": "application/javascript",
    "etag": "\"3366-5K8AoHP6m+4KzACugmDFXyrzuAc\"",
    "mtime": "2024-03-29T15:44:10.352Z",
    "size": 13158,
    "path": "../public/_nuxt/nuxt-icon.vue.a9ee7894.js"
  },
  "/_nuxt/nuxt-link.f2e2c5b3.js": {
    "type": "application/javascript",
    "etag": "\"f47-2pb3K6niYcPy2GGjH0EOJGkNCSk\"",
    "mtime": "2024-03-29T15:44:10.316Z",
    "size": 3911,
    "path": "../public/_nuxt/nuxt-link.f2e2c5b3.js"
  },
  "/_nuxt/Offer.38825bb1.js": {
    "type": "application/javascript",
    "etag": "\"23fe-BQHqM/0nHebgTVd8Ng/9Znn5jqA\"",
    "mtime": "2024-03-29T15:44:10.345Z",
    "size": 9214,
    "path": "../public/_nuxt/Offer.38825bb1.js"
  },
  "/_nuxt/Offer.66bbd17b.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7f-s7hJEktd6aZaYhfFgwc0nZPQJF8\"",
    "mtime": "2024-03-29T15:44:10.291Z",
    "size": 127,
    "path": "../public/_nuxt/Offer.66bbd17b.css"
  },
  "/_nuxt/Offer.75733f4b.js": {
    "type": "application/javascript",
    "etag": "\"aaa-YAYkuQTFTz01Syzl+HLhQBlm5Jg\"",
    "mtime": "2024-03-29T15:44:10.350Z",
    "size": 2730,
    "path": "../public/_nuxt/Offer.75733f4b.js"
  },
  "/_nuxt/Pagelist.d45e8410.js": {
    "type": "application/javascript",
    "etag": "\"6af-C8iQDqHOo7/m8AaJg0z8hzI2KhQ\"",
    "mtime": "2024-03-29T15:44:10.318Z",
    "size": 1711,
    "path": "../public/_nuxt/Pagelist.d45e8410.js"
  },
  "/_nuxt/PortraitText.06533edd.js": {
    "type": "application/javascript",
    "etag": "\"7ed-h7jx+ilCztyH88/9J2ycCUGA8J0\"",
    "mtime": "2024-03-29T15:44:10.350Z",
    "size": 2029,
    "path": "../public/_nuxt/PortraitText.06533edd.js"
  },
  "/_nuxt/PortraitText.71ef223c.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3c-SOtwc5IoIiOTYGJKnRfqO//fJEI\"",
    "mtime": "2024-03-29T15:44:10.297Z",
    "size": 60,
    "path": "../public/_nuxt/PortraitText.71ef223c.css"
  },
  "/_nuxt/PortraitText.aa1692e9.js": {
    "type": "application/javascript",
    "etag": "\"948-6sL8wIhPi39NUl6NvK5G58a4JLU\"",
    "mtime": "2024-03-29T15:44:10.349Z",
    "size": 2376,
    "path": "../public/_nuxt/PortraitText.aa1692e9.js"
  },
  "/_nuxt/Prices.f31ec899.js": {
    "type": "application/javascript",
    "etag": "\"1dbe-rwkO/YMak0vSj0HWURjt7rwjHek\"",
    "mtime": "2024-03-29T15:44:10.345Z",
    "size": 7614,
    "path": "../public/_nuxt/Prices.f31ec899.js"
  },
  "/_nuxt/Prices.fc9c76c6.js": {
    "type": "application/javascript",
    "etag": "\"13d1-hfxWHQOOXvmnfDc0UO9GeltlfAc\"",
    "mtime": "2024-03-29T15:44:10.330Z",
    "size": 5073,
    "path": "../public/_nuxt/Prices.fc9c76c6.js"
  },
  "/_nuxt/sidebar.9fe9d57b.js": {
    "type": "application/javascript",
    "etag": "\"43f-bkifeT6juX+KPisnvMrAfhskb5Q\"",
    "mtime": "2024-03-29T15:44:10.344Z",
    "size": 1087,
    "path": "../public/_nuxt/sidebar.9fe9d57b.js"
  },
  "/_nuxt/subset-Nunito-Regular.61d3c7b5.svg": {
    "type": "image/svg+xml",
    "etag": "\"2ac7e-OAre8eCHzsKasu7o2u6fPE1VPV0\"",
    "mtime": "2024-03-29T15:44:10.291Z",
    "size": 175230,
    "path": "../public/_nuxt/subset-Nunito-Regular.61d3c7b5.svg"
  },
  "/_nuxt/subset-Nunito-Regular.71ef052c.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"c560-suKcqZ7aC5BsXv1rb6qUrfA8HUM\"",
    "mtime": "2024-03-29T15:44:10.290Z",
    "size": 50528,
    "path": "../public/_nuxt/subset-Nunito-Regular.71ef052c.eot"
  },
  "/_nuxt/subset-Nunito-Regular.7d9717c0.woff": {
    "type": "font/woff",
    "etag": "\"6770-jEzDjsaUYA9NyIUFitCy8PirftU\"",
    "mtime": "2024-03-29T15:44:10.291Z",
    "size": 26480,
    "path": "../public/_nuxt/subset-Nunito-Regular.7d9717c0.woff"
  },
  "/_nuxt/subset-Nunito-Regular.e2286a83.woff2": {
    "type": "font/woff2",
    "etag": "\"5184-h804HNDtQTeJ/sRq44s1wdTnP5s\"",
    "mtime": "2024-03-29T15:44:10.290Z",
    "size": 20868,
    "path": "../public/_nuxt/subset-Nunito-Regular.e2286a83.woff2"
  },
  "/_nuxt/subset-Nunito-Regular.fc3a84a3.ttf": {
    "type": "font/ttf",
    "etag": "\"c4ac-wCWIWv30B9tPJsDVjWLJcA8pX4M\"",
    "mtime": "2024-03-29T15:44:10.291Z",
    "size": 50348,
    "path": "../public/_nuxt/subset-Nunito-Regular.fc3a84a3.ttf"
  },
  "/_nuxt/subset-PlayfairDisplay-Regular.26779443.woff": {
    "type": "font/woff",
    "etag": "\"7f78-9UYQykAgvYLyG/v6v4Y8oxpy++w\"",
    "mtime": "2024-03-29T15:44:10.291Z",
    "size": 32632,
    "path": "../public/_nuxt/subset-PlayfairDisplay-Regular.26779443.woff"
  },
  "/_nuxt/subset-PlayfairDisplay-Regular.395edcd5.ttf": {
    "type": "font/ttf",
    "etag": "\"ec00-OAE1y6wo4qiMr37BkXIS9d5Q+/k\"",
    "mtime": "2024-03-29T15:44:10.291Z",
    "size": 60416,
    "path": "../public/_nuxt/subset-PlayfairDisplay-Regular.395edcd5.ttf"
  },
  "/_nuxt/subset-PlayfairDisplay-Regular.7193146a.svg": {
    "type": "image/svg+xml",
    "etag": "\"314b6-F7WOcDu7ZTttzJmMOZ18IZaLrOM\"",
    "mtime": "2024-03-29T15:44:10.291Z",
    "size": 201910,
    "path": "../public/_nuxt/subset-PlayfairDisplay-Regular.7193146a.svg"
  },
  "/_nuxt/subset-PlayfairDisplay-Regular.deb9c1c9.woff2": {
    "type": "font/woff2",
    "etag": "\"67a4-npFcjxy67aUoxsJWoiVZ1Fnceh0\"",
    "mtime": "2024-03-29T15:44:10.291Z",
    "size": 26532,
    "path": "../public/_nuxt/subset-PlayfairDisplay-Regular.deb9c1c9.woff2"
  },
  "/_nuxt/subset-PlayfairDisplay-Regular.e8f92288.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"eda0-TU0ZDnFpUjUznPGQr/bBwbdqhUk\"",
    "mtime": "2024-03-29T15:44:10.286Z",
    "size": 60832,
    "path": "../public/_nuxt/subset-PlayfairDisplay-Regular.e8f92288.eot"
  },
  "/_nuxt/Testimonials.22360391.js": {
    "type": "application/javascript",
    "etag": "\"e7f-HB4R+9gnDzGVcIuun6phwnWhIg8\"",
    "mtime": "2024-03-29T15:44:10.351Z",
    "size": 3711,
    "path": "../public/_nuxt/Testimonials.22360391.js"
  },
  "/_nuxt/Testimonials.8c318873.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7f-ybZv1xAI5c3OTVWG6AY2ad55zio\"",
    "mtime": "2024-03-29T15:44:10.297Z",
    "size": 127,
    "path": "../public/_nuxt/Testimonials.8c318873.css"
  },
  "/_nuxt/Testimonials.f08ae5c2.js": {
    "type": "application/javascript",
    "etag": "\"9b4-6q0Q0ys3BZrKcBwyMD7FXafXw20\"",
    "mtime": "2024-03-29T15:44:10.322Z",
    "size": 2484,
    "path": "../public/_nuxt/Testimonials.f08ae5c2.js"
  },
  "/_nuxt/UpButton.vue.81e6f73b.js": {
    "type": "application/javascript",
    "etag": "\"1887-Dyj1+jfK8AvIf6WKoTTuqfl/nDM\"",
    "mtime": "2024-03-29T15:44:10.343Z",
    "size": 6279,
    "path": "../public/_nuxt/UpButton.vue.81e6f73b.js"
  },
  "/_nuxt/useBrevo.5460f232.js": {
    "type": "application/javascript",
    "etag": "\"137e-egc2YGMc3nslKu6h5p4oh+g54wk\"",
    "mtime": "2024-03-29T15:44:10.304Z",
    "size": 4990,
    "path": "../public/_nuxt/useBrevo.5460f232.js"
  },
  "/_nuxt/_...slug_.7937a5d9.js": {
    "type": "application/javascript",
    "etag": "\"10db-3/n7wifNirXDNSWU84f9mKQVzD0\"",
    "mtime": "2024-03-29T15:44:10.337Z",
    "size": 4315,
    "path": "../public/_nuxt/_...slug_.7937a5d9.js"
  },
  "/_nuxt/_plugin-vue_export-helper.c27b6911.js": {
    "type": "application/javascript",
    "etag": "\"5b-eFCz/UrraTh721pgAl0VxBNR1es\"",
    "mtime": "2024-03-29T15:44:10.312Z",
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
