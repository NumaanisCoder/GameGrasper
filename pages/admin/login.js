import React, { useEffect, useRef, useState } from "react";
import style from "@/styles/account.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import Cookies from "js-cookie";




const provider = new GoogleAuthProvider();

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";


const signup = () => {
  const {enqueueSnackbar, closeSnackbar} = useSnackbar();
  const [error, setError] = useState({
    usernameError: "",
    emailError: "",
    passwordError: "",
  });
  const [submitButton, setsubmitButton] = useState("Login!");
  const router = useRouter();
  const [password, setPassword] = useState("");


  return (
    <div className={`${style.root}`}>
      <form
        autoComplete="off"
        autoSave="off"
        className={style.form}
        onSubmit={(e)=> e.preventDefault()}
      >
        <div className={style.formGroup}>
          <h1>Login</h1>
        </div>

        <div className={`${style.formGroup} ${style.emailFormGroup}`}>
        <input type="password" name="" id="password" onChange={(e)=>{
                setPassword(e.target.value)
              }} />
          <label className={style.emailLabel}></label>
          <p>{error.emailError}</p>
        </div>
       
        <div className={style.formGroup}>
        <button onClick={(e)=>{
                    if( password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD){
                        setsubmitButton("Logging")
                        Cookies.set("tokenofrelaxbyte",process.env.NEXT_PUBLIC_ADMIN_TOKEN,{expires : 365});
                        router.push("/admin")
                    }else{
                        setError({...error, emailError: "Wrong Password"})
                        setTimeout(() => {
                          setsubmitButton("Login!")
                        }, 1000);
                    }
                   
                  }}>{submitButton}</button>
        </div>
     
      </form>


    </div>
  );
};

export default signup;
