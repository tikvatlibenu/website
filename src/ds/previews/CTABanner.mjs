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

  // .design-sync/previews/CTABanner.tsx
  var CTABanner_exports = {};
  __export(CTABanner_exports, {
    MintCentered: () => MintCentered,
    Navy: () => Navy,
    PinkDonationPush: () => PinkDonationPush,
    SunInline: () => SunInline
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

  // .design-sync/previews/CTABanner.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var Navy = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    ds_exports.CTABanner,
    {
      title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        "תרמו ",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Highlight, { children: "תקווה" }),
        " — עזרו לילדים להמשיך להילחם"
      ] }),
      description: "כל תרומה מחזקת את הילדים ואת משפחותיהם, ומוכרת לצורכי מס לפי סעיף 46.",
      primaryAction: { label: "לתרומה מאובטחת", href: "#donate", icon: "heart" },
      secondaryAction: { label: "דרכים נוספות לעזור", href: "#help" }
    }
  );
  var PinkDonationPush = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    ds_exports.CTABanner,
    {
      tone: "pink",
      title: "₪180 מממנים יום כיף שלם לילד ולמשפחתו",
      description: "הצטרפו ל־1,900 תורמים קבועים שמאפשרים לנו לתכנן קדימה.",
      primaryAction: { label: "להצטרפות כתורם קבוע", href: "#monthly", icon: "repeat" }
    }
  );
  var MintCentered = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    ds_exports.CTABanner,
    {
      tone: "mint",
      layout: "centered",
      title: "רוצים להתנדב? נשמח להכיר",
      description: "השאירו פרטים ורכזת המתנדבים תחזור אליכם תוך יומיים.",
      primaryAction: { label: "לטופס ההתנדבות", href: "#volunteer", icon: "hand-heart" }
    }
  );
  var SunInline = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    ds_exports.CTABanner,
    {
      tone: "sun",
      title: "הישארו מעודכנים",
      description: "פעם בחודש: סיפורים, אירועים קרובים ודרכים לעזור.",
      primaryAction: { label: "להרשמה לניוזלטר", href: "#newsletter", icon: "mail" }
    }
  );
  return __toCommonJS(CTABanner_exports);
})();
export default __dsPreview;
