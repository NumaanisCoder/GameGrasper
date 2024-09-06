import React from 'react'
import style from './Sbc.module.css';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Image from 'next/image';

const Sbc = ({data}) => {
    const isDarkMode = useSelector(state=> state.theme.isDarkMode);
    const {title,image} = data;
    const encrypturl = title.replace(/-/g, '~');
const questionmark = encrypturl.replace(/\?/g, '$');
const urlpart = `/article/${questionmark.replace(/ /g, '-')}`;
  

  return (
    <Link href={urlpart} className={`${style.parent} ${isDarkMode ? style.dark : ""}`}>
  
      <div className={style.imageC}>
        <Image src={image}  width={50} height={50} layout='responsive' loading='lazy' alt={title} quality={50} />
      </div>
       
      <div className={style.info}>
        <h4>{title}</h4>
      </div>
    </Link>
  )
}

export default Sbc
