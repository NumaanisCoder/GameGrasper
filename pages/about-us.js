import React from 'react'
import style from '@/styles/Aboutus.module.css'
import { useSelector } from 'react-redux'


const aboutus = () => {
  const isDarkMode = useSelector((state)=> state.theme.isDarkMode);

  return (
    <div className={`${style.rootkabaap} ${isDarkMode ? style.dark : ""}`}>
    <div className={`${style.root}`}>
  
      <p>In the digital realm of GameGrasper, I, as the sole publisher, extend a warm welcome to you. This platform is a personal endeavor, a labor of passion dedicated to delivering a unique and immersive experience. </p>

<p>At GameGrasper, discover a curated blend of the latest information and captivating content across diverse categories. As the curator and creator, I take pride in offering a singular perspective on trends, insights, and entertainment, tailored for your exploration.</p>

<p>This platform is more than a website; it's a journey crafted for individuals seeking a personalized touch in their quest for knowledge and entertainment. From the inception of articles to the delivery of content, every aspect is carefully considered to ensure your experience is not just informative but also enjoyable.</p>

<p>Join me on this solo publishing adventure at gamegrasper, where curiosity meets creation, and exploration knows no bounds. Thank you for being a part of this digital venture.</p>
    </div>
    </div>
  )
}

export default aboutus
