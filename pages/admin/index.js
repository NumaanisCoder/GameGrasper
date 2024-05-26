import React, { useEffect, useState } from 'react'
import style from '@/styles/Auth.module.css'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie';

const root2103Nn = () => {


  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    if(Cookies.get("tokenofrelaxbyte")){
        if(Cookies.get("tokenofrelaxbyte") == process.env.NEXT_PUBLIC_ADMIN_TOKEN){
            router.push("/admin/root");
        }
    }else{
        router.push("/admin");
    }
    
  }, [])
  

  return (
    <div className={style.root}>

    {/* Login Form */}
      <div className={style.auth}>
            <h3>Welcome Back Admin</h3>
            <div className={style.formGroup}>
              <label htmlFor="password">Password</label>
              <input type="password" name="" id="password" onChange={(e)=>{
                setPassword(e.target.value)
              }} />
            </div>
            <div className={style.formGroup}>
                  <button onClick={(e)=>{
                    if( password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD){
                        Cookies.set("tokenofrelaxbyte",process.env.NEXT_PUBLIC_ADMIN_TOKEN,{expires : 365});
                        router.push("/admin/root")
                    }else{
                      console.log(process.env.NEXT_PUBLIC_ADMIN_TOKEN);
                      console.log(password);
                        e.target.innerText = "Wrong Password";
                        setTimeout(() => {
                          e.target.innerText = "Login";
                        }, 1000);
                    }
                   
                  }}>Login</button>
            </div>
      </div>
      
    </div>
  )
}

export default root2103Nn
