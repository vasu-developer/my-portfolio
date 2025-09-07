// src/components/Contact.jsx

import React, { useState } from 'react';
import styles from './Contact.module.css';

const Contact = () => {
  // IMPORTANT: Replace with your own access key from web3forms.com
  const ACCESS_KEY = '210faed1-d647-4d18-aba5-eed140455076';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult('Sending....');
    const data = new FormData(e.target);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      });

      const json = await response.json();
      if (json.success) {
        setResult('Form Submitted Successfully!');
        e.target.reset(); // Reset form fields
        setFormData({ name: '', email: '', message: '' });
      } else {
        console.log('Error from Web3Forms', json);
        setResult(json.message);
      }
    } catch (error) {
      console.log('Fetch Error', error);
      setResult('Something went wrong!');
    }
  };


  return (
    <section id="contact" className={styles.contact}>
      <h2 className={styles.sectionTitle}>Get In Touch</h2>
      <p className={styles.subtitle}>
        Have a question or want to work together? Leave your details and I'll get back to you as soon as possible.
      </p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="hidden" name="access_key" value={ACCESS_KEY} />
        
        <div className={styles.inputGroup}>
          <label htmlFor="name">Full Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name}
            onChange={handleChange}
            required 
          />
        </div>
        
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email Address</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange}
            required 
          />
        </div>
        
        <div className={styles.inputGroup}>
          <label htmlFor="message">Message</label>
          <textarea 
            id="message" 
            name="message" 
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        
        <button type="submit" className={styles.submitButton}>Send Message</button>
      </form>
      {result && <p className={styles.formStatus}>{result}</p>}
    </section>
  );
};

export default Contact;