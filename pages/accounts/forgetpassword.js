import React, { useState } from 'react';
import style from '@/styles/forgetpwdStyle.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';


const ForgetPassword = () => {
  const [submitLabel, setSubmitLabel] = useState("Send Link");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const router = useRouter();
  const {enqueueSnackbar, closeSnackbar} = useSnackbar();

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
      router.push('/accounts/login');
      setMessage("Link has been sent to your email.");
      enqueueSnackbar("Link has been sent to your email!",{variant:"success"});
    } catch (error) {
     if(error.response.data.status == 400){
       setMessage("Email is Not registered !");

     }
    } finally {
      setIsLoading(false);
      setSubmitLabel("Send Link");
    }
  };

  return (
    <div className={style.root}>
      <form className={style.form} onSubmit={handleSubmit}>
        <input 
          type="email" 
          id="email" 
          onChange={(e) => setEmail(e.target.value)} 
  
          value={email}
        />
        <label htmlFor="email" className={style.lableEmail}></label>
        <button type="submit" disabled={isLoading}>{submitLabel}</button>
        {message && <p className={style.message}>{message}</p>}
      </form>
    </div>
  );
};

export default ForgetPassword;
