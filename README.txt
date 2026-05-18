TRADER DRILL — install guide
============================

This folder is a complete offline PWA. Five files:
  index.html              the app
  sw.js                   service worker (offline cache)
  manifest.webmanifest    PWA metadata
  icon-192.png            app icon
  icon-512.png            app icon (large)

The service worker needs http(s) — it will NOT run from a file:// URL.
Two ways to use it:

A) QUICK — no hosting (service worker stays dormant, app still 100% offline)
   AirDrop/email index.html to your phone, open in Safari, Share >
   Add to Home Screen. Works fully offline because everything is in
   the one file. You just don't get service-worker cache hardening.

B) PROPER PWA — GitHub Pages (~5 min, one time)
   1. Create a new GitHub repo, e.g. "trader-drill".
   2. Upload all five files to the repo root.
   3. Repo Settings > Pages > Source: "Deploy from a branch",
      branch "main", folder "/ (root)". Save.
   4. Wait ~1 min, then open the URL it gives you
      (https://<you>.github.io/trader-drill/) in Safari.
   5. Share > Add to Home Screen.
   Now the service worker registers, the app is cached, and it
   survives iOS clearing its web data.

History and settings are stored on-device (localStorage). The
Export button in Settings dumps all sessions to JSON as a backup.
