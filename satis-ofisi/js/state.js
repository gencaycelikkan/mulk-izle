/* ==========================================================================
   MÜLKİZLE SATIŞ OFİSİ — TEMİZ DURUM YÖNETİMİ, CEPHE & KAT MİMARİSİ
   ========================================================================== */
(function (global) {
  const STORAGE_KEY = "mulkizle_satis_ofisi_v2";
  const LEGACY_KEY = "mulkizle_satis_ofisi_v1";

  const ROLE_META = {
    mudur_ortak: { label: "Satış Müdürü / Ortak", badge: "🎼 Müdür & Ortak" },
    muteahhit_ortak: { label: "Müteahhit & Ortak", badge: "👑 Müteahhit & Ortak" },
    muteahhit: { label: "Müteahhit (Patron)", badge: "👑 Müteahhit" },
    satis_sorumlusu: { label: "Satış Ofisi Sorumlusu", badge: "🧑‍💼 Satış Sorumlusu" },
    santiye_sefi: { label: "Şantiye Şefi", badge: "👷‍♂️ Şantiye Şefi" }
  };

  const FACADE_DIRECTIONS = [
    { code: "K", label: "Kuzey" },
    { code: "G", label: "Güney" },
    { code: "D", label: "Doğu" },
    { code: "B", label: "Batı" }
  ];

  const UNIT_TYPES = [
    "1+1",
    "2+1",
    "3+1",
    "4+1",
    "5+1",
    "Dubleks",
    "Ticari / Dükkan"
  ];

  const COLUMN_COLORS = [
    { id: "blue", label: "Mavi", bg: "#DCEEFF", border: "#60A5FA" },
    { id: "coral", label: "Mercan", bg: "#FCE1D2", border: "#F59E0B" },
    { id: "green", label: "Yeşil", bg: "#D5F2E3", border: "#34D399" },
    { id: "yellow", label: "Sarı", bg: "#FEF3C7", border: "#FBBF24" },
    { id: "purple", label: "Mor", bg: "#EDE9FE", border: "#A78BFA" },
    { id: "teal", label: "Turkuaz", bg: "#CCFBF1", border: "#2DD4BF" },
    { id: "slate", label: "Gri", bg: "#F1F5F9", border: "#94A3B8" }
  ];

  function buildDefaultColumns(count) {
    const n = Math.max(1, Math.min(20, Number(count) || 4));
    const presets4 = [
      { label: "GÜNEY-DOĞU", color: "blue", facades: ["G", "D"] },
      { label: "KUZEY-DOĞU", color: "coral", facades: ["K", "D"] },
      { label: "KUZEY-BATI", color: "green", facades: ["K", "B"] },
      { label: "GÜNEY-BATI", color: "yellow", facades: ["G", "B"] }
    ];
    const presets6 = [
      { label: "GÜNEY-DOĞU", color: "blue", facades: ["G", "D"] },
      { label: "DOĞU", color: "purple", facades: ["D"] },
      { label: "KUZEY-DOĞU", color: "coral", facades: ["K", "D"] },
      { label: "KUZEY-BATI", color: "green", facades: ["K", "B"] },
      { label: "BATI", color: "teal", facades: ["B"] },
      { label: "GÜNEY-BATI", color: "yellow", facades: ["G", "B"] }
    ];
    const source = n === 4 ? presets4 : presets6;
    const cols = [];
    for (let i = 0; i < n; i++) {
      const tpl = source[i % source.length];
      cols.push({
        id: "col-" + i + "-" + Date.now(),
        label: i < source.length ? tpl.label : tpl.label + " #" + (i + 1),
        color: tpl.color,
        facades: [...tpl.facades]
      });
    }
    return cols;
  }

  function ensureBlockSchema(block, siteUnits) {
    if (!block) return;
    const blockUnits = (siteUnits || []).filter(u => u.blockId === block.id);
    const byFloor = {};
    let maxOnFloor = 0;
    blockUnits.forEach(u => {
      const f = String(u.floor);
      if (!byFloor[f]) byFloor[f] = [];
      byFloor[f].push(u);
      if (byFloor[f].length > maxOnFloor) maxOnFloor = byFloor[f].length;
    });

    if (!Array.isArray(block.columns) || block.columns.length === 0) {
      block.columns = buildDefaultColumns(Math.max(4, maxOnFloor));
    } else if (maxOnFloor > block.columns.length) {
      const extra = buildDefaultColumns(maxOnFloor);
      while (block.columns.length < maxOnFloor) {
        block.columns.push(extra[block.columns.length]);
      }
    }

    // Her katta colIndex benzersiz olsun
    Object.values(byFloor).forEach(floorList => {
      const used = new Set();
      floorList.forEach(u => {
        if (typeof u.shortTag !== "string") u.shortTag = "";
        const valid =
          typeof u.colIndex === "number" &&
          u.colIndex >= 0 &&
          u.colIndex < block.columns.length &&
          !used.has(u.colIndex);
        if (valid) {
          used.add(u.colIndex);
        } else {
          let freeIdx = 0;
          while (used.has(freeIdx)) freeIdx += 1;
          u.colIndex = freeIdx;
          used.add(freeIdx);
        }
      });
    });
  }

  function createDefaultMilestones() {
    const names = [
      "Ruhsat",
      "Hafriyat",
      "Temel",
      "1. Kat Betonu",
      "Kaba İnşaat",
      "Pencere & Dış Cephe",
      "İnce İşçilik",
      "Peyzaj",
      "İskan & Teslim"
    ];
    return names.map((title, idx) => ({
      id: "ms-" + (idx + 1),
      title,
      status: idx === 0 ? "active" : "pending",
      internalDaysLeft: (idx + 1) * 30,
      internalDelayDays: 0,
      buyerPeriod: "Planlandı",
      photoProof: "",
      publishedToBuyer: false,
      revisionNote: ""
    }));
  }

  function createDeliveryChecklist(unitCode) {
    const itemsTemplate = [
      "1. Vestiyer & İç Kapılar",
      "2. Mutfak Dolabı & Ankastre",
      "3. Banyo & Duşakabin",
      "4. Parke & Süpürgelik",
      "5. PVC & Cam Balkon",
      "6. Kombi & Tesisat Testi",
      "7. İnce Temizlik"
    ];
    return {
      unitCode,
      items: itemsTemplate.map((label, iIdx) => ({
        id: "chk-" + Date.now() + "-" + iIdx + "-" + Math.floor(Math.random() * 1000),
        label,
        done: false,
        issueNote: "",
        photoUrl: ""
      }))
    };
  }

  function demoSvgDataUri(caption) {
    const safe = String(caption || "Kanıt").slice(0, 28);
    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="140" viewBox="0 0 240 140">` +
      `<rect width="240" height="140" rx="10" fill="#0F172A"/>` +
      `<rect x="10" y="10" width="220" height="120" rx="6" fill="#1E293B" stroke="#3B82F6" stroke-width="2"/>` +
      `<text x="120" y="66" fill="#FFFFFF" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle">mülkizle.com KANIT</text>` +
      `<text x="120" y="90" fill="#93C5FD" font-family="sans-serif" font-size="11" text-anchor="middle">${safe}</text>` +
      `</svg>`;
    return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
  }

  function buildSeedData() {
    return {
      activeUserId: "admin",
      activeSiteId: "",
      activeTab: "yonetim",
      users: [
        {
          id: "admin",
          name: "Yönetici (Kurucu)",
          title: "Sistem Yöneticisi • Tüm Yetkiler",
          isAdmin: true,
          siteRoles: {}
        }
      ],
      sites: [],
      auditLogs: []
    };
  }

  let _state = null;

  function load() {
    if (_state) return _state;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.users) && Array.isArray(parsed.sites)) {
          _state = parsed;
          return _state;
        }
      }
    } catch (e) {
      // ignore storage errors and fall back to clean state
    }
    _state = buildSeedData();
    save();
    return _state;
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(_state));
    } catch (e) {
      // ignore quota errors
    }
  }

  function reset() {
    try {
      localStorage.removeItem(LEGACY_KEY);
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      // ignore
    }
    _state = buildSeedData();
    save();
    return _state;
  }

  function getActiveUser() {
    const s = load();
    return s.users.find(u => u.id === s.activeUserId) || s.users[0];
  }

  function getAccessibleSites() {
    const s = load();
    const user = getActiveUser();
    if (!user) return [];
    if (user.isAdmin) return s.sites;
    return s.sites.filter(site => Boolean(user.siteRoles && user.siteRoles[site.id]));
  }

  function getActiveSite() {
    const accessible = getAccessibleSites();
    const s = load();
    if (accessible.length === 0) {
      if (s.activeSiteId) {
        s.activeSiteId = "";
        save();
      }
      return null;
    }
    const match = accessible.find(site => site.id === s.activeSiteId);
    if (match) return match;
    s.activeSiteId = accessible[0].id;
    save();
    return accessible[0];
  }

  function getUserRoleOnSite(userId, siteId) {
    const s = load();
    const user = s.users.find(u => u.id === userId);
    if (!user) return null;
    if (user.isAdmin) {
      return { role: "mudur_ortak", sharePct: 0, isAdmin: true };
    }
    return (user.siteRoles && user.siteRoles[siteId]) || null;
  }

  function nowFormatted() {
    const d = new Date();
    const pad = n => String(n).padStart(2, "0");
    return (
      pad(d.getDate()) +
      "." +
      pad(d.getMonth() + 1) +
      "." +
      d.getFullYear() +
      " " +
      pad(d.getHours()) +
      ":" +
      pad(d.getMinutes()) +
      ":" +
      pad(d.getSeconds())
    );
  }

  function addLog(siteId, actionType, detail) {
    const s = load();
    const user = getActiveUser();
    const site = s.sites.find(x => x.id === siteId);
    const roleInfo = siteId ? getUserRoleOnSite(user.id, siteId) : null;
    const roleTitle = user.isAdmin
      ? "Sistem Yöneticisi"
      : roleInfo && ROLE_META[roleInfo.role]
      ? ROLE_META[roleInfo.role].label
      : user.title;

    s.auditLogs.unshift({
      id: "log-" + Date.now() + "-" + Math.floor(Math.random() * 1000),
      ts: nowFormatted(),
      siteId: siteId || "",
      siteName: site ? site.name : "Genel Sistem",
      actorName: user.name + " (" + roleTitle + ")",
      actionType,
      detail
    });
    save();
  }

  function formatFloorLabel(floor) {
    const f = Number(floor);
    if (f < 0) return `${f}. Kat (${Math.abs(f)}. Bodrum)`;
    if (f === 0) return "0. Kat (Zemin)";
    return `${f}. Kat`;
  }

  function formatBoardFloorLabel(floor) {
    const f = Number(floor);
    if (f > 0) return `${f}. NORMAL KAT`;
    if (f === 0) return "ZEMİN KAT";
    return `${f}. KAT (${Math.abs(f)}. BODRUM)`;
  }

  function formatFacadeSummary(facades) {
    const order = ["K", "G", "D", "B"];
    const dirMap = { K: "Kuzey", G: "Güney", D: "Doğu", B: "Batı" };
    const clean = order.filter(c => Array.isArray(facades) && facades.includes(c));
    const count = clean.length;
    let countLabel = "Cephesiz";
    if (count === 1) countLabel = "Tek Cephe";
    else if (count === 2) countLabel = "Çift Cephe";
    else if (count === 3) countLabel = "3 Cephe";
    else if (count === 4) countLabel = "4 Cephe";

    if (count === 0) {
      return { count: 0, countLabel, fullLabel: "Cephe Belirtilmedi", shortCodes: "—" };
    }
    const names = clean.map(c => dirMap[c]).join(" - ");
    return {
      count,
      countLabel,
      fullLabel: `${countLabel} (${names})`,
      shortCodes: clean.join(" • ")
    };
  }

  function makeEmptyUnit(block, floor, overrides) {
    const activeUser = getActiveUser();
    return Object.assign(
      {
        id: "u-" + Date.now() + "-" + Math.floor(Math.random() * 1000000),
        blockId: block.id,
        block: block.name,
        floor: Number(floor),
        colIndex: 0,
        shortTag: "",
        code: "",
        type: "3+1",
        sqm: 0,
        netSqm: 0,
        facades: [],
        facadeNote: "",
        price: 0,
        status: "satista",
        buyerName: "",
        advisorId: activeUser ? activeUser.id : "admin"
      },
      overrides || {}
    );
  }

  function createSite(opts) {
    const s = load();
    const minF = Number(opts.minFloor);
    const maxF = Number(opts.maxFloor);
    const entF = Number(opts.entranceFloor);
    const perFloor = Math.max(0, Math.min(20, Number(opts.unitsPerFloor) || 0));
    const id = "prj-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
    const blkId = "blk-" + Date.now() + "-" + Math.floor(Math.random() * 100);
    const cols = buildDefaultColumns(perFloor || 4);
    const blk = {
      id: blkId,
      name: String(opts.blockName || "A Blok").trim(),
      minFloor: isNaN(minF) ? 0 : minF,
      maxFloor: isNaN(maxF) ? 4 : maxF,
      entranceFloor: isNaN(entF) ? 0 : entF,
      columns: cols
    };

    const units = [];
    if (perFloor > 0) {
      for (let f = blk.minFloor; f <= blk.maxFloor; f++) {
        for (let i = 0; i < perFloor; i++) {
          const colTpl = cols[i];
          units.push(
            makeEmptyUnit(blk, f, {
              colIndex: i,
              facades: colTpl && Array.isArray(colTpl.facades) ? [...colTpl.facades] : []
            })
          );
        }
      }
    }

    const newSite = {
      id,
      name: String(opts.name || "Yeni Proje").trim(),
      district: String(opts.district || "").trim(),
      contractorName: String(opts.contractorName || "").trim(),
      mode: opts.mode || "emlak_ofisi",
      revenueModel: opts.revenueModel || "ortaklik",
      partnerSharing: "paydas_acik",
      blocks: [blk],
      units,
      leads: [],
      partnerRequests: [],
      milestones: createDefaultMilestones(),
      deliveryUnits: [],
      advisorCalls: {},
      manualStats: {
        monthlyVisitors: 0,
        showFlatVisits: 0,
        targetBandMin: 0,
        targetBandMax: 0
      }
    };

    s.sites.push(newSite);
    s.activeSiteId = newSite.id;
    save();
    addLog(
      newSite.id,
      "Yeni Proje Oluşturuldu",
      `${newSite.name} (${blk.name}: ${blk.minFloor}..${blk.maxFloor}, Giriş: ${blk.entranceFloor}. Kat • ${units.length} taslak daire) eklendi.`
    );
    return newSite;
  }

  function getSitePartners(site) {
    const s = load();
    const list = [];
    s.users.forEach(u => {
      const sr = u.siteRoles && u.siteRoles[site.id];
      if (sr && (Number(sr.sharePct) > 0 || sr.role === "mudur_ortak" || sr.role === "muteahhit_ortak")) {
        const meta = ROLE_META[sr.role];
        list.push({
          userId: u.id,
          name: u.name,
          roleLabel: meta ? meta.label : sr.role,
          sharePct: Number(sr.sharePct) || 0
        });
      }
    });
    return list;
  }

  function getSiteAdvisors(site) {
    const s = load();
    const list = [];
    s.users.forEach(u => {
      const sr = u.siteRoles && u.siteRoles[site.id];
      if (!sr) return;
      if (sr.role === "santiye_sefi" || sr.role === "muteahhit") return;
      const myLeads = site.leads.filter(l => l.ownerUserId === u.id);
      const myHot = myLeads.filter(l => l.heat === "sicak").length;
      const mySoldUnits = site.units.filter(un => un.status === "satildi" && un.advisorId === u.id);
      const myOptionUnits = site.units.filter(un => un.status === "opsiyonlu" && un.advisorId === u.id);
      const calls = (site.advisorCalls && site.advisorCalls[u.id]) || 0;
      const revenue = mySoldUnits.reduce((sum, un) => sum + (Number(un.price) || 0), 0);
      list.push({
        id: u.id,
        name: u.name,
        roleLabel: ROLE_META[sr.role] ? ROLE_META[sr.role].label : sr.role,
        newLeads: myLeads.length,
        calls,
        convertedHot: myHot,
        options: myOptionUnits.length,
        closedSales: mySoldUnits.length,
        revenue,
        bonusRate: sr.role === "satis_sorumlusu" ? 0.01 : 0
      });
    });
    return list;
  }

  function formatTL(num) {
    const val = Number(num || 0);
    if (!val) return "Fiyat Girilmedi";
    return val.toLocaleString("tr-TR") + " ₺";
  }

  function normalizePhone(str) {
    const digits = String(str || "").replace(/\D/g, "");
    return digits.length > 10 ? digits.slice(-10) : digits;
  }

  function maskPhone(str) {
    const clean = String(str || "").trim();
    if (clean.length < 6) return "***";
    return clean.slice(0, 4) + " *** ** " + clean.slice(-2);
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  global.SOState = {
    ROLE_META,
    FACADE_DIRECTIONS,
    UNIT_TYPES,
    COLUMN_COLORS,
    load,
    save,
    reset,
    getActiveUser,
    getAccessibleSites,
    getActiveSite,
    getUserRoleOnSite,
    addLog,
    formatFloorLabel,
    formatBoardFloorLabel,
    formatFacadeSummary,
    buildDefaultColumns,
    ensureBlockSchema,
    makeEmptyUnit,
    createSite,
    createDeliveryChecklist,
    getSitePartners,
    getSiteAdvisors,
    formatTL,
    normalizePhone,
    maskPhone,
    escapeHtml,
    nowFormatted,
    demoSvgDataUri
  };
})(window);
