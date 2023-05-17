import React from 'react';

function ContactForm({header}) {
  return (
    <div className='contact-form-container'>
      <h1 className='contact-form-header'>{header}</h1>
      <div className='contact-form-subheader'>Want to contact me? Feel free to send me a message below or to rjcalamari@gmail.com to get a proposal, ask a question, or just say hi!</div>
      <form className='contact-form-container'
      action="https://formspree.io/f/mqkjkvry"
      method="POST" style={{textAlign: 'left'}}
      >
      <div className='contact-form-upper'>
        <div className='contact-form-block'>
          Your email:
          <input placeholder='Enter your email address' className='contact-form-email contact-form-text' type="email" name="email" />
        </div>
        <div className='contact-form-block'>
            Your name:
            <input placeholder='Enter your name' className='contact-form-email contact-form-text' type="name" name="name" />
        </div>

      </div>
      <div className='contact-form-lower'>
        <div>
            Your message:
            <textarea placeholder='Enter your message' className='contact-form-message contact-form-text' name="message"></textarea>
        </div>
      </div>
      
      <button type="submit" className='main-button' style={{marginBottom:'130px', height: '60px', width: '250px', fontSize:'19px'}}>Send!</button>
      </form>
    </div>
    
  );
}
export default ContactForm;