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

  // .design-sync/previews/ServiceCard.tsx
  var ServiceCard_exports = {};
  __export(ServiceCard_exports, {
    ServicesRow: () => ServicesRow,
    Single: () => Single,
    Tinted: () => Tinted
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

  // .design-sync/previews/ServiceCard.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var Single = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { maxWidth: 360 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    ds_exports.ServiceCard,
    {
      icon: "stethoscope",
      tone: "teal",
      title: "ליווי רפואי־חברתי",
      description: "הכוונה בהתנהלות מול בתי החולים, ליווי לפגישות, סיוע בבירוקרטיה וחיבור למשאבים — כדי שהמשפחה תוכל להתמקד בילד.",
      href: "#medical"
    }
  ) });
  var ServicesRow = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_exports.Grid, { columns: 4, minItemWidth: 220, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.ServiceCard, { icon: "stethoscope", tone: "teal", title: "ליווי רפואי־חברתי", description: "מחברים בין הצרכים הרפואיים לחיי היומיום.", href: "#1" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.ServiceCard, { icon: "heart-handshake", tone: "pink", title: "תמיכה רגשית", description: "ליווי פסיכולוגי לילד, להורים ולאחים.", href: "#2" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.ServiceCard, { icon: "party", tone: "yellow", title: "ימי כיף ואירועים", description: "שמחה, חברים והפוגה מהשגרה הרפואית.", href: "#3" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.ServiceCard, { icon: "wallet", tone: "navy", title: "סיוע במימון טיפולים", description: "עזרה בתרופות ובטיפולים מצילי חיים.", href: "#4" })
  ] });
  var Tinted = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_exports.Grid, { columns: 3, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.ServiceCard, { variant: "tinted", icon: "users", tone: "pink", title: "מתנדבים בבית ובבית החולים", description: "נוכחות קבועה ואוהבת לצד הילד והמשפחה." }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.ServiceCard, { variant: "tinted", icon: "home", tone: "teal", title: "חיזוק המשפחה והקהילה", description: "מפגשים ופעילויות שמפחיתים בדידות." }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.ServiceCard, { variant: "tinted", icon: "tent", tone: "orange", title: "מחנות ונופשים", description: "ימים של חופש אמיתי, בארץ ובחו״ל." })
  ] });
  return __toCommonJS(ServiceCard_exports);
})();
export default __dsPreview;
