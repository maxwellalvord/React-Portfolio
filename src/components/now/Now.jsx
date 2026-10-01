import React from 'react'
import './now.css'
import { motion } from 'framer-motion'

// Update this list whenever priorities change; keep `updated` current.
const updated = 'October 2026'

const items = [
  { label: 'Shipping', text: 'Small-Business Site Frame v1.0, an open-source template for local business sites' },
  { label: 'Launched', text: 'Ascoé, now live on the iOS App Store' },
  { label: 'Building', text: 'A native Expo app for Money Manager' },
  { label: 'Researching', text: 'Retrieval quality for RAG systems: embeddings, chunking, hybrid search' }
]

const Now = () => {
  return (
    <motion.aside
      className="container now"
      aria-labelledby="now-title"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <div className="now__head">
        <span className="now__pulse" aria-hidden="true" />
        <h3 id="now-title">Now</h3>
        <small className="text-light">Updated {updated}</small>
        <span className="now__open">Open to fullstack &amp; software engineering roles</span>
      </div>
      <ul className="now__list">
        {items.map(({ label, text }) => (
          <li key={label}>
            <span className="now__label">{label}</span>
            <span>{text}</span>
          </li>
        ))}
      </ul>
    </motion.aside>
  )
}

export default Now
