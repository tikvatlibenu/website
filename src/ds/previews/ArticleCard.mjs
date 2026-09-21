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

  // .design-sync/previews/ArticleCard.tsx
  var ArticleCard_exports = {};
  __export(ArticleCard_exports, {
    BlogGrid: () => BlogGrid,
    Horizontal: () => Horizontal,
    Vertical: () => Vertical
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

  // .design-sync/previews/ArticleCard.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var Vertical = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { maxWidth: 380 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    ds_exports.ArticleCard,
    {
      href: "#article",
      category: "מדריכים להורים",
      date: "12 במרץ 2026",
      readingTime: "4 דק׳ קריאה",
      title: "איך מדברים עם ילדים על המחלה של אח או אחות",
      excerpt: "האחים חווים את ההתמודדות לא פחות מהילד החולה. אספנו עצות מעשיות מהצוות הפסיכולוגי של העמותה לשיחה פתוחה, כנה ומותאמת גיל."
    }
  ) });
  var Horizontal = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    ds_exports.ArticleCard,
    {
      layout: "horizontal",
      href: "#article",
      category: "סיפורי משפחות",
      date: "2 בפברואר 2026",
      title: "הסיפור של הילה: שנה של טיפולים, והחיוך שחזר",
      excerpt: "כשהילה בת השבע אובחנה, המשפחה מצאה את עצמה בעולם חדש ומפחיד. אמא שלה מספרת על הליווי, על המתנדבים ועל היום שבו הילה חזרה לרקוד.",
      ctaLabel: "לסיפור המלא"
    }
  );
  var BlogGrid = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_exports.Grid, { columns: 3, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.ArticleCard, { href: "#1", category: "ליווי רפואי", date: "20 במרץ 2026", title: "ליווי רפואי־חברתי: לא רק טיפולים", excerpt: "גישה אנושית שמבינה את עומק הקושי ומחברת בין הגוף, הנפש והקהילה." }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.ArticleCard, { href: "#2", category: "תמיכה רגשית", date: "8 במרץ 2026", title: "תמיכה פסיכולוגית לילדים עם CP", excerpt: "התמודדות רגשית עם שיתוק מוחין דורשת הרבה יותר מאבחנה וטיפול רפואי." }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.ArticleCard, { href: "#3", category: "ימי כיף", date: "1 במרץ 2026", title: "רגעים שמחזירים את האור לחיים", excerpt: "למה אירועים חברתיים הם חלק בלתי נפרד מתהליך ההחלמה של ילדים." })
  ] });
  return __toCommonJS(ArticleCard_exports);
})();
export default __dsPreview;
