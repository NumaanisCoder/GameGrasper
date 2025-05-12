import React, { useEffect, useState } from 'react';
import style from './NavBarStyle.module.css';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import ThemeButton from '../ToggelTheme/ThemeButton';
import {Rubik_Dirt, Spicy_Rice} from 'next/font/google'

const LogoFont = Spicy_Rice({subsets:['latin'], weight:['400']})



const NavBar = () => {
  const router = useRouter();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const [isChecked, setIsChecked] = useState(false);
  const [isLogin, setIsLogin] = useState(false); // Corrected variable name

  useEffect(() => {
    let token = Cookies.get('token') || ''; // Initialize token with an empty string
    if (token.length > 5) { // Check if token exists and is longer than 5 characters
      setIsLogin(true); // Use setIsLogin instead of setisLogin
    } else {
      setIsLogin(false); // Token is not valid, set isLogin to false
    }
  }, [Cookies.get('token'), isChecked]); // Run effect when token or isChecked changes
  

  function menuProvider() {
    if (window.innerWidth < 858) {
      setIsChecked(false);
    }
  }

  function logout() { // Renamed function to lowercase for consistency
    Cookies.remove('token'); // Use remove instead of set with null
    menuProvider(); // Call menuProvider to close menu
    setIsLogin(false); // Use setIsLogin instead of setisLogin
  }

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <nav className={`${style.parent} ${isDarkMode ? style.dark : ''}`}>
      <input type="checkbox" id="check" className={style.check} checked={isChecked} onChange={handleCheckboxChange} />
      <label htmlFor="check" className={`${style.checkbtn}  ${isDarkMode ? style.darkIcon : ""}`}>
        <FontAwesomeIcon icon={isChecked ? faTimes : faBars} />
      </label>
      <label>
        <Link className={`${style.Logo} ${style.protestStrikeRegular} ${isDarkMode ? style.darkLogo : ''} ${LogoFont.className}`} href="/" onClick={menuProvider}>
          Game<span>Grasper</span>
        </Link>
      </label>
      <ul className={`${style.navUl} ${isDarkMode ? style.darkUL : ''}`}>
        <li className={`${style.navLi} ${isDarkMode ? style.darkActive : ''}`}>
          <Link className={`${style.active}`} href="/search" onClick={menuProvider}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Link>
        </li>
        <li className={`${style.navLi} ${isDarkMode ? style.darkActive : ''}`}>
          <Link href="/" onClick={menuProvider}>
            Home
          </Link>
        </li>
        <li className={`${style.navLi} ${isDarkMode ? style.darkActive : ''}`}>
          <Link href="/about-us" onClick={menuProvider}>
            About
          </Link>
        </li>
        <li className={`${style.navLi} ${isDarkMode ? style.darkActive : ''}`}>
          <Link href="/privacy/policy" onClick={menuProvider}>
            Privacy Policy
          </Link>
        </li>
        {!isLogin ? (
          <li className={`${style.navLi} ${isDarkMode ? style.darkActive : ''}`}>
            <Link href="/accounts/login" onClick={menuProvider}>
            <FontAwesomeIcon icon={faUser} /> Login
            </Link>
          </li>
        ) : (
          <li className={`${style.navLi} ${isDarkMode ? style.darkActive : ''}`}>
            <Link href="/" onClick={logout} className={style.accountIcon}>
            <FontAwesomeIcon icon={faUser} />  Logout
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
