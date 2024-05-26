import { toggelTheme } from '@/store/themeSlice'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from '@/styles/themeButton.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'

const ThemeButton = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(state => state.theme.isDarkMode);
  const handleToggleTheme = () => {
    dispatch(toggelTheme());
  };
  return (
  
      <button className={`${style.root} ${isDarkMode ? style.dark :""}`} onClick={handleToggleTheme}>
        {!isDarkMode ?  <FontAwesomeIcon icon={faMoon} /> : <FontAwesomeIcon icon={faSun} />}
     
      </button>
  )
}

export default ThemeButton
