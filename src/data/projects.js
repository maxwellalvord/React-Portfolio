import BSF from '../assets/business-site-frame.png'
import ASCOE from '../assets/ascoe.png'
import MONEY from '../assets/Money-Manager.png'

// visual: 'image' shows `image`; 'agents' and 'mrr' render a built-in graphic instead.
// caseStudy: shown in the case study dialog. Keep every claim checkable against the repo.
export const projects = [
  {
    id: 'business-site-frame',
    visual: 'image',
    image: BSF,
    title: 'Small-Business Site Frame',
    subtitle: 'Open Source',
    description: 'A reusable one-page website template for local businesses: live "Open now" hours, menu with lightbox, FAQ and a validated contact form. No build step, and a strict security policy that its own tests enforce.',
    tags: ['Alpine.js', 'CSP', 'Headless Chrome tests', 'Node test runner', 'Netlify / Cloudflare'],
    links: [
      { label: 'GitHub', href: 'https://github.com/maxwellalvord/Business-Site-Frame' }
    ],
    caseStudy: {
      role: 'Solo developer',
      stack: 'Alpine.js (CSP build), vanilla CSS, Node 22 tests, headless Chrome',
      context: 'Local businesses like restaurants, game shops and cafés keep needing the same one-page site. I wanted one template I could copy for each client without re-solving hours, menus, forms and security every time.',
      problem: 'A template that gets copied gets copied with its mistakes. A loose Content-Security-Policy, a leaked project file, or a contact form that fakes success would end up on every client site.',
      approach: [
        'Moved to Alpine\'s CSP build so the policy no longer needs \'unsafe-eval\'. Page logic lives in components.js, and the HTML only names properties and methods.',
        'Self-hosted Alpine and pinned it byte-for-byte. The tests fail if a vendor file changes or the two copies of the CSP drift apart.',
        'Added a --client mode that runs the security and deployment checks against a client\'s copy of the site and compares its policy with the template\'s. The few allowed exceptions have to be passed by name.',
        'Made config mistakes fail in one place. A bad time or time zone hides only the hours widget and logs exactly what\'s wrong, while the form and the rest of the page keep working.',
        'The contact form shows a real error instead of a fake "Thanks!", enforces length limits, times out and sends without cookies.'
      ],
      outcome: 'A launch-ready v1.0 candidate with automated tests for every component, the hours logic (past midnight, across time zones), keyboard navigation, security headers and deployment layout. It also has a pre-launch checklist for each client.',
      next: 'Choose the default host and form provider, then tag v1.0.0 after a live header scan and a real test submission.'
    }
  },
  {
    id: 'agent-team',
    visual: 'agents',
    title: 'Agent Team',
    subtitle: 'Private Repo',
    description: 'A multi-agent development workflow I designed and run with Claude Code. Each cycle goes from a project manager agent to developer, documentation, and security & testing agents, then back to me as project manager. An Internal Affairs agent audits the team when I call it in. The repo is private, but I\'m happy to walk you through it.',
    tags: ['Claude Code', 'AI Agents', 'Security Review', 'Process Design'],
    links: [
      { label: 'How it works', href: '#process', internal: true },
      { label: "Let's talk", href: '#contact', internal: true, primary: true }
    ],
    caseStudy: null
  },
  {
    id: 'ascoe',
    visual: 'image',
    image: ASCOE,
    imagePosition: 'center',
    title: 'Ascoé',
    subtitle: 'Live · App Store',
    description: 'A cross-gender Q&A platform where men and women anonymously ask questions and curate honest answers. Live on the web and on the iOS App Store.',
    tags: ['Next.js', 'Capacitor iOS', 'NeonDB', 'Drizzle', 'Clerk', 'Vercel'],
    links: [
      { label: 'App Store', href: 'https://apps.apple.com/ca/app/asco%C3%A9/id6781621825' },
      { label: 'Live Site', href: 'https://www.ascoe.space', primary: true }
    ],
    caseStudy: {
      role: 'Co-founder and sole engineer',
      stack: 'Next.js, Capacitor (iOS), Clerk, NeonDB + Drizzle, Firebase Cloud Messaging / APNs, Vercel',
      context: 'A Q&A app where each side asks the other. Questions are optionally anonymous, and the opposite side curates and answers them.',
      problem: 'Anonymous user-generated content is the hardest category to get through App Store review. It needs moderation, reporting, blocking and account deletion, and anonymity can\'t leak through any of them.',
      approach: [
        'Built a single Next.js codebase that ships to the web and to iOS via Capacitor, with native push notifications through APNs.',
        'Added the moderation Apple\'s guideline 1.2 requires: an objectionable-content filter, reporting, blocking, user bans and self-delete, plus an admin queue for reports.',
        'Found and fixed a de-anonymization bug: blocking a user from anonymous content revealed their name. The blocked user\'s name is now masked.',
        'Kept App Store reviewers apart from real users. Demo content is seeded only for reviewer accounts and excluded from real feeds.',
        'Ran a full application audit before resubmitting and closed out its findings.'
      ],
      outcome: 'Launched on the iOS App Store after working through Apple\'s review feedback, and live on the web at ascoe.space.',
      next: 'Growing the first community of users and iterating on feedback from real use.'
    }
  },
  {
    id: 'money-manager',
    visual: 'image',
    image: MONEY,
    title: 'Money Manager',
    subtitle: 'Live',
    description: 'A budgeting app with budgets, recurring expenses, multiple savings goals, a budget calendar and monthly statements. It now has a REST API and a native Expo app on the way to the App Store.',
    tags: ['Next.js', 'Clerk', 'Drizzle', 'NeonDB', 'Expo', 'Recharts'],
    links: [
      { label: 'GitHub', href: 'https://github.com/maxwellalvord/Money-Manager' },
      { label: 'Live Site', href: 'https://moneymanager.live', primary: true }
    ],
    caseStudy: {
      role: 'Solo developer',
      stack: 'Next.js Server Actions, Clerk, Drizzle ORM, NeonDB, Recharts, Expo + expo-router + NativeWind',
      context: 'This started as a simple React + Firebase budget tracker and grew into a full personal-finance app. Recent additions are recurring expenses, multiple savings accounts, a budget calendar and month-end rollover.',
      problem: 'The business logic lived in Next.js Server Actions, which only a Next.js frontend can call. A native mobile app would have meant duplicating all of it.',
      approach: [
        'Added a thin /api/v1 REST layer that wraps the existing Server Actions, so the web app and the mobile app run the same logic and nothing is duplicated.',
        'Authenticated the API with Clerk Bearer tokens, sharing one Clerk instance between web and mobile.',
        'Built an Expo + TypeScript app covering the full feature set: dashboard, budgets, expenses, recurring expenses, savings transfers, calendar, statements and rollover.'
      ],
      outcome: 'The web app is live at moneymanager.live. The mobile app is code-complete, type-checked and passes an iOS bundle export.',
      next: 'Device testing on a Mac, then App Store submission.'
    }
  },
  {
    id: 'personal-rag',
    visual: 'mrr',
    wide: true,
    title: 'Retrieval Benchmark',
    subtitle: 'Research',
    description: 'Is the bottleneck in a RAG system the model or the retrieval? I built an evaluation harness to test that claim instead of taking it on faith, and measured four retrieval approaches against a golden set of questions over real POS support documentation.',
    tags: ['Python', 'Embeddings', 'BM25', 'Ollama', 'Evaluation'],
    links: [
      { label: 'GitHub', href: 'https://github.com/maxwellalvord/Personal-RAG' }
    ],
    caseStudy: {
      role: 'Solo',
      stack: 'Python, sentence-transformers (all-MiniLM-L6-v2, bge-base-en-v1.5), BM25, reciprocal rank fusion, Ollama',
      context: 'I kept hearing that bad answers from AI agents usually come from retrieval, not the model. I worked with a retail POS system professionally, so I could write realistic support questions over its documentation and judge relevance by hand.',
      problem: 'Several documents share most of their vocabulary. Purchase orders and inventory transfers overlap by about 70%, so retrieval has to tell near-twins apart.',
      approach: [
        'Wrote a 19-question golden set. Each question is tied to a fingerprint string that appears in exactly one document, verified programmatically.',
        'Mixed "close-phrased" questions with "far-phrased" ones that use none of the document\'s own vocabulary.',
        'Scored with Mean Reciprocal Rank, because a support agent answers from the top result.',
        'Tested hypotheses and recorded the failures. Finer chunks halved MRR, and naive BM25 fusion made it worse.'
      ],
      outcome: 'MRR went from 0.831 to 0.860 by upgrading the embedding model. A managed retrieval engine reached 0.896, but with different blind spots, not strictly fewer. The embedding model was the lever, and near-duplicate documents are where retrieval quality is decided.',
      next: 'Rethink chunking around document structure, and revisit hybrid search with a better fusion strategy.'
    }
  }
]

export const mrrResults = [
  { label: 'Dense · MiniLM-L6', value: 0.831 },
  { label: 'Dense · bge-base', value: 0.860 },
  { label: 'Hybrid (dense + BM25)', value: 0.737 },
  { label: 'Managed engine', value: 0.896, best: true }
]
