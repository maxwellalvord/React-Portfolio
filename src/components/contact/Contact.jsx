import React, { useRef, useState } from 'react'
import './contact.css'
import {AiOutlineMail} from 'react-icons/ai'
import {BsLinkedin} from 'react-icons/bs'
import {BsFillTelephoneFill} from 'react-icons/bs'
import emailjs from '@emailjs/browser'
import { EMAIL, PHONE, SOCIAL } from '../../data/links'

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const sendEmail = async (e) => {
    e.preventDefault();

    // Honeypot: people never see this field, bots fill it in. Pretend it worked.
    if (form.current.elements.website.value) {
      form.current.reset()
      setStatus('sent')
      return
    }

    setStatus('sending')
    try {
      await emailjs.sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        form.current,
        { publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY }
      )
      form.current.reset()
      setStatus('sent')
    } catch (err) {
      console.error('Contact form failed to send:', err)
      setStatus('error')
    }
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
            <h5>{EMAIL}</h5>
            <a href={`mailto:${EMAIL}`} target="_blank" rel="noopener noreferrer">Send a message</a>
          </article>
          <article className='contact__option'>
            <BsLinkedin className='contact__option-icon'/>
            <h4>LinkedIn</h4>
            <h5>in/maxwellalvord</h5>
            <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer">Connect with me</a>
          </article>
          <article className='contact__option'>
            <BsFillTelephoneFill className='contact__option-icon'/>
            <h4>Phone Number</h4>
            <h5>{PHONE.display}</h5>
            <a href={`tel:${PHONE.tel}`}>{PHONE.tel}</a>
          </article>
        </div>
        <form ref={form} onSubmit={sendEmail}>
          <input type="text" name='name' placeholder='Your Full Name' aria-label='Your full name' maxLength={100} required />
          <input type="email" name='email' placeholder='Your Email' aria-label='Your email' maxLength={254} required />
          <textarea name='message' rows="7" placeholder='Your Message' aria-label='Your message' maxLength={5000} required></textarea>
          <input type="text" name='website' className='contact__hp' tabIndex={-1} autoComplete='off' aria-hidden='true' />
          <button type='submit' className='btn btn-primary' disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send Message'}
          </button>
          <p className={`contact__status contact__status--${status}`} role="status" aria-live="polite">
            {status === 'sent' && "Thanks! Your message is on its way, and I'll get back to you soon."}
            {status === 'error' && `Sorry, your message didn't send. Please email me directly at ${EMAIL}.`}
          </p>
        </form>
      </div>
    </section>
  )
}

export default Contact
