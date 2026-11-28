/* ==========================================================================
   MÜLKİZLE SATIŞ OFİSİ — 2 KATMANLI TERMİN PLANI & FOTOĞRAFLI TESLİM CHECKLIST
   ========================================================================== */
(function (global) {
  let _layerView = "ekip";
  let _selectedDeliveryIdx = 0;

  function render(site, roleInfo) {
    const S = SOState;
    const esc = S.escapeHtml;
    const isManager = Boolean(roleInfo.isAdmin) || roleInfo.role === "mudur_ortak" || roleInfo.role === "muteahhit_ortak";
    const isContractor = roleInfo.role === "muteahhit";

    if (_selectedDeliveryIdx >= site.deliveryUnits.length) {
      _selectedDeliveryIdx = 0;
    }
    const activeUnit = site.deliveryUnits[_selectedDeliveryIdx];
    const doneItems = activeUnit ? activeUnit.items.filter(i => i.done).length : 0;

    const milestonesHtml = site.milestones
      .map(ms => {
        const isDone = ms.status === "done";
        if (_layerView === "alici") {
          return `
            <div class="so-milestone-card ${isDone ? "is-done" : ""}">
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <strong>${esc(ms.title)}</strong>
                <span class="so-role-pill">${isDone ? "✓ Tamamlandı" : esc(ms.buyerPeriod)}</span>
              </div>
              ${
                ms.revisionNote
                  ? `<div style="font-size:0.74rem;color:#475569;background:#F8FAFC;padding:6px 8px;border-radius:6px;border:1px solid #E2E8F0;">
                      ℹ️ Kurumsal Bilgi: ${esc(ms.revisionNote)}
                     </div>`
                  : `<div style="font-size:0.74rem;color:#64748B;">Alıcı kataloğunda dönem takvimi gösterilir.</div>`
              }
              ${
                ms.photoProof
                  ? `<img src="${ms.photoProof}" alt="${esc(ms.title)}" style="width:100%;height:78px;object-fit:cover;border-radius:8px;" />`
                  : ""
              }
            </div>
          `;
        }

        return `
          <div class="so-milestone-card ${isDone ? "is-done" : ""}">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <strong>${esc(ms.title)}</strong>
              <span class="so-role-pill">${isDone ? "✓ Bitti" : ms.internalDaysLeft + " Gün"}</span>
            </div>
            <div style="font-size:0.74rem;color:#64748B;">İç planlama: ${isDone ? "Katalogda yayında" : "Devam ediyor / Bekliyor"}</div>
            ${
              !isDone && isManager
                ? `<div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:4px;">
                    <select id="soRev-${ms.id}" class="so-select" style="font-size:0.72rem;padding:4px 6px;">
                      <option value="">Revize notu yok</option>
                      <option value="Beton kürlenme güvenliği sebebiyle tedbir süresi eklendi.">Beton kürlenme güvenliği</option>
                      <option value="Olumsuz hava muhalefeti nedeniyle revize edildi.">Hava muhalefeti</option>
                      <option value="Resmi kurum trafo ve iskan süreci bekleniyor.">Resmi kurum trafo/iskan</option>
                    </select>
                    <button type="button" class="so-btn so-btn-ok so-btn-sm" onclick="SOSantiye.publishMilestone('${esc(ms.id)}')">
                      ✓ Onayla &amp; Yayınla
                    </button>
                  </div>`
                : ""
            }
          </div>
        `;
      })
      .join("");

    let deliveryAddBar = "";
    if (!isContractor) {
      if (site.units.length === 0) {
        deliveryAddBar = `
          <div class="so-banner so-banner-info" style="margin-bottom:12px;">
            <span>Teslim checklist'i açabilmek için önce Daire Stok Matrisinden daire ekleyin.</span>
            <button type="button" class="so-btn so-btn-primary so-btn-sm" onclick="SOApp.sekmeSec('stok')">
              🏢 Daire Stok Matrisine Git
            </button>
          </div>
        `;
      } else {
        const availableForChecklist = site.units.filter(
          u => !site.deliveryUnits.some(du => du.unitCode === u.code)
        );
        if (availableForChecklist.length > 0) {
          deliveryAddBar = `
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:12px;">
              <select id="soAddDeliveryUnitSel" class="so-select" style="width:auto;">
                ${availableForChecklist.map(u => `<option value="${esc(u.code)}">${esc(u.block + " • " + u.code)} (${esc(u.type)})</option>`).join("")}
              </select>
              <button type="button" class="so-btn so-btn-primary so-btn-sm" onclick="SOSantiye.addDeliveryUnit()">
                + Seçili Daireyi Teslim Listesine Al
              </button>
            </div>
          `;
        }
      }
    }

    const deliveryHtml = !activeUnit
      ? `<div class="so-banner so-banner-info">Henüz teslim kontrol listesine eklenmiş daire yok.</div>`
      : `
        <div class="so-filter-row" style="margin-bottom:12px;">
          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
            <label style="font-size:0.8rem;font-weight:800;">Aktif Teslim Dairesi:</label>
            <select class="so-select" style="width:auto;" onchange="SOSantiye.selectDeliveryUnit(Number(this.value))">
              ${site.deliveryUnits
                .map((du, idx) => `<option value="${idx}" ${idx === _selectedDeliveryIdx ? "selected" : ""}>${esc(du.unitCode)} (${du.items.filter(i => i.done).length}/7)</option>`)
                .join("")}
            </select>
            <span class="so-role-pill">İlerleme: ${doneItems} / 7 Tamamlandı</span>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:10px;">
          ${activeUnit.items
            .map(item => {
              const cls = item.done ? "is-done" : item.issueNote ? "has-issue" : "";
              return `
                <div class="so-checklist-item ${cls}">
                  <div style="min-width:220px;flex:1;">
                    <div style="font-weight:800;font-size:0.86rem;">
                      ${item.done ? "✅" : item.issueNote ? "⚠️" : "⬜"} ${esc(item.label)}
                    </div>
                    ${
                      item.issueNote
                        ? `<div style="font-size:0.75rem;color:#B91C1C;margin-top:3px;">Eksik Notu: ${esc(item.issueNote)}</div>`
                        : ""
                    }
                  </div>

                  <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                    ${
                      item.photoUrl
                        ? `<img src="${item.photoUrl}" alt="Kanıt" class="so-photo-thumb" title="Kanıt Fotoğrafı Yüklendi" />`
                        : `<span style="font-size:0.72rem;color:#64748B;">📷 Fotoğraf yok</span>`
                    }
                    ${
                      !isContractor && !item.done
                        ? `
                          <button type="button" class="so-btn so-btn-sm" onclick="SOSantiye.attachDemoPhoto('${esc(item.id)}')">
                            📷 Örnek Kanıt Ekle
                          </button>
                          <label class="so-btn so-btn-sm" style="cursor:pointer;">
                            📁 Fotoğraf Yükle
                            <input type="file" accept="image/*" style="display:none;" onchange="SOSantiye.uploadRealPhoto(event, '${esc(item.id)}')" />
                          </label>
                          <button type="button" class="so-btn so-btn-sm" onclick="SOSantiye.flagIssue('${esc(item.id)}')">
                            ⚠️ Eksik Bildir
                          </button>
                          <button type="button" class="so-btn so-btn-ok so-btn-sm" onclick="SOSantiye.markChecklistDone('${esc(item.id)}')">
                            ✓ Tamamlandı
                          </button>
                        `
                        : ""
                    }
                  </div>
                </div>
              `;
            })
            .join("")}
        </div>
      `;

    return `
      <div class="so-card">
        <div class="so-card-header">
          <div>
            <h2 class="so-card-title">🏗️ İki Katmanlı İnşaat Termin Planı &amp; Online Proje Kataloğu</h2>
            <p class="so-card-sub">Ekip içi gerçek gün sayacı vs. alıcıya güven veren dönem bazlı online katalog görünümü.</p>
          </div>
          <div class="so-chip-group">
            <button type="button" class="so-chip ${_layerView === "ekip" ? "active" : ""}" onclick="SOSantiye.setLayer('ekip')">
              🔒 Katman 1: Ekip İçi Sayaç
            </button>
            <button type="button" class="so-chip ${_layerView === "alici" ? "active" : ""}" onclick="SOSantiye.setLayer('alici')">
              🌐 Katman 2: Alıcı Kataloğu Önizleme
            </button>
          </div>
        </div>

        <div class="so-milestone-list">${milestonesHtml}</div>
      </div>

      <div class="so-card">
        <div class="so-card-header">
          <div>
            <h2 class="so-card-title">👷‍♂️ Fotoğraflı Daire Teslim Checklist'i ("Fotoğraf Yoksa Tamamlandı Yok!")</h2>
            <p class="so-card-sub">Şantiye şefi kanıt fotoğrafı yüklemeden eksik maddesi kapatılamaz.</p>
          </div>
        </div>
        ${deliveryAddBar}
        ${deliveryHtml}
      </div>
    `;
  }

  function setLayer(layer) {
    _layerView = layer;
    SOApp.render();
  }

  function selectDeliveryUnit(idx) {
    _selectedDeliveryIdx = idx;
    SOApp.render();
  }

  function addDeliveryUnit() {
    const site = SOState.getActiveSite();
    const sel = document.getElementById("soAddDeliveryUnitSel");
    if (!site || !sel || !sel.value) return;
    site.deliveryUnits.push(SOState.createDeliveryChecklist(sel.value));
    _selectedDeliveryIdx = site.deliveryUnits.length - 1;
    SOState.save();
    SOState.addLog(site.id, "Teslim Listesi Açıldı", `${sel.value} için 7 maddelik teslim kontrol listesi oluşturuldu.`);
    SOApp.render();
    SOApp.toast(`${sel.value} teslim listesine eklendi.`, "ok");
  }

  function publishMilestone(msId) {
    const site = SOState.getActiveSite();
    const ms = site.milestones.find(m => m.id === msId);
    if (!ms) return;
    const revEl = document.getElementById("soRev-" + msId);
    if (revEl) ms.revisionNote = revEl.value;
    ms.status = "done";
    ms.internalDaysLeft = 0;
    ms.internalDelayDays = 0;
    ms.buyerPeriod = "Tamamlandı";
    ms.publishedToBuyer = true;
    ms.photoProof = SOState.demoSvgDataUri(ms.title + " Yayında");
    SOState.save();
    SOState.addLog(site.id, "Termin Katalog Yayını", `'${ms.title}' adımı fotoğraflı kanıtla alıcı kataloğunda yayınlandı.`);
    SOApp.render();
    SOApp.toast(`${ms.title} onaylandı ve yayınlandı.`, "ok");
  }

  function findActiveChecklistItem(itemId) {
    const site = SOState.getActiveSite();
    const du = site.deliveryUnits[_selectedDeliveryIdx];
    if (!du) return { site, du: null, item: null };
    return { site, du, item: du.items.find(i => i.id === itemId) };
  }

  function attachDemoPhoto(itemId) {
    const { du, item } = findActiveChecklistItem(itemId);
    if (!item) return;
    item.photoUrl = SOState.demoSvgDataUri(du.unitCode + " " + item.label.slice(0, 14));
    SOState.save();
    SOApp.render();
    SOApp.toast("Kanıt fotoğrafı eklendi. Şimdi 'Tamamlandı' işaretleyebilirsiniz.", "ok");
  }

  function uploadRealPhoto(event, itemId) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
      const { item } = findActiveChecklistItem(itemId);
      if (!item) return;
      item.photoUrl = e.target.result;
      SOState.save();
      SOApp.render();
      SOApp.toast("Fotoğraf yüklendi.", "ok");
    };
    reader.readAsDataURL(file);
  }

  function flagIssue(itemId) {
    const { site, du, item } = findActiveChecklistItem(itemId);
    if (!item) return;
    const note = global.prompt("Dairedeki eksik notunu yazın:", item.issueNote || "Montaj eksiği var, kontrol edilecek.");
    if (note === null) return;
    item.issueNote = note.trim();
    item.done = false;
    SOState.save();
    SOState.addLog(site.id, "Teslim Eksiği Bildirildi", `${du.unitCode} • ${item.label}: ${item.issueNote}`);
    SOApp.render();
    SOApp.toast("Eksik şantiye şefi listesine düşürüldü.", "ok");
  }

  function markChecklistDone(itemId) {
    const { site, du, item } = findActiveChecklistItem(itemId);
    if (!item) return;
    if (!item.photoUrl) {
      SOApp.toast("📷 Fotoğraf Yoksa Tamamlandı Yok! Bu maddeyi kapatmak için önce kanıt fotoğrafı ekleyin.", "danger");
      return;
    }
    item.done = true;
    item.issueNote = "";
    SOState.save();
    SOState.addLog(site.id, "Fotoğraflı Teslim", `${du.unitCode} • ${item.label} kanıt fotoğrafıyla tamamlandı.`);
    SOApp.render();
    SOApp.toast(`${item.label} fotoğraflı kanıtla tamamlandı!`, "ok");
  }

  global.SOSantiye = {
    render,
    setLayer,
    selectDeliveryUnit,
    addDeliveryUnit,
    publishMilestone,
    attachDemoPhoto,
    uploadRealPhoto,
    flagIssue,
    markChecklistDone
  };
})(window);
