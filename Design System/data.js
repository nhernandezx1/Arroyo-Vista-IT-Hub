/* ============================================================
   Arroyo Vista IT Central Hub — default content + persistence
   Edit via the admin editor; changes persist to localStorage.
   ============================================================ */

const DEFAULT_DATA = {
  hero: {
    headline: "Secure Ops for the People Who Care for Our Community",
    subhead: "The internal command center for Arroyo Vista's IT department — submit tickets, track the lifecycle, reach the team, and keep our four health centers and mobile clinic running."
  },

  stats: [
    { icon: "fa-ticket",        value: "37",     label: "Open Tickets",    jump: "roadmap" },
    { icon: "fa-bolt",          value: "2.4h",   label: "Avg. First Reply", jump: "roadmap" },
    { icon: "fa-server",        value: "99.9%",  label: "System Uptime",   jump: "links" },
    { icon: "fa-user-shield",   value: "5",      label: "Sites Protected", jump: "team" }
  ],

  articles: [
    {
      id: "a1",
      category: "Security",
      title: "Spotting Phishing Emails Targeting Clinic Staff",
      date: "May 28, 2026",
      author: "Security Desk",
      readTime: "4 min",
      body: "<p>Phishing remains the #1 way attackers try to reach patient data. Before clicking, slow down and check three things:</p><ul><li><strong>The sender domain.</strong> Legitimate Arroyo Vista mail ends in <code>@arroyovista.org</code>. Look-alikes like <code>arroyo-vista.org</code> or <code>arroyovista.health</code> are red flags.</li><li><strong>Urgency &amp; pressure.</strong> &ldquo;Your account will be disabled in 1 hour&rdquo; is a classic manipulation tactic.</li><li><strong>Unexpected attachments or links.</strong> Hover to preview the real URL before clicking.</li></ul><p>When in doubt, forward the message to <code>itstaff@arroyovista.org</code> and we'll verify it. Never enter your password after clicking an email link — open the portal directly instead.</p>"
    },
    {
      id: "a2",
      category: "NextGen EHR",
      title: "Resolving NextGen Login & Template Loading Issues",
      date: "May 21, 2026",
      author: "Applications Team",
      readTime: "6 min",
      body: "<p>If NextGen is slow to load templates or rejects your login, work through these steps before opening a ticket:</p><ol><li>Confirm you're on the clinic network or VPN — NextGen is not reachable from the open internet.</li><li>Clear the local cache: <code>File &rarr; Clear Cache</code>, then restart the client.</li><li>Verify your token/2FA device clock is correct.</li></ol><p>Persistent template errors are usually a server-side sync issue. Note the exact error code and the workstation name, then escalate — we coordinate directly with NextGen support for these.</p>"
    },
    {
      id: "a3",
      category: "Devices",
      title: "Requesting & Setting Up a New Workstation",
      date: "May 9, 2026",
      author: "Desktop Support",
      readTime: "3 min",
      body: "<p>New hire or replacing aging hardware? Submit a device request through the portal with the site, role, and required applications. Standard imaging includes Windows, Microsoft 365, NextGen, and endpoint protection.</p><p>Lead time is typically <strong>3–5 business days</strong>. For clinical roles we pre-stage NextGen and printer mappings so the workstation is ready on day one.</p>"
    }
  ],

  links: [
    { name: "DHCS Medi-Cal Provider", icon: "fa-id-card",        url: "https://provider-portal.apps.prd.cammis.medi-cal.ca.gov/email" },
    { name: "UpToDate Login",         icon: "fa-book-medical",    url: "https://www.uptodate.com/login" },
    { name: "GoTo Assist",            icon: "fa-headset",         url: "https://fastsupport.gotoassist.com" },
    { name: "Apertyx XV WEB",         icon: "fa-folder-open",     url: "https://avf.xvweb.net/#/login?vurl=https://avf.xvweb.net/%23/query" },
    { name: "Curago Login",           icon: "fa-heart-pulse",     url: "https://portal.curagohealth.com/Account/Login?ReturnUrl=/" },
    { name: "NovaPACS",               icon: "fa-x-ray",           url: "https://ca-avfhf.novarad.net/novaweb/" },
    { name: "Azara Login",            icon: "fa-chart-line",      url: "https://ident.azarahealthcare.com/Account/Login" },
    { name: "Kumo Login",             icon: "fa-cloud",           url: "https://accounts.unifiedcloudit.com/auth/" },
    { name: "ADP Login",              icon: "fa-money-check-dollar", url: "https://online.adp.com/signin" },
    { name: "Relias Learning",        icon: "fa-graduation-cap",  url: "https://login.reliaslearning.com/login" }
  ],

  team: [
    {
      id: "t1", initials: "MR", name: "Miguel Rodriguez", role: "IT Director",
      tenure: "IT Leadership", email: "mrodrigues@arroyovista.org", ext: "x2030",
      about: "Leads the IT department and sets technology strategy across all of Arroyo Vista's health centers and mobile clinic. Miguel bridges clinical operations and infrastructure, championing security and reliable access to patient systems."
    },
    {
      id: "t2", initials: "JF", name: "John Flores", role: "IT Analyst",
      tenure: "Systems & Infrastructure", email: "jflores@arroyovista.org", ext: "x2031",
      about: "Supports the systems, networks, and applications that keep the clinics running. John investigates escalated issues, maintains infrastructure, and partners with vendors on fixes and upgrades."
    },
    {
      id: "t3", initials: "AG", name: "Anthony Gloria", role: "IT Data Analyst",
      tenure: "Data & Reporting", email: "agloria@arroyovista.org", ext: "x2032",
      about: "Owns reporting, dashboards, and data quality across clinical and operational systems. Anthony turns raw data into the reports leadership and care teams rely on."
    },
    {
      id: "t4", initials: "NH", name: "Noe Hernandez", role: "IT Help Desk",
      tenure: "Help Desk · x2033", email: "nhernandez1@arroyovista.org", ext: "x2033",
      about: "A friendly first voice on the line. Noe triages incoming tickets, resolves day-to-day issues fast, and makes sure no request slips through the cracks."
    },
    {
      id: "t5", initials: "IR", name: "Isaac Rivas", role: "IT Help Desk",
      tenure: "Help Desk · x2033", email: "irivas@arroyovista.org", ext: "x2033",
      about: "A friendly first voice on the line. Isaac triages incoming tickets, resolves day-to-day issues fast, and makes sure staff get back to caring for patients quickly."
    }
  ],

  /* Where staff tickets are emailed */
  ticketEmail: "itstaff@arroyovista.org",

  /* Categories for the ticket form */
  ticketCategories: ["Email", "Hardware", "Software", "Printer", "Network / Wi-Fi", "NextGen / EHR", "Phone / Telecom", "Account & Access", "Other"],

  /* NextGen knowledge base */
  nextgenKbUrl: "https://www.community.nextgen.com/",
  nextgenFaqs: [
    { q: "NextGen is frozen or won't load.", a: "Confirm you're on the clinic network or VPN — NextGen isn't reachable from the open internet. Fully close the client (don't just minimize), reopen it, and clear the local cache via File → Clear Cache. If it still hangs, note the workstation name and call the Help Desk at x2033." },
    { q: "I can't log in / my account is locked.", a: "Triple-check Caps Lock and that you're using your current network password. After three failed attempts the account locks for security. Wait a few minutes and retry, or call the Help Desk (x2033) to verify your identity and unlock it. We never reset clinical credentials without verifying who you are." },
    { q: "A template or document won't load.", a: "This is usually a server-side sync issue. Clear the local cache (File → Clear Cache) and restart the client. Write down the exact error code and the template name, then open a ticket — we coordinate these directly with NextGen support." },
    { q: "NextGen is running very slowly.", a: "Close unused charts and tabs, then restart the client to clear memory. If multiple staff at your site are slow at the same time, it's likely network — report it to the Help Desk with your site name so we can check the connection." },
    { q: "I can't find a patient's chart.", a: "Verify spelling, date of birth, and that you're searching the correct enterprise/practice. If the chart still doesn't appear it may be merged or restricted — open a ticket and we'll trace it without exposing protected information." },
    { q: "Printing from NextGen isn't working.", a: "Confirm the correct printer is selected in the print dialog (not a disconnected default). If your site printer is missing entirely, submit a ticket with the site and printer location and we'll push the mapping remotely." }
  ],

  faqs: [
    { q: "How do I reset my password?", a: "Use the self-service portal link on the login screen, or call the Help Desk at extension x2033. For security, we'll verify your identity before resetting clinical system credentials." },
    { q: "My NextGen is frozen or won't load. What now?", a: "First confirm you're on the clinic network or VPN. Close and reopen the client, then clear the local cache (File → Clear Cache). If it persists, note the error and workstation name and open a ticket — these often need a server-side check." },
    { q: "How do I connect to the printer at my site?", a: "Printers are mapped automatically on imaged workstations. If yours is missing, submit a ticket with the site name and printer location and we'll push the mapping remotely." },
    { q: "I think I received a phishing email. What should I do?", a: "Do not click any links or attachments. Forward the message to itstaff@arroyovista.org and delete it. If you already clicked, change your password immediately and call the Help Desk at x2033." },
    { q: "How long does a typical ticket take to resolve?", a: "Most routine issues are resolved within one business day, with an average first response under 3 hours. Complex issues or vendor escalations (NextGen, MTS) may take longer — you'll get status updates along the way." }
  ]
};

/* Fixed operational data — the lifecycle is process, not editable content */
const ROADMAP = [
  { title: "Submission",          desc: "An end user submits a ticket via email, phone (x2033), or the self-service portal. Every request is logged the moment it arrives — nothing lives only in someone's inbox.", meta: ["Email", "Phone · x2033", "Portal"] },
  { title: "Intake & Triage",     desc: "A team member claims the ticket, confirms the details, and sets a priority based on clinical impact and number of staff affected. Urgent patient-care issues jump the queue.", meta: ["Owner assigned", "Priority set", "SLA started"] },
  { title: "Troubleshooting",     desc: "Investigation begins using logs, remote tools, and direct interviews with the requester. We reproduce the issue and isolate the root cause before touching a fix.", meta: ["Logs", "Remote session", "Interview"] },
  { title: "Test & Implement",    desc: "The proposed solution is tested in a safe context, then deployed. We confirm the fix works without breaking adjacent systems before calling it done.", meta: ["Tested", "Deployed", "Verified"] },
  { title: "3rd-Party Escalation", desc: "When a fix is beyond our direct control, we escalate to the right vendor — NextGen, MTS, or others — and manage the case on your behalf until it's resolved.", meta: ["NextGen", "MTS", "Vendors"] },
  { title: "Resolution & Close",  desc: "The user confirms the issue is resolved, we document the fix in the knowledge base, and the ticket is formally closed — so the next person with the same problem gets a faster answer.", meta: ["User confirmed", "Documented", "Closed"] }
];

/* ---- persistence ---- */
const STORAGE_KEY = 'av_it_data';

function loadData() {
  const base = JSON.parse(JSON.stringify(DEFAULT_DATA));
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (saved && typeof saved === 'object') {
      return { ...base, ...saved,
        hero: { ...base.hero, ...(saved.hero || {}) } };
    }
  } catch (e) { /* ignore corrupt storage */ }
  return base;
}
function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
function resetData() {
  localStorage.removeItem(STORAGE_KEY);
}
