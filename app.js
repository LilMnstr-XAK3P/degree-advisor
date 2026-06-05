/* ── Credit overrides (courses that are NOT 3 credits) ── */
const COURSE_CREDITS = {
  "CIT 114":   4,
  "CSEC 114":  4,  // same course, crosslisted
  "CSCO 105B": 4,
  "CSCO 120":  4,
  "CSCO 121":  4,
  "CSCO 130B": 4,
  "CSCO 205B": 4,
  "CSCO 220":  4,
  "CSCO 230":  4,
  "CSCO 230B": 4,
  "CSCO 480":  4,
  "CSCO 482":  4,
  "CSCO 484":  4,
};

function courseCredits(num) {
  return COURSE_CREDITS[num] || 3;
}

/* ── State ── */
let state = {
  step: "program",
  programId: null,
  mapVersion: null,
  progress: null,      // wizard flow (old-map)
  completed: null,     // checklist flow — Set of course nums
  compareFrom: null,   // mapVersion we came from when in comparison mode
};

/* ── Entry ── */
window.addEventListener("DOMContentLoaded", () => render());

function render() {
  const main = document.getElementById("main");
  document.getElementById("restart-btn").style.display = state.step === "program" ? "none" : "block";
  updateProgress();

  switch (state.step) {
    case "program":    main.innerHTML = renderProgramStep();    break;
    case "mapVersion": main.innerHTML = renderMapVersionStep(); break;
    case "checklist":  main.innerHTML = renderChecklist();      break;
    case "progress":   main.innerHTML = renderProgressStep();   break;
    case "result":     main.innerHTML = renderResult();         break;
  }
}

function updateProgress() {
  const useWizard = state.mapVersion === "old";
  const steps = useWizard
    ? ["program", "mapVersion", "progress", "result"]
    : ["program", "mapVersion", "checklist", "result"];
  const idx = steps.indexOf(state.step);
  const pct = idx >= 0 ? (idx / (steps.length - 1)) * 100 : 0;
  document.getElementById("progress-bar").style.width = pct + "%";
}

/* ══════════════════════════════════════════════════════
   STEP 1 — Program selection
══════════════════════════════════════════════════════ */
function renderProgramStep() {
  const items = Object.values(programs).map(p => `
    <button class="choice-btn" onclick="selectProgram('${p.id}')">
      <span class="icon">${p.icon}</span>
      <span class="btn-text">
        <span class="btn-label">${p.label}</span>
        <span class="btn-sub">${p.credential} — ${p.sub}</span>
      </span>
      <span class="arrow">›</span>
    </button>
  `).join("");

  return `
    <div class="card">
      <div class="step-label">Step 1 of 3</div>
      <h2>Which program are you enrolled in?</h2>
      <p class="subtitle">Select your Cyber Security specialization to get personalized course guidance.</p>
      <div class="choices">${items}</div>
    </div>`;
}

function selectProgram(id) {
  state.programId = id;
  state.step = "mapVersion";
  render();
}

/* ══════════════════════════════════════════════════════
   STEP 2 — Requirements version
══════════════════════════════════════════════════════ */
function renderMapVersionStep() {
  const p = programs[state.programId];
  const items = p.mapOptions.map(opt => `
    <button class="choice-btn" onclick="selectMapVersion('${opt.value}')">
      <span class="icon">${opt.value === "new2728" ? "🆕" : opt.value === "new" ? "📅" : "🗂️"}</span>
      <span class="btn-text">
        <span class="btn-label">${opt.label}</span>
        <span class="btn-sub">${opt.sub}</span>
      </span>
      <span class="arrow">›</span>
    </button>
  `).join("");

  return `
    <div class="card">
      <div class="step-label">Step 2 of 3 &nbsp;·&nbsp; ${p.label} (${p.credential})</div>
      <h2>${p.mapQuestion}</h2>
      <p class="subtitle">
        Select the catalog year that matches your Student Education Plan (SEP) or
        what your advisor confirmed. <strong>If you started in 2025–26 but your
        completed courses align with the 2026–27 requirements</strong>, select
        the 2026–27 option — you are not locked to the year you enrolled.
        Ask your advisor if unsure.
      </p>
      <div class="choices">${items}</div>
    </div>`;
}

function selectMapVersion(v) {
  state.mapVersion = v;
  const p = programs[state.programId];
  // Use checklist if mapData exists for this version; otherwise wizard
  if (p.mapData && p.mapData[v]) {
    state.step = "checklist";
  } else {
    state.step = "progress";
  }
  render();
}

/* ══════════════════════════════════════════════════════
   STEP 3A — Checklist (new-map students)
══════════════════════════════════════════════════════ */
function renderChecklist() {
  const p  = programs[state.programId];
  const md = p.mapData[state.mapVersion];
  const mapLabel = p.mapOptions.find(o => o.value === state.mapVersion).label;

  // Core section
  const coreRows = md.core.map(c => checkRow(c)).join("");

  // Digital literacy
  const dlSection = md.digitalLiteracy ? `
    <div class="cl-section-head">Digital Literacy <span class="cl-section-sub">— complete one</span></div>
    <div class="cl-group">${md.digitalLiteracy.map(c => checkRow(c)).join("")}</div>
  ` : "";

  // Elective tracks (Net-Sec style)
  const tracksSection = md.tracks ? `
    <div class="cl-section-head">Elective Track Courses <span class="cl-section-sub">— check any you've completed (you'll finish ONE full track)</span></div>
    <div class="cl-tracks">
      ${md.tracks.map(track => `
        <details class="cl-track" open>
          <summary class="cl-track-title">
            ${track.label}
            ${track.hasFreeElective ? '<span class="cl-badge">+ 1 open elective</span>' : ""}
            ${track.note ? `<span class="cl-track-note">${track.note}</span>` : ""}
          </summary>
          ${track.prereqNote ? `<div class="cl-prereq-note">${track.prereqNote}</div>` : ""}
          <div class="cl-track-courses">
            ${track.courses.map(c => {
              if (c.orAlt) {
                return checkRow(c) +
                  `<div class="cl-or">— or —</div>` +
                  checkRow(c.orAlt);
              }
              return checkRow(c);
            }).join("")}
          </div>
        </details>
      `).join("")}
    </div>
  ` : "";

  // Recommended electives (DF-AAS style)
  const electivesSection = md.electives ? `
    <div class="cl-section-head">Recommended Electives <span class="cl-section-sub">— check any you've completed</span></div>
    <p class="cl-section-note">${md.electives.poolLabel}</p>
    <div class="cl-group">${md.electives.recommended.map(c => checkRow(c)).join("")}</div>
  ` : "";

  // Old catalog equivalents
  const oldSection = md.oldCatalogEquiv && md.oldCatalogEquiv.length ? `
    <div class="cl-section-head old-head">Courses from a Previous Catalog <span class="cl-section-sub">— check any you completed</span></div>
    <p class="cl-section-note">These may count toward your current requirements. Check them if completed — we'll apply them automatically.</p>
    <div class="cl-group">${md.oldCatalogEquiv.map(c => checkRow(c, c.countsAs)).join("")}</div>
  ` : "";

  return `
    <div class="card cl-card">
      <div class="step-label">Step 3 of 3 &nbsp;·&nbsp; ${p.label} (${p.credential}) &nbsp;·&nbsp; ${mapLabel}</div>
      <h2>Check off every course you have completed or are currently taking</h2>
      <p class="subtitle">Include courses in progress this semester. We'll calculate exactly what you still need.</p>

      <div class="cl-section-head">Core Requirements <span class="cl-section-sub">— all required</span></div>
      ${md.coreNote ? `<p class="cl-section-note">${md.coreNote}</p>` : ""}
      <div class="cl-group">${coreRows}</div>

      ${dlSection}
      ${tracksSection}
      ${electivesSection}
      ${oldSection}

      <div class="cl-submit-row">
        <button class="btn-primary btn-lg" onclick="submitChecklist()">
          Show My Remaining Courses →
        </button>
      </div>
    </div>`;
}

function checkRow(course, subtitle) {
  const safeId = "c_" + (course.num + (subtitle ? "_old" : "")).replace(/[^a-zA-Z0-9]/g, "_");
  const isChecked = state.completed && state.completed.has(course.num) ? "checked" : "";
  const sub = subtitle || course.note || "";
  const credits = courseCredits(course.num);
  const creditBadge = credits !== 3 ? `<span class="cr-badge">${credits} credits</span>` : "";
  return `
    <label class="cl-row" for="${safeId}">
      <input type="checkbox" id="${safeId}" name="course" value="${course.num}" ${isChecked}>
      <span class="cl-meta">
        <span class="cl-num-row">
          <span class="cl-num">${course.num}</span>
          ${creditBadge}
        </span>
        <span class="cl-name">${course.name}</span>
        ${sub ? `<span class="cl-sub">${sub}</span>` : ""}
      </span>
    </label>`;
}

function submitChecklist() {
  const checked = document.querySelectorAll('input[name="course"]:checked');
  state.completed = new Set([...checked].map(el => el.value));
  state.step = "result";
  render();
}

/* ══════════════════════════════════════════════════════
   STEP 3B — Progress wizard (old-map students)
══════════════════════════════════════════════════════ */
function renderProgressStep() {
  const p = programs[state.programId];
  const mapLabel = p.mapOptions.find(o => o.value === state.mapVersion).label;
  const items = p.progressOptions.map(opt => `
    <button class="choice-btn" onclick="selectProgress('${opt.value}')">
      <span class="icon">📊</span>
      <span class="btn-text">
        <span class="btn-label">${opt.label}</span>
        <span class="btn-sub">${opt.sub}</span>
      </span>
      <span class="arrow">›</span>
    </button>
  `).join("");

  return `
    <div class="card">
      <div class="step-label">Step 3 of 3 &nbsp;·&nbsp; ${mapLabel}</div>
      <h2>${p.progressQuestion}</h2>
      <p class="subtitle">
        Count only credits completed (or in progress) that apply toward your
        <strong>${p.label}</strong> program. Check your unofficial transcript or
        your SEP if you're unsure.
      </p>
      <div class="choices">${items}</div>
    </div>`;
}

function selectProgress(v) {
  state.progress = v;
  state.step = "result";
  render();
}

/* ══════════════════════════════════════════════════════
   STEP 4 — Result
══════════════════════════════════════════════════════ */
function renderResult() {
  return state.completed !== null ? renderChecklistResult() : renderWizardResult();
}

/* ── Wizard result (old-map) ─────────────────────────── */
function renderWizardResult() {
  const p    = programs[state.programId];
  const path = p.paths[state.mapVersion][state.progress];
  const mapLabel      = p.mapOptions.find(o => o.value === state.mapVersion).label;
  const progressLabel = p.progressOptions.find(o => o.value === state.progress).label;
  const isPlaceholder = path.advisorNote && path.advisorNote.startsWith("⚠️ Placeholder");

  const advisorBlock = path.advisorNote ? `
    <div class="note-box">
      <strong>${isPlaceholder ? "⚠️ Placeholder" : "📌 Note"}</strong>
      ${path.advisorNote.replace("⚠️ ", "")}
    </div>` : "";

  const courseRows = path.courses.length ? path.courses.map(c => `
    <li>
      <span class="course-num">${c.num}</span>
      <span>
        <span class="course-name">${c.name}</span>
        ${c.note ? `<span class="course-note">${c.note}</span>` : ""}
      </span>
    </li>`).join("") : "";

  const tracksBlock = path.tracks ? `
    <p style="font-weight:600;margin-bottom:10px;font-size:.92rem;margin-top:20px;">
      Elective specialization tracks (choose one — 12 credits):
    </p>
    <ul class="track-list">
      ${path.tracks.map(t => `
        <li>
          <span class="track-label">${t.label}</span>
          <span class="track-courses">${t.courses}</span>
        </li>`).join("")}
    </ul>` : "";

  return `
    <div class="card result-card">
      <span class="result-tag">Your Recommendation</span>
      ${isPlaceholder ? `<div class="placeholder-badge">🚧 Placeholder data — not yet filled in</div>` : ""}
      <h2>${p.icon} ${p.label} (${p.credential})</h2>
      <p class="subtitle" style="margin-bottom:20px;">
        <strong>${mapLabel}</strong> &nbsp;·&nbsp; <strong>${progressLabel} completed</strong>
      </p>
      ${advisorBlock}
      ${courseRows ? `
        <p style="font-weight:600;margin-bottom:10px;font-size:.92rem;">Recommended next course(s):</p>
        <ul class="course-list">${courseRows}</ul>` : ""}
      ${tracksBlock}
      <div class="action-row">
        <button class="btn-primary" onclick="restart()">Start Over</button>
        <button class="btn-secondary" onclick="goBack()">← Change an Answer</button>
      </div>
    </div>`;
}

/* ── Checklist result (new-map) ──────────────────────── */
function renderChecklistResult() {
  const p  = programs[state.programId];
  const md = p.mapData[state.mapVersion];
  const mapLabel = p.mapOptions.find(o => o.value === state.mapVersion).label;

  // Build effective completed set — resolve old-catalog equivalents
  const eff = new Set(state.completed);
  if (md.oldCatalogEquiv) {
    for (const oc of md.oldCatalogEquiv) {
      if (state.completed.has(oc.num) && oc.mapsTo) eff.add(oc.mapsTo);
    }
  }

  // Is a course satisfied?
  function sat(c) {
    if (!c) return false;
    if (eff.has(c.num)) return true;
    return (c.aliases || []).some(a => eff.has(a));
  }

  // ── Core ──────────────────────────────────────────────
  const coreDone      = md.core.filter(sat);
  const coreRemaining = md.core.filter(c => !sat(c));

  const coreRows = md.core.map(c => {
    const done = sat(c);
    const credits = courseCredits(c.num);
    const crTag = credits !== 3 ? ` <span class="cr-tag">${credits} cr</span>` : "";
    return `<li class="${done ? "s-done" : "s-todo"}">
      <span class="course-num">${c.num}${crTag}</span>
      <span>
        <span class="course-name">${c.name}</span>
        ${!done && c.note ? `<span class="course-note">${c.note}</span>` : ""}
      </span>
    </li>`;
  }).join("");

  // ── Digital literacy ───────────────────────────────────
  let dlBlock = "";
  if (md.digitalLiteracy) {
    const dlDone = md.digitalLiteracy.find(c => eff.has(c.num));
    dlBlock = dlDone
      ? `<div class="dl-row s-done">✅ Digital Literacy: <strong>${dlDone.num} — ${dlDone.name.split("(")[0].trim()}</strong></div>`
      : `<div class="dl-row s-todo">⚠️ Digital Literacy not yet satisfied — complete <strong>IS 100B</strong> (0 credits) or <strong>IS 101</strong> (3 credits).</div>`;
  }

  // ── Elective tracks ────────────────────────────────────
  let trackBlock = "";
  if (md.tracks) {
    const trackResults = md.tracks.map(track => {
      let done = 0, total = track.courses.length;

      const rows = track.courses.map(c => {
        const mainDone = sat(c);
        const altDone  = c.orAlt && sat(c.orAlt);
        const satisfied = mainDone || altDone;
        if (satisfied) done++;

        const displayNum  = altDone && !mainDone ? c.orAlt.num  : c.num;
        const displayName = altDone && !mainDone ? c.orAlt.name : c.name;
        const credits = courseCredits(displayNum);
        const crTag = credits !== 3 ? ` <span class="cr-tag">${credits} cr</span>` : "";
        const orHint = c.orAlt && !satisfied
          ? `<span class="or-hint">or ${c.orAlt.num} (${courseCredits(c.orAlt.num)} cr) — ${c.orAlt.name}</span>` : "";

        return `<li class="${satisfied ? "s-done" : "s-todo"}">
          <span class="course-num">${displayNum}${crTag}</span>
          <span>
            <span class="course-name">${displayName}</span>
            ${orHint}
          </span>
        </li>`;
      }).join("");

      let freeElecRow = "";
      if (track.hasFreeElective) {
        total++;
        freeElecRow = `<li class="s-todo free-elec">
          <span class="course-num">—</span>
          <span class="course-name">1 additional CIT / CSEC elective of your choice <span class="course-note">(standard per-credit tuition applies)</span></span>
        </li>`;
      }

      const pct = Math.round((done / total) * 100);
      return { track, done, total, pct, rows, freeElecRow };
    });

    // Sort: most complete first
    trackResults.sort((a, b) => b.pct - a.pct);

    const cards = trackResults.map((tr, idx) => {
      const isBest    = idx === 0 && tr.pct > 0;
      const complete  = tr.done === tr.total && !tr.track.hasFreeElective;
      const noteHtml  = tr.track.note ? `<p class="track-note-text">${tr.track.note}</p>` : "";
      return `
        <div class="tr-card ${isBest ? "tr-best" : ""} ${complete ? "tr-complete" : ""}">
          <div class="tr-header">
            <span class="tr-label">
              ${tr.track.label}
              ${complete ? " <span class='tr-badge complete'>✅ Complete</span>" : ""}
              ${isBest && !complete ? " <span class='tr-badge best'>⭐ Best match</span>" : ""}
            </span>
            <span class="tr-count">${tr.done} / ${tr.total} done</span>
          </div>
          ${miniBar(tr.done, tr.total)}
          ${tr.track.prereqNote ? `<div class="tr-prereq">${tr.track.prereqNote}</div>` : ""}
          ${noteHtml}
          <ul class="course-list tr-courses">${tr.rows}${tr.freeElecRow}</ul>
        </div>`;
    }).join("");

    trackBlock = `
      <div class="res-section-head">Elective Track Progress</div>
      <p class="res-section-note">Complete ONE full track. Tracks sorted by your current progress.</p>
      <div class="tr-grid">${cards}</div>`;
  }

  // ── Free electives (DF AAS 2026-27) ───────────────────
  let electivesBlock = "";
  if (md.electives) {
    const dlDone = md.digitalLiteracy ? md.digitalLiteracy.find(c => eff.has(c.num)) : null;
    const needed = dlDone && dlDone.num === "IS 101" ? 6 : 9;
    const recRows = md.electives.recommended.map(c => {
      const done = sat(c);
      return `<li class="${done ? "s-done" : "s-todo"}">
        <span class="course-num">${c.num}</span>
        <span>
          <span class="course-name">${c.name}</span>
          ${c.note ? `<span class="course-note">${c.note}</span>` : ""}
        </span>
      </li>`;
    }).join("");
    electivesBlock = `
      <div class="res-section-head">Electives — ${needed} credits needed</div>
      <p class="res-section-note">Recommended courses listed below. You may also use any CIT or CSEC course not already applied to another requirement.</p>
      <ul class="course-list">${recRows}</ul>`;
  }

  // ── Old catalog courses applied (new-map students) ───
  let oldBlock = "";
  if (md.oldCatalogEquiv && md.oldCatalogEquiv.length) {
    const used = md.oldCatalogEquiv.filter(oc => state.completed.has(oc.num));
    if (used.length) {
      const rows = used.map(oc => `
        <li class="s-done">
          <span class="course-num">${oc.num}</span>
          <span>
            <span class="course-name">${oc.name}</span>
            <span class="course-note">✅ ${oc.countsAs}</span>
          </span>
        </li>`).join("");
      oldBlock = `
        <div class="res-section-head">Previous Catalog Courses Applied</div>
        <ul class="course-list">${rows}</ul>`;
    }
  }

  // ── Transfer analysis (old-map students) ─────────────
  let transferBlock = "";
  if (md.isOldMap && md.transfersToNew) {
    const transferRows = Object.entries(md.transfersToNew)
      .filter(([num]) => state.completed.has(num))
      .map(([num, desc]) => {
        const isPositive = desc.startsWith("✅");
        return `<li class="${isPositive ? "s-done" : "s-todo"}">
          <span class="course-num">${num}</span>
          <span class="course-name">${desc}</span>
        </li>`;
      }).join("");

    if (transferRows) {
      transferBlock = `
        <div class="res-section-head transfer-head">If You Switch to the 2026–27 Map</div>
        <p class="res-section-note">Based on your completed courses, here's what would carry over to the 2026–27 requirements. Talk to your advisor about making the switch official.</p>
        <ul class="course-list">${transferRows}</ul>`;
    }

    // Check for unavailable courses still needed
    const unavailable = md.core.filter(c =>
      (c.status === "deactivated" || c.status === "onhold") && !state.completed.has(c.num)
    );
    if (unavailable.length) {
      const unavailRows = unavailable.map(c => `
        <li class="s-todo">
          <span class="course-num">${c.num}</span>
          <span>
            <span class="course-name">${c.name}</span>
            <span class="course-note">⚠️ ${c.note}</span>
          </span>
        </li>`).join("");
      transferBlock += `
        <div class="res-section-head warn-head">⚠️ Required Courses No Longer Available</div>
        <p class="res-section-note">You still need these courses to graduate under the 2025–26 map, but they are deactivated or on hold. Contact your advisor immediately about substitution petitions or switching to the current map.</p>
        <ul class="course-list">${unavailRows}</ul>`;
    }
  }

  // ── Summary banner ─────────────────────────────────────
  const allCoreGood = coreRemaining.length === 0;
  const summaryClass = allCoreGood ? "summary-good" : "summary-todo";
  const summaryMsg = allCoreGood
    ? `✅ All ${md.core.length} core courses complete — work on your electives.`
    : `${coreDone.length} of ${md.core.length} core courses done — ${coreRemaining.length} remaining.`;

  // ── Comparison mode banner & controls ─────────────────
  const isCompareMode = !!state.compareFrom;
  const fromLabel = state.compareFrom
    ? p.mapOptions.find(o => o.value === state.compareFrom)?.label : null;

  const compareBanner = isCompareMode ? `
    <div class="compare-banner">
      <span class="compare-icon">📊</span>
      <span><strong>Comparison View</strong> — showing how your completed courses apply to the <strong>${mapLabel}</strong>.
      This is for reference only. To officially switch, speak with your advisor.</span>
    </div>` : "";

  // ── Compare button (only on old-map result, not in compare mode) ──
  const compareBtn = (!isCompareMode && md.isOldMap && p.mapData && p.mapData['new']) ? `
    <button class="btn-compare" onclick="compareToMap('new')">
      📊 See how I'd look on 2026–27 requirements →
    </button>` : "";

  // ── Back button (when in compare mode) ─────────────────
  const backBtn = isCompareMode ? `
    <button class="btn-secondary" onclick="backFromCompare()">
      ← Back to ${fromLabel} results
    </button>` : "";

  return `
    <div class="card result-card ${isCompareMode ? "compare-mode" : ""}">
      ${compareBanner}
      <span class="result-tag">${isCompareMode ? "Comparison View" : "Your Course Plan"}</span>
      <h2>${p.icon} ${p.label} (${p.credential})</h2>
      <p class="subtitle" style="margin-bottom:16px;"><strong>${mapLabel}</strong></p>

      <div class="summary-banner ${summaryClass}">${summaryMsg}</div>

      <div class="res-section-head">Core Requirements — ${coreDone.length} of ${md.core.length} complete</div>
      ${miniBar(coreDone.length, md.core.length)}
      <ul class="course-list">${coreRows}</ul>

      ${dlBlock}
      ${trackBlock}
      ${electivesBlock}
      ${oldBlock}
      ${transferBlock}

      ${compareBtn}

      <div class="action-row" style="margin-top:16px;">
        <button class="btn-primary" onclick="restart()">Start Over</button>
        ${backBtn}
        ${!isCompareMode ? `<button class="btn-secondary" onclick="editChecklist()">← Edit My Courses</button>` : ""}
      </div>
    </div>`;
}

function miniBar(done, total) {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  return `<div class="mini-bar-wrap"><div class="mini-bar-fill" style="width:${pct}%"></div></div>`;
}

/* ══════════════════════════════════════════════════════
   Navigation
══════════════════════════════════════════════════════ */
function restart() {
  state = { step: "program", programId: null, mapVersion: null, progress: null, completed: null, compareFrom: null };
  render();
}

function compareToMap(targetVersion) {
  state.compareFrom = state.mapVersion;
  state.mapVersion  = targetVersion;
  render();
}

function backFromCompare() {
  state.mapVersion  = state.compareFrom;
  state.compareFrom = null;
  render();
}

function goBack() {
  if (state.step === "result" && state.completed !== null) {
    state.step = "checklist";
  } else if (state.step === "result") {
    state.step = "progress";
    state.progress = null;
  } else if (state.step === "checklist") {
    state.step = "mapVersion";
    state.mapVersion = null;
    state.completed = null;
  } else if (state.step === "progress") {
    state.step = "mapVersion";
    state.mapVersion = null;
  } else if (state.step === "mapVersion") {
    state.step = "program";
    state.programId = null;
  }
  render();
}

function editChecklist() {
  // Go back to checklist keeping completed set so checkboxes restore
  state.step = "checklist";
  render();
}
