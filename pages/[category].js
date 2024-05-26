import BlogCard from "@/components/BlogCard/BlogCard";
import React, { useEffect, useState } from "react";
import style from "@/styles/homeStyle.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import getCategoryMetaDescription from "@/lib/MetaProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAtom, faBook, faCheck, faComment, faGamepad, faKeyboard, faMobile, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { faReadme } from "@fortawesome/free-brands-svg-icons";
import { useSelector } from "react-redux";
import ThemeButton from "@/components/ToggelTheme/ThemeButton";

const Category = (props) => {
  const isDarkMode = useSelector((state)=> state.theme.isDarkMode);
  const [currentPage, setcurrentPage] = useState(1);
  const itemsperpage = 6;
  const startIndex = 0;
  const endIndex = currentPage * itemsperpage;
  const router = useRouter();

  const handleScroll = () => {
    // Calculate the position of the scroll bar
    const scrollPosition = window.innerHeight + window.scrollY;
    const pageHeight = document.documentElement.scrollHeight;

    // Adjust the threshold as needed, for example, 300px from the bottom
    const threshold = 450;

    // Check if the user has scrolled to the bottom of the page
    if (scrollPosition >= pageHeight - threshold && endIndex < props.data.message.length) {
      // Load more blogs
      console.log("It is bottom");
      setcurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentPage])

  return (
    <div>
      <Head>
        <title>{`Relaxbyte - ${router.query.category.replace(/-/g,' ')}`}</title>
        <meta name="description" content={getCategoryMetaDescription(router.query.category)} />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL}/${router.query.category}`} />
      </Head>
    <div className={`${style.parent} ${isDarkMode ? style.dark : ''} `}>
    <div className={`${style.categoryListContainer} ${isDarkMode ? style.darkCLC : ""}`}>
          <div className={style.categoryContent}>
            <ThemeButton/>
            <Link href={`/`}>All</Link>
            <Link href={`/Programming`}><FontAwesomeIcon icon={faKeyboard} /> Programming</Link>
            <Link href={`/Video-Games`}><FontAwesomeIcon icon={faGamepad} /> Video Games</Link>
            <Link href={`/News`}><FontAwesomeIcon icon={faNewspaper} /> News</Link>
            <Link href={`/Tutorial`}><FontAwesomeIcon icon={faCheck} /> Tutorial</Link>
            <Link href={`/Football`}><FontAwesomeIcon icon={faComment} /> Football</Link>
            <Link href={`/Gadget-Reviews`}><FontAwesomeIcon icon={faMobile} /> Gadget Reviews</Link>
            <Link href={`/Technology`}><FontAwesomeIcon icon={faAtom} /> Technology</Link>
            <Link href={`/Anime`}><FontAwesomeIcon icon={faReadme} /> Anime</Link>
            <Link href={`/Education`}><FontAwesomeIcon icon={faBook} /> Education</Link>
          </div>
        </div>
       <div className={style.blogcontainer}>
       {props.data.message.slice(startIndex, endIndex).map((blog, index) => (
            <BlogCard data={blog} key={index} />
          ))}
        </div>

    </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const {query} = context;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/bycategory/${query.category}`);
  const data = await res.json();

  return { props: { data } };
}

export default Category;
