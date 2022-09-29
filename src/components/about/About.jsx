import React from 'react'
import './about.css'
import ME from '../../assets/sarahmax.jpg'
import {CgAwards} from 'react-icons/cg'
import {BsFolder2Open} from 'react-icons/bs'

const About = () => {
  return (
    <section id='about'>
      <h5>Get To Know</h5>
      <h2>About Me</h2>

      <div className='container about__container'>
        <div className="about__me">
          <div className="about__me-image">
            <img src={ME} alt='About Image' />
          </div>
        </div>

        <div className="about__content">
          <div className="about__cards">
            <article className='about__card'>
              <CgAwards className='about__icon' />
              <h5>Experience</h5>
              <small>27 week Bootcamp (<a href="https://www.epicodus.com/">epicodus</a>)</small>
            </article>
            <article className='about__card'>
              <BsFolder2Open className='about__icon' />
              <h5>Projects</h5>
              <small>70+ completed</small>
            </article>
          </div>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste maxime omnis vel, repellat culpa dignissimos. Debitis animi impedit iusto ea rem nisi, temporibus libero sit asperiores fuga, voluptate ratione ad.
          </p>

          <a href="#contact" className='btn btn-primary'></a>
        </div>
      </div>
    </section>
  )
}

export default About