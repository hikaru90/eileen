import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import http, { Server as Server$1 } from 'node:http';
import https, { Server } from 'node:https';
import { promises, existsSync } from 'fs';
import { dirname as dirname$1, resolve as resolve$1, join } from 'path';
import { promises as promises$1 } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createIPX, createIPXMiddleware } from 'ipx';

const suspectProtoRx$3 = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx$3 = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx$3 = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform$3(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped$3(key);
    return;
  }
  return value;
}
function warnKeyDropped$3(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr$3(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  const _value = value.trim();
  if (
    // eslint-disable-next-line unicorn/prefer-at
    value[0] === '"' && value.endsWith('"') && !value.includes("\\")
  ) {
    return _value.slice(1, -1);
  }
  if (_value.length <= 9) {
    const _lval = _value.toLowerCase();
    if (_lval === "true") {
      return true;
    }
    if (_lval === "false") {
      return false;
    }
    if (_lval === "undefined") {
      return void 0;
    }
    if (_lval === "null") {
      return null;
    }
    if (_lval === "nan") {
      return Number.NaN;
    }
    if (_lval === "infinity") {
      return Number.POSITIVE_INFINITY;
    }
    if (_lval === "-infinity") {
      return Number.NEGATIVE_INFINITY;
    }
  }
  if (!JsonSigRx$3.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx$3.test(value) || suspectConstructorRx$3.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform$3);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const IM_RE = /\?/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
const ENC_SLASH_RE = /%2f/gi;
const ENC_ENC_SLASH_RE = /%252f/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function encodePath(text) {
  return encode(text).replace(HASH_RE, "%23").replace(IM_RE, "%3F").replace(ENC_ENC_SLASH_RE, "%2F").replace(AMPERSAND_RE, "%26").replace(PLUS_RE, "%2B");
}
function encodeParam(text) {
  return encodePath(text).replace(SLASH_RE, "%2F");
}
function decode(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodePath(text) {
  return decode(text.replace(ENC_SLASH_RE, "%252F"));
}
function decodeQueryKey(text) {
  return decode(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode(text.replace(PLUS_RE, " "));
}

function parseQuery(parametersString = "") {
  const object = {};
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key] === void 0) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map((_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}

const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
const PROTOCOL_SCRIPT_RE = /^[\s\0]*(blob|data|javascript|vbscript):$/i;
const TRAILING_SLASH_RE = /\/$|\/\?|\/#/;
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function isScriptProtocol(protocol) {
  return !!protocol && PROTOCOL_SCRIPT_RE.test(protocol);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/");
  }
  return TRAILING_SLASH_RE.test(input);
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
  if (!hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex >= 0) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
  }
  const [s0, ...s] = path.split("?");
  const cleanPath = s0.endsWith("/") ? s0.slice(0, -1) : s0;
  return (cleanPath || "/") + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/") ? input : input + "/";
  }
  if (hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex >= 0) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
    if (!path) {
      return fragment;
    }
  }
  const [s0, ...s] = path.split("?");
  return s0 + "/" + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function hasLeadingSlash(input = "") {
  return input.startsWith("/");
}
function withLeadingSlash(input = "") {
  return hasLeadingSlash(input) ? input : "/" + input;
}
function withBase(input, base) {
  if (isEmptyURL(base) || hasProtocol(input)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (input.startsWith(_base)) {
    return input;
  }
  return joinURL(_base, input);
}
function withoutBase(input, base) {
  if (isEmptyURL(base)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (!input.startsWith(_base)) {
    return input;
  }
  const trimmed = input.slice(_base.length);
  return trimmed[0] === "/" ? trimmed : "/" + trimmed;
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function getQuery$1(input) {
  return parseQuery(parseURL(input).search);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}
function joinRelativeURL(..._input) {
  const JOIN_SEGMENT_SPLIT_RE = /\/(?!\/)/;
  const input = _input.filter(Boolean);
  const segments = [];
  let segmentsDepth = 0;
  for (const i of input) {
    if (!i || i === "/") {
      continue;
    }
    for (const [sindex, s] of i.split(JOIN_SEGMENT_SPLIT_RE).entries()) {
      if (!s || s === ".") {
        continue;
      }
      if (s === "..") {
        if (segments.length === 1 && hasProtocol(segments[0])) {
          continue;
        }
        segments.pop();
        segmentsDepth--;
        continue;
      }
      if (sindex === 1 && segments[segments.length - 1]?.endsWith(":/")) {
        segments[segments.length - 1] += "/" + s;
        continue;
      }
      segments.push(s);
      segmentsDepth++;
    }
  }
  let url = segments.join("/");
  if (segmentsDepth >= 0) {
    if (input[0]?.startsWith("/") && !url.startsWith("/")) {
      url = "/" + url;
    } else if (input[0]?.startsWith("./") && !url.startsWith("./")) {
      url = "./" + url;
    }
  } else {
    url = "../".repeat(-1 * segmentsDepth) + url;
  }
  if (input[input.length - 1]?.endsWith("/") && !url.endsWith("/")) {
    url += "/";
  }
  return url;
}
function isSamePath(p1, p2) {
  return decode(withoutTrailingSlash(p1)) === decode(withoutTrailingSlash(p2));
}

const protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  const [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  const { pathname, search, hash } = parsePath(
    path.replace(/\/(?=[A-Za-z]:)/, "")
  );
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}

const defaults = Object.freeze({
  ignoreUnknown: false,
  respectType: false,
  respectFunctionNames: false,
  respectFunctionProperties: false,
  unorderedObjects: true,
  unorderedArrays: false,
  unorderedSets: false,
  excludeKeys: void 0,
  excludeValues: void 0,
  replacer: void 0
});
function objectHash(object, options) {
  if (options) {
    options = { ...defaults, ...options };
  } else {
    options = defaults;
  }
  const hasher = createHasher(options);
  hasher.dispatch(object);
  return hasher.toString();
}
const defaultPrototypesKeys = Object.freeze([
  "prototype",
  "__proto__",
  "constructor"
]);
function createHasher(options) {
  let buff = "";
  let context = /* @__PURE__ */ new Map();
  const write = (str) => {
    buff += str;
  };
  return {
    toString() {
      return buff;
    },
    getContext() {
      return context;
    },
    dispatch(value) {
      if (options.replacer) {
        value = options.replacer(value);
      }
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    },
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      if (objectLength < 10) {
        objType = "unknown:[" + objString + "]";
      } else {
        objType = objString.slice(8, objectLength - 1);
      }
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = context.get(object)) === void 0) {
        context.set(object, context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        write("buffer:");
        return write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else if (!options.ignoreUnknown) {
          this.unkown(object, objType);
        }
      } else {
        let keys = Object.keys(object);
        if (options.unorderedObjects) {
          keys = keys.sort();
        }
        let extraKeys = [];
        if (options.respectType !== false && !isNativeFunction(object)) {
          extraKeys = defaultPrototypesKeys;
        }
        if (options.excludeKeys) {
          keys = keys.filter((key) => {
            return !options.excludeKeys(key);
          });
          extraKeys = extraKeys.filter((key) => {
            return !options.excludeKeys(key);
          });
        }
        write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          write(":");
          if (!options.excludeValues) {
            this.dispatch(object[key]);
          }
          write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    },
    array(arr, unordered) {
      unordered = unordered === void 0 ? options.unorderedArrays !== false : unordered;
      write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = createHasher(options);
        hasher.dispatch(entry);
        for (const [key, value] of hasher.getContext()) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    },
    date(date) {
      return write("date:" + date.toJSON());
    },
    symbol(sym) {
      return write("symbol:" + sym.toString());
    },
    unkown(value, type) {
      write(type);
      if (!value) {
        return;
      }
      write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          Array.from(value.entries()),
          true
          /* ordered */
        );
      }
    },
    error(err) {
      return write("error:" + err.toString());
    },
    boolean(bool) {
      return write("bool:" + bool);
    },
    string(string) {
      write("string:" + string.length + ":");
      write(string);
    },
    function(fn) {
      write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
      if (options.respectFunctionNames !== false) {
        this.dispatch("function-name:" + String(fn.name));
      }
      if (options.respectFunctionProperties) {
        this.object(fn);
      }
    },
    number(number) {
      return write("number:" + number);
    },
    xml(xml) {
      return write("xml:" + xml.toString());
    },
    null() {
      return write("Null");
    },
    undefined() {
      return write("Undefined");
    },
    regexp(regex) {
      return write("regex:" + regex.toString());
    },
    uint8array(arr) {
      write("uint8array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint8clampedarray(arr) {
      write("uint8clampedarray:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int8array(arr) {
      write("int8array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint16array(arr) {
      write("uint16array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int16array(arr) {
      write("int16array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint32array(arr) {
      write("uint32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int32array(arr) {
      write("int32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    float32array(arr) {
      write("float32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    float64array(arr) {
      write("float64array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    arraybuffer(arr) {
      write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    },
    url(url) {
      return write("url:" + url.toString());
    },
    map(map) {
      write("map:");
      const arr = [...map];
      return this.array(arr, options.unorderedSets !== false);
    },
    set(set) {
      write("set:");
      const arr = [...set];
      return this.array(arr, options.unorderedSets !== false);
    },
    file(file) {
      write("file:");
      return this.dispatch([file.name, file.size, file.type, file.lastModfied]);
    },
    blob() {
      if (options.ignoreUnknown) {
        return write("[blob]");
      }
      throw new Error(
        'Hashing Blob objects is currently not supported\nUse "options.replacer" or "options.ignoreUnknown"\n'
      );
    },
    domwindow() {
      return write("domwindow");
    },
    bigint(number) {
      return write("bigint:" + number.toString());
    },
    /* Node.js standard native objects */
    process() {
      return write("process");
    },
    timer() {
      return write("timer");
    },
    pipe() {
      return write("pipe");
    },
    tcp() {
      return write("tcp");
    },
    udp() {
      return write("udp");
    },
    tty() {
      return write("tty");
    },
    statwatcher() {
      return write("statwatcher");
    },
    securecontext() {
      return write("securecontext");
    },
    connection() {
      return write("connection");
    },
    zlib() {
      return write("zlib");
    },
    context() {
      return write("context");
    },
    nodescript() {
      return write("nodescript");
    },
    httpparser() {
      return write("httpparser");
    },
    dataview() {
      return write("dataview");
    },
    signal() {
      return write("signal");
    },
    fsevent() {
      return write("fsevent");
    },
    tlswrap() {
      return write("tlswrap");
    }
  };
}
const nativeFunc = "[native code] }";
const nativeFuncLength = nativeFunc.length;
function isNativeFunction(f) {
  if (typeof f !== "function") {
    return false;
  }
  return Function.prototype.toString.call(f).slice(-nativeFuncLength) === nativeFunc;
}

class WordArray {
  constructor(words, sigBytes) {
    words = this.words = words || [];
    this.sigBytes = sigBytes === void 0 ? words.length * 4 : sigBytes;
  }
  toString(encoder) {
    return (encoder || Hex).stringify(this);
  }
  concat(wordArray) {
    this.clamp();
    if (this.sigBytes % 4) {
      for (let i = 0; i < wordArray.sigBytes; i++) {
        const thatByte = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
        this.words[this.sigBytes + i >>> 2] |= thatByte << 24 - (this.sigBytes + i) % 4 * 8;
      }
    } else {
      for (let j = 0; j < wordArray.sigBytes; j += 4) {
        this.words[this.sigBytes + j >>> 2] = wordArray.words[j >>> 2];
      }
    }
    this.sigBytes += wordArray.sigBytes;
    return this;
  }
  clamp() {
    this.words[this.sigBytes >>> 2] &= 4294967295 << 32 - this.sigBytes % 4 * 8;
    this.words.length = Math.ceil(this.sigBytes / 4);
  }
  clone() {
    return new WordArray([...this.words]);
  }
}
const Hex = {
  stringify(wordArray) {
    const hexChars = [];
    for (let i = 0; i < wordArray.sigBytes; i++) {
      const bite = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
      hexChars.push((bite >>> 4).toString(16), (bite & 15).toString(16));
    }
    return hexChars.join("");
  }
};
const Base64 = {
  stringify(wordArray) {
    const keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const base64Chars = [];
    for (let i = 0; i < wordArray.sigBytes; i += 3) {
      const byte1 = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
      const byte2 = wordArray.words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
      const byte3 = wordArray.words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
      const triplet = byte1 << 16 | byte2 << 8 | byte3;
      for (let j = 0; j < 4 && i * 8 + j * 6 < wordArray.sigBytes * 8; j++) {
        base64Chars.push(keyStr.charAt(triplet >>> 6 * (3 - j) & 63));
      }
    }
    return base64Chars.join("");
  }
};
const Latin1 = {
  parse(latin1Str) {
    const latin1StrLength = latin1Str.length;
    const words = [];
    for (let i = 0; i < latin1StrLength; i++) {
      words[i >>> 2] |= (latin1Str.charCodeAt(i) & 255) << 24 - i % 4 * 8;
    }
    return new WordArray(words, latin1StrLength);
  }
};
const Utf8 = {
  parse(utf8Str) {
    return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
  }
};
class BufferedBlockAlgorithm {
  constructor() {
    this._data = new WordArray();
    this._nDataBytes = 0;
    this._minBufferSize = 0;
    this.blockSize = 512 / 32;
  }
  reset() {
    this._data = new WordArray();
    this._nDataBytes = 0;
  }
  _append(data) {
    if (typeof data === "string") {
      data = Utf8.parse(data);
    }
    this._data.concat(data);
    this._nDataBytes += data.sigBytes;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _doProcessBlock(_dataWords, _offset) {
  }
  _process(doFlush) {
    let processedWords;
    let nBlocksReady = this._data.sigBytes / (this.blockSize * 4);
    if (doFlush) {
      nBlocksReady = Math.ceil(nBlocksReady);
    } else {
      nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
    }
    const nWordsReady = nBlocksReady * this.blockSize;
    const nBytesReady = Math.min(nWordsReady * 4, this._data.sigBytes);
    if (nWordsReady) {
      for (let offset = 0; offset < nWordsReady; offset += this.blockSize) {
        this._doProcessBlock(this._data.words, offset);
      }
      processedWords = this._data.words.splice(0, nWordsReady);
      this._data.sigBytes -= nBytesReady;
    }
    return new WordArray(processedWords, nBytesReady);
  }
}
class Hasher extends BufferedBlockAlgorithm {
  update(messageUpdate) {
    this._append(messageUpdate);
    this._process();
    return this;
  }
  finalize(messageUpdate) {
    if (messageUpdate) {
      this._append(messageUpdate);
    }
  }
}

const H = [
  1779033703,
  -1150833019,
  1013904242,
  -1521486534,
  1359893119,
  -1694144372,
  528734635,
  1541459225
];
const K = [
  1116352408,
  1899447441,
  -1245643825,
  -373957723,
  961987163,
  1508970993,
  -1841331548,
  -1424204075,
  -670586216,
  310598401,
  607225278,
  1426881987,
  1925078388,
  -2132889090,
  -1680079193,
  -1046744716,
  -459576895,
  -272742522,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  -1740746414,
  -1473132947,
  -1341970488,
  -1084653625,
  -958395405,
  -710438585,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  -2117940946,
  -1838011259,
  -1564481375,
  -1474664885,
  -1035236496,
  -949202525,
  -778901479,
  -694614492,
  -200395387,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  -2067236844,
  -1933114872,
  -1866530822,
  -1538233109,
  -1090935817,
  -965641998
];
const W = [];
class SHA256 extends Hasher {
  constructor() {
    super(...arguments);
    this._hash = new WordArray([...H]);
  }
  reset() {
    super.reset();
    this._hash = new WordArray([...H]);
  }
  _doProcessBlock(M, offset) {
    const H2 = this._hash.words;
    let a = H2[0];
    let b = H2[1];
    let c = H2[2];
    let d = H2[3];
    let e = H2[4];
    let f = H2[5];
    let g = H2[6];
    let h = H2[7];
    for (let i = 0; i < 64; i++) {
      if (i < 16) {
        W[i] = M[offset + i] | 0;
      } else {
        const gamma0x = W[i - 15];
        const gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
        const gamma1x = W[i - 2];
        const gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
        W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
      }
      const ch = e & f ^ ~e & g;
      const maj = a & b ^ a & c ^ b & c;
      const sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
      const sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
      const t1 = h + sigma1 + ch + K[i] + W[i];
      const t2 = sigma0 + maj;
      h = g;
      g = f;
      f = e;
      e = d + t1 | 0;
      d = c;
      c = b;
      b = a;
      a = t1 + t2 | 0;
    }
    H2[0] = H2[0] + a | 0;
    H2[1] = H2[1] + b | 0;
    H2[2] = H2[2] + c | 0;
    H2[3] = H2[3] + d | 0;
    H2[4] = H2[4] + e | 0;
    H2[5] = H2[5] + f | 0;
    H2[6] = H2[6] + g | 0;
    H2[7] = H2[7] + h | 0;
  }
  finalize(messageUpdate) {
    super.finalize(messageUpdate);
    const nBitsTotal = this._nDataBytes * 8;
    const nBitsLeft = this._data.sigBytes * 8;
    this._data.words[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
    this._data.words[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(
      nBitsTotal / 4294967296
    );
    this._data.words[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
    this._data.sigBytes = this._data.words.length * 4;
    this._process();
    return this._hash;
  }
}
function sha256base64(message) {
  return new SHA256().finalize(message).toString(Base64);
}

function hash(object, options = {}) {
  const hashed = typeof object === "string" ? object : objectHash(object, options);
  return sha256base64(hashed).slice(0, 10);
}

const NODE_TYPES = {
  NORMAL: 0,
  WILDCARD: 1,
  PLACEHOLDER: 2
};

function createRouter$1(options = {}) {
  const ctx = {
    options,
    rootNode: createRadixNode(),
    staticRoutesMap: {}
  };
  const normalizeTrailingSlash = (p) => options.strictTrailingSlash ? p : p.replace(/\/$/, "") || "/";
  if (options.routes) {
    for (const path in options.routes) {
      insert(ctx, normalizeTrailingSlash(path), options.routes[path]);
    }
  }
  return {
    ctx,
    lookup: (path) => lookup(ctx, normalizeTrailingSlash(path)),
    insert: (path, data) => insert(ctx, normalizeTrailingSlash(path), data),
    remove: (path) => remove(ctx, normalizeTrailingSlash(path))
  };
}
function lookup(ctx, path) {
  const staticPathNode = ctx.staticRoutesMap[path];
  if (staticPathNode) {
    return staticPathNode.data;
  }
  const sections = path.split("/");
  const params = {};
  let paramsFound = false;
  let wildcardNode = null;
  let node = ctx.rootNode;
  let wildCardParam = null;
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (node.wildcardChildNode !== null) {
      wildcardNode = node.wildcardChildNode;
      wildCardParam = sections.slice(i).join("/");
    }
    const nextNode = node.children.get(section);
    if (nextNode === void 0) {
      if (node && node.placeholderChildren.length > 1) {
        const remaining = sections.length - i;
        node = node.placeholderChildren.find((c) => c.maxDepth === remaining) || null;
      } else {
        node = node.placeholderChildren[0] || null;
      }
      if (!node) {
        break;
      }
      if (node.paramName) {
        params[node.paramName] = section;
      }
      paramsFound = true;
    } else {
      node = nextNode;
    }
  }
  if ((node === null || node.data === null) && wildcardNode !== null) {
    node = wildcardNode;
    params[node.paramName || "_"] = wildCardParam;
    paramsFound = true;
  }
  if (!node) {
    return null;
  }
  if (paramsFound) {
    return {
      ...node.data,
      params: paramsFound ? params : void 0
    };
  }
  return node.data;
}
function insert(ctx, path, data) {
  let isStaticRoute = true;
  const sections = path.split("/");
  let node = ctx.rootNode;
  let _unnamedPlaceholderCtr = 0;
  const matchedNodes = [node];
  for (const section of sections) {
    let childNode;
    if (childNode = node.children.get(section)) {
      node = childNode;
    } else {
      const type = getNodeType(section);
      childNode = createRadixNode({ type, parent: node });
      node.children.set(section, childNode);
      if (type === NODE_TYPES.PLACEHOLDER) {
        childNode.paramName = section === "*" ? `_${_unnamedPlaceholderCtr++}` : section.slice(1);
        node.placeholderChildren.push(childNode);
        isStaticRoute = false;
      } else if (type === NODE_TYPES.WILDCARD) {
        node.wildcardChildNode = childNode;
        childNode.paramName = section.slice(
          3
          /* "**:" */
        ) || "_";
        isStaticRoute = false;
      }
      matchedNodes.push(childNode);
      node = childNode;
    }
  }
  for (const [depth, node2] of matchedNodes.entries()) {
    node2.maxDepth = Math.max(matchedNodes.length - depth, node2.maxDepth || 0);
  }
  node.data = data;
  if (isStaticRoute === true) {
    ctx.staticRoutesMap[path] = node;
  }
  return node;
}
function remove(ctx, path) {
  let success = false;
  const sections = path.split("/");
  let node = ctx.rootNode;
  for (const section of sections) {
    node = node.children.get(section);
    if (!node) {
      return success;
    }
  }
  if (node.data) {
    const lastSection = sections.at(-1) || "";
    node.data = null;
    if (Object.keys(node.children).length === 0 && node.parent) {
      node.parent.children.delete(lastSection);
      node.parent.wildcardChildNode = null;
      node.parent.placeholderChildren = [];
    }
    success = true;
  }
  return success;
}
function createRadixNode(options = {}) {
  return {
    type: options.type || NODE_TYPES.NORMAL,
    maxDepth: 0,
    parent: options.parent || null,
    children: /* @__PURE__ */ new Map(),
    data: options.data || null,
    paramName: options.paramName || null,
    wildcardChildNode: null,
    placeholderChildren: []
  };
}
function getNodeType(str) {
  if (str.startsWith("**")) {
    return NODE_TYPES.WILDCARD;
  }
  if (str[0] === ":" || str === "*") {
    return NODE_TYPES.PLACEHOLDER;
  }
  return NODE_TYPES.NORMAL;
}

function toRouteMatcher(router) {
  const table = _routerNodeToTable("", router.ctx.rootNode);
  return _createMatcher(table, router.ctx.options.strictTrailingSlash);
}
function _createMatcher(table, strictTrailingSlash) {
  return {
    ctx: { table },
    matchAll: (path) => _matchRoutes(path, table, strictTrailingSlash)
  };
}
function _createRouteTable() {
  return {
    static: /* @__PURE__ */ new Map(),
    wildcard: /* @__PURE__ */ new Map(),
    dynamic: /* @__PURE__ */ new Map()
  };
}
function _matchRoutes(path, table, strictTrailingSlash) {
  if (strictTrailingSlash !== true && path.endsWith("/")) {
    path = path.slice(0, -1) || "/";
  }
  const matches = [];
  for (const [key, value] of _sortRoutesMap(table.wildcard)) {
    if (path === key || path.startsWith(key + "/")) {
      matches.push(value);
    }
  }
  for (const [key, value] of _sortRoutesMap(table.dynamic)) {
    if (path.startsWith(key + "/")) {
      const subPath = "/" + path.slice(key.length).split("/").splice(2).join("/");
      matches.push(..._matchRoutes(subPath, value));
    }
  }
  const staticMatch = table.static.get(path);
  if (staticMatch) {
    matches.push(staticMatch);
  }
  return matches.filter(Boolean);
}
function _sortRoutesMap(m) {
  return [...m.entries()].sort((a, b) => a[0].length - b[0].length);
}
function _routerNodeToTable(initialPath, initialNode) {
  const table = _createRouteTable();
  function _addNode(path, node) {
    if (path) {
      if (node.type === NODE_TYPES.NORMAL && !(path.includes("*") || path.includes(":"))) {
        if (node.data) {
          table.static.set(path, node.data);
        }
      } else if (node.type === NODE_TYPES.WILDCARD) {
        table.wildcard.set(path.replace("/**", ""), node.data);
      } else if (node.type === NODE_TYPES.PLACEHOLDER) {
        const subTable = _routerNodeToTable("", node);
        if (node.data) {
          subTable.static.set("/", node.data);
        }
        table.dynamic.set(path.replace(/\/\*|\/:\w+/, ""), subTable);
        return;
      }
    }
    for (const [childPath, child] of node.children.entries()) {
      _addNode(`${path}/${childPath}`.replace("//", "/"), child);
    }
  }
  _addNode(initialPath, initialNode);
  return table;
}

const suspectProtoRx$2 = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx$2 = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx$2 = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform$2(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped$2(key);
    return;
  }
  return value;
}
function warnKeyDropped$2(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr$2(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  const _value = value.trim();
  if (
    // eslint-disable-next-line unicorn/prefer-at
    value[0] === '"' && value.endsWith('"') && !value.includes("\\")
  ) {
    return _value.slice(1, -1);
  }
  if (_value.length <= 9) {
    const _lval = _value.toLowerCase();
    if (_lval === "true") {
      return true;
    }
    if (_lval === "false") {
      return false;
    }
    if (_lval === "undefined") {
      return void 0;
    }
    if (_lval === "null") {
      return null;
    }
    if (_lval === "nan") {
      return Number.NaN;
    }
    if (_lval === "infinity") {
      return Number.POSITIVE_INFINITY;
    }
    if (_lval === "-infinity") {
      return Number.NEGATIVE_INFINITY;
    }
  }
  if (!JsonSigRx$2.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx$2.test(value) || suspectConstructorRx$2.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform$2);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

function isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}

function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject(value) && isPlainObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defu = createDefu();
const defuFn = createDefu((object, key, currentValue) => {
  if (object[key] !== void 0 && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});

function rawHeaders(headers) {
  const rawHeaders2 = [];
  for (const key in headers) {
    if (Array.isArray(headers[key])) {
      for (const h of headers[key]) {
        rawHeaders2.push(key, h);
      }
    } else {
      rawHeaders2.push(key, headers[key]);
    }
  }
  return rawHeaders2;
}
function mergeFns(...functions) {
  return function(...args) {
    for (const fn of functions) {
      fn(...args);
    }
  };
}
function createNotImplementedError(name) {
  throw new Error(`[unenv] ${name} is not implemented yet!`);
}

let defaultMaxListeners = 10;
let EventEmitter$1 = class EventEmitter {
  __unenv__ = true;
  _events = /* @__PURE__ */ Object.create(null);
  _maxListeners;
  static get defaultMaxListeners() {
    return defaultMaxListeners;
  }
  static set defaultMaxListeners(arg) {
    if (typeof arg !== "number" || arg < 0 || Number.isNaN(arg)) {
      throw new RangeError(
        'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + "."
      );
    }
    defaultMaxListeners = arg;
  }
  setMaxListeners(n) {
    if (typeof n !== "number" || n < 0 || Number.isNaN(n)) {
      throw new RangeError(
        'The value of "n" is out of range. It must be a non-negative number. Received ' + n + "."
      );
    }
    this._maxListeners = n;
    return this;
  }
  getMaxListeners() {
    return _getMaxListeners(this);
  }
  emit(type, ...args) {
    if (!this._events[type] || this._events[type].length === 0) {
      return false;
    }
    if (type === "error") {
      let er;
      if (args.length > 0) {
        er = args[0];
      }
      if (er instanceof Error) {
        throw er;
      }
      const err = new Error(
        "Unhandled error." + (er ? " (" + er.message + ")" : "")
      );
      err.context = er;
      throw err;
    }
    for (const _listener of this._events[type]) {
      (_listener.listener || _listener).apply(this, args);
    }
    return true;
  }
  addListener(type, listener) {
    return _addListener(this, type, listener, false);
  }
  on(type, listener) {
    return _addListener(this, type, listener, false);
  }
  prependListener(type, listener) {
    return _addListener(this, type, listener, true);
  }
  once(type, listener) {
    return this.on(type, _wrapOnce(this, type, listener));
  }
  prependOnceListener(type, listener) {
    return this.prependListener(type, _wrapOnce(this, type, listener));
  }
  removeListener(type, listener) {
    return _removeListener(this, type, listener);
  }
  off(type, listener) {
    return this.removeListener(type, listener);
  }
  removeAllListeners(type) {
    return _removeAllListeners(this, type);
  }
  listeners(type) {
    return _listeners(this, type, true);
  }
  rawListeners(type) {
    return _listeners(this, type, false);
  }
  listenerCount(type) {
    return this.rawListeners(type).length;
  }
  eventNames() {
    return Object.keys(this._events);
  }
};
function _addListener(target, type, listener, prepend) {
  _checkListener(listener);
  if (target._events.newListener !== void 0) {
    target.emit("newListener", type, listener.listener || listener);
  }
  if (!target._events[type]) {
    target._events[type] = [];
  }
  if (prepend) {
    target._events[type].unshift(listener);
  } else {
    target._events[type].push(listener);
  }
  const maxListeners = _getMaxListeners(target);
  if (maxListeners > 0 && target._events[type].length > maxListeners && !target._events[type].warned) {
    target._events[type].warned = true;
    const warning = new Error(
      `[unenv] Possible EventEmitter memory leak detected. ${target._events[type].length} ${type} listeners added. Use emitter.setMaxListeners() to increase limit`
    );
    warning.name = "MaxListenersExceededWarning";
    warning.emitter = target;
    warning.type = type;
    warning.count = target._events[type]?.length;
    console.warn(warning);
  }
  return target;
}
function _removeListener(target, type, listener) {
  _checkListener(listener);
  if (!target._events[type] || target._events[type].length === 0) {
    return target;
  }
  const lenBeforeFilter = target._events[type].length;
  target._events[type] = target._events[type].filter((fn) => fn !== listener);
  if (lenBeforeFilter === target._events[type].length) {
    return target;
  }
  if (target._events.removeListener) {
    target.emit("removeListener", type, listener.listener || listener);
  }
  if (target._events[type].length === 0) {
    delete target._events[type];
  }
  return target;
}
function _removeAllListeners(target, type) {
  if (!target._events[type] || target._events[type].length === 0) {
    return target;
  }
  if (target._events.removeListener) {
    for (const _listener of target._events[type]) {
      target.emit("removeListener", type, _listener.listener || _listener);
    }
  }
  delete target._events[type];
  return target;
}
function _wrapOnce(target, type, listener) {
  let fired = false;
  const wrapper = (...args) => {
    if (fired) {
      return;
    }
    target.removeListener(type, wrapper);
    fired = true;
    return args.length === 0 ? listener.call(target) : listener.apply(target, args);
  };
  wrapper.listener = listener;
  return wrapper;
}
function _getMaxListeners(target) {
  return target._maxListeners ?? EventEmitter$1.defaultMaxListeners;
}
function _listeners(target, type, unwrap) {
  let listeners = target._events[type];
  if (typeof listeners === "function") {
    listeners = [listeners];
  }
  return unwrap ? listeners.map((l) => l.listener || l) : listeners;
}
function _checkListener(listener) {
  if (typeof listener !== "function") {
    throw new TypeError(
      'The "listener" argument must be of type Function. Received type ' + typeof listener
    );
  }
}

const EventEmitter = globalThis.EventEmitter || EventEmitter$1;

class _Readable extends EventEmitter {
  __unenv__ = true;
  readableEncoding = null;
  readableEnded = true;
  readableFlowing = false;
  readableHighWaterMark = 0;
  readableLength = 0;
  readableObjectMode = false;
  readableAborted = false;
  readableDidRead = false;
  closed = false;
  errored = null;
  readable = false;
  destroyed = false;
  static from(_iterable, options) {
    return new _Readable(options);
  }
  constructor(_opts) {
    super();
  }
  _read(_size) {
  }
  read(_size) {
  }
  setEncoding(_encoding) {
    return this;
  }
  pause() {
    return this;
  }
  resume() {
    return this;
  }
  isPaused() {
    return true;
  }
  unpipe(_destination) {
    return this;
  }
  unshift(_chunk, _encoding) {
  }
  wrap(_oldStream) {
    return this;
  }
  push(_chunk, _encoding) {
    return false;
  }
  _destroy(_error, _callback) {
    this.removeAllListeners();
  }
  destroy(error) {
    this.destroyed = true;
    this._destroy(error);
    return this;
  }
  pipe(_destenition, _options) {
    return {};
  }
  compose(stream, options) {
    throw new Error("[unenv] Method not implemented.");
  }
  [Symbol.asyncDispose]() {
    this.destroy();
    return Promise.resolve();
  }
  async *[Symbol.asyncIterator]() {
    throw createNotImplementedError("Readable.asyncIterator");
  }
  iterator(options) {
    throw createNotImplementedError("Readable.iterator");
  }
  map(fn, options) {
    throw createNotImplementedError("Readable.map");
  }
  filter(fn, options) {
    throw createNotImplementedError("Readable.filter");
  }
  forEach(fn, options) {
    throw createNotImplementedError("Readable.forEach");
  }
  reduce(fn, initialValue, options) {
    throw createNotImplementedError("Readable.reduce");
  }
  find(fn, options) {
    throw createNotImplementedError("Readable.find");
  }
  findIndex(fn, options) {
    throw createNotImplementedError("Readable.findIndex");
  }
  some(fn, options) {
    throw createNotImplementedError("Readable.some");
  }
  toArray(options) {
    throw createNotImplementedError("Readable.toArray");
  }
  every(fn, options) {
    throw createNotImplementedError("Readable.every");
  }
  flatMap(fn, options) {
    throw createNotImplementedError("Readable.flatMap");
  }
  drop(limit, options) {
    throw createNotImplementedError("Readable.drop");
  }
  take(limit, options) {
    throw createNotImplementedError("Readable.take");
  }
  asIndexedPairs(options) {
    throw createNotImplementedError("Readable.asIndexedPairs");
  }
}
const Readable = globalThis.Readable || _Readable;

class _Writable extends EventEmitter {
  __unenv__ = true;
  writable = true;
  writableEnded = false;
  writableFinished = false;
  writableHighWaterMark = 0;
  writableLength = 0;
  writableObjectMode = false;
  writableCorked = 0;
  closed = false;
  errored = null;
  writableNeedDrain = false;
  destroyed = false;
  _data;
  _encoding = "utf-8";
  constructor(_opts) {
    super();
  }
  pipe(_destenition, _options) {
    return {};
  }
  _write(chunk, encoding, callback) {
    if (this.writableEnded) {
      if (callback) {
        callback();
      }
      return;
    }
    if (this._data === void 0) {
      this._data = chunk;
    } else {
      const a = typeof this._data === "string" ? Buffer.from(this._data, this._encoding || encoding || "utf8") : this._data;
      const b = typeof chunk === "string" ? Buffer.from(chunk, encoding || this._encoding || "utf8") : chunk;
      this._data = Buffer.concat([a, b]);
    }
    this._encoding = encoding;
    if (callback) {
      callback();
    }
  }
  _writev(_chunks, _callback) {
  }
  _destroy(_error, _callback) {
  }
  _final(_callback) {
  }
  write(chunk, arg2, arg3) {
    const encoding = typeof arg2 === "string" ? this._encoding : "utf-8";
    const cb = typeof arg2 === "function" ? arg2 : typeof arg3 === "function" ? arg3 : void 0;
    this._write(chunk, encoding, cb);
    return true;
  }
  setDefaultEncoding(_encoding) {
    return this;
  }
  end(arg1, arg2, arg3) {
    const callback = typeof arg1 === "function" ? arg1 : typeof arg2 === "function" ? arg2 : typeof arg3 === "function" ? arg3 : void 0;
    if (this.writableEnded) {
      if (callback) {
        callback();
      }
      return this;
    }
    const data = arg1 === callback ? void 0 : arg1;
    if (data) {
      const encoding = arg2 === callback ? void 0 : arg2;
      this.write(data, encoding, callback);
    }
    this.writableEnded = true;
    this.writableFinished = true;
    this.emit("close");
    this.emit("finish");
    return this;
  }
  cork() {
  }
  uncork() {
  }
  destroy(_error) {
    this.destroyed = true;
    delete this._data;
    this.removeAllListeners();
    return this;
  }
  compose(stream, options) {
    throw new Error("[h3] Method not implemented.");
  }
}
const Writable = globalThis.Writable || _Writable;

const __Duplex = class {
  allowHalfOpen = true;
  _destroy;
  constructor(readable = new Readable(), writable = new Writable()) {
    Object.assign(this, readable);
    Object.assign(this, writable);
    this._destroy = mergeFns(readable._destroy, writable._destroy);
  }
};
function getDuplex() {
  Object.assign(__Duplex.prototype, Readable.prototype);
  Object.assign(__Duplex.prototype, Writable.prototype);
  return __Duplex;
}
const _Duplex = /* @__PURE__ */ getDuplex();
const Duplex = globalThis.Duplex || _Duplex;

class Socket extends Duplex {
  __unenv__ = true;
  bufferSize = 0;
  bytesRead = 0;
  bytesWritten = 0;
  connecting = false;
  destroyed = false;
  pending = false;
  localAddress = "";
  localPort = 0;
  remoteAddress = "";
  remoteFamily = "";
  remotePort = 0;
  autoSelectFamilyAttemptedAddresses = [];
  readyState = "readOnly";
  constructor(_options) {
    super();
  }
  write(_buffer, _arg1, _arg2) {
    return false;
  }
  connect(_arg1, _arg2, _arg3) {
    return this;
  }
  end(_arg1, _arg2, _arg3) {
    return this;
  }
  setEncoding(_encoding) {
    return this;
  }
  pause() {
    return this;
  }
  resume() {
    return this;
  }
  setTimeout(_timeout, _callback) {
    return this;
  }
  setNoDelay(_noDelay) {
    return this;
  }
  setKeepAlive(_enable, _initialDelay) {
    return this;
  }
  address() {
    return {};
  }
  unref() {
    return this;
  }
  ref() {
    return this;
  }
  destroySoon() {
    this.destroy();
  }
  resetAndDestroy() {
    const err = new Error("ERR_SOCKET_CLOSED");
    err.code = "ERR_SOCKET_CLOSED";
    this.destroy(err);
    return this;
  }
}

class IncomingMessage extends Readable {
  __unenv__ = {};
  aborted = false;
  httpVersion = "1.1";
  httpVersionMajor = 1;
  httpVersionMinor = 1;
  complete = true;
  connection;
  socket;
  headers = {};
  trailers = {};
  method = "GET";
  url = "/";
  statusCode = 200;
  statusMessage = "";
  closed = false;
  errored = null;
  readable = false;
  constructor(socket) {
    super();
    this.socket = this.connection = socket || new Socket();
  }
  get rawHeaders() {
    return rawHeaders(this.headers);
  }
  get rawTrailers() {
    return [];
  }
  setTimeout(_msecs, _callback) {
    return this;
  }
  get headersDistinct() {
    return _distinct(this.headers);
  }
  get trailersDistinct() {
    return _distinct(this.trailers);
  }
}
function _distinct(obj) {
  const d = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key) {
      d[key] = (Array.isArray(value) ? value : [value]).filter(
        Boolean
      );
    }
  }
  return d;
}

class ServerResponse extends Writable {
  __unenv__ = true;
  statusCode = 200;
  statusMessage = "";
  upgrading = false;
  chunkedEncoding = false;
  shouldKeepAlive = false;
  useChunkedEncodingByDefault = false;
  sendDate = false;
  finished = false;
  headersSent = false;
  strictContentLength = false;
  connection = null;
  socket = null;
  req;
  _headers = {};
  constructor(req) {
    super();
    this.req = req;
  }
  assignSocket(socket) {
    socket._httpMessage = this;
    this.socket = socket;
    this.connection = socket;
    this.emit("socket", socket);
    this._flush();
  }
  _flush() {
    this.flushHeaders();
  }
  detachSocket(_socket) {
  }
  writeContinue(_callback) {
  }
  writeHead(statusCode, arg1, arg2) {
    if (statusCode) {
      this.statusCode = statusCode;
    }
    if (typeof arg1 === "string") {
      this.statusMessage = arg1;
      arg1 = void 0;
    }
    const headers = arg2 || arg1;
    if (headers) {
      if (Array.isArray(headers)) ; else {
        for (const key in headers) {
          this.setHeader(key, headers[key]);
        }
      }
    }
    this.headersSent = true;
    return this;
  }
  writeProcessing() {
  }
  setTimeout(_msecs, _callback) {
    return this;
  }
  appendHeader(name, value) {
    name = name.toLowerCase();
    const current = this._headers[name];
    const all = [
      ...Array.isArray(current) ? current : [current],
      ...Array.isArray(value) ? value : [value]
    ].filter(Boolean);
    this._headers[name] = all.length > 1 ? all : all[0];
    return this;
  }
  setHeader(name, value) {
    this._headers[name.toLowerCase()] = value;
    return this;
  }
  getHeader(name) {
    return this._headers[name.toLowerCase()];
  }
  getHeaders() {
    return this._headers;
  }
  getHeaderNames() {
    return Object.keys(this._headers);
  }
  hasHeader(name) {
    return name.toLowerCase() in this._headers;
  }
  removeHeader(name) {
    delete this._headers[name.toLowerCase()];
  }
  addTrailers(_headers) {
  }
  flushHeaders() {
  }
  writeEarlyHints(_headers, cb) {
    if (typeof cb === "function") {
      cb();
    }
  }
}

function hasProp(obj, prop) {
  try {
    return prop in obj;
  } catch {
    return false;
  }
}

var __defProp$2 = Object.defineProperty;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$2 = (obj, key, value) => {
  __defNormalProp$2(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class H3Error extends Error {
  constructor(message, opts = {}) {
    super(message, opts);
    __publicField$2(this, "statusCode", 500);
    __publicField$2(this, "fatal", false);
    __publicField$2(this, "unhandled", false);
    __publicField$2(this, "statusMessage");
    __publicField$2(this, "data");
    __publicField$2(this, "cause");
    if (opts.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
  toJSON() {
    const obj = {
      message: this.message,
      statusCode: sanitizeStatusCode(this.statusCode, 500)
    };
    if (this.statusMessage) {
      obj.statusMessage = sanitizeStatusMessage(this.statusMessage);
    }
    if (this.data !== void 0) {
      obj.data = this.data;
    }
    return obj;
  }
}
__publicField$2(H3Error, "__h3_error__", true);
function createError$1(input) {
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error(input.message ?? input.statusMessage ?? "", {
    cause: input.cause || input
  });
  if (hasProp(input, "stack")) {
    try {
      Object.defineProperty(err, "stack", {
        get() {
          return input.stack;
        }
      });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.statusCode) {
    err.statusCode = sanitizeStatusCode(input.statusCode, err.statusCode);
  } else if (input.status) {
    err.statusCode = sanitizeStatusCode(input.status, err.statusCode);
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  } else if (input.statusText) {
    err.statusMessage = input.statusText;
  }
  if (err.statusMessage) {
    const originalMessage = err.statusMessage;
    const sanitizedMessage = sanitizeStatusMessage(err.statusMessage);
    if (sanitizedMessage !== originalMessage) {
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default."
      );
    }
  }
  if (input.fatal !== void 0) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== void 0) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function sendError(event, error, debug) {
  if (event.handled) {
    return;
  }
  const h3Error = isError(error) ? error : createError$1(error);
  const responseBody = {
    statusCode: h3Error.statusCode,
    statusMessage: h3Error.statusMessage,
    stack: [],
    data: h3Error.data
  };
  if (debug) {
    responseBody.stack = (h3Error.stack || "").split("\n").map((l) => l.trim());
  }
  if (event.handled) {
    return;
  }
  const _code = Number.parseInt(h3Error.statusCode);
  setResponseStatus(event, _code, h3Error.statusMessage);
  event.node.res.setHeader("content-type", MIMES.json);
  event.node.res.end(JSON.stringify(responseBody, void 0, 2));
}
function isError(input) {
  return input?.constructor?.__h3_error__ === true;
}

function getQuery(event) {
  return getQuery$1(event.path || "");
}
function isMethod(event, expected, allowHead) {
  if (typeof expected === "string") {
    if (event.method === expected) {
      return true;
    }
  } else if (expected.includes(event.method)) {
    return true;
  }
  return false;
}
function assertMethod(event, expected, allowHead) {
  if (!isMethod(event, expected)) {
    throw createError$1({
      statusCode: 405,
      statusMessage: "HTTP method is not allowed."
    });
  }
}
function getRequestHeaders(event) {
  const _headers = {};
  for (const key in event.node.req.headers) {
    const val = event.node.req.headers[key];
    _headers[key] = Array.isArray(val) ? val.filter(Boolean).join(", ") : val;
  }
  return _headers;
}
function getRequestHeader(event, name) {
  const headers = getRequestHeaders(event);
  const value = headers[name.toLowerCase()];
  return value;
}

const RawBodySymbol = Symbol.for("h3RawBody");
const ParsedBodySymbol = Symbol.for("h3ParsedBody");
const PayloadMethods$1 = ["PATCH", "POST", "PUT", "DELETE"];
function readRawBody(event, encoding = "utf8") {
  assertMethod(event, PayloadMethods$1);
  const _rawBody = event._requestBody || event.web?.request?.body || event.node.req[RawBodySymbol] || event.node.req.rawBody || event.node.req.body;
  if (_rawBody) {
    const promise2 = Promise.resolve(_rawBody).then((_resolved) => {
      if (Buffer.isBuffer(_resolved)) {
        return _resolved;
      }
      if (typeof _resolved.pipeTo === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.pipeTo(
            new WritableStream({
              write(chunk) {
                chunks.push(chunk);
              },
              close() {
                resolve(Buffer.concat(chunks));
              },
              abort(reason) {
                reject(reason);
              }
            })
          ).catch(reject);
        });
      } else if (typeof _resolved.pipe === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.on("data", (chunk) => {
            chunks.push(chunk);
          }).on("end", () => {
            resolve(Buffer.concat(chunks));
          }).on("error", reject);
        });
      }
      if (_resolved.constructor === Object) {
        return Buffer.from(JSON.stringify(_resolved));
      }
      return Buffer.from(_resolved);
    });
    return encoding ? promise2.then((buff) => buff.toString(encoding)) : promise2;
  }
  if (!Number.parseInt(event.node.req.headers["content-length"] || "")) {
    return Promise.resolve(void 0);
  }
  const promise = event.node.req[RawBodySymbol] = new Promise(
    (resolve, reject) => {
      const bodyData = [];
      event.node.req.on("error", (err) => {
        reject(err);
      }).on("data", (chunk) => {
        bodyData.push(chunk);
      }).on("end", () => {
        resolve(Buffer.concat(bodyData));
      });
    }
  );
  const result = encoding ? promise.then((buff) => buff.toString(encoding)) : promise;
  return result;
}
async function readBody(event, options = {}) {
  const request = event.node.req;
  if (hasProp(request, ParsedBodySymbol)) {
    return request[ParsedBodySymbol];
  }
  const contentType = request.headers["content-type"] || "";
  const body = await readRawBody(event);
  let parsed;
  if (contentType === "application/json") {
    parsed = _parseJSON(body, options.strict ?? true);
  } else if (contentType.startsWith("application/x-www-form-urlencoded")) {
    parsed = _parseURLEncodedBody(body);
  } else if (contentType.startsWith("text/")) {
    parsed = body;
  } else {
    parsed = _parseJSON(body, options.strict ?? false);
  }
  request[ParsedBodySymbol] = parsed;
  return parsed;
}
function getRequestWebStream(event) {
  if (!PayloadMethods$1.includes(event.method)) {
    return;
  }
  const bodyStream = event.web?.request?.body || event._requestBody;
  if (bodyStream) {
    return bodyStream;
  }
  const _hasRawBody = RawBodySymbol in event.node.req || "rawBody" in event.node.req || "body" in event.node.req || "__unenv__" in event.node.req;
  if (_hasRawBody) {
    return new ReadableStream({
      async start(controller) {
        const _rawBody = await readRawBody(event, false);
        if (_rawBody) {
          controller.enqueue(_rawBody);
        }
        controller.close();
      }
    });
  }
  return new ReadableStream({
    start: (controller) => {
      event.node.req.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      event.node.req.on("end", () => {
        controller.close();
      });
      event.node.req.on("error", (err) => {
        controller.error(err);
      });
    }
  });
}
function _parseJSON(body = "", strict) {
  if (!body) {
    return void 0;
  }
  try {
    return destr$2(body, { strict });
  } catch {
    throw createError$1({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Invalid JSON body"
    });
  }
}
function _parseURLEncodedBody(body) {
  const form = new URLSearchParams(body);
  const parsedForm = /* @__PURE__ */ Object.create(null);
  for (const [key, value] of form.entries()) {
    if (hasProp(parsedForm, key)) {
      if (!Array.isArray(parsedForm[key])) {
        parsedForm[key] = [parsedForm[key]];
      }
      parsedForm[key].push(value);
    } else {
      parsedForm[key] = value;
    }
  }
  return parsedForm;
}

function handleCacheHeaders(event, opts) {
  const cacheControls = ["public", ...opts.cacheControls || []];
  let cacheMatched = false;
  if (opts.maxAge !== void 0) {
    cacheControls.push(`max-age=${+opts.maxAge}`, `s-maxage=${+opts.maxAge}`);
  }
  if (opts.modifiedTime) {
    const modifiedTime = new Date(opts.modifiedTime);
    const ifModifiedSince = event.node.req.headers["if-modified-since"];
    event.node.res.setHeader("last-modified", modifiedTime.toUTCString());
    if (ifModifiedSince && new Date(ifModifiedSince) >= opts.modifiedTime) {
      cacheMatched = true;
    }
  }
  if (opts.etag) {
    event.node.res.setHeader("etag", opts.etag);
    const ifNonMatch = event.node.req.headers["if-none-match"];
    if (ifNonMatch === opts.etag) {
      cacheMatched = true;
    }
  }
  event.node.res.setHeader("cache-control", cacheControls.join(", "));
  if (cacheMatched) {
    event.node.res.statusCode = 304;
    if (!event.handled) {
      event.node.res.end();
    }
    return true;
  }
  return false;
}

const MIMES = {
  html: "text/html",
  json: "application/json"
};

const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) {
    return defaultStatusCode;
  }
  if (typeof statusCode === "string") {
    statusCode = Number.parseInt(statusCode, 10);
  }
  if (statusCode < 100 || statusCode > 999) {
    return defaultStatusCode;
  }
  return statusCode;
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString.flatMap((c) => splitCookiesString(c));
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  const cookiesStrings = [];
  let pos = 0;
  let start;
  let ch;
  let lastComma;
  let nextStart;
  let cookiesSeparatorFound;
  const skipWhitespace = () => {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  };
  const notSpecialChar = () => {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  };
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.slice(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.slice(start, cookiesString.length));
    }
  }
  return cookiesStrings;
}

const defer = typeof setImmediate === "undefined" ? (fn) => fn() : setImmediate;
function send(event, data, type) {
  if (type) {
    defaultContentType(event, type);
  }
  return new Promise((resolve) => {
    defer(() => {
      if (!event.handled) {
        event.node.res.end(data);
      }
      resolve();
    });
  });
}
function sendNoContent(event, code) {
  if (event.handled) {
    return;
  }
  if (!code && event.node.res.statusCode !== 200) {
    code = event.node.res.statusCode;
  }
  const _code = sanitizeStatusCode(code, 204);
  if (_code === 204) {
    event.node.res.removeHeader("content-length");
  }
  event.node.res.writeHead(_code);
  event.node.res.end();
}
function setResponseStatus(event, code, text) {
  if (code) {
    event.node.res.statusCode = sanitizeStatusCode(
      code,
      event.node.res.statusCode
    );
  }
  if (text) {
    event.node.res.statusMessage = sanitizeStatusMessage(text);
  }
}
function getResponseStatus(event) {
  return event.node.res.statusCode;
}
function getResponseStatusText(event) {
  return event.node.res.statusMessage;
}
function defaultContentType(event, type) {
  if (type && event.node.res.statusCode !== 304 && !event.node.res.getHeader("content-type")) {
    event.node.res.setHeader("content-type", type);
  }
}
function sendRedirect(event, location, code = 302) {
  event.node.res.statusCode = sanitizeStatusCode(
    code,
    event.node.res.statusCode
  );
  event.node.res.setHeader("location", location);
  const encodedLoc = location.replace(/"/g, "%22");
  const html = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`;
  return send(event, html, MIMES.html);
}
function getResponseHeader(event, name) {
  return event.node.res.getHeader(name);
}
function setResponseHeaders(event, headers) {
  for (const [name, value] of Object.entries(headers)) {
    event.node.res.setHeader(name, value);
  }
}
const setHeaders = setResponseHeaders;
function setResponseHeader(event, name, value) {
  event.node.res.setHeader(name, value);
}
function removeResponseHeader(event, name) {
  return event.node.res.removeHeader(name);
}
function isStream(data) {
  if (!data || typeof data !== "object") {
    return false;
  }
  if (typeof data.pipe === "function") {
    if (typeof data._read === "function") {
      return true;
    }
    if (typeof data.abort === "function") {
      return true;
    }
  }
  if (typeof data.pipeTo === "function") {
    return true;
  }
  return false;
}
function isWebResponse(data) {
  return typeof Response !== "undefined" && data instanceof Response;
}
function sendStream(event, stream) {
  if (!stream || typeof stream !== "object") {
    throw new Error("[h3] Invalid stream provided.");
  }
  event.node.res._data = stream;
  if (!event.node.res.socket) {
    event._handled = true;
    return Promise.resolve();
  }
  if (hasProp(stream, "pipeTo") && typeof stream.pipeTo === "function") {
    return stream.pipeTo(
      new WritableStream({
        write(chunk) {
          event.node.res.write(chunk);
        }
      })
    ).then(() => {
      event.node.res.end();
    });
  }
  if (hasProp(stream, "pipe") && typeof stream.pipe === "function") {
    return new Promise((resolve, reject) => {
      stream.pipe(event.node.res);
      if (stream.on) {
        stream.on("end", () => {
          event.node.res.end();
          resolve();
        });
        stream.on("error", (error) => {
          reject(error);
        });
      }
      event.node.res.on("close", () => {
        if (stream.abort) {
          stream.abort();
        }
      });
    });
  }
  throw new Error("[h3] Invalid or incompatible stream provided.");
}
function sendWebResponse(event, response) {
  for (const [key, value] of response.headers) {
    if (key === "set-cookie") {
      event.node.res.appendHeader(key, splitCookiesString(value));
    } else {
      event.node.res.setHeader(key, value);
    }
  }
  if (response.status) {
    event.node.res.statusCode = sanitizeStatusCode(
      response.status,
      event.node.res.statusCode
    );
  }
  if (response.statusText) {
    event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  }
  if (response.redirected) {
    event.node.res.setHeader("location", response.url);
  }
  if (!response.body) {
    event.node.res.end();
    return;
  }
  return sendStream(event, response.body);
}

const PayloadMethods = /* @__PURE__ */ new Set(["PATCH", "POST", "PUT", "DELETE"]);
const ignoredHeaders = /* @__PURE__ */ new Set([
  "transfer-encoding",
  "connection",
  "keep-alive",
  "upgrade",
  "expect",
  "host",
  "accept"
]);
async function proxyRequest(event, target, opts = {}) {
  let body;
  let duplex;
  if (PayloadMethods.has(event.method)) {
    if (opts.streamRequest) {
      body = getRequestWebStream(event);
      duplex = "half";
    } else {
      body = await readRawBody(event, false).catch(() => void 0);
    }
  }
  const method = opts.fetchOptions?.method || event.method;
  const fetchHeaders = mergeHeaders(
    getProxyRequestHeaders(event),
    opts.fetchOptions?.headers,
    opts.headers
  );
  return sendProxy(event, target, {
    ...opts,
    fetchOptions: {
      method,
      body,
      duplex,
      ...opts.fetchOptions,
      headers: fetchHeaders
    }
  });
}
async function sendProxy(event, target, opts = {}) {
  const response = await _getFetch(opts.fetch)(target, {
    headers: opts.headers,
    ignoreResponseError: true,
    // make $ofetch.raw transparent
    ...opts.fetchOptions
  });
  event.node.res.statusCode = sanitizeStatusCode(
    response.status,
    event.node.res.statusCode
  );
  event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  const cookies = [];
  for (const [key, value] of response.headers.entries()) {
    if (key === "content-encoding") {
      continue;
    }
    if (key === "content-length") {
      continue;
    }
    if (key === "set-cookie") {
      cookies.push(...splitCookiesString(value));
      continue;
    }
    event.node.res.setHeader(key, value);
  }
  if (cookies.length > 0) {
    event.node.res.setHeader(
      "set-cookie",
      cookies.map((cookie) => {
        if (opts.cookieDomainRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookieDomainRewrite,
            "domain"
          );
        }
        if (opts.cookiePathRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookiePathRewrite,
            "path"
          );
        }
        return cookie;
      })
    );
  }
  if (opts.onResponse) {
    await opts.onResponse(event, response);
  }
  if (response._data !== void 0) {
    return response._data;
  }
  if (event.handled) {
    return;
  }
  if (opts.sendStream === false) {
    const data = new Uint8Array(await response.arrayBuffer());
    return event.node.res.end(data);
  }
  if (response.body) {
    for await (const chunk of response.body) {
      event.node.res.write(chunk);
    }
  }
  return event.node.res.end();
}
function getProxyRequestHeaders(event) {
  const headers = /* @__PURE__ */ Object.create(null);
  const reqHeaders = getRequestHeaders(event);
  for (const name in reqHeaders) {
    if (!ignoredHeaders.has(name)) {
      headers[name] = reqHeaders[name];
    }
  }
  return headers;
}
function fetchWithEvent(event, req, init, options) {
  return _getFetch(options?.fetch)(req, {
    ...init,
    context: init?.context || event.context,
    headers: {
      ...getProxyRequestHeaders(event),
      ...init?.headers
    }
  });
}
function _getFetch(_fetch) {
  if (_fetch) {
    return _fetch;
  }
  if (globalThis.fetch) {
    return globalThis.fetch;
  }
  throw new Error(
    "fetch is not available. Try importing `node-fetch-native/polyfill` for Node.js."
  );
}
function rewriteCookieProperty(header, map, property) {
  const _map = typeof map === "string" ? { "*": map } : map;
  return header.replace(
    new RegExp(`(;\\s*${property}=)([^;]+)`, "gi"),
    (match, prefix, previousValue) => {
      let newValue;
      if (previousValue in _map) {
        newValue = _map[previousValue];
      } else if ("*" in _map) {
        newValue = _map["*"];
      } else {
        return match;
      }
      return newValue ? prefix + newValue : "";
    }
  );
}
function mergeHeaders(defaults, ...inputs) {
  const _inputs = inputs.filter(Boolean);
  if (_inputs.length === 0) {
    return defaults;
  }
  const merged = new Headers(defaults);
  for (const input of _inputs) {
    for (const [key, value] of Object.entries(input)) {
      if (value !== void 0) {
        merged.set(key, value);
      }
    }
  }
  return merged;
}

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class H3Event {
  constructor(req, res) {
    __publicField(this, "__is_event__", true);
    // Context
    __publicField(this, "node");
    // Node
    __publicField(this, "web");
    // Web
    __publicField(this, "context", {});
    // Shared
    // Request
    __publicField(this, "_method");
    __publicField(this, "_path");
    __publicField(this, "_headers");
    __publicField(this, "_requestBody");
    // Response
    __publicField(this, "_handled", false);
    this.node = { req, res };
  }
  // --- Request ---
  get method() {
    if (!this._method) {
      this._method = (this.node.req.method || "GET").toUpperCase();
    }
    return this._method;
  }
  get path() {
    return this._path || this.node.req.url || "/";
  }
  get headers() {
    if (!this._headers) {
      this._headers = _normalizeNodeHeaders(this.node.req.headers);
    }
    return this._headers;
  }
  // --- Respoonse ---
  get handled() {
    return this._handled || this.node.res.writableEnded || this.node.res.headersSent;
  }
  respondWith(response) {
    return Promise.resolve(response).then(
      (_response) => sendWebResponse(this, _response)
    );
  }
  // --- Utils ---
  toString() {
    return `[${this.method}] ${this.path}`;
  }
  toJSON() {
    return this.toString();
  }
  // --- Deprecated ---
  /** @deprecated Please use `event.node.req` instead. **/
  get req() {
    return this.node.req;
  }
  /** @deprecated Please use `event.node.res` instead. **/
  get res() {
    return this.node.res;
  }
}
function isEvent(input) {
  return hasProp(input, "__is_event__");
}
function createEvent(req, res) {
  return new H3Event(req, res);
}
function _normalizeNodeHeaders(nodeHeaders) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(nodeHeaders)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(name, item);
      }
    } else if (value) {
      headers.set(name, value);
    }
  }
  return headers;
}

function defineEventHandler(handler) {
  if (typeof handler === "function") {
    handler.__is_handler__ = true;
    return handler;
  }
  const _hooks = {
    onRequest: _normalizeArray(handler.onRequest),
    onBeforeResponse: _normalizeArray(handler.onBeforeResponse)
  };
  const _handler = (event) => {
    return _callHandler(event, handler.handler, _hooks);
  };
  _handler.__is_handler__ = true;
  _handler.__resolve__ = handler.handler.__resolve__;
  _handler.__websocket__ = handler.websocket;
  return _handler;
}
function _normalizeArray(input) {
  return input ? Array.isArray(input) ? input : [input] : void 0;
}
async function _callHandler(event, handler, hooks) {
  if (hooks.onRequest) {
    for (const hook of hooks.onRequest) {
      await hook(event);
      if (event.handled) {
        return;
      }
    }
  }
  const body = await handler(event);
  const response = { body };
  if (hooks.onBeforeResponse) {
    for (const hook of hooks.onBeforeResponse) {
      await hook(event, response);
    }
  }
  return response.body;
}
const eventHandler = defineEventHandler;
function isEventHandler(input) {
  return hasProp(input, "__is_handler__");
}
function toEventHandler(input, _, _route) {
  if (!isEventHandler(input)) {
    console.warn(
      "[h3] Implicit event handler conversion is deprecated. Use `eventHandler()` or `fromNodeMiddleware()` to define event handlers.",
      _route && _route !== "/" ? `
     Route: ${_route}` : "",
      `
     Handler: ${input}`
    );
  }
  return input;
}
function defineLazyEventHandler(factory) {
  let _promise;
  let _resolved;
  const resolveHandler = () => {
    if (_resolved) {
      return Promise.resolve(_resolved);
    }
    if (!_promise) {
      _promise = Promise.resolve(factory()).then((r) => {
        const handler2 = r.default || r;
        if (typeof handler2 !== "function") {
          throw new TypeError(
            "Invalid lazy handler result. It should be a function:",
            handler2
          );
        }
        _resolved = { handler: toEventHandler(r.default || r) };
        return _resolved;
      });
    }
    return _promise;
  };
  const handler = eventHandler((event) => {
    if (_resolved) {
      return _resolved.handler(event);
    }
    return resolveHandler().then((r) => r.handler(event));
  });
  handler.__resolve__ = resolveHandler;
  return handler;
}
const lazyEventHandler = defineLazyEventHandler;

function createApp(options = {}) {
  const stack = [];
  const handler = createAppEventHandler(stack, options);
  const resolve = createResolver(stack);
  handler.__resolve__ = resolve;
  const getWebsocket = cachedFn(() => websocketOptions(resolve, options));
  const app = {
    // @ts-expect-error
    use: (arg1, arg2, arg3) => use(app, arg1, arg2, arg3),
    resolve,
    handler,
    stack,
    options,
    get websocket() {
      return getWebsocket();
    }
  };
  return app;
}
function use(app, arg1, arg2, arg3) {
  if (Array.isArray(arg1)) {
    for (const i of arg1) {
      use(app, i, arg2, arg3);
    }
  } else if (Array.isArray(arg2)) {
    for (const i of arg2) {
      use(app, arg1, i, arg3);
    }
  } else if (typeof arg1 === "string") {
    app.stack.push(
      normalizeLayer({ ...arg3, route: arg1, handler: arg2 })
    );
  } else if (typeof arg1 === "function") {
    app.stack.push(normalizeLayer({ ...arg2, handler: arg1 }));
  } else {
    app.stack.push(normalizeLayer({ ...arg1 }));
  }
  return app;
}
function createAppEventHandler(stack, options) {
  const spacing = options.debug ? 2 : void 0;
  return eventHandler(async (event) => {
    event.node.req.originalUrl = event.node.req.originalUrl || event.node.req.url || "/";
    const _reqPath = event._path || event.node.req.url || "/";
    let _layerPath;
    if (options.onRequest) {
      await options.onRequest(event);
    }
    for (const layer of stack) {
      if (layer.route.length > 1) {
        if (!_reqPath.startsWith(layer.route)) {
          continue;
        }
        _layerPath = _reqPath.slice(layer.route.length) || "/";
      } else {
        _layerPath = _reqPath;
      }
      if (layer.match && !layer.match(_layerPath, event)) {
        continue;
      }
      event._path = _layerPath;
      event.node.req.url = _layerPath;
      const val = await layer.handler(event);
      const _body = val === void 0 ? void 0 : await val;
      if (_body !== void 0) {
        const _response = { body: _body };
        if (options.onBeforeResponse) {
          await options.onBeforeResponse(event, _response);
        }
        await handleHandlerResponse(event, _response.body, spacing);
        if (options.onAfterResponse) {
          await options.onAfterResponse(event, _response);
        }
        return;
      }
      if (event.handled) {
        if (options.onAfterResponse) {
          await options.onAfterResponse(event, void 0);
        }
        return;
      }
    }
    if (!event.handled) {
      throw createError$1({
        statusCode: 404,
        statusMessage: `Cannot find any path matching ${event.path || "/"}.`
      });
    }
    if (options.onAfterResponse) {
      await options.onAfterResponse(event, void 0);
    }
  });
}
function createResolver(stack) {
  return async (path) => {
    let _layerPath;
    for (const layer of stack) {
      if (layer.route === "/" && !layer.handler.__resolve__) {
        continue;
      }
      if (!path.startsWith(layer.route)) {
        continue;
      }
      _layerPath = path.slice(layer.route.length) || "/";
      if (layer.match && !layer.match(_layerPath, void 0)) {
        continue;
      }
      let res = { route: layer.route, handler: layer.handler };
      if (res.handler.__resolve__) {
        const _res = await res.handler.__resolve__(_layerPath);
        if (!_res) {
          continue;
        }
        res = {
          ...res,
          ..._res,
          route: joinURL(res.route || "/", _res.route || "/")
        };
      }
      return res;
    }
  };
}
function normalizeLayer(input) {
  let handler = input.handler;
  if (handler.handler) {
    handler = handler.handler;
  }
  if (input.lazy) {
    handler = lazyEventHandler(handler);
  } else if (!isEventHandler(handler)) {
    handler = toEventHandler(handler, void 0, input.route);
  }
  return {
    route: withoutTrailingSlash(input.route),
    match: input.match,
    handler
  };
}
function handleHandlerResponse(event, val, jsonSpace) {
  if (val === null) {
    return sendNoContent(event);
  }
  if (val) {
    if (isWebResponse(val)) {
      return sendWebResponse(event, val);
    }
    if (isStream(val)) {
      return sendStream(event, val);
    }
    if (val.buffer) {
      return send(event, val);
    }
    if (val.arrayBuffer && typeof val.arrayBuffer === "function") {
      return val.arrayBuffer().then((arrayBuffer) => {
        return send(event, Buffer.from(arrayBuffer), val.type);
      });
    }
    if (val instanceof Error) {
      throw createError$1(val);
    }
    if (typeof val.end === "function") {
      return true;
    }
  }
  const valType = typeof val;
  if (valType === "string") {
    return send(event, val, MIMES.html);
  }
  if (valType === "object" || valType === "boolean" || valType === "number") {
    return send(event, JSON.stringify(val, void 0, jsonSpace), MIMES.json);
  }
  if (valType === "bigint") {
    return send(event, val.toString(), MIMES.json);
  }
  throw createError$1({
    statusCode: 500,
    statusMessage: `[h3] Cannot send ${valType} as response.`
  });
}
function cachedFn(fn) {
  let cache;
  return () => {
    if (!cache) {
      cache = fn();
    }
    return cache;
  };
}
function websocketOptions(evResolver, appOptions) {
  return {
    ...appOptions.websocket,
    async resolve(info) {
      const { pathname } = parseURL(info.url || "/");
      const resolved = await evResolver(pathname);
      return resolved?.handler?.__websocket__ || {};
    }
  };
}

const RouterMethods = [
  "connect",
  "delete",
  "get",
  "head",
  "options",
  "post",
  "put",
  "trace",
  "patch"
];
function createRouter(opts = {}) {
  const _router = createRouter$1({});
  const routes = {};
  let _matcher;
  const router = {};
  const addRoute = (path, handler, method) => {
    let route = routes[path];
    if (!route) {
      routes[path] = route = { path, handlers: {} };
      _router.insert(path, route);
    }
    if (Array.isArray(method)) {
      for (const m of method) {
        addRoute(path, handler, m);
      }
    } else {
      route.handlers[method] = toEventHandler(handler, void 0, path);
    }
    return router;
  };
  router.use = router.add = (path, handler, method) => addRoute(path, handler, method || "all");
  for (const method of RouterMethods) {
    router[method] = (path, handle) => router.add(path, handle, method);
  }
  const matchHandler = (path = "/", method = "get") => {
    const qIndex = path.indexOf("?");
    if (qIndex !== -1) {
      path = path.slice(0, Math.max(0, qIndex));
    }
    const matched = _router.lookup(path);
    if (!matched || !matched.handlers) {
      return {
        error: createError$1({
          statusCode: 404,
          name: "Not Found",
          statusMessage: `Cannot find any route matching ${path || "/"}.`
        })
      };
    }
    let handler = matched.handlers[method] || matched.handlers.all;
    if (!handler) {
      if (!_matcher) {
        _matcher = toRouteMatcher(_router);
      }
      const _matches = _matcher.matchAll(path).reverse();
      for (const _match of _matches) {
        if (_match.handlers[method]) {
          handler = _match.handlers[method];
          matched.handlers[method] = matched.handlers[method] || handler;
          break;
        }
        if (_match.handlers.all) {
          handler = _match.handlers.all;
          matched.handlers.all = matched.handlers.all || handler;
          break;
        }
      }
    }
    if (!handler) {
      return {
        error: createError$1({
          statusCode: 405,
          name: "Method Not Allowed",
          statusMessage: `Method ${method} is not allowed on this route.`
        })
      };
    }
    return { matched, handler };
  };
  const isPreemptive = opts.preemptive || opts.preemtive;
  router.handler = eventHandler((event) => {
    const match = matchHandler(
      event.path,
      event.method.toLowerCase()
    );
    if ("error" in match) {
      if (isPreemptive) {
        throw match.error;
      } else {
        return;
      }
    }
    event.context.matchedRoute = match.matched;
    const params = match.matched.params || {};
    event.context.params = params;
    return Promise.resolve(match.handler(event)).then((res) => {
      if (res === void 0 && isPreemptive) {
        return null;
      }
      return res;
    });
  });
  router.handler.__resolve__ = async (path) => {
    path = withLeadingSlash(path);
    const match = matchHandler(path);
    if ("error" in match) {
      return;
    }
    let res = {
      route: match.matched.path,
      handler: match.handler
    };
    if (match.handler.__resolve__) {
      const _res = await match.handler.__resolve__(path);
      if (!_res) {
        return;
      }
      res = { ...res, ..._res };
    }
    return res;
  };
  return router;
}
function toNodeListener(app) {
  const toNodeHandle = async function(req, res) {
    const event = createEvent(req, res);
    try {
      await app.handler(event);
    } catch (_error) {
      const error = createError$1(_error);
      if (!isError(_error)) {
        error.unhandled = true;
      }
      if (app.options.onError) {
        await app.options.onError(error, event);
      }
      if (event.handled) {
        return;
      }
      if (error.unhandled || error.fatal) {
        console.error("[h3]", error.fatal ? "[fatal]" : "[unhandled]", error);
      }
      await sendError(event, error, !!app.options.debug);
    }
  };
  return toNodeHandle;
}

const s=globalThis.Headers,i=globalThis.AbortController,l=globalThis.fetch||(()=>{throw new Error("[node-fetch-native] Failed to fetch: `globalThis.fetch` is not available!")});

const suspectProtoRx$1 = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx$1 = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx$1 = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform$1(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped$1(key);
    return;
  }
  return value;
}
function warnKeyDropped$1(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr$1(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  const _value = value.trim();
  if (
    // eslint-disable-next-line unicorn/prefer-at
    value[0] === '"' && value.endsWith('"') && !value.includes("\\")
  ) {
    return _value.slice(1, -1);
  }
  if (_value.length <= 9) {
    const _lval = _value.toLowerCase();
    if (_lval === "true") {
      return true;
    }
    if (_lval === "false") {
      return false;
    }
    if (_lval === "undefined") {
      return void 0;
    }
    if (_lval === "null") {
      return null;
    }
    if (_lval === "nan") {
      return Number.NaN;
    }
    if (_lval === "infinity") {
      return Number.POSITIVE_INFINITY;
    }
    if (_lval === "-infinity") {
      return Number.NEGATIVE_INFINITY;
    }
  }
  if (!JsonSigRx$1.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx$1.test(value) || suspectConstructorRx$1.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform$1);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

class FetchError extends Error {
  constructor(message, opts) {
    super(message, opts);
    this.name = "FetchError";
    if (opts?.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
}
function createFetchError(ctx) {
  const errorMessage = ctx.error?.message || ctx.error?.toString() || "";
  const method = ctx.request?.method || ctx.options?.method || "GET";
  const url = ctx.request?.url || String(ctx.request) || "/";
  const requestStr = `[${method}] ${JSON.stringify(url)}`;
  const statusStr = ctx.response ? `${ctx.response.status} ${ctx.response.statusText}` : "<no response>";
  const message = `${requestStr}: ${statusStr}${errorMessage ? ` ${errorMessage}` : ""}`;
  const fetchError = new FetchError(
    message,
    ctx.error ? { cause: ctx.error } : void 0
  );
  for (const key of ["request", "options", "response"]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx[key];
      }
    });
  }
  for (const [key, refKey] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx.response && ctx.response[refKey];
      }
    });
  }
  return fetchError;
}

const payloadMethods = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
  if (value === void 0) {
    return false;
  }
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return true;
  }
  if (value.buffer) {
    return false;
  }
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
function mergeFetchOptions(input, defaults, Headers = globalThis.Headers) {
  const merged = {
    ...defaults,
    ...input
  };
  if (defaults?.params && input?.params) {
    merged.params = {
      ...defaults?.params,
      ...input?.params
    };
  }
  if (defaults?.query && input?.query) {
    merged.query = {
      ...defaults?.query,
      ...input?.query
    };
  }
  if (defaults?.headers && input?.headers) {
    merged.headers = new Headers(defaults?.headers || {});
    for (const [key, value] of new Headers(input?.headers || {})) {
      merged.headers.set(key, value);
    }
  }
  return merged;
}

const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  // Request Timeout
  409,
  // Conflict
  425,
  // Too Early
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  //  Gateway Timeout
]);
const nullBodyResponses$1 = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createFetch$1(globalOptions = {}) {
  const {
    fetch = globalThis.fetch,
    Headers = globalThis.Headers,
    AbortController = globalThis.AbortController
  } = globalOptions;
  async function onError(context) {
    const isAbort = context.error && context.error.name === "AbortError" && !context.options.timeout || false;
    if (context.options.retry !== false && !isAbort) {
      let retries;
      if (typeof context.options.retry === "number") {
        retries = context.options.retry;
      } else {
        retries = isPayloadMethod(context.options.method) ? 0 : 1;
      }
      const responseCode = context.response && context.response.status || 500;
      if (retries > 0 && (Array.isArray(context.options.retryStatusCodes) ? context.options.retryStatusCodes.includes(responseCode) : retryStatusCodes.has(responseCode))) {
        const retryDelay = context.options.retryDelay || 0;
        if (retryDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
        return $fetchRaw(context.request, {
          ...context.options,
          retry: retries - 1
        });
      }
    }
    const error = createFetchError(context);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, $fetchRaw);
    }
    throw error;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
    const context = {
      request: _request,
      options: mergeFetchOptions(_options, globalOptions.defaults, Headers),
      response: void 0,
      error: void 0
    };
    context.options.method = context.options.method?.toUpperCase();
    if (context.options.onRequest) {
      await context.options.onRequest(context);
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query || context.options.params) {
        context.request = withQuery(context.request, {
          ...context.options.params,
          ...context.options.query
        });
      }
    }
    if (context.options.body && isPayloadMethod(context.options.method)) {
      if (isJSONSerializable(context.options.body)) {
        context.options.body = typeof context.options.body === "string" ? context.options.body : JSON.stringify(context.options.body);
        context.options.headers = new Headers(context.options.headers || {});
        if (!context.options.headers.has("content-type")) {
          context.options.headers.set("content-type", "application/json");
        }
        if (!context.options.headers.has("accept")) {
          context.options.headers.set("accept", "application/json");
        }
      } else if (
        // ReadableStream Body
        "pipeTo" in context.options.body && typeof context.options.body.pipeTo === "function" || // Node.js Stream Body
        typeof context.options.body.pipe === "function"
      ) {
        if (!("duplex" in context.options)) {
          context.options.duplex = "half";
        }
      }
    }
    let abortTimeout;
    if (!context.options.signal && context.options.timeout) {
      const controller = new AbortController();
      abortTimeout = setTimeout(
        () => controller.abort(),
        context.options.timeout
      );
      context.options.signal = controller.signal;
    }
    try {
      context.response = await fetch(
        context.request,
        context.options
      );
    } catch (error) {
      context.error = error;
      if (context.options.onRequestError) {
        await context.options.onRequestError(context);
      }
      return await onError(context);
    } finally {
      if (abortTimeout) {
        clearTimeout(abortTimeout);
      }
    }
    const hasBody = context.response.body && !nullBodyResponses$1.has(context.response.status) && context.options.method !== "HEAD";
    if (hasBody) {
      const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
      switch (responseType) {
        case "json": {
          const data = await context.response.text();
          const parseFunction = context.options.parseResponse || destr$1;
          context.response._data = parseFunction(data);
          break;
        }
        case "stream": {
          context.response._data = context.response.body;
          break;
        }
        default: {
          context.response._data = await context.response[responseType]();
        }
      }
    }
    if (context.options.onResponse) {
      await context.options.onResponse(context);
    }
    if (!context.options.ignoreResponseError && context.response.status >= 400 && context.response.status < 600) {
      if (context.options.onResponseError) {
        await context.options.onResponseError(context);
      }
      return await onError(context);
    }
    return context.response;
  };
  const $fetch = async function $fetch2(request, options) {
    const r = await $fetchRaw(request, options);
    return r._data;
  };
  $fetch.raw = $fetchRaw;
  $fetch.native = (...args) => fetch(...args);
  $fetch.create = (defaultOptions = {}) => createFetch$1({
    ...globalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch;
}

function createNodeFetch() {
  const useKeepAlive = JSON.parse(process.env.FETCH_KEEP_ALIVE || "false");
  if (!useKeepAlive) {
    return l;
  }
  const agentOptions = { keepAlive: true };
  const httpAgent = new http.Agent(agentOptions);
  const httpsAgent = new https.Agent(agentOptions);
  const nodeFetchOptions = {
    agent(parsedURL) {
      return parsedURL.protocol === "http:" ? httpAgent : httpsAgent;
    }
  };
  return function nodeFetchWithKeepAlive(input, init) {
    return l(input, { ...nodeFetchOptions, ...init });
  };
}
const fetch = globalThis.fetch || createNodeFetch();
const Headers$1 = globalThis.Headers || s;
const AbortController = globalThis.AbortController || i;
const ofetch = createFetch$1({ fetch, Headers: Headers$1, AbortController });
const $fetch = ofetch;

const nullBodyResponses = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createCall(handle) {
  return function callHandle(context) {
    const req = new IncomingMessage();
    const res = new ServerResponse(req);
    req.url = context.url || "/";
    req.method = context.method || "GET";
    req.headers = {};
    if (context.headers) {
      const headerEntries = typeof context.headers.entries === "function" ? context.headers.entries() : Object.entries(context.headers);
      for (const [name, value] of headerEntries) {
        if (!value) {
          continue;
        }
        req.headers[name.toLowerCase()] = value;
      }
    }
    req.headers.host = req.headers.host || context.host || "localhost";
    req.connection.encrypted = // @ts-ignore
    req.connection.encrypted || context.protocol === "https";
    req.body = context.body || null;
    req.__unenv__ = context.context;
    return handle(req, res).then(() => {
      let body = res._data;
      if (nullBodyResponses.has(res.statusCode) || req.method.toUpperCase() === "HEAD") {
        body = null;
        delete res._headers["content-length"];
      }
      const r = {
        body,
        headers: res._headers,
        status: res.statusCode,
        statusText: res.statusMessage
      };
      req.destroy();
      res.destroy();
      return r;
    });
  };
}

function createFetch(call, _fetch = global.fetch) {
  return async function ufetch(input, init) {
    const url = input.toString();
    if (!url.startsWith("/")) {
      return _fetch(url, init);
    }
    try {
      const r = await call({ url, ...init });
      return new Response(r.body, {
        status: r.status,
        statusText: r.statusText,
        headers: Object.fromEntries(
          Object.entries(r.headers).map(([name, value]) => [
            name,
            Array.isArray(value) ? value.join(",") : String(value) || ""
          ])
        )
      });
    } catch (error) {
      return new Response(error.toString(), {
        status: Number.parseInt(error.statusCode || error.code) || 500,
        statusText: error.statusText
      });
    }
  };
}

function flatHooks(configHooks, hooks = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks(subHook, hooks, name);
    } else if (typeof subHook === "function") {
      hooks[name] = subHook;
    }
  }
  return hooks;
}
const defaultTask = { run: (function_) => function_() };
const _createTask = () => defaultTask;
const createTask = typeof console.createTask !== "undefined" ? console.createTask : _createTask;
function serialTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return hooks.reduce(
    (promise, hookFunction) => promise.then(() => task.run(() => hookFunction(...args))),
    Promise.resolve()
  );
}
function parallelTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
}
function callEachWith(callbacks, arg0) {
  for (const callback of [...callbacks]) {
    callback(arg0);
  }
}

class Hookable {
  constructor() {
    this._hooks = {};
    this._before = void 0;
    this._after = void 0;
    this._deprecatedMessages = void 0;
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, function_, options = {}) {
    if (!name || typeof function_ !== "function") {
      return () => {
      };
    }
    const originalName = name;
    let dep;
    while (this._deprecatedHooks[name]) {
      dep = this._deprecatedHooks[name];
      name = dep.to;
    }
    if (dep && !options.allowDeprecated) {
      let message = dep.message;
      if (!message) {
        message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
      }
      if (!this._deprecatedMessages) {
        this._deprecatedMessages = /* @__PURE__ */ new Set();
      }
      if (!this._deprecatedMessages.has(message)) {
        console.warn(message);
        this._deprecatedMessages.add(message);
      }
    }
    if (!function_.name) {
      try {
        Object.defineProperty(function_, "name", {
          get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
          configurable: true
        });
      } catch {
      }
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(function_);
    return () => {
      if (function_) {
        this.removeHook(name, function_);
        function_ = void 0;
      }
    };
  }
  hookOnce(name, function_) {
    let _unreg;
    let _function = (...arguments_) => {
      if (typeof _unreg === "function") {
        _unreg();
      }
      _unreg = void 0;
      _function = void 0;
      return function_(...arguments_);
    };
    _unreg = this.hook(name, _function);
    return _unreg;
  }
  removeHook(name, function_) {
    if (this._hooks[name]) {
      const index = this._hooks[name].indexOf(function_);
      if (index !== -1) {
        this._hooks[name].splice(index, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
    const _hooks = this._hooks[name] || [];
    delete this._hooks[name];
    for (const hook of _hooks) {
      this.hook(name, hook);
    }
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
    for (const name in deprecatedHooks) {
      this.deprecateHook(name, deprecatedHooks[name]);
    }
  }
  addHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    const removeFns = Object.keys(hooks).map(
      (key) => this.hook(key, hooks[key])
    );
    return () => {
      for (const unreg of removeFns.splice(0, removeFns.length)) {
        unreg();
      }
    };
  }
  removeHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    for (const key in hooks) {
      this.removeHook(key, hooks[key]);
    }
  }
  removeAllHooks() {
    for (const key in this._hooks) {
      delete this._hooks[key];
    }
  }
  callHook(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(serialTaskCaller, name, ...arguments_);
  }
  callHookParallel(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(parallelTaskCaller, name, ...arguments_);
  }
  callHookWith(caller, name, ...arguments_) {
    const event = this._before || this._after ? { name, args: arguments_, context: {} } : void 0;
    if (this._before) {
      callEachWith(this._before, event);
    }
    const result = caller(
      name in this._hooks ? [...this._hooks[name]] : [],
      arguments_
    );
    if (result instanceof Promise) {
      return result.finally(() => {
        if (this._after && event) {
          callEachWith(this._after, event);
        }
      });
    }
    if (this._after && event) {
      callEachWith(this._after, event);
    }
    return result;
  }
  beforeEach(function_) {
    this._before = this._before || [];
    this._before.push(function_);
    return () => {
      if (this._before !== void 0) {
        const index = this._before.indexOf(function_);
        if (index !== -1) {
          this._before.splice(index, 1);
        }
      }
    };
  }
  afterEach(function_) {
    this._after = this._after || [];
    this._after.push(function_);
    return () => {
      if (this._after !== void 0) {
        const index = this._after.indexOf(function_);
        if (index !== -1) {
          this._after.splice(index, 1);
        }
      }
    };
  }
}
function createHooks() {
  return new Hookable();
}

function klona(x) {
	if (typeof x !== 'object') return x;

	var k, tmp, str=Object.prototype.toString.call(x);

	if (str === '[object Object]') {
		if (x.constructor !== Object && typeof x.constructor === 'function') {
			tmp = new x.constructor();
			for (k in x) {
				if (x.hasOwnProperty(k) && tmp[k] !== x[k]) {
					tmp[k] = klona(x[k]);
				}
			}
		} else {
			tmp = {}; // null
			for (k in x) {
				if (k === '__proto__') {
					Object.defineProperty(tmp, k, {
						value: klona(x[k]),
						configurable: true,
						enumerable: true,
						writable: true,
					});
				} else {
					tmp[k] = klona(x[k]);
				}
			}
		}
		return tmp;
	}

	if (str === '[object Array]') {
		k = x.length;
		for (tmp=Array(k); k--;) {
			tmp[k] = klona(x[k]);
		}
		return tmp;
	}

	if (str === '[object Set]') {
		tmp = new Set;
		x.forEach(function (val) {
			tmp.add(klona(val));
		});
		return tmp;
	}

	if (str === '[object Map]') {
		tmp = new Map;
		x.forEach(function (val, key) {
			tmp.set(klona(key), klona(val));
		});
		return tmp;
	}

	if (str === '[object Date]') {
		return new Date(+x);
	}

	if (str === '[object RegExp]') {
		tmp = new RegExp(x.source, x.flags);
		tmp.lastIndex = x.lastIndex;
		return tmp;
	}

	if (str === '[object DataView]') {
		return new x.constructor( klona(x.buffer) );
	}

	if (str === '[object ArrayBuffer]') {
		return x.slice(0);
	}

	// ArrayBuffer.isView(x)
	// ~> `new` bcuz `Buffer.slice` => ref
	if (str.slice(-6) === 'Array]') {
		return new x.constructor(x);
	}

	return x;
}

const NUMBER_CHAR_RE = /\d/;
const STR_SPLITTERS = ["-", "_", "/", "."];
function isUppercase(char = "") {
  if (NUMBER_CHAR_RE.test(char)) {
    return void 0;
  }
  return char !== char.toLowerCase();
}
function splitByCase(str, separators) {
  const splitters = STR_SPLITTERS;
  const parts = [];
  if (!str || typeof str !== "string") {
    return parts;
  }
  let buff = "";
  let previousUpper;
  let previousSplitter;
  for (const char of str) {
    const isSplitter = splitters.includes(char);
    if (isSplitter === true) {
      parts.push(buff);
      buff = "";
      previousUpper = void 0;
      continue;
    }
    const isUpper = isUppercase(char);
    if (previousSplitter === false) {
      if (previousUpper === false && isUpper === true) {
        parts.push(buff);
        buff = char;
        previousUpper = isUpper;
        continue;
      }
      if (previousUpper === true && isUpper === false && buff.length > 1) {
        const lastChar = buff.at(-1);
        parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
        buff = lastChar + char;
        previousUpper = isUpper;
        continue;
      }
    }
    buff += char;
    previousUpper = isUpper;
    previousSplitter = isSplitter;
  }
  parts.push(buff);
  return parts;
}
function kebabCase(str, joiner) {
  return str ? (Array.isArray(str) ? str : splitByCase(str)).map((p) => p.toLowerCase()).join(joiner ) : "";
}
function snakeCase(str) {
  return kebabCase(str || "", "_");
}

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr$3(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /{{(.*?)}}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const inlineAppConfig = {
  "nuxt": {
    "buildId": "3c63d3d5-939b-4051-8921-4e092e0b912e"
  }
};



const appConfig = defuFn(inlineAppConfig);

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      },
      "/_nuxt/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      }
    }
  },
  "public": {
    "ENV": "dev",
    "SERVER_URL": "https://backend.eileengeorge.de"
  },
  "BREVO_API_KEY": "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",
  "ipx": {
    "dir": "../public",
    "domains": [],
    "sharp": {},
    "alias": {}
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

const suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  const _value = value.trim();
  if (
    // eslint-disable-next-line unicorn/prefer-at
    value[0] === '"' && value.endsWith('"') && !value.includes("\\")
  ) {
    return _value.slice(1, -1);
  }
  if (_value.length <= 9) {
    const _lval = _value.toLowerCase();
    if (_lval === "true") {
      return true;
    }
    if (_lval === "false") {
      return false;
    }
    if (_lval === "undefined") {
      return void 0;
    }
    if (_lval === "null") {
      return null;
    }
    if (_lval === "nan") {
      return Number.NaN;
    }
    if (_lval === "infinity") {
      return Number.POSITIVE_INFINITY;
    }
    if (_lval === "-infinity") {
      return Number.NEGATIVE_INFINITY;
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

function wrapToPromise(value) {
  if (!value || typeof value.then !== "function") {
    return Promise.resolve(value);
  }
  return value;
}
function asyncCall(function_, ...arguments_) {
  try {
    return wrapToPromise(function_(...arguments_));
  } catch (error) {
    return Promise.reject(error);
  }
}
function isPrimitive(value) {
  const type = typeof value;
  return value === null || type !== "object" && type !== "function";
}
function isPureObject(value) {
  const proto = Object.getPrototypeOf(value);
  return !proto || proto.isPrototypeOf(Object);
}
function stringify(value) {
  if (isPrimitive(value)) {
    return String(value);
  }
  if (isPureObject(value) || Array.isArray(value)) {
    return JSON.stringify(value);
  }
  if (typeof value.toJSON === "function") {
    return stringify(value.toJSON());
  }
  throw new Error("[unstorage] Cannot stringify value!");
}
function checkBufferSupport() {
  if (typeof Buffer === void 0) {
    throw new TypeError("[unstorage] Buffer is not supported!");
  }
}
const BASE64_PREFIX = "base64:";
function serializeRaw(value) {
  if (typeof value === "string") {
    return value;
  }
  checkBufferSupport();
  const base64 = Buffer.from(value).toString("base64");
  return BASE64_PREFIX + base64;
}
function deserializeRaw(value) {
  if (typeof value !== "string") {
    return value;
  }
  if (!value.startsWith(BASE64_PREFIX)) {
    return value;
  }
  checkBufferSupport();
  return Buffer.from(value.slice(BASE64_PREFIX.length), "base64");
}

const storageKeyProperties = [
  "hasItem",
  "getItem",
  "getItemRaw",
  "setItem",
  "setItemRaw",
  "removeItem",
  "getMeta",
  "setMeta",
  "removeMeta",
  "getKeys",
  "clear",
  "mount",
  "unmount"
];
function prefixStorage(storage, base) {
  base = normalizeBaseKey(base);
  if (!base) {
    return storage;
  }
  const nsStorage = { ...storage };
  for (const property of storageKeyProperties) {
    nsStorage[property] = (key = "", ...args) => (
      // @ts-ignore
      storage[property](base + key, ...args)
    );
  }
  nsStorage.getKeys = (key = "", ...arguments_) => storage.getKeys(base + key, ...arguments_).then((keys) => keys.map((key2) => key2.slice(base.length)));
  return nsStorage;
}
function normalizeKey$1(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}
function joinKeys(...keys) {
  return normalizeKey$1(keys.join(":"));
}
function normalizeBaseKey(base) {
  base = normalizeKey$1(base);
  return base ? base + ":" : "";
}

function defineDriver$1(factory) {
  return factory;
}

const DRIVER_NAME$1 = "memory";
const memory = defineDriver$1(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME$1,
    options: {},
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) ?? null;
    },
    getItemRaw(key) {
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    setItemRaw(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return Array.from(data.keys());
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});

function createStorage(options = {}) {
  const context = {
    mounts: { "": options.driver || memory() },
    mountpoints: [""],
    watching: false,
    watchListeners: [],
    unwatch: {}
  };
  const getMount = (key) => {
    for (const base of context.mountpoints) {
      if (key.startsWith(base)) {
        return {
          base,
          relativeKey: key.slice(base.length),
          driver: context.mounts[base]
        };
      }
    }
    return {
      base: "",
      relativeKey: key,
      driver: context.mounts[""]
    };
  };
  const getMounts = (base, includeParent) => {
    return context.mountpoints.filter(
      (mountpoint) => mountpoint.startsWith(base) || includeParent && base.startsWith(mountpoint)
    ).map((mountpoint) => ({
      relativeBase: base.length > mountpoint.length ? base.slice(mountpoint.length) : void 0,
      mountpoint,
      driver: context.mounts[mountpoint]
    }));
  };
  const onChange = (event, key) => {
    if (!context.watching) {
      return;
    }
    key = normalizeKey$1(key);
    for (const listener of context.watchListeners) {
      listener(event, key);
    }
  };
  const startWatch = async () => {
    if (context.watching) {
      return;
    }
    context.watching = true;
    for (const mountpoint in context.mounts) {
      context.unwatch[mountpoint] = await watch(
        context.mounts[mountpoint],
        onChange,
        mountpoint
      );
    }
  };
  const stopWatch = async () => {
    if (!context.watching) {
      return;
    }
    for (const mountpoint in context.unwatch) {
      await context.unwatch[mountpoint]();
    }
    context.unwatch = {};
    context.watching = false;
  };
  const runBatch = (items, commonOptions, cb) => {
    const batches = /* @__PURE__ */ new Map();
    const getBatch = (mount) => {
      let batch = batches.get(mount.base);
      if (!batch) {
        batch = {
          driver: mount.driver,
          base: mount.base,
          items: []
        };
        batches.set(mount.base, batch);
      }
      return batch;
    };
    for (const item of items) {
      const isStringItem = typeof item === "string";
      const key = normalizeKey$1(isStringItem ? item : item.key);
      const value = isStringItem ? void 0 : item.value;
      const options2 = isStringItem || !item.options ? commonOptions : { ...commonOptions, ...item.options };
      const mount = getMount(key);
      getBatch(mount).items.push({
        key,
        value,
        relativeKey: mount.relativeKey,
        options: options2
      });
    }
    return Promise.all([...batches.values()].map((batch) => cb(batch))).then(
      (r) => r.flat()
    );
  };
  const storage = {
    // Item
    hasItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.hasItem, relativeKey, opts);
    },
    getItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => destr(value)
      );
    },
    getItems(items, commonOptions) {
      return runBatch(items, commonOptions, (batch) => {
        if (batch.driver.getItems) {
          return asyncCall(
            batch.driver.getItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              options: item.options
            })),
            commonOptions
          ).then(
            (r) => r.map((item) => ({
              key: joinKeys(batch.base, item.key),
              value: destr(item.value)
            }))
          );
        }
        return Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.getItem,
              item.relativeKey,
              item.options
            ).then((value) => ({
              key: item.key,
              value: destr(value)
            }));
          })
        );
      });
    },
    getItemRaw(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.getItemRaw) {
        return asyncCall(driver.getItemRaw, relativeKey, opts);
      }
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => deserializeRaw(value)
      );
    },
    async setItem(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.setItem) {
        return;
      }
      await asyncCall(driver.setItem, relativeKey, stringify(value), opts);
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async setItems(items, commonOptions) {
      await runBatch(items, commonOptions, async (batch) => {
        if (batch.driver.setItems) {
          return asyncCall(
            batch.driver.setItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              value: stringify(item.value),
              options: item.options
            })),
            commonOptions
          );
        }
        if (!batch.driver.setItem) {
          return;
        }
        await Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.setItem,
              item.relativeKey,
              stringify(item.value),
              item.options
            );
          })
        );
      });
    },
    async setItemRaw(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key, opts);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.setItemRaw) {
        await asyncCall(driver.setItemRaw, relativeKey, value, opts);
      } else if (driver.setItem) {
        await asyncCall(driver.setItem, relativeKey, serializeRaw(value), opts);
      } else {
        return;
      }
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async removeItem(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { removeMeta: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.removeItem) {
        return;
      }
      await asyncCall(driver.removeItem, relativeKey, opts);
      if (opts.removeMeta || opts.removeMata) {
        await asyncCall(driver.removeItem, relativeKey + "$", opts);
      }
      if (!driver.watch) {
        onChange("remove", key);
      }
    },
    // Meta
    async getMeta(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { nativeOnly: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      const meta = /* @__PURE__ */ Object.create(null);
      if (driver.getMeta) {
        Object.assign(meta, await asyncCall(driver.getMeta, relativeKey, opts));
      }
      if (!opts.nativeOnly) {
        const value = await asyncCall(
          driver.getItem,
          relativeKey + "$",
          opts
        ).then((value_) => destr(value_));
        if (value && typeof value === "object") {
          if (typeof value.atime === "string") {
            value.atime = new Date(value.atime);
          }
          if (typeof value.mtime === "string") {
            value.mtime = new Date(value.mtime);
          }
          Object.assign(meta, value);
        }
      }
      return meta;
    },
    setMeta(key, value, opts = {}) {
      return this.setItem(key + "$", value, opts);
    },
    removeMeta(key, opts = {}) {
      return this.removeItem(key + "$", opts);
    },
    // Keys
    async getKeys(base, opts = {}) {
      base = normalizeBaseKey(base);
      const mounts = getMounts(base, true);
      let maskedMounts = [];
      const allKeys = [];
      for (const mount of mounts) {
        const rawKeys = await asyncCall(
          mount.driver.getKeys,
          mount.relativeBase,
          opts
        );
        const keys = rawKeys.map((key) => mount.mountpoint + normalizeKey$1(key)).filter((key) => !maskedMounts.some((p) => key.startsWith(p)));
        allKeys.push(...keys);
        maskedMounts = [
          mount.mountpoint,
          ...maskedMounts.filter((p) => !p.startsWith(mount.mountpoint))
        ];
      }
      return base ? allKeys.filter((key) => key.startsWith(base) && !key.endsWith("$")) : allKeys.filter((key) => !key.endsWith("$"));
    },
    // Utils
    async clear(base, opts = {}) {
      base = normalizeBaseKey(base);
      await Promise.all(
        getMounts(base, false).map(async (m) => {
          if (m.driver.clear) {
            return asyncCall(m.driver.clear, m.relativeBase, opts);
          }
          if (m.driver.removeItem) {
            const keys = await m.driver.getKeys(m.relativeBase || "", opts);
            return Promise.all(
              keys.map((key) => m.driver.removeItem(key, opts))
            );
          }
        })
      );
    },
    async dispose() {
      await Promise.all(
        Object.values(context.mounts).map((driver) => dispose(driver))
      );
    },
    async watch(callback) {
      await startWatch();
      context.watchListeners.push(callback);
      return async () => {
        context.watchListeners = context.watchListeners.filter(
          (listener) => listener !== callback
        );
        if (context.watchListeners.length === 0) {
          await stopWatch();
        }
      };
    },
    async unwatch() {
      context.watchListeners = [];
      await stopWatch();
    },
    // Mount
    mount(base, driver) {
      base = normalizeBaseKey(base);
      if (base && context.mounts[base]) {
        throw new Error(`already mounted at ${base}`);
      }
      if (base) {
        context.mountpoints.push(base);
        context.mountpoints.sort((a, b) => b.length - a.length);
      }
      context.mounts[base] = driver;
      if (context.watching) {
        Promise.resolve(watch(driver, onChange, base)).then((unwatcher) => {
          context.unwatch[base] = unwatcher;
        }).catch(console.error);
      }
      return storage;
    },
    async unmount(base, _dispose = true) {
      base = normalizeBaseKey(base);
      if (!base || !context.mounts[base]) {
        return;
      }
      if (context.watching && base in context.unwatch) {
        context.unwatch[base]();
        delete context.unwatch[base];
      }
      if (_dispose) {
        await dispose(context.mounts[base]);
      }
      context.mountpoints = context.mountpoints.filter((key) => key !== base);
      delete context.mounts[base];
    },
    getMount(key = "") {
      key = normalizeKey$1(key) + ":";
      const m = getMount(key);
      return {
        driver: m.driver,
        base: m.base
      };
    },
    getMounts(base = "", opts = {}) {
      base = normalizeKey$1(base);
      const mounts = getMounts(base, opts.parents);
      return mounts.map((m) => ({
        driver: m.driver,
        base: m.mountpoint
      }));
    }
  };
  return storage;
}
function watch(driver, onChange, base) {
  return driver.watch ? driver.watch((event, key) => onChange(event, base + key)) : () => {
  };
}
async function dispose(driver) {
  if (typeof driver.dispose === "function") {
    await asyncCall(driver.dispose);
  }
}

const _assets = {

};

const normalizeKey = function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
};

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

function defineDriver(factory) {
  return factory;
}
function createError(driver, message, opts) {
  const err = new Error(`[unstorage] [${driver}] ${message}`, opts);
  return err;
}
function createRequiredError(driver, name) {
  if (Array.isArray(name)) {
    return createError(
      driver,
      `Missing some of the required options ${name.map((n) => "`" + n + "`").join(", ")}`
    );
  }
  return createError(driver, `Missing required option \`${name}\`.`);
}

function ignoreNotfound(err) {
  return err.code === "ENOENT" || err.code === "EISDIR" ? null : err;
}
function ignoreExists(err) {
  return err.code === "EEXIST" ? null : err;
}
async function writeFile(path, data, encoding) {
  await ensuredir(dirname$1(path));
  return promises.writeFile(path, data, encoding);
}
function readFile(path, encoding) {
  return promises.readFile(path, encoding).catch(ignoreNotfound);
}
function unlink(path) {
  return promises.unlink(path).catch(ignoreNotfound);
}
function readdir(dir) {
  return promises.readdir(dir, { withFileTypes: true }).catch(ignoreNotfound).then((r) => r || []);
}
async function ensuredir(dir) {
  if (existsSync(dir)) {
    return;
  }
  await ensuredir(dirname$1(dir)).catch(ignoreExists);
  await promises.mkdir(dir).catch(ignoreExists);
}
async function readdirRecursive(dir, ignore) {
  if (ignore && ignore(dir)) {
    return [];
  }
  const entries = await readdir(dir);
  const files = [];
  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        const dirFiles = await readdirRecursive(entryPath, ignore);
        files.push(...dirFiles.map((f) => entry.name + "/" + f));
      } else {
        if (!(ignore && ignore(entry.name))) {
          files.push(entry.name);
        }
      }
    })
  );
  return files;
}
async function rmRecursive(dir) {
  const entries = await readdir(dir);
  await Promise.all(
    entries.map((entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        return rmRecursive(entryPath).then(() => promises.rmdir(entryPath));
      } else {
        return promises.unlink(entryPath);
      }
    })
  );
}

const PATH_TRAVERSE_RE = /\.\.\:|\.\.$/;
const DRIVER_NAME = "fs-lite";
const unstorage_47drivers_47fs_45lite = defineDriver((opts = {}) => {
  if (!opts.base) {
    throw createRequiredError(DRIVER_NAME, "base");
  }
  opts.base = resolve$1(opts.base);
  const r = (key) => {
    if (PATH_TRAVERSE_RE.test(key)) {
      throw createError(
        DRIVER_NAME,
        `Invalid key: ${JSON.stringify(key)}. It should not contain .. segments`
      );
    }
    const resolved = join(opts.base, key.replace(/:/g, "/"));
    return resolved;
  };
  return {
    name: DRIVER_NAME,
    options: opts,
    hasItem(key) {
      return existsSync(r(key));
    },
    getItem(key) {
      return readFile(r(key), "utf8");
    },
    getItemRaw(key) {
      return readFile(r(key));
    },
    async getMeta(key) {
      const { atime, mtime, size, birthtime, ctime } = await promises.stat(r(key)).catch(() => ({}));
      return { atime, mtime, size, birthtime, ctime };
    },
    setItem(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value, "utf8");
    },
    setItemRaw(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value);
    },
    removeItem(key) {
      if (opts.readOnly) {
        return;
      }
      return unlink(r(key));
    },
    getKeys() {
      return readdirRecursive(r("."), opts.ignore);
    },
    async clear() {
      if (opts.readOnly || opts.noClear) {
        return;
      }
      await rmRecursive(r("."));
    }
  };
});

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('data', unstorage_47drivers_47fs_45lite({"driver":"fsLite","base":"J:\\+Code\\eileen\\.data\\kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[nitro] [cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          const promise = useStorage().setItem(cacheKey, entry).catch((error) => {
            console.error(`[nitro] [cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event && event.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[nitro] [cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
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
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      const _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        variableHeaders[header] = incomingEvent.node.req.headers[header];
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
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
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.context = incomingEvent.context;
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
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
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        event.node.res.setHeader(name, value);
      }
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

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  if (hasReqHeader(event, "accept", "text/html")) {
    return false;
  }
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
function _captureError(error, type) {
  console.error(`[nitro] [${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter$1({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
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
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const plugins = [
  
];

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.path,
    statusCode,
    statusMessage,
    message,
    stack: "",
    // TODO: check and validate error.data for serialisation into query
    data: error.data
  };
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
  if (event.handled) {
    return;
  }
  setResponseStatus(event, errorObject.statusCode !== 200 && errorObject.statusCode || 500, errorObject.statusMessage);
  if (isJsonRequest(event)) {
    setResponseHeader(event, "Content-Type", "application/json");
    return send(event, JSON.stringify(errorObject));
  }
  const reqHeaders = getRequestHeaders(event);
  const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
  const res = isRenderingError ? null : await useNitroApp().localFetch(
    withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject),
    {
      headers: { ...reqHeaders, "x-nuxt-error": "true" },
      redirect: "manual"
    }
  ).catch(() => null);
  if (!res) {
    const { template } = await import('./_/error-500.mjs');
    if (event.handled) {
      return;
    }
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    return send(event, template(errorObject));
  }
  const html = await res.text();
  if (event.handled) {
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : void 0, res.statusText);
  return send(event, html);
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
  "/_nuxt/0KOVFyqN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"96f-28LVWFfA5aLFKFzLOIneyEx2Ohg\"",
    "mtime": "2024-05-10T14:05:11.950Z",
    "size": 2415,
    "path": "../public/_nuxt/0KOVFyqN.js"
  },
  "/_nuxt/2L8sdvtL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"139-xrA3/Mol7lYauz/9VJNJe+l/Vwk\"",
    "mtime": "2024-05-10T14:05:11.980Z",
    "size": 313,
    "path": "../public/_nuxt/2L8sdvtL.js"
  },
  "/_nuxt/3hbNgmYH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"243-Jd5sa47GY59dzf7E4SMaPx46VEA\"",
    "mtime": "2024-05-10T14:05:11.943Z",
    "size": 579,
    "path": "../public/_nuxt/3hbNgmYH.js"
  },
  "/_nuxt/3VwVNy4w.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9aa-122h2giGDDqtDD6Hn1lJ9FvcllY\"",
    "mtime": "2024-05-10T14:05:11.935Z",
    "size": 2474,
    "path": "../public/_nuxt/3VwVNy4w.js"
  },
  "/_nuxt/56NwCY89.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"23b0-kngvdo8FNweTOfBDObb9ObbTlmU\"",
    "mtime": "2024-05-10T14:05:11.980Z",
    "size": 9136,
    "path": "../public/_nuxt/56NwCY89.js"
  },
  "/_nuxt/7JHmSxDl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3c3-/zpUKTfhEupT0ziAKQQtA0nf/Z4\"",
    "mtime": "2024-05-10T14:05:11.957Z",
    "size": 963,
    "path": "../public/_nuxt/7JHmSxDl.js"
  },
  "/_nuxt/81OQSBQq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"299-bo9nkq10sgRKfxbiq6njBXsZ+8w\"",
    "mtime": "2024-05-10T14:05:11.964Z",
    "size": 665,
    "path": "../public/_nuxt/81OQSBQq.js"
  },
  "/_nuxt/A94HhIau.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"98bc-dSe/a+UBXnvX8golay+Nc3hn6Xg\"",
    "mtime": "2024-05-10T14:05:11.995Z",
    "size": 39100,
    "path": "../public/_nuxt/A94HhIau.js"
  },
  "/_nuxt/aiLtWTzG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7ebc-9QIO3GYcC1BSHpqGBiggJ3ejxUU\"",
    "mtime": "2024-05-10T14:05:11.992Z",
    "size": 32444,
    "path": "../public/_nuxt/aiLtWTzG.js"
  },
  "/_nuxt/aM9lCTQ2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"38a-U0UvmsuSX3qRETCJGmoaZ9fZkQo\"",
    "mtime": "2024-05-10T14:05:11.981Z",
    "size": 906,
    "path": "../public/_nuxt/aM9lCTQ2.js"
  },
  "/_nuxt/Audio.CryC8DgE.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7f-YwtQjiViORRokbWJBlAreEz4Zdg\"",
    "mtime": "2024-05-10T14:05:11.921Z",
    "size": 127,
    "path": "../public/_nuxt/Audio.CryC8DgE.css"
  },
  "/_nuxt/a_F-iIV0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2a1-rr0vkW2ubPArE8sVQYagYJHCxeM\"",
    "mtime": "2024-05-10T14:05:11.928Z",
    "size": 673,
    "path": "../public/_nuxt/a_F-iIV0.js"
  },
  "/_nuxt/B0GBmsI8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1e7-DliORFsXRrhCekTGl5NLOnZOoL0\"",
    "mtime": "2024-05-10T14:05:11.966Z",
    "size": 487,
    "path": "../public/_nuxt/B0GBmsI8.js"
  },
  "/_nuxt/B3XMUZ44.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"31d-8pckmACTHh7lZq82+fo+gDt0Rkk\"",
    "mtime": "2024-05-10T14:05:11.974Z",
    "size": 797,
    "path": "../public/_nuxt/B3XMUZ44.js"
  },
  "/_nuxt/B4d_EzqS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e94-PLzif4dIcnIWTSMYPc1L0ov/TDw\"",
    "mtime": "2024-05-10T14:05:11.964Z",
    "size": 3732,
    "path": "../public/_nuxt/B4d_EzqS.js"
  },
  "/_nuxt/B4ykcIyl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"251-kvfKq2UAvI5hyT/ULnBYT4kEw3A\"",
    "mtime": "2024-05-10T14:05:11.985Z",
    "size": 593,
    "path": "../public/_nuxt/B4ykcIyl.js"
  },
  "/_nuxt/B5Lfu38s.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9b8-diayxUQJxGj/ENUQ2GF7fFae0aw\"",
    "mtime": "2024-05-10T14:05:11.957Z",
    "size": 2488,
    "path": "../public/_nuxt/B5Lfu38s.js"
  },
  "/_nuxt/B6MOq0yX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"38b-SzmySpMp5Q94hdHm2qZdpr6Milg\"",
    "mtime": "2024-05-10T14:05:11.975Z",
    "size": 907,
    "path": "../public/_nuxt/B6MOq0yX.js"
  },
  "/_nuxt/B7cur1J4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"35a-hq+bKzwyVQ2rZykPPnwcbH09pjA\"",
    "mtime": "2024-05-10T14:05:11.958Z",
    "size": 858,
    "path": "../public/_nuxt/B7cur1J4.js"
  },
  "/_nuxt/B7kk28oX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3f4-V3hceGa+gI4UwZdCnpUMikoqEhg\"",
    "mtime": "2024-05-10T14:05:11.987Z",
    "size": 1012,
    "path": "../public/_nuxt/B7kk28oX.js"
  },
  "/_nuxt/B7_BWS4n.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"db8-QtBjuQfyX4H/dxihnIZ9TCf7YDk\"",
    "mtime": "2024-05-10T14:05:11.950Z",
    "size": 3512,
    "path": "../public/_nuxt/B7_BWS4n.js"
  },
  "/_nuxt/B9toIKlR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"26e-/mxQ841ulUuo3rhRnjTx6h2uoYM\"",
    "mtime": "2024-05-10T14:05:11.935Z",
    "size": 622,
    "path": "../public/_nuxt/B9toIKlR.js"
  },
  "/_nuxt/Baue6WPJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"150-lBie6JFIgGvsAqJnof8UzsykTN4\"",
    "mtime": "2024-05-10T14:05:11.936Z",
    "size": 336,
    "path": "../public/_nuxt/Baue6WPJ.js"
  },
  "/_nuxt/BB2wLSEC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6999-9D0Hru5d2vFB/nZQonK7qKsBzaM\"",
    "mtime": "2024-05-10T14:05:11.980Z",
    "size": 27033,
    "path": "../public/_nuxt/BB2wLSEC.js"
  },
  "/_nuxt/Bdd_bT7v.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"32a-WIYCRu5WF1EDr5VNw9OgtyiTooU\"",
    "mtime": "2024-05-10T14:05:11.943Z",
    "size": 810,
    "path": "../public/_nuxt/Bdd_bT7v.js"
  },
  "/_nuxt/BdUHOH2q.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"116-GvvApoXC/oWs5g2JSs2myTBRxC8\"",
    "mtime": "2024-05-10T14:05:11.987Z",
    "size": 278,
    "path": "../public/_nuxt/BdUHOH2q.js"
  },
  "/_nuxt/Bfo1JTUl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"29e-BVqNxfOAx8OT5y+/INAAPK8x7nw\"",
    "mtime": "2024-05-10T14:05:11.934Z",
    "size": 670,
    "path": "../public/_nuxt/Bfo1JTUl.js"
  },
  "/_nuxt/BFVXcp1A.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3e0-IcLuM76uUi/g8sjPRM1oFVtiQ20\"",
    "mtime": "2024-05-10T14:05:11.936Z",
    "size": 992,
    "path": "../public/_nuxt/BFVXcp1A.js"
  },
  "/_nuxt/BfznAazw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"727-WVCTRhkedrHUtsDM94gFysscMQY\"",
    "mtime": "2024-05-10T14:05:11.992Z",
    "size": 1831,
    "path": "../public/_nuxt/BfznAazw.js"
  },
  "/_nuxt/BG3AhtRy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1d4-f9zVimXXDeFpRvlK4GkvwuANiKA\"",
    "mtime": "2024-05-10T14:05:11.987Z",
    "size": 468,
    "path": "../public/_nuxt/BG3AhtRy.js"
  },
  "/_nuxt/BgVKTi7K.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"35e7-eRongnS+xwnpSCUy9PvL1ZKGZV4\"",
    "mtime": "2024-05-10T14:05:11.995Z",
    "size": 13799,
    "path": "../public/_nuxt/BgVKTi7K.js"
  },
  "/_nuxt/BH53taJr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"239-i8yfC9RJr+nfiF8Yy5pQQ6MBxVY\"",
    "mtime": "2024-05-10T14:05:11.979Z",
    "size": 569,
    "path": "../public/_nuxt/BH53taJr.js"
  },
  "/_nuxt/BHKJAby3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"661-mZLduDki05gquld8AMYaZNuYzUg\"",
    "mtime": "2024-05-10T14:05:11.972Z",
    "size": 1633,
    "path": "../public/_nuxt/BHKJAby3.js"
  },
  "/_nuxt/BHXsHrbq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"30b-0+fzqxfa9JnTaaHgvVY96G1cVyU\"",
    "mtime": "2024-05-10T14:05:11.959Z",
    "size": 779,
    "path": "../public/_nuxt/BHXsHrbq.js"
  },
  "/_nuxt/BismmSb8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1613-ZAwHqePzmTlRKaWeT7FyEVbffvg\"",
    "mtime": "2024-05-10T14:05:11.951Z",
    "size": 5651,
    "path": "../public/_nuxt/BismmSb8.js"
  },
  "/_nuxt/BKkmEAQX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"135d-woKQrLJpzu6G8/nGTXVcBwdsnmQ\"",
    "mtime": "2024-05-10T14:05:11.978Z",
    "size": 4957,
    "path": "../public/_nuxt/BKkmEAQX.js"
  },
  "/_nuxt/Bl2WPKjJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3ba-/XKzv1WFERs8/dnqjIGnhTtLyYk\"",
    "mtime": "2024-05-10T14:05:11.985Z",
    "size": 954,
    "path": "../public/_nuxt/Bl2WPKjJ.js"
  },
  "/_nuxt/BLijqUrT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"185-TUfylrNfImIHfFAie2K0usvSsXE\"",
    "mtime": "2024-05-10T14:05:11.982Z",
    "size": 389,
    "path": "../public/_nuxt/BLijqUrT.js"
  },
  "/_nuxt/BLnNnw2I.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7f5-OtINe5zUIsJWAothbDuXMXd/4QM\"",
    "mtime": "2024-05-10T14:05:11.992Z",
    "size": 2037,
    "path": "../public/_nuxt/BLnNnw2I.js"
  },
  "/_nuxt/BlockRenderer.C58gzD-c.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"5f-gDASvBie5KUEnKlwyIjku61RDS0\"",
    "mtime": "2024-05-10T14:05:11.921Z",
    "size": 95,
    "path": "../public/_nuxt/BlockRenderer.C58gzD-c.css"
  },
  "/_nuxt/Bob_wz7G.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"26b-GGHI1uKXEh5ZAcHs3iH3bsBJaHM\"",
    "mtime": "2024-05-10T14:05:11.936Z",
    "size": 619,
    "path": "../public/_nuxt/Bob_wz7G.js"
  },
  "/_nuxt/BOf2hSu-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"564-kQQzpxTSy6JHRDq0uUdgvkbO10I\"",
    "mtime": "2024-05-10T14:05:11.958Z",
    "size": 1380,
    "path": "../public/_nuxt/BOf2hSu-.js"
  },
  "/_nuxt/BookingCalendar.Cbo965AD.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"4c3-VMQNo8aYq8eRW4IOwY+YhaJLxl0\"",
    "mtime": "2024-05-10T14:05:11.923Z",
    "size": 1219,
    "path": "../public/_nuxt/BookingCalendar.Cbo965AD.css"
  },
  "/_nuxt/BOYfgSan.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"310-8gGcLxbmbPLGVdrTuYrUWWCv+Hc\"",
    "mtime": "2024-05-10T14:05:11.957Z",
    "size": 784,
    "path": "../public/_nuxt/BOYfgSan.js"
  },
  "/_nuxt/BquqLb6E.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7a1-lznIHj+nDoyvRHlBL/kzhbgtJQY\"",
    "mtime": "2024-05-10T14:05:11.992Z",
    "size": 1953,
    "path": "../public/_nuxt/BquqLb6E.js"
  },
  "/_nuxt/BSjZSBnA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3a0-0UpcBL3XxzAM68PpOU8CTvD2d1o\"",
    "mtime": "2024-05-10T14:05:11.973Z",
    "size": 928,
    "path": "../public/_nuxt/BSjZSBnA.js"
  },
  "/_nuxt/Bsnf7DE_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2bc-WjJ3qJvWi9oKUKfR4sCb3pldmR4\"",
    "mtime": "2024-05-10T14:05:11.953Z",
    "size": 700,
    "path": "../public/_nuxt/Bsnf7DE_.js"
  },
  "/_nuxt/BTPRuQbV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1e98-6QRktg1DSq3j+4FNI3OtWCpHR9Y\"",
    "mtime": "2024-05-10T14:05:11.952Z",
    "size": 7832,
    "path": "../public/_nuxt/BTPRuQbV.js"
  },
  "/_nuxt/BumzITen.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"24f-pO4eA7kVuE+oueLrL4408gjqRCA\"",
    "mtime": "2024-05-10T14:05:11.986Z",
    "size": 591,
    "path": "../public/_nuxt/BumzITen.js"
  },
  "/_nuxt/BV80eO9N.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"394-w5mftympfM4x9DcP2f72KyYqTcg\"",
    "mtime": "2024-05-10T14:05:11.964Z",
    "size": 916,
    "path": "../public/_nuxt/BV80eO9N.js"
  },
  "/_nuxt/BVKBI5mN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"13655-CQwL0SV9uqeSd5reeq43V3uMlFQ\"",
    "mtime": "2024-05-10T14:05:11.952Z",
    "size": 79445,
    "path": "../public/_nuxt/BVKBI5mN.js"
  },
  "/_nuxt/BWB35Pwm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4e-I/eOvX9D7PCfRKeyMRR7FsvgqV0\"",
    "mtime": "2024-05-10T14:05:11.951Z",
    "size": 78,
    "path": "../public/_nuxt/BWB35Pwm.js"
  },
  "/_nuxt/Bx9FU0vl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"267-Mn2MFegSbeQPrghPDL9aAEe30r4\"",
    "mtime": "2024-05-10T14:05:11.971Z",
    "size": 615,
    "path": "../public/_nuxt/Bx9FU0vl.js"
  },
  "/_nuxt/BYPwGxZX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1a7-m1CmD3U+oBYVlaCJ4y/mXSCqDGc\"",
    "mtime": "2024-05-10T14:05:11.974Z",
    "size": 423,
    "path": "../public/_nuxt/BYPwGxZX.js"
  },
  "/_nuxt/BzE4y71H.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2a1-VTw4J90Uc9Zfph96DoiGDk0kg94\"",
    "mtime": "2024-05-10T14:05:11.952Z",
    "size": 673,
    "path": "../public/_nuxt/BzE4y71H.js"
  },
  "/_nuxt/BzEV44_y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"244-ajT5EkGVBjLGqyAB2AvLrDVGK7w\"",
    "mtime": "2024-05-10T14:05:11.957Z",
    "size": 580,
    "path": "../public/_nuxt/BzEV44_y.js"
  },
  "/_nuxt/C-9GKsRY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"30f-6E1mxZGcTXlCuwuaSkpNlVqDqyw\"",
    "mtime": "2024-05-10T14:05:11.950Z",
    "size": 783,
    "path": "../public/_nuxt/C-9GKsRY.js"
  },
  "/_nuxt/C1oWrrg5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"203-amZ9sV9N9IKI01UyFmr/iHKPPFQ\"",
    "mtime": "2024-05-10T14:05:11.987Z",
    "size": 515,
    "path": "../public/_nuxt/C1oWrrg5.js"
  },
  "/_nuxt/C2unFyx1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"164-876Dxo5j9Pd2QWTxyoXrWE2ft2s\"",
    "mtime": "2024-05-10T14:05:11.967Z",
    "size": 356,
    "path": "../public/_nuxt/C2unFyx1.js"
  },
  "/_nuxt/C37ZspK7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"392-tSVssnAQaxNVLYeE2IItSpj6CiI\"",
    "mtime": "2024-05-10T14:05:11.990Z",
    "size": 914,
    "path": "../public/_nuxt/C37ZspK7.js"
  },
  "/_nuxt/C4lMT5J4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"185f-egpQ10ws2I1tkdSy9D7ZX041uNs\"",
    "mtime": "2024-05-10T14:05:11.944Z",
    "size": 6239,
    "path": "../public/_nuxt/C4lMT5J4.js"
  },
  "/_nuxt/C56TlilR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1861-NlPoX76iwsYmcDg5KM1h4Eh6HpQ\"",
    "mtime": "2024-05-10T14:05:11.987Z",
    "size": 6241,
    "path": "../public/_nuxt/C56TlilR.js"
  },
  "/_nuxt/C6qLwJGw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1da-NVJb4EcpDXm+DhWJYsE4A+gWs1I\"",
    "mtime": "2024-05-10T14:05:11.987Z",
    "size": 474,
    "path": "../public/_nuxt/C6qLwJGw.js"
  },
  "/_nuxt/C7SXGr2C.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1f0-CEW2gBjfCr+m4StoX7qtDLRoBww\"",
    "mtime": "2024-05-10T14:05:11.980Z",
    "size": 496,
    "path": "../public/_nuxt/C7SXGr2C.js"
  },
  "/_nuxt/Ca2x0QvS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4a6-FHL4YSaToKNS8lFf9STVqy9R2yA\"",
    "mtime": "2024-05-10T14:05:11.985Z",
    "size": 1190,
    "path": "../public/_nuxt/Ca2x0QvS.js"
  },
  "/_nuxt/CA9xTQGc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"10ca-GbdpQF3+45CUTGpZ+ceXi/YjQxY\"",
    "mtime": "2024-05-10T14:05:11.935Z",
    "size": 4298,
    "path": "../public/_nuxt/CA9xTQGc.js"
  },
  "/_nuxt/CaClVWss.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2f9-T1ck+Adrg5jTo/GhsN1beOcS9gg\"",
    "mtime": "2024-05-10T14:05:11.935Z",
    "size": 761,
    "path": "../public/_nuxt/CaClVWss.js"
  },
  "/_nuxt/CdRCTn0s.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"394-suZk19kfJSYfG0OsI1BXl7oZRCc\"",
    "mtime": "2024-05-10T14:05:11.973Z",
    "size": 916,
    "path": "../public/_nuxt/CdRCTn0s.js"
  },
  "/_nuxt/CDvndi-n.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e03-ztbD9iOtoVY3XMMz1LSAMceILk8\"",
    "mtime": "2024-05-10T14:05:11.994Z",
    "size": 3587,
    "path": "../public/_nuxt/CDvndi-n.js"
  },
  "/_nuxt/CE-BB7RV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2a81-bRbtCC6wQgsu4f72o9HRCMhjtas\"",
    "mtime": "2024-05-10T14:05:11.988Z",
    "size": 10881,
    "path": "../public/_nuxt/CE-BB7RV.js"
  },
  "/_nuxt/CE-dkAD4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1b9-AbA+Iil/pYd6xjZQJuyGSlsae10\"",
    "mtime": "2024-05-10T14:05:11.942Z",
    "size": 441,
    "path": "../public/_nuxt/CE-dkAD4.js"
  },
  "/_nuxt/CFCCnJ5f.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1ce-nJs7ff25u8hEgglySkGcURD4JxA\"",
    "mtime": "2024-05-10T14:05:11.981Z",
    "size": 462,
    "path": "../public/_nuxt/CFCCnJ5f.js"
  },
  "/_nuxt/CFNASvLc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1d1-8utD1b0p0C5Nd10RH4/fjeEtWrw\"",
    "mtime": "2024-05-10T14:05:11.935Z",
    "size": 465,
    "path": "../public/_nuxt/CFNASvLc.js"
  },
  "/_nuxt/CfQV-Vaw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1d7-V9x5degW62ChF0QF+i0m02mxnOo\"",
    "mtime": "2024-05-10T14:05:11.957Z",
    "size": 471,
    "path": "../public/_nuxt/CfQV-Vaw.js"
  },
  "/_nuxt/ChBoC0IW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"356-p8AeYlEN5dq5+Pzq0myiwBZc6dY\"",
    "mtime": "2024-05-10T14:05:11.981Z",
    "size": 854,
    "path": "../public/_nuxt/ChBoC0IW.js"
  },
  "/_nuxt/Cks238g9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"163-UTrT4th22qWPvdLAz7228dGiuds\"",
    "mtime": "2024-05-10T14:05:11.945Z",
    "size": 355,
    "path": "../public/_nuxt/Cks238g9.js"
  },
  "/_nuxt/ClickableHeadings.DSohXPWs.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"8a-YmjIAmbrD9UHf1J7esku6Hug4DY\"",
    "mtime": "2024-05-10T14:05:11.928Z",
    "size": 138,
    "path": "../public/_nuxt/ClickableHeadings.DSohXPWs.css"
  },
  "/_nuxt/CLsjZ5xV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"26b-873Yypd0IAOx9UWgU0zNH4xY9q4\"",
    "mtime": "2024-05-10T14:05:11.943Z",
    "size": 619,
    "path": "../public/_nuxt/CLsjZ5xV.js"
  },
  "/_nuxt/CnvYEIbb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7a0-gnj6tGhEJFjmg++WFuVX6Kv12so\"",
    "mtime": "2024-05-10T14:05:11.995Z",
    "size": 1952,
    "path": "../public/_nuxt/CnvYEIbb.js"
  },
  "/_nuxt/CoB07wRU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"583-TjSf9fEMgvuxgMg0vLnzukO+OjA\"",
    "mtime": "2024-05-10T14:05:11.950Z",
    "size": 1411,
    "path": "../public/_nuxt/CoB07wRU.js"
  },
  "/_nuxt/Contact.BjBR04tP.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"b3-KoUVyyOWX/pNqrp+LlyNZ7nD7/g\"",
    "mtime": "2024-05-10T14:05:11.928Z",
    "size": 179,
    "path": "../public/_nuxt/Contact.BjBR04tP.css"
  },
  "/_nuxt/CPwytLeR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"929-iiPWYgU0r+LGM3bQfCw4mJ/FGdQ\"",
    "mtime": "2024-05-10T14:05:11.943Z",
    "size": 2345,
    "path": "../public/_nuxt/CPwytLeR.js"
  },
  "/_nuxt/CPY458hu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"206-mOHjKfMjLJpq500QIx8ZNQ9sbTI\"",
    "mtime": "2024-05-10T14:05:11.964Z",
    "size": 518,
    "path": "../public/_nuxt/CPY458hu.js"
  },
  "/_nuxt/CQTP5jxm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"214-MWKPRfYvX1fhk8MK7jgVBG9ye7k\"",
    "mtime": "2024-05-10T14:05:11.973Z",
    "size": 532,
    "path": "../public/_nuxt/CQTP5jxm.js"
  },
  "/_nuxt/CRLLlBvS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4e-Ky0tzlIu4msytQq/FW2AeG2e2H0\"",
    "mtime": "2024-05-10T14:05:11.944Z",
    "size": 78,
    "path": "../public/_nuxt/CRLLlBvS.js"
  },
  "/_nuxt/CSkY5Zb_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2094-hkRs54E14jQGzh2wwR7KZ82IQgQ\"",
    "mtime": "2024-05-10T14:05:11.958Z",
    "size": 8340,
    "path": "../public/_nuxt/CSkY5Zb_.js"
  },
  "/_nuxt/CSOpTW4W.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"159-k7r0Ls06qW/DSL7106NmAfSAbd4\"",
    "mtime": "2024-05-10T14:05:11.972Z",
    "size": 345,
    "path": "../public/_nuxt/CSOpTW4W.js"
  },
  "/_nuxt/Ctv6uAmL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"907-/vK1mo054JIh6ialxm5KETFgC9Y\"",
    "mtime": "2024-05-10T14:05:11.966Z",
    "size": 2311,
    "path": "../public/_nuxt/Ctv6uAmL.js"
  },
  "/_nuxt/CUbgeBpE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2cc-ea4rkTSpvoyEdyrz1TcHJX0IqmY\"",
    "mtime": "2024-05-10T14:05:11.980Z",
    "size": 716,
    "path": "../public/_nuxt/CUbgeBpE.js"
  },
  "/_nuxt/Cud4boJe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2b7-UhO4O9VdjpyUor9EktBgTb4LKug\"",
    "mtime": "2024-05-10T14:05:11.935Z",
    "size": 695,
    "path": "../public/_nuxt/Cud4boJe.js"
  },
  "/_nuxt/CUDFoRut.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"49b-bp85RWtnuVCX4K6ItJmnm+564fw\"",
    "mtime": "2024-05-10T14:05:11.964Z",
    "size": 1179,
    "path": "../public/_nuxt/CUDFoRut.js"
  },
  "/_nuxt/Cv9qc7Kr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b85-lm25G4mqpEQ4nYPM+4MSE2CFEc8\"",
    "mtime": "2024-05-10T14:05:11.951Z",
    "size": 2949,
    "path": "../public/_nuxt/Cv9qc7Kr.js"
  },
  "/_nuxt/CxKJBJxR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"730-q3ZPOoNWwXhkLxdQFQ12XjudkXc\"",
    "mtime": "2024-05-10T14:05:11.943Z",
    "size": 1840,
    "path": "../public/_nuxt/CxKJBJxR.js"
  },
  "/_nuxt/CxOXJFUH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1d5-6HsuiNhYrOe9XQYm7HBVIvSjFxU\"",
    "mtime": "2024-05-10T14:05:11.928Z",
    "size": 469,
    "path": "../public/_nuxt/CxOXJFUH.js"
  },
  "/_nuxt/CybHv0RC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2c2-0GGLp8Yx0x5D+I3VlZYQH20uaOQ\"",
    "mtime": "2024-05-10T14:05:11.930Z",
    "size": 706,
    "path": "../public/_nuxt/CybHv0RC.js"
  },
  "/_nuxt/D-N9YHdX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"171-g34y+KdP0OCLv/quRVfVuuQWYr8\"",
    "mtime": "2024-05-10T14:05:11.938Z",
    "size": 369,
    "path": "../public/_nuxt/D-N9YHdX.js"
  },
  "/_nuxt/D-uYeKKs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c56-aSQFxQzTTA1G/vjon6YPJx85Z7o\"",
    "mtime": "2024-05-10T14:05:11.975Z",
    "size": 3158,
    "path": "../public/_nuxt/D-uYeKKs.js"
  },
  "/_nuxt/D19IkiFj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1df-r8oRzEkp5NH7L54BlSm3NH4UmgI\"",
    "mtime": "2024-05-10T14:05:11.950Z",
    "size": 479,
    "path": "../public/_nuxt/D19IkiFj.js"
  },
  "/_nuxt/D2TCuG5y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"288-k19kWdEteFSh3YNzDoWrkS5aJ6U\"",
    "mtime": "2024-05-10T14:05:11.943Z",
    "size": 648,
    "path": "../public/_nuxt/D2TCuG5y.js"
  },
  "/_nuxt/D4qCFXEO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"27a-jRhcuYN6HVaillzcXIn+U82vE0Q\"",
    "mtime": "2024-05-10T14:05:11.975Z",
    "size": 634,
    "path": "../public/_nuxt/D4qCFXEO.js"
  },
  "/_nuxt/D81CBpw6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ef-Lla9wTJJeywhHBcG7/Fm0O+Uvuk\"",
    "mtime": "2024-05-10T14:05:11.981Z",
    "size": 239,
    "path": "../public/_nuxt/D81CBpw6.js"
  },
  "/_nuxt/D9VFuc4g.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"452-N1lXFyjb60cTLFdQc667Vh5wOR4\"",
    "mtime": "2024-05-10T14:05:11.959Z",
    "size": 1106,
    "path": "../public/_nuxt/D9VFuc4g.js"
  },
  "/_nuxt/D9wYc4p8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1a7-Gn41w2FzXiqKP+I10q/hSTapfPc\"",
    "mtime": "2024-05-10T14:05:11.950Z",
    "size": 423,
    "path": "../public/_nuxt/D9wYc4p8.js"
  },
  "/_nuxt/DAbU_JYH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"18c-9PfmjCrvBrm+kGMLgQTPF5R6y38\"",
    "mtime": "2024-05-10T14:05:11.992Z",
    "size": 396,
    "path": "../public/_nuxt/DAbU_JYH.js"
  },
  "/_nuxt/DD1R9vye.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"29f-FerCgtLtxIuuYTyJo19pT8jjnxk\"",
    "mtime": "2024-05-10T14:05:11.950Z",
    "size": 671,
    "path": "../public/_nuxt/DD1R9vye.js"
  },
  "/_nuxt/Dd2FxAGW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2dc-pRqDIlryZef+tB9ckZ6Cq7UIY4w\"",
    "mtime": "2024-05-10T14:05:11.935Z",
    "size": 732,
    "path": "../public/_nuxt/Dd2FxAGW.js"
  },
  "/_nuxt/DD5jNCoZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"92f-PHvWRhY1LOtmcC3uoWXOk1mOq/8\"",
    "mtime": "2024-05-10T14:05:11.943Z",
    "size": 2351,
    "path": "../public/_nuxt/DD5jNCoZ.js"
  },
  "/_nuxt/Ddz_BZ_Y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"381-itTN84kHycX0I8nIn7KlVdhft18\"",
    "mtime": "2024-05-10T14:05:11.961Z",
    "size": 897,
    "path": "../public/_nuxt/Ddz_BZ_Y.js"
  },
  "/_nuxt/DFLp6Upx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"18e-B6jwaLAb4LGf/9RLSdLKTlQQQP8\"",
    "mtime": "2024-05-10T14:05:11.965Z",
    "size": 398,
    "path": "../public/_nuxt/DFLp6Upx.js"
  },
  "/_nuxt/DGO3vRmp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"518-XYb0hyIfKtoKuF8zRlTsAFuLPps\"",
    "mtime": "2024-05-10T14:05:11.950Z",
    "size": 1304,
    "path": "../public/_nuxt/DGO3vRmp.js"
  },
  "/_nuxt/DgoOUsbX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"857-YniqGKdddgvM5yhDSwoAZVUf2nE\"",
    "mtime": "2024-05-10T14:05:11.959Z",
    "size": 2135,
    "path": "../public/_nuxt/DgoOUsbX.js"
  },
  "/_nuxt/DHD6y-oC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"10c3-xC6LayeE6clLnsKkIQB92jnBvJw\"",
    "mtime": "2024-05-10T14:05:11.952Z",
    "size": 4291,
    "path": "../public/_nuxt/DHD6y-oC.js"
  },
  "/_nuxt/DhmEoFBm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"228-KweeaFlIIm2VXYEeVXH+1gjE9Uo\"",
    "mtime": "2024-05-10T14:05:11.944Z",
    "size": 552,
    "path": "../public/_nuxt/DhmEoFBm.js"
  },
  "/_nuxt/Dhp5Q_Dt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"224-WBxmNKvFd54E2oBMyD0RXmf6Kvo\"",
    "mtime": "2024-05-10T14:05:11.964Z",
    "size": 548,
    "path": "../public/_nuxt/Dhp5Q_Dt.js"
  },
  "/_nuxt/Di1nctRj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e26-wAgVKnH2Y9gprLnbx5O5AjiYu3M\"",
    "mtime": "2024-05-10T14:05:11.995Z",
    "size": 3622,
    "path": "../public/_nuxt/Di1nctRj.js"
  },
  "/_nuxt/DII_6jPl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"bce-kp4N6/8a75+UvOL8b/wX8UW7x7g\"",
    "mtime": "2024-05-10T14:05:11.943Z",
    "size": 3022,
    "path": "../public/_nuxt/DII_6jPl.js"
  },
  "/_nuxt/DIyHScht.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"270-dfENDAcYcVnYzMN5JbRsM5QbdUg\"",
    "mtime": "2024-05-10T14:05:11.982Z",
    "size": 624,
    "path": "../public/_nuxt/DIyHScht.js"
  },
  "/_nuxt/DJgoTayQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"189-iQXBBYIvDp+7mpoxxc6vQigExw0\"",
    "mtime": "2024-05-10T14:05:11.982Z",
    "size": 393,
    "path": "../public/_nuxt/DJgoTayQ.js"
  },
  "/_nuxt/DK8m2YWm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4ea-D0B//aGdUbPr/hWo2xcASfyRbM0\"",
    "mtime": "2024-05-10T14:05:11.965Z",
    "size": 1258,
    "path": "../public/_nuxt/DK8m2YWm.js"
  },
  "/_nuxt/DkhfyE7w.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5c0-vLEtgOqeYS2JgHYXHF0/5eshwUc\"",
    "mtime": "2024-05-10T14:05:11.985Z",
    "size": 1472,
    "path": "../public/_nuxt/DkhfyE7w.js"
  },
  "/_nuxt/DLAGxsiO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f2-LwCsEdFpCbDzdF0fPEHXtlYA/X4\"",
    "mtime": "2024-05-10T14:05:11.964Z",
    "size": 242,
    "path": "../public/_nuxt/DLAGxsiO.js"
  },
  "/_nuxt/DlAUqK2U.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5b-eFCz/UrraTh721pgAl0VxBNR1es\"",
    "mtime": "2024-05-10T14:05:11.986Z",
    "size": 91,
    "path": "../public/_nuxt/DlAUqK2U.js"
  },
  "/_nuxt/DlnhomUt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2a0-clZgfkG4Y8uZI4RWzxqa/RSYJds\"",
    "mtime": "2024-05-10T14:05:11.974Z",
    "size": 672,
    "path": "../public/_nuxt/DlnhomUt.js"
  },
  "/_nuxt/DlNnxRBv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"60c-z98hYSrQ8Lhz0eEUrweiRCKw5mo\"",
    "mtime": "2024-05-10T14:05:11.943Z",
    "size": 1548,
    "path": "../public/_nuxt/DlNnxRBv.js"
  },
  "/_nuxt/DmkU0D_R.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5e4-EOAshH1hYf2LTY/I+GILYPtpmJ0\"",
    "mtime": "2024-05-10T14:05:11.966Z",
    "size": 1508,
    "path": "../public/_nuxt/DmkU0D_R.js"
  },
  "/_nuxt/DmYL_AV-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"124-E+sOLpUoDqKR2jYAr+4mJvs63b0\"",
    "mtime": "2024-05-10T14:05:11.959Z",
    "size": 292,
    "path": "../public/_nuxt/DmYL_AV-.js"
  },
  "/_nuxt/DN-atUxj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"578-5iJG56oWT+ZFwqO9iVTrmXBBFFs\"",
    "mtime": "2024-05-10T14:05:11.950Z",
    "size": 1400,
    "path": "../public/_nuxt/DN-atUxj.js"
  },
  "/_nuxt/DntSqhq4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3ab-gwlNAiSOerBFaBt385gs21aV2mM\"",
    "mtime": "2024-05-10T14:05:11.985Z",
    "size": 939,
    "path": "../public/_nuxt/DntSqhq4.js"
  },
  "/_nuxt/Do4gxhhG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"249-XzoyKKbfh9Ordpo46QvkiM31AIY\"",
    "mtime": "2024-05-10T14:05:11.964Z",
    "size": 585,
    "path": "../public/_nuxt/Do4gxhhG.js"
  },
  "/_nuxt/DoCajAGP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"79f-8CaTXGeXk0lmTpt+gBgyAUKRBp4\"",
    "mtime": "2024-05-10T14:05:11.982Z",
    "size": 1951,
    "path": "../public/_nuxt/DoCajAGP.js"
  },
  "/_nuxt/DoJEdWP4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"29d-soR9A+ilV4l7B3xE0pAImvwT96g\"",
    "mtime": "2024-05-10T14:05:11.943Z",
    "size": 669,
    "path": "../public/_nuxt/DoJEdWP4.js"
  },
  "/_nuxt/Downloads.0-10NsD0.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2b-2RnMOoGAkzsCE5LLGpzPRgfEy70\"",
    "mtime": "2024-05-10T14:05:11.928Z",
    "size": 43,
    "path": "../public/_nuxt/Downloads.0-10NsD0.css"
  },
  "/_nuxt/DPQ-40rK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e41-BI6hxxAtXCxU/dWOHfbTAFyn8Ic\"",
    "mtime": "2024-05-10T14:05:11.959Z",
    "size": 3649,
    "path": "../public/_nuxt/DPQ-40rK.js"
  },
  "/_nuxt/DPtyeDoe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"27b-jbFLDMIHpbbT4yD+Jr5KG2PHGl0\"",
    "mtime": "2024-05-10T14:05:11.985Z",
    "size": 635,
    "path": "../public/_nuxt/DPtyeDoe.js"
  },
  "/_nuxt/DpwAT5F8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1d5-sA6mSYURCRNI2F8Kr3RZRZxRFS0\"",
    "mtime": "2024-05-10T14:05:11.935Z",
    "size": 469,
    "path": "../public/_nuxt/DpwAT5F8.js"
  },
  "/_nuxt/DPXWL-qq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"211-XOQDUv+Qed6XIt/W92HnapfZ5EU\"",
    "mtime": "2024-05-10T14:05:11.958Z",
    "size": 529,
    "path": "../public/_nuxt/DPXWL-qq.js"
  },
  "/_nuxt/DQvcl1iE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"59b-3IDg/jfQuTOQgsCG6wb9Ij2RsxM\"",
    "mtime": "2024-05-10T14:05:11.950Z",
    "size": 1435,
    "path": "../public/_nuxt/DQvcl1iE.js"
  },
  "/_nuxt/DQYbOoMc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ae9-W260CwXDlMLLxvzsVP9HugZm8wY\"",
    "mtime": "2024-05-10T14:05:11.950Z",
    "size": 2793,
    "path": "../public/_nuxt/DQYbOoMc.js"
  },
  "/_nuxt/Dr7eHeZ_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"77e-N20G2+KdgnrgQJWwGNOMD3uYBmM\"",
    "mtime": "2024-05-10T14:05:11.977Z",
    "size": 1918,
    "path": "../public/_nuxt/Dr7eHeZ_.js"
  },
  "/_nuxt/Dra1vs1G.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"385-AYVlqfXmZJydru0MGfuwIJh4qdo\"",
    "mtime": "2024-05-10T14:05:11.985Z",
    "size": 901,
    "path": "../public/_nuxt/Dra1vs1G.js"
  },
  "/_nuxt/DsaiOmP1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3d4-avXJy9PXXycDadsQxK8QzRYvZnc\"",
    "mtime": "2024-05-10T14:05:11.935Z",
    "size": 980,
    "path": "../public/_nuxt/DsaiOmP1.js"
  },
  "/_nuxt/DSE6qTqj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"12b-W45HkVctp24OnJ31YMvC8HfTjOg\"",
    "mtime": "2024-05-10T14:05:11.928Z",
    "size": 299,
    "path": "../public/_nuxt/DSE6qTqj.js"
  },
  "/_nuxt/DSn87UWl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2af-SWUSQ4bIxSbQaY6mjMA13X7R1Y0\"",
    "mtime": "2024-05-10T14:05:11.973Z",
    "size": 687,
    "path": "../public/_nuxt/DSn87UWl.js"
  },
  "/_nuxt/DT56Pauz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3b6-UYcDO3ANW6eX26O/bvkqy8K9N14\"",
    "mtime": "2024-05-10T14:05:11.966Z",
    "size": 950,
    "path": "../public/_nuxt/DT56Pauz.js"
  },
  "/_nuxt/DT7AlDvz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"10ea-7EIFbBR/jmDnjV0ox2Bq+Jq35zs\"",
    "mtime": "2024-05-10T14:05:11.935Z",
    "size": 4330,
    "path": "../public/_nuxt/DT7AlDvz.js"
  },
  "/_nuxt/DTLn6A9G.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"645-5yVhyLzfd2EAmaye6hpK0afVwMU\"",
    "mtime": "2024-05-10T14:05:11.970Z",
    "size": 1605,
    "path": "../public/_nuxt/DTLn6A9G.js"
  },
  "/_nuxt/DtrP70ji.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"359-JOfDdQtOFg418CbK60gGKXjDATg\"",
    "mtime": "2024-05-10T14:05:11.974Z",
    "size": 857,
    "path": "../public/_nuxt/DtrP70ji.js"
  },
  "/_nuxt/DuSE21F6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"50a-aWKv0ivwnwYcl22RWDcBOt9fKEM\"",
    "mtime": "2024-05-10T14:05:11.983Z",
    "size": 1290,
    "path": "../public/_nuxt/DuSE21F6.js"
  },
  "/_nuxt/Dw-6s2K4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f17-e09aDObzsQKYibQ6Ho2IsUzplfA\"",
    "mtime": "2024-05-10T14:05:11.987Z",
    "size": 3863,
    "path": "../public/_nuxt/Dw-6s2K4.js"
  },
  "/_nuxt/Dx7gYU-s.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"105-3mx6DQLFrbhn7JDShk7DIrZEtGI\"",
    "mtime": "2024-05-10T14:05:11.935Z",
    "size": 261,
    "path": "../public/_nuxt/Dx7gYU-s.js"
  },
  "/_nuxt/DX7XT1rc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"12db-clDctbXHG8C+RYVldUHefYNiWH0\"",
    "mtime": "2024-05-10T14:05:11.979Z",
    "size": 4827,
    "path": "../public/_nuxt/DX7XT1rc.js"
  },
  "/_nuxt/DXI5wDXg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2ab-fPms8N9U3D0cB173N3mBEKBYDPk\"",
    "mtime": "2024-05-10T14:05:11.965Z",
    "size": 683,
    "path": "../public/_nuxt/DXI5wDXg.js"
  },
  "/_nuxt/E6nRBTRD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"267-McWEoC/5yKOIBKaCAQN0i+qv8qU\"",
    "mtime": "2024-05-10T14:05:11.967Z",
    "size": 615,
    "path": "../public/_nuxt/E6nRBTRD.js"
  },
  "/_nuxt/eiupPThL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1e0-EzbKQhh1fZK63io7cwdQUxji10g\"",
    "mtime": "2024-05-10T14:05:11.957Z",
    "size": 480,
    "path": "../public/_nuxt/eiupPThL.js"
  },
  "/_nuxt/emybcIDH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1c7-PBwQSGxy/y/Xtn4hynTKRcaEqPI\"",
    "mtime": "2024-05-10T14:05:11.957Z",
    "size": 455,
    "path": "../public/_nuxt/emybcIDH.js"
  },
  "/_nuxt/error-404.JekaaCis.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"de4-+wA7grMyiBYWUxUrDrQgnZGsVuQ\"",
    "mtime": "2024-05-10T14:05:11.921Z",
    "size": 3556,
    "path": "../public/_nuxt/error-404.JekaaCis.css"
  },
  "/_nuxt/error-500.CNP9nqm1.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"75c-Juu+xpvMf6y/oBf0WsXvPEH0ie4\"",
    "mtime": "2024-05-10T14:05:11.921Z",
    "size": 1884,
    "path": "../public/_nuxt/error-500.CNP9nqm1.css"
  },
  "/_nuxt/F1WjrixK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"113f-fO/VlKK2nMRK11K+JCynaDcSje4\"",
    "mtime": "2024-05-10T14:05:11.972Z",
    "size": 4415,
    "path": "../public/_nuxt/F1WjrixK.js"
  },
  "/_nuxt/HeroBig.DkbM9vrV.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3c-0dRk5hcLT3oyqdy03MjFa1vGZPo\"",
    "mtime": "2024-05-10T14:05:11.928Z",
    "size": 60,
    "path": "../public/_nuxt/HeroBig.DkbM9vrV.css"
  },
  "/_nuxt/HeroSmall.CKetk_fH.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3c-aDrjqLHvcOsOpGbD6SwmRwb++es\"",
    "mtime": "2024-05-10T14:05:11.928Z",
    "size": 60,
    "path": "../public/_nuxt/HeroSmall.CKetk_fH.css"
  },
  "/_nuxt/IHdGo4IB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"165-WIpyBht8t03KsQ/flXjshcW6hRU\"",
    "mtime": "2024-05-10T14:05:11.963Z",
    "size": 357,
    "path": "../public/_nuxt/IHdGo4IB.js"
  },
  "/_nuxt/ImageList.BcqwbVoF.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7f-AzcwPo8X8Gu4kszcAf4PAN5eNIc\"",
    "mtime": "2024-05-10T14:05:11.928Z",
    "size": 127,
    "path": "../public/_nuxt/ImageList.BcqwbVoF.css"
  },
  "/_nuxt/ImageRotation.rwRHMxnw.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7f-+02b/9EmAClAvkvBVhOWtmjIzds\"",
    "mtime": "2024-05-10T14:05:11.928Z",
    "size": 127,
    "path": "../public/_nuxt/ImageRotation.rwRHMxnw.css"
  },
  "/_nuxt/jmJt9wD_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6f4-OLwYniFKw2ob4DNapq5IquUcBek\"",
    "mtime": "2024-05-10T14:05:11.992Z",
    "size": 1780,
    "path": "../public/_nuxt/jmJt9wD_.js"
  },
  "/_nuxt/k1IzlGhG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4ffae-5RqLrXyVtmGM5mAT58QTPnxO4gY\"",
    "mtime": "2024-05-10T14:05:11.995Z",
    "size": 327598,
    "path": "../public/_nuxt/k1IzlGhG.js"
  },
  "/_nuxt/Kh1kZRS5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"305-+f5CI6b1g7GWRGcfvpVcpBkRx8E\"",
    "mtime": "2024-05-10T14:05:11.944Z",
    "size": 773,
    "path": "../public/_nuxt/Kh1kZRS5.js"
  },
  "/_nuxt/KlQ3wWNl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"30f-2HPDdNy6KeyQDC9H8kT+CjFZWEg\"",
    "mtime": "2024-05-10T14:05:11.935Z",
    "size": 783,
    "path": "../public/_nuxt/KlQ3wWNl.js"
  },
  "/_nuxt/KyMa0GI8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"184-n9wVGwPTIHNE/m8UfN+IixdNV2k\"",
    "mtime": "2024-05-10T14:05:11.943Z",
    "size": 388,
    "path": "../public/_nuxt/KyMa0GI8.js"
  },
  "/_nuxt/Map.bdqI6M-Z.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"b3-61efIcLXbXDgW5X1Y4bfalbpKPs\"",
    "mtime": "2024-05-10T14:05:11.928Z",
    "size": 179,
    "path": "../public/_nuxt/Map.bdqI6M-Z.css"
  },
  "/_nuxt/Markdown.BzJmIQ22.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"14e-WuPk42WYFEvYwqrzKJpKD/aPopo\"",
    "mtime": "2024-05-10T14:05:11.921Z",
    "size": 334,
    "path": "../public/_nuxt/Markdown.BzJmIQ22.css"
  },
  "/_nuxt/MyWork.Cukl57y2.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"20-sJXDFVLglbJLxV6RPboqT2G6ijM\"",
    "mtime": "2024-05-10T14:05:11.928Z",
    "size": 32,
    "path": "../public/_nuxt/MyWork.Cukl57y2.css"
  },
  "/_nuxt/NJ-TYHiM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2a0-QZhZDZg/Xn1GcJOmKPGH+b4jyVA\"",
    "mtime": "2024-05-10T14:05:11.964Z",
    "size": 672,
    "path": "../public/_nuxt/NJ-TYHiM.js"
  },
  "/_nuxt/NQ833bWe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b93-0Y132Q81dbjbXWxeIirBXruMLSM\"",
    "mtime": "2024-05-10T14:05:11.979Z",
    "size": 2963,
    "path": "../public/_nuxt/NQ833bWe.js"
  },
  "/_nuxt/Nsw_r_XC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"92c-+IaQyy8kMW34cFUxUGHcBVe1bK0\"",
    "mtime": "2024-05-10T14:05:11.943Z",
    "size": 2348,
    "path": "../public/_nuxt/Nsw_r_XC.js"
  },
  "/_nuxt/nuxt-icon.D0q4voI9.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"a4-sWDBQZSmvHB2/Zs70D8cQGDErp0\"",
    "mtime": "2024-05-10T14:05:11.928Z",
    "size": 164,
    "path": "../public/_nuxt/nuxt-icon.D0q4voI9.css"
  },
  "/_nuxt/OEoRlAyC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c80-93q74FmeoEHK0xmi5dWAkVGJROE\"",
    "mtime": "2024-05-10T14:05:11.980Z",
    "size": 3200,
    "path": "../public/_nuxt/OEoRlAyC.js"
  },
  "/_nuxt/Offer.Cs7MzJ_V.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7f-Fv07J3MHxJmuP0yqRfqHKf7+EnM\"",
    "mtime": "2024-05-10T14:05:11.928Z",
    "size": 127,
    "path": "../public/_nuxt/Offer.Cs7MzJ_V.css"
  },
  "/_nuxt/OLOdYyCf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1d2-mlJpqBM2DD0KiU9qZf5e2A+PRcU\"",
    "mtime": "2024-05-10T14:05:11.986Z",
    "size": 466,
    "path": "../public/_nuxt/OLOdYyCf.js"
  },
  "/_nuxt/oxYrgM5W.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"19e-sUyqqGU1pjpeua/NLRBS+8WwMTE\"",
    "mtime": "2024-05-10T14:05:11.986Z",
    "size": 414,
    "path": "../public/_nuxt/oxYrgM5W.js"
  },
  "/_nuxt/PortraitText.Cch4LKOE.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3c-HUrPKCE3FkeXErtXlhsOkXGQRVY\"",
    "mtime": "2024-05-10T14:05:11.928Z",
    "size": 60,
    "path": "../public/_nuxt/PortraitText.Cch4LKOE.css"
  },
  "/_nuxt/PPc5UQzJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2ba-5R+2p52HRmQlHWMGvFnQsaLJYbU\"",
    "mtime": "2024-05-10T14:05:11.935Z",
    "size": 698,
    "path": "../public/_nuxt/PPc5UQzJ.js"
  },
  "/_nuxt/Q9uAY6HG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"77f-3B9Vd+1GTRGrF0GMIXxnF26klbQ\"",
    "mtime": "2024-05-10T14:05:11.935Z",
    "size": 1919,
    "path": "../public/_nuxt/Q9uAY6HG.js"
  },
  "/_nuxt/QBb-vNyX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"17a-22adSIRMCz8EaITLTJEqBqMTCZ8\"",
    "mtime": "2024-05-10T14:05:11.973Z",
    "size": 378,
    "path": "../public/_nuxt/QBb-vNyX.js"
  },
  "/_nuxt/RqxVyGY2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"bc3-lRf3zuuDDjLHBSbO9BAFHqwQmWs\"",
    "mtime": "2024-05-10T14:05:11.944Z",
    "size": 3011,
    "path": "../public/_nuxt/RqxVyGY2.js"
  },
  "/_nuxt/SGK9NU-A.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"715-rF9KYModfFQz6B1tG5qopJWELgU\"",
    "mtime": "2024-05-10T14:05:11.928Z",
    "size": 1813,
    "path": "../public/_nuxt/SGK9NU-A.js"
  },
  "/_nuxt/sLgbsG5H.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"304-rFVuWVlW+f4CsD65t5IpxQ3ah+o\"",
    "mtime": "2024-05-10T14:05:11.945Z",
    "size": 772,
    "path": "../public/_nuxt/sLgbsG5H.js"
  },
  "/_nuxt/subset-Nunito-Regular.B2njAFlF.ttf": {
    "type": "font/ttf",
    "etag": "\"c4ac-wCWIWv30B9tPJsDVjWLJcA8pX4M\"",
    "mtime": "2024-05-10T14:05:11.921Z",
    "size": 50348,
    "path": "../public/_nuxt/subset-Nunito-Regular.B2njAFlF.ttf"
  },
  "/_nuxt/subset-Nunito-Regular.BZ30bAvh.woff": {
    "type": "font/woff",
    "etag": "\"6770-jEzDjsaUYA9NyIUFitCy8PirftU\"",
    "mtime": "2024-05-10T14:05:11.921Z",
    "size": 26480,
    "path": "../public/_nuxt/subset-Nunito-Regular.BZ30bAvh.woff"
  },
  "/_nuxt/subset-Nunito-Regular.DQBkAWvO.svg": {
    "type": "image/svg+xml",
    "etag": "\"2ac7e-OAre8eCHzsKasu7o2u6fPE1VPV0\"",
    "mtime": "2024-05-10T14:05:11.921Z",
    "size": 175230,
    "path": "../public/_nuxt/subset-Nunito-Regular.DQBkAWvO.svg"
  },
  "/_nuxt/subset-Nunito-Regular.Drhxorko.woff2": {
    "type": "font/woff2",
    "etag": "\"5184-h804HNDtQTeJ/sRq44s1wdTnP5s\"",
    "mtime": "2024-05-10T14:05:11.921Z",
    "size": 20868,
    "path": "../public/_nuxt/subset-Nunito-Regular.Drhxorko.woff2"
  },
  "/_nuxt/subset-Nunito-Regular.NeoqGo5y.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"c560-suKcqZ7aC5BsXv1rb6qUrfA8HUM\"",
    "mtime": "2024-05-10T14:05:11.921Z",
    "size": 50528,
    "path": "../public/_nuxt/subset-Nunito-Regular.NeoqGo5y.eot"
  },
  "/_nuxt/subset-PlayfairDisplay-Italic.B2CyZV1j.woff2": {
    "type": "font/woff2",
    "etag": "\"6d24-Md24MrVqfzkkZiE5RMI8XcE/od8\"",
    "mtime": "2024-05-10T14:05:11.921Z",
    "size": 27940,
    "path": "../public/_nuxt/subset-PlayfairDisplay-Italic.B2CyZV1j.woff2"
  },
  "/_nuxt/subset-PlayfairDisplay-Italic.BgRJc1sx.ttf": {
    "type": "font/ttf",
    "etag": "\"de64-1fv6DZijY1ygvwbOov7a8i7Ck0s\"",
    "mtime": "2024-05-10T14:05:11.921Z",
    "size": 56932,
    "path": "../public/_nuxt/subset-PlayfairDisplay-Italic.BgRJc1sx.ttf"
  },
  "/_nuxt/subset-PlayfairDisplay-Italic.BruwO9b-.woff": {
    "type": "font/woff",
    "etag": "\"876c-PIhpv8AoFMrhRIbbMotUXCRj1a8\"",
    "mtime": "2024-05-10T14:05:11.921Z",
    "size": 34668,
    "path": "../public/_nuxt/subset-PlayfairDisplay-Italic.BruwO9b-.woff"
  },
  "/_nuxt/subset-PlayfairDisplay-Italic.Bz9Jh9kT.svg": {
    "type": "image/svg+xml",
    "etag": "\"280fc-5aMROSuvlcE12E/O4wsHNuk2GWQ\"",
    "mtime": "2024-05-10T14:05:11.921Z",
    "size": 164092,
    "path": "../public/_nuxt/subset-PlayfairDisplay-Italic.Bz9Jh9kT.svg"
  },
  "/_nuxt/subset-PlayfairDisplay-Italic.Bz_Mhmg5.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"e010-osIlilI61cSjhjqej0/eEynkVN8\"",
    "mtime": "2024-05-10T14:05:11.915Z",
    "size": 57360,
    "path": "../public/_nuxt/subset-PlayfairDisplay-Italic.Bz_Mhmg5.eot"
  },
  "/_nuxt/subset-PlayfairDisplay-Regular.BEkKvqaA.svg": {
    "type": "image/svg+xml",
    "etag": "\"314b6-F7WOcDu7ZTttzJmMOZ18IZaLrOM\"",
    "mtime": "2024-05-10T14:05:11.921Z",
    "size": 201910,
    "path": "../public/_nuxt/subset-PlayfairDisplay-Regular.BEkKvqaA.svg"
  },
  "/_nuxt/subset-PlayfairDisplay-Regular.BxCrs3Uw.woff2": {
    "type": "font/woff2",
    "etag": "\"67a4-npFcjxy67aUoxsJWoiVZ1Fnceh0\"",
    "mtime": "2024-05-10T14:05:11.921Z",
    "size": 26532,
    "path": "../public/_nuxt/subset-PlayfairDisplay-Regular.BxCrs3Uw.woff2"
  },
  "/_nuxt/subset-PlayfairDisplay-Regular.Ctp1jsdh.woff": {
    "type": "font/woff",
    "etag": "\"7f78-9UYQykAgvYLyG/v6v4Y8oxpy++w\"",
    "mtime": "2024-05-10T14:05:11.921Z",
    "size": 32632,
    "path": "../public/_nuxt/subset-PlayfairDisplay-Regular.Ctp1jsdh.woff"
  },
  "/_nuxt/subset-PlayfairDisplay-Regular.CY5Vpe7G.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"eda0-TU0ZDnFpUjUznPGQr/bBwbdqhUk\"",
    "mtime": "2024-05-10T14:05:11.920Z",
    "size": 60832,
    "path": "../public/_nuxt/subset-PlayfairDisplay-Regular.CY5Vpe7G.eot"
  },
  "/_nuxt/subset-PlayfairDisplay-Regular.DDdqHOod.ttf": {
    "type": "font/ttf",
    "etag": "\"ec00-OAE1y6wo4qiMr37BkXIS9d5Q+/k\"",
    "mtime": "2024-05-10T14:05:11.921Z",
    "size": 60416,
    "path": "../public/_nuxt/subset-PlayfairDisplay-Regular.DDdqHOod.ttf"
  },
  "/_nuxt/tdn04vwS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"160-rkYeAB/yUTF3zvrPvngM53HldtI\"",
    "mtime": "2024-05-10T14:05:11.928Z",
    "size": 352,
    "path": "../public/_nuxt/tdn04vwS.js"
  },
  "/_nuxt/tdpqIJyz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"eb3-+tQZMlteJFEJfYKNiFGenjgrkoY\"",
    "mtime": "2024-05-10T14:05:11.957Z",
    "size": 3763,
    "path": "../public/_nuxt/tdpqIJyz.js"
  },
  "/_nuxt/TEM0hnlb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a35-DrliTbdP3MHVKGUbS0kkPncnLPQ\"",
    "mtime": "2024-05-10T14:05:11.995Z",
    "size": 2613,
    "path": "../public/_nuxt/TEM0hnlb.js"
  },
  "/_nuxt/Testimonials.10OKVE1B.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7f-yBRpdPOAqQPY7vSMZE+8PJQtjM4\"",
    "mtime": "2024-05-10T14:05:11.928Z",
    "size": 127,
    "path": "../public/_nuxt/Testimonials.10OKVE1B.css"
  },
  "/_nuxt/TJyjLwWD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6a4-2hHCVvuzNu6B1prYt4seIDbVwkw\"",
    "mtime": "2024-05-10T14:05:11.957Z",
    "size": 1700,
    "path": "../public/_nuxt/TJyjLwWD.js"
  },
  "/_nuxt/U85K4Tt6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1ba-Wu8lCGdVSUBPpTSqrLSZQWlZ/LU\"",
    "mtime": "2024-05-10T14:05:11.957Z",
    "size": 442,
    "path": "../public/_nuxt/U85K4Tt6.js"
  },
  "/_nuxt/UtJ9WDkH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"103-Amyj5T6B1M5VdAzZTUFLulOo64Y\"",
    "mtime": "2024-05-10T14:05:11.973Z",
    "size": 259,
    "path": "../public/_nuxt/UtJ9WDkH.js"
  },
  "/_nuxt/vMmclrPG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"19d-qNVjRLIz9MH05bd3xIIV+n7wUbs\"",
    "mtime": "2024-05-10T14:05:11.935Z",
    "size": 413,
    "path": "../public/_nuxt/vMmclrPG.js"
  },
  "/_nuxt/WBvVYOfP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"115d-gdnes7sTYZUhI3KWJYrTZJ1Trxs\"",
    "mtime": "2024-05-10T14:05:11.971Z",
    "size": 4445,
    "path": "../public/_nuxt/WBvVYOfP.js"
  },
  "/_nuxt/wNaSizby.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"310-Z8Fz+SIhZkAjtAsY5Yf1EMT6lXc\"",
    "mtime": "2024-05-10T14:05:11.968Z",
    "size": 784,
    "path": "../public/_nuxt/wNaSizby.js"
  },
  "/_nuxt/XOkjwBjs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"242-0FeNMditr0LiGHgEINdNdjLhIyE\"",
    "mtime": "2024-05-10T14:05:11.981Z",
    "size": 578,
    "path": "../public/_nuxt/XOkjwBjs.js"
  },
  "/_nuxt/yXG_j9Iz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4d0-u69W8SPB/8Zk/McE1i9fT5kv128\"",
    "mtime": "2024-05-10T14:05:11.928Z",
    "size": 1232,
    "path": "../public/_nuxt/yXG_j9Iz.js"
  },
  "/_nuxt/zu2oJgjb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"519-y6fSI8guHTvYrLh72xoVh/vZDtg\"",
    "mtime": "2024-05-10T14:05:11.991Z",
    "size": 1305,
    "path": "../public/_nuxt/zu2oJgjb.js"
  },
  "/_nuxt/_i0fVDyV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3f7-/UtA4X58GIIrg5h2PYfxy0pA3rc\"",
    "mtime": "2024-05-10T14:05:11.950Z",
    "size": 1015,
    "path": "../public/_nuxt/_i0fVDyV.js"
  },
  "/_nuxt/builds/latest.json": {
    "type": "application/json",
    "etag": "\"47-nDOwQ8OSTCnY1Bzw2oQ+cwHOjCs\"",
    "mtime": "2024-05-10T14:05:27.653Z",
    "size": 71,
    "path": "../public/_nuxt/builds/latest.json"
  },
  "/_nuxt/builds/meta/3c63d3d5-939b-4051-8921-4e092e0b912e.json": {
    "type": "application/json",
    "etag": "\"8b-Wu/8xO4HqdaUKk4zmGztV0zv83M\"",
    "mtime": "2024-05-10T14:05:27.654Z",
    "size": 139,
    "path": "../public/_nuxt/builds/meta/3c63d3d5-939b-4051-8921-4e092e0b912e.json"
  }
};

const _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
  if (!input) {
    return input;
  }
  return input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}
const _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
const _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
function cwd() {
  if (typeof process !== "undefined" && typeof process.cwd === "function") {
    return process.cwd().replace(/\\/g, "/");
  }
  return "/";
}
const resolve = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--) {
    const path = index >= 0 ? arguments_[index] : cwd();
    if (!path || path.length === 0) {
      continue;
    }
    resolvedPath = `${path}/${resolvedPath}`;
    resolvedAbsolute = isAbsolute(path);
  }
  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);
  if (resolvedAbsolute && !isAbsolute(resolvedPath)) {
    return `/${resolvedPath}`;
  }
  return resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = null;
  for (let index = 0; index <= path.length; ++index) {
    if (index < path.length) {
      char = path[index];
    } else if (char === "/") {
      break;
    } else {
      char = "/";
    }
    if (char === "/") {
      if (lastSlash === index - 1 || dots === 1) ; else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = index;
            dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = index;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path.slice(lastSlash + 1, index)}`;
        } else {
          res = path.slice(lastSlash + 1, index);
        }
        lastSegmentLength = index - lastSlash - 1;
      }
      lastSlash = index;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
const isAbsolute = function(p) {
  return _IS_ABSOLUTE_RE.test(p);
};
const dirname = function(p) {
  const segments = normalizeWindowsPath(p).replace(/\/$/, "").split("/").slice(0, -1);
  if (segments.length === 1 && _DRIVE_LETTER_RE.test(segments[0])) {
    segments[0] += "/";
  }
  return segments.join("/") || (isAbsolute(p) ? "/" : ".");
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises$1.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta":{"maxAge":31536000},"/_nuxt/builds":{"maxAge":1},"/_nuxt":{"maxAge":31536000}};

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
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    setResponseHeader(event, "Vary", "Accept-Encoding");
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
      removeResponseHeader(event, "Cache-Control");
      throw createError$1({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
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

const _lazy_ZlXwsj = () => import('./routes/api/mail/sendMail.post.mjs');
const _lazy_b7xL0c = () => import('./routes/renderer.mjs').then(function (n) { return n.r; });

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/api/mail/sendMail', handler: _lazy_ZlXwsj, lazy: true, middleware: false, method: "post" },
  { route: '/__nuxt_error', handler: _lazy_b7xL0c, lazy: true, middleware: false, method: undefined },
  { route: '/_ipx/**', handler: _TXJbB1, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_b7xL0c, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((_err) => {
      console.error("Error while capturing another error", _err);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr$3(false),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      await nitroApp.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter({
    preemptive: true
  });
  const localCall = createCall(toNodeListener(h3App));
  const _localFetch = createFetch(localCall, globalThis.fetch);
  const localFetch = (input, init) => _localFetch(input, init).then(
    (response) => normalizeFetchResponse(response)
  );
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  h3App.use(
    eventHandler((event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const envContext = event.node.req?.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (envContext?.waitUntil) {
          envContext.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
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
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  for (const plugin of plugins) {
    try {
      plugin(app);
    } catch (err) {
      captureError(err, { tags: ["plugin"] });
      throw err;
    }
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const debug = (...args) => {
};
function GracefulShutdown(server, opts) {
  opts = opts || {};
  const options = Object.assign(
    {
      signals: "SIGINT SIGTERM",
      timeout: 3e4,
      development: false,
      forceExit: true,
      onShutdown: (signal) => Promise.resolve(signal),
      preShutdown: (signal) => Promise.resolve(signal)
    },
    opts
  );
  let isShuttingDown = false;
  const connections = {};
  let connectionCounter = 0;
  const secureConnections = {};
  let secureConnectionCounter = 0;
  let failed = false;
  let finalRun = false;
  function onceFactory() {
    let called = false;
    return (emitter, events, callback) => {
      function call() {
        if (!called) {
          called = true;
          return Reflect.apply(callback, this, arguments);
        }
      }
      for (const e of events) {
        emitter.on(e, call);
      }
    };
  }
  const signals = options.signals.split(" ").map((s) => s.trim()).filter((s) => s.length > 0);
  const once = onceFactory();
  once(process, signals, (signal) => {
    shutdown(signal).then(() => {
      if (options.forceExit) {
        process.exit(failed ? 1 : 0);
      }
    }).catch((err) => {
      process.exit(1);
    });
  });
  function isFunction(functionToCheck) {
    const getType = Object.prototype.toString.call(functionToCheck);
    return /^\[object\s([A-Za-z]+)?Function]$/.test(getType);
  }
  function destroy(socket, force = false) {
    if (socket._isIdle && isShuttingDown || force) {
      socket.destroy();
      if (socket.server instanceof http.Server) {
        delete connections[socket._connectionId];
      } else {
        delete secureConnections[socket._connectionId];
      }
    }
  }
  function destroyAllConnections(force = false) {
    for (const key of Object.keys(connections)) {
      const socket = connections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        destroy(socket);
      }
    }
    for (const key of Object.keys(secureConnections)) {
      const socket = secureConnections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        destroy(socket);
      }
    }
  }
  server.on("request", function(req, res) {
    req.socket._isIdle = false;
    if (isShuttingDown && !res.headersSent) {
      res.setHeader("connection", "close");
    }
    res.on("finish", function() {
      req.socket._isIdle = true;
      destroy(req.socket);
    });
  });
  server.on("connection", function(socket) {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = connectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      connections[id] = socket;
      socket.once("close", () => {
        delete connections[socket._connectionId];
      });
    }
  });
  server.on("secureConnection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = secureConnectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      secureConnections[id] = socket;
      socket.once("close", () => {
        delete secureConnections[socket._connectionId];
      });
    }
  });
  process.on("close", function() {
  });
  function shutdown(sig) {
    function cleanupHttp() {
      destroyAllConnections();
      return new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) {
            return reject(err);
          }
          return resolve(true);
        });
      });
    }
    if (options.development) {
      return process.exit(0);
    }
    function finalHandler() {
      if (!finalRun) {
        finalRun = true;
        if (options.finally && isFunction(options.finally)) {
          options.finally();
        }
      }
      return Promise.resolve();
    }
    function waitForReadyToShutDown(totalNumInterval) {
      if (totalNumInterval === 0) {
        debug(
          `Could not close connections in time (${options.timeout}ms), will forcefully shut down`
        );
        return Promise.resolve(true);
      }
      const allConnectionsClosed = Object.keys(connections).length === 0 && Object.keys(secureConnections).length === 0;
      if (allConnectionsClosed) {
        return Promise.resolve(false);
      }
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(waitForReadyToShutDown(totalNumInterval - 1));
        }, 250);
      });
    }
    if (isShuttingDown) {
      return Promise.resolve();
    }
    return options.preShutdown(sig).then(() => {
      isShuttingDown = true;
      cleanupHttp();
    }).then(() => {
      const pollIterations = options.timeout ? Math.round(options.timeout / 250) : 0;
      return waitForReadyToShutDown(pollIterations);
    }).then((force) => {
      if (force) {
        destroyAllConnections(force);
      }
      return options.onShutdown(sig);
    }).then(finalHandler).catch((err) => {
      const errString = typeof err === "string" ? err : JSON.stringify(err);
      failed = true;
      throw errString;
    });
  }
  function shutdownManual() {
    return shutdown("manual");
  }
  return shutdownManual;
}

function getGracefulShutdownConfig() {
  return {
    disabled: !!process.env.NITRO_SHUTDOWN_DISABLED,
    signals: (process.env.NITRO_SHUTDOWN_SIGNALS || "SIGTERM SIGINT").split(" ").map((s) => s.trim()),
    timeout: Number.parseInt(process.env.NITRO_SHUTDOWN_TIMEOUT, 10) || 3e4,
    forceExit: !process.env.NITRO_SHUTDOWN_NO_FORCE_EXIT
  };
}
function setupGracefulShutdown(listener, nitroApp) {
  const shutdownConfig = getGracefulShutdownConfig();
  if (shutdownConfig.disabled) {
    return;
  }
  GracefulShutdown(listener, {
    signals: shutdownConfig.signals.join(" "),
    timeout: shutdownConfig.timeout,
    forceExit: shutdownConfig.forceExit,
    onShutdown: async () => {
      await new Promise((resolve) => {
        const timeout = setTimeout(() => {
          console.warn("Graceful shutdown timeout, force exiting...");
          resolve();
        }, shutdownConfig.timeout);
        nitroApp.hooks.callHook("close").catch((err) => {
          console.error(err);
        }).finally(() => {
          clearTimeout(timeout);
          resolve();
        });
      });
    }
  });
}

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr$3(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const path = process.env.NITRO_UNIX_SOCKET;
const listener = server.listen(path ? { path } : { port, host }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const addressInfo = listener.address();
  if (typeof addressInfo === "string") {
    console.log(`Listening on unix socket ${addressInfo}`);
    return;
  }
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${addressInfo.family === "IPv6" ? `[${addressInfo.address}]` : addressInfo.address}:${addressInfo.port}${baseURL}`;
  console.log(`Listening on ${url}`);
});
trapUnhandledNodeErrors();
setupGracefulShutdown(listener, nitroApp);
const nodeServer = {};

export { $fetch as $, encodeParam as A, encodePath as B, withLeadingSlash as C, parseQuery as D, withTrailingSlash as E, withoutTrailingSlash as F, nodeServer as G, send as a, setResponseStatus as b, useNitroApp as c, defineEventHandler as d, eventHandler as e, setResponseHeaders as f, getResponseStatus as g, getQuery as h, createError$1 as i, joinRelativeURL as j, getRouteRules as k, getResponseStatusText as l, hasProtocol as m, isScriptProtocol as n, joinURL as o, parseURL as p, defu as q, readBody as r, setResponseHeader as s, sanitizeStatusCode as t, useRuntimeConfig as u, createHooks as v, withQuery as w, isSamePath as x, toRouteMatcher as y, createRouter$1 as z };
//# sourceMappingURL=runtime.mjs.map
