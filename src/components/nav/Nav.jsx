import React from 'react'
import './nav.css'
import {TbHome} from 'react-icons/tb'
import {HiOutlineUser} from 'react-icons/hi'
import {BsCardChecklist} from 'react-icons/bs'
import {BsFolder} from 'react-icons/bs'
import {TiMessages} from 'react-icons/ti'

const Nav = () => {
  return (
    <nav>
      <a href="#"><TbHome /></a>
      <a href="#about"><HiOutlineUser /></a>
      <a href="#experience"><BsCardChecklist /></a>
      <a href="#portfolio"><BsFolder /></a>
      <a href="#contact"><TiMessages /></a>
    </nav>
  )
}

export default Nav