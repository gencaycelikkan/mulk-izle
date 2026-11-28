/* ==========================================================================
   MÜLKİZLE — UBK VİV GÖLBAŞI 3B ÇİZGİSEL BLOK & GOOGLE EARTH / UYDU DEMOSU
   Koordinat: 39°47'33.07"N 32°49'14.48"E -> lat: 39.7925194, lng: 32.8206889
   ========================================================================== */
(function (global) {
  const CENTER_LAT = 39.7925194;
  const CENTER_LNG = 32.8206889;
  const STORAGE_KEY = "mulkizle_ubk_viv_3d_v2";
  const LEGACY_KEY = "mulkizle_ubk_viv_3d_v1";

  // Yüklenen Google Earth görüntüsü (489 x 643 px) — Mavi pin u=0.56, v=0.34
  const IMG_W_M = 112;
  const IMG_H_M = 112 * (643 / 489);
  const PIN_U = 0.56;
  const PIN_V = 0.34;

  const STATUS_META = {
    satista: { label: "🟢 Satışta", short: "SATIŞTA", color: "#22C55E" },
    opsiyonlu: { label: "🟡 Opsiyonlu", short: "OPSİYON", color: "#F59E0B" },
    satildi: { label: "🔴 Satıldı", short: "SATILDI", color: "#EF4444" },
    barter: { label: "🟣 Barter", short: "BARTER", color: "#8B5CF6" },
    arsa_sahibi: { label: "🔵 Arsa Sahibi", short: "ARSA S.", color: "#3B82F6" }
  };

  function floorName(floorIdx) {
    return floorIdx === 0 ? "ZEMİN KAT" : `${floorIdx}. NORMAL KAT`;
  }

  function bearingToTurkish(deg) {
    const a = ((deg % 360) + 360) % 360;
    if (a >= 337.5 || a < 22.5) return "KUZEY";
    if (a < 67.5) return "KUZEY-DOĞU";
    if (a < 112.5) return "DOĞU";
    if (a < 157.5) return "GÜNEY-DOĞU";
    if (a < 202.5) return "GÜNEY";
    if (a < 247.5) return "GÜNEY-BATI";
    if (a < 292.5) return "BATI";
    return "KUZEY-BATI";
  }

  function offsetLngLat(lng, lat, dxMeters, dyMeters, angleDeg) {
    const rad = (Number(angleDeg || 0) * Math.PI) / 180;
    const rx = dxMeters * Math.cos(rad) + dyMeters * Math.sin(rad);
    const ry = -dxMeters * Math.sin(rad) + dyMeters * Math.cos(rad);
    const dLat = ry / 111320;
    const dLng = rx / (111320 * Math.cos((lat * Math.PI) / 180));
    return [lng + dLng, lat + dLat];
  }

  function uvToLngLat(u, v) {
    const dx = (u - PIN_U) * IMG_W_M;
    const dy = (PIN_V - v) * IMG_H_M;
    return offsetLngLat(CENTER_LNG, CENTER_LAT, dx, dy, 0);
  }

  function getEarthImageBounds() {
    // Sıra: top-left, top-right, bottom-right, bottom-left
    return [
      uvToLngLat(0, 0),
      uvToLngLat(1, 0),
      uvToLngLat(1, 1),
      uvToLngLat(0, 1)
    ];
  }

  function buildSeedState() {
    const b2Center = uvToLngLat(0.482, 0.205);
    const b1Center = uvToLngLat(0.732, 0.228);
    const b3Center = uvToLngLat(0.648, 0.555);

    const blocks = [
      {
        id: "blok-1",
        name: "1. BLOK (Ön Sağ • 4'lü)",
        lng: b1Center[0],
        lat: b1Center[1],
        angle: 7,
        width: 22,
        depth: 25,
        floors: 8,
        unitsPerFloor: 4
      },
      {
        id: "blok-2",
        name: "2. BLOK (Ön Sol • 4'lü)",
        lng: b2Center[0],
        lat: b2Center[1],
        angle: 7,
        width: 22,
        depth: 25,
        floors: 8,
        unitsPerFloor: 4
      },
      {
        id: "blok-3",
        name: "3. BLOK (Arka • 2'li)",
        lng: b3Center[0],
        lat: b3Center[1],
        angle: 7,
        width: 20,
        depth: 25,
        floors: 8,
        unitsPerFloor: 2
      }
    ];

    const units = {};

    const sampleOverrides = {
      "blok-1-7-2": { code: "28", owner: "BAYAZIT.T", status: "satildi", tag: "VK", price: 0 },
      "blok-1-7-0": { code: "27", owner: "TOLGA.O", status: "satildi", tag: "VK", price: 0 },
      "blok-1-7-1": { code: "26", owner: "OMER SAMI", status: "satildi", tag: "VK", price: 0 },
      "blok-1-7-3": { code: "25", owner: "A.SELİM", status: "satildi", tag: "VK", price: 0 },
      "blok-1-6-2": { code: "24", owner: "SERPİL.Y", status: "satildi", tag: "VK", price: 0 },
      "blok-1-6-0": { code: "23", owner: "MUGE.N", status: "satildi", tag: "VK", price: 0 },
      "blok-1-6-1": { code: "22", owner: "LEVENT.B", status: "satildi", tag: "VK", price: 0 },
      "blok-1-6-3": { code: "21", owner: "ATAKAN.S", status: "satildi", tag: "VK", price: 0 },
      "blok-1-2-2": { code: "8", owner: "BARTER", status: "barter", tag: "VK", price: 0 },
      "blok-1-1-3": { code: "1", owner: "DERYA.A", status: "satildi", tag: "VK", price: 0 },
      "blok-1-3-1": { code: "10", owner: "", status: "satista", tag: "", price: 11850000 },
      "blok-1-4-2": { code: "16", owner: "", status: "opsiyonlu", tag: "", price: 12900000 },

      "blok-2-7-2": { code: "28", owner: "A.SELİM", status: "satildi", tag: "VK", price: 0 },
      "blok-2-7-0": { code: "27", owner: "VOLKAN.B", status: "satildi", tag: "VK", price: 0 },
      "blok-2-7-1": { code: "26", owner: "MUSTAFA.E", status: "satildi", tag: "VK", price: 0 },
      "blok-2-7-3": { code: "25", owner: "A.SELİM", status: "satildi", tag: "VK", price: 0 },
      "blok-2-2-2": { code: "5", owner: "", status: "satista", tag: "", price: 13650000 },
      "blok-2-3-3": { code: "13", owner: "", status: "satista", tag: "", price: 15000000 },
      "blok-2-1-0": { code: "2", owner: "", status: "satista", tag: "İPTK", price: 14200000 },
      "blok-2-1-1": { code: "3", owner: "", status: "satista", tag: "", price: 9500000 },
      "blok-2-2-1": { code: "6", owner: "ARMA SERAMİK", status: "barter", tag: "VK", price: 0 },

      "blok-3-7-0": { code: "15", owner: "", status: "satista", tag: "3 Cephe", price: 16800000 },
      "blok-3-7-1": { code: "16", owner: "", status: "opsiyonlu", tag: "3 Cephe", price: 16950000 },
      "blok-3-5-0": { code: "11", owner: "YATIRIMCI A.Ş.", status: "satildi", tag: "VK", price: 0 }
    };

    blocks.forEach(blk => {
      for (let f = 0; f < blk.floors; f++) {
        for (let s = 0; s < blk.unitsPerFloor; s++) {
          const uid = `${blk.id}-${f}-${s}`;
          const ov = sampleOverrides[uid];
          const defaultStatus = f === 0 ? "satista" : (f + s) % 5 === 0 ? "opsiyonlu" : "satista";
          units[uid] = {
            id: uid,
            blockId: blk.id,
            floor: f,
            slot: s,
            code: ov ? ov.code : String(f * blk.unitsPerFloor + s + 1),
            owner: ov ? ov.owner : "",
            tag: ov ? ov.tag : blk.unitsPerFloor === 2 ? "3 Cephe" : "",
            status: ov ? ov.status : defaultStatus,
            type: blk.unitsPerFloor === 2 ? "4+1 Dubleks" : f === 0 ? "Dükkan / Ticari" : "3+1",
            sqm: blk.unitsPerFloor === 2 ? 195 : f === 0 ? 120 : 145,
            price: ov && ov.price ? ov.price : 11500000 + f * 350000
          };
        }
      }
    });

    return {
      blocks,
      units,
      selectedUnitId: null,
      alignBlockId: "blok-1",
      pickMode: false,
      statusFilter: "hepsi",
      blockFilter: "hepsi",
      maxVisibleFloor: 7,
      opacity: 0.62,
      basemap: "google",
      showEarthPhoto: true
    };
  }

  let _state = null;
  let _map = null;
  let _hoveredId = null;
  let _tourRaf = null;
  let _isTouring = false;
  let _showAlignBox = true;
  let _blockMarkers = [];

  function loadState() {
    if (_state) return _state;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.blocks) && parsed.units) {
          _state = parsed;
          return _state;
        }
      }
    } catch (e) {
      // ignore storage errors
    }
    _state = buildSeedState();
    saveState();
    return _state;
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(_state));
    } catch (e) {
      // ignore quota errors
    }
  }

  function getRectPolygon(blk, x0, y0, x1, y1) {
    const ring = [
      offsetLngLat(blk.lng, blk.lat, x0, y0, blk.angle),
      offsetLngLat(blk.lng, blk.lat, x1, y0, blk.angle),
      offsetLngLat(blk.lng, blk.lat, x1, y1, blk.angle),
      offsetLngLat(blk.lng, blk.lat, x0, y1, blk.angle)
    ];
    ring.push([...ring[0]]);
    return [ring];
  }

  function getSlotLayout(blk, slotIdx) {
    const hw = blk.width / 2;
    const hd = blk.depth / 2;
    const gap = 0.45;
    if (blk.unitsPerFloor === 2) {
      if (slotIdx === 0) {
        return { x0: -hw + gap, y0: -hd + gap, x1: -gap / 2, y1: hd - gap, localBearing: 270, countTxt: "3 Cephe" };
      }
      return { x0: gap / 2, y0: -hd + gap, x1: hw - gap, y1: hd - gap, localBearing: 90, countTxt: "3 Cephe" };
    }
    const layouts4 = [
      { x0: -hw + gap, y0: gap / 2, x1: -gap / 2, y1: hd - gap, localBearing: 315, countTxt: "Çift Cephe" },
      { x0: gap / 2, y0: gap / 2, x1: hw - gap, y1: hd - gap, localBearing: 45, countTxt: "Çift Cephe" },
      { x0: -hw + gap, y0: -hd + gap, x1: -gap / 2, y1: -gap / 2, localBearing: 225, countTxt: "Çift Cephe" },
      { x0: gap / 2, y0: -hd + gap, x1: hw - gap, y1: -gap / 2, localBearing: 135, countTxt: "Çift Cephe" }
    ];
    return layouts4[slotIdx % 4];
  }

  function buildGeoJSON() {
    const s = loadState();
    const unitsFeatures = [];
    const slabFeatures = [];
    const outlineFeatures = [];

    const FLOOR_H = 3.2;

    s.blocks.forEach(blk => {
      if (s.blockFilter !== "hepsi" && s.blockFilter !== blk.id) return;

      const hw = blk.width / 2;
      const hd = blk.depth / 2;
      const outerCoords = getRectPolygon(blk, -hw, -hd, hw, hd);
      outlineFeatures.push({
        type: "Feature",
        properties: { blockId: blk.id, name: blk.name },
        geometry: { type: "Polygon", coordinates: outerCoords }
      });

      const visibleTop = Math.min(blk.floors - 1, s.maxVisibleFloor);

      for (let f = 0; f <= visibleTop; f++) {
        slabFeatures.push({
          type: "Feature",
          properties: {
            base: f * FLOOR_H,
            height: f * FLOOR_H + 0.18
          },
          geometry: { type: "Polygon", coordinates: outerCoords }
        });

        for (let sl = 0; sl < blk.unitsPerFloor; sl++) {
          const uid = `${blk.id}-${f}-${sl}`;
          const unit = s.units[uid];
          if (!unit) continue;
          if (s.statusFilter !== "hepsi" && unit.status !== s.statusFilter) continue;

          const lay = getSlotLayout(blk, sl);
          const facadeDir = bearingToTurkish(lay.localBearing + blk.angle);
          const meta = STATUS_META[unit.status] || STATUS_META.satista;

          unitsFeatures.push({
            type: "Feature",
            id: uid,
            properties: {
              uid,
              blockId: blk.id,
              blockName: blk.name,
              floor: f,
              floorLabel: floorName(f),
              code: unit.code,
              owner: unit.owner || "",
              tag: unit.tag || "",
              status: unit.status,
              color: meta.color,
              facade: `${facadeDir} (${lay.countTxt})`,
              type: unit.type,
              sqm: unit.sqm,
              price: unit.price,
              base: f * FLOOR_H + 0.22,
              height: (f + 1) * FLOOR_H - 0.14
            },
            geometry: {
              type: "Polygon",
              coordinates: getRectPolygon(blk, lay.x0, lay.y0, lay.x1, lay.y1)
            }
          });
        }
      }
    });

    return {
      unitsFC: { type: "FeatureCollection", features: unitsFeatures },
      slabsFC: { type: "FeatureCollection", features: slabFeatures },
      outlinesFC: { type: "FeatureCollection", features: outlineFeatures }
    };
  }

  function syncBlockMarkers() {
    if (!_map || typeof maplibregl === "undefined") return;
    _blockMarkers.forEach(m => m.remove());
    _blockMarkers = [];
    const s = loadState();
    s.blocks.forEach(blk => {
      if (s.blockFilter !== "hepsi" && s.blockFilter !== blk.id) return;
      const el = document.createElement("div");
      el.className = "d3-block-pin";
      el.textContent = blk.name.split(" (")[0];
      const marker = new maplibregl.Marker({ element: el, anchor: "bottom" })
        .setLngLat([blk.lng, blk.lat])
        .addTo(_map);
      _blockMarkers.push(marker);
    });
  }

  function refreshMapSources() {
    if (!_map) return;
    const { unitsFC, slabsFC, outlinesFC } = buildGeoJSON();
    if (_map.getSource("src-units")) _map.getSource("src-units").setData(unitsFC);
    if (_map.getSource("src-slabs")) _map.getSource("src-slabs").setData(slabsFC);
    if (_map.getSource("src-outlines")) _map.getSource("src-outlines").setData(outlinesFC);
    syncBlockMarkers();
  }

  function initMap() {
    const s = loadState();
    const { unitsFC, slabsFC, outlinesFC } = buildGeoJSON();
    const centerCam = uvToLngLat(0.60, 0.34);

    // ÖNEMLİ: glyphs olmadığı için symbol/text-field layer kullanılmaz; HTML Marker kullanılır!
    const style = {
      version: 8,
      sources: {
        "basemap-google": {
          type: "raster",
          tiles: ["https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"],
          tileSize: 256,
          maxzoom: 20,
          attribution: "Google Satellite"
        },
        "basemap-satellite": {
          type: "raster",
          tiles: ["https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"],
          tileSize: 256,
          maxzoom: 17,
          attribution: "Esri World Imagery"
        },
        "basemap-osm": {
          type: "raster",
          tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
          tileSize: 256,
          maxzoom: 19,
          attribution: "OpenStreetMap"
        },
        "basemap-dark": {
          type: "raster",
          tiles: ["https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png"],
          tileSize: 256,
          maxzoom: 19,
          attribution: "Carto Dark"
        },
        "src-earth-photo": {
          type: "image",
          url: "ubk-viv-uydu.jpg",
          coordinates: getEarthImageBounds()
        },
        "src-outlines": { type: "geojson", data: outlinesFC },
        "src-slabs": { type: "geojson", data: slabsFC },
        "src-units": { type: "geojson", data: unitsFC, promoteId: "uid" }
      },
      layers: [
        {
          id: "layer-google",
          type: "raster",
          source: "basemap-google",
          layout: { visibility: s.basemap === "google" ? "visible" : "none" }
        },
        {
          id: "layer-satellite",
          type: "raster",
          source: "basemap-satellite",
          layout: { visibility: s.basemap === "satellite" ? "visible" : "none" }
        },
        {
          id: "layer-osm",
          type: "raster",
          source: "basemap-osm",
          layout: { visibility: s.basemap === "osm" ? "visible" : "none" }
        },
        {
          id: "layer-dark",
          type: "raster",
          source: "basemap-dark",
          layout: { visibility: s.basemap === "dark" ? "visible" : "none" }
        },
        {
          id: "layer-earth-photo",
          type: "raster",
          source: "src-earth-photo",
          layout: { visibility: s.showEarthPhoto ? "visible" : "none" },
          paint: { "raster-opacity": 0.96 }
        },
        {
          id: "footprints-line",
          type: "line",
          source: "src-outlines",
          paint: {
            "line-color": "#38BDF8",
            "line-width": 2.8
          }
        },
        {
          id: "slabs-3d",
          type: "fill-extrusion",
          source: "src-slabs",
          paint: {
            "fill-extrusion-color": "#F8FAFC",
            "fill-extrusion-base": ["get", "base"],
            "fill-extrusion-height": ["get", "height"],
            "fill-extrusion-opacity": 0.92
          }
        },
        {
          id: "units-3d",
          type: "fill-extrusion",
          source: "src-units",
          paint: {
            "fill-extrusion-color": [
              "case",
              ["boolean", ["feature-state", "selected"], false],
              "#FFFFFF",
              ["boolean", ["feature-state", "hover"], false],
              "#38BDF8",
              ["get", "color"]
            ],
            "fill-extrusion-base": ["get", "base"],
            "fill-extrusion-height": ["get", "height"],
            "fill-extrusion-opacity": s.opacity
          }
        }
      ]
    };

    _map = new maplibregl.Map({
      container: "d3Map",
      style,
      center: centerCam,
      zoom: 18.4,
      pitch: 56,
      bearing: -18,
      antialias: true
    });

    _map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "bottom-right");
    _map.on("load", syncBlockMarkers);
    _map.on("dragstart", stopTour);
    _map.on("wheel", stopTour);

    _map.on("mousemove", "units-3d", e => {
      if (loadState().pickMode) return;
      _map.getCanvas().style.cursor = "pointer";
      const feat = e.features && e.features[0];
      if (!feat) return;
      if (_hoveredId && _hoveredId !== feat.id) {
        _map.setFeatureState({ source: "src-units", id: _hoveredId }, { hover: false });
      }
      _hoveredId = feat.id;
      _map.setFeatureState({ source: "src-units", id: _hoveredId }, { hover: true });

      const p = feat.properties;
      const tip = document.getElementById("d3Tooltip");
      if (tip) {
        const sm = STATUS_META[p.status] || STATUS_META.satista;
        const ownerOrPrice = p.owner
          ? `👤 ${escapeHtml(p.owner)}`
          : p.price > 0
          ? `💰 ${Number(p.price).toLocaleString("tr-TR")} TL`
          : sm.short;
        tip.innerHTML = `
          <div style="font-weight:800;font-size:0.8rem;">${escapeHtml(p.blockName)} • No: ${escapeHtml(p.code)}</div>
          <div>${escapeHtml(p.floorLabel)} • 🧭 ${escapeHtml(p.facade)}</div>
          <div style="margin-top:3px;font-weight:700;color:#93C5FD;">${ownerOrPrice} (${sm.label})</div>
        `;
        tip.style.display = "block";
        tip.style.left = Math.min(window.innerWidth - 260, e.originalEvent.clientX + 14) + "px";
        tip.style.top = Math.min(window.innerHeight - 100, e.originalEvent.clientY + 14) + "px";
      }
    });

    _map.on("mouseleave", "units-3d", () => {
      _map.getCanvas().style.cursor = "";
      if (_hoveredId) {
        _map.setFeatureState({ source: "src-units", id: _hoveredId }, { hover: false });
        _hoveredId = null;
      }
      const tip = document.getElementById("d3Tooltip");
      if (tip) tip.style.display = "none";
    });

    _map.on("click", e => {
      const st = loadState();
      if (st.pickMode) {
        const blk = st.blocks.find(b => b.id === st.alignBlockId);
        if (blk) {
          blk.lng = e.lngLat.lng;
          blk.lat = e.lngLat.lat;
          st.pickMode = false;
          saveState();
          document.getElementById("d3Map").classList.remove("is-pick-cursor");
          refreshMapSources();
          renderUI();
          toast(`${blk.name} tıklanan uydu çatısına taşındı!`, "ok");
        }
        return;
      }

      const hits = _map.queryRenderedFeatures(e.point, { layers: ["units-3d"] });
      if (hits && hits.length > 0) {
        const nextId = hits[0].properties.uid;
        if (st.selectedUnitId) {
          _map.setFeatureState({ source: "src-units", id: st.selectedUnitId }, { selected: false });
        }
        st.selectedUnitId = nextId;
        _map.setFeatureState({ source: "src-units", id: nextId }, { selected: true });
        renderRightPanel();
      }
    });
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function computeUnitFacade(blk, unit) {
    const lay = getSlotLayout(blk, unit.slot);
    return `${bearingToTurkish(lay.localBearing + blk.angle)} (${lay.countTxt})`;
  }

  function renderLeftPanel() {
    const s = loadState();
    const el = document.getElementById("d3LeftPanel");
    if (!el) return;

    const allUnits = Object.values(s.units);
    const counts = { satista: 0, opsiyonlu: 0, satildi: 0, barter: 0 };
    allUnits.forEach(u => {
      if (counts[u.status] !== undefined) counts[u.status] += 1;
    });

    const alignBlk = s.blocks.find(b => b.id === s.alignBlockId) || s.blocks[0];

    el.innerHTML = `
      <div>
        <div class="d3-sec-title">📊 Canlı Proje Özeti (${allUnits.length} Daire)</div>
        <div class="d3-kpi-row">
          <div class="d3-kpi"><strong style="color:#16A34A;">${counts.satista}</strong><span>Satışta</span></div>
          <div class="d3-kpi"><strong style="color:#D97706;">${counts.opsiyonlu}</strong><span>Opsiyon</span></div>
          <div class="d3-kpi"><strong style="color:#DC2626;">${counts.satildi}</strong><span>Satıldı</span></div>
          <div class="d3-kpi"><strong style="color:#7C3AED;">${counts.barter}</strong><span>Barter</span></div>
        </div>
      </div>

      <div>
        <div class="d3-sec-title">🎨 Durum &amp; Blok Filtresi</div>
        <div class="d3-chip-wrap" style="margin-bottom:6px;">
          <button type="button" class="d3-chip ${s.statusFilter === "hepsi" ? "active" : ""}" onclick="D3Demo.setStatusFilter('hepsi')">Tümü</button>
          ${Object.entries(STATUS_META)
            .map(([k, v]) => `<button type="button" class="d3-chip ${s.statusFilter === k ? "active" : ""}" onclick="D3Demo.setStatusFilter('${k}')">${v.label}</button>`)
            .join("")}
        </div>
        <div class="d3-chip-wrap">
          <button type="button" class="d3-chip ${s.blockFilter === "hepsi" ? "active" : ""}" onclick="D3Demo.setBlockFilter('hepsi')">Tüm 3 Blok</button>
          ${s.blocks
            .map(b => `<button type="button" class="d3-chip ${s.blockFilter === b.id ? "active" : ""}" onclick="D3Demo.setBlockFilter('${b.id}')">${escapeHtml(b.name.split(" ")[0])}. Blok</button>`)
            .join("")}
        </div>
      </div>

      <div class="d3-box">
        <div class="d3-slider-row">
          <div class="d3-slider-head">
            <span>🔪 Kat Süzgeci (Üst Katları Kes)</span>
            <span>${floorName(s.maxVisibleFloor)}</span>
          </div>
          <input type="range" class="d3-range" min="0" max="7" step="1" value="${s.maxVisibleFloor}" oninput="D3Demo.setMaxFloor(Number(this.value))" />
        </div>
        <div class="d3-slider-row">
          <div class="d3-slider-head">
            <span>🧊 Çizgisel Saydamlık</span>
            <span>%${Math.round(s.opacity * 100)}</span>
          </div>
          <input type="range" class="d3-range" min="0.2" max="0.95" step="0.05" value="${s.opacity}" oninput="D3Demo.setOpacity(Number(this.value))" />
        </div>
      </div>

      <div class="d3-box">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:${_showAlignBox ? "8px" : "0"};">
          <span class="d3-sec-title" style="margin:0;">🎯 Uyduya Oturt (Konum &amp; Açı)</span>
          <button type="button" class="d3-btn" style="padding:3px 7px;font-size:0.68rem;" onclick="D3Demo.toggleAlignBox()">
            ${_showAlignBox ? "Gizle" : "Aç"}
          </button>
        </div>

        ${
          _showAlignBox
            ? `
              <div class="d3-field">
                <label>Hangi Blok Hizalanacak?</label>
                <select class="d3-select" onchange="D3Demo.setAlignBlock(this.value)">
                  ${s.blocks.map(b => `<option value="${b.id}" ${b.id === alignBlk.id ? "selected" : ""}>${escapeHtml(b.name)}</option>`).join("")}
                </select>
              </div>

              <button
                type="button"
                class="d3-btn ${s.pickMode ? "d3-btn-warn" : "d3-btn-primary"}"
                style="width:100%;justify-content:center;margin-bottom:8px;"
                onclick="D3Demo.togglePickMode()"
              >
                ${s.pickMode ? "🎯 Şimdi Haritada Bina Çatısına Tıklayın..." : "📍 Haritada Tıklayıp Bloğu Taşı"}
              </button>

              <label class="d3-btn" style="width:100%;justify-content:center;margin-bottom:10px;">
                📤 Başka Uydu / Drone Fotoğrafı Yükle
                <input type="file" accept="image/*" style="display:none;" onchange="D3Demo.uploadEarthPhoto(event)" />
              </label>

              <div class="d3-slider-row">
                <div class="d3-slider-head"><span>🧭 Döndürme Açısı</span><span>${alignBlk.angle}°</span></div>
                <input type="range" class="d3-range" min="0" max="355" step="1" value="${alignBlk.angle}" oninput="D3Demo.updateAlignProp('angle', Number(this.value))" />
              </div>

              <div class="d3-slider-row">
                <div class="d3-slider-head"><span>↔️ Blok Eni (m)</span><span>${alignBlk.width} m</span></div>
                <input type="range" class="d3-range" min="12" max="45" step="1" value="${alignBlk.width}" oninput="D3Demo.updateAlignProp('width', Number(this.value))" />
              </div>

              <div class="d3-slider-row">
                <div class="d3-slider-head"><span>↕️ Blok Derinliği (m)</span><span>${alignBlk.depth} m</span></div>
                <input type="range" class="d3-range" min="10" max="40" step="1" value="${alignBlk.depth}" oninput="D3Demo.updateAlignProp('depth', Number(this.value))" />
              </div>
            `
            : ""
        }
      </div>

      <div style="font-size:0.71rem;color:#475569;line-height:1.45;">
        💡 <strong>İpucu:</strong> Sağ tık + sürükle ile <strong>360° döndürün</strong>; herhangi bir daire kutusuna tıklayıp <strong>Satıldı / Satışta</strong> işaretleyin.
      </div>
    `;
  }

  function renderRightPanel() {
    const s = loadState();
    const el = document.getElementById("d3RightPanel");
    if (!el) return;
    if (!s.selectedUnitId || !s.units[s.selectedUnitId]) {
      el.classList.remove("open");
      return;
    }

    const u = s.units[s.selectedUnitId];
    const blk = s.blocks.find(b => b.id === u.blockId) || s.blocks[0];
    const facade = computeUnitFacade(blk, u);

    el.classList.add("open");
    el.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;border-bottom:1px solid #E2E8F0;padding-bottom:8px;">
        <div>
          <div style="font-size:0.98rem;font-weight:800;">🏠 ${escapeHtml(blk.name)} • No: ${escapeHtml(u.code)}</div>
          <div style="font-size:0.74rem;color:#64748B;">${floorName(u.floor)} • 🧭 ${escapeHtml(facade)}</div>
        </div>
        <button type="button" class="d3-btn" onclick="D3Demo.closeInspector()">✕</button>
      </div>

      <div>
        <div class="d3-sec-title">Tek Tıkla Satış Durumu Değiştir</div>
        <div class="d3-status-grid">
          ${Object.entries(STATUS_META)
            .map(
              ([k, v]) => `<button type="button" class="d3-status-btn ${u.status === k ? "active-" + k : ""}" onclick="D3Demo.setUnitStatus('${u.id}', '${k}')">${v.label}</button>`
            )
            .join("")}
        </div>
      </div>

      <form onsubmit="D3Demo.saveUnitForm(event, '${u.id}')">
        <div class="d3-form-grid">
          <div class="d3-field">
            <label>Kapı No</label>
            <input id="d3InCode" class="d3-input" value="${escapeHtml(u.code)}" />
          </div>
          <div class="d3-field">
            <label>Kısa Etiket (VK vb.)</label>
            <input id="d3InTag" class="d3-input" value="${escapeHtml(u.tag)}" />
          </div>
        </div>

        <div class="d3-field">
          <label>Daire Sahibi / Alıcı Adı</label>
          <input id="d3InOwner" class="d3-input" value="${escapeHtml(u.owner)}" placeholder="Örn: VOLKAN.B veya boş" />
        </div>

        <div class="d3-form-grid">
          <div class="d3-field">
            <label>Daire Tipi</label>
            <input id="d3InType" class="d3-input" value="${escapeHtml(u.type)}" />
          </div>
          <div class="d3-field">
            <label>Brüt m²</label>
            <input id="d3InSqm" type="number" class="d3-input" value="${u.sqm}" />
          </div>
        </div>

        <div class="d3-field">
          <label>Liste Fiyatı (TL)</label>
          <input id="d3InPrice" type="number" class="d3-input" step="50000" value="${u.price}" />
        </div>

        <button type="submit" class="d3-btn d3-btn-primary" style="width:100%;justify-content:center;">
          ✓ Daire Bilgilerini Kaydet
        </button>
      </form>
    `;
  }

  function renderUI() {
    renderLeftPanel();
    renderRightPanel();
  }

  function setStatusFilter(st) {
    loadState().statusFilter = st;
    saveState();
    refreshMapSources();
    renderLeftPanel();
  }

  function setBlockFilter(blkId) {
    loadState().blockFilter = blkId;
    saveState();
    refreshMapSources();
    renderLeftPanel();
  }

  function setMaxFloor(val) {
    loadState().maxVisibleFloor = val;
    saveState();
    refreshMapSources();
    renderLeftPanel();
  }

  function setOpacity(val) {
    loadState().opacity = val;
    saveState();
    if (_map && _map.getLayer("units-3d")) {
      _map.setPaintProperty("units-3d", "fill-extrusion-opacity", val);
    }
    renderLeftPanel();
  }

  function setBasemap(mode) {
    loadState().basemap = mode;
    saveState();
    ["bmGoogle", "bmSat", "bmOsm", "bmDark"].forEach(id => {
      const btn = document.getElementById(id);
      if (btn) btn.classList.remove("active");
    });
    const activeBtnId =
      mode === "google" ? "bmGoogle" : mode === "satellite" ? "bmSat" : mode === "osm" ? "bmOsm" : "bmDark";
    const activeBtn = document.getElementById(activeBtnId);
    if (activeBtn) activeBtn.classList.add("active");

    if (_map) {
      _map.setLayoutProperty("layer-google", "visibility", mode === "google" ? "visible" : "none");
      _map.setLayoutProperty("layer-satellite", "visibility", mode === "satellite" ? "visible" : "none");
      _map.setLayoutProperty("layer-osm", "visibility", mode === "osm" ? "visible" : "none");
      _map.setLayoutProperty("layer-dark", "visibility", mode === "dark" ? "visible" : "none");
    }
  }

  function toggleEarthPhoto() {
    const s = loadState();
    s.showEarthPhoto = !s.showEarthPhoto;
    saveState();
    const btn = document.getElementById("btnEarthPhoto");
    if (btn) btn.classList.toggle("active", s.showEarthPhoto);
    if (_map && _map.getLayer("layer-earth-photo")) {
      _map.setLayoutProperty("layer-earth-photo", "visibility", s.showEarthPhoto ? "visible" : "none");
    }
    toast(s.showEarthPhoto ? "Google Earth fotoğraf katmanı açıldı." : "Canlı harita katmanına geçildi.", "ok");
  }

  function uploadEarthPhoto(event) {
    const file = event.target.files && event.target.files[0];
    if (!file || !_map) return;
    const reader = new FileReader();
    reader.onload = function (e) {
      const src = _map.getSource("src-earth-photo");
      if (src && src.updateImage) {
        src.updateImage({ url: e.target.result, coordinates: getEarthImageBounds() });
        loadState().showEarthPhoto = true;
        saveState();
        _map.setLayoutProperty("layer-earth-photo", "visibility", "visible");
        const btn = document.getElementById("btnEarthPhoto");
        if (btn) btn.classList.add("active");
        toast("Yeni uydu/drone fotoğrafı zemine oturtuldu!", "ok");
      }
    };
    reader.readAsDataURL(file);
  }

  function flyCompass(bearing) {
    stopTour();
    if (_map) _map.easeTo({ bearing, pitch: 56, duration: 750 });
  }

  function togglePitch() {
    stopTour();
    if (!_map) return;
    const is3d = _map.getPitch() > 20;
    _map.easeTo({ pitch: is3d ? 0 : 56, duration: 700 });
  }

  function toggleTour() {
    if (_isTouring) {
      stopTour();
      return;
    }
    _isTouring = true;
    const btn = document.getElementById("btnTour");
    if (btn) btn.classList.add("active");
    function step() {
      if (!_isTouring || !_map) return;
      _map.setBearing((_map.getBearing() + 0.28) % 360);
      _tourRaf = requestAnimationFrame(step);
    }
    _tourRaf = requestAnimationFrame(step);
  }

  function stopTour() {
    _isTouring = false;
    if (_tourRaf) cancelAnimationFrame(_tourRaf);
    _tourRaf = null;
    const btn = document.getElementById("btnTour");
    if (btn) btn.classList.remove("active");
  }

  function toggleAlignBox() {
    _showAlignBox = !_showAlignBox;
    renderLeftPanel();
  }

  function setAlignBlock(blkId) {
    loadState().alignBlockId = blkId;
    saveState();
    renderLeftPanel();
  }

  function togglePickMode() {
    const s = loadState();
    s.pickMode = !s.pickMode;
    saveState();
    const mapEl = document.getElementById("d3Map");
    if (mapEl) mapEl.classList.toggle("is-pick-cursor", s.pickMode);
    renderLeftPanel();
    if (s.pickMode) {
      toast("Şimdi haritada bu bloğu oturtmak istediğiniz çatının merkezine tıklayın.", "warn");
    }
  }

  function updateAlignProp(prop, val) {
    const s = loadState();
    const blk = s.blocks.find(b => b.id === s.alignBlockId);
    if (!blk) return;
    blk[prop] = val;
    saveState();
    refreshMapSources();
    renderLeftPanel();
    renderRightPanel();
  }

  function setUnitStatus(uid, status) {
    const s = loadState();
    const u = s.units[uid];
    if (!u) return;
    u.status = status;
    saveState();
    refreshMapSources();
    renderUI();
    toast(`No ${u.code}: ${STATUS_META[status].label} olarak işaretlendi!`, "ok");
  }

  function saveUnitForm(event, uid) {
    event.preventDefault();
    const s = loadState();
    const u = s.units[uid];
    if (!u) return;
    u.code = document.getElementById("d3InCode").value.trim();
    u.tag = document.getElementById("d3InTag").value.trim();
    u.owner = document.getElementById("d3InOwner").value.trim();
    u.type = document.getElementById("d3InType").value.trim();
    u.sqm = Number(document.getElementById("d3InSqm").value) || 0;
    u.price = Number(document.getElementById("d3InPrice").value) || 0;
    saveState();
    refreshMapSources();
    renderUI();
    toast(`No ${u.code} bilgileri kaydedildi.`, "ok");
  }

  function closeInspector() {
    const s = loadState();
    if (_map && s.selectedUnitId) {
      _map.setFeatureState({ source: "src-units", id: s.selectedUnitId }, { selected: false });
    }
    s.selectedUnitId = null;
    renderRightPanel();
  }

  function resetDemo() {
    if (!global.confirm("3B blok konumları ve satış durumları başlangıç demosuna döndürülsün mü?")) return;
    try {
      localStorage.removeItem(LEGACY_KEY);
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      // ignore
    }
    _state = buildSeedState();
    saveState();
    refreshMapSources();
    renderUI();
    if (_map) {
      _map.flyTo({ center: uvToLngLat(0.60, 0.34), zoom: 18.4, pitch: 56, bearing: -18 });
    }
    toast("UBK Viv 3B demo sıfırlandı.", "ok");
  }

  let _toastTimer = null;
  function toast(msg, type) {
    const el = document.getElementById("d3Toast");
    if (!el) return;
    el.textContent = msg;
    el.className = "d3-toast show" + (type === "ok" ? " is-ok" : type === "warn" ? " is-warn" : "");
    clearTimeout(_toastTimer);
    _toastTimer = setTimeout(() => el.classList.remove("show"), 3600);
  }

  document.addEventListener("DOMContentLoaded", () => {
    loadState();
    renderUI();
    initMap();
  });

  global.D3Demo = {
    loadState,
    buildGeoJSON,
    setStatusFilter,
    setBlockFilter,
    setMaxFloor,
    setOpacity,
    setBasemap,
    toggleEarthPhoto,
    uploadEarthPhoto,
    flyCompass,
    togglePitch,
    toggleTour,
    toggleAlignBox,
    setAlignBlock,
    togglePickMode,
    updateAlignProp,
    setUnitStatus,
    saveUnitForm,
    closeInspector,
    resetDemo
  };
})(window);
