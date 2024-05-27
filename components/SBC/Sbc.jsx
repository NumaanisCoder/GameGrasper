import React from 'react'
import style from './Sbc.module.css';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const Sbc = ({data}) => {
    const isDarkMode = useSelector(state=> state.theme.isDarkMode);
    const {title,image} = data;
    const encrypturl = title.replace(/-/,'~');
    const urlpart =  `/article/${encrypturl.replace(/ /g,'-')}`;
  

  return (
    <Link href={urlpart} className={`${style.parent} ${isDarkMode ? style.dark : ""}`}>
  
      <div className={style.imageC}>
        <img src={image} alt="" />
      </div>
       
      <div className={style.info}>
        <h4>{title}</h4>
        {/* <p>{removeHtmlTags(summary.substring(0,100))}</p> */}
      </div>
    </Link>
  )
}

export default Sbc
