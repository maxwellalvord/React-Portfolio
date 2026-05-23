import React from 'react'
import './header.css'
import CTA from './CTA'
import ME from '../../assets/me.png'
import HeaderSocials from './HeaderSocials'
import { motion } from 'framer-motion'
import useTypewriter from '../../hooks/useTypewriter'

const roles = ['Fullstack Developer', 'Systems Engineer', 'Problem Solver']

const Header = () => {
  const typed = useTypewriter(roles)

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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          <CTA />
        </motion.div>

        <HeaderSocials />

        <motion.div
          className="me"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <img src={ME} alt="Me" />
        </motion.div>

        <a href="#contact" className='scroll__down'>Scroll Down</a>
      </div>
    </header>
  )
}

export default Header
