import React, { useCallback, useState } from 'react'
import './portfolio.css'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineLockClosed } from 'react-icons/hi'
import { containerVariants, itemVariants } from '../../utils/animations'
import SectionHeading from '../SectionHeading'
import { projects, mrrResults } from '../../data/projects'
import CaseStudy from './CaseStudy'

const agentRoles = ['PM', 'Dev', 'Docs', 'Security & Testing', 'PM (Me)']

const AgentsVisual = () => (
  <div className="portfolio__visual portfolio__visual--agents" aria-hidden="true">
    <div className="agents__flow">
      {agentRoles.map((role, i) => (
        <React.Fragment key={role}>
          <span className={`agents__node${role === 'Security & Testing' ? ' agents__node--gate' : ''}`}>{role}</span>
          {i < agentRoles.length - 1 && <span className="agents__arrow" />}
        </React.Fragment>
      ))}
    </div>
    <span className="agents__cycle">↻ The cycle repeats · Internal Affairs audits on demand</span>
    <span className="agents__lock"><HiOutlineLockClosed /> Private repository</span>
  </div>
)

const MrrVisual = () => (
  <div className="portfolio__visual portfolio__visual--mrr">
    <p className="mrr__caption">Mean Reciprocal Rank, 19-question golden set</p>
    <ul className="mrr__bars">
      {mrrResults.map(({ label, value, best }) => (
        <li key={label} className={best ? 'mrr__row mrr__row--best' : 'mrr__row'}>
          <span className="mrr__label">{label}</span>
          <span className="mrr__track">
            <span className="mrr__fill" style={{ width: `${value * 100}%` }} />
          </span>
          <span className="mrr__value">{value.toFixed(3)}</span>
        </li>
      ))}
    </ul>
  </div>
)

const Visual = ({ project }) => {
  if (project.visual === 'agents') return <AgentsVisual />
  if (project.visual === 'mrr') return <MrrVisual />
  return (
    <div className="portfolio__item-image">
      <img
        src={project.image}
        alt={project.title}
        style={project.imagePosition ? { objectPosition: project.imagePosition } : undefined}
      />
    </div>
  )
}

const ProjectLink = ({ link }) => {
  const className = link.primary ? 'btn btn-primary' : 'btn'
  if (link.internal) {
    return <a href={link.href} className={className}>{link.label}</a>
  }
  return <a href={link.href} className={className} target='_blank' rel='noopener noreferrer'>{link.label}</a>
}

const Portfolio = () => {
  const [openProject, setOpenProject] = useState(null)
  const closeCaseStudy = useCallback(() => setOpenProject(null), [])

  return (
    <section id='portfolio'>
      <SectionHeading eyebrow="My Recent Work" title="Portfolio" />

      <motion.div
        className='container portfolio__container'
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.05 }}
      >
        {projects.map((project) => (
          <motion.article
            key={project.id}
            className={`portfolio__item${project.wide ? ' portfolio__item--wide' : ''}`}
            variants={itemVariants}
          >
            <Visual project={project} />

            <div className="portfolio__item-body">
              <div className="portfolio__item-header">
                <h3>
                  {project.title}
                  {project.subtitle && <span className="portfolio__subtitle">{project.subtitle}</span>}
                </h3>
              </div>

              <p className="portfolio__description">{project.description}</p>

              <div className="portfolio__tags">
                {project.tags.map(tag => (
                  <span key={tag} className="portfolio__tag">{tag}</span>
                ))}
              </div>

              <div className="portfolio__item-cta">
                {project.caseStudy && (
                  <button type="button" className='btn btn-primary' onClick={() => setOpenProject(project)}>
                    Case Study
                  </button>
                )}
                {project.links.map(link => <ProjectLink key={link.label} link={link} />)}
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>

      <AnimatePresence>
        {openProject && <CaseStudy project={openProject} onClose={closeCaseStudy} />}
      </AnimatePresence>
    </section>
  )
}

export default Portfolio
