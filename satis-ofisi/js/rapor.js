/* ==========================================================================
   MÜLKİZLE SATIŞ OFİSİ — CANLI FİYAT DİRENCİ RAPORU & ORTAKLIK / PRİM KARNESİ
   ========================================================================== */
(function (global) {
  function countUnits(site) {
    const counts = { satista: 0, opsiyonlu: 0, satildi: 0, diger: 0 };
    site.units.forEach(u => {
      if (counts[u.status] !== undefined) counts[u.status] += 1;
      else counts.diger += 1;
    });
    return counts;
  }

  function computeMetrics(site) {
    const pricedUnits = site.units.filter(u => Number(u.price) > 0);
    const listAvg = pricedUnits.length
      ? Math.round(pricedUnits.reduce((acc, u) => acc + Number(u.price), 0) / pricedUnits.length)
      : 0;

    const offeredLeads = site.leads.filter(l => Number(l.budgetOffer) > 0);
    const offerAvg = offeredLeads.length
      ? Math.round(offeredLeads.reduce((acc, l) => acc + Number(l.budgetOffer), 0) / offeredLeads.length)
      : 0;

    let resistancePct = 0;
    if (listAvg > 0 && offeredLeads.length > 0) {
      const lowerCount = offeredLeads.filter(l => Number(l.budgetOffer) < listAvg).length;
      resistancePct = Math.round((lowerCount / offeredLeads.length) * 100);
    }

    const readyHotBuyers = site.leads.filter(l => l.heat === "sicak").length;
    const soldUnits = site.units.filter(u => u.status === "satildi");
    const lastSold = soldUnits.length > 0 ? soldUnits[soldUnits.length - 1] : null;
    const ms = site.manualStats || { monthlyVisitors: 0, showFlatVisits: 0, targetBandMin: 0, targetBandMax: 0 };

    return {
      listAvg,
      offerAvg,
      resistancePct,
      readyHotBuyers,
      lastSold,
      monthlyVisitors: Number(ms.monthlyVisitors) || site.leads.length,
      showFlatVisits: Number(ms.showFlatVisits) || 0,
      targetBandMin: Number(ms.targetBandMin) || (offerAvg ? Math.round(offerAvg * 0.98) : 0),
      targetBandMax: Number(ms.targetBandMax) || (offerAvg ? Math.round(offerAvg * 1.03) : 0)
    };
  }

  function buildWhatsappReportText(site) {
    const c = countUnits(site);
    const pm = computeMetrics(site);
    return [
      `📊 *${site.name} — Haftalık Müteahhit & Satış Raporu*`,
      site.district ? `📍 ${site.district}` : "",
      ``,
      `🏗️ *Stok Durumu:* ${c.satildi} Satıldı | ${c.opsiyonlu} Opsiyonlu | ${c.satista} Satışta (Toplam ${site.units.length})`,
      `👥 *Efor Kanıtı:* ${pm.monthlyVisitors} Aile İlgilendi, ${pm.showFlatVisits} Aile Örnek Daireyi Gezdi.`,
      `🔥 *Güncel Sıcak Alıcı:* ${pm.readyHotBuyers} aktif müşteri takibinde.`,
      ``,
      `📉 *Fiyat Direnci Analizi:*`,
      `• Liste Fiyatı Ort.: ${pm.listAvg ? SOState.formatTL(pm.listAvg) : "Henüz fiyat girilmedi"}`,
      `• Müşteri Teklif Ort.: ${pm.offerAvg ? SOState.formatTL(pm.offerAvg) : "Henüz teklif yok"} (%${pm.resistancePct} Fiyat Direnci)`,
      `• Önerilen Kapanış Bandı: ${pm.targetBandMin ? SOState.formatTL(pm.targetBandMin) + " – " + SOState.formatTL(pm.targetBandMax) : "Veri bekleniyor"}`,
      ``,
      `🏷️ *Son Gerçek Satış Referansı:*`,
      pm.lastSold ? `${pm.lastSold.code} (${pm.lastSold.type}) → ${SOState.formatTL(pm.lastSold.price)}` : "Henüz kapanış yapılmadı.",
      ``,
      `_Mülkİzle Satış Ofisi Modülü ile hazırlanmıştır._`
    ]
      .filter(line => line !== "")
      .join("\n");
  }

  function renderOverview(site, roleInfo) {
    const S = SOState;
    const esc = S.escapeHtml;
    const counts = countUnits(site);
    const pm = computeMetrics(site);
    const accessible = S.getAccessibleSites();
    const isContractorMulti = roleInfo.role === "muteahhit" && accessible.length > 1;
    const canEdit = Boolean(roleInfo.isAdmin) || roleInfo.role === "mudur_ortak" || roleInfo.role === "muteahhit_ortak";

    const listWidthPct = pm.listAvg > 0 ? 100 : 0;
    const offerWidthPct = pm.listAvg > 0 && pm.offerAvg > 0
      ? Math.max(20, Math.min(98, Math.round((pm.offerAvg / pm.listAvg) * 100)))
      : 0;

    let multiStripHtml = "";
    if (isContractorMulti) {
      multiStripHtml = `
        <div class="so-card">
          <div class="so-card-header">
            <div>
              <h2 class="so-card-title">👑 Müteahhit Çoklu Şantiye Özeti (${esc(site.contractorName || "Projelerim")})</h2>
              <p class="so-card-sub">Size atanan şantiyeleri yan yana kıyaslayın.</p>
            </div>
          </div>
          <div class="so-multi-site-strip">
            ${accessible
              .map(st => {
                const uc = countUnits(st);
                const isAct = st.id === site.id;
                return `
                  <div class="so-mini-site-box ${isAct ? "active" : ""}" onclick="SOApp.santiyeSec('${st.id}')">
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                      <strong>${esc(st.name)}</strong>
                      <span class="so-role-pill">${st.units.length} Daire</span>
                    </div>
                    <div style="font-size:0.76rem;color:#64748B;margin:4px 0;">${esc(st.district || "Bölge belirtilmedi")}</div>
                    <div style="display:flex;gap:10px;font-size:0.76rem;font-weight:700;margin-top:6px;">
                      <span style="color:#16A34A;">🟢 ${uc.satista} Satışta</span>
                      <span style="color:#D97706;">🟡 ${uc.opsiyonlu} Opsiyon</span>
                      <span style="color:#DC2626;">🔴 ${uc.satildi} Satıldı</span>
                    </div>
                  </div>
                `;
              })
              .join("")}
          </div>
        </div>
      `;
    }

    return `
      ${multiStripHtml}

      <div class="so-kpi-grid">
        <div class="so-kpi-card">
          <div class="so-kpi-label">Gelen / Gezen Aile Eforu</div>
          <div class="so-kpi-val">${pm.monthlyVisitors} / ${pm.showFlatVisits}</div>
          <div class="so-kpi-note">${pm.showFlatVisits} aile örnek daireyi gezdi</div>
        </div>
        <div class="so-kpi-card is-ok">
          <div class="so-kpi-label">Canlı Daire Stoğu</div>
          <div class="so-kpi-val">${counts.satista} Satışta</div>
          <div class="so-kpi-note">🟡 ${counts.opsiyonlu} Opsiyonlu • 🔴 ${counts.satildi} Satıldı</div>
        </div>
        <div class="so-kpi-card is-warn">
          <div class="so-kpi-label">Fiyat Direnci &amp; Sıcak Alıcı</div>
          <div class="so-kpi-val">%${pm.resistancePct} Direnç</div>
          <div class="so-kpi-note">🔥 ${pm.readyHotBuyers} aktif sıcak müşteri</div>
        </div>
        <div class="so-kpi-card">
          <div class="so-kpi-label">Son Gerçek Kapanış</div>
          <div class="so-kpi-val" style="font-size:${pm.lastSold ? "1.3rem" : "0.95rem"};">
            ${pm.lastSold ? S.formatTL(pm.lastSold.price) : "Henüz Satış Yok"}
          </div>
          <div class="so-kpi-note">
            ${pm.lastSold ? esc(pm.lastSold.code + " • " + pm.lastSold.type) : "Stokta daire 'Satıldı' yapıldığında görünür"}
          </div>
        </div>
      </div>

      <div class="so-card">
        <div class="so-card-header">
          <div>
            <h2 class="so-card-title">📉 Canlı Fiyat Direnci &amp; Müteahhit İkna Raporu</h2>
            <p class="so-card-sub">Girdiğiniz daire liste fiyatları ile CRM müşteri tekliflerinden otomatik hesaplanır.</p>
          </div>
          <div class="so-chip-group">
            ${
              canEdit
                ? `<button type="button" class="so-btn so-btn-sm" onclick="SORapor.openEffortModal()">✏️ Efor &amp; Hedef Bandı Güncelle</button>`
                : ""
            }
            <button type="button" class="so-btn so-btn-primary so-btn-sm" onclick="SORapor.openWhatsappPreview()">
              📄 Haftalık PDF / WhatsApp Raporu
            </button>
          </div>
        </div>

        <div class="so-resistance-grid">
          <div class="so-bar-group">
            <div>
              <div class="so-bar-row-head">
                <span>Liste Fiyatı Ortalaması</span>
                <span>${pm.listAvg ? S.formatTL(pm.listAvg) : "Daire fiyatı girilmedi"}</span>
              </div>
              <div class="so-resistance-bar">
                <div class="so-resistance-fill" style="width:${listWidthPct}%;background:#0F172A;"></div>
              </div>
            </div>

            <div>
              <div class="so-bar-row-head">
                <span>Müşteri Teklif / Bütçe Tavanı Ort.</span>
                <span style="color:#2563EB;">${pm.offerAvg ? S.formatTL(pm.offerAvg) : "CRM teklifi yok"}</span>
              </div>
              <div class="so-resistance-bar">
                <div class="so-resistance-fill" style="width:${offerWidthPct}%;background:#2563EB;"></div>
              </div>
            </div>

            <div class="so-banner so-banner-warn">
              <span>
                🎯 <strong>Masaya Oturma Sinyali:</strong>
                ${
                  pm.targetBandMin > 0
                    ? `Fiyat <strong>${S.formatTL(pm.targetBandMin)} – ${S.formatTL(pm.targetBandMax)}</strong> bandına çekilirse masaya oturacak <strong>${pm.readyHotBuyers} Sıcak Alıcı</strong> bekliyor.`
                    : "Stok daire fiyatlarını ve CRM müşteri tekliflerini girdikçe fiyat direnci otomatik hesaplanır."
                }
              </span>
            </div>
          </div>

          <div class="so-ref-box">
            <div style="font-size:0.74rem;font-weight:800;color:#64748B;text-transform:uppercase;">
              🏷️ Son Satılan Daire Gerçek Kapanış Referansı
            </div>
            ${
              pm.lastSold
                ? `
                  <div style="font-size:1rem;font-weight:800;color:#0F172A;">${esc(pm.lastSold.block + " • " + pm.lastSold.code)} (${esc(pm.lastSold.type)})</div>
                  <div style="font-size:1.35rem;font-weight:800;color:#16A34A;">${S.formatTL(pm.lastSold.price)}</div>
                  <div style="font-size:0.78rem;color:#334155;">
                    👤 Alıcı: <strong>${esc(pm.lastSold.buyerName || "Belirtilmedi")}</strong>
                  </div>
                `
                : `<div style="font-size:0.84rem;color:#64748B;">Henüz satıldı olarak işaretlenmiş daire yok.</div>`
            }
          </div>
        </div>
      </div>
    `;
  }

  function renderPrim(site, roleInfo) {
    const S = SOState;
    const esc = S.escapeHtml;
    const canSwitch = Boolean(roleInfo.isAdmin) || roleInfo.role === "mudur_ortak" || roleInfo.role === "muteahhit_ortak";
    const soldRevenue = site.units
      .filter(u => u.status === "satildi")
      .reduce((acc, u) => acc + (Number(u.price) || 0), 0);

    const modelBadge =
      site.revenueModel === "ortaklik"
        ? "Model 1: Net Ortaklık Oranı Paylaşımı"
        : "Model 2: Büyük Ofis Performans & Prim Karnesi";

    let bodyHtml = "";
    if (site.revenueModel === "ortaklik") {
      const partners = S.getSitePartners(site);
      if (partners.length === 0) {
        bodyHtml = `
          <div class="so-banner so-banner-warn">
            <span>Henüz bu proje için ortaklık yüzdesi atanmış kullanıcı yok.</span>
            <button type="button" class="so-btn so-btn-primary so-btn-sm" onclick="SOApp.sekmeSec('yonetim')">
              👥 Projeler &amp; Ekip Sekmesinden Ortak Ata
            </button>
          </div>
        `;
      } else {
        bodyHtml = `
          <div class="so-banner so-banner-info" style="margin-bottom:14px;">
            <span>🤝 Bu şantiyede atadığınız net ortaklık oranları uygulanır.</span>
            <strong>Kapanan Satış Cirosu: ${soldRevenue ? S.formatTL(soldRevenue) : "0 ₺"}</strong>
          </div>
          <div class="so-table-wrap">
            <table class="so-table">
              <thead>
                <tr>
                  <th>Ortak / Kullanıcı</th>
                  <th>Şantiye Rolü</th>
                  <th>Ortaklık Oranı</th>
                  <th>Satış Ciro Payı</th>
                </tr>
              </thead>
              <tbody>
                ${partners
                  .map(p => {
                    const est = Math.round(soldRevenue * (p.sharePct / 100));
                    return `
                      <tr>
                        <td><strong>${esc(p.name)}</strong></td>
                        <td>${esc(p.roleLabel)}</td>
                        <td><span class="so-role-pill">%${p.sharePct}</span></td>
                        <td><strong>${est ? S.formatTL(est) : "0 ₺"}</strong></td>
                      </tr>
                    `;
                  })
                  .join("")}
              </tbody>
            </table>
          </div>
        `;
      }
    } else {
      const advisors = S.getSiteAdvisors(site);
      if (advisors.length === 0) {
        bodyHtml = `
          <div class="so-banner so-banner-warn">
            <span>Performans takibi için önce bu şantiyeye satış danışmanı / sorumlusu atayın.</span>
            <button type="button" class="so-btn so-btn-primary so-btn-sm" onclick="SOApp.sekmeSec('yonetim')">
              👥 Kullanıcı &amp; Rol Ata
            </button>
          </div>
        `;
      } else {
        bodyHtml = `
          <div class="so-table-wrap">
            <table class="so-table">
              <thead>
                <tr>
                  <th>Kullanıcı</th>
                  <th>Yeni Müşteri</th>
                  <th>Takip Araması</th>
                  <th>Sıcak Dönüşüm</th>
                  <th>Opsiyon</th>
                  <th>Kapanan Satış</th>
                  <th>Ciro &amp; Tahmini Prim</th>
                  <th>Efor</th>
                </tr>
              </thead>
              <tbody>
                ${advisors
                  .map(adv => {
                    const prim = Math.round(adv.revenue * (adv.bonusRate || 0));
                    return `
                      <tr>
                        <td><strong>${esc(adv.name)}</strong><div style="font-size:0.72rem;color:#64748B;">${esc(adv.roleLabel)}</div></td>
                        <td>${adv.newLeads}</td>
                        <td><strong>${adv.calls}</strong></td>
                        <td>🔥 ${adv.convertedHot}</td>
                        <td>🟡 ${adv.options}</td>
                        <td>🔴 <strong>${adv.closedSales}</strong></td>
                        <td>
                          <div><strong>${adv.revenue ? S.formatTL(adv.revenue) : "0 ₺"}</strong></div>
                          <div style="font-size:0.72rem;color:#16A34A;">Prim: ${prim > 0 ? S.formatTL(prim) : "Ortaklık"}</div>
                        </td>
                        <td>
                          <button type="button" class="so-btn so-btn-sm" onclick="SORapor.logAdvisorCall('${esc(adv.id)}')">
                            +1 Arama
                          </button>
                        </td>
                      </tr>
                    `;
                  })
                  .join("")}
              </tbody>
            </table>
          </div>
        `;
      }
    }

    return `
      <div class="so-card">
        <div class="so-card-header">
          <div>
            <h2 class="so-card-title">📊 ${esc(modelBadge)}</h2>
            <p class="so-card-sub">${esc(site.name)} için aktif gelir &amp; performans paylaşım modeli.</p>
          </div>
          ${
            canSwitch
              ? `<div class="so-chip-group">
                  <button type="button" class="so-chip ${site.revenueModel === "ortaklik" ? "active" : ""}" onclick="SORapor.switchRevenueModel('ortaklik')">
                    Model 1: Ortaklık Oranı
                  </button>
                  <button type="button" class="so-chip ${site.revenueModel === "prim" ? "active" : ""}" onclick="SORapor.switchRevenueModel('prim')">
                    Model 2: Performans &amp; Prim
                  </button>
                </div>`
              : ""
          }
        </div>
        ${bodyHtml}
      </div>
    `;
  }

  function openEffortModal() {
    const site = SOState.getActiveSite();
    if (!site) return;
    const ms = site.manualStats || { monthlyVisitors: 0, showFlatVisits: 0, targetBandMin: 0, targetBandMax: 0 };
    SOApp.openModal(
      "✏️ Efor Kanıtı & Hedef Fiyat Bandını Güncelle",
      `
        <form onsubmit="SORapor.saveEffort(event)">
          <div class="so-form-grid">
            <div class="so-field">
              <label>Gelen / Arayan Aile Sayısı</label>
              <input id="soEffVisitors" type="number" class="so-input" min="0" value="${ms.monthlyVisitors || 0}" />
            </div>
            <div class="so-field">
              <label>Örnek Daireyi Gezen Aile</label>
              <input id="soEffShowFlat" type="number" class="so-input" min="0" value="${ms.showFlatVisits || 0}" />
            </div>
          </div>
          <div class="so-form-grid">
            <div class="so-field">
              <label>Önerilen Alt Kapanış Bandı (₺)</label>
              <input id="soEffBandMin" type="number" class="so-input" min="0" step="100000" value="${ms.targetBandMin || 0}" />
            </div>
            <div class="so-field">
              <label>Önerilen Üst Kapanış Bandı (₺)</label>
              <input id="soEffBandMax" type="number" class="so-input" min="0" step="100000" value="${ms.targetBandMax || 0}" />
            </div>
          </div>
          <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:8px;">
            <button type="button" class="so-btn" onclick="SOApp.closeModal()">İptal</button>
            <button type="submit" class="so-btn so-btn-primary">✓ Kaydet</button>
          </div>
        </form>
      `
    );
  }

  function saveEffort(event) {
    event.preventDefault();
    const site = SOState.getActiveSite();
    if (!site) return;
    site.manualStats = {
      monthlyVisitors: Number(document.getElementById("soEffVisitors").value) || 0,
      showFlatVisits: Number(document.getElementById("soEffShowFlat").value) || 0,
      targetBandMin: Number(document.getElementById("soEffBandMin").value) || 0,
      targetBandMax: Number(document.getElementById("soEffBandMax").value) || 0
    };
    SOState.save();
    SOState.addLog(site.id, "Rapor Efor Güncellendi", `Gelen: ${site.manualStats.monthlyVisitors}, Gezen: ${site.manualStats.showFlatVisits}`);
    SOApp.closeModal();
    SOApp.render();
    SOApp.toast("Rapor verileri güncellendi.", "ok");
  }

  function switchRevenueModel(model) {
    const site = SOState.getActiveSite();
    if (!site) return;
    site.revenueModel = model;
    SOState.save();
    SOState.addLog(site.id, "Gelir Modeli", `Paylaşım modeli '${model === "ortaklik" ? "Ortaklık Oranı" : "Performans & Prim"}' yapıldı.`);
    SOApp.render();
    SOApp.toast("Gelir modeli güncellendi.", "ok");
  }

  function logAdvisorCall(advisorId) {
    const site = SOState.getActiveSite();
    if (!site) return;
    if (!site.advisorCalls) site.advisorCalls = {};
    site.advisorCalls[advisorId] = (Number(site.advisorCalls[advisorId]) || 0) + 1;
    SOState.save();
    SOState.addLog(site.id, "Performans Eforu", `${advisorId} için +1 müşteri takip araması işlendi.`);
    SOApp.render();
    SOApp.toast("Takip araması +1 kaydedildi.", "ok");
  }

  function openWhatsappPreview() {
    const site = SOState.getActiveSite();
    if (!site) return;
    const txt = buildWhatsappReportText(site);
    SOApp.openModal(
      "📄 Haftalık Müteahhit Raporu (WhatsApp / PDF Önizleme)",
      `
        <div class="so-field">
          <label>Paylaşıma Hazır Rapor Özeti</label>
          <textarea id="soWaReportArea" class="so-textarea" rows="13" readonly>${SOState.escapeHtml(txt)}</textarea>
        </div>
        <div style="display:flex;justify-content:flex-end;gap:8px;">
          <button type="button" class="so-btn" onclick="window.print()">🖨️ PDF / Yazdır</button>
          <button type="button" class="so-btn so-btn-primary" onclick="SORapor.copyReport()">📋 Metni Kopyala</button>
        </div>
      `
    );
  }

  function copyReport() {
    const el = document.getElementById("soWaReportArea");
    if (!el) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(el.value).then(() => SOApp.toast("Rapor metni panoya kopyalandı.", "ok"));
    } else {
      el.select();
      document.execCommand("copy");
      SOApp.toast("Rapor metni panoya kopyalandı.", "ok");
    }
  }

  global.SORapor = {
    renderOverview,
    renderPrim,
    openEffortModal,
    saveEffort,
    switchRevenueModel,
    logAdvisorCall,
    openWhatsappPreview,
    copyReport
  };
})(window);
