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

  // .design-sync/previews/Card.tsx
  var Card_exports = {};
  __export(Card_exports, {
    ClickableLink: () => ClickableLink,
    Composed: () => Composed,
    Tinted: () => Tinted,
    Variants: () => Variants
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

  // .design-sync/previews/Card.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var grid = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "var(--tl-space-5)" };
  var Variants = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: grid, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_exports.Card, { variant: "elevated", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Heading, { level: 4, children: "elevated" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Paragraph, { size: "sm", tone: "secondary", children: "לבן עם צל רך — ברירת המחדל." })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_exports.Card, { variant: "outlined", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Heading, { level: 4, children: "outlined" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Paragraph, { size: "sm", tone: "secondary", children: "מסגרת דקה, בלי צל." })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_exports.Card, { variant: "navy", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Heading, { level: 4, children: "navy" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Paragraph, { size: "sm", tone: "secondary", children: "משטח כהה של המותג." })
    ] })
  ] });
  var Tinted = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: grid, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Card, { variant: "tinted", tone: "sky", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Heading, { level: 4, children: "sky" }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Card, { variant: "tinted", tone: "blush", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Heading, { level: 4, children: "blush" }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Card, { variant: "tinted", tone: "sun", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Heading, { level: 4, children: "sun" }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Card, { variant: "tinted", tone: "mint", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Heading, { level: 4, children: "mint" }) })
  ] });
  var Composed = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { maxWidth: 420 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Card, { padding: "lg", radius: "xl", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_exports.Stack, { gap: 4, align: "start", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { color: "var(--tl-color-teal-600)" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Icon, { name: "hand-heart", size: "xl", strokeWidth: 1.75 }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Heading, { level: 3, children: "רוצים להתנדב?" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Paragraph, { tone: "secondary", children: "שעה בשבוע שלכם היא עולם ומלואו לילד שמחכה לביקור. נשמח להכיר." }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Button, { variant: "secondary", iconEnd: "arrow-forward", children: "לטופס ההתנדבות" })
  ] }) }) });
  var ClickableLink = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { maxWidth: 360 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Card, { href: "#about", variant: "outlined", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_exports.Stack, { gap: 2, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Heading, { level: 4, children: "הסיפור של העמותה" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Paragraph, { size: "sm", tone: "secondary", children: "כל הכרטיס הוא קישור אחד — מתרומם מעט במעבר עכבר." })
  ] }) }) });
  return __toCommonJS(Card_exports);
})();
export default __dsPreview;
