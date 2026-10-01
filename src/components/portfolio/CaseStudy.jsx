import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { IoClose } from 'react-icons/io5'

const FOCUSABLE = 'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'

const CaseStudy = ({ project, onClose }) => {
  const closeRef = useRef(null)
  const dialogRef = useRef(null)
  const { caseStudy: cs } = project
  const titleId = `case-study-${project.id}`

  useEffect(() => {
    const previouslyFocused = document.activeElement
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'

    // Escape closes; Tab and Shift+Tab wrap around inside the dialog.
    const onKey = (e) => {
      if (e.key === 'Escape') return onClose()
      if (e.key !== 'Tab' || !dialogRef.current) return
      const focusable = dialogRef.current.querySelectorAll(FOCUSABLE)
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const inside = dialogRef.current.contains(document.activeElement)
      if (e.shiftKey && (document.activeElement === first || !inside)) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && (document.activeElement === last || !inside)) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKey)

    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      previouslyFocused?.focus?.()
    }
  }, [onClose])

  return (
    <motion.div
      className="case__backdrop"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        ref={dialogRef}
        className="case__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <button ref={closeRef} type="button" className="case__close" onClick={onClose} aria-label="Close case study">
          <IoClose />
        </button>

        <small className="case__eyebrow">Case Study</small>
        <h2 id={titleId} className="gradient-text">{project.title}</h2>

        <dl className="case__meta">
          <div><dt>Role</dt><dd>{cs.role}</dd></div>
          <div><dt>Stack</dt><dd>{cs.stack}</dd></div>
        </dl>

        <h4>Context</h4>
        <p>{cs.context}</p>

        <h4>The Problem</h4>
        <p>{cs.problem}</p>

        <h4>Approach &amp; Key Decisions</h4>
        <ul className="case__list">
          {cs.approach.map((item) => <li key={item}>{item}</li>)}
        </ul>

        <h4>Outcome</h4>
        <p>{cs.outcome}</p>

        <h4>What's Next</h4>
        <p>{cs.next}</p>

        <div className="case__cta">
          {project.links.filter(link => !link.internal).map(link => (
            <a key={link.label} href={link.href} className={link.primary ? 'btn btn-primary' : 'btn'} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default CaseStudy
