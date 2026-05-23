import React, { useState } from 'react'
import './nav.css'
import {TbHome} from 'react-icons/tb'
import {HiOutlineUser} from 'react-icons/hi'
import {BsCardChecklist} from 'react-icons/bs'
import {BsFolder} from 'react-icons/bs'
import {TiMessages} from 'react-icons/ti'

const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

const smoothScrollTo = (targetY, duration = 900) => {
  const startY = window.scrollY
  const diff = targetY - startY
  let start = null

  const step = (timestamp) => {
    if (!start) start = timestamp
    const elapsed = timestamp - start
    const progress = Math.min(elapsed / duration, 1)
    window.scrollTo(0, startY + diff * easeInOutCubic(progress))
    if (progress < 1) requestAnimationFrame(step)
  }

  requestAnimationFrame(step)
}

const Nav = () => {
  const [activeNav, setActiveNav] = useState('#')

  const scrollTo = (e, id) => {
    e.preventDefault()
    setActiveNav(id)
    const targetY = id === '#' ? 0 : document.querySelector(id)?.offsetTop ?? 0
    smoothScrollTo(targetY)
  }

  return (
    <nav>
      <a href="#" onClick={(e) => scrollTo(e, '#')} className={activeNav === '#' ? 'active' : ''}><TbHome /></a>
      <a href="#about" onClick={(e) => scrollTo(e, '#about')} className={activeNav === '#about' ? 'active' : ''}><HiOutlineUser /></a>
      <a href="#experience" onClick={(e) => scrollTo(e, '#experience')} className={activeNav === '#experience' ? 'active' : ''}><BsCardChecklist /></a>
      <a href="#portfolio" onClick={(e) => scrollTo(e, '#portfolio')} className={activeNav === '#portfolio' ? 'active' : ''}><BsFolder /></a>
      <a href="#contact" onClick={(e) => scrollTo(e, '#contact')} className={activeNav === '#contact' ? 'active' : ''}><TiMessages /></a>
    </nav>
  )
}

export default Nav
