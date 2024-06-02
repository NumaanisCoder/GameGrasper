import React, { useEffect, useRef, useState } from "react";
import style from "@/styles/account.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import Cookies from "js-cookie";



import { getAnalytics } from "firebase/analytics";


const provider = new GoogleAuthProvider();

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";


const signup = () => {

  const router = useRouter();
  
  const SignInWithGoogle = () =>{
    const auth = getAuth();
signInWithPopup(auth, provider)
  .then(async (result) => {
  
    const user = result.user;
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/GoogleAuth/Sign`, user);
        console.log('API response:', response);
        router.back();
      } catch (error) {
        console.error('API error:', error);
      }
    })
    .catch((error) => {
      console.error('Sign-in error:', error);
    });
router.back();
  }

  const firebaseConfig = {
    apiKey: "AIzaSyCYMZgFyW4i9VPapCOFxpjn-0Apjchf3Wg",
    authDomain: "gamegrasper-3e636.firebaseapp.com",
    projectId: "gamegrasper-3e636",
    storageBucket: "gamegrasper-3e636.appspot.com",
    messagingSenderId: "828323947217",
    appId: "1:828323947217:web:edddc89704b65bb87c1bf0",
    measurementId: "G-3FW4DZY8TX"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const cookieConsentStatus = Cookies.get('cookieConsent');
  console.log(cookieConsentStatus);
  const [FormValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    usernameError: "",
    emailError: "",
    passwordError: "",
  });
  const [submitButton, setsubmitButton] = useState("Login!");

  function inputHandler(e) {
    const { name, value } = e.target;


    setFormValues({ ...FormValues, [name]: value });
    setError({ emailError: "", passwordError: "" });
  }

  async function formHandler(e) {
    if(cookieConsentStatus !== "accepted"){
      setsubmitButton("You must Accept Cookies!");
      return;
    }
    e.preventDefault();
    setsubmitButton("logining...");
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(FormValues),
    });
    const data = await response.json();
    if (data.status == 404) {
      setsubmitButton("Login");
      setError({ emailError: "Email is not registerd" });
    } else if (data.status == 402) {
      setsubmitButton("Login");
      setError({ passwordError: "Password Not matched" });
    } else if (data.status == 200) {
      Cookies.set("token",data.token, {expires: 7})
      setsubmitButton("Loginned Successfully!");
      router.push('/');
    }
  }




  return (
    <div className={style.root}>
      <form
        autoComplete="off"
        autoSave="off"
        className={style.form}
        onSubmit={formHandler}
      >
        <div className={style.formGroup}>
          <h1>Login</h1>
        </div>

        <div className={`${style.formGroup} ${style.emailFormGroup}`}>
          <input
          
            type="email"
            name="email"
            id="email"
            className={style.emailInput}
            value={FormValues.email}
            autoComplete="off"
            onChange={inputHandler}
            required
          />
          <label className={style.emailLabel}></label>
          <p>{error.emailError}</p>
        </div>
        <div className={style.formGroup}>
          <input
            type="password"
            name="password"
            id="password"
            className={style.passwordInput}
            value={FormValues.password}
            autoComplete="off"
            onChange={inputHandler}
            required
          />
          <label className={style.passwordLabel}></label>
          <p>{error.passwordError}</p>
        </div>
        <div className={style.formGroup}>
          <button className={style.button}>{submitButton}</button>
        </div>
        <div className={style.formGroup}>
          <a href="/accounts/forgetpassword">Forget password ? </a>
        </div>
      </form>

      <div className={style.navD}>
      <button onClick={SignInWithGoogle}>
        <img src="/google.png" alt="" />
        SignIn With Google
        </button>
        <Link href={'/accounts/signup'}>
              Create New Account
        </Link>
      </div>
    </div>
  );
};

export default signup;
