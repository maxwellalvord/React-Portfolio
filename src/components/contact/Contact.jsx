import React from 'react'
import './contact.css'
import {AiOutlineMail} from 'react-icons/ai'
import {AiOutlineIssuesClose} from 'react-icons/ai'
import {BsFillTelephoneFill} from 'react-icons/bs'
import { useRef } from 'react'
import emailjs from 'emailjs-com'

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_dtxl4zb', 'template_2tvx0um', form.current, '7CV7iHs4H4Sn8JO4G')

    e.target.reset()
  };
  return (
    <section id='contact'>
      <h5>Get In Touch</h5>
      <h2>Contact Me</h2>

      <div className="container contact__container">
        <div className="contact__options">
          <article className='contact__option'>
            <AiOutlineMail className='contact__option-icon'/>
            <h4>Email</h4>
            <h5>maxwellalvord@gmail.com</h5>
            <a href="mailto:maxwellalvord@gmail.com" target="_blank">Send a message</a>
          </article>
          <article className='contact__option'>
            <AiOutlineIssuesClose className='contact__option-icon'/>
            <h4>Github issues page</h4>
            <h5>A Link!</h5>
            <a href="https://github.com/maxwellalvord/React-Portfolio/issues" target="_blank">Send a message</a>
          </article>
          <article className='contact__option'>
            <BsFillTelephoneFill className='contact__option-icon'/>
            <h4>Phone Number</h4>
            <h5>(503)-830-9753</h5>
            <a href="tel:5038309753">5038309753</a>
          </article>
        </div>
        {/* END OF CONTACT OPTIONS */}
        <form ref={form} onSubmit={sendEmail}>
          <input type="text" name='name' placeholder='Your Full Name' required />
          <input type="email" name='email' placeholder='Your Email' required />
          <textarea name='message' rows="7" placeholder='Your Message' required ></textarea>
          <button type='submit' className='btn btn-primary'>Send Message</button>
        </form>
      </div>
    </section>
  )
}

export default Contact