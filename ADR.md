# ADR: StackShift Frontend

## Status: Accepted

## Date: 2026-04-19

---

## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| **Framework** | React 18 (Vite) | Fast HMR, lightweight, no SSR needed |
| **Styling** | Tailwind CSS | Rapid UI development, utility-first |
| **Routing** | React Router v6 | Standard SPA routing |
| **HTTP Client** | Axios | Clean API calls, interceptors |
| **State** | React Context + useState | Simple enough for hackathon, no Redux overhead |
| **Icons** | Lucide React | Clean, lightweight icon set |
| **Notifications** | React Hot Toast | Simple toast notifications |
| **Charts** | Recharts (optional) | Signal score visualizations |

---

## Project Structure

```
frontend/
├── public/
│   └── favicon.ico
├── src/
│   ├── main.jsx                    # Entry point
│   ├── App.jsx                     # Router + Layout
│   ├── index.css                   # Tailwind imports
│   │
│   ├── services/
│   │   └── api.js                  # Axios instance + all API calls
│   │
│   ├── context/
│   │   └── AppContext.jsx          # Global state (user, signals)
│   │
│   ├── pages/
│   │   ├── LandingPage.jsx         # Hero + CTA
│   │   ├── OnboardingPage.jsx      # 3-step onboarding wizard
│   │   ├── DashboardPage.jsx       # Main signal feed
│   │   └── OutreachPage.jsx        # Email composer for a signal
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── PageWrapper.jsx
│   │   │
│   │   ├── onboarding/
│   │   │   ├── ProductForm.jsx     # Step 1: product name + description
│   │   │   ├── CustomerInput.jsx   # Step 2: add customer companies
│   │   │   ├── CompetitorInput.jsx # Step 3: add competitors
│   │   │   └── StepIndicator.jsx   # Progress bar
│   │   │
│   │   ├── dashboard/
│   │   │   ├── SignalFeed.jsx      # List of signal cards
│   │   │   ├── SignalCard.jsx      # Single signal summary
│   │   │   ├── SignalDetail.jsx    # Expanded signal modal/drawer
│   │   │   ├── FilterBar.jsx      # Filter by type, urgency, flow
│   │   │   ├── ScanButton.jsx     # Trigger new scan
│   │   │   └── StatsBar.jsx       # Summary stats (hot/warm/cool counts)
│   │   │
│   │   ├── outreach/
│   │   │   ├── OutreachComposer.jsx # Full email editor view
│   │   │   ├── EmailPreview.jsx     # Rendered email preview
│   │   │   └── TalkingPoints.jsx    # Bullet list of talking points
│   │   │
│   │   └── common/
│   │       ├── ScoreBadge.jsx      # Color-coded score (0-100)
│   │       ├── UrgencyTag.jsx      # HOT / WARM / COOL pill
│   │       ├── SignalTypeIcon.jsx  # Icon per signal type
│   │       ├── CompanyCard.jsx     # Company info mini-card
│   │       ├── PersonCard.jsx      # Person info mini-card
│   │       ├── LoadingSpinner.jsx
│   │       ├── EmptyState.jsx
│   │       └── ErrorBanner.jsx
│   │
│   ├── hooks/
│   │   ├── useSignals.js           # Fetch + filter signals
│   │   ├── useScan.js              # Trigger scan + poll status
│   │   └── useOutreach.js          # Generate outreach for a signal
│   │
│   └── utils/
│       ├── constants.js            # API base URL, signal types, etc.
│       └── formatters.js           # Date formatting, score colors
│
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── .env.example
```

---

## Pages & Screens

### 1. Landing Page (`/`)
```
┌──────────────────────────────────────────────────┐
│  NAVBAR: StackShift logo        [Get Started]    │
├──────────────────────────────────────────────────┤
│                                                  │
│       Every leadership change is a               │
│         stack decision.                          │
│                                                  │
│   We tell you which ones matter to YOUR sales.   │
│                                                  │
│            [ Get Started → ]                     │
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │ Champion │  │ Competi- │  │ AI       │      │
│  │ Tracking │  │ tor Intel│  │ Outreach │      │
│  │          │  │          │  │          │      │
│  │ Track    │  │ Find     │  │ Personal-│      │
│  │ your     │  │ competi- │  │ ized     │      │
│  │ champions│  │ tor's    │  │ emails   │      │
│  │ across   │  │ customers│  │ in one   │      │
│  │ companies│  │ & steal  │  │ click    │      │
│  └──────────┘  └──────────┘  └──────────┘      │
└──────────────────────────────────────────────────┘
```

### 2. Onboarding Page (`/onboard`)
```
┌──────────────────────────────────────────────────┐
│  Step 1 of 3    ●───○───○                        │
├──────────────────────────────────────────────────┤
│                                                  │
│  What product do you sell?                       │
│                                                  │
│  Product Name:  [ Datadog                    ]   │
│  Description:   [ Cloud monitoring and       ]   │
│                 [ observability platform      ]   │
│  Your Company:  [ Datadog Inc                ]   │
│  Your Email:    [ sales@datadog.com          ]   │
│                                                  │
│                          [ Next → ]              │
├──────────────────────────────────────────────────┤
│  Step 2 of 3    ●───●───○                        │
├──────────────────────────────────────────────────┤
│                                                  │
│  Add your current customers                      │
│  (We'll track their leadership changes)          │
│                                                  │
│  ┌──────────────────────────────────────┐        │
│  │ Company name or LinkedIn URL         │ [Add]  │
│  └──────────────────────────────────────┘        │
│                                                  │
│  Added:                                          │
│  ┌────────────────────────────────┐              │
│  │ ✓ Acme Corp           [✕]    │              │
│  │ ✓ BigCorp Industries  [✕]    │              │
│  │ ✓ TechStart           [✕]    │              │
│  └────────────────────────────────┘              │
│                                                  │
│                 [ ← Back ]  [ Next → ]           │
├──────────────────────────────────────────────────┤
│  Step 3 of 3    ●───●───●                        │
├──────────────────────────────────────────────────┤
│                                                  │
│  Add competitors (optional)                      │
│  (We'll find their customers & track movements)  │
│                                                  │
│  ┌──────────────────────────────────────┐        │
│  │ Competitor product name              │ [Add]  │
│  └──────────────────────────────────────┘        │
│                                                  │
│  Added:                                          │
│  ┌────────────────────────────────┐              │
│  │ ✓ New Relic            [✕]    │              │
│  │ ✓ PagerDuty            [✕]    │              │
│  └────────────────────────────────┘              │
│                                                  │
│         [ ← Back ]  [ Start Scanning → ]         │
└──────────────────────────────────────────────────┘
```

### 3. Dashboard Page (`/dashboard`)
```
┌──────────────────────────────────────────────────────────┐
│  NAVBAR: StackShift     Dashboard  Outreach   [Scan Now] │
├────────────┬─────────────────────────────────────────────┤
│            │                                             │
│  SIDEBAR   │  STATS BAR                                  │
│            │  ┌────────┐ ┌────────┐ ┌────────┐          │
│  Filters:  │  │ 3 HOT  │ │ 5 WARM │ │ 2 COOL │          │
│            │  └────────┘ └────────┘ └────────┘          │
│ Signal Type│                                             │
│ ☑ New Lead │  FILTER BAR                                │
│ ☑ Churn    │  [All] [New Leads] [Churn Risk] [Competi-] │
│   Risk     │                                             │
│ ☑ Competi- │  SIGNAL FEED                               │
│   tive     │  ┌──────────────────────────────────────┐  │
│            │  │ 🔴 SCORE: 91  HOT    NEW LEAD        │  │
│ Flow:      │  │                                      │  │
│ ☑ Champion │  │ Sarah Chen → CTO at Zeta Inc         │  │
│   Tracker  │  │ Previously: VP Eng at Acme (3 years) │  │
│ ☑ Competi- │  │ "Used Datadog extensively at Acme.   │  │
│   tor      │  │  Will likely bring it to Zeta."      │  │
│   Analyzer │  │                                      │  │
│            │  │ 18 days ago  │  Zeta: 450 employees  │  │
│ Urgency:   │  │ [View Detail] [Generate Outreach]    │  │
│ ☑ Hot      │  └──────────────────────────────────────┘  │
│ ☑ Warm     │                                             │
│ ☑ Cool     │  ┌──────────────────────────────────────┐  │
│            │  │ 🟡 SCORE: 72  WARM   CHURN RISK      │  │
│            │  │                                      │  │
│            │  │ Sarah Chen left Acme Corp             │  │
│            │  │ She was your internal champion        │  │
│            │  │ "New VP Eng comes from New Relic      │  │
│            │  │  background. Engage immediately."     │  │
│            │  │                                      │  │
│            │  │ 18 days ago  │  Acme: 1200 employees │  │
│            │  │ [View Detail] [Generate Outreach]    │  │
│            │  └──────────────────────────────────────┘  │
│            │                                             │
│            │  ┌──────────────────────────────────────┐  │
│            │  │ 🔴 SCORE: 88  HOT    COMPETITIVE     │  │
│            │  │                                      │  │
│            │  │ Mike Lee → VP Eng at MegaCorp         │  │
│            │  │ MegaCorp uses New Relic (competitor)  │  │
│            │  │ "Mike used Datadog at Stripe for      │  │
│            │  │  4 years. Displacement opportunity."  │  │
│            │  │                                      │  │
│            │  │ 8 days ago  │  MegaCorp: 2000 emps   │  │
│            │  │ [View Detail] [Generate Outreach]    │  │
│            │  └──────────────────────────────────────┘  │
└────────────┴─────────────────────────────────────────────┘
```

### 4. Signal Detail Modal
```
┌──────────────────────────────────────────────────┐
│  Signal Detail                            [✕]    │
├──────────────────────────────────────────────────┤
│                                                  │
│  NEW LEAD  │  Score: 91  │  HOT  │  18 days ago  │
│                                                  │
│  ── PERSON ──────────────────────────────────    │
│  Sarah Chen                                      │
│  CTO at Zeta Inc (joined Apr 1, 2026)           │
│  Previously: VP Engineering at Acme Corp         │
│  Tenure at Acme: 3 years 2 months               │
│  LinkedIn: linkedin.com/in/sarahchen            │
│                                                  │
│  ── NEW COMPANY ─────────────────────────────    │
│  Zeta Inc                                        │
│  Employees: 450  │  Revenue: $50M-$100M         │
│  Industry: SaaS / Developer Tools               │
│  Headcount trend: ↑ Growing (12% QoQ)           │
│                                                  │
│  ── WHY THIS SIGNAL ─────────────────────────    │
│  Sarah used Datadog for 3 years at Acme Corp.   │
│  She oversaw the migration from New Relic to     │
│  Datadog in 2024. As CTO at Zeta, she has       │
│  full authority over tooling decisions. Zeta     │
│  currently has no observability vendor in their  │
│  job postings — greenfield opportunity.          │
│                                                  │
│  ── RECOMMENDED ACTION ──────────────────────    │
│  Send warm reconnect email within 7 days.        │
│  Reference her Acme experience. Offer POC.       │
│                                                  │
│        [ Generate Outreach Email → ]             │
└──────────────────────────────────────────────────┘
```

### 5. Outreach Page (`/outreach/:signalId`)
```
┌──────────────────────────────────────────────────┐
│  Outreach Composer              [← Back to Feed] │
├──────────────────────────────────────────────────┤
│                                                  │
│  To: Sarah Chen (CTO, Zeta Inc)                 │
│  Signal: NEW LEAD  Score: 91  HOT               │
│                                                  │
│  ── EMAIL PREVIEW ───────────────────────────    │
│  ┌──────────────────────────────────────────┐    │
│  │ Subject: Congrats on the CTO role at     │    │
│  │ Zeta, Sarah!                              │    │
│  │                                          │    │
│  │ Hi Sarah,                                │    │
│  │                                          │    │
│  │ Congratulations on your move to Zeta as  │    │
│  │ CTO — exciting times!                    │    │
│  │                                          │    │
│  │ During your time at Acme, your team      │    │
│  │ relied on Datadog for monitoring and     │    │
│  │ observability. As you're setting up the  │    │
│  │ engineering stack at Zeta, I'd love to   │    │
│  │ help you get the same visibility from    │    │
│  │ day one.                                 │    │
│  │                                          │    │
│  │ Would you be open to a quick chat next   │    │
│  │ week?                                    │    │
│  │                                          │    │
│  │ Best,                                    │    │
│  │ [Your Name]                              │    │
│  └──────────────────────────────────────────┘    │
│                                                  │
│  ── TALKING POINTS ──────────────────────────    │
│  • She led the New Relic → Datadog migration     │
│  • Zeta has no observability vendor yet          │
│  • Zeta is growing fast (12% QoQ headcount)     │
│  • Offer POC + team onboarding support          │
│                                                  │
│  Timing: Send within 7 days                      │
│  Tone: Warm Reconnect                            │
│                                                  │
│  [ Copy Email ]  [ Regenerate ]  [ Edit ]        │
└──────────────────────────────────────────────────┘
```

---

## Component Hierarchy

```
App.jsx
├── Navbar
├── Routes
│   ├── LandingPage
│   │
│   ├── OnboardingPage
│   │   ├── StepIndicator
│   │   ├── ProductForm        (step 1)
│   │   ├── CustomerInput      (step 2)
│   │   └── CompetitorInput    (step 3)
│   │
│   ├── DashboardPage
│   │   ├── Sidebar (filters)
│   │   ├── StatsBar
│   │   ├── FilterBar
│   │   ├── SignalFeed
│   │   │   └── SignalCard (repeated)
│   │   │       ├── ScoreBadge
│   │   │       ├── UrgencyTag
│   │   │       ├── SignalTypeIcon
│   │   │       └── PersonCard
│   │   └── SignalDetail (modal)
│   │       ├── PersonCard
│   │       ├── CompanyCard
│   │       └── OutreachComposer (inline)
│   │
│   └── OutreachPage
│       ├── EmailPreview
│       └── TalkingPoints
```

---

## API Service (`services/api.js`)

```javascript
// All backend API calls

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL })

// Onboarding
api.onboard(data)                    // POST /api/onboard

// Scanning
api.scan(userId)                     // POST /api/scan

// Signals
api.getSignals(userId, filters)      // GET  /api/signals?type=&urgency=
api.getSignalDetail(signalId)        // GET  /api/signals/:id

// Outreach
api.generateOutreach(signalId)       // POST /api/outreach

// Competitors
api.getCompetitorCustomers(userId)   // GET  /api/competitors/customers
```

---

## Color System

```
Score Badge:
  90-100  → Red background     (#EF4444)  "HOT"
  70-89   → Orange background  (#F59E0B)  "WARM"
  0-69    → Blue background    (#3B82F6)  "COOL"

Signal Type:
  new_lead                → Green  (#10B981)  ↗ arrow icon
  churn_risk              → Red    (#EF4444)  ⚠ warning icon
  competitive_displacement → Purple (#8B5CF6)  ⚔ swords icon

Urgency Tag:
  hot  → Red pill with pulse animation
  warm → Yellow pill
  cool → Gray pill
```

---

## Environment Variables

```env
# frontend/.env.example
VITE_API_URL=http://localhost:8000
```

---

## Build Priority (Hackathon)

| Priority | Component | Why |
|----------|-----------|-----|
| P0 | OnboardingPage (all 3 steps) | Entry point, must work |
| P0 | SignalFeed + SignalCard | Core value — the signal list |
| P0 | OutreachComposer + EmailPreview | Key demo moment |
| P1 | FilterBar + Sidebar | Makes demo look polished |
| P1 | SignalDetail modal | Adds depth to demo |
| P1 | StatsBar | Quick visual impact |
| P2 | LandingPage | Nice to have, not critical |
| P2 | Charts/visualizations | Stretch goal |
