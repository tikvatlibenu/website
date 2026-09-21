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

  // .design-sync/previews/IconButton.tsx
  var IconButton_exports = {};
  __export(IconButton_exports, {
    CarouselArrows: () => CarouselArrows,
    Sizes: () => Sizes,
    SocialOnDark: () => SocialOnDark,
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

  // .design-sync/previews/IconButton.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var row = { display: "flex", flexWrap: "wrap", gap: "var(--tl-space-3)", alignItems: "center" };
  var Variants = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: row, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.IconButton, { icon: "heart", label: "הוספה למועדפים", variant: "primary" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.IconButton, { icon: "search", label: "חיפוש", variant: "secondary" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.IconButton, { icon: "share", label: "שיתוף", variant: "outline" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.IconButton, { icon: "play", label: "ניגון", variant: "soft" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.IconButton, { icon: "close", label: "סגירה", variant: "ghost" })
  ] });
  var Sizes = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: row, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.IconButton, { icon: "menu", label: "תפריט", variant: "outline", size: "sm" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.IconButton, { icon: "menu", label: "תפריט", variant: "outline", size: "md" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.IconButton, { icon: "menu", label: "תפריט", variant: "outline", size: "lg" })
  ] });
  var CarouselArrows = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: row, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.IconButton, { icon: "chevron-back", label: "הקודם", variant: "outline" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.IconButton, { icon: "chevron-forward", label: "הבא", variant: "outline" })
  ] });
  var SocialOnDark = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "tl-on-dark", style: { ...row, padding: "var(--tl-space-6)", borderRadius: "var(--tl-radius-lg)", background: "var(--tl-color-bg-inverse)" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.IconButton, { icon: "facebook", label: "פייסבוק", variant: "inverse", href: "https://facebook.com", target: "_blank" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.IconButton, { icon: "instagram", label: "אינסטגרם", variant: "inverse", href: "https://instagram.com", target: "_blank" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.IconButton, { icon: "youtube", label: "יוטיוב", variant: "inverse", href: "https://youtube.com", target: "_blank" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.IconButton, { icon: "whatsapp", label: "וואטסאפ", variant: "inverse", href: "https://wa.me/972500000000", target: "_blank" })
  ] });
  return __toCommonJS(IconButton_exports);
})();
export default __dsPreview;
