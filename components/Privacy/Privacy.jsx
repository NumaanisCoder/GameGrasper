import React from "react";
import style from "./Privacy.module.css";
import { useSelector } from "react-redux";

const Privacy = () => {
  const isDarkMode = useSelector(state => state.theme.isDarkMode);
  return (
    <div className={`${style.root} ${isDarkMode ? style.dark : ""}`}>
      <div className={style.PrivacyContainer}>
        <h1 className={style.head}>Privacy Policy</h1>

        <p>Effective Date: 11/09/2023</p>

        <p>
          <b>GameGrasper</b> ("us", "we", or "our") operates https://www.GameGrasper.blog
          (the "Site"). This page informs you of our policies regarding the
          collection, use, and disclosure of Personal Information we receive
          from users of the Site.
        </p>

        <h2>Information Collection and Use</h2>

        <p>
          While using our Site, we may ask you to provide us with certain
          personally identifiable information that can be used to contact or
          identify you. Personally identifiable information may include, but is
          not limited to your name ("Personal Information").
        </p>

        <h2>Log Data</h2>

        <p>
          Like many site operators, we collect information that your browser
          sends whenever you visit our Site ("Log Data"). This Log Data may
          include information such as your computer's Internet Protocol ("IP")
          address, browser type, browser version, the pages of our Site that you
          visit, the time and date of your visit, the time spent on those pages,
          and other statistics.
        </p>

        <h2>Cookies</h2>

        <p>
          Cookies are files with small amounts of data, which may include an
          anonymous unique identifier. Cookies are sent to your browser from a
          web site and stored on your computer's hard drive.
        </p>

        <h2>Security</h2>

        <p>
          The security of your Personal Information is important to us, but
          remember that no method of transmission over the Internet, or method
          of electronic storage, is 100% secure. While we strive to use
          commercially acceptable means to protect your Personal Information, we
          cannot guarantee its absolute security.
        </p>

        <h2>Changes to This Privacy Policy</h2>

        <p>
          This Privacy Policy is effective as of 11/09/2023 and will remain in
          effect except with respect to any changes in its provisions in the
          future, which will be in effect immediately after being posted on this
          page.
        </p>

        <p>
          We reserve the right to update or change our Privacy Policy at any
          time, and you should check this Privacy Policy periodically. Your
          continued use of the Service after we post any modifications to the
          Privacy Policy on this page will constitute your acknowledgment of the
          modifications and your consent to abide and be bound by the modified
          Privacy Policy.
        </p>

        <p>
          If we make any material changes to this Privacy Policy, we will notify
          you either through the email address you have provided us or by
          placing a prominent notice on our website.
        </p>

        <h2>Contact Us</h2>

        <p>
          If you have any questions about this Privacy Policy, please contact us
          at nomannaeem985@gmail.com.
        </p>
      </div>
    </div>
  );
};

export default Privacy;
