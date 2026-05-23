import React from 'react'
import './portfolio.css'
import IMG1 from '../../assets/ECOM-VISION.png'
import IMG2 from '../../assets/Build-API.png'
import IMG3 from '../../assets/Money-Manager.png'
import IMG4 from '../../assets/societyDark.PNG'
import { motion } from 'framer-motion'
import { containerVariants, itemVariants, fadeUp } from '../../utils/animations'

const data = [
  {
    id: 1,
    image: IMG1,
    title: "MERN Finance Dashboard",
    subtitle: "ECOM-VISION",
    description: "Full-stack analytics dashboard with regression models and recharts data visualization.",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    github: "https://github.com/maxwellalvord/MERN-Finance-Dashboard",
    demo: "https://github.com/maxwellalvord/MERN-Finance-Dashboard/blob/main/README.md"
  },
  {
    id: 2,
    image: IMG2,
    title: "Building an API",
    subtitle: null,
    description: "RESTful API built with Node and Express, serving structured JSON data with full CRUD operations.",
    tags: ["Node.js", "Express", "REST API"],
    github: "https://github.com/maxwellalvord/Building-an-Api",
    demo: "https://github.com/maxwellalvord/Building-an-Api/blob/main/README.md"
  },
  {
    id: 3,
    image: IMG3,
    title: "Money Manager",
    subtitle: "Live",
    description: "Real-time budgeting web app for tracking income and expenses with persistent data.",
    tags: ["React", "Firebase", "CSS"],
    github: "https://github.com/maxwellalvord/Money-Manager",
    demo: "https://moneymanager.live"
  },
  {
    id: 4,
    image: IMG4,
    title: "The Society",
    subtitle: null,
    description: "Full-stack MERN social platform with JWT authentication, user profiles, and post management.",
    tags: ["MongoDB", "React", "Node.js", "JWT"],
    github: "https://github.com/maxwellalvord/MERN-APP-full-package",
    demo: "https://github.com/maxwellalvord/MERN-APP-full-package#readme"
  }
]

const Portfolio = () => {
  return (
    <section id='portfolio'>
      <motion.h5
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: false }}
      >
        My Recent Work
      </motion.h5>
      <motion.h2
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: false }}
        transition={{ delay: 0.1 }}
      >
        Portfolio
      </motion.h2>

      <motion.div
        className='container portfolio__container'
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
      >
        {data.map(({ id, image, title, subtitle, description, tags, github, demo }) => (
          <motion.article key={id} className='portfolio__item' variants={itemVariants}>
            <div className="portfolio__item-image">
              <img src={image} alt={title} />
            </div>

            <div className="portfolio__item-body">
              <div className="portfolio__item-header">
                <h3>
                  {title}
                  {subtitle && <span className="portfolio__subtitle">{subtitle}</span>}
                </h3>
              </div>

              <p className="portfolio__description">{description}</p>

              <div className="portfolio__tags">
                {tags.map(tag => (
                  <span key={tag} className="portfolio__tag">{tag}</span>
                ))}
              </div>

              <div className="portfolio__item-cta">
                <a href={github} className='btn' target='_blank' rel='noopener noreferrer'>GitHub</a>
                {demo && (
                  <a href={demo} className='btn btn-primary' target='_blank' rel='noopener noreferrer'>
                    {demo.includes('moneymanager.live') ? 'Live Site' : 'README'}
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}

export default Portfolio
