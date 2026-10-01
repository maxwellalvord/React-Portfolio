import React from 'react'
import { motion } from 'framer-motion'
import { fadeUp } from '../utils/animations'

// Renders as direct children of <section> so the `section > h5` / `section > h2` styles apply.
const SectionHeading = ({ eyebrow, title }) => (
  <>
    <motion.h5
      variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: false }}
    >
      {eyebrow}
    </motion.h5>
    <motion.h2
      variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: false }}
      transition={{ delay: 0.1 }}
    >
      {title}
    </motion.h2>
  </>
)

export default SectionHeading
