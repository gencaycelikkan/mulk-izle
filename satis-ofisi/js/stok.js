/* ==========================================================================
   MÜLKİZLE SATIŞ OFİSİ — MİMARİ SATIŞ TAHTASI (ŞEMA) & HIZLI TABLO DÜZENLEME
   ========================================================================== */
(function (global) {
  let _blockFilter = "hepsi";
  let _statusFilter = "hepsi";
  let _typeFilter = "hepsi";
  let _facadeCountFilter = "hepsi";
  let _directionFilter = "hepsi";
  let _viewMode = "tahta"; // "tahta" | "duzenle"

  const STATUS_META = {
    satista: { label: "🟢 Satışta", short: "SATIŞTA", cls: "status-satista" },
    opsiyonlu: { label: "🟡 Opsiyonlu", short: "OPSİYON", cls: "status-opsiyonlu" },
    satildi: { label: "🔴 Satıldı", short: "SATILDI", cls: "status-satildi" },
    barter: { label: "🟣 Barter / Taşeron", short: "BARTER", cls: "status-barter" },
    arsa_sahibi: { label: "🔵 Arsa Sahibi", short: "ARSA SAHİBİ", cls: "status-arsa" }
  };

  function getBlocks(site) {
    if (!Array.isArray(site.blocks) || site.blocks.length === 0) {
      site.blocks = [{ id: "blk-default", name: "A Blok", minFloor: 0, maxFloor: 4, entranceFloor: 0 }];
    }
    site.blocks.forEach(blk => SOState.ensureBlockSchema(blk, site.units));
    return site.blocks;
  }

  function getActiveBlock(site) {
    const blocks = getBlocks(site);
    if (_blockFilter !== "hepsi") {
      const found = blocks.find(b => b.id === _blockFilter);
      if (found) return found;
    }
    return blocks[0];
  }

  function matchesFilters(u) {
    if (_statusFilter !== "hepsi" && u.status !== _statusFilter) return false;
    if (_typeFilter !== "hepsi" && u.type !== _typeFilter) return false;
    const fCount = Array.isArray(u.facades) ? u.facades.length : 0;
    if (_facadeCountFilter === "1" && fCount !== 1) return false;
    if (_facadeCountFilter === "2" && fCount !== 2) return false;
    if (_facadeCountFilter === "3+" && fCount < 3) return false;
    if (_directionFilter !== "hepsi" && !(Array.isArray(u.facades) && u.facades.includes(_directionFilter))) return false;
    return true;
  }

  function hasActiveFilter() {
    return (
      _statusFilter !== "hepsi" ||
      _typeFilter !== "hepsi" ||
      _facadeCountFilter !== "hepsi" ||
      _directionFilter !== "hepsi"
    );
  }

  function renderFacadeCheckboxes(namePrefix, selectedCodes, onChangeJs) {
    return SOState.FACADE_DIRECTIONS.map(dir => {
      const checked = Array.isArray(selectedCodes) && selectedCodes.includes(dir.code);
      return `
        <label class="so-facade-toggle">
          <input type="checkbox" name="${namePrefix}" value="${dir.code}" ${checked ? "checked" : ""} ${onChangeJs ? `onchange="${onChangeJs}"` : ""} />
          <span>${dir.code} (${dir.label})</span>
        </label>
      `;
    }).join("");
  }

  function todayTurkishDate() {
    const d = new Date();
    const pad = n => String(n).padStart(2, "0");
    return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
  }

  /* ========================================================================
     MOD 1: MİMARİ SATIŞ TAHTASI (ŞEMA — PDF İLE BİREBİR KÜNYE GÖRÜNÜMÜ)
     ======================================================================== */
  function renderSalesBoardBlock(site, block, esc, hidePrice, canEdit) {
    const cols = block.columns || [];
    const minF = Number(block.minFloor);
    const maxF = Number(block.maxFloor);
    const entF = Number(block.entranceFloor);
    const filtering = hasActiveFilter();

    const headerColsHtml = cols
      .map((col, idx) => {
        const fSum = SOState.formatFacadeSummary(col.facades);
        const colCls = "col-" + (col.color || "blue");
        return `
          <th class="so-board-col-head ${colCls}" title="${canEdit ? "Cephe adını ve rengini düzenlemek için tıklayın" : esc(fSum.fullLabel)}">
            ${
              canEdit
                ? `<button type="button" class="so-board-col-btn" onclick="SOStok.openColumnModal('${esc(block.id)}', ${idx})">
                     <span>${esc(col.label)}</span>
                     <small>${fSum.count > 0 ? esc(fSum.shortCodes) : "Düzenle ✎"}</small>
                   </button>`
                : `<div>${esc(col.label)}</div>${fSum.count > 0 ? `<small>${esc(fSum.shortCodes)}</small>` : ""}`
            }
          </th>
        `;
      })
      .join("");

    const rowsHtml = [];
    for (let f = maxF; f >= minF; f--) {
      const isEntrance = f === entF;
      const isGround = f === 0;
      const floorLbl = SOState.formatBoardFloorLabel(f);
      const floorUnits = site.units.filter(u => u.blockId === block.id && Number(u.floor) === f);

      const cellsHtml = cols
        .map((col, colIdx) => {
          const colCls = "col-" + (col.color || "blue");
          const unit = floorUnits.find(u => Number(u.colIndex) === colIdx);

          if (!unit) {
            return `
              <td class="so-board-td so-board-empty-cell ${colCls}">
                ${
                  canEdit
                    ? `<button type="button" class="so-board-add-slot" title="Bu sütuna daire ekle" onclick="SOStok.addUnitAtSlot('${esc(block.id)}', ${f}, ${colIdx})">+</button>`
                    : ""
                }
              </td>
            `;
          }

          const sm = STATUS_META[unit.status] || STATUS_META.satista;
          const isMatch = !filtering || matchesFilters(unit);
          const ownerTrim = String(unit.buyerName || "").trim();

          let primaryDisplay = "";
          if (ownerTrim) {
            primaryDisplay = `<div class="so-board-owner">${esc(ownerTrim)}</div>`;
          } else if (unit.status === "satildi") {
            primaryDisplay = `<div class="so-board-owner is-sold">SATILDI</div>`;
          } else if (unit.status === "barter") {
            primaryDisplay = `<div class="so-board-owner">BARTER</div>`;
          } else if (unit.status === "arsa_sahibi") {
            primaryDisplay = `<div class="so-board-owner">ARSA SAHİBİ</div>`;
          } else if (!hidePrice && Number(unit.price) > 0) {
            primaryDisplay = `<div class="so-board-price">${Number(unit.price).toLocaleString("tr-TR")} TL</div>`;
          } else {
            primaryDisplay = `<div class="so-board-status-txt">${sm.short}</div>`;
          }

          const priceSubLine =
            !hidePrice && ownerTrim && Number(unit.price) > 0 && unit.status !== "satildi"
              ? `<div class="so-board-sub-price">${Number(unit.price).toLocaleString("tr-TR")} TL</div>`
              : "";

          const unitSubMeta = unit.sqm > 0 ? `${unit.type} • ${unit.sqm}m²` : unit.type;

          return `
            <td class="so-board-td ${colCls} ${sm.cls} ${isMatch ? "" : "is-dimmed"}">
              <button type="button" class="so-board-cell" onclick="SOStok.openUnitModal('${esc(unit.id)}')">
                <div class="so-board-cell-top">
                  ${unit.shortTag ? `<span class="so-board-tag">${esc(unit.shortTag)}</span>` : `<span></span>`}
                  <span class="so-door-circle ${sm.cls}">${esc(unit.code || "—")}</span>
                </div>
                ${primaryDisplay}
                ${priceSubLine}
                <div class="so-board-sub">${esc(unitSubMeta)}</div>
              </button>
            </td>
          `;
        })
        .join("");

      const rowCls = [
        isEntrance ? "is-entrance-row" : "",
        isGround ? "is-ground-divider" : ""
      ]
        .filter(Boolean)
        .join(" ");

      const floorSideContent = `
        <div class="so-board-floor-txt">${esc(floorLbl)}</div>
        ${isEntrance ? `<div class="so-entrance-badge">🚪 GİRİŞ</div>` : ""}
      `;

      rowsHtml.push(`
        <tr class="${rowCls}">
          <th class="so-board-floor-cell">${floorSideContent}</th>
          ${cellsHtml}
          <th class="so-board-floor-cell">${floorSideContent}</th>
        </tr>
      `);
    }

    return `
      <div class="so-board-sheet">
        <div class="so-board-sheet-head">
          <div>
            <div class="so-board-project-name">${esc(site.name)}</div>
            <div class="so-board-project-sub">${esc(site.district || site.contractorName || "Satış Ofisi")}</div>
          </div>
          <div class="so-board-block-title">${esc(block.name.toUpperCase())}</div>
          <div class="so-board-date">${todayTurkishDate()}</div>
        </div>

        <div class="so-board-scroll">
          <table class="so-board-table">
            <thead>
              <tr>
                <th class="so-board-corner">CEPHELER</th>
                ${headerColsHtml}
                <th class="so-board-corner">CEPHELER</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml.join("")}
            </tbody>
          </table>
        </div>

        <div class="so-board-legend">
          <span><i class="so-dot status-satista"></i> Satışta</span>
          <span><i class="so-dot status-opsiyonlu"></i> Opsiyonlu</span>
          <span><i class="so-dot status-satildi"></i> Satıldı</span>
          <span><i class="so-dot status-barter"></i> Barter</span>
          <span><i class="so-dot status-arsa"></i> Arsa Sahibi</span>
          <span style="margin-left:auto;color:#64748B;">Daire veya Cephe başlığına tıklayarak düzenleyebilirsiniz</span>
        </div>
      </div>
    `;
  }

  /* ========================================================================
     MOD 2: HIZLI TABLO DÜZENLEME (SERİ VERİ GİRİŞİ)
     ======================================================================== */
  function renderInlineUnitCell(unit, block, esc, hidePrice) {
    const sm = STATUS_META[unit.status] || STATUS_META.satista;
    const cols = block.columns || [];
    const fSum = SOState.formatFacadeSummary(unit.facades);
    const shortBadge =
      fSum.count === 0 ? "—" : fSum.count === 1 ? "Tek" : fSum.count === 2 ? "Çift" : fSum.count + "C";

    const dirButtons = SOState.FACADE_DIRECTIONS.map(d => {
      const isOn = Array.isArray(unit.facades) && unit.facades.includes(d.code);
      return `<button type="button" class="so-dir-btn ${isOn ? "is-on" : ""}" title="${d.label}" onclick="SOStok.toggleUnitFacade('${esc(unit.id)}', '${d.code}')">${d.code}</button>`;
    }).join("");

    return `
      <div class="so-inline-unit ${sm.cls}">
        <div class="so-cell-row">
          <input
            type="text"
            class="so-cell-input so-cell-code"
            style="width:58px;"
            value="${esc(unit.code)}"
            placeholder="No"
            title="Daire / Kapı No"
            onchange="SOStok.updateUnitField('${esc(unit.id)}', 'code', this.value)"
          />
          <input
            type="text"
            class="so-cell-input"
            style="width:46px;"
            value="${esc(unit.shortTag || "")}"
            placeholder="VK"
            title="Kısa Etiket (VK, İPTK vb.)"
            onchange="SOStok.updateUnitField('${esc(unit.id)}', 'shortTag', this.value)"
          />
          <select
            class="so-cell-select"
            style="flex:1;"
            title="Durum"
            onchange="SOStok.updateUnitField('${esc(unit.id)}', 'status', this.value, true)"
          >
            ${Object.entries(STATUS_META)
              .map(([k, v]) => `<option value="${k}" ${unit.status === k ? "selected" : ""}>${v.label}</option>`)
              .join("")}
          </select>
          <button type="button" class="so-btn so-btn-sm" style="padding:3px 6px;" title="Detay &amp; Sil" onclick="SOStok.openUnitModal('${esc(unit.id)}')">⚙️</button>
        </div>

        <div class="so-cell-row">
          <input
            type="text"
            class="so-cell-input"
            value="${esc(unit.buyerName || "")}"
            placeholder="Daire Sahibi / Alıcı (Örn: VOLKAN.B)"
            title="Satış Tahtasında Görünecek İsim"
            onchange="SOStok.updateUnitField('${esc(unit.id)}', 'buyerName', this.value)"
          />
        </div>

        <div class="so-cell-row">
          <select
            class="so-cell-select"
            style="flex:1;"
            title="Cephe Sütunu"
            onchange="SOStok.updateUnitField('${esc(unit.id)}', 'colIndex', Number(this.value), true)"
          >
            ${cols
              .map((c, idx) => `<option value="${idx}" ${Number(unit.colIndex) === idx ? "selected" : ""}>${idx + 1}. ${esc(c.label)}</option>`)
              .join("")}
          </select>
        </div>

        <div class="so-cell-row">
          <select
            class="so-cell-select"
            style="flex:1;"
            title="Daire Tipi"
            onchange="SOStok.updateUnitField('${esc(unit.id)}', 'type', this.value)"
          >
            ${SOState.UNIT_TYPES.map(t => `<option value="${esc(t)}" ${unit.type === t ? "selected" : ""}>${esc(t)}</option>`).join("")}
          </select>
          <input
            type="number"
            class="so-cell-input"
            style="width:58px;"
            min="0"
            value="${unit.sqm || ""}"
            placeholder="m²"
            title="Brüt m²"
            onchange="SOStok.updateUnitField('${esc(unit.id)}', 'sqm', Number(this.value) || 0)"
          />
        </div>

        <div class="so-cell-row" style="justify-content:space-between;">
          <div style="display:flex;gap:3px;" title="${esc(fSum.fullLabel)}">${dirButtons}</div>
          <span class="so-facade-mini-tag" title="${esc(fSum.fullLabel)}">${shortBadge}</span>
        </div>

        ${
          hidePrice
            ? `<div style="font-size:0.74rem;font-weight:700;color:#64748B;">🔒 Fiyat Gizli</div>`
            : `<div class="so-cell-row">
                <input
                  type="number"
                  class="so-cell-input"
                  min="0"
                  step="50000"
                  value="${unit.price || ""}"
                  placeholder="Fiyat (₺)"
                  title="Liste Fiyatı (₺)"
                  onchange="SOStok.updateUnitField('${esc(unit.id)}', 'price', Number(this.value) || 0)"
                />
              </div>`
        }
      </div>
    `;
  }

  function renderRapidEditBlock(site, block, esc, hidePrice, canEdit) {
    const minF = Number(block.minFloor);
    const maxF = Number(block.maxFloor);
    const entF = Number(block.entranceFloor);
    const cols = block.columns || [];
    const floorRows = [];

    for (let f = maxF; f >= minF; f--) {
      const isEntrance = f === entF;
      const allUnitsOnFloor = site.units
        .filter(u => u.blockId === block.id && Number(u.floor) === f)
        .sort((a, b) => Number(a.colIndex) - Number(b.colIndex));
      const unitsOnFloor = allUnitsOnFloor.filter(matchesFilters);
      const floorTitle = SOState.formatFloorLabel(f);

      floorRows.push(`
        <div class="so-floor-row ${isEntrance ? "is-entrance-floor" : ""}">
          <div>
            <div class="so-floor-label">${esc(floorTitle)}</div>
            ${
              isEntrance
                ? `<div class="so-entrance-badge">🚪 Apt. Giriş Katı</div>`
                : `<button type="button" class="so-mini-link" onclick="SOStok.setEntranceFloor('${esc(block.id)}', ${f})">🚪 Giriş Yap</button>`
            }
            <div class="so-floor-stepper" title="Bu kattaki daire sayısını artır / azalt">
              <button type="button" onclick="SOStok.adjustFloorCount('${esc(block.id)}', ${f}, -1)">−</button>
              <span><strong>${allUnitsOnFloor.length}</strong> Daire</span>
              <button type="button" onclick="SOStok.adjustFloorCount('${esc(block.id)}', ${f}, 1)">+</button>
            </div>
            ${
              allUnitsOnFloor.length > 0
                ? `<button type="button" class="so-mini-link" onclick="SOStok.copyFloorTemplateToSameCount('${esc(block.id)}', ${f})">📋 Aynı Adetli Katlara Kopyala</button>`
                : ""
            }
          </div>

          <div class="so-inline-unit-grid">
            ${
              unitsOnFloor.length === 0
                ? `<div style="font-size:0.78rem;color:#64748B;padding:10px 4px;">Bu katta daire yok (+ ile ekleyebilirsiniz).</div>`
                : unitsOnFloor.map(u => renderInlineUnitCell(u, block, esc, hidePrice)).join("")
            }
          </div>
        </div>
      `);
    }

    const colBarHtml = cols
      .map((c, idx) => {
        const colCls = "col-" + (c.color || "blue");
        return `
          <button type="button" class="so-chip ${colCls}" style="color:#0F172A;" onclick="SOStok.openColumnModal('${esc(block.id)}', ${idx})">
            ${idx + 1}. ${esc(c.label)} ✎
          </button>
        `;
      })
      .join("");

    return `
      <div class="so-card" style="padding:16px 18px;">
        <div class="so-card-header" style="margin-bottom:10px;">
          <div>
            <h3 class="so-card-title">🏗️ ${esc(block.name)} — Hızlı Giriş &amp; Sütun Ayarı</h3>
            <p class="so-card-sub">
              Kat Aralığı: <strong>${block.minFloor}. Kat .. ${block.maxFloor}. Kat</strong> •
              Giriş: <strong>🚪 ${esc(SOState.formatFloorLabel(block.entranceFloor))}</strong>
            </p>
          </div>
          ${
            canEdit
              ? `<div class="so-chip-group">
                  <button type="button" class="so-btn so-btn-sm" onclick="SOStok.addColumnToBlock('${esc(block.id)}')">+ Cephe Sütunu Ekle</button>
                  <button type="button" class="so-btn so-btn-sm" onclick="SOStok.openBlockModal('${esc(block.id)}')">⚙️ Kat &amp; Giriş Sınırı</button>
                 </div>`
              : ""
          }
        </div>

        <div class="so-range-bar">
          <span style="font-weight:800;font-size:0.78rem;">⚡ Kat Aralığına Daire Sayısı Ata:</span>
          <input id="soRangeFrom-${esc(block.id)}" type="number" class="so-input so-range-num" value="${Math.min(Math.max(1, minF), maxF)}" />
          <span>. kattan</span>
          <input id="soRangeTo-${esc(block.id)}" type="number" class="so-input so-range-num" value="${maxF}" />
          <span>. kata kadar katta</span>
          <input id="soRangeCount-${esc(block.id)}" type="number" class="so-input so-range-num" min="0" max="20" value="4" />
          <span>daire olsun</span>
          <button type="button" class="so-btn so-btn-primary so-btn-sm" onclick="SOStok.applyFloorRangeCount('${esc(block.id)}')">✓ Uygula</button>
        </div>

        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:10px;">
          <span style="font-size:0.74rem;font-weight:800;color:#64748B;">Tahta Cephe Sütunları:</span>
          ${colBarHtml}
        </div>

        <div>${floorRows.join("")}</div>
      </div>
    `;
  }

  /* ========================================================================
     ANA RENDER
     ======================================================================== */
  function render(site, roleInfo) {
    const S = SOState;
    const esc = S.escapeHtml;
    const hidePrice = roleInfo.role === "santiye_sefi";
    const canEdit = Boolean(roleInfo.isAdmin) || roleInfo.role === "mudur_ortak" || roleInfo.role === "muteahhit_ortak";
    const mode = canEdit ? _viewMode : "tahta";
    const blocks = getBlocks(site);

    if (_blockFilter !== "hepsi" && !blocks.some(b => b.id === _blockFilter)) {
      _blockFilter = "hepsi";
    }

    const counts = { satista: 0, opsiyonlu: 0, satildi: 0, barter: 0, arsa_sahibi: 0 };
    const types = new Set();
    site.units.forEach(u => {
      if (counts[u.status] !== undefined) counts[u.status] += 1;
      if (u.type) types.add(u.type);
    });

    const visibleBlocks = _blockFilter === "hepsi" ? blocks : blocks.filter(b => b.id === _blockFilter);

    const contentHtml =
      mode === "tahta"
        ? `<div class="so-board-wrap ${visibleBlocks.length > 1 ? "is-multi" : ""}">
             ${visibleBlocks.map(blk => renderSalesBoardBlock(site, blk, esc, hidePrice, canEdit)).join("")}
           </div>`
        : visibleBlocks.map(blk => renderRapidEditBlock(site, blk, esc, hidePrice, canEdit)).join("");

    return `
      <div class="so-card so-no-print">
        <div class="so-card-header">
          <div>
            <h2 class="so-card-title">📋 Mimari Satış Tahtası &amp; Daire Stok Yönetimi (${site.units.length} Bağımsız Bölüm)</h2>
            <p class="so-card-sub">
              Üstte cephe sütunları, yanlarda katlar, ortada daire numaraları ve sahipleri. Tıklayarak güncelleyin veya yazdırın.
            </p>
          </div>

          <div class="so-chip-group">
            ${
              canEdit
                ? `<button type="button" class="so-chip ${mode === "tahta" ? "active" : ""}" onclick="SOStok.setViewMode('tahta')">
                     📋 Satış Tahtası (Şema)
                   </button>
                   <button type="button" class="so-chip ${mode === "duzenle" ? "active" : ""}" onclick="SOStok.setViewMode('duzenle')">
                     ✏️ Hızlı Tablo Düzenleme
                   </button>
                   <button type="button" class="so-btn so-btn-sm" onclick="SOStok.autoNumberUnits()">
                     🔢 1'den Numarala
                   </button>
                   <button type="button" class="so-btn so-btn-sm" onclick="SOStok.openBlockModal(null)">
                     + Blok Ekle
                   </button>`
                : ""
            }
            <button type="button" class="so-btn so-btn-primary so-btn-sm" onclick="window.print()">
              🖨️ PDF / Yazdır
            </button>
          </div>
        </div>

        <!-- BLOK SEÇİCİ -->
        <div class="so-filter-row" style="margin-bottom:8px;">
          <div class="so-chip-group">
            <button type="button" class="so-chip ${_blockFilter === "hepsi" ? "active" : ""}" onclick="SOStok.setBlockFilter('hepsi')">
              Tüm Bloklar (${blocks.length})
            </button>
            ${blocks
              .map(
                b => `<button type="button" class="so-chip ${_blockFilter === b.id ? "active" : ""}" onclick="SOStok.setBlockFilter('${esc(b.id)}')">
                        ${esc(b.name)} (${b.minFloor}..${b.maxFloor} • 🚪${b.entranceFloor})
                      </button>`
              )
              .join("")}
          </div>

          <div class="so-chip-group">
            <span class="so-chip">🟢 Satışta: ${counts.satista}</span>
            <span class="so-chip">🟡 Opsiyon: ${counts.opsiyonlu}</span>
            <span class="so-chip">🔴 Satıldı: ${counts.satildi}</span>
            ${counts.barter > 0 ? `<span class="so-chip">🟣 Barter: ${counts.barter}</span>` : ""}
            ${counts.arsa_sahibi > 0 ? `<span class="so-chip">🔵 Arsa S.: ${counts.arsa_sahibi}</span>` : ""}
          </div>
        </div>

        <!-- DURUM, TİP & CEPHE FİLTRELERİ -->
        <div class="so-filter-row">
          <div class="so-chip-group">
            <button type="button" class="so-chip ${_statusFilter === "hepsi" ? "active" : ""}" onclick="SOStok.setStatusFilter('hepsi')">Tüm Durumlar</button>
            ${Object.entries(STATUS_META)
              .map(([k, v]) => `<button type="button" class="so-chip ${_statusFilter === k ? "active" : ""}" onclick="SOStok.setStatusFilter('${k}')">${v.label}</button>`)
              .join("")}
          </div>

          <div class="so-chip-group">
            <button type="button" class="so-chip ${_facadeCountFilter === "hepsi" ? "active" : ""}" onclick="SOStok.setFacadeCountFilter('hepsi')">Tüm Cepheler</button>
            <button type="button" class="so-chip ${_facadeCountFilter === "1" ? "active" : ""}" onclick="SOStok.setFacadeCountFilter('1')">Tek Cephe</button>
            <button type="button" class="so-chip ${_facadeCountFilter === "2" ? "active" : ""}" onclick="SOStok.setFacadeCountFilter('2')">Çift Cephe</button>
            <button type="button" class="so-chip ${_facadeCountFilter === "3+" ? "active" : ""}" onclick="SOStok.setFacadeCountFilter('3+')">3+ Cephe</button>
          </div>

          <div class="so-chip-group">
            <button type="button" class="so-chip ${_directionFilter === "hepsi" ? "active" : ""}" onclick="SOStok.setDirectionFilter('hepsi')">Tüm Yönler</button>
            ${S.FACADE_DIRECTIONS.map(
              d => `<button type="button" class="so-chip ${_directionFilter === d.code ? "active" : ""}" onclick="SOStok.setDirectionFilter('${d.code}')">🧭 ${d.label}</button>`
            ).join("")}
          </div>
        </div>
      </div>

      ${contentHtml}
    `;
  }

  function setViewMode(m) { _viewMode = m === "duzenle" ? "duzenle" : "tahta"; SOApp.render(); }
  function setBlockFilter(v) { _blockFilter = v; SOApp.render(); }
  function setStatusFilter(v) { _statusFilter = v; SOApp.render(); }
  function setTypeFilter(v) { _typeFilter = v; SOApp.render(); }
  function setFacadeCountFilter(v) { _facadeCountFilter = v; SOApp.render(); }
  function setDirectionFilter(v) { _directionFilter = v; SOApp.render(); }

  /* ========================================================================
     SÜTUN (CEPHE BAŞLIĞI) YÖNETİMİ
     ======================================================================== */
  function openColumnModal(blockId, colIndex) {
    const S = SOState;
    const esc = S.escapeHtml;
    const site = S.getActiveSite();
    if (!site) return;
    const blk = getBlocks(site).find(b => b.id === blockId);
    if (!blk || !blk.columns[colIndex]) return;
    const col = blk.columns[colIndex];

    SOApp.openModal(
      `🧭 ${esc(blk.name)} • ${colIndex + 1}. Cephe Sütunu`,
      `
        <form onsubmit="SOStok.saveColumn(event, '${esc(blockId)}', ${colIndex})">
          <div class="so-field">
            <label>Sütun Başlığı (Şemada Üstte Görünür) *</label>
            <input id="soColLabel" class="so-input" required value="${esc(col.label)}" placeholder="Örn: GÜNEY-DOĞU, KUZEY-BATI, DÜKKAN" />
          </div>
          <div class="so-field">
            <label>Sütun Rengi</label>
            <select id="soColColor" class="so-select">
              ${S.COLUMN_COLORS.map(c => `<option value="${c.id}" ${col.color === c.id ? "selected" : ""}>${c.label}</option>`).join("")}
            </select>
          </div>
          <div class="so-field">
            <label>Cephe Yönleri</label>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:4px;">
              ${renderFacadeCheckboxes("soColDir", col.facades || [], "")}
            </div>
          </div>
          <label style="display:flex;align-items:center;gap:8px;font-size:0.8rem;font-weight:700;margin-bottom:12px;">
            <input type="checkbox" id="soColSyncUnits" checked />
            <span>Bu sütundaki mevcut tüm dairelerin cephe yönünü buna eşitle</span>
          </label>
          <div style="display:flex;justify-content:flex-end;gap:8px;">
            <button type="button" class="so-btn" onclick="SOApp.closeModal()">İptal</button>
            <button type="submit" class="so-btn so-btn-primary">✓ Sütunu Güncelle</button>
          </div>
        </form>
      `
    );
  }

  function saveColumn(event, blockId, colIndex) {
    event.preventDefault();
    const S = SOState;
    const site = S.getActiveSite();
    if (!site) return;
    const blk = getBlocks(site).find(b => b.id === blockId);
    if (!blk || !blk.columns[colIndex]) return;

    const label = document.getElementById("soColLabel").value.trim().toUpperCase();
    const color = document.getElementById("soColColor").value;
    const facades = [...document.querySelectorAll('input[name="soColDir"]:checked')].map(el => el.value);
    const syncUnits = document.getElementById("soColSyncUnits").checked;

    blk.columns[colIndex].label = label;
    blk.columns[colIndex].color = color;
    blk.columns[colIndex].facades = facades;

    if (syncUnits) {
      site.units.forEach(u => {
        if (u.blockId === blk.id && Number(u.colIndex) === colIndex) {
          u.facades = [...facades];
        }
      });
    }

    S.save();
    S.addLog(site.id, "Cephe Sütunu Güncellendi", `${blk.name} ${colIndex + 1}. sütun '${label}' olarak güncellendi.`);
    SOApp.closeModal();
    SOApp.render();
    SOApp.toast(`'${label}' sütunu güncellendi.`, "ok");
  }

  function addColumnToBlock(blockId) {
    const S = SOState;
    const site = S.getActiveSite();
    if (!site) return;
    const blk = getBlocks(site).find(b => b.id === blockId);
    if (!blk) return;
    const nextIdx = blk.columns.length;
    const preset = S.buildDefaultColumns(nextIdx + 1)[nextIdx];
    blk.columns.push(preset);
    S.save();
    SOApp.render();
    SOApp.toast(`Yeni cephe sütunu eklendi (${preset.label}).`, "ok");
  }

  function addUnitAtSlot(blockId, floor, colIndex) {
    const S = SOState;
    const site = S.getActiveSite();
    if (!site) return;
    const blk = getBlocks(site).find(b => b.id === blockId);
    if (!blk) return;
    const colTpl = blk.columns[colIndex];
    const u = S.makeEmptyUnit(blk, floor, {
      colIndex,
      facades: colTpl && Array.isArray(colTpl.facades) ? [...colTpl.facades] : []
    });
    site.units.push(u);
    S.save();
    openUnitModal(u.id);
  }

  /* ========================================================================
     HIZLI INLINE GÜNCELLEMELER & KAT ARALIĞI İŞLEMLERİ
     ======================================================================== */
  function updateUnitField(unitId, field, value, shouldRerender) {
    const site = SOState.getActiveSite();
    if (!site) return;
    const unit = site.units.find(u => u.id === unitId);
    if (!unit) return;
    unit[field] = value;
    SOState.save();
    if (shouldRerender) {
      SOState.addLog(site.id, "Daire Güncellendi", `${unit.code || "İsimsiz Daire"} (${unit.floor}. Kat) '${field}' güncellendi.`);
      SOApp.render();
    }
  }

  function toggleUnitFacade(unitId, dirCode) {
    const site = SOState.getActiveSite();
    if (!site) return;
    const unit = site.units.find(u => u.id === unitId);
    if (!unit) return;
    if (!Array.isArray(unit.facades)) unit.facades = [];
    if (unit.facades.includes(dirCode)) {
      unit.facades = unit.facades.filter(c => c !== dirCode);
    } else {
      unit.facades.push(dirCode);
    }
    SOState.save();
    SOApp.render();
  }

  function setFloorUnitCount(site, block, floor, targetCount) {
    const count = Math.max(0, Math.min(20, Number(targetCount) || 0));
    SOState.ensureBlockSchema(block, site.units);

    while (block.columns.length < count) {
      const extra = SOState.buildDefaultColumns(count);
      block.columns.push(extra[block.columns.length]);
    }

    const onFloor = site.units
      .filter(u => u.blockId === block.id && Number(u.floor) === Number(floor))
      .sort((a, b) => Number(a.colIndex) - Number(b.colIndex));

    if (onFloor.length < count) {
      const usedCols = new Set(onFloor.map(u => Number(u.colIndex)));
      const sample = onFloor[onFloor.length - 1];
      const toAdd = count - onFloor.length;
      for (let i = 0; i < toAdd; i++) {
        let colIdx = 0;
        while (usedCols.has(colIdx)) colIdx += 1;
        usedCols.add(colIdx);
        const colTpl = block.columns[colIdx];
        site.units.push(
          SOState.makeEmptyUnit(block, floor, {
            colIndex: colIdx,
            type: sample ? sample.type : "3+1",
            sqm: sample ? sample.sqm : 0,
            facades: colTpl && Array.isArray(colTpl.facades) ? [...colTpl.facades] : []
          })
        );
      }
    } else if (onFloor.length > count) {
      const removeIds = new Set(onFloor.slice(count).map(u => u.id));
      site.units = site.units.filter(u => !removeIds.has(u.id));
    }
  }

  function adjustFloorCount(blockId, floor, delta) {
    const site = SOState.getActiveSite();
    if (!site) return;
    const blk = getBlocks(site).find(b => b.id === blockId);
    if (!blk) return;
    const current = site.units.filter(u => u.blockId === blk.id && Number(u.floor) === Number(floor)).length;
    const next = Math.max(0, Math.min(20, current + Number(delta)));
    setFloorUnitCount(site, blk, floor, next);
    SOState.save();
    SOApp.render();
  }

  function applyFloorRangeCount(blockId, customFrom, customTo, customCount) {
    const site = SOState.getActiveSite();
    if (!site) return;
    const blk = getBlocks(site).find(b => b.id === blockId);
    if (!blk) return;

    const fromF = customFrom !== undefined ? Number(customFrom) : Number(document.getElementById("soRangeFrom-" + blockId).value);
    const toF = customTo !== undefined ? Number(customTo) : Number(document.getElementById("soRangeTo-" + blockId).value);
    const targetCount = customCount !== undefined ? Number(customCount) : Number(document.getElementById("soRangeCount-" + blockId).value);

    if (isNaN(fromF) || isNaN(toF) || isNaN(targetCount)) return;
    if (fromF > toF) {
      SOApp.toast("Başlangıç katı bitiş katından büyük olamaz.", "danger");
      return;
    }

    if (fromF < Number(blk.minFloor)) blk.minFloor = fromF;
    if (toF > Number(blk.maxFloor)) blk.maxFloor = toF;

    for (let f = fromF; f <= toF; f++) {
      setFloorUnitCount(site, blk, f, targetCount);
    }

    SOState.save();
    SOState.addLog(site.id, "Kat Daire Adedi", `${blk.name}: ${fromF}..${toF}. katlar arası her kat ${targetCount} daire olarak ayarlandı.`);
    if (typeof SOApp !== "undefined") {
      SOApp.render();
      SOApp.toast(`${fromF}..${toF}. katlar arası katta ${targetCount} daire olacak şekilde güncellendi.`, "ok");
    }
  }

  function setEntranceFloor(blockId, floor) {
    const site = SOState.getActiveSite();
    if (!site) return;
    const blk = getBlocks(site).find(b => b.id === blockId);
    if (!blk) return;
    blk.entranceFloor = Number(floor);
    SOState.save();
    SOState.addLog(site.id, "Giriş Katı Değişti", `${blk.name} apartman giriş katı ${floor}. kat yapıldı.`);
    SOApp.render();
    SOApp.toast(`${blk.name} giriş katı ${SOState.formatFloorLabel(floor)} olarak işaretlendi.`, "ok");
  }

  function copyFloorTemplateToSameCount(blockId, sourceFloor) {
    const site = SOState.getActiveSite();
    if (!site) return;
    const blk = getBlocks(site).find(b => b.id === blockId);
    if (!blk) return;

    const srcUnits = site.units
      .filter(u => u.blockId === blk.id && Number(u.floor) === Number(sourceFloor))
      .sort((a, b) => Number(a.colIndex) - Number(b.colIndex));
    if (srcUnits.length === 0) return;

    let updatedFloors = 0;
    for (let f = Number(blk.minFloor); f <= Number(blk.maxFloor); f++) {
      if (f === Number(sourceFloor)) continue;
      const targetUnits = site.units
        .filter(u => u.blockId === blk.id && Number(u.floor) === f)
        .sort((a, b) => Number(a.colIndex) - Number(b.colIndex));
      if (targetUnits.length !== srcUnits.length) continue;
      targetUnits.forEach((tu, idx) => {
        const src = srcUnits[idx];
        tu.type = src.type;
        tu.sqm = src.sqm;
        tu.netSqm = src.netSqm;
        tu.colIndex = src.colIndex;
        tu.facades = Array.isArray(src.facades) ? [...src.facades] : [];
        tu.facadeNote = src.facadeNote;
      });
      updatedFloors += 1;
    }

    if (updatedFloors === 0) {
      SOApp.toast(`Bu blokta ${srcUnits.length} daireli başka kat bulunamadı.`, "info");
      return;
    }

    SOState.save();
    SOState.addLog(site.id, "Kat Cephe Şablonu Kopyalandı", `${blk.name} ${sourceFloor}. kat tip/cephe düzeni ${updatedFloors} kata uygulandı.`);
    SOApp.render();
    SOApp.toast(`Tip & cephe düzeni ${srcUnits.length} daireli ${updatedFloors} kata kopyalandı.`, "ok");
  }

  function autoNumberUnits() {
    const site = SOState.getActiveSite();
    if (!site || site.units.length === 0) return;
    if (!global.confirm("Daire numaraları alttan üste doğru 1, 2, 3... olarak sırayla doldurulsun mu? (Sonra her daireyi el ile değiştirebilirsiniz)")) {
      return;
    }

    const blocks = getBlocks(site);
    blocks.forEach(blk => {
      let doorNo = 1;
      for (let f = Number(blk.minFloor); f <= Number(blk.maxFloor); f++) {
        const floorUnits = site.units
          .filter(u => u.blockId === blk.id && Number(u.floor) === f)
          .sort((a, b) => Number(a.colIndex) - Number(b.colIndex));
        floorUnits.forEach(u => {
          u.code = String(doorNo);
          doorNo += 1;
        });
      }
    });

    SOState.save();
    SOState.addLog(site.id, "Otomatik Numaralandırma", `Blok daireleri alttan üste numaralandırıldı.`);
    SOApp.render();
    SOApp.toast("Daireler sırayla numaralandırıldı.", "ok");
  }

  /* ========================================================================
     BLOK EKLE / KAT & GİRİŞ SINIRI DÜZENLE
     ======================================================================== */
  function openBlockModal(blockId) {
    const S = SOState;
    const site = S.getActiveSite();
    if (!site) return;
    const blocks = getBlocks(site);
    const blk = blockId ? blocks.find(b => b.id === blockId) : null;

    SOApp.openModal(
      blk ? `⚙️ ${S.escapeHtml(blk.name)} — Kat & Giriş Ayarı` : "+ Yeni Blok & Satış Tahtası Ekle",
      `
        <form onsubmit="SOStok.saveBlock(event, '${blk ? S.escapeHtml(blk.id) : ""}')">
          <div class="so-field">
            <label>Blok Adı *</label>
            <input id="soBlkName" class="so-input" required value="${blk ? S.escapeHtml(blk.name) : blocks.length + 1 + ". Blok"}" />
          </div>
          <div class="so-form-grid">
            <div class="so-field">
              <label>En Alt Kat (-2, -1, 0...) *</label>
              <input id="soBlkMinFloor" type="number" class="so-input" min="-10" max="20" required value="${blk ? blk.minFloor : -1}" />
            </div>
            <div class="so-field">
              <label>En Üst Kat *</label>
              <input id="soBlkMaxFloor" type="number" class="so-input" min="-5" max="60" required value="${blk ? blk.maxFloor : 7}" />
            </div>
          </div>
          <div class="so-form-grid">
            <div class="so-field">
              <label>Apartman Giriş Katı * (Örn: -1 veya 0)</label>
              <input id="soBlkEntrance" type="number" class="so-input" min="-10" max="60" required value="${blk ? blk.entranceFloor : 0}" />
            </div>
            ${
              !blk
                ? `<div class="so-field">
                    <label>Her Katta Varsayılan Daire Sayısı</label>
                    <input id="soBlkUnitsPerFloor" type="number" class="so-input" min="0" max="20" value="4" />
                  </div>`
                : `<div></div>`
            }
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-top:12px;flex-wrap:wrap;">
            ${
              blk && blocks.length > 1
                ? `<button type="button" class="so-btn so-btn-danger so-btn-sm" onclick="SOStok.deleteBlock('${S.escapeHtml(blk.id)}')">🗑️ Bloku Sil</button>`
                : `<span></span>`
            }
            <div style="display:flex;gap:8px;">
              <button type="button" class="so-btn" onclick="SOApp.closeModal()">İptal</button>
              <button type="submit" class="so-btn so-btn-primary">✓ Kaydet</button>
            </div>
          </div>
        </form>
      `
    );
  }

  function saveBlock(event, blockId) {
    event.preventDefault();
    const S = SOState;
    const site = S.getActiveSite();
    if (!site) return;

    const name = document.getElementById("soBlkName").value.trim();
    const minFloor = Number(document.getElementById("soBlkMinFloor").value);
    const maxFloor = Number(document.getElementById("soBlkMaxFloor").value);
    const entranceFloor = Number(document.getElementById("soBlkEntrance").value);

    if (minFloor > maxFloor) {
      SOApp.toast("En alt kat, en üst kattan büyük olamaz.", "danger");
      return;
    }
    if (entranceFloor < minFloor || entranceFloor > maxFloor) {
      SOApp.toast("Apartman giriş katı, en alt kat ile en üst kat arasında olmalıdır.", "danger");
      return;
    }

    if (blockId) {
      const blk = site.blocks.find(b => b.id === blockId);
      if (blk) {
        blk.name = name;
        blk.minFloor = minFloor;
        blk.maxFloor = maxFloor;
        blk.entranceFloor = entranceFloor;
        site.units.forEach(u => {
          if (u.blockId === blk.id) u.block = name;
        });
      }
      S.addLog(site.id, "Blok Ayarı", `${name} güncellendi (${minFloor}..${maxFloor}, Giriş: ${entranceFloor}. Kat).`);
    } else {
      const perFloorEl = document.getElementById("soBlkUnitsPerFloor");
      const perFloor = perFloorEl ? Math.max(0, Math.min(20, Number(perFloorEl.value) || 0)) : 0;
      const cols = S.buildDefaultColumns(perFloor || 4);
      const newBlk = {
        id: "blk-" + Date.now() + "-" + Math.floor(Math.random() * 100),
        name,
        minFloor,
        maxFloor,
        entranceFloor,
        columns: cols
      };
      site.blocks.push(newBlk);
      if (perFloor > 0) {
        for (let f = minFloor; f <= maxFloor; f++) {
          for (let i = 0; i < perFloor; i++) {
            const colTpl = cols[i];
            site.units.push(
              S.makeEmptyUnit(newBlk, f, {
                colIndex: i,
                facades: colTpl && Array.isArray(colTpl.facades) ? [...colTpl.facades] : []
              })
            );
          }
        }
      }
      _blockFilter = "hepsi";
      S.addLog(site.id, "Yeni Blok", `${name} (${minFloor}..${maxFloor}, Giriş: ${entranceFloor}. Kat) eklendi.`);
    }

    S.save();
    SOApp.closeModal();
    SOApp.render();
    SOApp.toast("Blok kat tablosu güncellendi.", "ok");
  }

  function deleteBlock(blockId) {
    const S = SOState;
    const site = S.getActiveSite();
    if (!site || site.blocks.length <= 1) return;
    const blk = site.blocks.find(b => b.id === blockId);
    if (!blk) return;
    if (!global.confirm(`'${blk.name}' ve içindeki daireler silinsin mi?`)) return;

    site.blocks = site.blocks.filter(b => b.id !== blockId);
    site.units = site.units.filter(u => u.blockId !== blockId);
    _blockFilter = "hepsi";
    S.save();
    S.addLog(site.id, "Blok Silindi", `${blk.name} kaldırıldı.`);
    SOApp.closeModal();
    SOApp.render();
    SOApp.toast("Blok silindi.", "ok");
  }

  /* ========================================================================
     TEKİL DAİRE DETAY & DÜZENLEME MODALI
     ======================================================================== */
  function syncUnitModalFloors(selectedFloor) {
    const site = SOState.getActiveSite();
    if (!site) return;
    const blkId = document.getElementById("soUnitBlockId").value;
    const blk = getBlocks(site).find(b => b.id === blkId) || getBlocks(site)[0];
    const floorSel = document.getElementById("soUnitFloor");
    const colSel = document.getElementById("soUnitColIndex");
    if (!blk) return;

    if (floorSel) {
      const opts = [];
      for (let f = Number(blk.maxFloor); f >= Number(blk.minFloor); f--) {
        const entTag = f === Number(blk.entranceFloor) ? " — 🚪 Apt. Giriş Katı" : "";
        const sel = Number(selectedFloor) === f ? "selected" : "";
        opts.push(`<option value="${f}" ${sel}>${SOState.escapeHtml(SOState.formatFloorLabel(f) + entTag)}</option>`);
      }
      floorSel.innerHTML = opts.join("");
    }
    if (colSel) {
      const prevCol = colSel.value;
      colSel.innerHTML = (blk.columns || [])
        .map((c, idx) => `<option value="${idx}" ${String(idx) === String(prevCol) ? "selected" : ""}>${idx + 1}. ${SOState.escapeHtml(c.label)}</option>`)
        .join("");
    }
  }

  function updateUnitFacadePreview() {
    const checked = [...document.querySelectorAll('input[name="soUnitFacade"]:checked')].map(el => el.value);
    const sum = SOState.formatFacadeSummary(checked);
    const out = document.getElementById("soUnitFacadePreview");
    if (out) out.textContent = sum.fullLabel;
  }

  function openUnitModal(unitId, presetBlockId, presetFloor) {
    const S = SOState;
    const esc = S.escapeHtml;
    const site = S.getActiveSite();
    if (!site) return;
    const user = S.getActiveUser();
    const roleInfo = S.getUserRoleOnSite(user.id, site.id) || { role: "mudur_ortak" };
    const hidePrice = roleInfo.role === "santiye_sefi";
    const canEdit = Boolean(roleInfo.isAdmin) || roleInfo.role === "mudur_ortak" || roleInfo.role === "muteahhit_ortak";

    const blocks = getBlocks(site);
    const existing = unitId ? site.units.find(u => u.id === unitId) : null;
    const activeBlk = existing
      ? blocks.find(b => b.id === existing.blockId) || blocks[0]
      : blocks.find(b => b.id === presetBlockId) || getActiveBlock(site);

    const targetFloor =
      existing !== null
        ? existing.floor
        : presetFloor !== undefined
        ? presetFloor
        : activeBlk.entranceFloor;

    if (!canEdit && existing) {
      const fSum = S.formatFacadeSummary(existing.facades);
      const sm = STATUS_META[existing.status] || STATUS_META.satista;
      SOApp.openModal(
        `🏠 ${esc(activeBlk.name)} • Daire ${esc(existing.code || "—")}`,
        `
          <div style="display:grid;gap:8px;font-size:0.86rem;">
            <div>Durum: <strong>${sm.label}</strong></div>
            <div>Kat: <strong>${esc(S.formatBoardFloorLabel(existing.floor))}</strong> ${Number(existing.floor) === Number(activeBlk.entranceFloor) ? "(🚪 Apt. Giriş Katı)" : ""}</div>
            <div>Daire Sahibi / Alıcı: <strong>${esc(existing.buyerName || "—")}</strong></div>
            <div>Tip &amp; Alan: <strong>${esc(existing.type)} • ${existing.sqm} m²</strong></div>
            <div>Cephe: <strong>🧭 ${esc(fSum.fullLabel)}</strong></div>
            ${existing.facadeNote ? `<div>Not: <strong>${esc(existing.facadeNote)}</strong></div>` : ""}
            <div>Fiyat: <strong>${hidePrice ? "🔒 Fiyat Gizli" : S.formatTL(existing.price)}</strong></div>
          </div>
        `
      );
      return;
    }

    const defaultFacades = existing ? existing.facades || [] : [];
    const fSum = S.formatFacadeSummary(defaultFacades);

    SOApp.openModal(
      existing ? `✏️ Daire Künyesi — ${esc(existing.code || "No Girilmedi")}` : "+ Yeni Bağımsız Bölüm Ekle",
      `
        <form onsubmit="SOStok.saveUnit(event, '${existing ? esc(existing.id) : ""}')">
          <div class="so-form-grid">
            <div class="so-field">
              <label>Blok *</label>
              <select id="soUnitBlockId" class="so-select" onchange="SOStok.syncUnitModalFloors()">
                ${blocks.map(b => `<option value="${esc(b.id)}" ${b.id === activeBlk.id ? "selected" : ""}>${esc(b.name)}</option>`).join("")}
              </select>
            </div>
            <div class="so-field">
              <label>Bulunduğu Kat *</label>
              <select id="soUnitFloor" class="so-select"></select>
            </div>
          </div>

          <div class="so-form-grid">
            <div class="so-field">
              <label>Daire / Kapı No (Daire İçinde Yuvarlakta Görünür)</label>
              <input id="soUnitCode" class="so-input" value="${existing ? esc(existing.code) : ""}" placeholder="Örn: 29" />
            </div>
            <div class="so-field">
              <label>Kısa Etiket (Örn: VK, İPTK)</label>
              <input id="soUnitShortTag" class="so-input" value="${existing ? esc(existing.shortTag || "") : ""}" placeholder="Örn: VK" />
            </div>
          </div>

          <div class="so-form-grid">
            <div class="so-field">
              <label>Daire Sahibi / Alıcı (Tahtada İsim Görünür)</label>
              <input id="soUnitBuyer" class="so-input" value="${existing ? esc(existing.buyerName || "") : ""}" placeholder="Örn: VOLKAN.B, BARTER, ARMA SERAMİK" />
            </div>
            <div class="so-field">
              <label>Satış Durumu</label>
              <select id="soUnitStatus" class="so-select">
                ${Object.entries(STATUS_META)
                  .map(([k, v]) => `<option value="${k}" ${existing && existing.status === k ? "selected" : !existing && k === "satista" ? "selected" : ""}>${v.label}</option>`)
                  .join("")}
              </select>
            </div>
          </div>

          <div class="so-form-grid">
            <div class="so-field">
              <label>Liste Fiyatı (₺)</label>
              <input id="soUnitPrice" type="number" class="so-input" min="0" step="50000" value="${existing ? existing.price : 0}" />
            </div>
            <div class="so-field">
              <label>Tahta Cephe Sütunu</label>
              <select id="soUnitColIndex" class="so-select">
                ${(activeBlk.columns || [])
                  .map((c, idx) => `<option value="${idx}" ${existing && Number(existing.colIndex) === idx ? "selected" : ""}>${idx + 1}. ${esc(c.label)}</option>`)
                  .join("")}
              </select>
            </div>
          </div>

          <div class="so-form-grid">
            <div class="so-field">
              <label>Daire Tipi</label>
              <select id="soUnitType" class="so-select">
                ${S.UNIT_TYPES.map(t => `<option value="${esc(t)}" ${existing && existing.type === t ? "selected" : !existing && t === "3+1" ? "selected" : ""}>${esc(t)}</option>`).join("")}
              </select>
            </div>
            <div class="so-field">
              <label>Brüt m²</label>
              <input id="soUnitSqm" type="number" class="so-input" min="0" value="${existing ? existing.sqm : 0}" />
            </div>
          </div>

          <div class="so-field">
            <label>Cephe Yönleri — <strong id="soUnitFacadePreview" style="color:#2563EB;">${esc(fSum.fullLabel)}</strong></label>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:4px;">
              ${renderFacadeCheckboxes("soUnitFacade", defaultFacades, "SOStok.updateUnitFacadePreview()")}
            </div>
          </div>

          <div class="so-field">
            <label>Ekstra Not</label>
            <input id="soUnitFacadeNote" class="so-input" value="${existing ? esc(existing.facadeNote || "") : ""}" placeholder="Örn: Köşe Daire, Teraslı" />
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;margin-top:10px;">
            ${
              existing
                ? `<button type="button" class="so-btn so-btn-danger so-btn-sm" onclick="SOStok.deleteUnit('${esc(existing.id)}')">🗑️ Daireyi Sil</button>`
                : `<span></span>`
            }
            <div style="display:flex;gap:8px;">
              <button type="button" class="so-btn" onclick="SOApp.closeModal()">İptal</button>
              <button type="submit" class="so-btn so-btn-primary">✓ Kaydet</button>
            </div>
          </div>
        </form>
      `
    );

    syncUnitModalFloors(targetFloor);
  }

  function saveUnit(event, unitId) {
    event.preventDefault();
    const S = SOState;
    const site = S.getActiveSite();
    if (!site) return;

    const blockId = document.getElementById("soUnitBlockId").value;
    const blk = getBlocks(site).find(b => b.id === blockId) || getBlocks(site)[0];
    const floor = Number(document.getElementById("soUnitFloor").value);
    const code = document.getElementById("soUnitCode").value.trim();
    const shortTag = document.getElementById("soUnitShortTag").value.trim();
    const buyerName = document.getElementById("soUnitBuyer").value.trim();
    const status = document.getElementById("soUnitStatus").value;
    const price = Number(document.getElementById("soUnitPrice").value) || 0;
    const colIndex = Number(document.getElementById("soUnitColIndex").value) || 0;
    const type = document.getElementById("soUnitType").value;
    const sqm = Number(document.getElementById("soUnitSqm").value) || 0;
    const facades = [...document.querySelectorAll('input[name="soUnitFacade"]:checked')].map(el => el.value);
    const facadeNote = document.getElementById("soUnitFacadeNote").value.trim();

    if (unitId) {
      const existing = site.units.find(u => u.id === unitId);
      if (!existing) return;
      existing.blockId = blk.id;
      existing.block = blk.name;
      existing.floor = floor;
      existing.code = code;
      existing.shortTag = shortTag;
      existing.buyerName = buyerName;
      existing.status = status;
      existing.price = price;
      existing.colIndex = colIndex;
      existing.type = type;
      existing.sqm = sqm;
      existing.facades = facades;
      existing.facadeNote = facadeNote;
    } else {
      site.units.push(
        S.makeEmptyUnit(blk, floor, {
          code,
          shortTag,
          buyerName,
          status,
          price,
          colIndex,
          type,
          sqm,
          facades,
          facadeNote
        })
      );
    }

    S.save();
    SOApp.closeModal();
    SOApp.render();
    SOApp.toast("Daire kaydedildi.", "ok");
  }

  function deleteUnit(unitId) {
    const S = SOState;
    const site = S.getActiveSite();
    if (!site) return;
    site.units = site.units.filter(x => x.id !== unitId);
    S.save();
    SOApp.closeModal();
    SOApp.render();
    SOApp.toast("Daire silindi.", "ok");
  }

  global.SOStok = {
    render,
    setViewMode,
    setBlockFilter,
    setStatusFilter,
    setTypeFilter,
    setFacadeCountFilter,
    setDirectionFilter,
    openColumnModal,
    saveColumn,
    addColumnToBlock,
    addUnitAtSlot,
    updateUnitField,
    toggleUnitFacade,
    adjustFloorCount,
    applyFloorRangeCount,
    setEntranceFloor,
    copyFloorTemplateToSameCount,
    autoNumberUnits,
    openBlockModal,
    saveBlock,
    deleteBlock,
    openUnitModal,
    syncUnitModalFloors,
    updateUnitFacadePreview,
    saveUnit,
    deleteUnit
  };
})(window);
