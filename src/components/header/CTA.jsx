import React from 'react'
import CV from '../../assets/Resume_CV.pdf'

const CTA = () => {
  return (
    <div className='cta'>
      <a href={CV} download className='btn'>Download resume</a>
      <a href="#contact" className='btn btn-primary'>Where to Reach Me</a>
    </div>
  )
}

export default CTA