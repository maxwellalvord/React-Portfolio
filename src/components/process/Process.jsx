import React from 'react'
import './process.css'
import { motion } from 'framer-motion'
import { HiOutlineLockClosed } from 'react-icons/hi'
import { containerVariants, itemVariants, fadeUp } from '../../utils/animations'
import SectionHeading from '../SectionHeading'

const steps = [
  { role: 'Project Manager', text: 'Reviews the project and writes a versioned plan with numbered tasks and acceptance criteria.' },
  { role: 'Developer', text: 'Implements the plan and writes a report that cites every change by file and commit hash.' },
  { role: 'Documentation', text: 'Updates the docs to match what actually changed, before review.' },
  { role: 'Security & Testing', text: 'Independently reviews and tests every change against the source before anything is published.', gate: true },
  { role: 'Back to PM (Me)', text: 'The work comes back to me as project manager. I review it, decide what ships and set the next plan.' }
]

const principles = [
  {
    title: 'Separation of duties',
    text: 'Each role has a written brief, the files it owns and a "never" list. Security reports findings and the developer fixes them; no role grades its own work.'
  },
  {
    title: 'A real release gate',
    text: 'Before anything public ships: a secret scan, a check for internal references, and a rule that no README or commit message claims something a finding shows is false.'
  },
  {
    title: 'Evidence over vibes',
    text: 'Every plan and report is versioned and traceable to exact commits, so any decision can be traced back to the work it came from.'
  },
  {
    title: 'Reusable by design',
    text: 'The team\'s conventions live apart from any one product. One setup script connects a new project, without the product repo ever referencing the team.'
  }
]

const Process = () => {
  return (
    <section id='process'>
      <SectionHeading eyebrow="Building With AI Agents" title="How I Work" />

      <div className="container process__container">
        <motion.p
          className="process__intro"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
        >
          I designed and run an <strong>agent team</strong> with Claude Code: separate AI agents for project management,
          development, documentation, and security &amp; testing, each in its own session with its own brief. It treats AI the way a good
          engineering org treats people: clear ownership, written handoffs, independent review, and a human who
          signs off on every release.
        </motion.p>

        <motion.ol
          className="process__flow"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {steps.map(({ role, text, gate }, i) => (
            <motion.li key={role} className={gate ? 'process__step process__step--gate' : 'process__step'} variants={itemVariants}>
              <span className="process__num">{String(i + 1).padStart(2, '0')}</span>
              <h4>{role}{gate && <span className="process__gate">Gate</span>}</h4>
              <p>{text}</p>
            </motion.li>
          ))}
        </motion.ol>

        <motion.div
          className="process__loop"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p className="process__repeat" variants={itemVariants}>
            <span aria-hidden="true">↻</span> Then it's back to step 01, and the cycle continues.
          </motion.p>
          <motion.article className="process__ia" variants={itemVariants}>
            <span className="process__ia-tag">On demand</span>
            <div>
              <h4>Internal Affairs</h4>
              <p>
                Every so often I choose to call in an Internal Affairs agent to check the team's work: whether each
                role followed protocol, and where the process has gaps or loopholes to close.
              </p>
            </div>
          </motion.article>
        </motion.div>

        <motion.div
          className="process__principles"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {principles.map(({ title, text }) => (
            <motion.article key={title} className="process__principle" variants={itemVariants}>
              <h4>{title}</h4>
              <p>{text}</p>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="process__private"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
        >
          <HiOutlineLockClosed className="process__private-icon" />
          <div>
            <h4>The repository is private</h4>
            <p>
              But I'm genuinely happy to connect and walk you through it: how the roles hand off, what the
              security gate has caught, and what I've learned running AI agents like a team.
            </p>
          </div>
          <a href="#contact" className="btn btn-primary">Let's talk</a>
        </motion.div>
      </div>
    </section>
  )
}

export default Process
