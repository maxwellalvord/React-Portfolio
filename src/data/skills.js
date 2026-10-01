// Skill groups shown in the Experience section. `infra` groups get the alternate icon color.
const E = 'Experienced'
const I = 'Intermediate'

export const skillGroups = [
  {
    key: 'frontend',
    title: 'Frontend',
    skills: [
      ['HTML / CSS', E], ['JavaScript', E], ['React', E], ['Bootstrap', I], ['Material UI', I],
      ['Selenium', I], ['Alpine.js', I], ['Tailwind CSS', E], ['React Native / Expo', I]
    ]
  },
  {
    key: 'backend',
    title: 'Backend',
    skills: [
      ['Node.js', E], ['Express', E], ['MongoDB', I], ['Firebase', E], ['Next.js', E], ['ASP.NET / C#', E],
      ['MySQL', I], ['Golang', I], ['NeonDB', E], ['Python', I], ['Supabase', I], ['Drizzle ORM', I]
    ]
  },
  {
    key: 'infra',
    title: 'Infrastructure & AI',
    infra: true,
    skills: [
      ['Linux', E], ['Docker', E], ['Proxmox VE', I], ['pfSense', I], ['Networking / VLANs', I], ['Git / CI-CD', E],
      ['Firebase Hosting', E], ['Unity / C#', I], ['Vercel', E], ['Cloudflare Pages', I], ['AI Agents / RAG', I], ['Claude Code', E]
    ]
  }
]
