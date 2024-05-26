import React, { useState } from "react";
import style from "@/styles/account.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import Cookies from "js-cookie";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const provider = new GoogleAuthProvider();

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


const signup = () => {
  const router = useRouter();
  
  const SignInWithGoogle = () =>{
    const auth = getAuth();
signInWithPopup(auth, provider)
  .then(async (result) => {
  
    // const credential = GoogleAuthProvider.credentialFromResult(result);
    // const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    const data  = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/GoogleAuth/Sign`,user);

    if(data.data.success){
      router.push(localStorage.getItem("PreviousPath"));
    }
    
    

  }).catch((error) => {
    // Handle Errors here.
    console.log(error);
    // ...
  });
  router.push(localStorage.getItem("PreviousPath"));

  }

  const firebaseConfig = {
    apiKey: "AIzaSyBPv7Si1aJboM9FilIG-XKoxz0yKpNnnmA",
    authDomain: "studymania-bece4.firebaseapp.com",
    databaseURL: "https://studymania-bece4-default-rtdb.firebaseio.com",
    projectId: "studymania-bece4",
    storageBucket: "studymania-bece4.appspot.com",
    messagingSenderId: "605803392646",
    appId: "1:605803392646:web:d903a9cec11f65f56fab07",
    measurementId: "G-5NJ8PXRPDC"
  };

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

    console.log(data);
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
            placeholder="Email"
            value={FormValues.email}
            autoComplete="off"
            onChange={inputHandler}
            required
          />
          <p>{error.emailError}</p>
        </div>
        <div className={style.formGroup}>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={FormValues.password}
            autoComplete="off"
            onChange={inputHandler}
            required
          />
          <p>{error.passwordError}</p>
        </div>
        <div className={style.formGroup}>
          <button className={style.button}>{submitButton}</button>
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
