import React from 'react'
import './experience.css'
import { RiCheckboxCircleFill } from 'react-icons/ri'
import { motion } from 'framer-motion'
import { containerVariants, itemVariants } from '../../utils/animations'
import SectionHeading from '../SectionHeading'
import { skillGroups } from '../../data/skills'

const Experience = () => {
  return (
    <section id='experience'>
      <SectionHeading eyebrow="What Skills I Have" title="My Experience" />

      <motion.div
        className="container experience__container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
      >
        {skillGroups.map(({ key, title, infra, skills }) => (
          <motion.div key={key} className={`experience__${key}`} variants={itemVariants}>
            <h3>{title}</h3>
            <div className="experience__content">
              {skills.map(([name, level]) => (
                <article key={name} className='experience__details'>
                  <RiCheckboxCircleFill className={`experience__details-icon${infra ? ' experience__details-icon--infra' : ''}`}/>
                  <div><h4>{name}</h4><small className='text-light'>{level}</small></div>
                </article>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default Experience
