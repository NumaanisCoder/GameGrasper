import React, { useState } from "react";
import { useSnackbar } from "notistack"; // Import the notification system
import styles from "./PopupForm.module.css";
import { Poppins } from "next/font/google";

const PoppinsFont = Poppins({ weight: ["500", "700"], subsets: ["latin"] });

const PopupForm = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const { enqueueSnackbar } = useSnackbar(); // Initialize the notification system
  const [buttonText, setButtonText] = useState("Inquire Now");

  const handleSubmit = async (event) => {
    setButtonText("Submitting...");
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "cb7512c7-7537-4f58-86c8-16b64f0d2277");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    console.log(json);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });
      const result = await response.json();
      if (result.success) {
        setMessage("Thank you for your inquiry! I will get back to you soon.");
        setMessageColor("green");
        setButtonText("Inquire Now");
        enqueueSnackbar("Inquiry Submitted!", { variant: "success" });
        setEmail(""); // Clear the email field after successful submission
      } else {
        setMessage("Failed to submit your inquiry. Please try again.");
        setMessageColor("red");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again or email me at owner@goalxpert.blog");
      setMessageColor("red");
    }
  };

  return (
    <div className={`${styles.popup} ${PoppinsFont.className}`}>
      <div className={styles.popupContent}>
        <h3>Own GoalXpert.blog Today for <strong style={{color:'green'}}>$49!</strong></h3>
        <p>
          Looking for a niche-specific domain with <strong>AdSense approval</strong>? 
          <strong><a href="https://www.goalxpert.blog" target="_blank">GoalXpert.blog</a></strong> is up for sale! 🚀
        </p>
        <p>
          This domain is a perfect opportunity for bloggers or entrepreneurs 
          looking to establish a blog with <strong>AdSense already approved</strong>. 
          While it currently has low traffic (as I am not working on it), the potential is immense.
        </p>
        <p style={{ fontStyle: "italic" }}>
          Start your blogging journey or expand your portfolio with this premium asset.
        </p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="email"
            name="email" // Ensure it matches the Web3Forms requirements
            placeholder="Enter your valid email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
          <button type="submit" className={styles.submitBtn}>
            {buttonText}
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
