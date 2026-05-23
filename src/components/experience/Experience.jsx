import React from 'react'
import './experience.css'
import { RiCheckboxCircleFill } from 'react-icons/ri'
import { motion } from 'framer-motion'
import { containerVariants, itemVariants, fadeUp } from '../../utils/animations'

const Experience = () => {
  return (
    <section id='experience'>
      <motion.h5
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: false }}
      >
        What Skills I Have
      </motion.h5>
      <motion.h2
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: false }}
        transition={{ delay: 0.1 }}
      >
        My Experience
      </motion.h2>

      <motion.div
        className="container experience__container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
      >
        <motion.div className="experience__frontend" variants={itemVariants}>
          <h3>Frontend</h3>
          <div className="experience__content">
            <article className='experience__details'>
              <RiCheckboxCircleFill className='experience__details-icon'/>
              <div><h4>HTML / CSS</h4><small className='text-light'>Experienced</small></div>
            </article>
            <article className='experience__details'>
              <RiCheckboxCircleFill className='experience__details-icon'/>
              <div><h4>JavaScript</h4><small className='text-light'>Experienced</small></div>
            </article>
            <article className='experience__details'>
              <RiCheckboxCircleFill className='experience__details-icon'/>
              <div><h4>React</h4><small className='text-light'>Experienced</small></div>
            </article>
            <article className='experience__details'>
              <RiCheckboxCircleFill className='experience__details-icon'/>
              <div><h4>Bootstrap</h4><small className='text-light'>Intermediate</small></div>
            </article>
            <article className='experience__details'>
              <RiCheckboxCircleFill className='experience__details-icon'/>
              <div><h4>Material UI</h4><small className='text-light'>Intermediate</small></div>
            </article>
            <article className='experience__details'>
              <RiCheckboxCircleFill className='experience__details-icon'/>
              <div><h4>Selenium</h4><small className='text-light'>Intermediate</small></div>
            </article>
          </div>
        </motion.div>

        <motion.div className="experience__backend" variants={itemVariants}>
          <h3>Backend</h3>
          <div className="experience__content">
            <article className='experience__details'>
              <RiCheckboxCircleFill className='experience__details-icon'/>
              <div><h4>Node.js</h4><small className='text-light'>Experienced</small></div>
            </article>
            <article className='experience__details'>
              <RiCheckboxCircleFill className='experience__details-icon'/>
              <div><h4>Express</h4><small className='text-light'>Experienced</small></div>
            </article>
            <article className='experience__details'>
              <RiCheckboxCircleFill className='experience__details-icon'/>
              <div><h4>MongoDB</h4><small className='text-light'>Intermediate</small></div>
            </article>
            <article className='experience__details'>
              <RiCheckboxCircleFill className='experience__details-icon'/>
              <div><h4>Firebase</h4><small className='text-light'>Experienced</small></div>
            </article>
            <article className='experience__details'>
              <RiCheckboxCircleFill className='experience__details-icon'/>
              <div><h4>Next.js</h4><small className='text-light'>Intermediate</small></div>
            </article>
            <article className='experience__details'>
              <RiCheckboxCircleFill className='experience__details-icon'/>
              <div><h4>ASP.NET / C#</h4><small className='text-light'>Experienced</small></div>
            </article>
            <article className='experience__details'>
              <RiCheckboxCircleFill className='experience__details-icon'/>
              <div><h4>MySQL</h4><small className='text-light'>Intermediate</small></div>
            </article>
            <article className='experience__details'>
              <RiCheckboxCircleFill className='experience__details-icon'/>
              <div><h4>Golang</h4><small className='text-light'>Intermediate</small></div>
            </article>
          </div>
        </motion.div>

        <motion.div className="experience__infra" variants={itemVariants}>
          <h3>Infrastructure</h3>
          <div className="experience__content">
            <article className='experience__details'>
              <RiCheckboxCircleFill className='experience__details-icon experience__details-icon--infra'/>
              <div><h4>Linux</h4><small className='text-light'>Experienced</small></div>
            </article>
            <article className='experience__details'>
              <RiCheckboxCircleFill className='experience__details-icon experience__details-icon--infra'/>
              <div><h4>Docker</h4><small className='text-light'>Experienced</small></div>
            </article>
            <article className='experience__details'>
              <RiCheckboxCircleFill className='experience__details-icon experience__details-icon--infra'/>
              <div><h4>Proxmox VE</h4><small className='text-light'>Intermediate</small></div>
            </article>
            <article className='experience__details'>
              <RiCheckboxCircleFill className='experience__details-icon experience__details-icon--infra'/>
              <div><h4>pfSense</h4><small className='text-light'>Intermediate</small></div>
            </article>
            <article className='experience__details'>
              <RiCheckboxCircleFill className='experience__details-icon experience__details-icon--infra'/>
              <div><h4>Networking / VLANs</h4><small className='text-light'>Intermediate</small></div>
            </article>
            <article className='experience__details'>
              <RiCheckboxCircleFill className='experience__details-icon experience__details-icon--infra'/>
              <div><h4>Git / CI-CD</h4><small className='text-light'>Experienced</small></div>
            </article>
            <article className='experience__details'>
              <RiCheckboxCircleFill className='experience__details-icon experience__details-icon--infra'/>
              <div><h4>Firebase Hosting</h4><small className='text-light'>Experienced</small></div>
            </article>
            <article className='experience__details'>
              <RiCheckboxCircleFill className='experience__details-icon experience__details-icon--infra'/>
              <div><h4>Unity / C#</h4><small className='text-light'>Intermediate</small></div>
            </article>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Experience
