import React, { useState } from "react";
import { useSnackbar } from "notistack"; // Import the notification system
import styles from "./PopupForm.module.css";
import { Poppins } from "next/font/google";


const PoppinsFont = Poppins({weight: ['500','700'], subsets:['latin']});

const PopupForm = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const { enqueueSnackbar } = useSnackbar(); // Initialize the notification system
  const [Button, setButton] = useState("Get Started")

  const handleSubmit = async (event) => {
    setButton("Sending..")
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "cb7512c7-7537-4f58-86c8-16b64f0d2277");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    console.log(json)

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json
      });
      const result = await response.json();
      if (result.success) {
        setMessage("Thanks for contacting us! We'll be in touch shortly.");
        setMessageColor("green");
        setButton("Get Started")
        enqueueSnackbar("Response Submitted!", { variant: "success" });
        setEmail(""); // Clear the email field after successful submission
      } else {
        setMessage("Failed to submit form. Please try again.");
        setMessageColor("red");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again. Or Email to info@hawkflit.com");
      setMessageColor("red");
    }
  };

  return (
    <div className={`${styles.popup} ${PoppinsFont.className}`}>
      <div className={styles.popupContent}>
        <h3>Create Your Blog Website and Start Earning!</h3>
        <p>
          Get a professional blog website at $79 and start earning up
          to $500 per month with AdSense!
        </p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="email"
            name="email" // Ensure it matches the Web3Forms requirements
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
          <button type="submit" className={styles.submitBtn}>
            {Button}
          </button>
        </form>
        {message && (
          <p style={{ color: messageColor, marginTop: "10px" }}>{message}</p>
        )}
        <button onClick={onClose} className={styles.closeBtn}>
          Close
        </button>
      </div>
    </div>
  );
};

export default PopupForm;
