/* ==========================================================================
   MÜLKİZLE SATIŞ OFİSİ — CRM, MÜKERRER TELEFON KİLİDİ & PAYDAŞ ÇİFT ONAYI
   ========================================================================== */
(function (global) {
  let _heatFilter = "hepsi";

  const HEAT_META = {
    sicak: { label: "🔥 Sıcak Alıcı", cls: "heat-sicak" },
    ilik: { label: "🌤️ Ilık Alıcı", cls: "heat-ilik" },
    soguk: { label: "❄️ Soğuk Alıcı", cls: "heat-soguk" }
  };

  function render(site, roleInfo) {
    const S = SOState;
    const esc = S.escapeHtml;
    const user = S.getActiveUser();
    const accessible = S.getAccessibleSites();

    const isAdvisor = roleInfo.role === "satis_sorumlusu";
    const isContractor = roleInfo.role === "muteahhit";
    const isManager = Boolean(roleInfo.isAdmin) || roleInfo.role === "mudur_ortak" || roleInfo.role === "muteahhit_ortak";

    let isolationBanner = "";
    if (isAdvisor) {
      isolationBanner = `
        <div class="so-banner so-banner-warn">
          <span>🔒 <strong>İzolasyon Aktif:</strong> Yalnızca kendi müşterilerinizi görüyorsunuz. Kayıt silme ve devretme kapalıdır; başka sorumludaki telefonu tekrar kaydetmeye çalışırsanız sistem kilitler.</span>
        </div>
      `;
    } else if (isContractor) {
      isolationBanner = `
        <div class="so-banner so-banner-info">
          <span>👑 <strong>Müteahhit Özeti:</strong> Müşteri telefonları KVKK gereği maskelenmiştir. Yalnızca satış hunisi ve bütçe tepkilerini izlersiniz.</span>
        </div>
      `;
    } else if (isManager) {
      isolationBanner = `
        <div class="so-banner so-banner-ok">
          <span>🎼 <strong>Orkestra Şefi Yetkisi:</strong> Tüm sorumluların müşterilerini görebilir, danışman ataması ve şantiyeler arası çapraz öneri (cross-sell) yapabilirsiniz.</span>
        </div>
      `;
    }

    const visibleLeads = site.leads.filter(l => {
      if (isAdvisor && l.ownerUserId !== user.id) return false;
      if (_heatFilter !== "hepsi" && l.heat !== _heatFilter) return false;
      return true;
    });

    const otherSites = accessible.filter(st => st.id !== site.id);

    const leadsHtml =
      visibleLeads.length === 0
        ? `<div class="so-banner so-banner-info">Henüz müşteri kaydı bulunmuyor. '+ Yeni Müşteri Kaydı' ile ekleyebilirsiniz.</div>`
        : `<div class="so-lead-grid">
            ${visibleLeads
              .map(lead => {
                const hm = HEAT_META[lead.heat] || HEAT_META.ilik;
                const displayPhone = isContractor ? S.maskPhone(lead.phone) : lead.phone;
                const crossBtn =
                  isManager && otherSites.length > 0
                    ? `<button type="button" class="so-btn so-btn-sm" onclick="SOCrm.openCrossSellModal('${esc(lead.id)}')">🔀 Diğer Şantiyeye Öner</button>`
                    : "";
                const heatBtns = !isContractor
                  ? `<select class="so-select" style="width:auto;padding:4px 8px;font-size:0.74rem;" onchange="SOCrm.changeHeat('${esc(lead.id)}', this.value)">
                      <option value="sicak" ${lead.heat === "sicak" ? "selected" : ""}>🔥 Sıcak</option>
                      <option value="ilik" ${lead.heat === "ilik" ? "selected" : ""}>🌤️ Ilık</option>
                      <option value="soguk" ${lead.heat === "soguk" ? "selected" : ""}>❄️ Soğuk</option>
                    </select>`
                  : "";

                return `
                  <div class="so-lead-card">
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;">
                      <div>
                        <div style="font-weight:800;font-size:0.95rem;">${esc(lead.name)}</div>
                        <div style="font-size:0.78rem;color:#64748B;">📞 ${esc(displayPhone)} • 🏠 ${esc(lead.unitInterest)}</div>
                      </div>
                      <span class="so-heat-badge ${hm.cls}">${hm.label}</span>
                    </div>

                    <div style="font-size:0.8rem;background:#F8FAFC;border:1px solid #E2E8F0;border-radius:8px;padding:8px 10px;">
                      <div>💰 Teklif / Bütçe: <strong>${S.formatTL(lead.budgetOffer)}</strong></div>
                      <div style="color:#475569;margin-top:3px;">💬 ${esc(lead.priceFeedback)}</div>
                    </div>

                    <div style="font-size:0.74rem;color:#64748B;">
                      👤 Sorumlu: <strong>${esc(lead.ownerName)}</strong> • 🕒 ${esc(lead.createdAt)}
                      ${lead.followUpDate ? `<br/>⏰ Geri Arama: <strong>${esc(lead.followUpDate)}</strong>` : ""}
                    </div>

                    <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;flex-wrap:wrap;margin-top:4px;">
                      ${heatBtns}
                      ${crossBtn}
                    </div>
                  </div>
                `;
              })
              .join("")}
          </div>`;

    const shareEnabled = site.partnerSharing === "paydas_acik";
    const partnerToggleHtml = isManager
      ? `
        <div class="so-chip-group">
          <button type="button" class="so-chip ${!shareEnabled ? "active" : ""}" onclick="SOCrm.setPartnerSharing('kapali')">
            🔒 Paylaşıma Kapalı
          </button>
          <button type="button" class="so-chip ${shareEnabled ? "active" : ""}" onclick="SOCrm.setPartnerSharing('paydas_acik')">
            🤝 Onaylı Paydaş Emlakçılara Açık
          </button>
        </div>
      `
      : `<span class="so-role-pill">${shareEnabled ? "🤝 Paydaş Emlakçılara Açık" : "🔒 Paylaşıma Kapalı"}</span>`;

    const partnerRequestsHtml =
      site.partnerRequests.length === 0
        ? `<div class="so-banner so-banner-info">Henüz paydaş emlakçı ön kaydı yok. '+ Paydaş Ön Kaydı Ekle' ile giriş yapabilirsiniz.</div>`
        : site.partnerRequests
            .map(req => {
              const isOk = req.status === "onaylandi";
              return `
                <div class="so-partner-card">
                  <div>
                    <div style="font-weight:800;font-size:0.88rem;">${esc(req.agencyName)}</div>
                    <div style="font-size:0.78rem;color:#475569;">
                      Müşteri: <strong>${esc(req.clientName)}</strong> (${isContractor ? S.maskPhone(req.clientPhone) : esc(req.clientPhone)})
                      • Randevu: <strong>${esc(req.visitTime)}</strong>
                    </div>
                    ${
                      isOk
                        ? `<div style="font-size:0.75rem;color:#16A34A;font-weight:700;margin-top:4px;">
                            ✅ Fiziki Geliş Onaylandı (${esc(req.verifiedAt)}) • 12 Haneli Ortak Takip Kodu: <strong>${esc(req.trackingCode)}</strong>
                           </div>`
                        : `<div style="font-size:0.75rem;color:#D97706;font-weight:700;margin-top:4px;">
                            ⏳ Ön Kayıt (Müşteri satış ofisine gelene kadar resmiyet kazanmaz)
                           </div>`
                    }
                  </div>
                  ${
                    !isOk && !isContractor
                      ? `<button type="button" class="so-btn so-btn-ok so-btn-sm" onclick="SOCrm.approvePartnerVisit('${esc(req.id)}')">
                          ✓ Müşteri Satış Ofisine Geldi / Eşleşmeyi Onayla
                        </button>`
                      : ""
                  }
                </div>
              `;
            })
            .join("");

    return `
      ${isolationBanner}

      <div class="so-card">
        <div class="so-card-header">
          <div>
            <h2 class="so-card-title">👥 Satış Ofisi CRM &amp; Mükerrer Telefon Koruması</h2>
            <p class="so-card-sub">
              ${esc(site.name)} müşteri havuzu. Aynı telefon başka bir sorumluda kayıtlıysa sistem kaydı otomatik engeller.
            </p>
          </div>
          ${
            !isContractor
              ? `<button type="button" class="so-btn so-btn-primary" onclick="SOCrm.openNewLeadModal()">+ Yeni Müşteri Kaydı</button>`
              : ""
          }
        </div>

        <div class="so-filter-row" style="margin-bottom:14px;">
          <div class="so-chip-group">
            ${["hepsi", "sicak", "ilik", "soguk"]
              .map(h => {
                const lbl = h === "hepsi" ? "Tümü" : HEAT_META[h].label;
                return `<button type="button" class="so-chip ${_heatFilter === h ? "active" : ""}" onclick="SOCrm.setHeatFilter('${h}')">${lbl}</button>`;
              })
              .join("")}
          </div>
          <span style="font-size:0.76rem;color:#64748B;">Görüntülenen: <strong>${visibleLeads.length}</strong> müşteri</span>
        </div>

        ${leadsHtml}
      </div>

      <div class="so-card">
        <div class="so-card-header">
          <div>
            <h2 class="so-card-title">🤝 Proje Paylaşım Şalteri &amp; Paydaş Emlakçı Çift Onayı</h2>
            <p class="so-card-sub">Sırf WhatsApp'tan katalog atarak müşteri sahiplenilmesini önleyen fiziki ofis geliş onayı.</p>
          </div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            ${partnerToggleHtml}
            ${
              !isContractor
                ? `<button type="button" class="so-btn so-btn-sm" onclick="SOCrm.openPartnerReqModal()">+ Paydaş Ön Kaydı Ekle</button>`
                : ""
            }
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:10px;">
          ${partnerRequestsHtml}
        </div>
      </div>
    `;
  }

  function setHeatFilter(h) {
    _heatFilter = h;
    SOApp.render();
  }

  function changeHeat(leadId, nextHeat) {
    const site = SOState.getActiveSite();
    const lead = site.leads.find(l => l.id === leadId);
    if (!lead) return;
    lead.heat = nextHeat;
    SOState.save();
    SOState.addLog(site.id, "Müşteri Sıcaklığı", `${lead.name} durumu '${HEAT_META[nextHeat].label}' olarak güncellendi.`);
    SOApp.render();
    SOApp.toast(`${lead.name} durumu güncellendi.`, "ok");
  }

  function openNewLeadModal() {
    const S = SOState;
    const site = S.getActiveSite();
    const user = S.getActiveUser();
    const unitOptions =
      `<option value="Genel / Henüz Seçilmedi">Genel / Henüz Seçilmedi</option>` +
      site.units
        .map(u => {
          const fSum = S.formatFacadeSummary(u.facades);
          const lbl = `${u.code} • ${u.type}${fSum.count > 0 ? " • " + fSum.shortCodes : ""}`;
          return `<option value="${S.escapeHtml(u.code + " (" + u.type + ")")}">${S.escapeHtml(lbl)}</option>`;
        })
        .join("");

    SOApp.openModal(
      "+ Yeni Müşteri Kaydı Aç (" + S.escapeHtml(user.name) + ")",
      `
        <div id="soLeadDuplicateAlert" class="so-banner so-banner-danger" style="display:none;margin-bottom:12px;"></div>
        <form onsubmit="SOCrm.submitNewLead(event)">
          <div class="so-form-grid">
            <div class="so-field">
              <label>Ad Soyad *</label>
              <input id="soNewLeadName" class="so-input" required placeholder="Müşteri adı soyadı" />
            </div>
            <div class="so-field">
              <label>Cep Telefonu *</label>
              <input id="soNewLeadPhone" class="so-input" required placeholder="05XX XXX XX XX" />
            </div>
          </div>
          <div class="so-form-grid">
            <div class="so-field">
              <label>Müşteri Sıcaklığı</label>
              <select id="soNewLeadHeat" class="so-select">
                <option value="sicak">🔥 Sıcak Alıcı</option>
                <option value="ilik" selected>🌤️ Ilık Alıcı</option>
                <option value="soguk">❄️ Soğuk Alıcı</option>
              </select>
            </div>
            <div class="so-field">
              <label>Teklif / Bütçe Tavanı (₺)</label>
              <input id="soNewLeadBudget" type="number" class="so-input" value="0" min="0" step="100000" />
            </div>
          </div>
          <div class="so-form-grid">
            <div class="so-field">
              <label>İlgilendiği Daire</label>
              <select id="soNewLeadUnit" class="so-select">${unitOptions}</select>
            </div>
            <div class="so-field">
              <label>Geri Arama Tarihi</label>
              <input id="soNewLeadFollowUp" type="date" class="so-input" />
            </div>
          </div>
          <div class="so-field">
            <label>Fiyat Tepkisi &amp; Not</label>
            <input id="soNewLeadFeedback" class="so-input" placeholder="Örn: Güney cephe istedi, bütçe görüşülüyor." />
          </div>
          <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:10px;">
            <button type="button" class="so-btn" onclick="SOApp.closeModal()">Vazgeç</button>
            <button type="submit" class="so-btn so-btn-primary">✓ Müşteriyi Kaydet</button>
          </div>
        </form>
      `
    );
  }

  function submitNewLead(event) {
    event.preventDefault();
    const S = SOState;
    const site = S.getActiveSite();
    const user = S.getActiveUser();

    const name = document.getElementById("soNewLeadName").value.trim();
    const phone = document.getElementById("soNewLeadPhone").value.trim();
    const heat = document.getElementById("soNewLeadHeat").value;
    const budgetOffer = Number(document.getElementById("soNewLeadBudget").value) || 0;
    const unitInterest = document.getElementById("soNewLeadUnit").value;
    const followUpDate = document.getElementById("soNewLeadFollowUp").value;
    const priceFeedback = document.getElementById("soNewLeadFeedback").value.trim() || "Görüşme kaydı açıldı.";

    const norm = S.normalizePhone(phone);
    const duplicate = site.leads.find(l => S.normalizePhone(l.phone) === norm && norm.length >= 7);
    if (duplicate) {
      const msg = `⛔ Bu müşteri ${duplicate.createdAt} itibarıyla ${duplicate.ownerName} adına kayıtlıdır, mükerrer kayıt açılamaz!`;
      const alertEl = document.getElementById("soLeadDuplicateAlert");
      if (alertEl) {
        alertEl.textContent = msg;
        alertEl.style.display = "flex";
      }
      S.addLog(site.id, "Mükerrer Kayıt Engellendi", `${name} (${phone}) için giriş engellendi; mevcut sahip: ${duplicate.ownerName}.`);
      SOApp.toast(msg, "danger");
      return;
    }

    const now = S.nowFormatted().slice(0, 16);
    site.leads.unshift({
      id: "ld-" + Date.now(),
      name,
      phone,
      heat,
      budgetOffer,
      unitInterest,
      priceFeedback,
      ownerUserId: user.id,
      ownerName: user.name,
      createdAt: now,
      followUpDate,
      notes: priceFeedback
    });
    S.save();
    S.addLog(site.id, "Yeni Müşteri Kaydı", `${name} (${S.maskPhone(phone)}) • ${unitInterest} eklendi.`);
    SOApp.closeModal();
    SOApp.render();
    SOApp.toast(`${name} başarıyla kaydedildi.`, "ok");
  }

  function openCrossSellModal(leadId) {
    const S = SOState;
    const site = S.getActiveSite();
    const lead = site.leads.find(l => l.id === leadId);
    const targets = S.getAccessibleSites().filter(st => st.id !== site.id);
    if (!lead || targets.length === 0) return;

    SOApp.openModal(
      "🔀 Çapraz Proje Önerisi (Cross-Sell)",
      `
        <p style="font-size:0.84rem;margin-bottom:12px;">
          <strong>${S.escapeHtml(lead.name)}</strong> (${S.formatTL(lead.budgetOffer)}) müşterisini hangi şantiyeye aktarmak istersiniz?
        </p>
        <div class="so-field">
          <label>Hedef Şantiye</label>
          <select id="soCrossTargetSite" class="so-select">
            ${targets.map(t => `<option value="${t.id}">${S.escapeHtml(t.name)} (${S.escapeHtml(t.district || "-")})</option>`).join("")}
          </select>
        </div>
        <div style="display:flex;justify-content:flex-end;gap:8px;">
          <button type="button" class="so-btn" onclick="SOApp.closeModal()">İptal</button>
          <button type="button" class="so-btn so-btn-primary" onclick="SOCrm.confirmCrossSell('${S.escapeHtml(lead.id)}')">✓ Yönlendir</button>
        </div>
      `
    );
  }

  function confirmCrossSell(leadId) {
    const S = SOState;
    const srcSite = S.getActiveSite();
    const lead = srcSite.leads.find(l => l.id === leadId);
    const targetId = document.getElementById("soCrossTargetSite").value;
    const targetSite = S.load().sites.find(st => st.id === targetId);
    if (!lead || !targetSite) return;

    const already = targetSite.leads.some(l => S.normalizePhone(l.phone) === S.normalizePhone(lead.phone));
    if (!already) {
      targetSite.leads.unshift({
        ...lead,
        id: "ld-" + Date.now(),
        createdAt: S.nowFormatted().slice(0, 16),
        unitInterest: "Çapraz Öneri (" + srcSite.name + ")",
        notes: srcSite.name + " şantiyesinden yönlendirildi."
      });
    }
    S.save();
    S.addLog(srcSite.id, "Çapraz Şantiye Önerisi", `${lead.name}, ${targetSite.name} şantiyesine yönlendirildi.`);
    SOApp.closeModal();
    SOApp.toast(`${lead.name} → ${targetSite.name} şantiyesine önerildi.`, "ok");
  }

  function setPartnerSharing(mode) {
    const site = SOState.getActiveSite();
    site.partnerSharing = mode;
    SOState.save();
    SOState.addLog(site.id, "Paylaşım Şalteri", `Paydaş emlakçı durumu '${mode === "paydas_acik" ? "Açık" : "Kapalı"}' yapıldı.`);
    SOApp.render();
    SOApp.toast("Paylaşım ayarı güncellendi.", "ok");
  }

  function openPartnerReqModal() {
    const site = SOState.getActiveSite();
    if (site.partnerSharing !== "paydas_acik") {
      SOApp.toast("Önce paylaşım şalterini 'Onaylı Paydaş Emlakçılara Açık' konumuna getirin.", "danger");
      return;
    }
    SOApp.openModal(
      "+ Paydaş Emlakçı Ön Kaydı Ekle",
      `
        <form onsubmit="SOCrm.submitPartnerReq(event)">
          <div class="so-field">
            <label>Paydaş Emlak Ofisi / Danışman *</label>
            <input id="soPrAgency" class="so-input" required placeholder="Örn: ABC Gayrimenkul — Danışman Adı" />
          </div>
          <div class="so-form-grid">
            <div class="so-field">
              <label>Getireceği Müşteri Adı *</label>
              <input id="soPrClient" class="so-input" required placeholder="Müşteri adı" />
            </div>
            <div class="so-field">
              <label>Müşteri Telefonu *</label>
              <input id="soPrPhone" class="so-input" required placeholder="05XX XXX XX XX" />
            </div>
          </div>
          <div class="so-field">
            <label>Randevu Tarihi / Saati</label>
            <input id="soPrVisitTime" class="so-input" placeholder="Örn: 28.11.2026 14:30" />
          </div>
          <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:8px;">
            <button type="button" class="so-btn" onclick="SOApp.closeModal()">İptal</button>
            <button type="submit" class="so-btn so-btn-primary">✓ Ön Kayıt Aç</button>
          </div>
        </form>
      `
    );
  }

  function submitPartnerReq(event) {
    event.preventDefault();
    const site = SOState.getActiveSite();
    const agencyName = document.getElementById("soPrAgency").value.trim();
    const clientName = document.getElementById("soPrClient").value.trim();
    const clientPhone = document.getElementById("soPrPhone").value.trim();
    const visitTime = document.getElementById("soPrVisitTime").value.trim() || SOState.nowFormatted().slice(0, 16);

    site.partnerRequests.unshift({
      id: "pr-" + Date.now(),
      agencyName,
      clientName,
      clientPhone,
      visitTime,
      status: "bekliyor",
      trackingCode: "",
      verifiedAt: ""
    });
    SOState.save();
    SOState.addLog(site.id, "Paydaş Ön Kayıt", `${agencyName} — ${clientName} için ön kayıt açıldı.`);
    SOApp.closeModal();
    SOApp.render();
    SOApp.toast("Paydaş ön kaydı eklendi.", "ok");
  }

  function approvePartnerVisit(reqId) {
    const S = SOState;
    const site = S.getActiveSite();
    const req = site.partnerRequests.find(r => r.id === reqId);
    if (!req) return;

    const rand11 = String(Math.floor(10000000000 + Math.random() * 89999999999));
    req.status = "onaylandi";
    req.trackingCode = "9" + rand11;
    req.verifiedAt = S.nowFormatted().slice(0, 16);

    S.save();
    S.addLog(site.id, "Paydaş Fiziki Onay", `${req.agencyName} — ${req.clientName} ofiste doğrulandı (Kod: ${req.trackingCode}).`);
    SOApp.render();
    SOApp.toast(`Fiziki geliş onaylandı! Ortak takip kodu: ${req.trackingCode}`, "ok");
  }

  global.SOCrm = {
    render,
    setHeatFilter,
    changeHeat,
    openNewLeadModal,
    submitNewLead,
    openCrossSellModal,
    confirmCrossSell,
    setPartnerSharing,
    openPartnerReqModal,
    submitPartnerReq,
    approvePartnerVisit
  };
})(window);
