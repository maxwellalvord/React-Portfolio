import React from 'react'
import './nav.css'
import {TbHome} from 'react-icons/tb'
import {HiOutlineUser} from 'react-icons/hi'
import {BsCardChecklist} from 'react-icons/bs'
import {BsFolder} from 'react-icons/bs'
import {TiMessages} from 'react-icons/ti'
import { useState } from 'react'

const Nav = () => {

  const [activeNav, setActiveNav] = useState('#')
 
  return (
    <nav>
      <a href="#" name="home" onClick={() => setActiveNav('#')} className={activeNav === '#' ? 'active' : ''}><TbHome /></a>
      <a href="#about" name="about" onClick={() => setActiveNav('#about')} className={activeNav === '#about' ? 'active' : ''}><HiOutlineUser /></a>
      <a href="#experience" name="experience" onClick={() => setActiveNav('#experience')} className={activeNav === '#experience' ? 'active' : ''}><BsCardChecklist /></a>
      <a href="#portfolio" name="portfolio" onClick={() => setActiveNav('#portfolio')} className={activeNav === '#portfolio' ? 'active' : ''}><BsFolder /></a>
      <a href="#contact" name="contact" onClick={() => setActiveNav('#contact')} className={activeNav === '#contact' ? 'active' : ''}><TiMessages /></a>
    </nav>
  )
}

export default Nav