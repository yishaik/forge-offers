/* Forge — heuristic parser + builder. No LLM. */
(function (root) {
  "use strict";

  var I18N = {
    en: {
      navCta: "Open the forge",
      kicker: "Tel Aviv · offers, not decks",
      hero: "Paste the job.<br>Send a priced page.<br><em>Get paid.</em>",
      sub: "Service businesses lose the deal in the 24 hours they spend writing a quote. Forge turns a WhatsApp dump into a client-ready offer in 30 seconds.",
      cta: "Forge an offer",
      howLink: "How it works",
      howKicker: "Three moves",
      howTitle: "From a messy brief to a yes",
      s1t: "The dump",
      s1p: "WhatsApp threads. Voice-to-text. Half a sentence on price. Paste it as-is — Hebrew, English, or both.",
      s2t: "The page",
      s2p: "Line items, timeline, optional VAT, a date it expires. A page the client can approve from their phone.",
      s3t: "The money",
      s3p: "Share a link. They approve while the yes is still warm. You send the invoice the same hour.",
      whyKicker: "Why now",
      whyTitle: "The quote is the product",
      w1t: "Speed is the close",
      w1p: "A cleaner PDF tomorrow loses to a priced page tonight. Forge is built for the hour after the call, not the weekend after.",
      w2t: "A page, not a file",
      w2p: "Clients open links. They do not hunt attachments. Approve and request-change live on the same sheet you sent.",
      priceKicker: "Simple on purpose",
      priceTitle: "Pricing",
      freeName: "Free",
      proName: "Pro",
      perMo: "/ mo",
      free1: "5 offers a month",
      free2: "Shareable client page",
      free3: "English + Hebrew",
      pro1: "Unlimited offers",
      pro2: "Your mark on the page",
      pro3: "Hebrew + English",
      payNote: "Payments (Bit / card) come after we license an Israeli acquirer. The page is free to send.",
      footCta: "Forge an offer",
      back: "Home",
      builderKicker: "Builder",
      builderTitle: "Paste the job",
      builderSub: "No model in the loop. We read prices, time, and deliverables — you edit the rest.",
      briefLabel: "Messy brief",
      sampleHe: "Sample · Hebrew / ₪",
      sampleEn: "Sample · English / $",
      bizLabel: "Your business",
      clientLabel: "Client",
      curLabel: "Currency",
      langLabel: "Offer language",
      emailLabel: "Your email",
      vatLabel: "Add VAT 17%",
      forgeBtn: "Forge offer",
      addLine: "Add line",
      linesKicker: "Line items — edit freely",
      previewKicker: "Live preview",
      previewTitle: "What they open",
      copyLink: "Copy shareable link",
      openClient: "Open client view",
      validNote: "Offers expire 7 days from forge.",
      print: "Print",
      emptyTitle: "This link has no offer yet",
      emptyBody: "Open the builder, forge a page, then copy the shareable link.",
      emptyCta: "Go to the builder",
      offerTitle: "Offer",
      from: "From",
      for: "For",
      item: "Item",
      qty: "Qty",
      price: "Price",
      amount: "Amount",
      subtotal: "Subtotal",
      vat: "VAT 17%",
      total: "Total",
      timeline: "Timeline",
      validUntil: "Valid until",
      approve: "Approve offer",
      change: "Request a change",
      approved: "Approved",
      approvedBody: "Thank you. A note is ready in your mail client — send it so they can invoice.",
      sendMail: "Send the yes",
      copied: "Link copied",
      copyFail: "Copy failed — the link is in the address bar of the client view.",
      needOffer: "Forge the offer first.",
      lineFallback: "Scope item",
      days: "days",
      weeks: "weeks",
      newItem: "New line"
    },
    he: {
      navCta: "פתחו את הפורג׳",
      kicker: "תל אביב · הצעות, לא מצגות",
      hero: "הדביקו את העבודה.<br>שלחו עמוד מתומחר.<br><em>קבלו תשלום.</em>",
      sub: "עסקי שירות מפסידים את העסקה ב־24 השעות שהם כותבים הצעת מחיר. Forge הופך שרשור וואטסאפ לעמוד מוכן ללקוח ב־30 שניות.",
      cta: "צרו הצעה",
      howLink: "איך זה עובד",
      howKicker: "שלושה מהלכים",
      howTitle: "מבריף מבולגן לאישור",
      s1t: "ההדבקה",
      s1p: "שרשורי וואטסאפ. תמלול קולי. חצי משפט על מחיר. מדביקים כמו שזה — עברית, אנגלית, או שניהם.",
      s2t: "העמוד",
      s2p: "שורות, לוח זמנים, מע״מ אם צריך, ותאריך תפוגה. עמוד שהלקוח מאשר מהטלפון.",
      s3t: "הכסף",
      s3p: "משתפים קישור. הם מאשרים כל עוד הכן חם. החשבונית יוצאת באותה שעה.",
      whyKicker: "למה עכשיו",
      whyTitle: "ההצעה היא המוצר",
      w1t: "מהירות סוגרת",
      w1p: "פי־די־אף נקי מחר מפסיד לעמוד מתומחר הלילה. Forge בנוי לשעה שאחרי השיחה, לא לסוף השבוע שאחרי.",
      w2t: "עמוד, לא קובץ",
      w2p: "לקוחות פותחים קישורים. הם לא מחפשים קבצים. אישור ובקשת שינוי חיים על אותו דף ששלחתם.",
      priceKicker: "פשוט בכוונה",
      priceTitle: "תמחור",
      freeName: "חינם",
      proName: "Pro",
      perMo: "/ חודש",
      free1: "5 הצעות בחודש",
      free2: "עמוד לקוח לשיתוף",
      free3: "עברית + אנגלית",
      pro1: "הצעות ללא הגבלה",
      pro2: "הסימן שלכם על העמוד",
      pro3: "עברית + אנגלית",
      payNote: "תשלומים (ביט / כרטיס) יגיעו אחרי שנקבל רישיון סליקה ישראלי. שליחת העמוד חינם.",
      footCta: "צרו הצעה",
      back: "בית",
      builderKicker: "בנאי",
      builderTitle: "הדביקו את העבודה",
      builderSub: "בלי מודל באמצע. אנחנו קוראים מחירים, זמן ותכולה — אתם עורכים את השאר.",
      briefLabel: "בריף מבולגן",
      sampleHe: "דוגמה · עברית / ₪",
      sampleEn: "דוגמה · אנגלית / $",
      bizLabel: "העסק שלכם",
      clientLabel: "לקוח",
      curLabel: "מטבע",
      langLabel: "שפת ההצעה",
      emailLabel: "המייל שלכם",
      vatLabel: "הוסיפו מע״מ 17%",
      forgeBtn: "צרו הצעה",
      addLine: "הוסיפו שורה",
      linesKicker: "שורות — ערכו חופשי",
      previewKicker: "תצוגה חיה",
      previewTitle: "מה הם פותחים",
      copyLink: "העתיקו קישור",
      openClient: "פתחו תצוגת לקוח",
      validNote: "ההצעה בתוקף 7 ימים מרגע היצירה.",
      print: "הדפיסו",
      emptyTitle: "לקישור הזה אין עדיין הצעה",
      emptyBody: "פתחו את הבנאי, צרו עמוד, והעתיקו את הקישור.",
      emptyCta: "לבנאי",
      offerTitle: "הצעת מחיר",
      from: "מאת",
      for: "עבור",
      item: "פריט",
      qty: "כמות",
      price: "מחיר",
      amount: "סכום",
      subtotal: "ביניים",
      vat: "מע״מ 17%",
      total: "סה״כ",
      timeline: "לוח זמנים",
      validUntil: "בתוקף עד",
      approve: "אשרו את ההצעה",
      change: "בקשו שינוי",
      approved: "אושר",
      approvedBody: "תודה. הודעה מוכנה במייל — שלחו כדי שיוכלו לחייב.",
      sendMail: "שלחו את האישור",
      copied: "הקישור הועתק",
      copyFail: "ההעתקה נכשלה — הקישור נפתח בתצוגת הלקוח.",
      needOffer: "צרו קודם את ההצעה.",
      lineFallback: "סעיף",
      days: "ימים",
      weeks: "שבועות",
      newItem: "שורה חדשה"
    }
  };

  var SAMPLES = {
    he: {
      brief:
        "היי, כאן דנה מ״קפה נווה צדק״.\n" +
        "צריכים אתר וורדפרס חדש + טופס הזמנות + שתי אוטומציות (וואטסאפ אחרי הזמנה, ומייל תזכורת).\n" +
        "תוך 3 שבועות אם אפשר. תקציב באזור 12,000₪ לפני מע״מ.\n" +
        "תודה!",
      biz: "סטודיו ברק",
      client: "קפה נווה צדק",
      currency: "ILS",
      lang: "he",
      email: "hello@barak.studio",
      vat: true
    },
    en: {
      brief:
        "Hey — Alex here, freelance designer.\n" +
        "Harbor & Co need a brand site + SEO. Homepage, about, work, contact.\n" +
        "Two weeks if we can. Budget around $4,800.\n" +
        "Thanks.",
      biz: "Alex Rivera Studio",
      client: "Harbor & Co",
      currency: "USD",
      lang: "en",
      email: "alex@rivera.studio",
      vat: false
    }
  };

  var WEIGHTS = [
    { re: /wordpress|וורדפרס|וורדפרס/i, w: 4, en: "WordPress site", he: "אתר וורדפרס" },
    { re: /brand\s*site|אתר\s*מותג|אתר\s*תדמית/i, w: 4, en: "Brand website", he: "אתר מותג" },
    { re: /\bseo\b|קידום|קידום אורגני/i, w: 2, en: "SEO setup", he: "הקמת SEO" },
    { re: /booking|הזמנ|טופס/i, w: 2, en: "Booking form", he: "טופס הזמנות" },
    { re: /automat|אוטומצ/i, w: 2, en: "Automations", he: "אוטומציות" },
    { re: /homepage|דף הבית/i, w: 1.2, en: "Homepage", he: "דף הבית" },
    { re: /landing|דף נחיתה/i, w: 2, en: "Landing page", he: "דף נחיתה" },
    { re: /shop|חנות|e-?comm/i, w: 3.5, en: "Online store", he: "חנות אונליין" },
    { re: /logo|לוגו/i, w: 1.5, en: "Logo", he: "לוגו" },
    { re: /branding\b|brand identity|מיתוג/i, w: 2.5, en: "Brand identity", he: "מיתוג" },
    { re: /copy|קופי|תוכן/i, w: 1.2, en: "Copywriting", he: "כתיבת תוכן" },
    { re: /photo|צילום/i, w: 1.5, en: "Photography", he: "צילום" },
    { re: /consult|ייעוץ/i, w: 2, en: "Consulting", he: "ייעוץ" }
  ];

  function $(sel, el) { return (el || document).querySelector(sel); }
  function $all(sel, el) { return Array.prototype.slice.call((el || document).querySelectorAll(sel)); }

  function t(key, lang) {
    lang = lang || currentUiLang();
    var pack = I18N[lang] || I18N.en;
    return pack[key] != null ? pack[key] : (I18N.en[key] || key);
  }

  function currentUiLang() {
    if (typeof document === "undefined") return "en";
    return document.documentElement.lang === "he" ? "he" : "en";
  }

  function applyI18n(lang) {
    var html = document.documentElement;
    html.lang = lang;
    html.dir = lang === "he" ? "rtl" : "ltr";
    $all("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"), lang);
    });
    $all("[data-i18n-html]").forEach(function (el) {
      el.innerHTML = t(el.getAttribute("data-i18n-html"), lang);
    });
    $all("[data-set-lang]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-set-lang") === lang ? "true" : "false");
    });
    try { localStorage.setItem("forge-lang", lang); } catch (e) {}
  }

  function money(n, currency, lang) {
    var cur = currency === "USD" ? "USD" : "ILS";
    var loc = lang === "he" ? "he-IL" : "en-US";
    try {
      return new Intl.NumberFormat(loc, {
        style: "currency",
        currency: cur,
        maximumFractionDigits: 0
      }).format(Math.round(n));
    } catch (e) {
      var sym = cur === "USD" ? "$" : "₪";
      return sym + Math.round(n).toLocaleString(loc);
    }
  }

  function addDays(iso, days) {
    var d = iso ? new Date(iso + "T12:00:00") : new Date();
    if (isNaN(d.getTime())) d = new Date();
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10);
  }

  function todayISO() {
    return new Date().toISOString().slice(0, 10);
  }

  function formatDate(iso, lang) {
    var d = new Date(iso + "T12:00:00");
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString(lang === "he" ? "he-IL" : "en-GB", {
      day: "numeric", month: "short", year: "numeric"
    });
  }

  function stripNoise(s) {
    return String(s || "").replace(/\s+/g, " ").trim();
  }

  function parsePrices(text) {
    var found = [];
    var re = /(?:₪\s*|\$\s*)(\d{1,3}(?:[,\s]\d{3})+|\d+(?:\.\d+)?)|\b(\d{1,3}(?:[,\s]\d{3})+|\d{3,6})(?:\s*(?:₪|\$|ILS|USD|ש["״']?ח))/gi;
    var m;
    while ((m = re.exec(text))) {
      var raw = m[1] || m[2];
      var n = parseFloat(String(raw).replace(/[,\s]/g, ""));
      if (n >= 50 && n < 1e7) found.push(n);
    }
    return found;
  }

  function detectCurrency(text, fallback) {
    if (/₪|ש["״']?ח|\bILS\b/i.test(text)) return "ILS";
    if (/\$|\bUSD\b/.test(text)) return "USD";
    return fallback || "ILS";
  }

  function detectLang(text, fallback) {
    var he = (text.match(/[\u0590-\u05FF]/g) || []).length;
    var la = (text.match(/[A-Za-z]/g) || []).length;
    if (he > la && he > 8) return "he";
    if (la > he && la > 8) return "en";
    return fallback || "en";
  }

  function parseTimeline(text, lang) {
    var m;
    if (/שבועיים|two weeks/i.test(text)) return { n: 2, unit: "weeks" };
    if (/יומיים|two days/i.test(text)) return { n: 2, unit: "days" };
    m = text.match(/(\d+(?:\.\d+)?)\s*(weeks?|שבועות)/i);
    if (m) return { n: parseFloat(m[1]), unit: "weeks" };
    m = text.match(/(\d+(?:\.\d+)?)\s*(days?|ימים)/i);
    if (m) return { n: parseFloat(m[1]), unit: "days" };
    m = text.match(/תוך\s*(\d+)/);
    if (m) return { n: parseFloat(m[1]), unit: "weeks" };
    return { n: 2, unit: "weeks" };
  }

  function timelineLabel(tl, lang) {
    if (!tl) return "";
    var unit = tl.unit === "days" ? t("days", lang) : t("weeks", lang);
    return tl.n + " " + unit;
  }

  function splitDeliverables(text) {
    var lines = [];
    text.split(/\n+/).forEach(function (ln) {
      var s = ln.replace(/^[\s>*\-•·●◦]+/, "").trim();
      if (s.length > 2) lines.push(s);
    });
    var chunks = [];
    lines.forEach(function (ln) {
      ln.split(/\s*(?:\+|\/|,|;| and | ו(?=\S)| ו־| ו-)\s*/i).forEach(function (p) {
        p = stripNoise(p).replace(/[."“”]+$/g, "");
        if (p.length >= 3 && p.length < 80) chunks.push(p);
      });
    });
    return chunks;
  }

  function guessClient(text, fallback) {
    var m;
    m = text.match(/(?:client is|for)\s+([A-Z][\w&.'’\-]+(?:\s+[A-Z][\w&.'’\-]+){0,3})/);
    if (m) return m[1];
    m = text.match(/מ[״"]([^״"]+)[״"]/);
    if (m) return m[1];
    m = text.match(/אני\s+([א-ת]{2,12})/);
    if (m && !/צריך|רוצה|כאן/.test(m[1])) { /* person, not shop */ }
    return fallback || "";
  }

  function buildItems(text, lang, totalHint) {
    var items = [];
    var used = {};
    WEIGHTS.forEach(function (w) {
      if (w.re.test(text) && !used[w.en]) {
        used[w.en] = true;
        var name = lang === "he" ? w.he : w.en;
        var qty = 1;
        var qm = text.match(new RegExp("(\\d+)\\s*(?:" + w.re.source + ")", "i"));
        var two = /שתי|שניים|two/i.test(text) && /automat|אוטומצ/i.test(w.re.source);
        if (qm) qty = Math.min(6, parseInt(qm[1], 10) || 1);
        else if (two) qty = 2;
        items.push({ n: name, q: qty, p: 0, w: w.w });
      }
    });

    if (items.length < 2) {
      splitDeliverables(text).forEach(function (c) {
        if (items.length >= 6) return;
        if (/תקציב|budget|שבוע|week|יום|תודה|hey|היי|thanks/i.test(c)) return;
        if (c.length < 4) return;
        var dup = items.some(function (it) { return it.n === c; });
        if (!dup) items.push({ n: c, q: 1, p: 0, w: 1.4 });
      });
    }

    if (items.length < 2) {
      items = lang === "he"
        ? [{ n: "אפיון ואפיון דפים", q: 1, p: 0, w: 1.5 }, { n: "עיצוב ופיתוח", q: 1, p: 0, w: 3 }]
        : [{ n: "Discovery & IA", q: 1, p: 0, w: 1.5 }, { n: "Design & build", q: 1, p: 0, w: 3 }];
    }

    items = items.slice(0, 6);
    var weightSum = items.reduce(function (a, it) { return a + it.w * it.q; }, 0) || 1;
    var total = totalHint && totalHint > 0 ? totalHint : (items.length >= 3 ? 8000 : 4800);
    var assigned = 0;
    items.forEach(function (it, i) {
      var share = (it.w * it.q) / weightSum;
      var line = Math.round((total * share) / it.q / 10) * 10;
      if (line < 50) line = 50;
      it.p = line;
      assigned += line * it.q;
      delete it.w;
    });
    var drift = total - assigned;
    if (items.length && Math.abs(drift) >= 10) {
      var last = items[items.length - 1];
      last.p = Math.max(50, last.p + Math.round(drift / last.q / 10) * 10);
    }
    return items;
  }

  function parseBrief(raw, opts) {
    opts = opts || {};
    var text = String(raw || "").trim();
    var lang = opts.lang || detectLang(text, "en");
    var currency = opts.currency || detectCurrency(text, "ILS");
    var prices = parsePrices(text);
    var totalHint = prices.length ? prices[prices.length - 1] : 0;
    var items = buildItems(text, lang, totalHint);
    var tl = parseTimeline(text, lang);
    var created = todayISO();
    return {
      v: 1,
      biz: opts.biz || "",
      client: opts.client || guessClient(text, ""),
      email: opts.email || "",
      currency: currency,
      lang: lang,
      vat: !!opts.vat,
      items: items,
      timeline: timelineLabel(tl, lang),
      notes: "",
      validDays: 7,
      created: created
    };
  }

  function totalsOf(data) {
    var items = (data && data.items) || [];
    var sub = 0;
    items.forEach(function (it) {
      var q = Number(it.q) || 0;
      var p = Number(it.p) || 0;
      sub += q * p;
    });
    var vatAmt = data && data.vat ? Math.round(sub * 0.17) : 0;
    return { sub: sub, vat: vatAmt, total: sub + vatAmt };
  }

  function encodeOffer(data) {
    return encodeURIComponent(JSON.stringify(data));
  }

  function decodeOffer(raw) {
    if (!raw) return null;
    var s = raw.charAt(0) === "#" ? raw.slice(1) : raw;
    if (!s) return null;
    if (s.indexOf("e=") === 0) s = s.slice(2);
    try {
      var json = decodeURIComponent(s);
      var data = JSON.parse(json);
      if (!data || !data.items) return null;
      return data;
    } catch (e) {
      try {
        return JSON.parse(decodeURIComponent(decodeURIComponent(s)));
      } catch (e2) {
        return null;
      }
    }
  }

  function offerUrl(data) {
    var hash = encodeOffer(data);
    var base = "offer.html";
    if (typeof location !== "undefined") {
      var path = location.pathname.replace(/[^/]+$/, "");
      if (location.protocol === "http:" || location.protocol === "https:") {
        base = path + "offer.html";
      }
    }
    var origin = "";
    if (typeof location !== "undefined" && location.protocol !== "file:") {
      origin = location.origin || "";
    }
    return (origin ? origin : "") + (origin && base.charAt(0) !== "/" && base.indexOf("offer") !== 0 ? "" : "") + base + "#" + hash;
  }

  function shareableHref(data) {
    if (typeof location === "undefined") return "offer.html#" + encodeOffer(data);
    if (location.protocol === "file:") {
      return "offer.html#" + encodeOffer(data);
    }
    var u = new URL("offer.html", location.href);
    u.hash = encodeOffer(data);
    return u.href;
  }

  function persist(data) {
    try { localStorage.setItem("forge-offer", JSON.stringify(data)); } catch (e) {}
  }

  function loadPersisted() {
    try {
      var s = localStorage.getItem("forge-offer");
      return s ? JSON.parse(s) : null;
    } catch (e) { return null; }
  }

  function letterHTML(data, compact) {
    var lang = (data && data.lang) || currentUiLang();
    if (!data || !data.items || !data.items.length) {
      return '<p class="letter-empty">' + (lang === "he" ? "ההצעה תופיע כאן אחרי היצירה." : "The offer will land here after you forge it.") + "</p>";
    }
    var tot = totalsOf(data);
    var rows = data.items.map(function (it) {
      var amt = (Number(it.q) || 0) * (Number(it.p) || 0);
      return "<tr><td>" + esc(it.n) + "</td><td class='amt'>" + esc(String(it.q)) + "</td><td class='amt'>" +
        esc(money(amt, data.currency, lang)) + "</td></tr>";
    }).join("");
    var vatRow = data.vat
      ? "<div><span>" + t("vat", lang) + "</span><span>" + money(tot.vat, data.currency, lang) + "</span></div>"
      : "";
    var valid = formatDate(addDays(data.created || todayISO(), data.validDays || 7), lang);
    return (
      '<p class="kicker">Forge</p>' +
      "<h2>" + esc(t("offerTitle", lang)) + "</h2>" +
      '<div class="meta"><div>' + esc(t("from", lang)) + " " + esc(data.biz || "—") +
      "</div><div>" + esc(t("for", lang)) + " " + esc(data.client || "—") + "</div></div>" +
      "<table><thead><tr><th>" + esc(t("item", lang)) + "</th><th>" + esc(t("qty", lang)) +
      "</th><th>" + esc(t("amount", lang)) + "</th></tr></thead><tbody>" + rows + "</tbody></table>" +
      '<div class="totals">' +
      "<div><span>" + t("subtotal", lang) + "</span><span>" + money(tot.sub, data.currency, lang) + "</span></div>" +
      vatRow +
      '<div class="grand"><span>' + t("total", lang) + "</span><span>" + money(tot.total, data.currency, lang) + "</span></div>" +
      "</div>" +
      '<div class="foot">' + esc(t("timeline", lang)) + ": " + esc(data.timeline || "—") +
      " · " + esc(t("validUntil", lang)) + " " + esc(valid) + "</div>"
    );
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function toast(msg) {
    var el = $("#toast");
    if (!el) return;
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { el.hidden = true; }, 2200);
  }

  /* ——— Builder ——— */

  var state = {
    data: {
      v: 1, biz: "", client: "", email: "", currency: "ILS", lang: "en",
      vat: true, items: [], timeline: "", notes: "", validDays: 7, created: todayISO()
    }
  };

  function readForm() {
    return {
      biz: ($("#biz") && $("#biz").value) || "",
      client: ($("#client") && $("#client").value) || "",
      email: ($("#email") && $("#email").value) || "",
      currency: ($("#currency") && $("#currency").value) || "ILS",
      lang: ($("#olang") && $("#olang").value) || "en",
      vat: !!("#vat" && $("#vat") && $("#vat").checked)
    };
  }

  function fillForm(s) {
    if ($("#brief") && s.brief != null) $("#brief").value = s.brief;
    if ($("#biz")) $("#biz").value = s.biz || "";
    if ($("#client")) $("#client").value = s.client || "";
    if ($("#email")) $("#email").value = s.email || "";
    if ($("#currency")) $("#currency").value = s.currency || "ILS";
    if ($("#olang")) $("#olang").value = s.lang || "en";
    if ($("#vat")) $("#vat").checked = !!s.vat;
  }

  function renderLines() {
    var box = $("#lines");
    var wrap = $("#lines-wrap");
    if (!box) return;
    var items = state.data.items || [];
    wrap.hidden = items.length === 0;
    box.innerHTML = items.map(function (it, i) {
      return '<div class="line" data-i="' + i + '">' +
        '<input class="name" type="text" data-k="n" value="' + esc(it.n) + '">' +
        '<input type="number" min="1" step="1" data-k="q" value="' + esc(it.q) + '">' +
        '<input type="number" min="0" step="10" data-k="p" value="' + esc(it.p) + '">' +
        '<button type="button" class="icon" data-del="' + i + '" aria-label="Remove">×</button>' +
        "</div>";
    }).join("");
    renderTotals();
    renderPreview();
  }

  function renderTotals() {
    var el = $("#totals");
    if (!el) return;
    var tot = totalsOf(state.data);
    var lang = currentUiLang();
    var cur = state.data.currency;
    el.innerHTML =
      "<div><span>" + t("subtotal", lang) + "</span><span>" + money(tot.sub, cur, lang) + "</span></div>" +
      (state.data.vat ? "<div><span>" + t("vat", lang) + "</span><span>" + money(tot.vat, cur, lang) + "</span></div>" : "") +
      '<div class="grand"><span>' + t("total", lang) + "</span><span>" + money(tot.total, cur, lang) + "</span></div>";
  }

  function renderPreview() {
    var el = $("#preview");
    if (!el) return;
    el.innerHTML = letterHTML(state.data, true);
    el.dir = state.data.lang === "he" ? "rtl" : "ltr";
    el.lang = state.data.lang || "en";
  }

  function forgeFromBrief() {
    var form = readForm();
    var brief = ($("#brief") && $("#brief").value) || "";
    var parsed = parseBrief(brief, form);
    parsed.biz = form.biz || parsed.biz;
    parsed.client = form.client || parsed.client;
    parsed.email = form.email;
    parsed.currency = form.currency;
    parsed.lang = form.lang;
    parsed.vat = form.vat;
    if (!parsed.timeline) {
      parsed.timeline = timelineLabel({ n: 2, unit: "weeks" }, form.lang);
    }
    state.data = parsed;
    persist(parsed);
    renderLines();
  }

  function bindBuilder() {
    var brief = $("#brief");
    if (brief) {
      brief.placeholder = currentUiLang() === "he" ? "הדביקו את שרשור הוואטסאפ…" : "Paste the WhatsApp dump…";
    }
    $("#sample-he").addEventListener("click", function () {
      fillForm(SAMPLES.he);
      applyI18n("he");
      forgeFromBrief();
    });
    $("#sample-en").addEventListener("click", function () {
      fillForm(SAMPLES.en);
      applyI18n("en");
      forgeFromBrief();
    });
    $("#forge-btn").addEventListener("click", forgeFromBrief);
    $("#add-line").addEventListener("click", function () {
      state.data.items = state.data.items || [];
      state.data.items.push({ n: t("newItem"), q: 1, p: 0 });
      persist(state.data);
      renderLines();
    });
    $("#lines").addEventListener("input", function (e) {
      var row = e.target.closest(".line");
      if (!row) return;
      var i = Number(row.getAttribute("data-i"));
      var k = e.target.getAttribute("data-k");
      if (!state.data.items[i] || !k) return;
      var val = e.target.value;
      state.data.items[i][k] = k === "n" ? val : Number(val);
      persist(state.data);
      renderTotals();
      renderPreview();
    });
    $("#lines").addEventListener("click", function (e) {
      var btn = e.target.closest("[data-del]");
      if (!btn) return;
      var i = Number(btn.getAttribute("data-del"));
      state.data.items.splice(i, 1);
      persist(state.data);
      renderLines();
    });
    ["biz", "client", "email", "currency", "olang", "vat"].forEach(function (id) {
      var el = $("#" + id);
      if (!el) return;
      el.addEventListener("change", function () {
        var f = readForm();
        state.data.biz = f.biz;
        state.data.client = f.client;
        state.data.email = f.email;
        state.data.currency = f.currency;
        state.data.lang = f.lang;
        state.data.vat = f.vat;
        persist(state.data);
        renderTotals();
        renderPreview();
      });
    });
    $("#copy-link").addEventListener("click", function () {
      if (!state.data.items || !state.data.items.length) {
        toast(t("needOffer"));
        return;
      }
      persist(state.data);
      var href = shareableHref(state.data);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(href).then(function () {
          toast(t("copied"));
        }).catch(function () {
          window.prompt(t("copyLink"), href);
        });
      } else {
        window.prompt(t("copyLink"), href);
      }
    });
    $("#open-client").addEventListener("click", function () {
      if (!state.data.items || !state.data.items.length) {
        toast(t("needOffer"));
        return;
      }
      persist(state.data);
      location.href = shareableHref(state.data);
    });
    renderPreview();
  }

  /* ——— Offer page ——— */

  function renderOfferPage(data) {
    var root = $("#offer-root");
    if (!root) return;
    if (!data || !data.items || !data.items.length) {
      applyI18n(currentUiLang());
      return;
    }
    var lang = data.lang === "he" ? "he" : "en";
    applyI18n(lang);
    document.title = (data.biz || "Forge") + " — " + t("offerTitle", lang);
    var tot = totalsOf(data);
    var valid = formatDate(addDays(data.created || todayISO(), data.validDays || 7), lang);
    var rows = data.items.map(function (it) {
      var amt = (Number(it.q) || 0) * (Number(it.p) || 0);
      return "<tr><td>" + esc(it.n) + "</td><td class='num'>" + esc(String(it.q)) +
        "</td><td class='num'>" + esc(money(Number(it.p) || 0, data.currency, lang)) +
        "</td><td class='num'>" + esc(money(amt, data.currency, lang)) + "</td></tr>";
    }).join("");
    var mailtoYes = mailLink(data, "approve", lang, tot);
    var mailtoNo = mailLink(data, "change", lang, tot);
    root.innerHTML =
      '<article class="offer-sheet" lang="' + lang + '" dir="' + (lang === "he" ? "rtl" : "ltr") + '">' +
      '<div class="offer-top"><div class="offer-brand">' +
      '<svg class="mark" viewBox="0 0 32 32" aria-hidden="true"><path d="M8 22h16M10 22c2-7 5-12 6-12s4 5 6 12" fill="none" stroke="#C45A22" stroke-width="1.6" stroke-linecap="round"/><circle cx="16" cy="8" r="1.6" fill="#C45A22"/></svg>' +
      '<span class="wordmark">FORGE</span></div>' +
      '<div class="offer-id">' + esc(t("offerTitle", lang)) + " · " + esc(data.created || todayISO()) + "</div></div>" +
      '<h1 class="offer-title">' + esc(data.biz || "Forge") + "</h1>" +
      "<dl class='offer-parties'><div><dt>" + esc(t("from", lang)) + "</dt><dd>" + esc(data.biz || "—") +
      "</dd></div><div><dt>" + esc(t("for", lang)) + "</dt><dd>" + esc(data.client || "—") + "</dd></div></dl>" +
      "<table class='offer-table'><thead><tr><th>" + esc(t("item", lang)) + "</th><th>" + esc(t("qty", lang)) +
      "</th><th>" + esc(t("price", lang)) + "</th><th>" + esc(t("amount", lang)) + "</th></tr></thead><tbody>" +
      rows + "</tbody></table>" +
      '<div class="offer-sum">' +
      '<div class="row"><span>' + esc(t("subtotal", lang)) + "</span><span>" + money(tot.sub, data.currency, lang) + "</span></div>" +
      (data.vat ? '<div class="row"><span>' + esc(t("vat", lang)) + "</span><span>" + money(tot.vat, data.currency, lang) + "</span></div>" : "") +
      '<div class="row total"><span>' + esc(t("total", lang)) + "</span><span>" + money(tot.total, data.currency, lang) + "</span></div>" +
      "</div>" +
      '<div class="offer-notes"><div>' + esc(t("timeline", lang)) + " · " + esc(data.timeline || "—") +
      "</div><div>" + esc(t("validUntil", lang)) + " · " + esc(valid) + "</div></div>" +
      '<div class="offer-actions no-print">' +
      '<button type="button" class="btn btn-ember" id="approve-btn">' + esc(t("approve", lang)) + "</button>" +
      '<a class="btn btn-ghost" id="change-btn" href="' + esc(mailtoNo) + '">' + esc(t("change", lang)) + "</a>" +
      "</div>" +
      '<div class="success" id="ok" hidden><h3>' + esc(t("approved", lang)) + "</h3><p>" +
      esc(t("approvedBody", lang)) + '</p><p><a class="btn btn-ember btn-sm" id="ok-mail" href="' +
      esc(mailtoYes) + '">' + esc(t("sendMail", lang)) + "</a></p></div>" +
      "</article>";

    $("#approve-btn").addEventListener("click", function () {
      $("#ok").hidden = false;
      $("#approve-btn").disabled = true;
      try { sessionStorage.setItem("forge-approved", "1"); } catch (e) {}
    });
  }

  function mailLink(data, kind, lang, tot) {
    var to = data.email || "";
    var subject, body;
    var total = money(tot.total, data.currency, lang);
    if (kind === "approve") {
      subject = lang === "he"
        ? "אישור הצעה — " + (data.client || "")
        : "Offer approved — " + (data.client || "");
      body = lang === "he"
        ? "שלום " + (data.biz || "") + ",\n\nאני מאשר/ת את ההצעה בסך " + total + ".\n\n" + (data.client || "")
        : "Hi " + (data.biz || "") + ",\n\nI approve the offer totaling " + total + ".\n\n" + (data.client || "");
    } else {
      subject = lang === "he"
        ? "בקשת שינוי — " + (data.client || "")
        : "Change request — " + (data.client || "");
      body = lang === "he"
        ? "שלום " + (data.biz || "") + ",\n\nאשמח לעדכן כמה סעיפים בהצעה.\n\n" + (data.client || "")
        : "Hi " + (data.biz || "") + ",\n\nCould we adjust a few line items?\n\n" + (data.client || "");
    }
    return "mailto:" + encodeURIComponent(to) + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  }

  function bootLang() {
    var saved = null;
    try { saved = localStorage.getItem("forge-lang"); } catch (e) {}
    var lang = saved === "he" || saved === "en" ? saved : "en";
    applyI18n(lang);
    $all("[data-set-lang]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyI18n(btn.getAttribute("data-set-lang"));
        var page = document.body.getAttribute("data-page");
        if (page === "builder") {
          if ($("#brief")) {
            $("#brief").placeholder = currentUiLang() === "he" ? "הדביקו את שרשור הוואטסאפ…" : "Paste the WhatsApp dump…";
          }
          renderTotals();
          renderPreview();
        }
      });
    });
  }

  function boot() {
    if (typeof document === "undefined") return;
    var page = document.body && document.body.getAttribute("data-page");
    if (page !== "offer") bootLang();
    if (page === "builder") bindBuilder();
    if (page === "offer") {
      var data = decodeOffer(location.hash || "");
      if (!data) data = loadPersisted();
      if (data) renderOfferPage(data);
      else bootLang();
    }
  }

  var Forge = {
    parseBrief: parseBrief,
    parsePrices: parsePrices,
    detectCurrency: detectCurrency,
    detectLang: detectLang,
    parseTimeline: parseTimeline,
    totalsOf: totalsOf,
    encodeOffer: encodeOffer,
    decodeOffer: decodeOffer,
    shareableHref: shareableHref,
    money: money,
    samples: SAMPLES,
    i18n: I18N
  };

  root.Forge = Forge;
  if (typeof document !== "undefined") {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
    else boot();
  }
})(typeof window !== "undefined" ? window : globalThis);
