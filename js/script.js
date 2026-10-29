(function () {
  "use strict";

  
  const DEPARTAMENTOS_GEO = window.DEPARTAMENTOS_GEO;
  const DATOS_POR_MES = window.DATOS_POR_MES;
  const DESCARGABLES_DISPONIBLES = window.DESCARGABLES_DISPONIBLES;
  const RUTA_DESCARGABLES = "descargables/";

  const MES_XLSX_POR_DEFECTO = "2026-06";

  const MESES_NOMBRE = {
    "01": "Enero", "02": "Febrero", "03": "Marzo", "04": "Abril",
    "05": "Mayo", "06": "Junio", "07": "Julio", "08": "Agosto",
    "09": "Septiembre", "10": "Octubre", "11": "Noviembre", "12": "Diciembre"
  };

  function labelForMonthKey(key) {
    const [y, m] = key.split("-");
    return `${MESES_NOMBRE[m] || m} ${y}`;
  }

 
  let currentMonth = Object.keys(DATOS_POR_MES).sort()[0]; // arranca con el más antiguo disponible (jun-2026)
  let selectedId = null;
  let hoveredId = null;

 
  function fmtInt(n) {
    return new Intl.NumberFormat("es-AR").format(n);
  }
  function fmtMonto(n) {
    if (n >= 1000000000) return "$" + (n / 1000000000).toFixed(2).replace(".", ",") + " mil M";
    if (n >= 1000000) return "$" + (n / 1000000).toFixed(1).replace(".", ",") + " M";
    return "$" + fmtInt(n);
  }
  function pctMora(d) {
    return (d.deudoresMora / d.deudoresUnicos) * 100;
  }

  function colorByMora(pct) {
    
    const stops = [
      { p: 0,   c: [127, 211, 204] }, // teal claro
      { p: 12,  c: [0, 167, 160] },   // teal
      { p: 20,  c: [244, 197, 66] },  // amarillo
      { p: 30,  c: [255, 107, 74] },  // coral
      { p: 100, c: [214, 62, 43] }    // coral oscuro
    ];
    let lo = stops[0], hi = stops[stops.length - 1];
    for (let i = 0; i < stops.length - 1; i++) {
      if (pct >= stops[i].p && pct <= stops[i + 1].p) {
        lo = stops[i]; hi = stops[i + 1]; break;
      }
    }
    const range = hi.p - lo.p || 1;
    const t = Math.max(0, Math.min(1, (pct - lo.p) / range));
    const c = lo.c.map((v, i) => Math.round(v + (hi.c[i] - v) * t));
    return "rgb(" + c[0] + ", " + c[1] + ", " + c[2] + ")";
  }

  function getDatosMes() {
    const mes = DATOS_POR_MES[currentMonth];
    return mes ? mes.departamentos : {};
  }

  
  function getSumaDepartamentos() {
    const vals = Object.values(getDatosMes());
    return vals.reduce((acc, d) => ({
      deudoresUnicos: acc.deudoresUnicos + d.deudoresUnicos,
      deudoresMora: acc.deudoresMora + d.deudoresMora,
      montoTotal: acc.montoTotal + d.montoTotal,
      montoMora: acc.montoMora + d.montoMora
    }), { deudoresUnicos: 0, deudoresMora: 0, montoTotal: 0, montoMora: 0 });
  }

  
  function getProvinciaOficial() {
    const mes = DATOS_POR_MES[currentMonth];
    if (mes && mes.provincia) return mes.provincia;
    
    return getSumaDepartamentos();
  }

  
  function getSinGeolocalizar() {
    const prov = getProvinciaOficial();
    const suma = getSumaDepartamentos();
    return {
      deudoresUnicos: prov.deudoresUnicos - suma.deudoresUnicos,
      deudoresMora: prov.deudoresMora - suma.deudoresMora,
      montoTotal: prov.montoTotal - suma.montoTotal,
      montoMora: prov.montoMora - suma.montoMora
    };
  }

  function getRanking() {
    const datos = getDatosMes();
    return DEPARTAMENTOS_GEO
      .map(function (g) { return Object.assign({}, g, { data: datos[g.id] }); })
      .filter(function (d) { return d.data; })
      .sort(function (a, b) { return pctMora(b.data) - pctMora(a.data); });
  }

  
  function getIndicadores() {
    const mes = DATOS_POR_MES[currentMonth];
    return (mes && mes.indicadores) ? mes.indicadores : [];
  }

  
  const monthSelect = document.getElementById("monthSelect");
  function renderMonthOptions() {
    monthSelect.innerHTML = "";
    Object.keys(DATOS_POR_MES).sort().forEach(function (key) {
      const opt = document.createElement("option");
      opt.value = key;
      opt.textContent = labelForMonthKey(key);
      if (key === currentMonth) opt.selected = true;
      monthSelect.appendChild(opt);
    });
  }
  monthSelect.addEventListener("change", function (e) {
    currentMonth = e.target.value;
    renderAll();
  });

  
  const deptosGroup = document.getElementById("deptosGroup");
  const tooltip = document.getElementById("tooltip");
  const mapWrap = document.getElementById("mapWrap");

  
  const pathElements = {};

  function buildMap() {
    deptosGroup.innerHTML = "";

    DEPARTAMENTOS_GEO.forEach(function (d) {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", d.path);
      path.setAttribute("class", "depto-path");
      path.setAttribute("tabindex", "0");
      path.setAttribute("role", "button");

      path.addEventListener("mouseenter", function () { hoveredId = d.id; updateMapStyles(); showTooltip(d); });
      path.addEventListener("mouseleave", function () { hoveredId = null; updateMapStyles(); hideTooltip(); });
      path.addEventListener("focus", function () { hoveredId = d.id; updateMapStyles(); showTooltip(d); });
      path.addEventListener("blur", function () { hoveredId = null; updateMapStyles(); hideTooltip(); });
      path.addEventListener("click", function () {
        selectedId = (d.id === selectedId) ? null : d.id;
        renderAll();
      });
      path.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          selectedId = (d.id === selectedId) ? null : d.id;
          renderAll();
        }
      });

      deptosGroup.appendChild(path);
      pathElements[d.id] = path;
    });
  }

  function updateMapStyles() {
    const datos = getDatosMes();
    const activeId = hoveredId || selectedId;

    DEPARTAMENTOS_GEO.forEach(function (d) {
      const path = pathElements[d.id];
      const data = datos[d.id];
      const pct = data ? pctMora(data) : 0;
      const baseFill = data ? colorByMora(pct) : "#D8DEE6";
      const isActive = activeId === d.id;
      const isDimmed = activeId && !isActive;

      path.setAttribute("aria-label", d.nombre + (data ? ": " + pct.toFixed(1) + "% de mora" : ": sin datos"));
      path.setAttribute("fill", baseFill);
      path.setAttribute("opacity", isDimmed ? "0.38" : "1");
      path.style.filter = isActive ? "url(#glow)" : "none";
      path.setAttribute("stroke", isActive ? "#FF6B4A" : "#FFFFFF");
      path.setAttribute("stroke-width", isActive ? "2.4" : "1.6");
    });
  }

  function renderMap() {
    updateMapStyles();
  }

  function showTooltip(d) {
    tooltip.textContent = d.nombre;
    tooltip.style.left = (d.cx / 800 * 100) + "%";
    tooltip.style.top = (d.cy / 805 * 100) + "%";
    tooltip.style.display = "block";
  }
  function hideTooltip() {
    tooltip.style.display = "none";
  }

  
  const panelTitle = document.getElementById("panelTitle");
  const panelDesc = document.getElementById("panelDesc");
  const panelContent = document.getElementById("panelContent");
  const resetBtn = document.getElementById("resetBtn");
  const kpiDeudoresUnicos = document.getElementById("kpiDeudoresUnicos");
  const kpiDeudoresMora = document.getElementById("kpiDeudoresMora");
  const kpiMontoTotal = document.getElementById("kpiMontoTotal");
  const kpiMontoMora = document.getElementById("kpiMontoMora");
  const pctValue = document.getElementById("pctValue");
  const donut = document.getElementById("donut");
  const rankingEl = document.getElementById("ranking");
  const geoNote = document.getElementById("geoNote");
  const geoNoteText = document.getElementById("geoNoteText");

  resetBtn.addEventListener("click", function () {
    selectedId = null;
    renderAll();
  });

  function renderPanel() {
    const datos = getDatosMes();
    const selectedData = selectedId ? datos[selectedId] : null;
    const selectedGeo = selectedId ? DEPARTAMENTOS_GEO.find(function (d) { return d.id === selectedId; }) : null;
    const provinciaOficial = getProvinciaOficial();

    const displayData = selectedData || provinciaOficial;
    const displayPct = selectedData
      ? pctMora(selectedData)
      : (provinciaOficial.deudoresUnicos ? (provinciaOficial.deudoresMora / provinciaOficial.deudoresUnicos) * 100 : 0);
    const displayName = selectedGeo ? selectedGeo.nombre : "Provincia de Jujuy";

    panelTitle.textContent = displayName;
    panelDesc.textContent = selectedId
      ? "Detalle del departamento seleccionado · " + labelForMonthKey(currentMonth)
      : "Total oficial de la provincia · " + labelForMonthKey(currentMonth);
    resetBtn.style.display = selectedId ? "inline-block" : "none";

    kpiDeudoresUnicos.textContent = fmtInt(displayData.deudoresUnicos);
    kpiDeudoresMora.textContent = fmtInt(displayData.deudoresMora);
    kpiMontoTotal.textContent = fmtMonto(displayData.montoTotal);
    kpiMontoMora.textContent = fmtMonto(displayData.montoMora);

    pctValue.textContent = displayPct.toFixed(1) + "%";
    pctValue.style.color = colorByMora(displayPct);
    donut.style.background = "conic-gradient(" + colorByMora(displayPct) + " " + (displayPct * 3.6) + "deg, rgba(255,255,255,0.15) 0deg)";

    
    if (!selectedId) {
      const residuo = getSinGeolocalizar();
      if (residuo.deudoresUnicos !== 0 || residuo.montoTotal !== 0) {
        geoNote.style.display = "block";
        geoNoteText.textContent = fmtInt(residuo.deudoresUnicos) + " deudores (" + fmtMonto(residuo.montoTotal) + ") del total provincial no están geolocalizados en ningún departamento.";
      } else {
        geoNote.style.display = "none";
      }
    } else {
      geoNote.style.display = "none";
    }

    
    panelContent.classList.remove("fade-in");
    void panelContent.offsetWidth;
    panelContent.classList.add("fade-in");

    renderRanking();
  }

  function renderRanking() {
    rankingEl.innerHTML = "";
    const ranking = getRanking();
    ranking.forEach(function (d) {
      const pct = pctMora(d.data);
      const isSel = d.id === selectedId;

      const row = document.createElement("div");
      row.className = "ranking-row" + (isSel ? " selected" : "");

      const left = document.createElement("div");
      left.className = "left";
      const dot = document.createElement("span");
      dot.className = "dot";
      dot.style.background = colorByMora(pct);
      const name = document.createElement("span");
      name.className = "name";
      name.textContent = d.nombre;
      left.appendChild(dot);
      left.appendChild(name);

      const pctEl = document.createElement("span");
      pctEl.className = "pct kpi-value";
      pctEl.textContent = pct.toFixed(1) + "%";

      row.appendChild(left);
      row.appendChild(pctEl);

      row.addEventListener("click", function () {
        selectedId = (d.id === selectedId) ? null : d.id;
        renderAll();
      });
      row.addEventListener("mouseenter", function () { hoveredId = d.id; renderMap(); });
      row.addEventListener("mouseleave", function () { hoveredId = null; renderMap(); });

      rankingEl.appendChild(row);
    });
  }

  
  function renderAll() {
    renderMap();
    renderPanel();
    renderKpiCarousel();
    renderProvinceCharts();
    initDownloadLinks();
  }

  
  const PALETA_CHART = ["#00A7A0", "#FF6B4A", "#F4C542", "#0D182A", "#6B7280", "#078680"];

  let entidadTipoChartInstance = null;

  const ENTIDAD_TIPO_METRIC_LABELS = {
    deudoresTotal: "Deudores únicos totales",
    deudoresMora:  "Deudores únicos en mora",
    montoTotal:    "Monto de deuda total (miles de $)",
    montoMora:     "Monto de deuda en mora (miles de $)"
  };

  function renderEntidadTipoChart() {
    const mes = DATOS_POR_MES[currentMonth];
    const canvas = document.getElementById("entidadTipoChart");
    if (!mes || !mes.entidadesTipo || !canvas) return;

    const metricSelect = document.getElementById("entidadTipoMetricSelect");
    const metric = metricSelect.value;

    
    const entradas = Object.keys(mes.entidadesTipo)
      .map(function (key) { return mes.entidadesTipo[key]; })
      .filter(function (e) { return e[metric] !== null && e[metric] !== undefined; });

    const labels = entradas.map(function (e) { return e.nombre; });
    const valores = entradas.map(function (e) { return e[metric]; });

    if (entidadTipoChartInstance) {
      entidadTipoChartInstance.data.labels = labels;
      entidadTipoChartInstance.data.datasets[0].data = valores;
      entidadTipoChartInstance.data.datasets[0].label = ENTIDAD_TIPO_METRIC_LABELS[metric];
      entidadTipoChartInstance.update();
      return;
    }

    entidadTipoChartInstance = new Chart(canvas.getContext("2d"), {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
          label: ENTIDAD_TIPO_METRIC_LABELS[metric],
          data: valores,
          backgroundColor: PALETA_CHART,
          borderRadius: 6,
          maxBarThickness: 90
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function (ctx) {
                return ctx.formattedValue.replace(/,/g, ".");
              }
            }
          }
        },
        scales: {
          x: { grid: { display: false } },
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) { return Number(value).toLocaleString("es-AR"); }
            }
          }
        }
      }
    });
  }

  function renderProvinceCharts() {
    renderEntidadTipoChart();
    renderEdadSexoChart();
  }

  let edadSexoChartInstance = null;

  const EDAD_SEXO_METRIC_LABELS = {
    montoTotal:     "Monto de deuda total (miles de $)",
    deudoresTotal:  "Deudores únicos totales",
    montoMora:      "Monto de deuda en mora (miles de $)",
    deudoresMora:   "Deudores únicos en mora",
    montoPromTotal: "Monto promedio de deuda total (miles de $)",
    montoPromMora:  "Monto promedio de deuda en mora (miles de $)"
  };

  const ORDEN_RANGOS_ETARIOS = ["65 o más", "55-64", "45-54", "35-44", "25-34", "Hasta 25"];

  function renderEdadSexoChart() {
    const mes = DATOS_POR_MES[currentMonth];
    const canvas = document.getElementById("edadSexoChart");
    if (!mes || !mes.edadSexo || !canvas) return;

    const metricSelect = document.getElementById("edadSexoMetricSelect");
    const metric = metricSelect.value;

    
    const porRango = {};
    ORDEN_RANGOS_ETARIOS.forEach(function (r) { porRango[r] = { F: null, M: null }; });
    mes.edadSexo.forEach(function (fila) {
      if (fila.rango in porRango && fila[metric] !== null && fila[metric] !== undefined) {
        porRango[fila.rango][fila.sexo] = fila[metric];
      }
    });

    const labels = ORDEN_RANGOS_ETARIOS;
    
    const dataF = labels.map(function (r) { return porRango[r].F === null ? null : -porRango[r].F; });
    const dataM = labels.map(function (r) { return porRango[r].M; });

    if (edadSexoChartInstance) {
      edadSexoChartInstance.data.datasets[0].data = dataF;
      edadSexoChartInstance.data.datasets[1].data = dataM;
      edadSexoChartInstance.options.plugins.tooltip.callbacks.label = tooltipLabelEdadSexo(metric);
      edadSexoChartInstance.options.scales.x.ticks.callback = axisTickEdadSexo;
      edadSexoChartInstance.update();
      return;
    }

    function tooltipLabelEdadSexo() {
      return function (ctx) {
        const valorAbs = Math.abs(ctx.raw);
        const formateado = valorAbs.toLocaleString("es-AR", { maximumFractionDigits: 2 });
        return ctx.dataset.label + ": " + formateado;
      };
    }
    function axisTickEdadSexo(value) {
      return Math.abs(Number(value)).toLocaleString("es-AR");
    }

    edadSexoChartInstance = new Chart(canvas.getContext("2d"), {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          { label: "Mujeres", data: dataF, backgroundColor: "#FF6B4A", borderRadius: 4, maxBarThickness: 26 },
          { label: "Hombres", data: dataM, backgroundColor: "#00A7A0", borderRadius: 4, maxBarThickness: 26 }
        ]
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom", labels: { boxWidth: 12, font: { family: "Montserrat", size: 11.5 } } },
          tooltip: { callbacks: { label: tooltipLabelEdadSexo(metric) } }
        },
        scales: {
          x: {
            stacked: false,
            grid: { color: "#E3E8EE" },
            ticks: { callback: axisTickEdadSexo }
          },
          y: {
            grid: { display: false }
          }
        }
      }
    });
  }

  document.getElementById("edadSexoMetricSelect")
    .addEventListener("change", renderEdadSexoChart);

  document.getElementById("entidadTipoMetricSelect")
    .addEventListener("change", renderEntidadTipoChart);


  
  const KPI_ICONS = {
    joven: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.5-7 8-7s8 3 8 7"/></svg>',
    mayor: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.5-7 8-7s8 3 8 7"/><path d="M9 8h6"/></svg>',
    monto: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M2 10h20"/><path d="M6 15h4"/></svg>',
    banco: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10l9-6 9 6"/><path d="M4 10v9M9 10v9M15 10v9M20 10v9"/><path d="M2 21h20"/></svg>',
    tarjeta: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/><path d="M6 15h4"/></svg>'
  };
  const KPI_ICON_DEFAULT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/></svg>';

  let kpiCarouselControls = null; 

  
  function buildKpiSlide(item) {
    const slide = document.createElement("div");
    slide.className = "kpi-slide";

    const iconWrap = document.createElement("div");
    iconWrap.className = "kpi-slide-icon icon-" + (item.color || "azul");
    iconWrap.innerHTML = KPI_ICONS[item.icono] || KPI_ICON_DEFAULT;

    const value = document.createElement("div");
    value.className = "kpi-slide-value text-" + (item.color || "azul");
    value.textContent = item.valor;

    const label = document.createElement("div");
    label.className = "kpi-slide-label";
    label.textContent = item.label;

    slide.appendChild(iconWrap);
    slide.appendChild(value);
    slide.appendChild(label);

    if (item.nota) {
      const note = document.createElement("p");
      note.className = "kpi-slide-note";
      note.textContent = item.nota;
      slide.appendChild(note);
    }

    return slide;
  }

  function renderKpiCarousel() {
    const section = document.getElementById("kpiCarouselSection");
    if (!section) return;

    const indicadores = getIndicadores();

    
    if (!indicadores.length) {
      section.style.display = "none";
      return;
    }
    section.style.display = "";

    
    if (kpiCarouselControls) {
      kpiCarouselControls.reset(indicadores);
    } else {
      kpiCarouselControls = initKpiCarouselControls(indicadores);
    }
  }

  function initKpiCarouselControls(initialIndicadores) {
    const viewport = document.getElementById("kpiViewport");
    const track = document.getElementById("kpiTrack");
    const prevBtn = document.getElementById("kpiPrevBtn");
    const nextBtn = document.getElementById("kpiNextBtn");
    const dotsWrap = document.getElementById("kpiDots");
    if (!viewport || !track || !prevBtn || !nextBtn || !dotsWrap) return null;

    const AUTOPLAY_MS = 3000;
    const AUTOPLAY_RESUME_DELAY_MS = 6000; 
    const GAP = 14; 

    let indicadores = initialIndicadores || [];
    let visibleCount = 1;
    let realIndex = 0;     
    let trackIndex = 0;    
    let autoplayTimer = null;
    let resumeTimer = null;
    let isDragging = false;
    let touchStartX = 0;
    let touchCurrentX = 0;
    let baseOffsetPx = 0;

    function computeVisibleCount() {
      const w = viewport.clientWidth;
      if (w >= 980) return 4;
      if (w >= 560) return 2;
      return 1;
    }

    
    function buildTrack() {
      track.innerHTML = "";
      const n = indicadores.length;
      if (!n) return;

      const cloneCount = Math.min(visibleCount, n);
      const headClones = indicadores.slice(n - cloneCount); 
      const tailClones = indicadores.slice(0, cloneCount);   

      headClones.forEach(function (item) { track.appendChild(buildKpiSlide(item)); });
      indicadores.forEach(function (item) { track.appendChild(buildKpiSlide(item)); });
      tailClones.forEach(function (item) { track.appendChild(buildKpiSlide(item)); });

      trackIndex = cloneCount; 
      realIndex = 0;
    }

    function trackSlides() {
      return Array.prototype.slice.call(track.children);
    }

    function cloneCount() {
      return Math.min(visibleCount, indicadores.length);
    }

    function slideStepPx() {
      const currentSlides = trackSlides();
      if (!currentSlides.length) return 0;
      const slideWidth = currentSlides[0].getBoundingClientRect().width;
      return slideWidth + GAP;
    }

    function renderDots() {
      dotsWrap.innerHTML = "";
      indicadores.forEach(function (_, i) {
        const dot = document.createElement("button");
        dot.className = "kpi-dot" + (i === realIndex ? " is-active" : "");
        dot.setAttribute("aria-label", "Ir a la tarjeta " + (i + 1));
        dot.addEventListener("click", function () {
          goToRealIndex(i);
          pauseAutoplayTemporarily();
        });
        dotsWrap.appendChild(dot);
      });
    }

    function updateDots() {
      const dots = dotsWrap.children;
      for (let i = 0; i < dots.length; i++) {
        dots[i].classList.toggle("is-active", i === realIndex);
      }
    }

    function applyTransform(animated) {
      const offset = trackIndex * slideStepPx();
      track.classList.toggle("is-dragging", !animated);
      track.style.transform = "translateX(-" + offset + "px)";
    }

    
    function recenterTrackIndex(newRealIndex) {
      const c = cloneCount();
      return c + newRealIndex;
    }

    
    function step(direction) {
      const n = indicadores.length;
      if (!n) return;

      const c = cloneCount();
      
      if (trackIndex < c || trackIndex >= c + n) {
        trackIndex = recenterTrackIndex(realIndex);
        applyTransform(false);
        
        void track.offsetWidth;
      }

      trackIndex += direction;
      realIndex = ((realIndex + direction) % n + n) % n;
      applyTransform(true);
      updateDots();
    }

    function nextSlide() { step(1); }
    function prevSlide() { step(-1); }

    
    function goToRealIndex(target) {
      const n = indicadores.length;
      if (!n) return;

      const c = cloneCount();
      if (trackIndex < c || trackIndex >= c + n) {
        trackIndex = recenterTrackIndex(realIndex);
      }

      let delta = target - realIndex;
      
      if (delta > n / 2) delta -= n;
      if (delta < -n / 2) delta += n;
      trackIndex += delta;
      realIndex = target;
      applyTransform(true);
      updateDots();
    }

    
    function handleTransitionEnd() {
      const n = indicadores.length;
      if (!n) return;
      const c = cloneCount();
      if (trackIndex < c || trackIndex >= c + n) {
        trackIndex = recenterTrackIndex(realIndex);
        applyTransform(false);
      }
    }
    track.addEventListener("transitionend", handleTransitionEnd);

    function handleResize() {
      const newVisible = computeVisibleCount();
      if (newVisible !== visibleCount) {
        visibleCount = newVisible;
        buildTrack();
        renderDots();
        applyTransform(false);
      } else {
        applyTransform(false);
      }
    }

    
    function startAutoplay() {
      stopAutoplay();
      const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;
      autoplayTimer = setInterval(nextSlide, AUTOPLAY_MS);
    }
    function stopAutoplay() {
      if (autoplayTimer) { clearInterval(autoplayTimer); autoplayTimer = null; }
    }
    function pauseAutoplayTemporarily() {
      stopAutoplay();
      if (resumeTimer) clearTimeout(resumeTimer);
      resumeTimer = setTimeout(startAutoplay, AUTOPLAY_RESUME_DELAY_MS);
    }

    prevBtn.addEventListener("click", function () {
      prevSlide();
      pauseAutoplayTemporarily();
    });
    nextBtn.addEventListener("click", function () {
      nextSlide();
      pauseAutoplayTemporarily();
    });

    
    viewport.addEventListener("mouseenter", stopAutoplay);
    viewport.addEventListener("mouseleave", startAutoplay);

    
    viewport.addEventListener("touchstart", function (e) {
      if (!e.touches || !e.touches.length) return;
      isDragging = true;
      touchStartX = e.touches[0].clientX;
      touchCurrentX = touchStartX;
      baseOffsetPx = trackIndex * slideStepPx();
      track.classList.add("is-dragging");
      stopAutoplay();
    }, { passive: true });

    viewport.addEventListener("touchmove", function (e) {
      if (!isDragging || !e.touches || !e.touches.length) return;
      touchCurrentX = e.touches[0].clientX;
      const delta = touchCurrentX - touchStartX;
      track.style.transform = "translateX(" + (-baseOffsetPx + delta) + "px)";
    }, { passive: true });

    function endTouch() {
      if (!isDragging) return;
      isDragging = false;

      const delta = touchCurrentX - touchStartX;
      const threshold = 40; 
      if (delta > threshold) {
        prevSlide();
      } else if (delta < -threshold) {
        nextSlide();
      } else {
        applyTransform(true); 
      }
      pauseAutoplayTemporarily();
    }

    viewport.addEventListener("touchend", endTouch);
    viewport.addEventListener("touchcancel", endTouch);

    window.addEventListener("resize", handleResize);

    
    function reset(newIndicadores) {
      if (newIndicadores) indicadores = newIndicadores;
      visibleCount = computeVisibleCount();
      buildTrack();
      renderDots();
      applyTransform(false);
      startAutoplay();
    }

    reset();

    return { reset: reset };
  }

  function initDownloadsAccordion() {
    const toggle = document.getElementById("downloadsToggle");
    const panel = document.getElementById("downloadsPanel");
    if (!toggle || !panel) return;

    toggle.addEventListener("click", function () {
      const isOpen = panel.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }
  
  function rutaDescargable(tipo, periodo) {
    return RUTA_DESCARGABLES + tipo + "/" + periodo + "." + tipo;
  }

  function initDownloadLinks() {
    const pdfBtn = document.getElementById("downloadPdfBtn");
    const xlsxBtn = document.getElementById("downloadXlsxBtn");

    if (pdfBtn) {
      
      if (DESCARGABLES_DISPONIBLES.pdf.includes(currentMonth)) {
        pdfBtn.href = rutaDescargable("pdf", currentMonth);
        pdfBtn.download = "informe_mora_jujuy_" + currentMonth + ".pdf";
        pdfBtn.style.display = "";
        pdfBtn.removeAttribute("aria-disabled");
      } else {
        
        pdfBtn.removeAttribute("href");
        pdfBtn.removeAttribute("download");
        pdfBtn.style.display = "none";
        pdfBtn.setAttribute("aria-disabled", "true");
      }
    }

    if (xlsxBtn) {
      
      const periodoXlsx = DESCARGABLES_DISPONIBLES.xlsx.includes(currentMonth)
        ? currentMonth
        : MES_XLSX_POR_DEFECTO;
      xlsxBtn.href = rutaDescargable("xlsx", periodoXlsx);
      xlsxBtn.download = "datos_mora_jujuy_" + currentMonth + ".xlsx";
    }
  }

  renderMonthOptions();
  buildMap();
  renderAll();
  initDownloadsAccordion();
})();
