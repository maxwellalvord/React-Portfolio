import React from 'react'
import './about.css'
import ME from '../../assets/sarahmax.jpg'
import { CgAwards } from 'react-icons/cg'
import { BsFolder2Open } from 'react-icons/bs'
import { motion } from 'framer-motion'
import { containerVariants, itemVariants, fadeUp } from '../../utils/animations'

const About = () => {
  return (
    <section id='about'>
      <motion.h5
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: false }}
      >
        Get To Know
      </motion.h5>
      <motion.h2
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: false }}
        transition={{ delay: 0.1 }}
      >
        About Me
      </motion.h2>

      <motion.div
        className='container about__container'
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
      >
        <motion.div className="about__me" variants={itemVariants}>
          <div className="about__me-image">
            <img src={ME} alt='About' />
          </div>
        </motion.div>

        <motion.div className="about__content" variants={itemVariants}>
          <div className="about__cards">
            <article className='about__card'>
              <CgAwards className='about__icon' />
              <h2>Experience</h2>
              <h5>May 2022 - Oct. 2022</h5>
              <small>27 week Bootcamp (<a href="https://www.epicodus.com/">Epicodus</a>)</small>
              <h5>Oct. 2022 - Mar. 2023</h5>
              <small>Full stack developer (<a href='https://opineschool.com'>Opine</a>)</small>
              <h5>Aug. 2023 - Jan. 2026</h5>
              <small>Systems Engineer (<a href='https://www.newestech.com'>New West Technologies</a>)</small>
            </article>
            <article className='about__card'>
              <BsFolder2Open className='about__icon' />
              <h5>Projects</h5>
              <small>70+ completed</small>
              <br />
              <small>Live budgeting website (Money Manager)</small>
              <br />
              <small>HomeLab — Proxmox · Docker · pfSense · Linux</small>
              <br />
              <small>Ascoé — Currently in Beta, coming to the iOS App Store</small>
            </article>
          </div>

          <p>
            I'm Maxwell Alvord, a Portland-based developer with an unconventional path — I went from a 27-week coding bootcamp into a contract fullstack role that got my foot in the door, then earned a full-time position as a systems engineer where I spent two years building and maintaining infrastructure at scale. That combination of writing production code and owning the systems it runs on gives me a perspective most developers don't have.
          </p>
          <p>
            I'm looking for a fullstack or software engineering role where I can ship product and stay close to the infrastructure layer — ideally at a team that values engineers who understand the whole stack, not just their slice of it. Open to relocating for the right opportunity.
          </p>

          <a href="#contact" className='btn btn-primary'>Reach out!</a>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default About
