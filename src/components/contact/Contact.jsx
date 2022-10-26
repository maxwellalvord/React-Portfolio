import React from 'react'
import './contact.css'
import {AiOutlineMail} from 'react-icons/ai'
import {AiOutlineIssuesClose} from 'react-icons/ai'
import {BsFillTelephoneFill} from 'react-icons/bs'

const Contact = () => {
  return (
    <section id='contact'>
      <h5>Get In Touch</h5>
      <h2>Contact Me</h2>

      <div className="container contact__container">
        <div className="contact__options">
          <article className='contact__option'>
            <AiOutlineMail/>
            <h4>Email</h4>
            <h5>maxwellalvord@gmail.com</h5>
            <a href="mailto:maxwellalvord@gmail.com">Send a message</a>
          </article>
          <article className='contact__option'>
            <AiOutlineIssuesClose/>
            <h4>Github issues page</h4>
            <h5>A Link!</h5>
            <a href="https://github.com/maxwellalvord/React-Portfolio/issues">Send a message</a>
          </article>
          <article className='contact__option'>
            <BsFillTelephoneFill/>
            <h4>Phone Number</h4>
            <h5>(503)-830-9753</h5>
            <a href="tel:5038309753">5038309753</a>
          </article>
        </div>
        {/* END OF CONTACT OPTIONS */}
        <form action=""></form>
      </div>
    </section>
  )
}

export default Contact