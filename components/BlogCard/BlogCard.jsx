import React, { useEffect, useState } from "react";
import styles from "./BlogCardStyle.module.css";
import Link from "next/link";
import getEmoji from "@/lib/Emoji";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { useSelector } from "react-redux";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSnackbar } from "notistack";

const BlogCard = ({ data }) => {
  

  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const { _id, title, image, content, category, createdAt, views, summary } = data;
  const [Sliced, setSliced] = useState(content.slice(0, 300));

  const emoji = getEmoji(category);


  const encrypturl = title.replace(/-/g, '~');
const questionmark = encrypturl.replace(/\?/g, '$');
const urlpart = `/article/${questionmark.replace(/ /g, '-')}`;

  

  function random(createdAt) {
    const formattedDate = formatDistanceToNow(new Date(createdAt), {
      addSuffix: true,
    });
    return formattedDate;
  }

  function removeHtmlTags(input) {
    let filter1 = input.replace(/<\/?[^>]+(>|$)/g, " ");
    let filter2 = filter1.replace(/&#39;/g, "'");
    let filter3 = filter2.replace(/&quot;/g, '"');
    let filter4 = filter3.replace(/\n/g, "");
    return filter4;
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSliced(content.slice(0, 450));
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [content]);


  return (
    <div className={`${styles.container} ${isDarkMode ? styles.dark : ""}`}>
      <Link href={urlpart} className={`${styles.image_container} ${isDarkMode ? styles.darkImage : ""}`}>
        <Image src={image} width={500} height={300} alt={title} />
      </Link>
      <div className={styles.text_container}>
        <div>
          <h2 className={styles.title}>{title}</h2>
        </div>
        <p className={styles.content}>{removeHtmlTags(summary)}....</p>
        <div className={styles.linkCategoryDiv}>
          <p className={`${styles.Link} ${isDarkMode ? styles.darkLink : ""}`}>
            <Link href={urlpart}>Read</Link>
          </p>
          
        </div>
        <p className={styles.date}>
        &nbsp; <FontAwesomeIcon icon={faCalendarDays} /> &nbsp; <span className={`${styles.views} ${isDarkMode ? styles.darkViews : ""}`}>{random(createdAt)}</span>
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
