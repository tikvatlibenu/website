/*
 * Generated from the Tikvat Libenu design-system export (@tikvat-libenu/ui@0.1.0).
 * Do not edit by hand — re-run scripts/convert-design-system.mjs.
 */
import * as __React from 'react';
import __TikvatUI from '../tikvat-ui.mjs';

const __dsPreview = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res, err) => function __init() {
    if (err) throw err[0];
    try {
      return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    } catch (e) {
      throw err = [e], e;
    }
  };
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // <define:import.meta.env>
  var init_define_import_meta_env = __esm({
    "<define:import.meta.env>"() {
    }
  });

  // ds-raw:__ds_raw__
  var require_ds_raw = __commonJS({
    "ds-raw:__ds_raw__"(exports, module) {
      init_define_import_meta_env();
      module.exports = __TikvatUI;
    }
  });

  // shim:react-shim
  var require_react_shim = __commonJS({
    "shim:react-shim"(exports, module) {
      init_define_import_meta_env();
      var R = Object.assign({}, __React.default, __React);
      function np(p, k) {
        var o = {};
        for (var x in p) if (x !== "children") o[x] = p[x];
        if (k !== void 0) o.key = k;
        return o;
      }
      function jsx2(t, p, k) {
        var c = p && p.children;
        return c === void 0 ? R.createElement(t, np(p, k)) : R.createElement(t, np(p, k), c);
      }
      function jsxs2(t, p, k) {
        return R.createElement.apply(R, [t, np(p, k)].concat(p.children));
      }
      module.exports = R;
      module.exports.jsx = jsx2;
      module.exports.jsxs = jsxs2;
      module.exports.jsxDEV = function(t, p, k, s) {
        return (s ? jsxs2 : jsx2)(t, p, k);
      };
      module.exports.Fragment = R.Fragment;
    }
  });

  // .design-sync/previews/Icon.tsx
  var Icon_exports = {};
  __export(Icon_exports, {
    CareAndCommunity: () => CareAndCommunity,
    ContactAndSocial: () => ContactAndSocial,
    GivingAndDocuments: () => GivingAndDocuments,
    InterfaceAndDirection: () => InterfaceAndDirection,
    Medical: () => Medical,
    Sizes: () => Sizes
  });
  init_define_import_meta_env();

  // ds-shim:ds
  var ds_exports = {};
  __export(ds_exports, {
    default: () => ds_default
  });
  init_define_import_meta_env();
  __reExport(ds_exports, __toESM(require_ds_raw()));
  var g = __TikvatUI;
  var ds_default = "default" in g ? g.default : g;

  // .design-sync/previews/Icon.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var Set = ({ names, color }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(84px, 1fr))", gap: "var(--tl-space-4)", color: color ?? "var(--tl-color-text)" }, children: names.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "grid", justifyItems: "center", gap: 6 }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Icon, { name: n, size: "lg" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { dir: "ltr", style: { fontSize: 11, color: "var(--tl-color-text-muted)" }, children: n })
  ] }, n)) });
  var CareAndCommunity = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Set, { color: "var(--tl-color-pink-600)", names: ["heart", "hand-heart", "heart-handshake", "ribbon", "gift", "sparkles", "smile", "sun", "party", "home", "users", "baby"] });
  var Medical = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Set, { color: "var(--tl-color-teal-700)", names: ["stethoscope", "hospital", "pill", "brain", "activity", "heart-pulse", "ambulance", "accessibility"] });
  var ContactAndSocial = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Set, { names: ["phone", "mail", "map-pin", "message", "whatsapp", "facebook", "instagram", "youtube", "globe"] });
  var GivingAndDocuments = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Set, { color: "var(--tl-color-navy-600)", names: ["wallet", "credit-card", "banknote", "repeat", "percent", "target", "receipt", "file-text", "shield-check", "badge-check", "award", "lock"] });
  var InterfaceAndDirection = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Set, { names: ["arrow-forward", "arrow-back", "chevron-forward", "chevron-back", "chevron-down", "menu", "close", "search", "plus", "check", "download", "external-link", "play", "calendar", "clock", "info"] });
  var Sizes = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: "var(--tl-space-5)", color: "var(--tl-color-pink-500)" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Icon, { name: "heart", size: "xs" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Icon, { name: "heart", size: "sm" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Icon, { name: "heart", size: "md" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Icon, { name: "heart", size: "lg" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Icon, { name: "heart", size: "xl" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Icon, { name: "heart", size: "2xl", strokeWidth: 1.5 })
  ] });
  return __toCommonJS(Icon_exports);
})();
export default __dsPreview;
