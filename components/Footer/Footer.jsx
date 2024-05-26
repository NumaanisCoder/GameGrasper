import React from 'react'
import style from './FooterStyle.module.css'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className={style.root}>

      <div className={style.company}>
      <h3 className={style.companyName}>GameGrasper</h3>
      <p className={style.companyDescription}>Discover the latest in gaming with GameGrasper! Stay updated with game reviews, news, tips, and guides for all your favorite titles. Dive into the world of gaming with expert insights, engaging content, and a passionate community. Level up your gaming experience with GameGrasper!</p>
      </div>

      <div className={style.goTo}>

        <div className={style.LinkContainer}>
          <h3>Links</h3>
          <div className={style.links}>
            <Link className={style.link} href='/about-us'>About Us</Link>
            <Link className={style.link} href='/privacy/policy'>Privacy Policy</Link>
          </div>
        </div>

  

      </div>
    </footer>
  )
}

export default Footer
