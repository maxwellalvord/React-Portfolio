import React from 'react'
import './footer.css'
import {AiFillLinkedin} from 'react-icons/ai'
import {AiFillInstagram} from 'react-icons/ai'
import {AiFillTwitterCircle} from 'react-icons/ai'
import { SOCIAL } from '../../data/links'
import {AiFillGithub} from 'react-icons/ai'

const Footer = () => {
  return (
    <footer>
      <a href="#" className='footer__logo'>Maxwell Alvord</a>

      <ul className='permalinks'>
        <li><a href="#">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#experience">Experience</a></li>
        <li><a href="#portfolio">Portfolio</a></li>
        <li><a href="#process">How I Work</a></li>
        <li><a href="#homelab">Homelab</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      <div className="footer__socials">
        <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><AiFillLinkedin/></a>
        <a href={SOCIAL.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><AiFillGithub/></a>
        <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><AiFillInstagram/></a>
        <a href={SOCIAL.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter"><AiFillTwitterCircle/></a>
      </div>
      <div className="footer__copyright">
        <small>&copy; Maxwell Alvord. All rights reserved.</small>
      </div>
    </footer>
  )
}

export default Footer