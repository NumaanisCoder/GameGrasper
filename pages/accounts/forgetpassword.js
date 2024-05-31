import React, { useState } from 'react';
import style from '@/styles/forgetpwdStyle.module.css';
import axios from 'axios';

const ForgetPassword = () => {
  const [submitLabel, setSubmitLabel] = useState("Send Link");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }
    
    setIsLoading(true);
    setSubmitLabel("Sending...");
    
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/resetpassword`, { email });
      const data = res.data;
      console.log(data);
      setMessage("Link has been sent to your email.");
    } catch (error) {
      console.error(error);
      setMessage("Error sending email. Please try again.");
    } finally {
      setIsLoading(false);
      setSubmitLabel("Send Link");
    }
  };

  return (
    <div className={style.root}>
      <form className={style.form} onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input 
          type="email" 
          id="email" 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Enter your email" 
          value={email}
        />
        <button type="submit" disabled={isLoading}>{submitLabel}</button>
        {message && <p className={style.message}>{message}</p>}
      </form>
    </div>
  );
};

export default ForgetPassword;
