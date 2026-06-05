/**
 * DEGREE ADVISOR — DATA FILE
 *
 * STRUCTURE
 * ---------
 * Each program has:
 *   mapOptions  — which requirement sets exist (drives Step 2 buttons)
 *   mapData     — course lists for the CHECKLIST flow (new-map students)
 *   paths       — advisory text for the WIZARD flow (old-map transition students)
 *   progressOptions / progressQuestion — used only by the wizard flow
 *
 * mapData[version] fields:
 *   core[]            required courses (all must be completed)
 *   tracks[]          elective specialization tracks (pick ONE) — Net-Sec only
 *   electives{}       free-elective config — DF AAS 2026-27 only
 *   digitalLiteracy[] IS 100B / IS 101 options
 *   oldCatalogEquiv[] old-catalog courses that count toward new requirements
 *   coreNote          instructional note shown above the core checklist
 */

const programs = {

  // ══════════════════════════════════════════════════════════════════════════
  "cyber-compliance": {
    id: "cyber-compliance",
    label: "Cyber Security — Compliance",
    credential: "AAS",
    icon: "📋",
    sub: "AAS Degree",

    mapQuestion: "Which set of degree requirements are you following?",
    mapOptions: [
      { value: "new",  label: "2026–27 requirements",             sub: "Your SEP or advisor confirmed you are following the 2026–27 degree map — regardless of when you started." },
      { value: "old",  label: "2025–26 catalog (or earlier)", sub: "You started under the 2025–26 catalog or an earlier one and have NOT been confirmed as aligned with the 2026–27 requirements." },
    ],

    // Checklist data — new map coming soon; old map uses placeholder below
    mapData: {
      old: {
        isOldMap: true,
        coreNote: "⚠️ 2025–26 catalog requirements. Check off every course you have completed. Courses marked unavailable can still be checked if you completed them previously.",
        core: [
          { num: "⚠️ Placeholder", name: "Compliance 2025–26 core courses not yet entered", note: "Contact your advisor for current course requirements" },
        ],
        digitalLiteracy: [
          { num: "IS 100B", name: "Core Computing Competency (0 credits)" },
          { num: "IS 101",  name: "Introduction to Information Systems (3 credits)" },
        ],
        oldCatalogEquiv: [],
      }
    },

    progressQuestion: "How many credit hours have you completed toward this program?",
    progressOptions: [
      { value: "early", label: "0 – 20 credits",  sub: "Just getting started." },
      { value: "mid",   label: "21 – 40 credits", sub: "Roughly halfway through." },
      { value: "late",  label: "41+ credits",      sub: "Near the finish line." },
    ],

    paths: {
      new: {
        early: {
          advisorNote: "⚠️ Placeholder — add the recommended next courses for new-map students with 0–20 credits.",
          courses: [
            { num: "CIT 1000", name: "⚠️ Course Name Here", note: "Prerequisite for most Cyber courses" },
            { num: "CIT 1XXX", name: "⚠️ Course Name Here" },
          ]
        },
        mid: {
          advisorNote: "⚠️ Placeholder — add mid-program courses for new-map Compliance students.",
          courses: [
            { num: "CIT 2XXX", name: "⚠️ Course Name Here" },
          ]
        },
        late: {
          advisorNote: "⚠️ Placeholder — add capstone / finishing courses for new-map Compliance students.",
          courses: [
            { num: "CIT 2XXX", name: "⚠️ Capstone / Final Course" },
          ]
        },
      },
      old: {
        early: {
          advisorNote: "⚠️ Placeholder — add transition guidance for older-map Compliance students who are just starting.",
          courses: [
            { num: "CIT 1XXX", name: "⚠️ Course Name Here", note: "Counts toward new map as equivalent" },
          ]
        },
        mid: {
          advisorNote: "⚠️ Placeholder — add transition guidance for older-map Compliance students who are mid-program.",
          courses: [
            { num: "CIT 2XXX", name: "⚠️ Course Name Here" },
          ]
        },
        late: {
          advisorNote: "⚠️ Placeholder — add transition guidance for older-map Compliance students who are nearly done.",
          courses: [
            { num: "CIT 2XXX", name: "⚠️ Course Name Here" },
          ]
        },
      }
    }
  },

  // ══════════════════════════════════════════════════════════════════════════
  "cyber-forensics-aas": {
    id: "cyber-forensics-aas",
    label: "Cyber Security — Digital Forensics",
    credential: "AAS",
    icon: "🔍",
    sub: "AAS Degree",

    mapQuestion: "Which set of degree requirements are you following?",
    mapOptions: [
      { value: "new2728", label: "2027–28 requirements",            sub: "Your SEP or advisor confirmed you are following the 2027–28 degree map." },
      { value: "new",     label: "2026–27 requirements",            sub: "Your SEP or advisor confirmed you are following the 2026–27 degree map — regardless of when you started." },
      { value: "old",     label: "2025–26 catalog (or earlier)", sub: "You started under the 2025–26 catalog or an earlier one and have NOT been confirmed as aligned with the 2026–27 requirements." },
    ],

    // ── Checklist data ────────────────────────────────────────────────────
    mapData: {
      new: {
        coreNote: "Complete all 9 core courses. You will also need 6–9 elective credits (see below).",
        core: [
          { num: "CIT 114",  name: "IT Essentials" },
          { num: "CIT 173",  name: "Introduction to Linux (Linux+)" },
          { num: "CIT 217",  name: "Security+" },
          { num: "CSEC 101", name: "Incident Handling & Response" },
          { num: "CSEC 110", name: "Digital Forensics Essentials" },
          { num: "CSEC 120", name: "CHFI 1: Digital Content Forensics",              note: "Take after CSEC 110" },
          { num: "CSEC 121", name: "CHFI 2: Internet & Network Forensics",           note: "Take after CSEC 120" },
          { num: "CSEC 191", name: "Disaster Recovery & Business Continuity" },
          { num: "CSEC 220", name: "CHFI 3: Operating Systems Forensics",            note: "Take after CSEC 120 & 121" },
        ],
        digitalLiteracy: [
          { num: "IS 100B", name: "Core Computing Competency (0 credits)",           note: "If selected → need 9 elective credits" },
          { num: "IS 101",  name: "Introduction to Information Systems (3 credits)", note: "If selected → need 6 elective credits" },
        ],
        electives: {
          noteWithIS100B: "You need 9 elective credits (IS 100B = 0 credits).",
          noteWithIS101:  "You need 6 elective credits (IS 101 = 3 credits).",
          recommended: [
            { num: "CSEC 221", name: "CHFI 4: Social Media, Mobile & Cloud Forensics", note: "Highly recommended" },
            { num: "CIT 112",  name: "Network+ (also listed as CSEC 112)", aliases: ["CSEC 112"],  note: "Highly recommended" },
          ],
          poolLabel: "Any CIT or CSEC course not already applied to another requirement",
        },
        oldCatalogEquiv: [
          { num: "CSEC 110B", name: "Introduction to Digital Forensics (old code)",
            countsAs: "Equivalent to CSEC 110 — satisfies that core requirement", mapsTo: "CSEC 110" },
          { num: "CSEC 112B", name: "Intro to Applied Windows Forensics (deactivated)",
            countsAs: "Elective credit (if completed before deactivation)" },
          { num: "CSEC 116B", name: "Intro to Mobile Device Forensics (on hold)",
            countsAs: "Elective credit (if completed)" },
          { num: "CSEC 212B", name: "Intermediate Applied Windows Forensics (on hold)",
            countsAs: "Elective credit (if completed)" },
          { num: "CSCO 120",  name: "CCNA — Introduction to Networks",
            countsAs: "Elective credit" },
          { num: "CSCO 230B", name: "Security Operations Center Fundamentals (old code)",
            countsAs: "Elective credit" },
        ],
      },

      new2728: {
        coreNote: "All 11 courses are required core — no electives in this program.",
        core: [
          { num: "CIT 112",  name: "Network+ (also listed as CSEC 112)", aliases: ["CSEC 112"] },
          { num: "CIT 114",  name: "IT Essentials" },
          { num: "CIT 173",  name: "Introduction to Linux (Linux+)" },
          { num: "CIT 217",  name: "Security+" },
          { num: "CSEC 101", name: "Incident Handling & Response" },
          { num: "CSEC 110", name: "Digital Forensics Essentials" },
          { num: "CSEC 120", name: "CHFI 1: Digital Content Forensics",              note: "Take after CSEC 110" },
          { num: "CSEC 121", name: "CHFI 2: Internet & Network Forensics",           note: "Take after CSEC 120" },
          { num: "CSEC 191", name: "Disaster Recovery & Business Continuity" },
          { num: "CSEC 220", name: "CHFI 3: Operating Systems Forensics",            note: "Take after CSEC 120 & 121" },
          { num: "CSEC 221", name: "CHFI 4: Social Media, Mobile & Cloud Forensics", note: "Take after CSEC 220" },
        ],
        digitalLiteracy: [
          { num: "IS 100B", name: "Core Computing Competency (0 credits)" },
          { num: "IS 101",  name: "Introduction to Information Systems (3 credits)" },
        ],
        oldCatalogEquiv: [
          { num: "CSEC 110B", name: "Introduction to Digital Forensics (old code)",
            countsAs: "Equivalent to CSEC 110 — satisfies that core requirement", mapsTo: "CSEC 110" },
          { num: "CSEC 112B", name: "Intro to Applied Windows Forensics (deactivated)",
            countsAs: "Confirm with advisor — may count toward digital literacy or general credits" },
        ],
      },

      // ── 2025-26 OLD MAP checklist ──────────────────────────────────────
      old: {
        isOldMap: true,
        coreNote: "2025–26 requirements — 33 core credits. Courses marked ⚠️ are deactivated or on hold and can no longer be newly enrolled in, but may be checked if you completed them previously.",
        core: [
          { num: "CIT 112",   name: "Network+" },
          { num: "CIT 114",   name: "IT Essentials" },
          { num: "CIT 173",   name: "Introduction to Linux (Linux+)" },
          { num: "CIT 263",   name: "Project Management" },
          { num: "CSEC 110B", name: "Introduction to Digital Forensics", note: "Updated course is CSEC 110 in new map" },
          { num: "CSEC 112B", name: "⚠️ Intro to Applied Windows Forensics", status: "deactivated", note: "DEACTIVATED — no longer offered. Contact advisor about substitution." },
          { num: "CSEC 116B", name: "⚠️ Intro to Mobile Device Forensics", status: "onhold", note: "ON HOLD — not currently offered. Contact advisor about substitution." },
          { num: "CSEC 212B", name: "⚠️ Intermediate Applied Windows Forensics", status: "onhold", note: "ON HOLD — not currently offered. Contact advisor about substitution." },
          { num: "CSEC 290B", name: "Security Capstone", status: "lastoffered", note: "LAST OFFERED: Fall 2026 for Forensics AAS students only — enroll immediately if still needed." },
        ],
        tracks: [
          {
            id: "prog-elec", label: "Programming / Cloud Elective — choose one",
            courses: [
              { num: "CIT 126", name: "Cloud Computing Fundamentals" },
              { num: "CIT 129", name: "Introduction to Programming" },
            ],
          },
        ],
        digitalLiteracy: [
          { num: "IS 100B", name: "Core Computing Competency (0 credits)",           note: "If selected → need 7 elective credits" },
          { num: "IS 101",  name: "Introduction to Information Systems (3 credits)", note: "If selected → need 4 elective credits" },
        ],
        electives: {
          noteWithIS100B: "You need 7 elective credits.",
          noteWithIS101:  "You need 4 elective credits.",
          recommended: [
            { num: "CSEC 113B", name: "Introduction to Linux Forensics", note: "Recommended elective (on hold — check availability)" },
            { num: "CSEC 281B", name: "Ethical Hacking (old code — equivalent to CIT 274)", note: "Recommended elective — CSEC 281B = CIT 274 in the current catalog, NOT CSEC 281" },
          ],
          poolLabel: "Any CIT or CSEC course not already applied to another requirement",
        },
        oldCatalogEquiv: [],
        // Which completed old-map courses carry over to the 2026-27 map:
        transfersToNew: {
          "CIT 112":   "✅ CIT 112 — Required core in 2026–27 map",
          "CIT 114":   "✅ CIT 114 — Required core in 2026–27 map",
          "CIT 173":   "✅ CIT 173 — Required core in 2026–27 map",
          "CIT 217":   "✅ CIT 217 — Required core in 2026–27 map",
          "CSEC 110B": "✅ CSEC 110 equivalent — Required core in 2026–27 map",
          "CSEC 120":  "✅ CSEC 120 — Required core in 2026–27 map",
          "CSEC 121":  "✅ CSEC 121 — Required core in 2026–27 map",
          "CSEC 191":  "✅ CSEC 191 — Required core in 2026–27 map",
          "CSEC 220":  "✅ CSEC 220 — Required core in 2026–27 map",
          "CSEC 221":  "✅ CSEC 221 — Highly recommended elective in 2026–27 map",
          "CIT 126":   "✅ CIT 126 — Elective credit in 2026–27 map",
          "CIT 129":   "✅ CIT 129 — Elective credit in 2026–27 map",
        },
      },
    },

    // ── Wizard data (old-map transition students) ─────────────────────────
    progressQuestion: "How many program credits have you completed (or are currently taking)?",
    progressOptions: [
      { value: "early", label: "0 – 12 credits",  sub: "Just getting started." },
      { value: "mid",   label: "13 – 25 credits", sub: "Partway through." },
      { value: "late",  label: "26+ credits",     sub: "Near completion." },
    ],

    paths: {
      new2728: {
        early: {
          advisorNote: "Starting with the 2027–28 map, CIT 112 and CSEC 221 are now required core — there are no electives. Use the checklist mode for detailed tracking.",
          courses: []
        },
        mid:  { advisorNote: "Use the checklist mode for detailed tracking.", courses: [] },
        late: { advisorNote: "Use the checklist mode for detailed tracking.", courses: [] },
      },
      new: {
        early: {
          advisorNote: "Use the checklist mode for detailed tracking.",
          courses: []
        },
        mid:  { advisorNote: "Use the checklist mode for detailed tracking.", courses: [] },
        late: { advisorNote: "Use the checklist mode for detailed tracking.", courses: [] },
      },
      old: {
        early: {
          advisorNote: "⚠️ Transition Alert: Several courses on the old map are no longer offered (CSEC 112B, 116B, 212B are deactivated or on hold). Because you haven't completed many courses yet, strongly consider formally switching to the 2026–27 map. Meet with your advisor before enrolling in any CSEC courses.",
          courses: [
            { num: "CIT 114",  name: "IT Essentials",                  note: "Required on both old and new map — take this now" },
            { num: "CIT 173",  name: "Introduction to Linux (Linux+)", note: "Required on both old and new map — take this now" },
            { num: "—",        name: "See your advisor before continuing", note: "Courses on the old map may no longer be available. Switching to the new map is strongly recommended at this stage." },
          ]
        },
        mid: {
          advisorNote: "⚠️ Transition Alert: You are mid-program on the old map. Key required courses are no longer available — CSEC 112B (deactivated), CSEC 116B (on hold), and CSEC 212B (on hold). CSEC 290B will be offered one final time in Fall 2026 for forensics students. Meet with your advisor to determine if you need course substitutions or should formally switch to the new map.",
          courses: [
            { num: "CSEC 110",  name: "Digital Forensics Essentials",       note: "Updated version of CSEC 110B — counts toward transition" },
            { num: "CSEC 120",  name: "CHFI 1: Digital Content Forensics",  note: "New forensics sequence — may substitute for old forensics courses (confirm with advisor)" },
            { num: "CSEC 290B", name: "Security Capstone",                  note: "Last offered Fall 2026 — enroll if you still need it to graduate under old map" },
            { num: "CIT 263",   name: "Project Management",                 note: "Still required under old map" },
          ]
        },
        late: {
          advisorNote: "⚠️ Transition Alert: You are near completion on the old map. CSEC 290B is being offered one final time in Fall 2026 — if you still need it, enroll immediately. CSEC 112B, 116B, and 212B are no longer available; contact your advisor about substitution petitions.",
          courses: [
            { num: "CSEC 290B", name: "Security Capstone",                       note: "LAST OFFERED: Fall 2026 — enroll now if you still need this to graduate" },
            { num: "CIT 263",   name: "Project Management",                      note: "Required under old map — complete if not yet done" },
            { num: "—",         name: "Contact your advisor about CSEC 112B / 116B / 212B", note: "Deactivated or on hold. A substitution petition may be required." },
          ]
        },
      }
    }
  },

  // ══════════════════════════════════════════════════════════════════════════
  "cyber-forensics-ca": {
    id: "cyber-forensics-ca",
    label: "Cyber Security — Digital Forensics",
    credential: "CA",
    icon: "📂",
    sub: "Certificate of Achievement",

    mapQuestion: "Which set of degree requirements are you following?",
    mapOptions: [
      { value: "new", label: "2026–27 requirements",             sub: "Your SEP or advisor confirmed you are following the 2026–27 degree map — regardless of when you started." },
      { value: "old", label: "2025–26 catalog (or earlier)", sub: "You started under the 2025–26 catalog or an earlier one and have NOT been confirmed as aligned with the 2026–27 requirements." },
    ],

    // ── Checklist data ────────────────────────────────────────────────────
    mapData: {
      new: {
        coreNote: "All 10 courses are required. No electives — this is a fully prescribed Certificate of Achievement.",
        core: [
          { num: "CIT 112",  name: "Network+ (also listed as CSEC 112)", aliases: ["CSEC 112"] },
          { num: "CIT 114",  name: "IT Essentials" },
          { num: "CIT 217",  name: "Security+" },
          { num: "CSEC 101", name: "Incident Handling & Response" },
          { num: "CSEC 110", name: "Digital Forensics Essentials" },
          { num: "CSEC 120", name: "CHFI 1: Digital Content Forensics",              note: "Take after CSEC 110" },
          { num: "CSEC 121", name: "CHFI 2: Internet & Network Forensics" },
          { num: "CSEC 191", name: "Disaster Recovery & Business Continuity" },
          { num: "CSEC 220", name: "CHFI 3: Operating Systems Forensics" },
          { num: "CSEC 221", name: "CHFI 4: Social Media, Mobile & Cloud Forensics" },
        ],
        digitalLiteracy: [
          { num: "IS 100B", name: "Core Computing Competency (0 credits)" },
          { num: "IS 101",  name: "Introduction to Information Systems (3 credits)" },
        ],
        oldCatalogEquiv: [
          { num: "CSEC 110B", name: "Introduction to Digital Forensics (old code)",
            countsAs: "Equivalent to CSEC 110 — satisfies that core requirement", mapsTo: "CSEC 110" },
          { num: "CIT 211",   name: "Microsoft Operating Systems Management",
            countsAs: "Required in old CA map — does NOT count toward new CA core" },
          { num: "CIT 263",   name: "Project Management",
            countsAs: "Required in old CA map — does NOT count toward new CA core" },
        ],
      },

      // ── 2025-26 OLD MAP checklist ──────────────────────────────────────
      old: {
        isOldMap: true,
        coreNote: "2025–26 CA requirements — 30 core credits. Courses marked ⚠️ are deactivated or on hold. Important: The CA does NOT include CSEC 290B — do not enroll in it.",
        core: [
          { num: "CIT 112",   name: "Network+" },
          { num: "CIT 114",   name: "IT Essentials" },
          { num: "CIT 211",   name: "Microsoft Operating Systems Management" },
          { num: "CIT 263",   name: "Project Management" },
          { num: "CSEC 110B", name: "Introduction to Digital Forensics", note: "Updated course is CSEC 110 in new map" },
          { num: "CSEC 112B", name: "⚠️ Intro to Applied Windows Forensics", status: "deactivated", note: "DEACTIVATED — no longer offered. Contact advisor about substitution." },
          { num: "CSEC 116B", name: "⚠️ Intro to Mobile Device Forensics", status: "onhold", note: "ON HOLD — not currently offered. Contact advisor about substitution." },
          { num: "CSEC 212B", name: "⚠️ Intermediate Applied Windows Forensics", status: "onhold", note: "ON HOLD — not currently offered. Contact advisor about substitution." },
        ],
        tracks: [
          {
            id: "prog-elec", label: "Programming / Cloud Elective — choose one",
            courses: [
              { num: "CIT 126", name: "Cloud Computing Fundamentals" },
              { num: "CIT 129", name: "Introduction to Programming" },
            ],
          },
        ],
        digitalLiteracy: [
          { num: "IS 100B", name: "Core Computing Competency (0 credits)" },
          { num: "IS 101",  name: "Introduction to Information Systems (3 credits)" },
        ],
        oldCatalogEquiv: [],
        transfersToNew: {
          "CIT 112":   "✅ CIT 112 — Required core in 2026–27 CA map",
          "CIT 114":   "✅ CIT 114 — Required core in 2026–27 CA map",
          "CSEC 110B": "✅ CSEC 110 equivalent — Required core in 2026–27 CA map",
          "CSEC 120":  "✅ CSEC 120 — Required core in 2026–27 CA map",
          "CSEC 121":  "✅ CSEC 121 — Required core in 2026–27 CA map",
          "CSEC 191":  "✅ CSEC 191 — Required core in 2026–27 CA map",
          "CSEC 220":  "✅ CSEC 220 — Required core in 2026–27 CA map",
          "CSEC 221":  "✅ CSEC 221 — Required core in 2026–27 CA map",
          "CIT 211":   "❌ CIT 211 — Not in 2026–27 CA map (no equivalent)",
          "CIT 263":   "❌ CIT 263 — Not in 2026–27 CA map (no equivalent)",
          "CIT 126":   "✅ CIT 126 — May count as general elective credit (you pay per credit)",
          "CIT 129":   "✅ CIT 129 — May count as general elective credit (you pay per credit)",
        },
      },
    },

    // ── Wizard data (old-map transition students) ─────────────────────────
    progressQuestion: "How many program credits have you completed (or are currently taking)?",
    progressOptions: [
      { value: "early", label: "0 – 10 credits",  sub: "Just getting started." },
      { value: "mid",   label: "11 – 20 credits", sub: "Partway through." },
      { value: "late",  label: "21+ credits",     sub: "Near completion." },
    ],

    paths: {
      new: {
        early: { advisorNote: "Use the checklist mode for detailed tracking.", courses: [] },
        mid:   { advisorNote: "Use the checklist mode for detailed tracking.", courses: [] },
        late:  { advisorNote: "Use the checklist mode for detailed tracking.", courses: [] },
      },
      old: {
        early: {
          advisorNote: "⚠️ Transition Alert: Several courses on the old CA map are no longer offered — CSEC 112B (deactivated), CSEC 116B (on hold), and CSEC 212B (on hold). Because you haven't completed many courses yet, strongly consider formally switching to the 2026–27 map. Note: The CA does NOT include CSEC 290B — do not enroll in it. Meet with your advisor before enrolling in any CSEC courses.",
          courses: [
            { num: "CIT 112",  name: "Network+",                           note: "Required on both old and new map — take this now" },
            { num: "CIT 114",  name: "IT Essentials",                      note: "Required on both old and new map — take this now" },
            { num: "—",        name: "See your advisor before continuing",  note: "Key old-map courses are no longer available. Switching to the new map is strongly recommended." },
          ]
        },
        mid: {
          advisorNote: "⚠️ Transition Alert: CSEC 112B (deactivated), CSEC 116B (on hold), and CSEC 212B (on hold) are no longer available. Contact your advisor about substitution petitions or switching to the new map. Important: The CA does NOT include CSEC 290B — do not enroll in it.",
          courses: [
            { num: "CSEC 110", name: "Digital Forensics Essentials",        note: "Updated version of CSEC 110B — counts toward transition" },
            { num: "CSEC 120", name: "CHFI 1: Digital Content Forensics",   note: "New sequence — may substitute for old courses (confirm with advisor)" },
            { num: "CIT 211",  name: "Microsoft Operating Systems Management", note: "Still required under old CA map" },
            { num: "CIT 263",  name: "Project Management",                  note: "Still required under old CA map" },
          ]
        },
        late: {
          advisorNote: "⚠️ Transition Alert: CSEC 112B, 116B, and 212B are deactivated or on hold — a substitution petition may be required. Important: The CA does NOT include CSEC 290B — do not enroll in it. Contact your advisor to confirm your path to graduation.",
          courses: [
            { num: "CIT 211",  name: "Microsoft Operating Systems Management",    note: "Required under old CA map" },
            { num: "CIT 263",  name: "Project Management",                        note: "Required under old CA map" },
            { num: "—",        name: "Contact your advisor about CSEC 112B / 116B / 212B", note: "Deactivated or on hold. A substitution petition may be required." },
          ]
        },
      }
    }
  },

  // ══════════════════════════════════════════════════════════════════════════
  "cyber-network": {
    id: "cyber-network",
    label: "Cyber Security — Network Security",
    credential: "AAS",
    icon: "🌐",
    sub: "AAS Degree",

    mapQuestion: "Which set of degree requirements are you following?",
    mapOptions: [
      { value: "new2728", label: "2027–28 requirements",            sub: "Your SEP or advisor confirmed you are following the 2027–28 degree map." },
      { value: "new",     label: "2026–27 requirements",            sub: "Your SEP or advisor confirmed you are following the 2026–27 degree map — regardless of when you started." },
      { value: "old",     label: "2025–26 catalog (or earlier)", sub: "You started under the 2025–26 catalog or an earlier one and have NOT been confirmed as aligned with the 2026–27 requirements." },
    ],

    // ── Checklist data ────────────────────────────────────────────────────
    mapData: {
      new: {
        coreNote: "Complete all 8 core courses before enrolling in any elective track. CSEC 286 should be taken last.",
        core: [
          { num: "CIT 105",  name: "Introduction to Artificial Intelligence" },
          { num: "CIT 112",  name: "Network+", aliases: ["CSEC 112"] },
          { num: "CIT 114",  name: "IT Essentials" },
          { num: "CIT 126",  name: "Cloud Computing Fundamentals" },
          { num: "CIT 129",  name: "Introduction to Programming" },
          { num: "CIT 173",  name: "Introduction to Linux (Linux+)" },
          { num: "CIT 217",  name: "Security+" },
          { num: "CSEC 286", name: "Applied Network Defense", note: "Take after completing all other core courses" },
        ],
        digitalLiteracy: [
          { num: "IS 100B", name: "Core Computing Competency (0 credits)" },
          { num: "IS 101",  name: "Introduction to Information Systems (3 credits)" },
        ],
        tracks: [
          {
            id: "cisco", label: "Cisco-based Network Operations",
            note: "3 courses required (9 credits). Add 1 more CIT/CSEC/CSCO course to reach 12 credits.",
            courses: [
              { num: "CSCO 120", name: "CCNA — Introduction to Networks" },
              { num: "CSCO 121", name: "CCNA Switching, Routing, and Wireless Essentials" },
              { num: "CSCO 220", name: "CCNA Enterprise Networking, Security, and Automation",
                orAlt: { num: "CSCO 230", name: "Security Operations Center Fundamentals" } },
            ],
          },
          {
            id: "cloud", label: "Cloud Security",
            courses: [
              { num: "CIT 211",  name: "Microsoft Operating Systems Management" },
              { num: "CIT 213",  name: "Microsoft 365 Administration" },
              { num: "CIT 214",  name: "Microsoft Azure Administration" },
              { num: "CSEC 100", name: "Cloud Security Essentials" },
            ],
          },
          {
            id: "forensics", label: "Digital Forensics",
            courses: [
              { num: "CSEC 120", name: "CHFI 1: Digital Content Forensics" },
              { num: "CSEC 121", name: "CHFI 2: Internet & Network Forensics" },
              { num: "CSEC 220", name: "CHFI 3: Operating Systems Forensics" },
              { num: "CSEC 221", name: "CHFI 4: Social Media, Mobile & Cloud Forensics" },
            ],
          },
          {
            id: "compliance", label: "Compliance",
            courses: [
              { num: "CSEC 101",  name: "Incident Handling & Response" },
              { num: "CSEC 191",  name: "Disaster Recovery & Business Continuity" },
              { num: "CSEC 225",  name: "Governance & Risk Management" },
              { num: "CSEC 226B", name: "Compliance" },
            ],
          },
          {
            id: "offsec", label: "Offensive Security",
            hasFreeElective: true,
            prereqNote: "⚠️ Prerequisite: CSEC 281 can ONLY be taken after CSEC 181 is completed with a grade of C or higher. CSEC 281 cannot be taken before, during, or at the same time as CSEC 181.",
            courses: [
              { num: "CIT 274",  name: "Ethical Hacking Essentials", note: "Previously listed as CSEC 281B — these are the same course" },
              { num: "CSEC 181", name: "CEH 1: Ethical Hacking Fundamentals" },
              { num: "CSEC 281", name: "CEH 2: Ethical Hacking", note: "Requires CSEC 181 completed with C or higher" },
            ],
          },
          {
            id: "ai", label: "Artificial Intelligence",
            hasFreeElective: true,
            courses: [
              { num: "CIT 164", name: "Introduction to Machine Learning" },
              { num: "CIT 223", name: "Natural Language Processing" },
              { num: "CIT 224", name: "Artificial Intelligence for Computer Vision" },
            ],
          },
        ],
        oldCatalogEquiv: [
          { num: "CSCO 230B", name: "Security Operations Center Fundamentals (old code)",
            countsAs: "Counts as CSCO 230 — satisfies the Cisco track 3rd-course slot",
            mapsTo: "CSCO 230", trackId: "cisco" },
          { num: "CSEC 281B", name: "Ethical Hacking (old code)",
            countsAs: "Equivalent to CIT 274 (Ethical Hacking Essentials) — satisfies the Offensive Security track first course. NOT the same as CSEC 281.",
            mapsTo: "CIT 274", trackId: "offsec" },
          { num: "CSEC 104B", name: "Security Essentials (old code)",
            countsAs: "Counts as an elective credit toward this program" },
          { num: "CSEC 114B", name: "Intro to Applied Network Forensics (deactivated)",
            countsAs: "Counts as an elective credit toward this program (if completed before deactivation)" },
        ],
      },

      new2728: {
        coreNote: "Complete all 8 core courses before enrolling in any elective track. CSEC 286 should be taken last.",
        core: [
          { num: "CIT 105",  name: "Introduction to Artificial Intelligence" },
          { num: "CIT 112",  name: "Network+", aliases: ["CSEC 112"] },
          { num: "CIT 114",  name: "IT Essentials" },
          { num: "CIT 126",  name: "Cloud Computing Fundamentals" },
          { num: "CIT 129",  name: "Introduction to Programming" },
          { num: "CIT 173",  name: "Introduction to Linux (Linux+)" },
          { num: "CIT 217",  name: "Security+" },
          { num: "CSEC 286", name: "Applied Network Defense", note: "Take after completing all other core courses" },
        ],
        digitalLiteracy: [
          { num: "IS 100B", name: "Core Computing Competency (0 credits)" },
          { num: "IS 101",  name: "Introduction to Information Systems (3 credits)" },
        ],
        tracks: [
          {
            id: "cisco", label: "Cisco-based Network Operations",
            note: "3 courses required (9 credits). Add 1 more CIT/CSEC/CSCO course to reach 12 credits.",
            courses: [
              { num: "CSCO 120", name: "CCNA — Introduction to Networks" },
              { num: "CSCO 121", name: "CCNA Switching, Routing, and Wireless Essentials" },
              { num: "CSCO 220", name: "CCNA Enterprise Networking, Security, and Automation",
                orAlt: { num: "CSCO 230", name: "Security Operations Center Fundamentals" } },
            ],
          },
          {
            id: "cloud", label: "Cloud Security",
            courses: [
              { num: "CIT 211",  name: "Microsoft Operating Systems Management" },
              { num: "CIT 213",  name: "Microsoft 365 Administration" },
              { num: "CIT 214",  name: "Microsoft Azure Administration" },
              { num: "CSEC 100", name: "Cloud Security Essentials" },
            ],
          },
          {
            id: "forensics", label: "Digital Forensics",
            courses: [
              { num: "CSEC 120", name: "CHFI 1: Digital Content Forensics" },
              { num: "CSEC 121", name: "CHFI 2: Internet & Network Forensics" },
              { num: "CSEC 220", name: "CHFI 3: Operating Systems Forensics" },
              { num: "CSEC 221", name: "CHFI 4: Social Media, Mobile & Cloud Forensics" },
            ],
          },
          {
            id: "compliance", label: "Compliance",
            courses: [
              { num: "CSEC 101",  name: "Incident Handling & Response" },
              { num: "CSEC 191",  name: "Disaster Recovery & Business Continuity" },
              { num: "CSEC 225",  name: "Governance & Risk Management" },
              { num: "CSEC 226B", name: "Compliance" },
            ],
          },
          {
            id: "offsec", label: "Offensive Security",
            hasFreeElective: false,
            prereqNote: "⚠️ Prerequisite: CSEC 281 can ONLY be taken after CSEC 181 is completed with a grade of C or higher. CSEC 281 cannot be taken before, during, or at the same time as CSEC 181.",
            courses: [
              { num: "CIT 274",  name: "Ethical Hacking Essentials", note: "Previously listed as CSEC 281B — these are the same course" },
              { num: "CSEC 181", name: "CEH 1: Ethical Hacking Fundamentals" },
              { num: "CSEC 281", name: "CEH 2: AI Ethical Hacking", note: "Requires CSEC 181 completed with C or higher" },
              { num: "CSEC 282", name: "AI Ethical Hacking" },
            ],
          },
          {
            id: "ai", label: "Artificial Intelligence",
            hasFreeElective: false,
            courses: [
              { num: "CIT 164",  name: "Introduction to Machine Learning" },
              { num: "CIT 223",  name: "Natural Language Processing" },
              { num: "CIT 224",  name: "Artificial Intelligence for Computer Vision" },
              { num: "CSEC 104", name: "AI Security Essentials (CompTIA AI Sec+)", aliases: ["CSEC 104B"] },
              { num: "CSEC 282", name: "AI Ethical Hacking" },
            ],
          },
        ],
        oldCatalogEquiv: [
          { num: "CSCO 230B", name: "Security Operations Center Fundamentals (old code)",
            countsAs: "Counts as CSCO 230 — satisfies the Cisco track 3rd-course slot",
            mapsTo: "CSCO 230", trackId: "cisco" },
          { num: "CSEC 281B", name: "CEH: Ethical Hacking (old code)",
            countsAs: "Equivalent to CIT 274 (Ethical Hacking Essentials) — satisfies the Offensive Security track first course. NOT the same as CSEC 281.",
            mapsTo: "CIT 274", trackId: "offsec" },
          { num: "CSEC 104B", name: "Security Essentials (old code)",
            countsAs: "Counts as CSEC 104 — satisfies the AI track course",
            mapsTo: "CSEC 104", trackId: "ai" },
          { num: "CSEC 114B", name: "Intro to Applied Network Forensics (deactivated)",
            countsAs: "Counts as an elective credit toward this program (if completed before deactivation)" },
        ],
      },

      // ── 2025-26 OLD MAP checklist ──────────────────────────────────────
      old: {
        isOldMap: true,
        coreNote: "2025–26 requirements — 24 core credits. Note: CSEC 290B is NOT for Network Security students. CSEC 114B is deactivated. CSCO 105B is no longer available for CIT students.",
        core: [
          { num: "CIT 112",   name: "Network+" },
          { num: "CIT 173",   name: "Introduction to Linux (Linux+)" },
          { num: "CSCO 120",  name: "CCNA — Introduction to Networks" },
          { num: "CSCO 121",  name: "CCNA Switching, Routing, and Wireless Essentials" },
          { num: "CSCO 230B", name: "Security Operations Center Fundamentals", note: "Now listed as CSCO 230 in newer catalogs" },
          { num: "CSEC 281B", name: "Ethical Hacking", note: "Now listed as CIT 274 in the current catalog — these are the same course. CSEC 281B ≠ CSEC 281." },
        ],
        tracks: [
          {
            id: "sec-elec", label: "Security Elective — choose one (3 credits)",
            courses: [
              { num: "CIT 217",   name: "Security+" },
              { num: "CSEC 104B", name: "Security Essentials" },
            ],
          },
          {
            id: "csco-elec", label: "CSCO Elective — choose one (3–4 credits)",
            courses: [
              { num: "CSCO 220",  name: "CCNA Enterprise Networking, Security, and Automation", note: "Recommended — use this instead of CSCO 105B" },
              { num: "CSCO 105B", name: "⚠️ Fundamentals of Voice and Data Cabling", status: "unavailable", note: "⚠️ No longer available for CIT students — ET degree only" },
            ],
          },
          {
            id: "group1", label: "Group Elective — Group 1: General Network Security (7 credits)",
            courses: [
              { num: "CIT 126",   name: "Cloud Computing Fundamentals" },
              { num: "CSEC 114B", name: "⚠️ Intro to Applied Network Forensics", status: "deactivated", note: "DEACTIVATED — no longer offered. Contact advisor about substitution." },
            ],
          },
          {
            id: "group2", label: "Group Elective — Group 2: Industrial Security (9 credits)",
            courses: [
              { num: "AIT 280",  name: "ICS & SCADA Communication Essentials" },
              { num: "AIT 281",  name: "ICS & SCADA Security Essentials" },
              { num: "MT 115B",  name: "Industrial & Materials Handling Automation" },
            ],
          },
        ],
        digitalLiteracy: [
          { num: "IS 100B", name: "Core Computing Competency (0 credits)" },
          { num: "IS 101",  name: "Introduction to Information Systems (3 credits)" },
        ],
        oldCatalogEquiv: [],
        // Which completed old-map courses carry over to the 2026-27 map:
        transfersToNew: {
          "CIT 112":   "✅ CIT 112 — Required core in 2026–27 map",
          "CIT 173":   "✅ CIT 173 — Required core in 2026–27 map",
          "CIT 217":   "✅ CIT 217 — Required core in 2026–27 map",
          "CIT 126":   "✅ CIT 126 — Required core in 2026–27 map",
          "CSCO 120":  "✅ CSCO 120 — Cisco elective track in 2026–27 map",
          "CSCO 121":  "✅ CSCO 121 — Cisco elective track in 2026–27 map",
          "CSCO 230B": "✅ CSCO 230 equivalent — Cisco elective track (3rd course slot) in 2026–27 map",
          "CSEC 281B": "✅ Equivalent to CIT 274 — satisfies Offensive Security track first course (CIT 274) in 2026–27 map. Note: CSEC 281B ≠ CSEC 281. To continue in OffSec track, you'd still need CSEC 181 then CSEC 281 (after C or higher in 181).",
          "CSEC 104B": "✅ CSEC 104B — Elective credit in 2026–27 map",
          "CSEC 114B": "✅ CSEC 114B — Elective credit in 2026–27 map (if completed before deactivation)",
          "CIT 129":   "✅ CIT 129 — Required core in 2026–27 map",
        },
      },
    },

    // ── Wizard data (old-map transition students) ─────────────────────────
    progressQuestion: "How many program credits have you completed (or are currently taking)?",
    progressOptions: [
      { value: "early", label: "0 – 12 credits",  sub: "Just getting started." },
      { value: "mid",   label: "13 – 24 credits", sub: "Core courses underway." },
      { value: "late",  label: "25+ credits",     sub: "Core complete — working through electives." },
    ],

    paths: {
      new2728: {
        early: { advisorNote: "Use the checklist mode for detailed tracking.", courses: [] },
        mid:   { advisorNote: "Use the checklist mode for detailed tracking.", courses: [] },
        late:  { advisorNote: "Use the checklist mode for detailed tracking.", courses: [] },
      },
      new: {
        early: { advisorNote: "Use the checklist mode for detailed tracking.", courses: [] },
        mid:   { advisorNote: "Use the checklist mode for detailed tracking.", courses: [] },
        late:  { advisorNote: "Use the checklist mode for detailed tracking.", courses: [] },
      },
      old: {
        early: {
          advisorNote: "⚠️ Transition Alert: Several courses on the old Network Security map are no longer available — CSEC 114B (deactivated) and CSCO 105B (now only offered for the ET degree). CSEC 290B will NOT be offered for Network Security students. Because you haven't completed many courses yet, strongly consider formally switching to the 2026–27 map. Meet with your advisor.",
          courses: [
            { num: "CIT 112",  name: "Network+",                       note: "Required on both old and new map — take this now" },
            { num: "CIT 173",  name: "Introduction to Linux (Linux+)", note: "Required on both old and new map — take this now" },
            { num: "CIT 217",  name: "Security+",                      note: "Still valid — counts as Security Elective on old map" },
            { num: "—",        name: "See your advisor before continuing", note: "Switching to the new map is strongly recommended." },
          ]
        },
        mid: {
          advisorNote: "⚠️ Transition Alert: (1) CSEC 290B — Network Security students must NOT enroll in it. (2) CSEC 114B is deactivated. (3) CSCO 105B is no longer available for CIT students. Contact your advisor about substitutions or switching to the new map.",
          courses: [
            { num: "CSCO 120",  name: "CCNA — Introduction to Networks",           note: "Required core — still offered" },
            { num: "CSCO 121",  name: "CCNA Switching, Routing, and Wireless",     note: "Required core — still offered" },
            { num: "CSCO 220",  name: "CCNA Enterprise Networking, Security & Auto", note: "Valid CSCO elective — use instead of CSCO 105B" },
            { num: "CIT 274",   name: "Ethical Hacking Essentials",                  note: "CIT 274 = CSEC 281B (same course, new number). If you completed CSEC 281B, you have CIT 274." },
            { num: "—",         name: "Do NOT enroll in CSEC 290B",                note: "Closed to Network Security students. Contact advisor about capstone substitution." },
            { num: "—",         name: "CSEC 181 + CSEC 281 path (optional)",       note: "Students may take CSEC 181 then CSEC 281 as a replacement path for CSEC 281B, but this adds credits. CSEC 281 requires CSEC 181 completed with C or higher." },
          ]
        },
        late: {
          advisorNote: "⚠️ Transition Alert: (1) Do NOT enroll in CSEC 290B — reserved for Forensics AAS only. (2) CSEC 114B is deactivated — substitution petition required. (3) CSCO 105B is no longer available for CIT students. Meet with your advisor immediately.",
          courses: [
            { num: "CIT 274",  name: "Ethical Hacking Essentials",                  note: "CIT 274 = CSEC 281B (same course, new number) — enroll if not yet completed" },
            { num: "CSCO 220", name: "CCNA Enterprise Networking, Security & Auto", note: "Valid CSCO elective in place of CSCO 105B" },
            { num: "—",        name: "Do NOT enroll in CSEC 290B",                 note: "Closed to Network Security students." },
            { num: "—",        name: "Contact advisor about CSEC 114B",            note: "Deactivated. A substitution petition may be required." },
          ]
        },
      }
    }
  }
};
