import React from 'react'
import './header.css'
import CTA from './CTA'
import ME from '../../assets/me.png'
import HeaderSocials from './HeaderSocials'
import { motion, useReducedMotion } from 'framer-motion'
import { FaApple } from 'react-icons/fa'
import { RiRobotLine } from 'react-icons/ri'
import { BsHddNetwork, BsBarChartLine, BsArrowUpRight } from 'react-icons/bs'
import useTypewriter from '../../hooks/useTypewriter'

const roles = ['Fullstack Developer', 'Systems Engineer', 'AI Workflow Builder', 'Problem Solver']

// Proof points that float beside the photo on wide screens. Each links to the evidence.
const chips = [
  { side: 'left', pos: 'top', icon: FaApple, eyebrow: 'Ascoé', title: 'Live on the App Store', href: 'https://apps.apple.com/ca/app/asco%C3%A9/id6781621825', external: true },
  { side: 'left', pos: 'bottom', icon: BsHddNetwork, eyebrow: 'Homelab', title: 'Proxmox · pfSense · Docker', href: '#homelab' },
  { side: 'right', pos: 'top', icon: RiRobotLine, eyebrow: 'Agent Team', title: 'Multi-agent AI workflow', href: '#process' },
  { side: 'right', pos: 'bottom', icon: BsBarChartLine, eyebrow: 'RAG Research', title: '4 retrieval methods tested', href: '#portfolio' }
]

const Header = () => {
  const typed = useTypewriter(roles)
  const reduceMotion = useReducedMotion()

  return (
    <header>
      <div className="container header__container">
        <motion.h5
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Hello I'm
        </motion.h5>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          Maxwell Alvord
        </motion.h1>

        <motion.h5
          className='text-light typewriter'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {typed}<span className='cursor'>|</span>
        </motion.h5>

        <motion.p
          className='header__pitch'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.48 }}
        >
          I ship products and own the infrastructure they run on.
          <span className='header__badge'><span className='header__badge-dot' />Portland · Open to fullstack &amp; SWE roles</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          <CTA />
        </motion.div>

        <HeaderSocials />

        <div className="header__stage">
          <motion.div
            className="me"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <img src={ME} alt="Maxwell Alvord" />
          </motion.div>

          {chips.map(({ side, pos, icon: Icon, eyebrow, title, href, external }, i) => (
            <motion.a
              key={eyebrow}
              href={href}
              className={`header__chip header__chip--${side} header__chip--${pos}`}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              initial={{ opacity: 0, x: side === 'left' ? -30 : 30 }}
              animate={reduceMotion
                ? { opacity: 1, x: 0 }
                : { opacity: 1, x: 0, y: [0, -6, 0] }}
              transition={{
                opacity: { duration: 0.6, delay: 0.8 + i * 0.12 },
                x: { duration: 0.6, delay: 0.8 + i * 0.12, ease: [0.25, 0.4, 0.25, 1] },
                y: { duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: 1.5 + i * 0.4 }
              }}
            >
              <span className="header__chip-icon"><Icon /></span>
              <span className="header__chip-text">
                <small>{eyebrow}</small>
                <strong>{title}</strong>
              </span>
              <BsArrowUpRight className="header__chip-arrow" />
            </motion.a>
          ))}
        </div>

        <a href="#contact" className='scroll__down'>Scroll Down</a>
      </div>
    </header>
  )
}

export default Header
