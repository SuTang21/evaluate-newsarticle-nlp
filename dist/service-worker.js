importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-core.prod.js"
);

if (!self.define) {
  let e,
    t = {};
  const i = (i, n) => (
    (i = new URL(i + ".js", n).href),
    t[i] ||
      new Promise((t) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = i), (e.onload = t), document.head.appendChild(e);
        } else (e = i), importScripts(i), t();
      }).then(() => {
        let e = t[i];
        if (!e) throw new Error(`Module ${i} didn’t register its module`);
        return e;
      })
  );
  self.define = (n, o) => {
    const r =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (t[r]) return;
    let s = {};
    const c = (e) => i(e, r),
      d = { module: { uri: r }, exports: s, require: c };
    t[r] = Promise.all(n.map((e) => d[e] || c(e))).then((e) => (o(...e), s));
  };
}
define(["./workbox-24d5432a"], function (e) {
  "use strict";
  workbox.core.skipWaiting();

  //   self.skipWaiting(),
  workbox.core.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(["./index.html", "main.js"]);
  // e.precacheAndRoute(
  //   [
  //     { url: "./index.html", revision: "5cfb10a3295c7706b043e58081361de5" },
  //     { url: "main.js", revision: "fa7da9999e968c3894cbdbeede099440" },
  //   ]
  //   //   {}
  // );
});
