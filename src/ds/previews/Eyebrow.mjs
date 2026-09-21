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

  // .design-sync/previews/Eyebrow.tsx
  var Eyebrow_exports = {};
  __export(Eyebrow_exports, {
    AboveHeading: () => AboveHeading,
    OnDark: () => OnDark,
    Tones: () => Tones,
    WithIcon: () => WithIcon
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

  // .design-sync/previews/Eyebrow.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var AboveHeading = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "grid", gap: "var(--tl-space-3)", justifyItems: "start" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Eyebrow, { children: "הפעילות שלנו" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Heading, { level: 2, children: "מעטפת מלאה לילד ולמשפחה" })
  ] });
  var Tones = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "grid", gap: "var(--tl-space-3)", justifyItems: "start" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Eyebrow, { tone: "pink", children: "סיפורי משפחות" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Eyebrow, { tone: "teal", children: "ליווי רפואי־חברתי" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Eyebrow, { tone: "navy", children: "שקיפות ואישורים" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Eyebrow, { tone: "orange", children: "אירועים קרובים" })
  ] });
  var WithIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "grid", gap: "var(--tl-space-3)", justifyItems: "start" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Eyebrow, { icon: "calendar-heart", tone: "teal", children: "יום כיף · 14 באפריל" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Eyebrow, { icon: "hand-heart", children: "התנדבות" })
  ] });
  var OnDark = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "tl-on-dark", style: { display: "grid", gap: "var(--tl-space-3)", justifyItems: "start", padding: "var(--tl-space-8)", borderRadius: "var(--tl-radius-lg)", background: "var(--tl-color-bg-inverse)" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Eyebrow, { tone: "inverse", children: "ההשפעה שלנו" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Heading, { level: 2, children: "1,250 משפחות כבר לא לבד" })
  ] });
  return __toCommonJS(Eyebrow_exports);
})();
export default __dsPreview;
