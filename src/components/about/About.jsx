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
            <img src={ME} alt='About' />
          </div>
        </div>

        <div className="about__content">
          <div className="about__cards">
            <article className='about__card'>
              <CgAwards className='about__icon' />
              <h2>Experience</h2>
              <h5>May 2022 - Oct. 2022</h5>
              <small>27 week Bootcamp (<a href="https://www.epicodus.com/">epicodus</a>)</small>
              <h5>Oct. 2022 - Mar. 2023</h5>
              <small>Full stack developer (<a href='https://opineschool.com'>Opine</a>)</small>
              <h5>August 2023 - Present</h5>
              <small>Systems Engineer (<a href='https://www.newestech.com'>New West Technologies</a>)</small>
            </article>
            <article className='about__card'>
              <BsFolder2Open className='about__icon' />
              <h5>Projects</h5>
              <small>70+ completed</small>
            </article>
          </div>

          <p>
            My name is Maxwell Alvord and I currently live in Portland Oregon. I'm excited to see where my passion for problem solving will take me as I'm open to moving for the right position. If I'm not looking for a hole in the wall foodcart or playing with my dog I tend to spend my free time perusing new technology tutorials on youtube.
          </p>

          <a href="#contact" className='btn btn-primary'>Reach out!</a>
        </div>
      </div>
    </section>
  )
}

export default About