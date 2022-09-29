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
      <a href="#" onClick={() => setActiveNav('#')} className={activeNav === '#' ? 'active' : ''}><TbHome /></a>
      <a href="#about" onClick={() => setActiveNav('#about')} className={activeNav === '#about' ? 'active' : ''}><HiOutlineUser /></a>
      <a href="#experience" onClick={() => setActiveNav('#experience')} className={activeNav === '#experience' ? 'active' : ''}><BsCardChecklist /></a>
      <a href="#portfolio" onClick={() => setActiveNav('#portfolio')} className={activeNav === '#portfolio' ? 'active' : ''}><BsFolder /></a>
      <a href="#contact" onClick={() => setActiveNav('#contact')} className={activeNav === '#contact' ? 'active' : ''}><TiMessages /></a>
    </nav>
  )
}

export default Nav