import BlogCard from "@/components/BlogCard/BlogCard";
import React, { useEffect, useState } from "react";
import style from "@/styles/homeStyle.module.css";
import Head from "next/head";
import { useSelector } from "react-redux";
import ThemeButton from "@/components/ToggelTheme/ThemeButton";



const Index = (props) => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const [currentPage, setcurrentPage] = useState(1);
  const itemsperpage = 15;
  const startIndex = 0;
  const endIndex = currentPage * itemsperpage;

  const handleScroll = () => {
    // Calculate the position of the scroll bar
    const scrollPosition = window.innerHeight + window.scrollY;
    const pageHeight = document.documentElement.scrollHeight;

    // Adjust the threshold as needed, for example, 300px from the bottom
    const threshold = 450;

    // Check if the user has scrolled to the bottom of the page
    if (
      scrollPosition >= pageHeight - threshold &&
      endIndex < props.data.message.length
    ) {
      // Load more blogs
      console.log("It is bottom");
      setcurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);


    return () => {

      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentPage]);

  return (
    <div>
      <Head>
        <title>GameGrasper</title>
        <meta
          name="description"
          content="Discover the latest in gaming with GameGrasper! Stay updated with game reviews, news, tips, and guides for all your favorite titles. Dive into the world of gaming with expert insights, engaging content, and a passionate community. Level up your gaming experience with GameGrasper!"
        />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL}`} />
      </Head>
      <div className={` ${style.parent} ${isDarkMode ? style.dark : ""} `}>
      
        <div className={style.blogcontainer}>
          {props.data.message.slice(startIndex, endIndex).map((blog, index) => (
            <BlogCard data={blog} key={index} />
            
          ))}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getBlogs`);
  const data = await res.json();

  return { props: { data } };
}

export default Index;
