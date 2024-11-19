"use client";

import React, { useEffect, useRef, useState } from "react";
import { text } from "./style";

export default function Recaptcha({ sitekey, callback }) {
  const recaptchaRef = useRef(null);
  const [isRecaptchaLoaded, setIsRecaptchaLoaded] = useState(false);

  // Define the component function to be called when reCAPTCHA loads
  const onRecaptchaLoad = () => {
    setTimeout(() => {
      setIsRecaptchaLoaded(true);
    }, 3000);
  };

  useEffect(() => {
    // Assign the component function to the window callback
    window.onRecaptchaLoad = onRecaptchaLoad;

    if (!window.grecaptcha) {
      // Load the script only if it's not already available
      const script = document.createElement("script");
      script.src =
        "https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    } else if (window.grecaptcha && window.grecaptcha.render) {
      // If reCAPTCHA is already loaded, call the function directly
      onRecaptchaLoad();
    }

    // Clean up the global callback on component unmount
    return () => {
      window.onRecaptchaLoad = null;
    };
  }, []);

  useEffect(() => {
    if (isRecaptchaLoaded && recaptchaRef.current) {
      window.grecaptcha.render(recaptchaRef.current, {
        sitekey: sitekey,
        callback: callback, // Callback function to handle the token
      });
    }
  }, [isRecaptchaLoaded]);

  return (
    <div>
      {!isRecaptchaLoaded ? (
        <div className={`${text.lg} font-medium text-green-800`}>
          Loading reCAPTCHA...
        </div>
      ) : (
        <div ref={recaptchaRef}></div>
      )}
    </div>
  );
}
