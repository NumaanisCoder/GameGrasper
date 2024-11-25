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
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";


const signup = () => {
  const {enqueueSnackbar, closeSnackbar} = useSnackbar();
  const isDarkMode = useSelector(state => state.theme.isDarkMode);
  let previousPath = Cookies.get("BlogPreviousPath");




  useEffect(() => {
     previousPath = Cookies.get();
    console.log("previousPath in useEffect:", previousPath);
  }, []);
  

  const router = useRouter();
  
  const SignInWithGoogle = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        console.log("USER FROM GOOGLE ", user);
  
        try {
          // Replacing axios with fetch
          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/GoogleAuth/Sign`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
          });
  
          const data = await response.json(); // Parsing the response as JSON
          
          if (!response.ok) {
            throw new Error('Failed to authenticate with Google');
          }
  
          console.log('API response:', data);
          
          // Navigate after successful API response
          if (previousPath) {
            router.push(previousPath);  // Redirect to the previous path if available
          } else {
            router.push('/defaultPath');  // Fallback to a default path if previousPath is not found
          }
  
        } catch (error) {
          console.error('API error:', error);
        }
      })
      .catch((error) => {
        console.error('Sign-in error:', error);
      });
  };
  
  

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
      enqueueSnackbar("Email Not Found",{variant:"error"});
      setError({ emailError: "Email is not registerd" });
    } else if (data.status == 402) {
      setsubmitButton("Login");
      enqueueSnackbar("Incorrect Password",{variant:"error"});
      setError({ passwordError: "Password Not matched" });
    } else if (data.status == 200) {
      Cookies.set("token",data.token, {expires: 7})
      setsubmitButton("Loginned Successfully!");
      enqueueSnackbar("Logging In !!",{variant:"info"});
      router.push('/');
    }
  }




  return (
    <div className={`${style.root} ${isDarkMode ? style.darkRoot : ""}`}>
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
          <Link href="/accounts/forgetpassword">Forget password ? </Link>
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
