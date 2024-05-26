// components/CookieConsent.js (updated)
import React from 'react';
import CookieConsent from 'react-cookie-consent';
import Cookies from 'js-cookie';

const CookieConsentComponent = () => {
  const handleAccept = () => {
    Cookies.set('cookieConsent', 'accepted', { expires: 365 });
  };

  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      cookieName="myCookieConsent"
      style={{ background: '#333' }}
      buttonStyle={{ color: '#fff', background: '#00bcd4' }}
      onAccept={handleAccept}
    >
      This website uses cookies to enhance the user experience.
    </CookieConsent>
  );
};

export default CookieConsentComponent;
