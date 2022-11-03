import React from 'react'
import './footer.css'
import {AiFillLinkedin} from 'react-icons/ai'
import {AiFillInstagram} from 'react-icons/ai'
import {AiFillTwitterCircle} from 'react-icons/ai'

const Footer = () => {
  return (
    <footer>
      <a href="#"className='footer__logo'>Maxwell Alvord</a>

      <ul className='permalinks'>
        <li><a href="#">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#experience">Experience</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#portfolio">Portfolio</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      <div className="footer__socials">
        <a href="https://www.linkedin.com/in/maxwellalvord/"><AiFillLinkedin/></a>
        <a href="https://www.instagram.com/max_alvord/"><AiFillInstagram/></a>
        <a href="https://twitter.com/AlvordMax"><AiFillTwitterCircle/></a>
      </div>
      <div className="footer__copyright">
        <small>&copy; Maxwell Alvord. All rights reserved.</small>
      </div>
    </footer>
  )
}

export default Footer