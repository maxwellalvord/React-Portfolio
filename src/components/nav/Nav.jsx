import React, { useEffect, useRef, useState } from 'react'
import './nav.css'
import {TbHome} from 'react-icons/tb'
import {HiOutlineUser} from 'react-icons/hi'
import {BsCardChecklist} from 'react-icons/bs'
import {BsFolder} from 'react-icons/bs'
import {TiMessages} from 'react-icons/ti'
import {RiRobotLine} from 'react-icons/ri'

// `name` attributes are used as selectors by the browser tests.
const links = [
  { id: '#', name: 'home', label: 'Home', icon: TbHome },
  { id: '#about', name: 'about', label: 'About', icon: HiOutlineUser },
  { id: '#experience', name: 'experience', label: 'Experience', icon: BsCardChecklist },
  { id: '#portfolio', name: 'portfolio', label: 'Portfolio', icon: BsFolder },
  { id: '#process', name: 'process', label: 'How I work', icon: RiRobotLine },
  { id: '#contact', name: 'contact', label: 'Contact', icon: TiMessages }
]

const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

const prefersReducedMotion = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

const targetYFor = (id) => (id === '#' ? 0 : document.querySelector(id)?.offsetTop ?? 0)

// The last link whose section top has passed the middle of the viewport.
const sectionInView = () => {
  const mid = window.scrollY + window.innerHeight / 2
  let current = '#'
  for (const { id } of links) {
    if (id !== '#' && targetYFor(id) <= mid) current = id
  }
  return current
}

const Nav = () => {
  const [activeNav, setActiveNav] = useState('#')
  const frameRef = useRef(null)

  // Keep the active link in sync with manual scrolling, but not mid-animation.
  useEffect(() => {
    const onScroll = () => {
      if (frameRef.current === null) setActiveNav(sectionInView())
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    }
  }, [])

  const smoothScrollTo = (targetY, duration = 900) => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    if (prefersReducedMotion()) {
      frameRef.current = null
      window.scrollTo(0, targetY)
      return
    }

    const startY = window.scrollY
    const diff = targetY - startY
    let start = null

    const step = (timestamp) => {
      if (start === null) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      window.scrollTo(0, startY + diff * easeInOutCubic(progress))
      frameRef.current = progress < 1 ? requestAnimationFrame(step) : null
    }

    frameRef.current = requestAnimationFrame(step)
  }

  const scrollTo = (e, id) => {
    e.preventDefault()
    setActiveNav(id)
    window.history.replaceState(null, '', id)
    smoothScrollTo(targetYFor(id))
  }

  return (
    <nav>
      {links.map(({ id, name, label, icon: Icon }) => (
        <a
          key={id}
          href={id}
          name={name}
          aria-label={label}
          title={label}
          aria-current={activeNav === id ? 'location' : undefined}
          onClick={(e) => scrollTo(e, id)}
          className={activeNav === id ? 'active' : ''}
        >
          <Icon />
        </a>
      ))}
    </nav>
  )
}

export default Nav
