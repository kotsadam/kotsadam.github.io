// =====================================================================
//  site.js — small progressive enhancement for kotsadam.github.io
//
//  1. Opens external links and file downloads (PDF, ZIP, …) in a new tab,
//     so visitors keep the site open while reading a paper or a journal page.
//     Internal navigation (About / Publications / Work in progress / CV page)
//     is left in the SAME tab on purpose — forcing site navigation into new
//     tabs is a usability/accessibility anti-pattern (tab clutter, breaks the
//     Back button). Flip NEW_TAB_INTERNAL to true if you really want all links
//     to open in new tabs.
//
//  2. Records file downloads and outbound clicks as GoatCounter events
//     (cookieless, no personal data), so they appear in your dashboard:
//       download-<filename>     e.g. download-cv-andreas-kotsadam.pdf
//       outbound-<hostname>     e.g. outbound-onlinelibrary.wiley.com
//     GitHub Pages has no server logs, and GoatCounter's default pageview
//     ping never sees these clicks, so without this they are invisible.
// =====================================================================
(function () {
  "use strict";

  var NEW_TAB_INTERNAL = false;                 // set true to new-tab site nav too
  var host = location.hostname;

  // treat these extensions as downloadable files
  var FILE_RE = /\.(pdf|zip|docx?|xlsx?|pptx?|csv|txt|heic)(\?.*)?$/i;

  function isFile(href) {
    return FILE_RE.test(href) || /(^|\/)files\//.test(href);
  }

  function fireEvent(path, title) {
    if (window.goatcounter && typeof window.goatcounter.count === "function") {
      window.goatcounter.count({ path: path, title: title, event: true });
    }
  }

  var links = document.querySelectorAll("a[href]");
  for (var i = 0; i < links.length; i++) {
    (function (a) {
      var raw = a.getAttribute("href") || "";
      if (!raw || raw.charAt(0) === "#" || raw.indexOf("mailto:") === 0) return;

      var file = isFile(raw);
      // a.hostname resolves relative URLs against the current page, so a
      // relative "files/x.pdf" reports the site's own host (not external).
      var external = a.hostname && a.hostname !== host;

      if (file || external || NEW_TAB_INTERNAL) {
        a.target = "_blank";
        a.rel = (a.rel ? a.rel + " " : "") + "noopener";
      }

      a.addEventListener("click", function () {
        if (file) {
          var name = raw.split("/").pop().split("?")[0];
          fireEvent("download-" + name, "Download: " + name);
        } else if (external) {
          fireEvent("outbound-" + a.hostname, "Outbound: " + a.hostname);
        }
      });
    })(links[i]);
  }
})();
