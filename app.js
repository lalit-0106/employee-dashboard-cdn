import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "https://esm.sh/react@18.3.1";
import { createRoot } from "https://esm.sh/react-dom@18.3.1/client";
import htm from "https://esm.sh/htm@3.1.1";
import {
  ResponsiveContainer,
  BarChart,
  ComposedChart,
  Bar,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell,
  LabelList,
} from "https://esm.sh/recharts@3.2.1?deps=react@18.3.1,react-dom@18.3.1";

const html = htm.bind(React.createElement);

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function createRng(seed = 42) {
  let state = seed >>> 0;
  return () => {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function createData() {
  const rng = createRng(42);
  const firstNames = [
    "Aakash",
    "Aarti",
    "Abdul",
    "Abhijay",
    "Abhijith",
    "Aditya",
    "Aisha",
    "Akanksha",
    "Akhil",
    "Aman",
    "Amrita",
    "Ananya",
    "Ankit",
    "Arjun",
    "Bhavna",
    "Deepak",
    "Disha",
    "Faizan",
    "Harsha",
    "Ishita",
    "Karan",
    "Komal",
    "Manasa",
    "Mehul",
    "Nandini",
    "Neeraj",
    "Nikhil",
    "Pooja",
    "Priya",
    "Rahul",
    "Rakesh",
    "Renu",
    "Ritika",
    "Sahil",
    "Sakshi",
    "Sameer",
    "Sandeep",
    "Sanjana",
    "Shreya",
    "Sneha",
    "Suraj",
    "Tanvi",
    "Varun",
    "Vikram",
    "Yash",
  ];
  const lastNames = [
    "Gilotra",
    "Parsi",
    "Patidar",
    "Kuneddy",
    "Ponnapally",
    "Rao",
    "Sharma",
    "Patel",
    "Menon",
    "Krishnan",
    "Iyer",
    "Khan",
    "Singh",
    "Verma",
    "Nair",
    "Chowdary",
    "Mishra",
    "Jain",
    "Bose",
    "Ghosh",
  ];
  const grades = ["G1", "G2", "G3", "G4", "G5", "M1", "M2", "M3", "M4"];
  const gradeWeights = [0.07, 0.14, 0.17, 0.16, 0.14, 0.12, 0.1, 0.07, 0.03];

  const accountProfiles = {
    "Agile One-2 Invoicing Testing Bug Fixes": {
      projects: ["Agility-2", "Smart Invoicing"],
      practices: ["Project Management", "QA Automation", "Platform Engineering"],
      billableRatio: 0.78,
      weight: 1.35,
    },
    "SwitchFX Technologies": {
      projects: ["SwitchFxTech", "Payments Hub"],
      practices: [".Net", "Platform Engineering", "Cloud"],
      billableRatio: 0.75,
      weight: 1.25,
    },
    Lovelytics: {
      projects: ["Data Lake Migration", "Analytics Modernization"],
      practices: ["Data Science", "Cloud", "Business Analysis"],
      billableRatio: 0.74,
      weight: 1.15,
    },
    "Novus Home Mortgage": {
      projects: ["Digital Mortgage 1.5", "Home Lending Core"],
      practices: ["Platform Engineering", ".Net", "Business Analysis"],
      billableRatio: 0.72,
      weight: 1.1,
    },
    RENFROE: {
      projects: ["Renfroe", "Ops Excellence"],
      practices: ["Platform Engineering", ".Net"],
      billableRatio: 0.7,
      weight: 1.0,
    },
    KForce: {
      projects: ["KForce Connect", "Staffing Insights"],
      practices: ["Project Management", "Business Analysis", "Cloud"],
      billableRatio: 0.69,
      weight: 0.96,
    },
    "BigBear AI-1": {
      projects: ["AI Forecasting", "Mission Platform"],
      practices: ["Data Science", "Cloud", "Platform Engineering"],
      billableRatio: 0.77,
      weight: 0.9,
    },
    "CCS Intervention Operations, LLC": {
      projects: ["CCS Platform", "Intervention Ops"],
      practices: ["Platform Engineering", "QA Automation", ".Net"],
      billableRatio: 0.68,
      weight: 0.9,
    },
    Pronto: {
      projects: ["Mobile Service App", "Pronto Web"],
      practices: [".Net", "Platform Engineering", "Project Management"],
      billableRatio: 0.71,
      weight: 0.86,
    },
    Halo: {
      projects: ["FourGen/Informix 4GL", "Halo Prime"],
      practices: ["Project Management", "Business Analysis", ".Net"],
      billableRatio: 0.66,
      weight: 0.8,
    },
  };

  const accounts = Object.keys(accountProfiles);
  const accountWeights = accounts.map((name) => accountProfiles[name].weight);

  const allNames = [];
  for (let i = 0; i < firstNames.length; i += 1) {
    for (let j = 0; j < lastNames.length; j += 1) {
      allNames.push(`${firstNames[i]} ${lastNames[j]}`);
    }
  }
  for (let i = allNames.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [allNames[i], allNames[j]] = [allNames[j], allNames[i]];
  }

  const sampleWeighted = (values, weights) => {
    const total = weights.reduce((sum, val) => sum + val, 0);
    const r = rng() * total;
    let run = 0;
    for (let i = 0; i < values.length; i += 1) {
      run += weights[i];
      if (r <= run) return values[i];
    }
    return values[values.length - 1];
  };

  const rows = [];
  const employeeCount = 5000;
  for (let index = 0; index < employeeCount; index += 1) {
    const baseName = allNames[index % allNames.length];
    const cohort = Math.floor(index / allNames.length) + 1;
    const employeeName = cohort === 1 ? baseName : `${baseName} ${cohort}`;
    const primaryAccount = sampleWeighted(accounts, accountWeights);
    const profile = accountProfiles[primaryAccount];
    const grade = sampleWeighted(grades, gradeWeights);
    const practice = profile.practices[Math.floor(rng() * profile.practices.length)];
    const allocationCount = sampleWeighted([1, 2, 3, 4], [0.5, 0.3, 0.15, 0.05]);
    const used = new Set();

    for (let n = 0; n < allocationCount; n += 1) {
      const accountName =
        n === 0 || rng() < 0.78
          ? primaryAccount
          : sampleWeighted(accounts, accountWeights);
      const accProfile = accountProfiles[accountName];
      const projectName =
        accProfile.projects[Math.floor(rng() * accProfile.projects.length)];
      const pair = `${accountName}|${projectName}`;
      if (used.has(pair)) continue;
      used.add(pair);

      let billable = rng() < accProfile.billableRatio;
      if (n > 0 && rng() < 0.22) billable = false;
      let allocationCategory = "Billable";
      if (!billable) {
        allocationCategory = rng() < 0.62 ? "Mandatory Shadow" : "Optional Shadow";
      }
      const billableHours = billable
        ? Math.floor(rng() * 8) + 1
        : 0;

      rows.push({
        employeeName,
        accountName,
        projectName,
        grade,
        practice,
        engagementType:
          hashString(`${employeeName}|${accountName}|${projectName}`) % 100 < 18
            ? "Internal"
            : "Client",
        allocationCategory,
        billableHours,
        accountUrl: `https://example.com/accounts/${slugify(accountName)}`,
        projectUrl: `https://example.com/projects/${slugify(projectName)}`,
      });
    }
  }
  return rows;
}

const DATA = createData();

const KPI_BG = ["#e5e7eb", "#84cc16", "#65a30d", "#9ca3af", "#6b7280", "#f3f4f6"];
const CHART_COLORS = {
  billable: "#0EA5A5",
  mandatoryShadow: "#F97316",
  optionalShadow: "#6366F1",
};
const UTIL_BIN_SIZE = 10;
const MIN_DAILY_BILLABLE_HOURS = 1;
const MAX_DAILY_BILLABLE_HOURS = 8;
const STACK_CATEGORIES = ["Billable", "Mandatory Shadow", "Optional Shadow"];
const SHADOW_CATEGORIES = ["Mandatory Shadow", "Optional Shadow"];
const CATEGORY_TO_KEY = {
  Billable: "billable",
  "Mandatory Shadow": "mandatoryShadow",
  "Optional Shadow": "optionalShadow",
};
const TREND_MONTHS = [
  "Apr 2025",
  "May 2025",
  "Jun 2025",
  "Jul 2025",
  "Aug 2025",
  "Sep 2025",
  "Oct 2025",
  "Nov 2025",
  "Dec 2025",
  "Jan 2026",
  "Feb 2026",
  "Mar 2026",
];

function pairKey(dimension, category) {
  return `${dimension}||${category}`;
}

function applyPairFilter(rows, pairs, dimensionKey) {
  if (!pairs.length) return rows;
  const set = new Set(pairs);
  return rows.filter((row) =>
    set.has(pairKey(row[dimensionKey], row.allocationCategory)),
  );
}

function buildStackedDistribution(rows, key, categories = []) {
  const map = new Map();
  const buildDefault = (name) => ({
    name,
    billable: 0,
    mandatoryShadow: 0,
    optionalShadow: 0,
    shadow: 0,
    total: 0,
  });

  for (const category of categories) {
    map.set(category, buildDefault(category));
  }
  for (const row of rows) {
    const group = row[key];
    if (!map.has(group)) {
      map.set(group, buildDefault(group));
    }
    const item = map.get(group);
    if (row.allocationCategory === "Billable") item.billable += 1;
    if (row.allocationCategory === "Mandatory Shadow") item.mandatoryShadow += 1;
    if (row.allocationCategory === "Optional Shadow") item.optionalShadow += 1;
    if (SHADOW_CATEGORIES.includes(row.allocationCategory)) item.shadow += 1;
    item.total += 1;
  }
  // Keep a stable axis order (Power BI-style feel): categories do not reshuffle on every filter.
  if (categories.length) {
    return [...map.values()];
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
}

function applyPracticeGradeFilters(
  rows,
  selectedPractices,
  selectedGrades,
) {
  let result = rows;
  if (selectedPractices.length) {
    const set = new Set(selectedPractices);
    result = result.filter((row) => set.has(row.practice));
  }
  if (selectedGrades.length) {
    const set = new Set(selectedGrades);
    result = result.filter((row) => set.has(row.grade));
  }
  return result;
}

function applyEmployeeFilter(rows, selectedEmployeesSet) {
  if (!selectedEmployeesSet || selectedEmployeesSet.size === 0) return rows;
  return rows.filter((row) => selectedEmployeesSet.has(row.employeeName));
}

function getUtilBinLabel(pct) {
  const bounded = Math.max(0, Math.min(100, pct));
  const start = bounded === 100
    ? 100 - UTIL_BIN_SIZE
    : Math.floor(bounded / UTIL_BIN_SIZE) * UTIL_BIN_SIZE;
  return `${start}-${start + UTIL_BIN_SIZE}%`;
}

function getHoursBinLabel(hours) {
  const bounded = Math.max(
    MIN_DAILY_BILLABLE_HOURS,
    Math.min(MAX_DAILY_BILLABLE_HOURS, Number(hours)),
  );
  const start = bounded >= MAX_DAILY_BILLABLE_HOURS
    ? MAX_DAILY_BILLABLE_HOURS - 1
    : Math.floor(bounded);
  return `${start}-${start + 1}`;
}

function hashString(value) {
  let h = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    h ^= value.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  return Math.abs(h >>> 0);
}

function getVisibleCategoriesForScope(scope) {
  if (scope === "Billable") return ["Billable"];
  if (scope === "Shadow") return [...SHADOW_CATEGORIES];
  if (scope === "Mandatory Shadow") return ["Mandatory Shadow"];
  if (scope === "Optional Shadow") return ["Optional Shadow"];
  return [...STACK_CATEGORIES];
}

function createAllocationTrend(rows, filters = {}) {
  const {
    engagementType = "All",
    practices = [],
    grades = [],
  } = filters;
  const trend = TREND_MONTHS.map((month) => ({
    month,
    billableResources: 0,
    shadowResources: 0,
  }));
  const billableByMonth = TREND_MONTHS.map(() => new Set());
  const shadowByMonth = TREND_MONTHS.map(() => new Set());

  for (const row of rows) {
    if (engagementType !== "All" && row.engagementType !== engagementType) continue;
    if (practices.length && !practices.includes(row.practice)) continue;
    if (grades.length && !grades.includes(row.grade)) continue;

    const seed = hashString(`${row.employeeName}|${row.accountName}|${row.projectName}`);
    const monthIndex = seed % TREND_MONTHS.length;
    if (row.allocationCategory === "Billable") {
      billableByMonth[monthIndex].add(row.employeeName);
    } else if (SHADOW_CATEGORIES.includes(row.allocationCategory)) {
      shadowByMonth[monthIndex].add(row.employeeName);
    }
  }

  for (let i = 0; i < trend.length; i += 1) {
    trend[i].billableResources = billableByMonth[i].size;
    trend[i].shadowResources = shadowByMonth[i].size;
  }
  return trend;
}

function createTalentPoolTrend(rows, filters = {}) {
  const {
    engagementType = "All",
    practices = [],
    grades = [],
  } = filters;
  const trend = TREND_MONTHS.map((month) => ({
    month,
    talentPoolEmployees: 0,
    totalEmployees: 0,
    talentPoolPct: 0,
    avgTalentPoolPct: 0,
  }));
  const employeeMonthStats = TREND_MONTHS.map(() => new Map());

  for (const row of rows) {
    if (engagementType !== "All" && row.engagementType !== engagementType) continue;
    if (practices.length && !practices.includes(row.practice)) continue;
    if (grades.length && !grades.includes(row.grade)) continue;

    const monthIndex = hashString(`${row.employeeName}|${row.accountName}|${row.projectName}`)
      % TREND_MONTHS.length;
    const byEmployee = employeeMonthStats[monthIndex];
    if (!byEmployee.has(row.employeeName)) {
      byEmployee.set(row.employeeName, { billable: 0, total: 0 });
    }
    const employee = byEmployee.get(row.employeeName);
    employee.total += 1;
    if (row.allocationCategory === "Billable") employee.billable += 1;
  }

  for (let i = 0; i < trend.length; i += 1) {
    const byEmployee = employeeMonthStats[i];
    let totalEmployees = 0;
    let talentPoolEmployees = 0;
    let sumTalentPoolPct = 0;

    for (const employee of byEmployee.values()) {
      totalEmployees += 1;
      const utilizationPct = employee.total ? (employee.billable / employee.total) * 100 : 0;
      const talentPoolPct = Math.max(0, 100 - utilizationPct);
      sumTalentPoolPct += talentPoolPct;
      if (talentPoolPct > 0) talentPoolEmployees += 1;
    }

    trend[i].totalEmployees = totalEmployees;
    trend[i].talentPoolEmployees = talentPoolEmployees;
    trend[i].talentPoolPct = totalEmployees ? (talentPoolEmployees / totalEmployees) * 100 : 0;
    trend[i].avgTalentPoolPct = totalEmployees ? sumTalentPoolPct / totalEmployees : 0;
  }

  return trend;
}

function buildUtilizationEmployeeStats(rows) {
  const totals = new Map();
  for (const row of rows) {
    if (!totals.has(row.employeeName)) {
      totals.set(row.employeeName, {
        billable: 0,
        total: 0,
        billableHoursTotal: 0,
        billableHoursCount: 0,
      });
    }
    const item = totals.get(row.employeeName);
    item.total += 1;
    if (row.allocationCategory === "Billable") {
      item.billable += 1;
      item.billableHoursTotal += Number(row.billableHours || 0);
      item.billableHoursCount += 1;
    }
  }

  const stats = new Map();
  for (const [employeeName, item] of totals.entries()) {
    const pct = item.total ? (item.billable / item.total) * 100 : 0;
    const talentPoolPct = Math.max(0, 100 - pct);
    const billableHours = item.billableHoursCount
      ? item.billableHoursTotal / item.billableHoursCount
      : MIN_DAILY_BILLABLE_HOURS;
    stats.set(employeeName, {
      utilizationPct: pct,
      talentPoolPct,
      billableHours,
      utilizationBin: getUtilBinLabel(pct),
      talentPoolBin: getUtilBinLabel(talentPoolPct),
      hoursBin: getHoursBinLabel(billableHours),
    });
  }
  return stats;
}

function AxisTick(props) {
  const { x, y, payload, onAxisClick, isSelected } = props;
  return html`
    <g transform=${`translate(${x},${y})`}>
      <text
        x=${-8}
        y=${4}
        textAnchor="end"
        className=${`axis-text ${isSelected ? "axis-text-selected" : ""}`}
        onClick=${() => onAxisClick(payload.value)}
      >
        ${payload.value}
        <title>${payload.value}</title>
      </text>
    </g>
  `;
}

function HoursAxisTick(props) {
  const { x, y, payload, onAxisClick, isSelected } = props;
  return html`
    <g transform=${`translate(${x},${y})`}>
      <text
        x=${0}
        y=${0}
        dy=${12}
        textAnchor="end"
        transform="rotate(-45)"
        className=${`axis-text ${isSelected ? "axis-text-selected" : ""}`}
        onClick=${() => onAxisClick && onAxisClick(payload.value)}
        style=${{ cursor: onAxisClick ? "pointer" : "default", fontSize: "11px" }}
      >
        ${payload.value}
      </text>
    </g>
  `;
}

function SegmentValueLabel(props) {
  const { x = 0, y = 0, width = 0, height = 0, value, visible = true } = props;
  if (!visible) return null;
  const num = Number(value);
  if (!Number.isFinite(num) || num === 0) return null;
  // Keep labels clear and consistent:
  // - show only when the segment is wide enough
  // - always center inside the segment
  if (width < 18) return null;

  const tx = x + width / 2;
  const ty = y + height / 2 + 4;
  const fontSize = width < 30 ? 12 : 16;

  return html`
    <text
      x=${tx}
      y=${ty}
      textAnchor="middle"
      fill="#ffffff"
      stroke="#0f172a"
      strokeWidth="1.6"
      paintOrder="stroke"
      strokeLinejoin="round"
      fontSize=${String(fontSize)}
      fontWeight="700"
      pointerEvents="none"
    >
      ${num}
    </text>
  `;
}

function CountTooltip(props) {
  const { active, payload, label } = props;
  if (!active || !payload || !payload.length) return null;
  const first = payload.find((item) => item.dataKey === "count") || payload[0];
  const value = Number(first?.value ?? 0);

  return html`
    <div
      style=${{
        borderRadius: "10px",
        border: "1px solid #d7dee8",
        boxShadow: "0 10px 20px rgba(15,23,42,0.12)",
        background: "#ffffff",
        padding: "8px 10px",
      }}
    >
      <div style=${{ color: "#1f2937", fontWeight: "700", marginBottom: "4px" }}>${label}</div>
      <div style=${{ color: "#2563eb", fontWeight: "700" }}>
        Count: ${Number.isFinite(value) ? value.toLocaleString() : "0"} employees
      </div>
    </div>
  `;
}

function MultiSelectDropdown({
  options,
  selectedValues,
  onChange,
  placeholder,
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const rootRef = useRef(null);

  useEffect(() => {
    const handleDocClick = (event) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleDocClick);
    return () => document.removeEventListener("mousedown", handleDocClick);
  }, []);

  const filteredOptions = useMemo(() => {
    if (!search.trim()) return options;
    const q = search.trim().toLowerCase();
    return options.filter((item) => item.toLowerCase().includes(q));
  }, [options, search]);

  const summary = useMemo(() => {
    if (!selectedValues.length) return placeholder;
    if (selectedValues.length <= 2) return selectedValues.join(", ");
    return `${selectedValues.length} selected`;
  }, [selectedValues, placeholder]);

  const allSelected = selectedValues.length === options.length && options.length > 0;

  const toggleValue = (value) => {
    const set = new Set(selectedValues);
    if (set.has(value)) set.delete(value);
    else set.add(value);
    onChange([...set]);
  };

  const selectAll = () => {
    onChange([...options]);
  };

  const clearAll = () => {
    onChange([]);
  };

  return html`
    <div className="multi-wrap" ref=${rootRef}>
      <button className="multi-trigger" type="button" onClick=${() => setOpen(!open)}>
        <span>${summary}</span>
        <span className="multi-caret">${open ? "^" : "v"}</span>
      </button>
      ${open
        ? html`
            <div className="multi-panel">
              <div className="multi-actions">
                <button
                  className="multi-action-btn"
                  type="button"
                  onClick=${selectAll}
                  disabled=${allSelected}
                >
                  Select All
                </button>
                <button
                  className="multi-action-btn"
                  type="button"
                  onClick=${clearAll}
                  disabled=${selectedValues.length === 0}
                >
                  Clear All
                </button>
              </div>
              <input
                className="multi-search"
                type="text"
                value=${search}
                placeholder="Search..."
                onChange=${(event) => setSearch(event.target.value)}
              />
              <div className="multi-options">
                ${filteredOptions.length
                  ? filteredOptions.map(
                      (item) => html`
                        <label className="multi-option" key=${item}>
                          <input
                            type="checkbox"
                            checked=${selectedValues.includes(item)}
                            onChange=${() => toggleValue(item)}
                          />
                          <span>${item}</span>
                        </label>
                      `,
                    )
                  : html`<div className="multi-empty">No matches</div>`}
              </div>
            </div>
          `
        : null}
    </div>
  `;
}

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [scope, setScope] = useState("Billable & Shadow");
  const [analyzeBy, setAnalyzeBy] = useState("Accounts");
  const [selectedValues, setSelectedValues] = useState([]);
  const [chartPairs, setChartPairs] = useState([]);
  const [selectedPractices, setSelectedPractices] = useState([]);
  const [selectedGrades, setSelectedGrades] = useState([]);
  const [selectedUtilBins, setSelectedUtilBins] = useState([]);
  const [selectedBillableHourBins, setSelectedBillableHourBins] = useState([]);
  const [utilMetric, setUtilMetric] = useState("utilization");
  const [drilledAccountFilter, setDrilledAccountFilter] = useState([]);
  const [drillSnapshot, setDrillSnapshot] = useState(null);
  const [trendEngagementType, setTrendEngagementType] = useState("All");
  const [trendPractices, setTrendPractices] = useState([]);
  const [trendGrades, setTrendGrades] = useState([]);
  const [tpTrendEngagementType, setTpTrendEngagementType] = useState("All");
  const [tpTrendPractices, setTpTrendPractices] = useState([]);
  const [tpTrendGrades, setTpTrendGrades] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [hint, setHint] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  const dimensionKey = analyzeBy === "Accounts" ? "accountName" : "projectName";
  const dimensionLabel = analyzeBy === "Accounts" ? "Account Name" : "Project Name";

  const allAccounts = useMemo(() => {
    const set = new Set(DATA.map((row) => row.accountName));
    return [...set].sort((a, b) => a.localeCompare(b));
  }, []);

  const allProjects = useMemo(() => {
    const set = new Set(DATA.map((row) => row.projectName));
    return [...set].sort((a, b) => a.localeCompare(b));
  }, []);

  const defaultDimensionOptions = useMemo(
    () => (analyzeBy === "Accounts" ? allAccounts : allProjects),
    [analyzeBy, allAccounts, allProjects],
  );

  const dimensionOptionsBaseRows = useMemo(() => {
    let rows = DATA;
    if (analyzeBy === "Projects" && drilledAccountFilter.length) {
      const accountSet = new Set(drilledAccountFilter);
      rows = rows.filter((row) => accountSet.has(row.accountName));
    }
    const visibleCategories = new Set(getVisibleCategoriesForScope(scope));
    rows = rows.filter((row) => visibleCategories.has(row.allocationCategory));

    rows = applyPairFilter(rows, chartPairs, dimensionKey);
    rows = applyPracticeGradeFilters(rows, selectedPractices, selectedGrades);

    const stats = buildUtilizationEmployeeStats(rows);
    if (selectedUtilBins.length) {
      const binSet = new Set(selectedUtilBins);
      const employees = new Set();
      for (const [employeeName, stat] of stats.entries()) {
        const metricBin = utilMetric === "talent_pool" ? stat.talentPoolBin : stat.utilizationBin;
        if (binSet.has(metricBin)) employees.add(employeeName);
      }
      rows = applyEmployeeFilter(rows, employees);
    }
    if (selectedBillableHourBins.length) {
      const binSet = new Set(selectedBillableHourBins);
      const employees = new Set();
      for (const [employeeName, stat] of stats.entries()) {
        if (binSet.has(stat.hoursBin)) employees.add(employeeName);
      }
      rows = applyEmployeeFilter(rows, employees);
    }

    return rows;
  }, [
    analyzeBy,
    drilledAccountFilter,
    scope,
    chartPairs,
    dimensionKey,
    selectedPractices,
    selectedGrades,
    selectedUtilBins,
    selectedBillableHourBins,
    utilMetric,
  ]);

  const dimensionOptions = useMemo(() => {
    const set = new Set(dimensionOptionsBaseRows.map((row) => row[dimensionKey]));
    return [...set].sort((a, b) => a.localeCompare(b));
  }, [dimensionOptionsBaseRows, dimensionKey]);

  const allPractices = useMemo(() => {
    const set = new Set(DATA.map((row) => row.practice));
    return [...set].sort((a, b) => a.localeCompare(b));
  }, []);

  const allGrades = useMemo(() => {
    const set = new Set(DATA.map((row) => row.grade));
    return [...set].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  }, []);

  const trendRowsByEngagement = useMemo(() => {
    if (trendEngagementType === "All") return DATA;
    return DATA.filter((row) => row.engagementType === trendEngagementType);
  }, [trendEngagementType]);

  const trendPracticeOptions = useMemo(() => {
    const set = new Set(trendRowsByEngagement.map((row) => row.practice));
    return [...set].sort((a, b) => a.localeCompare(b));
  }, [trendRowsByEngagement]);

  const trendGradeOptions = useMemo(() => {
    const set = new Set(trendRowsByEngagement.map((row) => row.grade));
    return [...set].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  }, [trendRowsByEngagement]);

  const trendData = useMemo(
    () =>
      createAllocationTrend(DATA, {
        engagementType: trendEngagementType,
        practices: trendPractices,
        grades: trendGrades,
      }),
    [trendEngagementType, trendPractices, trendGrades],
  );

  const tpTrendRowsByEngagement = useMemo(() => {
    if (tpTrendEngagementType === "All") return DATA;
    return DATA.filter((row) => row.engagementType === tpTrendEngagementType);
  }, [tpTrendEngagementType]);

  const tpTrendPracticeOptions = useMemo(() => {
    const set = new Set(tpTrendRowsByEngagement.map((row) => row.practice));
    return [...set].sort((a, b) => a.localeCompare(b));
  }, [tpTrendRowsByEngagement]);

  const tpTrendGradeOptions = useMemo(() => {
    const set = new Set(tpTrendRowsByEngagement.map((row) => row.grade));
    return [...set].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  }, [tpTrendRowsByEngagement]);

  const tpTrendData = useMemo(
    () =>
      createTalentPoolTrend(DATA, {
        engagementType: tpTrendEngagementType,
        practices: tpTrendPractices,
        grades: tpTrendGrades,
      }),
    [tpTrendEngagementType, tpTrendPractices, tpTrendGrades],
  );

  const dropdownFiltered = useMemo(() => {
    let rows = DATA;
    if (analyzeBy === "Projects" && drilledAccountFilter.length) {
      const accountSet = new Set(drilledAccountFilter);
      rows = rows.filter((row) => accountSet.has(row.accountName));
    }
    if (!selectedValues.length) return rows;
    const set = new Set(selectedValues);
    return rows.filter((row) => set.has(row[dimensionKey]));
  }, [selectedValues, dimensionKey, analyzeBy, drilledAccountFilter]);

  const scopeFiltered = useMemo(() => {
    const visibleCategories = new Set(getVisibleCategoriesForScope(scope));
    return dropdownFiltered.filter((row) => visibleCategories.has(row.allocationCategory));
  }, [dropdownFiltered, scope]);

  const kpiBasePreSide = useMemo(
    () => applyPairFilter(dropdownFiltered, chartPairs, dimensionKey),
    [dropdownFiltered, chartPairs, dimensionKey],
  );

  const tableBasePreSide = useMemo(
    () => applyPairFilter(scopeFiltered, chartPairs, dimensionKey),
    [scopeFiltered, chartPairs, dimensionKey],
  );

  const scopeFilteredBySidePreUtil = useMemo(
    () => applyPracticeGradeFilters(scopeFiltered, selectedPractices, selectedGrades),
    [scopeFiltered, selectedPractices, selectedGrades],
  );

  const kpiBasePreUtil = useMemo(
    () => applyPracticeGradeFilters(kpiBasePreSide, selectedPractices, selectedGrades),
    [kpiBasePreSide, selectedPractices, selectedGrades],
  );

  const tableBasePreUtil = useMemo(
    () => applyPracticeGradeFilters(tableBasePreSide, selectedPractices, selectedGrades),
    [tableBasePreSide, selectedPractices, selectedGrades],
  );

  const selectedPairSet = useMemo(() => new Set(chartPairs), [chartPairs]);
  const selectedPracticeSet = useMemo(() => new Set(selectedPractices), [selectedPractices]);
  const selectedGradeSet = useMemo(() => new Set(selectedGrades), [selectedGrades]);
  const selectedUtilBinSet = useMemo(() => new Set(selectedUtilBins), [selectedUtilBins]);
  const selectedBillableHourBinSet = useMemo(
    () => new Set(selectedBillableHourBins),
    [selectedBillableHourBins],
  );

  const baseEmployeeStats = useMemo(
    () => buildUtilizationEmployeeStats(tableBasePreUtil),
    [tableBasePreUtil],
  );

  const selectedUtilEmployeesSet = useMemo(() => {
    if (!selectedUtilBins.length) return null;
    const set = new Set();
    for (const [employeeName, stat] of baseEmployeeStats.entries()) {
      const metricBin = utilMetric === "talent_pool" ? stat.talentPoolBin : stat.utilizationBin;
      if (selectedUtilBinSet.has(metricBin)) set.add(employeeName);
    }
    return set;
  }, [baseEmployeeStats, selectedUtilBins, selectedUtilBinSet, utilMetric]);

  const selectedBillableHoursEmployeesSet = useMemo(() => {
    if (!selectedBillableHourBins.length) return null;
    const set = new Set();
    for (const [employeeName, stat] of baseEmployeeStats.entries()) {
      if (selectedBillableHourBinSet.has(stat.hoursBin)) set.add(employeeName);
    }
    return set;
  }, [baseEmployeeStats, selectedBillableHourBins, selectedBillableHourBinSet]);

  const selectedMetricEmployeesSet = useMemo(() => {
    if (!selectedUtilEmployeesSet && !selectedBillableHoursEmployeesSet) return null;
    if (!selectedUtilEmployeesSet) return selectedBillableHoursEmployeesSet;
    if (!selectedBillableHoursEmployeesSet) return selectedUtilEmployeesSet;
    const intersect = new Set();
    for (const employeeName of selectedUtilEmployeesSet) {
      if (selectedBillableHoursEmployeesSet.has(employeeName)) intersect.add(employeeName);
    }
    return intersect;
  }, [selectedUtilEmployeesSet, selectedBillableHoursEmployeesSet]);

  const scopeFilteredBySide = useMemo(
    () => applyEmployeeFilter(scopeFilteredBySidePreUtil, selectedMetricEmployeesSet),
    [scopeFilteredBySidePreUtil, selectedMetricEmployeesSet],
  );

  const kpiBase = useMemo(
    () => applyEmployeeFilter(kpiBasePreUtil, selectedMetricEmployeesSet),
    [kpiBasePreUtil, selectedMetricEmployeesSet],
  );

  const tableBase = useMemo(
    () => applyEmployeeFilter(tableBasePreUtil, selectedMetricEmployeesSet),
    [tableBasePreUtil, selectedMetricEmployeesSet],
  );

  const practiceChartRows = useMemo(
    () => applyEmployeeFilter(tableBasePreUtil, selectedMetricEmployeesSet),
    [tableBasePreUtil, selectedMetricEmployeesSet],
  );

  const gradeChartRows = useMemo(
    () => applyEmployeeFilter(tableBasePreUtil, selectedMetricEmployeesSet),
    [tableBasePreUtil, selectedMetricEmployeesSet],
  );

  const tableRows = useMemo(() => {
    if (!searchText.trim()) return tableBase;
    const q = searchText.trim().toLowerCase();
    return tableBase.filter((row) =>
      [
        row.employeeName,
        row.accountName,
        row.projectName,
        row.grade,
        row.practice,
        row.allocationCategory,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [tableBase, searchText]);

  const chartCategories = useMemo(() => {
    if (selectedValues.length) return selectedValues;
    // Keep a fixed axis order so selected bars do not jump/reorder on cross-filter interactions.
    return defaultDimensionOptions;
  }, [selectedValues, defaultDimensionOptions]);

  const chartData = useMemo(
    () => buildStackedDistribution(scopeFilteredBySide, dimensionKey, chartCategories),
    [scopeFilteredBySide, dimensionKey, chartCategories],
  );

  const selectedNameSet = useMemo(() => {
    const set = new Set();
    for (const row of chartData) {
      const hasSelected = STACK_CATEGORIES.some((category) =>
        selectedPairSet.has(pairKey(row.name, category)),
      );
      if (hasSelected) set.add(row.name);
    }
    return set;
  }, [chartData, selectedPairSet]);

  const drillDownAccounts = useMemo(() => {
    if (analyzeBy !== "Accounts") return [];
    const visibleAccountSet = new Set(chartData.map((row) => row.name));
    const set = new Set();
    for (const name of selectedValues) {
      if (visibleAccountSet.has(name)) set.add(name);
    }
    for (const name of selectedNameSet) {
      if (visibleAccountSet.has(name)) set.add(name);
    }
    return [...set].sort((a, b) => a.localeCompare(b));
  }, [analyzeBy, selectedValues, selectedNameSet, chartData]);

  const kpis = useMemo(() => {
    const uniqueEmployees = new Set(kpiBase.map((row) => row.employeeName));
    const billableRows = kpiBase.filter((row) => row.allocationCategory === "Billable");
    const shadowRows = kpiBase.filter((row) => SHADOW_CATEGORIES.includes(row.allocationCategory));
    const billableHC = new Set(billableRows.map((row) => row.employeeName));
    const shadowHC = new Set(shadowRows.map((row) => row.employeeName));
    const totalAlloc = billableRows.length + shadowRows.length;
    const billablePct = totalAlloc ? (billableRows.length / totalAlloc) * 100 : 0;

    return [
      { label: "Total Employees", value: uniqueEmployees.size.toLocaleString() },
      { label: "Billable HC", value: billableHC.size.toLocaleString() },
      { label: "Billable Allocations", value: billableRows.length.toLocaleString() },
      { label: "Shadow HC", value: shadowHC.size.toLocaleString() },
      { label: "Shadow Allocations", value: shadowRows.length.toLocaleString() },
      { label: "% Billable", value: `${billablePct.toFixed(1)}%` },
    ];
  }, [kpiBase]);

  const displayEmployeeStats = useMemo(
    () => buildUtilizationEmployeeStats(tableBase),
    [tableBase],
  );

  const utilizationBins = useMemo(() => {
    const labels = Array.from({ length: 100 / UTIL_BIN_SIZE }, (_, index) => {
      const start = index * UTIL_BIN_SIZE;
      const end = start + UTIL_BIN_SIZE;
      return {
        key: index,
        bin: `${start}-${end}%`,
        count: 0,
      };
    });

    const idxByBin = new Map(labels.map((item, idx) => [item.bin, idx]));
    for (const stat of displayEmployeeStats.values()) {
      const metricBin = utilMetric === "talent_pool" ? stat.talentPoolBin : stat.utilizationBin;
      const idx = idxByBin.get(metricBin);
      if (idx !== undefined) labels[idx].count += 1;
    }

    return labels;
  }, [displayEmployeeStats, utilMetric]);

  const billableHoursBins = useMemo(() => {
    const labels = Array.from(
      { length: MAX_DAILY_BILLABLE_HOURS - MIN_DAILY_BILLABLE_HOURS },
      (_, index) => {
        const start = MIN_DAILY_BILLABLE_HOURS + index;
        const end = start + 1;
        return {
          key: `${start}-${end}`,
          bin: `${start}-${end}`,
          count: 0,
        };
      },
    );

    const idxByBin = new Map(labels.map((item, idx) => [item.bin, idx]));
    for (const stat of displayEmployeeStats.values()) {
      const idx = idxByBin.get(stat.hoursBin);
      if (idx !== undefined) labels[idx].count += 1;
    }
    return labels;
  }, [displayEmployeeStats]);

  const billableHoursAvg = useMemo(() => {
    if (!displayEmployeeStats.size) return 0;
    let sum = 0;
    for (const stat of displayEmployeeStats.values()) {
      sum += stat.billableHours;
    }
    return sum / displayEmployeeStats.size;
  }, [displayEmployeeStats]);

  const utilizationEmployeeCount = useMemo(
    () => new Set(tableBase.map((row) => row.employeeName)).size,
    [tableBase],
  );

  const avgUtilizationPct = useMemo(() => {
    if (!displayEmployeeStats.size) return 0;
    let totalPct = 0;
    for (const stat of displayEmployeeStats.values()) {
      totalPct += stat.utilizationPct;
    }
    return totalPct / displayEmployeeStats.size;
  }, [displayEmployeeStats]);

  const practiceData = useMemo(
    () => buildStackedDistribution(practiceChartRows, "practice", allPractices),
    [practiceChartRows, allPractices],
  );
  const gradeData = useMemo(
    () => buildStackedDistribution(gradeChartRows, "grade", allGrades),
    [gradeChartRows, allGrades],
  );
  const visibleCategorySet = useMemo(
    () => new Set(getVisibleCategoriesForScope(scope)),
    [scope],
  );

  const mainAxisWidth = useMemo(() => {
    const maxLen = chartData.reduce((max, item) => Math.max(max, item.name.length), 0);
    return Math.max(260, Math.min(520, maxLen * 8));
  }, [chartData]);

  const practiceAxisWidth = useMemo(() => {
    const maxLen = practiceData.reduce((max, item) => Math.max(max, item.name.length), 0);
    return Math.max(140, Math.min(250, maxLen * 8));
  }, [practiceData]);

  const gradeAxisWidth = useMemo(() => {
    const maxLen = gradeData.reduce((max, item) => Math.max(max, item.name.length), 0);
    return Math.max(90, Math.min(180, maxLen * 8));
  }, [gradeData]);

  const mainChartHeight = useMemo(() => Math.max(340, chartData.length * 30), [chartData.length]);
  const practiceChartHeight = useMemo(
    () => Math.max(220, practiceData.length * 26),
    [practiceData.length],
  );
  const gradeChartHeight = useMemo(() => Math.max(220, gradeData.length * 26), [gradeData.length]);

  useEffect(() => {
    const validPairs = new Set(
      scopeFilteredBySide.map((row) => pairKey(row[dimensionKey], row.allocationCategory)),
    );
    setChartPairs((prev) => prev.filter((item) => validPairs.has(item)));
  }, [scopeFilteredBySide, dimensionKey]);

  useEffect(() => {
    const valid = new Set(tableBasePreSide.map((row) => row.practice));
    setSelectedPractices((prev) => prev.filter((item) => valid.has(item)));
  }, [tableBasePreSide]);

  useEffect(() => {
    const valid = new Set(tableBasePreSide.map((row) => row.grade));
    setSelectedGrades((prev) => prev.filter((item) => valid.has(item)));
  }, [tableBasePreSide]);

  useEffect(() => {
    const valid = new Set(utilizationBins.map((item) => item.bin));
    setSelectedUtilBins((prev) => prev.filter((item) => valid.has(item)));
  }, [utilizationBins]);

  useEffect(() => {
    const valid = new Set(billableHoursBins.map((item) => item.bin));
    setSelectedBillableHourBins((prev) => prev.filter((item) => valid.has(item)));
  }, [billableHoursBins]);

  useEffect(() => {
    const valid = new Set(dimensionOptions);
    setSelectedValues((prev) => {
      const next = prev.filter((item) => valid.has(item));
      if (next.length === prev.length && next.every((item, idx) => item === prev[idx])) {
        return prev;
      }
      return next;
    });
  }, [dimensionOptions]);

  useEffect(() => {
    const valid = new Set(trendPracticeOptions);
    setTrendPractices((prev) => prev.filter((item) => valid.has(item)));
  }, [trendPracticeOptions]);

  useEffect(() => {
    const valid = new Set(trendGradeOptions);
    setTrendGrades((prev) => prev.filter((item) => valid.has(item)));
  }, [trendGradeOptions]);

  useEffect(() => {
    const valid = new Set(tpTrendPracticeOptions);
    setTpTrendPractices((prev) => prev.filter((item) => valid.has(item)));
  }, [tpTrendPracticeOptions]);

  useEffect(() => {
    const valid = new Set(tpTrendGradeOptions);
    setTpTrendGrades((prev) => prev.filter((item) => valid.has(item)));
  }, [tpTrendGradeOptions]);

  useEffect(() => {
    setPage(1);
  }, [
    tableRows.length,
    pageSize,
    searchText,
    analyzeBy,
    scope,
    selectedValues.join("|"),
    chartPairs.join("|"),
    selectedPractices.join("|"),
    selectedGrades.join("|"),
    selectedUtilBins.join("|"),
    selectedBillableHourBins.join("|"),
    utilMetric,
  ]);

  const pagedRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return tableRows.slice(start, start + pageSize);
  }, [tableRows, page, pageSize]);

  const totalPages = Math.max(1, Math.ceil(tableRows.length / pageSize));

  const setNameFilter = (mode, value) => {
    setAnalyzeBy(mode);
    setSelectedValues([value]);
    setChartPairs([]);
    setHint(`Selected ${mode === "Accounts" ? "Account" : "Project"}: ${value}`);
  };

  const handleAxisClick = (name) => {
    const row = chartData.find((item) => item.name === name);
    if (!row) return;
    const visibleCategories = getVisibleCategoriesForScope(scope);
    const namePairs = visibleCategories
      .filter((category) => row[CATEGORY_TO_KEY[category]] > 0)
      .map((category) => pairKey(name, category));

    setChartPairs((prev) => {
      const set = new Set(prev);
      const allSelected = namePairs.every((item) => set.has(item));
      if (allSelected) {
        namePairs.forEach((item) => set.delete(item));
      } else {
        namePairs.forEach((item) => set.add(item));
      }
      return [...set];
    });
    setHint(
      `Toggled ${analyzeBy === "Accounts" ? "Account" : "Project"}: ${name}`,
    );
  };

  const handleBarClick = (name, category) => {
    const key = pairKey(name, category);
    setChartPairs((prev) => {
      const set = new Set(prev);
      if (set.has(key)) set.delete(key);
      else set.add(key);
      return [...set];
    });
    setHint(`Toggled ${name} - ${category}`);
  };

  const handlePracticeAxisClick = (name) => {
    setSelectedPractices((prev) => {
      const set = new Set(prev);
      if (set.has(name)) set.delete(name);
      else set.add(name);
      return [...set];
    });
    setHint(`Toggled Practice: ${name}`);
  };

  const handleGradeAxisClick = (name) => {
    setSelectedGrades((prev) => {
      const set = new Set(prev);
      if (set.has(name)) set.delete(name);
      else set.add(name);
      return [...set];
    });
    setHint(`Toggled Grade: ${name}`);
  };

  const handlePracticeBarClick = (name, category) => {
    setSelectedPractices((prev) => {
      const set = new Set(prev);
      if (set.has(name)) set.delete(name);
      else set.add(name);
      return [...set];
    });
    setHint(`Toggled Practice: ${name} - ${category}`);
  };

  const handleGradeBarClick = (name, category) => {
    setSelectedGrades((prev) => {
      const set = new Set(prev);
      if (set.has(name)) set.delete(name);
      else set.add(name);
      return [...set];
    });
    setHint(`Toggled Grade: ${name} - ${category}`);
  };

  const handleUtilBarClick = (bin) => {
    setSelectedUtilBins((prev) => {
      const set = new Set(prev);
      if (set.has(bin)) set.delete(bin);
      else set.add(bin);
      return [...set];
    });
    setHint(
      `Toggled ${utilMetric === "talent_pool" ? "Talent Pool" : "Utilization"} Bin: ${bin}`,
    );
  };

  const handleUtilAxisClick = (bin) => {
    handleUtilBarClick(bin);
  };

  const handleBillableHoursBarClick = (bin) => {
    setSelectedBillableHourBins((prev) => {
      const set = new Set(prev);
      if (set.has(bin)) set.delete(bin);
      else set.add(bin);
      return [...set];
    });
    setHint(`Toggled Billable Hours Bin: ${bin}`);
  };

  const handleBillableHoursAxisClick = (bin) => {
    setSelectedBillableHourBins((prev) => {
      const set = new Set(prev);
      if (set.has(bin)) set.delete(bin);
      else set.add(bin);
      return [...set];
    });
    setHint(`Toggled Billable Hours Bin: ${bin}`);
  };

  const getCellStyle = (name, category, baseColor) => {
    if (!chartPairs.length) {
      return {
        fill: baseColor,
        opacity: 1,
        stroke: "transparent",
        strokeWidth: 0,
      };
    }
    const selected = selectedPairSet.has(pairKey(name, category));
    return {
      fill: baseColor,
      opacity: selected ? 1 : 0.22,
      stroke: selected ? "#0f172a" : "transparent",
      strokeWidth: selected ? 1.2 : 0,
    };
  };

  const getLabelRowName = (labelProps, rows) => {
    const direct = labelProps?.payload?.name;
    if (direct) return direct;
    const nested = labelProps?.payload?.payload?.name;
    if (nested) return nested;
    const rawIndex = labelProps?.index ?? labelProps?.dataIndex ?? labelProps?.payload?.index;
    const idx = Number(rawIndex);
    if (Number.isFinite(idx) && idx >= 0 && idx < rows.length) {
      return rows[idx]?.name;
    }
    return null;
  };

  const onAnalyzeByChange = (event) => {
    const value = event.target.value;
    setAnalyzeBy(value);
    setSelectedValues([]);
    setChartPairs([]);
    setDrilledAccountFilter([]);
    setDrillSnapshot(null);
    setHint("");
  };

  const onScopeChange = (event) => {
    setScope(event.target.value);
  };

  const onUtilMetricChange = (nextMetric) => {
    setUtilMetric(nextMetric);
    setSelectedUtilBins([]);
  };

  const onDimensionValuesChange = (values) => {
    setSelectedValues(values);
    setChartPairs([]);
    if (!values.length) setHint("");
  };

  const handleDrillDownToProjects = () => {
    if (analyzeBy !== "Accounts") return;
    if (!drillDownAccounts.length) {
      setHint("Select one or more accounts in the chart, then click Drill Down.");
      return;
    }

    setDrillSnapshot({
      analyzeBy,
      selectedValues: [...selectedValues],
      chartPairs: [...chartPairs],
      drilledAccountFilter: [...drilledAccountFilter],
    });
    setAnalyzeBy("Projects");
    setDrilledAccountFilter([...drillDownAccounts]);
    setSelectedValues([]);
    setChartPairs([]);
    setHint(
      `Drilled down to Projects for ${drillDownAccounts.length} account(s): ${drillDownAccounts.join(", ")}`,
    );
  };

  const handleDrillUpToAccounts = () => {
    if (analyzeBy !== "Projects" || !drillSnapshot) return;
    setAnalyzeBy(drillSnapshot.analyzeBy || "Accounts");
    setDrilledAccountFilter(drillSnapshot.drilledAccountFilter || []);
    setSelectedValues(drillSnapshot.selectedValues || []);
    setChartPairs(drillSnapshot.chartPairs || []);
    setHint("Drilled up to previous account selection context.");
    setDrillSnapshot(null);
  };

  const clearTrendFilters = () => {
    setTrendEngagementType("All");
    setTrendPractices([]);
    setTrendGrades([]);
  };

  const clearTpTrendFilters = () => {
    setTpTrendEngagementType("All");
    setTpTrendPractices([]);
    setTpTrendGrades([]);
  };

  const clearChartSelection = () => {
    setChartPairs([]);
    setSelectedPractices([]);
    setSelectedGrades([]);
    setSelectedUtilBins([]);
    setSelectedBillableHourBins([]);
    setDrilledAccountFilter([]);
    setDrillSnapshot(null);
    setHint("");
  };

  return html`
    <div>
      <h1 className="title">Allocation Distribution</h1>
      <div className="subtitle">
        Employee Dashboard - Account/Project-wise billable and shadow insights
      </div>
      <section className="panel tab-nav">
        <button
          className=${`tab-btn ${activeTab === "dashboard" ? "active" : ""}`}
          onClick=${() => setActiveTab("dashboard")}
        >
          Dashboard
        </button>
        <button
          className=${`tab-btn ${activeTab === "trend" ? "active" : ""}`}
          onClick=${() => setActiveTab("trend")}
        >
          Allocation Trend
        </button>
        <button
          className=${`tab-btn ${activeTab === "tp_trend" ? "active" : ""}`}
          onClick=${() => setActiveTab("tp_trend")}
        >
          TP Trend
        </button>
      </section>

      <div style=${{ display: activeTab === "dashboard" ? "block" : "none" }}>
      <section className="panel control-panel">
        <div className="field">
          <label>Scope</label>
          <select value=${scope} onChange=${onScopeChange}>
            <option>Billable & Shadow</option>
            <option>Billable</option>
            <option>Shadow</option>
            <option>Mandatory Shadow</option>
            <option>Optional Shadow</option>
          </select>
        </div>
        <div className="field">
          <label>Analyze By</label>
          <select value=${analyzeBy} onChange=${onAnalyzeByChange}>
            <option>Accounts</option>
            <option>Projects</option>
          </select>
        </div>
        <div className="field">
          <label>${analyzeBy}</label>
          <${MultiSelectDropdown}
            options=${dimensionOptions}
            selectedValues=${selectedValues}
            onChange=${onDimensionValuesChange}
            placeholder=${`Select one or more ${analyzeBy.toLowerCase()}`}
          />
        </div>
        <button className="btn" onClick=${clearChartSelection}>Clear Chart Selection</button>
      </section>

      ${hint ? html`<div className="hint">${hint}</div>` : null}

      <section className="kpi-grid">
        ${kpis.map(
          (item, idx) => html`
            <div className="kpi-card" style=${{ background: KPI_BG[idx] }} key=${item.label}>
              <div className="kpi-value">${item.value}</div>
              <div className="kpi-label">${item.label}</div>
            </div>
          `,
        )}
      </section>

      <section className="charts-grid">
        <div className="charts-left">
          <section className="panel chart-wrap">
            <div className="chart-head">
              <h2 className="section-title">Account - Project Wise</h2>
              ${analyzeBy === "Accounts"
                ? html`
                    <button
                      className="btn chart-drill-btn"
                      onClick=${handleDrillDownToProjects}
                      disabled=${drillDownAccounts.length === 0}
                      title="Drill Down to Projects"
                      aria-label="Drill Down to Projects"
                    >
                      <span className="drill-icon" aria-hidden="true">↓</span>
                    </button>
                  `
                : analyzeBy === "Projects" && !!drillSnapshot
                  ? html`
                      <button
                        className="btn chart-drill-btn"
                        onClick=${handleDrillUpToAccounts}
                        title="Drill Up to Accounts"
                        aria-label="Drill Up to Accounts"
                      >
                        <span className="drill-icon" aria-hidden="true">↑</span>
                      </button>
                    `
                  : null}
            </div>
            <div className="chart-sub">${dimensionLabel} text on Y-axis is clickable</div>
            <div className="chart-scroll" style=${{ maxHeight: "420px" }}>
              <div style=${{ width: "100%", height: `${mainChartHeight}px` }}>
                <${ResponsiveContainer} width="100%" height="100%">
                <${BarChart}
                  layout="vertical"
                  data=${chartData}
                  margin=${{ top: 10, right: 24, left: 10, bottom: 10 }}
                >
                  <${CartesianGrid} strokeDasharray="3 3" stroke="#e5e7eb" />
                  <${XAxis} type="number" />
                  <${YAxis}
                    type="category"
                    dataKey="name"
                    width=${mainAxisWidth}
                    interval=${0}
                    tick=${(props) =>
                      html`<${AxisTick}
                        ...${props}
                        onAxisClick=${handleAxisClick}
                        isSelected=${selectedNameSet.has(props.payload?.value)}
                      />`}
                  />
                  <${Tooltip}
                    cursor=${false}
                    contentStyle=${{
                      borderRadius: "10px",
                      border: "1px solid #d7dee8",
                      boxShadow: "0 10px 20px rgba(15,23,42,0.12)",
                    }}
                  />
                  <${Legend} />
                  ${visibleCategorySet.has("Billable")
                    ? html`
                        <${Bar}
                          dataKey="billable"
                          name="Billable"
                          stackId="alloc"
                          fill=${CHART_COLORS.billable}
                        >
                          <${LabelList}
                            dataKey="billable"
                            content=${(props) => {
                              const rowName = getLabelRowName(props, chartData);
                              return html`<${SegmentValueLabel}
                                ...${props}
                                visible=${!chartPairs.length || !rowName || selectedNameSet.has(rowName)}
                              />`;
                            }}
                          />
                          ${chartData.map(
                            (row) =>
                              html`<${Cell}
                                key=${`billable-${row.name}`}
                                cursor="pointer"
                                ...${getCellStyle(row.name, "Billable", CHART_COLORS.billable)}
                                onClick=${() => handleBarClick(row.name, "Billable")}
                              />`,
                          )}
                        </${Bar}>
                      `
                    : null}
                  ${visibleCategorySet.has("Mandatory Shadow")
                    ? html`
                        <${Bar}
                          dataKey="mandatoryShadow"
                          name="Mandatory Shadow"
                          stackId="alloc"
                          fill=${CHART_COLORS.mandatoryShadow}
                        >
                          <${LabelList}
                            dataKey="mandatoryShadow"
                            content=${(props) => {
                              const rowName = getLabelRowName(props, chartData);
                              return html`<${SegmentValueLabel}
                                ...${props}
                                visible=${!chartPairs.length || !rowName || selectedNameSet.has(rowName)}
                              />`;
                            }}
                          />
                          ${chartData.map(
                            (row) =>
                              html`<${Cell}
                                key=${`mandatory-shadow-${row.name}`}
                                cursor="pointer"
                                ...${getCellStyle(
                                  row.name,
                                  "Mandatory Shadow",
                                  CHART_COLORS.mandatoryShadow,
                                )}
                                onClick=${() => handleBarClick(row.name, "Mandatory Shadow")}
                              />`,
                          )}
                        </${Bar}>
                      `
                    : null}
                  ${visibleCategorySet.has("Optional Shadow")
                    ? html`
                        <${Bar}
                          dataKey="optionalShadow"
                          name="Optional Shadow"
                          stackId="alloc"
                          fill=${CHART_COLORS.optionalShadow}
                        >
                          <${LabelList}
                            dataKey="optionalShadow"
                            content=${(props) => {
                              const rowName = getLabelRowName(props, chartData);
                              return html`<${SegmentValueLabel}
                                ...${props}
                                visible=${!chartPairs.length || !rowName || selectedNameSet.has(rowName)}
                              />`;
                            }}
                          />
                          ${chartData.map(
                            (row) =>
                              html`<${Cell}
                                key=${`optional-shadow-${row.name}`}
                                cursor="pointer"
                                ...${getCellStyle(
                                  row.name,
                                  "Optional Shadow",
                                  CHART_COLORS.optionalShadow,
                                )}
                                onClick=${() => handleBarClick(row.name, "Optional Shadow")}
                              />`,
                          )}
                        </${Bar}>
                      `
                    : null}
                </${BarChart}>
                </${ResponsiveContainer}>
              </div>
            </div>
          </section>

          <section className="panel util-wrap">
            <div className="util-charts">
              <div className="util-chart-primary">
                <h4 className="mini-title">
                  Utilization Distribution | Avg ${avgUtilizationPct.toFixed(1)}%
                </h4>
                <div style=${{ width: "100%", height: "260px" }}>
                  <${ResponsiveContainer} width="100%" height="100%">
                    <${ComposedChart}
                      data=${utilizationBins}
                      margin=${{ top: 30, right: 10, left: 10, bottom: 45 }}
                    >
                      <${CartesianGrid} strokeDasharray="3 3" stroke="#e5e7eb" />
                      <${XAxis}
                        dataKey="bin"
                        interval=${0}
                        tick=${(props) =>
                          html`<${HoursAxisTick}
                            ...${props}
                            isSelected=${false}
                          />`}
                      />
                      <${YAxis} allowDecimals=${false} />
                      <${Tooltip}
                        content=${(props) => html`<${CountTooltip} ...${props} />`}
                      />
                      <${Legend} verticalAlign="top" align="right" wrapperStyle=${{ top: 0, right: 10 }} />
                      <${Bar}
                        dataKey="count"
                        name="Employees"
                        fill="#2563eb"
                        radius=${[8, 8, 0, 0]}
                        isAnimationActive=${true}
                        animationDuration=${800}
                        animationEasing="ease-in-out"
                      >
                        <${LabelList} dataKey="count" position="top" fill="#334155" />
                        ${utilizationBins.map(
                          (item) =>
                            html`<${Cell}
                              key=${`util-${item.bin}`}
                              cursor="default"
                              fill=${item.count ? "#2563eb" : "#cbd5e1"}
                              opacity=${1}
                              stroke="transparent"
                              strokeWidth=${0}
                            />`,
                        )}
                      </${Bar}>
                    </${ComposedChart}>
                  </${ResponsiveContainer}>
                </div>
              </div>
              <div className="util-chart-secondary">
                <h4 className="mini-title">
                  Billable Hours Distribution | Avg ${billableHoursAvg.toFixed(1)}h
                </h4>
                <div style=${{ width: "100%", height: "260px" }}>
                  <${ResponsiveContainer} width="100%" height="100%">
                    <${ComposedChart}
                      data=${billableHoursBins}
                      margin=${{ top: 30, right: 10, left: 10, bottom: 45 }}
                    >
                      <${CartesianGrid} strokeDasharray="3 3" stroke="#e5e7eb" />
                      <${XAxis}
                        dataKey="bin"
                        interval=${0}
                        tick=${(props) =>
                          html`<${HoursAxisTick}
                            ...${props}
                            isSelected=${false}
                          />`}
                      />
                      <${YAxis} allowDecimals=${false} />
                      <${Tooltip}
                        content=${(props) => html`<${CountTooltip} ...${props} />`}
                      />
                      <${Legend} verticalAlign="top" align="right" wrapperStyle=${{ top: 0, right: 10 }} />
                      <${Bar}
                        dataKey="count"
                        name="Employees"
                        fill="#4F46E5"
                        radius=${[8, 8, 0, 0]}
                        isAnimationActive=${true}
                        animationDuration=${800}
                        animationEasing="ease-in-out"
                      >
                        <${LabelList} dataKey="count" position="top" fill="#334155" />
                        ${billableHoursBins.map(
                          (item) =>
                            html`<${Cell}
                              key=${`hours-${item.bin}`}
                              cursor="default"
                              fill=${item.count ? "#4F46E5" : "#cbd5e1"}
                              opacity=${1}
                              stroke="transparent"
                              strokeWidth=${0}
                            />`,
                        )}
                      </${Bar}>
                    </${ComposedChart}>
                  </${ResponsiveContainer}>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="charts-right">
          <section className="panel side-chart-wrap">
            <h3 className="side-title">Practice Wise</h3>
            <div className="chart-scroll" style=${{ maxHeight: "250px" }}>
              <div style=${{ width: "100%", height: `${practiceChartHeight}px` }}>
                <${ResponsiveContainer} width="100%" height="100%">
                <${BarChart}
                  layout="vertical"
                  data=${practiceData}
                  margin=${{ top: 10, right: 12, left: 8, bottom: 4 }}
                >
                  <${CartesianGrid} strokeDasharray="3 3" stroke="#e5e7eb" />
                  <${XAxis} type="number" />
                  <${YAxis}
                    type="category"
                    dataKey="name"
                    width=${practiceAxisWidth}
                    interval=${0}
                    tick=${(props) =>
                      html`<${AxisTick}
                        ...${props}
                        onAxisClick=${handlePracticeAxisClick}
                        isSelected=${selectedPracticeSet.has(props.payload?.value)}
                      />`}
                  />
                  <${Tooltip}
                    cursor=${false}
                    contentStyle=${{
                      borderRadius: "10px",
                      border: "1px solid #d7dee8",
                      boxShadow: "0 10px 20px rgba(15,23,42,0.12)",
                    }}
                  />
                  ${visibleCategorySet.has("Billable")
                    ? html`<${Bar} dataKey="billable" stackId="alloc" name="Billable" fill=${CHART_COLORS.billable}>
                    <${LabelList}
                      dataKey="billable"
                      content=${(props) => {
                        const rowName = getLabelRowName(props, practiceData);
                        return html`<${SegmentValueLabel}
                          ...${props}
                          visible=${!selectedPractices.length || !rowName || selectedPracticeSet.has(rowName)}
                        />`;
                      }}
                    />
                    ${practiceData.map(
                      (row) =>
                        html`<${Cell}
                          key=${`practice-billable-${row.name}`}
                          cursor="pointer"
                          fill=${CHART_COLORS.billable}
                          opacity=${selectedPractices.length
                            ? selectedPracticeSet.has(row.name)
                              ? 1
                              : 0.22
                            : 1}
                          stroke=${selectedPracticeSet.has(row.name) ? "#0f172a" : "transparent"}
                          strokeWidth=${selectedPracticeSet.has(row.name) ? 1.2 : 0}
                          onClick=${() => handlePracticeBarClick(row.name, "Billable")}
                        />`,
                    )}
                  </${Bar}>`
                    : null}
                  ${visibleCategorySet.has("Mandatory Shadow")
                    ? html`<${Bar}
                      dataKey="mandatoryShadow"
                      stackId="alloc"
                      name="Mandatory Shadow"
                      fill=${CHART_COLORS.mandatoryShadow}
                    >
                    <${LabelList}
                      dataKey="mandatoryShadow"
                      content=${(props) => {
                        const rowName = getLabelRowName(props, practiceData);
                        return html`<${SegmentValueLabel}
                          ...${props}
                          visible=${!selectedPractices.length || !rowName || selectedPracticeSet.has(rowName)}
                        />`;
                      }}
                    />
                    ${practiceData.map(
                      (row) =>
                        html`<${Cell}
                          key=${`practice-mandatory-shadow-${row.name}`}
                          cursor="pointer"
                          fill=${CHART_COLORS.mandatoryShadow}
                          opacity=${selectedPractices.length
                            ? selectedPracticeSet.has(row.name)
                              ? 1
                              : 0.22
                            : 1}
                          stroke=${selectedPracticeSet.has(row.name) ? "#0f172a" : "transparent"}
                          strokeWidth=${selectedPracticeSet.has(row.name) ? 1.2 : 0}
                          onClick=${() => handlePracticeBarClick(row.name, "Mandatory Shadow")}
                        />`,
                    )}
                  </${Bar}>`
                    : null}
                  ${visibleCategorySet.has("Optional Shadow")
                    ? html`<${Bar}
                      dataKey="optionalShadow"
                      stackId="alloc"
                      name="Optional Shadow"
                      fill=${CHART_COLORS.optionalShadow}
                    >
                    <${LabelList}
                      dataKey="optionalShadow"
                      content=${(props) => {
                        const rowName = getLabelRowName(props, practiceData);
                        return html`<${SegmentValueLabel}
                          ...${props}
                          visible=${!selectedPractices.length || !rowName || selectedPracticeSet.has(rowName)}
                        />`;
                      }}
                    />
                    ${practiceData.map(
                      (row) =>
                        html`<${Cell}
                          key=${`practice-optional-shadow-${row.name}`}
                          cursor="pointer"
                          fill=${CHART_COLORS.optionalShadow}
                          opacity=${selectedPractices.length
                            ? selectedPracticeSet.has(row.name)
                              ? 1
                              : 0.22
                            : 1}
                          stroke=${selectedPracticeSet.has(row.name) ? "#0f172a" : "transparent"}
                          strokeWidth=${selectedPracticeSet.has(row.name) ? 1.2 : 0}
                          onClick=${() => handlePracticeBarClick(row.name, "Optional Shadow")}
                        />`,
                    )}
                  </${Bar}>`
                    : null}
                </${BarChart}>
                </${ResponsiveContainer}>
              </div>
            </div>
          </section>

          <section className="panel side-chart-wrap">
            <h3 className="side-title">Grade Wise</h3>
            <div className="chart-scroll" style=${{ maxHeight: "250px" }}>
              <div style=${{ width: "100%", height: `${gradeChartHeight}px` }}>
                <${ResponsiveContainer} width="100%" height="100%">
                <${BarChart}
                  layout="vertical"
                  data=${gradeData}
                  margin=${{ top: 10, right: 12, left: 8, bottom: 4 }}
                >
                  <${CartesianGrid} strokeDasharray="3 3" stroke="#e5e7eb" />
                  <${XAxis} type="number" />
                  <${YAxis}
                    type="category"
                    dataKey="name"
                    width=${gradeAxisWidth}
                    interval=${0}
                    tick=${(props) =>
                      html`<${AxisTick}
                        ...${props}
                        onAxisClick=${handleGradeAxisClick}
                        isSelected=${selectedGradeSet.has(props.payload?.value)}
                      />`}
                  />
                  <${Tooltip}
                    cursor=${false}
                    contentStyle=${{
                      borderRadius: "10px",
                      border: "1px solid #d7dee8",
                      boxShadow: "0 10px 20px rgba(15,23,42,0.12)",
                    }}
                  />
                  ${visibleCategorySet.has("Billable")
                    ? html`<${Bar} dataKey="billable" stackId="alloc" name="Billable" fill=${CHART_COLORS.billable}>
                    <${LabelList}
                      dataKey="billable"
                      content=${(props) => {
                        const rowName = getLabelRowName(props, gradeData);
                        return html`<${SegmentValueLabel}
                          ...${props}
                          visible=${!selectedGrades.length || !rowName || selectedGradeSet.has(rowName)}
                        />`;
                      }}
                    />
                    ${gradeData.map(
                      (row) =>
                        html`<${Cell}
                          key=${`grade-billable-${row.name}`}
                          cursor="pointer"
                          fill=${CHART_COLORS.billable}
                          opacity=${selectedGrades.length
                            ? selectedGradeSet.has(row.name)
                              ? 1
                              : 0.22
                            : 1}
                          stroke=${selectedGradeSet.has(row.name) ? "#0f172a" : "transparent"}
                          strokeWidth=${selectedGradeSet.has(row.name) ? 1.2 : 0}
                          onClick=${() => handleGradeBarClick(row.name, "Billable")}
                        />`,
                    )}
                  </${Bar}>`
                    : null}
                  ${visibleCategorySet.has("Mandatory Shadow")
                    ? html`<${Bar}
                      dataKey="mandatoryShadow"
                      stackId="alloc"
                      name="Mandatory Shadow"
                      fill=${CHART_COLORS.mandatoryShadow}
                    >
                    <${LabelList}
                      dataKey="mandatoryShadow"
                      content=${(props) => {
                        const rowName = getLabelRowName(props, gradeData);
                        return html`<${SegmentValueLabel}
                          ...${props}
                          visible=${!selectedGrades.length || !rowName || selectedGradeSet.has(rowName)}
                        />`;
                      }}
                    />
                    ${gradeData.map(
                      (row) =>
                        html`<${Cell}
                          key=${`grade-mandatory-shadow-${row.name}`}
                          cursor="pointer"
                          fill=${CHART_COLORS.mandatoryShadow}
                          opacity=${selectedGrades.length
                            ? selectedGradeSet.has(row.name)
                              ? 1
                              : 0.22
                            : 1}
                          stroke=${selectedGradeSet.has(row.name) ? "#0f172a" : "transparent"}
                          strokeWidth=${selectedGradeSet.has(row.name) ? 1.2 : 0}
                          onClick=${() => handleGradeBarClick(row.name, "Mandatory Shadow")}
                        />`,
                    )}
                  </${Bar}>`
                    : null}
                  ${visibleCategorySet.has("Optional Shadow")
                    ? html`<${Bar}
                      dataKey="optionalShadow"
                      stackId="alloc"
                      name="Optional Shadow"
                      fill=${CHART_COLORS.optionalShadow}
                    >
                    <${LabelList}
                      dataKey="optionalShadow"
                      content=${(props) => {
                        const rowName = getLabelRowName(props, gradeData);
                        return html`<${SegmentValueLabel}
                          ...${props}
                          visible=${!selectedGrades.length || !rowName || selectedGradeSet.has(rowName)}
                        />`;
                      }}
                    />
                    ${gradeData.map(
                      (row) =>
                        html`<${Cell}
                          key=${`grade-optional-shadow-${row.name}`}
                          cursor="pointer"
                          fill=${CHART_COLORS.optionalShadow}
                          opacity=${selectedGrades.length
                            ? selectedGradeSet.has(row.name)
                              ? 1
                              : 0.22
                            : 1}
                          stroke=${selectedGradeSet.has(row.name) ? "#0f172a" : "transparent"}
                          strokeWidth=${selectedGradeSet.has(row.name) ? 1.2 : 0}
                          onClick=${() => handleGradeBarClick(row.name, "Optional Shadow")}
                        />`,
                    )}
                  </${Bar}>`
                    : null}
                </${BarChart}>
                </${ResponsiveContainer}>
              </div>
            </div>
          </section>
        </div>
      </section>

      <section className="panel search-panel">
        <label>Search Employees</label>
        <input
          type="text"
          placeholder="Type any substring"
          value=${searchText}
          onChange=${(event) => setSearchText(event.target.value)}
        />
      </section>

      <section className="panel table-panel">
        <div className="table-head">
          <h2 className="table-title">Employees In Selected</h2>
          <div className="table-meta">
            Showing ${tableRows.length.toLocaleString()} row(s) | Analyze By: ${analyzeBy} |
            Grouped on ${dimensionLabel}
          </div>
        </div>
        <div className="table-shell">
          <table>
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Account Name</th>
                <th>Project Name</th>
                <th>Grade</th>
                <th>Practice</th>
                <th>Allocation Category</th>
                <th>Utilization %</th>
                <th>Billable Hours</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows.length
                ? pagedRows.map(
                    (row, idx) => {
                      const stat = displayEmployeeStats.get(row.employeeName);
                      const utilizationPct = stat ? stat.utilizationPct : 0;
                      return html`
                      <tr key=${`${row.employeeName}-${row.projectName}-${idx}`}>
                        <td>${row.employeeName}</td>
                        <td>
                          <button
                            className="row-link"
                            onClick=${() => setNameFilter("Accounts", row.accountName)}
                          >
                            ${row.accountName}
                          </button>
                          <a
                            className="open-anchor"
                            href=${row.accountUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Open
                          </a>
                        </td>
                        <td>
                          <button
                            className="row-link"
                            onClick=${() => setNameFilter("Projects", row.projectName)}
                          >
                            ${row.projectName}
                          </button>
                          <a
                            className="open-anchor"
                            href=${row.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Open
                          </a>
                        </td>
                        <td>${row.grade}</td>
                        <td>${row.practice}</td>
                        <td>${row.allocationCategory}</td>
                        <td>${utilizationPct.toFixed(1)}%</td>
                        <td>${Number(row.billableHours || 0).toFixed(1)}h</td>
                      </tr>
                    `;
                    },
                  )
                : html`<tr><td className="empty" colspan="8">No rows match current filters.</td></tr>`}
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <div className="pager-left">
            <span>Rows per page</span>
            <select
              value=${String(pageSize)}
              onChange=${(event) => setPageSize(Number(event.target.value))}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
          <div className="pager-right">
            <button
              className="btn"
              disabled=${page <= 1}
              onClick=${() => setPage(Math.max(1, page - 1))}
            >
              Prev
            </button>
            <span>Page ${page} of ${totalPages}</span>
            <button
              className="btn"
              disabled=${page >= totalPages}
              onClick=${() => setPage(Math.min(totalPages, page + 1))}
            >
              Next
            </button>
          </div>
        </div>
      </section>

      </div>

      <div style=${{ display: activeTab === "trend" ? "block" : "none" }}>
        <section className="panel trend-panel">
          <div className="trend-head">
            <h2 className="section-title">Allocation Trend</h2>
            <div className="trend-meta">Independent monthly trend view</div>
          </div>
          <div className="trend-sub">
            This chart is independent from dashboard cross-filters and shows monthly billable vs
            shadow resource trends.
          </div>
          <section className="trend-filters">
            <div className="field">
              <label>Engagement Type</label>
              <select
                value=${trendEngagementType}
                onChange=${(event) => setTrendEngagementType(event.target.value)}
              >
                <option value="All">All</option>
                <option value="Client">Client</option>
                <option value="Internal">Internal</option>
              </select>
            </div>
            <div className="field">
              <label>Practice</label>
              <${MultiSelectDropdown}
                options=${trendPracticeOptions}
                selectedValues=${trendPractices}
                onChange=${(values) => setTrendPractices(values)}
                placeholder="Select one or more practices"
              />
            </div>
            <div className="field">
              <label>Grade</label>
              <${MultiSelectDropdown}
                options=${trendGradeOptions}
                selectedValues=${trendGrades}
                onChange=${(values) => setTrendGrades(values)}
                placeholder="Select one or more grades"
              />
            </div>
            <button className="btn" onClick=${clearTrendFilters}>Reset Trend Filters</button>
          </section>
          <div className="trend-chart-shell">
            <div style=${{ width: "100%", height: "430px" }}>
              <${ResponsiveContainer} width="100%" height="100%">
                <${ComposedChart}
                  data=${trendData}
                  margin=${{ top: 14, right: 24, left: 8, bottom: 14 }}
                >
                  <${CartesianGrid} strokeDasharray="3 3" stroke="#e5e7eb" />
                  <${XAxis} dataKey="month" />
                  <${YAxis} allowDecimals=${false} />
                  <${Tooltip}
                    content=${(props) => {
                      const { active, payload, label } = props;
                      if (!active || !payload || !payload.length) return null;
                      const billable =
                        payload.find((item) => item.dataKey === "billableResources")?.value ?? 0;
                      const shadow =
                        payload.find((item) => item.dataKey === "shadowResources")?.value ?? 0;
                      return html`
                        <div className="trend-tooltip">
                          <div className="trend-tooltip-label">${label}</div>
                          <div className="trend-tooltip-item">
                            Billable Resources: ${Number(billable).toLocaleString()}
                          </div>
                          <div className="trend-tooltip-item">
                            Shadow Resources: ${Number(shadow).toLocaleString()}
                          </div>
                        </div>
                      `;
                    }}
                  />
                  <${Legend} />
                  <${Line}
                    type="monotone"
                    dataKey="billableResources"
                    name="Billable Resources"
                    stroke="#0ea5a5"
                    strokeWidth=${3}
                    isAnimationActive=${true}
                    animationDuration=${900}
                    animationEasing="ease-in-out"
                    dot=${{ r: 3, fill: "#0ea5a5" }}
                    activeDot=${{ r: 5 }}
                  />
                  <${Line}
                    type="monotone"
                    dataKey="shadowResources"
                    name="Shadow Resources"
                    stroke="#F97316"
                    strokeWidth=${2}
                    isAnimationActive=${true}
                    animationDuration=${900}
                    animationEasing="ease-in-out"
                    dot=${{ r: 3, fill: "#F97316" }}
                    activeDot=${{ r: 5 }}
                  />
                </${ComposedChart}>
              </${ResponsiveContainer}>
            </div>
          </div>
        </section>
      </div>

      <div style=${{ display: activeTab === "tp_trend" ? "block" : "none" }}>
        <section className="panel trend-panel">
          <div className="trend-head">
            <h2 className="section-title">TP Trend</h2>
            <div className="trend-meta">Independent monthly talent pool view</div>
          </div>
          <div className="trend-sub">
            Track month-wise talent pool headcount and percentage with independent filters.
          </div>
          <section className="trend-filters">
            <div className="field">
              <label>Engagement Type</label>
              <select
                value=${tpTrendEngagementType}
                onChange=${(event) => setTpTrendEngagementType(event.target.value)}
              >
                <option value="All">All</option>
                <option value="Client">Client</option>
                <option value="Internal">Internal</option>
              </select>
            </div>
            <div className="field">
              <label>Practice</label>
              <${MultiSelectDropdown}
                options=${tpTrendPracticeOptions}
                selectedValues=${tpTrendPractices}
                onChange=${(values) => setTpTrendPractices(values)}
                placeholder="Select one or more practices"
              />
            </div>
            <div className="field">
              <label>Grade</label>
              <${MultiSelectDropdown}
                options=${tpTrendGradeOptions}
                selectedValues=${tpTrendGrades}
                onChange=${(values) => setTpTrendGrades(values)}
                placeholder="Select one or more grades"
              />
            </div>
            <button className="btn" onClick=${clearTpTrendFilters}>Reset TP Filters</button>
          </section>
          <div className="trend-chart-shell">
            <div style=${{ width: "100%", height: "430px" }}>
              <${ResponsiveContainer} width="100%" height="100%">
                <${ComposedChart}
                  data=${tpTrendData}
                  margin=${{ top: 14, right: 28, left: 8, bottom: 14 }}
                >
                  <${CartesianGrid} strokeDasharray="3 3" stroke="#e5e7eb" />
                  <${XAxis} dataKey="month" />
                  <${YAxis} yAxisId="left" allowDecimals=${false} />
                  <${YAxis}
                    yAxisId="right"
                    orientation="right"
                    domain=${[0, 100]}
                    tickFormatter=${(value) => `${Number(value).toFixed(0)}%`}
                  />
                  <${Tooltip}
                    content=${(props) => {
                      const { active, payload, label } = props;
                      if (!active || !payload || !payload.length) return null;
                      const tpEmployees =
                        payload.find((item) => item.dataKey === "talentPoolEmployees")?.value ?? 0;
                      const tpPct =
                        payload.find((item) => item.dataKey === "talentPoolPct")?.value ?? 0;
                      const point = payload[0]?.payload || {};
                      const totalEmployees = point.totalEmployees ?? 0;
                      return html`
                        <div className="trend-tooltip">
                          <div className="trend-tooltip-label">${label}</div>
                          <div className="trend-tooltip-item">
                            TP Employees: ${Number(tpEmployees).toLocaleString()}
                          </div>
                          <div className="trend-tooltip-item">
                            TP %: ${Number(tpPct).toFixed(1)}%
                          </div>
                          <div className="trend-tooltip-item">
                            Total Employees: ${Number(totalEmployees).toLocaleString()}
                          </div>
                        </div>
                      `;
                    }}
                  />
                  <${Legend} />
                  <${Bar}
                    yAxisId="left"
                    dataKey="talentPoolEmployees"
                    name="TP Employees"
                    fill="#6366F1"
                    radius=${[8, 8, 0, 0]}
                    isAnimationActive=${true}
                    animationDuration=${900}
                    animationEasing="ease-in-out"
                  />
                  <${Line}
                    yAxisId="right"
                    type="monotone"
                    dataKey="talentPoolPct"
                    name="TP %"
                    stroke="#0f172a"
                    strokeWidth=${3}
                    isAnimationActive=${true}
                    animationDuration=${900}
                    animationEasing="ease-in-out"
                    dot=${{ r: 3, fill: "#0f172a" }}
                    activeDot=${{ r: 5 }}
                  />
                </${ComposedChart}>
              </${ResponsiveContainer}>
            </div>
          </div>
        </section>
      </div>
    </div>
  `;
}

createRoot(document.getElementById("root")).render(html`<${App} />`);

