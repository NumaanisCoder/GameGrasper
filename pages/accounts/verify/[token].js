import { useRouter } from "next/router";
import React, { useEffect } from "react";
import style from "@/styles/verifyEmailStyle.module.css";

const VerifyEmail = () => {
  const router = useRouter();
  const { token } = router.query;

  const verifyToken = async () => {
    if (token) {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/verify/${token}`);
      setInterval(() => {
        router.push('/');
      }, 3000); // Redirect after 3 seconds
    }
  };

  useEffect(() => {
    verifyToken();
  }, [token]);

  return (
    <div className={style.root}>
      <div className={style.container}>
        <p>Your Email is Verified Successfully</p>
        <p>Redirecting you in 3 seconds</p>
      </div>
    </div>
  );
};

export default VerifyEmail;
