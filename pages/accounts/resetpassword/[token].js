import { useRouter } from "next/router";
import React, { useState } from "react";
import style from "@/styles/resetpasswordStyle.module.css";
import axios from "axios";

const token = () => {
  const router = useRouter();
  const token = router.query.token;
  const [Error, setError] = useState("");
  const [newPassword, setnewPassword] = useState(null);
  const [ConfirmPassword, setConfirmPassword] = useState(null);
  const [SubmitBTN, setSubmitBTN] = useState("Submit");

  async function formHandler(e) {
    e.preventDefault();
    if(ConfirmPassword != newPassword){
      setError("Password does not match");
      return;
    }
    if(ConfirmPassword.length < 6){
      setError("Password Should More than 6 characters");
    }
    setSubmitBTN("Submitting...");

    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/updatepassword`, {ConfirmPassword, token});
    const data = response.data;

    if(data.status == 200){
      router.push('/accounts/login');
    }

  }

  return (
    <div className={style.root}>
      <form onSubmit={formHandler} className={style.form}>
        <div className={style.formGroup}>
          <h2>Reset Password</h2>
        </div>
        <div className={style.formGroup}>
          <input type="password" placeholder="Enter the New Password" onChange={(e)=>setConfirmPassword(e.target.value)} required/>
        </div>
        <div className={style.formGroup}>
          <input type="text" placeholder="Confirm password" onChange={(e)=>setnewPassword(e.target.value)} required/>
          <p>{Error}</p>
        </div>
        <div className={style.formGroup}>
        <button>{SubmitBTN}</button>
        </div>
      </form>
    </div>
  );
};

export default token;
