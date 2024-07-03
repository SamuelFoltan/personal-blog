import { useState } from 'react';
import facebookLogo from '../../assets/facebook.svg'; 
import twitterLogo from '../../assets/twitter.svg';
import instagramLogo from '../../assets/instagram.svg';
import linkedinLogo from '../../assets/linkedin.svg';
import './kontakt.styles.scss';

const Kontakt = () => {
  return (
    <div className="contact-information-container">
      <div className="contact-information">
        <h2>Kontakt</h2>
        <p><strong>Email:</strong> mkupec@jaguarlandrover.com</p>
        <p><strong>Mobil:</strong> +421 111 111 111</p>
        <div className="social-media">
          <p><strong>Sledujte ma na sociálnych sietiach:</strong></p>
          <ul>
            <li><a href="https://facebook.com" target="_blank"><img src={facebookLogo} alt="Facebook" /></a></li>
            <li><a href="https://twitter.com" target="_blank"><img src={twitterLogo} alt="Twitter" /></a></li>
            <li><a href="https://instagram.com" target="_blank"><img src={instagramLogo} alt="Instagram" /></a></li>
            <li><a href="https://linkedin.com" target="_blank"><img src={linkedinLogo} alt="LinkedIn" /></a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Kontakt;