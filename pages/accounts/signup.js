import React, { useState } from 'react'
import style from '@/styles/account.module.css';
import axios from 'axios';
import { useRouter} from 'next/router';
import Link from 'next/link';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const provider = new GoogleAuthProvider();

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";




const signup = () => {
  let signinWithGoogleSucess = false;
  const router = useRouter();

  const SignInWithGoogle = () =>{
    const auth = getAuth();
signInWithPopup(auth, provider)
  .then(async (result) => {
  
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;

   await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/GoogleAuth/Sign`,user);
    router.back();
  }).catch((error) => {
    // Handle Errors here.
    console.log(error);
    // ...
  });
  router.back();
  }





    const [FormValues, setFormValues] = useState({username: "", email:"", password:""});
    const [error, setError] = useState({usernameError:"", emailError:"", passwordError:""});
    const [submitButton, setsubmitButton] = useState("Sign up!");


    function inputHandler(e){
        const {name, value} = e.target;
        setFormValues({...FormValues, [name]:value});
        console.log(FormValues);
    }

    async function formHandler(e){
        e.preventDefault();
        setsubmitButton("Signing Up...")
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/signup`, FormValues);
        const data = res.data;
        if(data.status == 409){
          setsubmitButton("Sign up!")
          setError({usernameError:"username is already taken"})
        }
        if(data.status == 402){
          setsubmitButton("Sign Up!")
          setError({emailError:"Email is already registerd"})
        }
        if(data.status == 200){
          setsubmitButton("Registerd Suceessfully!");
          router.push('/');
        }

    }
  return (
    <div className={style.root}>
      <form className={style.form} onSubmit={formHandler}>
        <div className={style.formGroup}>
        <h1>Sign up</h1>
        </div>
        <div className={style.formGroup}>
            <input type="text" name="username" value={FormValues.username}  autoComplete="off"  onChange={inputHandler} required/>
            <label className={style.usernamelabel}></label>
            <p>{error.usernameError}</p>
        </div>
        <div className={`${style.formGroup} ${style.emailFormGroup}`}>
            <input type="email" name="email" id="email"   value={FormValues.email} autoComplete="off" onChange={inputHandler}  required/>
            <label className={style.emailLabel}></label>
            <p>{error.emailError}</p>
        </div>
        <div className={style.formGroup}>
            <input type="password" name="password" id="password" value={FormValues.password}  autoComplete="off" onChange={inputHandler}  required/>
            <label className={style.passwordLabel}></label>
            <p></p>
        </div>
        <div className={style.formGroup}>
            <button className={style.button} >{submitButton}</button>
        </div>

      </form>

      <div className={style.navD}>
      <button onClick={SignInWithGoogle}>
        <img src="/google.png" alt="" />
        SignUp With Google
        </button>
        <Link href={'/accounts/login'}>
               Already have account ? Login
        </Link>
      </div>
    </div>
  )
}

export default signup
