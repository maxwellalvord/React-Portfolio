import React from 'react'
import {BsLinkedin} from 'react-icons/bs'
import { SOCIAL } from '../../data/links'
import {FaGithub} from 'react-icons/fa'

const HeaderSocials = () => {
  return (
    <div className='header__socials'>
      <a href={SOCIAL.linkedin} name="linkedIn" aria-label="LinkedIn" target='_blank' rel='noopener noreferrer'><BsLinkedin /></a>
      <a href={SOCIAL.github} name="gitHub" aria-label="GitHub" target='_blank' rel='noopener noreferrer'><FaGithub /></a>
    </div>
  )
}

export default HeaderSocials