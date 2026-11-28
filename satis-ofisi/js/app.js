/* ==========================================================================
   MÜLKİZLE SATIŞ OFİSİ — YÖNETİM, ORKESTRASYON & KARA KUTU LOG
   ========================================================================== */
(function (global) {
  let _sliderUnits = 40;
  let _licenseYears = 3;

  const TABS = [
    { id: "yonetim", label: "⚙️ Projeler & Ekip", roles: ["mudur_ortak", "muteahhit_ortak"] },
    { id: "stok", label: "🏢 Daire Stok & Cephe", roles: ["mudur_ortak", "muteahhit_ortak", "muteahhit", "satis_sorumlusu", "santiye_sefi"] },
    { id: "rapor", label: "📊 Fiyat Direnci & KPI", roles: ["mudur_ortak", "muteahhit_ortak", "muteahhit"] },
    { id: "crm", label: "👥 CRM & Paydaş Onayı", roles: ["mudur_ortak", "muteahhit_ortak", "muteahhit", "satis_sorumlusu"] },
    { id: "prim", label: "💰 Ortaklık & Prim", roles: ["mudur_ortak", "muteahhit_ortak", "muteahhit", "satis_sorumlusu"] },
    { id: "santiye", label: "🏗️ Termin & Teslim", roles: ["mudur_ortak", "muteahhit_ortak", "muteahhit", "satis_sorumlusu", "santiye_sefi"] },
    { id: "log", label: "🛡️ Kara Kutu & Paket", roles: ["mudur_ortak", "muteahhit_ortak", "muteahhit", "santiye_sefi"] }
  ];

  function getAllowedTabs(roleInfo, hasActiveSite) {
    if (!hasActiveSite) {
      return TABS.filter(t => t.id === "yonetim" || t.id === "log");
    }
    return TABS.filter(t => t.roles.includes(roleInfo.role));
  }

  function calcPricing(unitCount, years) {
    const monthlyPerProject =
      unitCount <= 30 ? 4500 : unitCount <= 100 ? 7900 : 12500;
    const tierName =
      unitCount <= 30 ? "1–30 Daire (Butik Proje)" : unitCount <= 100 ? "31–100 Daire (Orta Ölçek)" : "101–300+ Daire (Büyük Proje)";
    const discountMap = { 1: 0, 2: 0.15, 3: 0.25 };
    const disc = discountMap[years] || 0;
    const total = Math.round(monthlyPerProject * 12 * years * (1 - disc));
    const perUnitMonthly = Math.round((monthlyPerProject * (1 - disc)) / Math.max(1, unitCount));
    return { monthlyPerProject, tierName, disc, total, perUnitMonthly };
  }

  /* ========================================================================
     PROJELER & EKİP YÖNETİMİ (KULLANICI KENDİSİ OLUŞTURUR VE ATAR)
     ======================================================================== */
  function renderYonetim(activeSite) {
    const S = SOState;
    const esc = S.escapeHtml;
    const state = S.load();
    const user = S.getActiveUser();
    const canManage = Boolean(user.isAdmin) || (activeSite && (S.getUserRoleOnSite(user.id, activeSite.id)?.role === "mudur_ortak" || S.getUserRoleOnSite(user.id, activeSite.id)?.role === "muteahhit_ortak"));

    const sitesHtml =
      state.sites.length === 0
        ? `
          <div class="so-banner so-banner-info">
            <span>Henüz proje / şantiye oluşturmadınız. İlk projenizi (en alt kat -2, apartman giriş katı -1 gibi ayarlarıyla) hemen ekleyin.</span>
            <button type="button" class="so-btn so-btn-primary so-btn-sm" onclick="SOApp.openNewSiteModal()">
              + İlk Projeyi Oluştur
            </button>
          </div>
        `
        : `<div class="so-lead-grid">
            ${state.sites
              .map(st => {
                const isAct = activeSite && activeSite.id === st.id;
                const blkSummary = (st.blocks || [])
                  .map(b => `${b.name} (${b.minFloor}..${b.maxFloor}, 🚪Giriş: ${b.entranceFloor})`)
                  .join(", ");
                return `
                  <div class="so-lead-card" style="${isAct ? "border-color:#2563EB;box-shadow:0 0 0 2px rgba(37,99,235,0.1);" : ""}">
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;">
                      <div>
                        <div style="font-weight:800;font-size:0.96rem;">${esc(st.name)}</div>
                        <div style="font-size:0.76rem;color:#64748B;">
                          ${esc(st.district || "Bölge girilmedi")} • Müteahhit: <strong>${esc(st.contractorName || "Belirtilmedi")}</strong>
                        </div>
                      </div>
                      <span class="so-role-pill">${st.units.length} Daire</span>
                    </div>
                    <div style="font-size:0.76rem;color:#334155;background:#F8FAFC;border:1px solid #E2E8F0;border-radius:8px;padding:7px 9px;">
                      🧱 Bloklar: <strong>${esc(blkSummary)}</strong>
                    </div>
                    <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:4px;">
                      <button type="button" class="so-btn so-btn-primary so-btn-sm" onclick="SOApp.goToSiteStock('${esc(st.id)}')">
                        🏢 Stok &amp; Cephe Matrisi
                      </button>
                      ${
                        canManage
                          ? `<button type="button" class="so-btn so-btn-sm" onclick="SOApp.openEditSiteModal('${esc(st.id)}')">✏️ Düzenle</button>
                             <button type="button" class="so-btn so-btn-danger so-btn-sm" onclick="SOApp.deleteSite('${esc(st.id)}')">🗑️ Sil</button>`
                          : ""
                      }
                    </div>
                  </div>
                `;
              })
              .join("")}
          </div>`;

    const usersHtml = state.users
      .map(u => {
        const assignedEntries = Object.entries(u.siteRoles || {});
        const rolesChips =
          u.isAdmin
            ? `<span class="so-role-pill">🛡️ Sistem Kurucusu (Tüm Şantiyelerde Yönetici)</span>`
            : assignedEntries.length === 0
            ? `<span style="font-size:0.75rem;color:#64748B;">Henüz şantiye yetkisi atanmadı</span>`
            : assignedEntries
                .map(([siteId, info]) => {
                  const st = state.sites.find(x => x.id === siteId);
                  if (!st) return "";
                  const rMeta = S.ROLE_META[info.role];
                  const pct = Number(info.sharePct) > 0 ? ` • %${info.sharePct}` : "";
                  return `
                    <span class="so-role-pill" style="display:inline-flex;align-items:center;gap:6px;">
                      <span>${esc(st.name)}: ${esc(rMeta ? rMeta.label : info.role)}${pct}</span>
                      ${
                        canManage
                          ? `<button type="button" style="border:none;background:none;cursor:pointer;font-weight:800;color:#DC2626;" title="Yetkiyi kaldır" onclick="SOApp.removeUserSiteRole('${esc(u.id)}', '${esc(siteId)}')">✕</button>`
                          : ""
                      }
                    </span>
                  `;
                })
                .join(" ");

        return `
          <div class="so-partner-card">
            <div style="flex:1;min-width:220px;">
              <div style="font-weight:800;font-size:0.92rem;">👤 ${esc(u.name)}</div>
              <div style="font-size:0.76rem;color:#64748B;margin-bottom:6px;">${esc(u.title || "Ekip Üyesi")}</div>
              <div style="display:flex;gap:6px;flex-wrap:wrap;">${rolesChips}</div>
            </div>
            <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center;">
              ${
                !u.isAdmin && canManage
                  ? `<button type="button" class="so-btn so-btn-sm" onclick="SOApp.openAssignRoleModal('${esc(u.id)}')">+ Şantiye &amp; Rol Ata</button>`
                  : ""
              }
              ${
                u.id !== user.id
                  ? `<button type="button" class="so-btn so-btn-primary so-btn-sm" onclick="SOApp.kullaniciDegistir('${esc(u.id)}')">👤 Bu Kullanıcıyla Aç</button>`
                  : `<span class="so-role-pill">Aktif Oturum</span>`
              }
              ${
                !u.isAdmin && canManage
                  ? `<button type="button" class="so-btn so-btn-danger so-btn-sm" onclick="SOApp.deleteUser('${esc(u.id)}')">🗑️</button>`
                  : ""
              }
            </div>
          </div>
        `;
      })
      .join("");

    return `
      <div class="so-card">
        <div class="so-card-header">
          <div>
            <h2 class="so-card-title">🏗️ Projeler &amp; Şantiyelerim (${state.sites.length})</h2>
            <p class="so-card-sub">Kendi projelerinizi, bloklarınızı, bodrum/kat aralıklarını (-2 vb.) ve apartman giriş katlarını tanımlayın.</p>
          </div>
          ${
            canManage
              ? `<button type="button" class="so-btn so-btn-primary" onclick="SOApp.openNewSiteModal()">+ Yeni Proje / Şantiye Oluştur</button>`
              : ""
          }
        </div>
        ${sitesHtml}
      </div>

      <div class="so-card">
        <div class="so-card-header">
          <div>
            <h2 class="so-card-title">👥 Kullanıcılar, Ortaklar &amp; Şantiye Bazlı Rol Atamaları</h2>
            <p class="so-card-sub">Ortakları, satış sorumlularını, müteahhitleri ve şantiye şeflerini kendiniz ekleyin; şantiyelere ayrı ayrı yetki ve % oran atayın.</p>
          </div>
          ${
            canManage
              ? `<button type="button" class="so-btn so-btn-primary" onclick="SOApp.openNewUserModal()">+ Yeni Kullanıcı Ekle</button>`
              : ""
          }
        </div>
        <div style="display:flex;flex-direction:column;gap:10px;">
          ${usersHtml}
        </div>
      </div>
    `;
  }

  /* ========================================================================
     PROJE OLUŞTURMA / DÜZENLEME MODALLARI
     ======================================================================== */
  function openNewSiteModal() {
    SOApp.openModal(
      "+ Yeni Proje / Şantiye Oluştur",
      `
        <form onsubmit="SOApp.submitNewSite(event)">
          <div class="so-form-grid">
            <div class="so-field">
              <label>Proje / Şantiye Adı *</label>
              <input id="soSiteName" class="so-input" required placeholder="Örn: Gölbaşı Vadi Evleri" />
            </div>
            <div class="so-field">
              <label>İlçe / Bölge</label>
              <input id="soSiteDistrict" class="so-input" placeholder="Örn: Gölbaşı • Ankara" />
            </div>
          </div>

          <div class="so-form-grid">
            <div class="so-field">
              <label>Müteahhit / Yapımcı Firma</label>
              <input id="soSiteContractor" class="so-input" placeholder="Örn: Örnek İnşaat A.Ş." />
            </div>
            <div class="so-field">
              <label>İşletme Modu</label>
              <select id="soSiteMode" class="so-select">
                <option value="emlak_ofisi">Çoklu Şantiye Yöneten Emlak Ofisi</option>
                <option value="muteahhit_ofisi">Müteahhit Kendi Satış Ofisi</option>
              </select>
            </div>
          </div>

          <div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:10px;padding:12px;margin:8px 0 12px;">
            <div style="font-size:0.8rem;font-weight:800;margin-bottom:8px;">🏢 İlk Blok, Kat Aralığı &amp; Otomatik Tablo Ayarı</div>
            <div class="so-form-grid">
              <div class="so-field">
                <label>Blok Adı *</label>
                <input id="soSiteBlockName" class="so-input" required value="A Blok" />
              </div>
              <div class="so-field">
                <label>Apartman Giriş Katı * (Örn: -1 veya 0)</label>
                <input id="soSiteEntrance" type="number" class="so-input" required value="0" min="-10" max="60" />
              </div>
            </div>
            <div class="so-form-grid">
              <div class="so-field">
                <label>En Alt Kat * (Örn: -2 bodrum için -2)</label>
                <input id="soSiteMinFloor" type="number" class="so-input" required value="-1" min="-10" max="20" />
              </div>
              <div class="so-field">
                <label>En Üst Kat * (Kaç Katlı?)</label>
                <input id="soSiteMaxFloor" type="number" class="so-input" required value="14" min="-5" max="60" />
              </div>
            </div>
            <div class="so-field" style="margin-bottom:0;">
              <label>Her Katta Varsayılan Daire Sayısı (Otomatik Tablo Çıkar)</label>
              <input id="soSiteUnitsPerFloor" type="number" class="so-input" required value="6" min="0" max="20" />
              <small style="font-size:0.72rem;color:#64748B;">Tablo açıldıktan sonra üstteki şeritten "11–14. katlar arası katta 4 daire olsun" gibi farklı katları tek tıkla değiştirebilirsiniz.</small>
            </div>
          </div>

          <div style="display:flex;justify-content:flex-end;gap:8px;">
            <button type="button" class="so-btn" onclick="SOApp.closeModal()">Vazgeç</button>
            <button type="submit" class="so-btn so-btn-primary">✓ Projeyi &amp; Tabloyu Oluştur</button>
          </div>
        </form>
      `
    );
  }

  function submitNewSite(event) {
    event.preventDefault();
    const minF = Number(document.getElementById("soSiteMinFloor").value);
    const maxF = Number(document.getElementById("soSiteMaxFloor").value);
    const entF = Number(document.getElementById("soSiteEntrance").value);
    const perFloor = Math.max(0, Math.min(20, Number(document.getElementById("soSiteUnitsPerFloor").value) || 0));

    if (minF > maxF) {
      toast("En alt kat, en üst kattan büyük olamaz.", "danger");
      return;
    }
    if (entF < minF || entF > maxF) {
      toast("Apartman giriş katı, en alt kat ile en üst kat aralığında olmalıdır.", "danger");
      return;
    }

    const created = SOState.createSite({
      name: document.getElementById("soSiteName").value,
      district: document.getElementById("soSiteDistrict").value,
      contractorName: document.getElementById("soSiteContractor").value,
      mode: document.getElementById("soSiteMode").value,
      blockName: document.getElementById("soSiteBlockName").value,
      minFloor: minF,
      maxFloor: maxF,
      entranceFloor: entF,
      unitsPerFloor: perFloor
    });

    const state = SOState.load();
    state.activeTab = "stok";
    SOState.save();

    closeModal();
    _sliderUnits = created.units.length || 40;
    render();
    toast(`'${created.name}' oluşturuldu (${created.units.length} daire tablosu açıldı).`, "ok");
  }

  function openEditSiteModal(siteId) {
    const S = SOState;
    const site = S.load().sites.find(s => s.id === siteId);
    if (!site) return;
    openModal(
      "✏️ Proje Bilgilerini Düzenle",
      `
        <form onsubmit="SOApp.submitEditSite(event, '${S.escapeHtml(site.id)}')">
          <div class="so-field">
            <label>Proje Adı *</label>
            <input id="soEditSiteName" class="so-input" required value="${S.escapeHtml(site.name)}" />
          </div>
          <div class="so-form-grid">
            <div class="so-field">
              <label>İlçe / Bölge</label>
              <input id="soEditSiteDist" class="so-input" value="${S.escapeHtml(site.district || "")}" />
            </div>
            <div class="so-field">
              <label>Müteahhit Firma</label>
              <input id="soEditSiteCont" class="so-input" value="${S.escapeHtml(site.contractorName || "")}" />
            </div>
          </div>
          <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:8px;">
            <button type="button" class="so-btn" onclick="SOApp.closeModal()">İptal</button>
            <button type="submit" class="so-btn so-btn-primary">✓ Güncelle</button>
          </div>
        </form>
      `
    );
  }

  function submitEditSite(event, siteId) {
    event.preventDefault();
    const site = SOState.load().sites.find(s => s.id === siteId);
    if (!site) return;
    site.name = document.getElementById("soEditSiteName").value.trim();
    site.district = document.getElementById("soEditSiteDist").value.trim();
    site.contractorName = document.getElementById("soEditSiteCont").value.trim();
    SOState.save();
    SOState.addLog(site.id, "Proje Güncellendi", `${site.name} genel bilgileri güncellendi.`);
    closeModal();
    render();
    toast("Proje güncellendi.", "ok");
  }

  function deleteSite(siteId) {
    const state = SOState.load();
    const site = state.sites.find(s => s.id === siteId);
    if (!site) return;
    if (!global.confirm(`'${site.name}' projesi ve içindeki tüm daire/müşteri kayıtları silinsin mi?`)) return;
    state.sites = state.sites.filter(s => s.id !== siteId);
    state.users.forEach(u => {
      if (u.siteRoles && u.siteRoles[siteId]) delete u.siteRoles[siteId];
    });
    if (state.activeSiteId === siteId) state.activeSiteId = "";
    SOState.save();
    SOState.addLog("", "Proje Silindi", `${site.name} sistemden kaldırıldı.`);
    render();
    toast("Proje silindi.", "ok");
  }

  function goToSiteStock(siteId) {
    const state = SOState.load();
    state.activeSiteId = siteId;
    state.activeTab = "stok";
    SOState.save();
    render();
  }

  /* ========================================================================
     KULLANICI & ŞANTİYE ROL ATAMA MODALLARI
     ======================================================================== */
  function openNewUserModal() {
    openModal(
      "+ Yeni Kullanıcı Ekle",
      `
        <form onsubmit="SOApp.submitNewUser(event)">
          <div class="so-field">
            <label>Ad Soyad / Firma Adı *</label>
            <input id="soNewUserName" class="so-input" required placeholder="Örn: Ömer Bey, Deniz Hanım veya Kaya İnşaat" />
          </div>
          <div class="so-field">
            <label>Ünvan / Kısa Açıklama</label>
            <input id="soNewUserTitle" class="so-input" placeholder="Örn: Proje Ortağı, Satış Sorumlusu, Müteahhit" />
          </div>
          <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:8px;">
            <button type="button" class="so-btn" onclick="SOApp.closeModal()">İptal</button>
            <button type="submit" class="so-btn so-btn-primary">✓ Kullanıcıyı Ekle</button>
          </div>
        </form>
      `
    );
  }

  function submitNewUser(event) {
    event.preventDefault();
    const state = SOState.load();
    const name = document.getElementById("soNewUserName").value.trim();
    const title = document.getElementById("soNewUserTitle").value.trim() || "Ekip Üyesi";
    state.users.push({
      id: "usr-" + Date.now() + "-" + Math.floor(Math.random() * 100),
      name,
      title,
      isAdmin: false,
      siteRoles: {}
    });
    SOState.save();
    SOState.addLog("", "Yeni Kullanıcı", `${name} (${title}) sisteme eklendi.`);
    closeModal();
    render();
    toast(`${name} eklendi. Şimdi '+ Şantiye & Rol Ata' butonunu kullanabilirsiniz.`, "ok");
  }

  function openAssignRoleModal(userId) {
    const S = SOState;
    const state = S.load();
    const targetUser = state.users.find(u => u.id === userId);
    if (!targetUser) return;
    if (state.sites.length === 0) {
      toast("Önce en az bir proje / şantiye oluşturun.", "danger");
      return;
    }

    openModal(
      `🔑 Şantiye & Rol Ata — ${S.escapeHtml(targetUser.name)}`,
      `
        <form onsubmit="SOApp.submitAssignRole(event, '${S.escapeHtml(targetUser.id)}')">
          <div class="so-field">
            <label>Hangi Proje / Şantiye?</label>
            <select id="soAssignSiteId" class="so-select">
              ${state.sites.map(st => `<option value="${S.escapeHtml(st.id)}">${S.escapeHtml(st.name)}</option>`).join("")}
            </select>
          </div>
          <div class="so-form-grid">
            <div class="so-field">
              <label>Bu Şantiyedeki Rolü</label>
              <select id="soAssignRole" class="so-select">
                ${Object.entries(S.ROLE_META).map(([k, v]) => `<option value="${k}">${S.escapeHtml(v.label)}</option>`).join("")}
              </select>
            </div>
            <div class="so-field">
              <label>Ortaklık Yüzdesi (%)</label>
              <input id="soAssignShare" type="number" class="so-input" min="0" max="100" step="0.1" value="0" />
            </div>
          </div>
          <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:8px;">
            <button type="button" class="so-btn" onclick="SOApp.closeModal()">İptal</button>
            <button type="submit" class="so-btn so-btn-primary">✓ Yetkiyi Ata</button>
          </div>
        </form>
      `
    );
  }

  function submitAssignRole(event, userId) {
    event.preventDefault();
    const state = SOState.load();
    const targetUser = state.users.find(u => u.id === userId);
    if (!targetUser) return;
    const siteId = document.getElementById("soAssignSiteId").value;
    const role = document.getElementById("soAssignRole").value;
    const sharePct = Number(document.getElementById("soAssignShare").value) || 0;
    const site = state.sites.find(s => s.id === siteId);

    if (!targetUser.siteRoles) targetUser.siteRoles = {};
    targetUser.siteRoles[siteId] = { role, sharePct };
    SOState.save();
    SOState.addLog(siteId, "Rol Ataması", `${targetUser.name} → ${site ? site.name : siteId}: ${SOState.ROLE_META[role].label} (%${sharePct})`);
    closeModal();
    render();
    toast("Şantiye yetkisi kaydedildi.", "ok");
  }

  function removeUserSiteRole(userId, siteId) {
    const state = SOState.load();
    const u = state.users.find(x => x.id === userId);
    if (!u || !u.siteRoles) return;
    delete u.siteRoles[siteId];
    SOState.save();
    SOState.addLog(siteId, "Yetki Kaldırıldı", `${u.name} kullanıcısının bu şantiyedeki yetkisi kaldırıldı.`);
    render();
    toast("Yetki kaldırıldı.", "ok");
  }

  function deleteUser(userId) {
    const state = SOState.load();
    const u = state.users.find(x => x.id === userId);
    if (!u || u.isAdmin) return;
    if (!global.confirm(`'${u.name}' kullanıcısı silinsin mi?`)) return;
    state.users = state.users.filter(x => x.id !== userId);
    if (state.activeUserId === userId) state.activeUserId = "admin";
    SOState.save();
    render();
    toast("Kullanıcı silindi.", "ok");
  }

  /* ========================================================================
     KARA KUTU LOG & DAİRE BAZLI PAKET HESAPLAYICI
     ======================================================================== */
  function renderLogAndPricing(site) {
    const S = SOState;
    const esc = S.escapeHtml;
    const allLogs = S.load().auditLogs;
    const logs = site ? allLogs.filter(l => !l.siteId || l.siteId === site.id) : allLogs;
    const pr = calcPricing(_sliderUnits, _licenseYears);

    return `
      <div class="so-card">
        <div class="so-card-header">
          <div>
            <h2 class="so-card-title">💳 Daire Sayısına Göre Kurumsal Paket &amp; Enflasyon Korumalı Peşin Lisans</h2>
            <p class="so-card-sub">Normal emlakçı paketlerinden bağımsız, şantiye daire adedine göre ölçeklenen fiyatlandırma.</p>
          </div>
          <span class="so-role-pill">${esc(pr.tierName)}</span>
        </div>

        <div class="so-pricing-grid">
          <div class="so-tier-box ${_sliderUnits <= 30 ? "active" : ""}">
            <div style="font-weight:800;font-size:0.86rem;">1 – 30 Daire</div>
            <div style="font-size:0.78rem;color:#64748B;">4.500 ₺ / ay liste</div>
          </div>
          <div class="so-tier-box ${_sliderUnits > 30 && _sliderUnits <= 100 ? "active" : ""}">
            <div style="font-weight:800;font-size:0.86rem;">31 – 100 Daire</div>
            <div style="font-size:0.78rem;color:#64748B;">7.900 ₺ / ay liste</div>
          </div>
          <div class="so-tier-box ${_sliderUnits > 100 ? "active" : ""}">
            <div style="font-weight:800;font-size:0.86rem;">101 – 300+ Daire</div>
            <div style="font-size:0.78rem;color:#64748B;">12.500 ₺ / ay liste</div>
          </div>
        </div>

        <div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:12px;padding:14px;">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:8px;">
            <label for="soUnitSlider" style="font-size:0.84rem;font-weight:800;">
              Proje Daire Sayısı: <span id="soSliderVal" style="color:#2563EB;">${_sliderUnits} Daire</span>
            </label>
            <div class="so-chip-group">
              <button type="button" class="so-chip ${_licenseYears === 1 ? "active" : ""}" onclick="SOApp.setLicenseYears(1)">1 Yıllık Peşin</button>
              <button type="button" class="so-chip ${_licenseYears === 2 ? "active" : ""}" onclick="SOApp.setLicenseYears(2)">2 Yıllık Peşin (%15)</button>
              <button type="button" class="so-chip ${_licenseYears === 3 ? "active" : ""}" onclick="SOApp.setLicenseYears(3)">3 Yıllık Peşin (%25)</button>
            </div>
          </div>

          <input
            id="soUnitSlider"
            type="range"
            min="10"
            max="300"
            step="2"
            value="${_sliderUnits}"
            style="width:100%;accent-color:#2563EB;cursor:pointer;"
            oninput="SOApp.setSliderUnits(Number(this.value))"
          />

          <div class="so-kpi-grid" style="margin-top:12px;">
            <div class="so-kpi-card">
              <div class="so-kpi-label">${_licenseYears} Yıllık Peşin Toplam</div>
              <div class="so-kpi-val" style="color:#2563EB;">${pr.total.toLocaleString("tr-TR")} ₺</div>
              <div class="so-kpi-note">Sabit fiyat garantili kurumsal lisans</div>
            </div>
            <div class="so-kpi-card is-ok">
              <div class="so-kpi-label">Daire Başına Aylık Maliyet</div>
              <div class="so-kpi-val" style="color:#16A34A;">${pr.perUnitMonthly.toLocaleString("tr-TR")} ₺</div>
              <div class="so-kpi-note">${_sliderUnits} daireye bölünmüş gerçek birim maliyet</div>
            </div>
            <div class="so-kpi-card">
              <div class="so-kpi-label">Enflasyon Koruması</div>
              <div class="so-kpi-val">%${Math.round(pr.disc * 100)}</div>
              <div class="so-kpi-note">${_licenseYears} yıl boyunca fiyat artmaz</div>
            </div>
            <div class="so-kpi-card">
              <div class="so-kpi-label">Aktif Şantiye</div>
              <div class="so-kpi-val" style="font-size:0.95rem;">${site ? esc(site.name) : "Proje seçilmedi"}</div>
              <div class="so-kpi-note">${site ? site.units.length + " kayıtlı daire" : "Kurulum aşaması"}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="so-card">
        <div class="so-card-header">
          <div>
            <h2 class="so-card-title">🛡️ Silinemez "Kara Kutu" Denetim Logu (Audit Log)</h2>
            <p class="so-card-sub">Tüm stok, cephe, müşteri, mükerrer engel ve yetki işlemleri zaman damgasıyla değiştirilemez şekilde tutulur.</p>
          </div>
          <span class="so-role-pill">🔒 Silme / Düzenleme Kapalı</span>
        </div>

        <div class="so-table-wrap">
          <table class="so-table">
            <thead>
              <tr>
                <th>Zaman Damgası</th>
                <th>Şantiye</th>
                <th>İşlemi Yapan</th>
                <th>Aksiyon Türü</th>
                <th>Detay</th>
              </tr>
            </thead>
            <tbody>
              ${
                logs.length === 0
                  ? `<tr><td colspan="5" style="color:#64748B;">Henüz işlem kaydı yok.</td></tr>`
                  : logs
                      .map(
                        l => `
                          <tr>
                            <td><code>${esc(l.ts)}</code></td>
                            <td>${esc(l.siteName)}</td>
                            <td><strong>${esc(l.actorName)}</strong></td>
                            <td><span class="so-role-pill">${esc(l.actionType)}</span></td>
                            <td style="white-space:normal;min-width:240px;">${esc(l.detail)}</td>
                          </tr>
                        `
                      )
                      .join("")
              }
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  /* ========================================================================
     ANA RENDER DÖNGÜSÜ
     ======================================================================== */
  function render() {
    const S = SOState;
    const state = S.load();
    const user = S.getActiveUser();
    const accessible = S.getAccessibleSites();
    const activeSite = S.getActiveSite();
    const roleInfo = activeSite
      ? S.getUserRoleOnSite(user.id, activeSite.id) || { role: "mudur_ortak", sharePct: 0, isAdmin: Boolean(user.isAdmin) }
      : { role: "mudur_ortak", sharePct: 0, isAdmin: Boolean(user.isAdmin) };
    const roleMeta = user.isAdmin
      ? { label: "Sistem Yöneticisi", badge: "🛡️ Yönetici (Tüm Yetkiler)" }
      : S.ROLE_META[roleInfo.role] || { label: user.title, badge: user.title };

    // 1. Üst kullanıcı seçici
    const userSel = document.getElementById("soUserSelect");
    if (userSel) {
      userSel.innerHTML = state.users
        .map(u => `<option value="${u.id}" ${u.id === user.id ? "selected" : ""}>${S.escapeHtml(u.name)} — ${S.escapeHtml(u.title)}</option>`)
        .join("");
    }
    const roleBadge = document.getElementById("soRoleBadge");
    if (roleBadge) {
      roleBadge.textContent =
        roleInfo.sharePct > 0 ? `${roleMeta.badge} (%${roleInfo.sharePct})` : roleMeta.badge;
    }

    // 2. Aktif Şantiye Seçici Bar
    const siteBar = document.getElementById("soSiteBar");
    if (siteBar) {
      siteBar.innerHTML = `
        <div class="so-site-bar-inner">
          <span class="so-site-bar-label">🏗️ Aktif Şantiye (${accessible.length}):</span>
          <div class="so-site-pills">
            ${accessible
              .map(st => {
                const ri = S.getUserRoleOnSite(user.id, st.id);
                const rm = ri && S.ROLE_META[ri.role] ? S.ROLE_META[ri.role].label : "";
                const shareTxt = ri && ri.sharePct > 0 ? ` • %${ri.sharePct}` : "";
                return `
                  <button type="button" class="so-site-pill ${activeSite && st.id === activeSite.id ? "active" : ""}" onclick="SOApp.santiyeSec('${st.id}')">
                    <span>${S.escapeHtml(st.name)}</span>
                    ${rm ? `<span class="so-site-role-tag">${S.escapeHtml(rm + shareTxt)}</span>` : ""}
                  </button>
                `;
              })
              .join("")}
            ${
              user.isAdmin || roleInfo.role === "mudur_ortak" || roleInfo.role === "muteahhit_ortak"
                ? `<button type="button" class="so-site-pill" onclick="SOApp.openNewSiteModal()">+ Yeni Proje Ekle</button>`
                : ""
            }
          </div>
        </div>
      `;
    }

    // 3. Sol menü
    const allowedTabs = getAllowedTabs(roleInfo, Boolean(activeSite));
    if (!allowedTabs.some(t => t.id === state.activeTab)) {
      state.activeTab = allowedTabs[0].id;
      S.save();
    }

    const sidebar = document.getElementById("soSidebarNav");
    if (sidebar) {
      sidebar.innerHTML = `
        <div class="so-sidebar-meta">
          <div class="so-sidebar-meta-title">${activeSite ? S.escapeHtml(activeSite.name) : "Proje Bekleniyor"}</div>
          <div class="so-sidebar-meta-sub">${activeSite ? `${S.escapeHtml(activeSite.contractorName || "Müteahhit belirtilmedi")} • ${activeSite.units.length} Daire` : "Önce bir proje ve kullanıcı tanımlayın"}</div>
        </div>
        ${allowedTabs
          .map(t => {
            let count = "";
            if (t.id === "yonetim") count = String(state.sites.length);
            else if (activeSite && t.id === "stok") count = String(activeSite.units.length);
            else if (activeSite && t.id === "crm") count = String(activeSite.leads.length);
            else if (t.id === "log") {
              count = String(activeSite ? state.auditLogs.filter(l => !l.siteId || l.siteId === activeSite.id).length : state.auditLogs.length);
            }
            return `
              <button type="button" class="so-nav-btn ${state.activeTab === t.id ? "active" : ""}" onclick="SOApp.sekmeSec('${t.id}')">
                <span>${t.label}</span>
                ${count ? `<span class="so-nav-count">${count}</span>` : ""}
              </button>
            `;
          })
          .join("")}
      `;
    }

    // 4. Ana içerik
    const main = document.getElementById("soMainContent");
    if (main) {
      if (state.activeTab === "yonetim") {
        main.innerHTML = renderYonetim(activeSite);
      } else if (!activeSite) {
        main.innerHTML = `
          <div class="so-card">
            <div class="so-banner so-banner-warn">
              <span>Bu kullanıcıya atanmış veya oluşturulmuş aktif şantiye yok. Yönetici hesabına dönüp şantiye atayabilirsiniz.</span>
              <button type="button" class="so-btn so-btn-primary so-btn-sm" onclick="SOApp.kullaniciDegistir('admin')">
                🛡️ Yöneticiye Dön
              </button>
            </div>
          </div>
        `;
      } else if (state.activeTab === "rapor") main.innerHTML = SORapor.renderOverview(activeSite, roleInfo);
      else if (state.activeTab === "stok") main.innerHTML = SOStok.render(activeSite, roleInfo);
      else if (state.activeTab === "crm") main.innerHTML = SOCrm.render(activeSite, roleInfo);
      else if (state.activeTab === "prim") main.innerHTML = SORapor.renderPrim(activeSite, roleInfo);
      else if (state.activeTab === "santiye") main.innerHTML = SOSantiye.render(activeSite, roleInfo);
      else if (state.activeTab === "log") main.innerHTML = renderLogAndPricing(activeSite);
    }
  }

  function kullaniciDegistir(userId) {
    const state = SOState.load();
    state.activeUserId = userId;
    SOState.save();
    const activeSite = SOState.getActiveSite();
    _sliderUnits = activeSite && activeSite.units.length ? activeSite.units.length : 40;
    render();
    toast(`${SOState.getActiveUser().name} hesabına geçildi.`, "ok");
  }

  function santiyeSec(siteId) {
    const state = SOState.load();
    state.activeSiteId = siteId;
    SOState.save();
    const activeSite = SOState.getActiveSite();
    _sliderUnits = activeSite && activeSite.units.length ? activeSite.units.length : 40;
    render();
  }

  function sekmeSec(tabId) {
    const state = SOState.load();
    state.activeTab = tabId;
    SOState.save();
    render();
  }

  function setSliderUnits(val) {
    _sliderUnits = val;
    render();
  }

  function setLicenseYears(yrs) {
    _licenseYears = yrs;
    render();
  }

  function demoSifirla() {
    if (!global.confirm("Kayıtlı tüm projeler, daireler, kullanıcılar ve loglar temizlensin mi?")) return;
    SOState.reset();
    _sliderUnits = 40;
    render();
    toast("Tüm Satış Ofisi verileri temizlendi.", "ok");
  }

  function openModal(title, bodyHtml, opts) {
    const bd = document.getElementById("soModalBackdrop");
    const modal = bd ? bd.querySelector(".so-modal") : null;
    const ttl = document.getElementById("soModalTitle");
    const body = document.getElementById("soModalBody");
    if (!bd || !ttl || !body) return;
    if (modal) modal.classList.toggle("so-modal-lg", Boolean(opts && opts.large));
    ttl.textContent = title;
    body.innerHTML = bodyHtml;
    bd.classList.add("open");
  }

  function closeModal() {
    const bd = document.getElementById("soModalBackdrop");
    if (bd) bd.classList.remove("open");
  }

  let _toastTimer = null;
  function toast(msg, type) {
    const el = document.getElementById("soToast");
    if (!el) return;
    el.textContent = msg;
    el.className = "so-toast show" + (type === "danger" ? " is-danger" : type === "ok" ? " is-ok" : "");
    clearTimeout(_toastTimer);
    _toastTimer = setTimeout(() => {
      el.classList.remove("show");
    }, 3600);
  }

  document.addEventListener("DOMContentLoaded", () => {
    SOState.load();
    const activeSite = SOState.getActiveSite();
    _sliderUnits = activeSite && activeSite.units.length ? activeSite.units.length : 40;
    render();
  });

  global.SOApp = {
    render,
    kullaniciDegistir,
    santiyeSec,
    sekmeSec,
    setSliderUnits,
    setLicenseYears,
    demoSifirla,
    openNewSiteModal,
    submitNewSite,
    openEditSiteModal,
    submitEditSite,
    deleteSite,
    goToSiteStock,
    openNewUserModal,
    submitNewUser,
    openAssignRoleModal,
    submitAssignRole,
    removeUserSiteRole,
    deleteUser,
    openModal,
    closeModal,
    toast
  };
})(window);
